import "server-only";

import { createHash } from "crypto";
import { headers } from "next/headers";

import { env } from "@/lib/env";

const WINDOW_MS = 60 * 60 * 1000;
const MAX_REQUESTS = 8;

type Bucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, Bucket>();

function hashIp(ip: string): string {
  return createHash("sha256").update(`${env.TURNSTILE_SECRET_KEY}:${ip}`).digest("hex");
}

function clientIp(headerList: Headers): string | null {
  const forwarded = headerList.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) {
      return first;
    }
  }

  const realIp = headerList.get("x-real-ip")?.trim();
  return realIp || null;
}

function prune(now: number) {
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) {
      buckets.delete(key);
    }
  }
}

/**
 * Limits quote submissions per hashed IP. The raw IP is never stored or logged.
 * Skipped in development so local testing is not blocked.
 */
export async function allowQuoteAttempt(): Promise<boolean> {
  if (process.env.NODE_ENV === "development") {
    return true;
  }

  const ip = clientIp(await headers());
  if (!ip) {
    return true;
  }

  const key = hashIp(ip);
  const now = Date.now();
  prune(now);

  const existing = buckets.get(key);
  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  if (existing.count >= MAX_REQUESTS) {
    return false;
  }

  existing.count += 1;
  return true;
}
