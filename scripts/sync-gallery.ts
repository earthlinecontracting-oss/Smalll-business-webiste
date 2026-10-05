import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { cp, mkdir, mkdtemp, readdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import type { JWTInput } from "google-auth-library";
import { google } from "googleapis";
import type { drive_v3 } from "googleapis";
import sharp from "sharp";

loadDotEnvLocal();

const MAX_BYTES = 25 * 1024 * 1024;
const MAX_WIDTH = 2000;
const ROOT_CATEGORY = "General";
const DRIVE_SCOPE = "https://www.googleapis.com/auth/drive.readonly";
const FOLDER_MIME = "application/vnd.google-apps.folder";

type DriveClient = drive_v3.Drive;

type GalleryItem = {
  file: string;
  caption: string;
  category: string;
  alt: string;
};

type DriveFile = {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  description?: string;
};

function loadDotEnvLocal() {
  const envPath = path.join(process.cwd(), ".env.local");
  let text: string;
  try {
    text = readFileSync(envPath, "utf8");
  } catch {
    return;
  }

  for (const rawLine of text.split("\n")) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) {
      continue;
    }
    const eq = line.indexOf("=");
    if (eq === -1) {
      continue;
    }
    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

function keepLastGood(reason: string): never {
  console.warn(`[gallery] ${reason}`);
  console.warn("[gallery] Keeping the last good gallery. Build will continue.");
  process.exit(0);
}

function parseServiceAccount(raw: string): JWTInput {
  const trimmed = raw.trim();
  const jsonText = trimmed.startsWith("{")
    ? trimmed
    : Buffer.from(trimmed, "base64").toString("utf8");
  const parsed = JSON.parse(jsonText) as JWTInput;
  if (typeof parsed.private_key === "string") {
    parsed.private_key = parsed.private_key.replace(/\\n/g, "\n");
  }
  return parsed;
}

function detectImageKind(buffer: Buffer): "jpeg" | "png" | "webp" | "heic" | null {
  if (buffer.length < 12) {
    return null;
  }

  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return "jpeg";
  }

  if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47) {
    return "png";
  }

  if (buffer.toString("ascii", 0, 4) === "RIFF" && buffer.toString("ascii", 8, 12) === "WEBP") {
    return "webp";
  }

  if (buffer.toString("ascii", 4, 8) === "ftyp") {
    const brands = buffer.subarray(8, Math.min(buffer.length, 32)).toString("ascii").toLowerCase();
    if (/(heic|heif|mif1|msf1|heix|hevc|hevx)/.test(brands)) {
      return "heic";
    }
  }

  return null;
}

async function listChildren(drive: DriveClient, folderId: string): Promise<DriveFile[]> {
  const files: DriveFile[] = [];
  let pageToken: string | undefined;

  do {
    const response = await drive.files.list({
      q: `'${folderId.replace(/'/g, "\\'")}' in parents and trashed = false`,
      fields: "nextPageToken, files(id, name, mimeType, size, description)",
      pageSize: 1000,
      pageToken,
      supportsAllDrives: true,
      includeItemsFromAllDrives: true,
    });

    for (const file of response.data.files ?? []) {
      if (file.id && file.name && file.mimeType) {
        files.push({
          id: file.id,
          name: file.name,
          mimeType: file.mimeType,
          size: file.size ?? undefined,
          description: file.description ?? undefined,
        });
      }
    }

    pageToken = response.data.nextPageToken ?? undefined;
  } while (pageToken);

  return files;
}

async function downloadFile(drive: DriveClient, fileId: string): Promise<Buffer> {
  const response = await drive.files.get(
    { fileId, alt: "media", supportsAllDrives: true },
    { responseType: "arraybuffer" },
  );
  return Buffer.from(response.data as ArrayBuffer);
}

async function processImage(buffer: Buffer): Promise<Buffer> {
  return sharp(buffer, { failOn: "none", animated: false })
    .rotate()
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toBuffer();
}

