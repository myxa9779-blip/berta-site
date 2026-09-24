export type SystemStatus = "available" | "development";
export type SystemCategory = "warm" | "cold" | "facade";

export interface AluminiumSystem {
  slug: string;
  name: string;
  code: string;
  category: SystemCategory;
  categoryLabel: string;
  status: SystemStatus;
  statusLabel: string;
  tagline: string;
  summary: string;
  audience: string[];
  applications: string[];
  constructionTypes: string[];
  benefits: Array<{ title: string; description: string }>;
  image: string;
  gallery: Array<{ src: string; alt: string }>;
  specifications: Array<{ label: string; value: string }>;
  faqs: Array<{ question: string; answer: string }>;
}

export interface Solution {
  slug: string;
  title: string;
  description: string;
  systems: string[];
  objects: string[];
}

export interface OtherProduct {
  slug: string;
  title: string;
  shortDescription?: string;
  description: string;
  image: string;
  applications: string[];
  technicalCharacteristics?: string[];
  advantages?: string[];
  statusLabel?: string;
}

export interface DocumentItem {
  id: string;
  title: string;
  system: string;
  category: string;
  format: string;
  size: string;
  status: "demo" | "available";
  href?: string;
  version?: string;
  documentDate?: string;
  description?: string;
  previewImage?: string;
}
