import type { MetadataRoute } from "next";
import { getCMSOtherProducts, getCMSProjects } from "@/lib/cms";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
  const [products, projects] = await Promise.all([getCMSOtherProducts(), getCMSProjects()]);
  const paths = ["/", "/products", "/products/as63", "/products/f50", "/solutions", "/about", "/documents", "/contacts"];
  paths.push(...products.map((product) => `/products/${product.slug}`));
  if (projects.length) paths.push("/projects");
  return Array.from(new Set(paths)).map((path) => ({ url: `${baseUrl}${path}`, lastModified: new Date() }));
}