async function collectFromFolder(
  drive: DriveClient,
  folderId: string,
  category: string,
): Promise<{ file: DriveFile; category: string }[]> {
  const children = await listChildren(drive, folderId);
  const images: { file: DriveFile; category: string }[] = [];

  for (const child of children) {
    if (child.mimeType === FOLDER_MIME) {
      const nested = await collectFromFolder(drive, child.id, child.name);
      images.push(...nested);
      continue;
    }

    images.push({ file: child, category });
  }

  return images;
}

async function sync(): Promise<void> {
  const json = process.env.GOOGLE_SERVICE_ACCOUNT_JSON?.trim() ?? "";
  const folderId = process.env.GOOGLE_DRIVE_GALLERY_FOLDER_ID?.trim() ?? "";

  if (!json || !folderId) {
    keepLastGood("GOOGLE_SERVICE_ACCOUNT_JSON or GOOGLE_DRIVE_GALLERY_FOLDER_ID is not set.");
  }

  let credentials: JWTInput;
  try {
    credentials = parseServiceAccount(json);
  } catch {
    keepLastGood("GOOGLE_SERVICE_ACCOUNT_JSON is not valid JSON.");
  }

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: [DRIVE_SCOPE],
  });
  const drive = google.drive({ version: "v3", auth });

  const discovered = await collectFromFolder(drive, folderId, ROOT_CATEGORY);
  const staging = await mkdtemp(path.join(tmpdir(), "earthline-gallery-"));
  const items: GalleryItem[] = [];

  try {
    for (const { file, category } of discovered) {
      const size = Number(file.size ?? 0);
      if (size > MAX_BYTES) {
        console.warn(`[gallery] Skipping ${file.name}: larger than 25 MB.`);
        continue;
      }

      let original: Buffer;
      try {
        original = await downloadFile(drive, file.id);
      } catch (error) {
        console.warn(`[gallery] Could not download ${file.name}:`, error);
        continue;
      }

      if (original.byteLength > MAX_BYTES) {
        console.warn(`[gallery] Skipping ${file.name}: downloaded size over 25 MB.`);
        continue;
      }

      const kind = detectImageKind(original);
      if (!kind) {
        console.warn(`[gallery] Skipping ${file.name}: not JPEG, PNG, WebP, or HEIC.`);
        continue;
      }

      let webp: Buffer;
      try {
        webp = await processImage(original);
      } catch (error) {
        console.warn(`[gallery] Could not convert ${file.name}:`, error);
        continue;
      }

      const hash = createHash("sha256").update(original).digest("hex").slice(0, 16);
      const filename = `${hash}.webp`;
      await writeFile(path.join(staging, filename), webp);

      const caption = file.description?.trim() || category;
      items.push({
        file: `/gallery/${filename}`,
        caption,
        category,
        alt: caption,
      });
    }

    if (discovered.length > 0 && items.length === 0) {
      keepLastGood("Drive returned files, but none were valid gallery images.");
    }

    const publicDir = path.join(process.cwd(), "public", "gallery");
    const manifestPath = path.join(process.cwd(), "src", "config", "gallery.generated.json");

    await mkdir(publicDir, { recursive: true });

    const stagedFiles = await readdir(staging);
    for (const name of stagedFiles) {
      await cp(path.join(staging, name), path.join(publicDir, name));
    }

    await writeFile(manifestPath, `${JSON.stringify(items, null, 2)}\n`, "utf8");

    const keep = new Set(stagedFiles);
    const existing = await readdir(publicDir);
    for (const name of existing) {
      if (name.endsWith(".webp") && !keep.has(name)) {
        await rm(path.join(publicDir, name), { force: true });
      }
    }

    console.info(`[gallery] Synced ${items.length} image(s).`);
  } finally {
    await rm(staging, { recursive: true, force: true });
  }
}

async function main() {
  try {
    await sync();
  } catch (error) {
    console.warn("[gallery] Sync failed:", error);
    keepLastGood("Drive sync threw an error.");
  }
}

void main();
