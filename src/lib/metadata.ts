import type { Metadata } from "next";

export function createMetadata(title: string, description: string, path: string, image = "/images/hero-building.jpg"): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const isProduction = /^https:\/\/(www\.)?okna-berta\.ru\/?$/i.test(siteUrl);
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image, alt: title }],
    },
    ...(isProduction ? { alternates: { canonical: path } } : {}),
  };
}
