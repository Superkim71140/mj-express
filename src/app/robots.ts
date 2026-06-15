import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/tools/",
        "/docs/tools/",
        "/claude-seo/",
        "/_old_site/",
        "/ui-ux-pro-max-skill/",
        "/ui-ux-pro-max-skill-main/",
        "/admin/",
        "/api/",
      ],
    },
    sitemap: `${siteConfig.baseUrl}/sitemap.xml`,
  };
}
