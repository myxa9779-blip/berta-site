import type { Metadata } from "next";
import { CMSRichText } from "@/components/cms/CMSRichText";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getCMSPage } from "@/lib/cms";

export const metadata: Metadata = { title: "Политика конфиденциальности", robots: { index: false, follow: true } };

export default async function PrivacyPage() {
  const page = await getCMSPage("privacy");

  return <><PageHero eyebrow={page?.eyebrow || "Юридическая информация"} title={page?.heroTitle || "Политика конфиденциальности"} description={page?.heroDescription || "Правила обработки и защиты персональных данных."} breadcrumbs={[{ label: "Политика конфиденциальности" }]} /><Section className="bg-[#7e7e83]"><Container className="max-w-4xl"><div className="rounded-3xl bg-white p-6 sm:p-10">{page?.body ? <CMSRichText data={page.body} /> : <p className="leading-7 text-steel">Добавьте утверждённый текст политики конфиденциальности в разделе «Страницы» административной панели.</p>}</div></Container></Section></>;
}
