import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const isProduction = /^https:\/\/(www\.)?okna-berta\.ru\/?$/i.test(siteUrl);

  if (isProduction) {
    return {
      rules: { userAgent: "*", allow: "/", disallow: "/admin/" },
      sitemap: `${siteUrl.replace(/\/$/, "")}/sitemap.xml`,
    };
  }

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/admin/" },
      { userAgent: ["Googlebot", "GoogleOther", "Yandex", "bingbot", "Mail.RU_Bot", "Applebot", "Baiduspider"], disallow: "/" },
    ],
    sitemap: `${siteUrl.replace(/\/$/, "")}/sitemap.xml`,
  };
}
