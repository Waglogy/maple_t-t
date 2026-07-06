import type { MetadataRoute } from "next";
import { SITE } from "@/lib/seo";

/**
 * Public, indexable routes. Private routes (profile, signup, booking) are
 * intentionally excluded and also blocked in robots.ts.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes: {
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  }[] = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" },
    { path: "/packages", priority: 0.9, changeFrequency: "weekly" },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" },
    { path: "/fleet", priority: 0.7, changeFrequency: "monthly" },
    { path: "/testimonials", priority: 0.6, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.7, changeFrequency: "monthly" },
  ];

  const lastModified = new Date();

  return routes.map((r) => ({
    url: `${SITE.url}${r.path}`,
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
