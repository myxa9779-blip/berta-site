import { redirect } from "next/navigation";

export default async function SystemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug === "as63") redirect("/products/as63");
  if (slug === "sr50" || slug === "f50") redirect("/products/f50");
  redirect(`/products#${slug}`);
}
