import type { Metadata } from "next";
import { CMSRichText } from "@/components/cms/CMSRichText";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getCMSPage } from "@/lib/cms";

export const metadata: Metadata = { title: "Пользовательское соглашение", robots: { index: false, follow: true } };

export default async function TermsPage() {
  const page = await getCMSPage("terms");

  return <><PageHero eyebrow={page?.eyebrow || "Юридическая информация"} title={page?.heroTitle || "Пользовательское соглашение"} description={page?.heroDescription || "Условия использования сайта Берта."} breadcrumbs={[{ label: "Пользовательское соглашение" }]} /><Section className="bg-[#7e7e83]"><Container className="max-w-4xl"><div className="rounded-3xl bg-white p-6 sm:p-10">{page?.body ? <CMSRichText data={page.body} /> : <p className="leading-7 text-steel">Добавьте утверждённый текст пользовательского соглашения в разделе «Страницы» административной панели.</p>}</div></Container></Section></>;
}
