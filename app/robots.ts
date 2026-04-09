import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/checkout", "/api"],
      },
    ],
    sitemap: "https://xed256.com/sitemap.xml",
  };
}
