import type { MetadataRoute } from "next";

import { publicPagePaths } from "@/config/seo";
import { publicEnv } from "@/lib/env.public";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = publicEnv.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");

  return publicPagePaths.map((path) => ({
    url: path === "/" ? `${base}/` : `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : path === "/quote" || path === "/services" ? 0.8 : 0.6,
  }));
}
