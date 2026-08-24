import type { MetadataRoute } from "next";
import { SITE } from "@/content";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: SITE.url, changeFrequency: "weekly", priority: 1 }];
}
