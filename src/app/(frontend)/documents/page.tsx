import type { Metadata } from "next";
import Image from "next/image";
import { Download, ShieldCheck } from "lucide-react";
import { DocumentFilters } from "@/components/documents/DocumentFilters";
import { ContactSection } from "@/components/sections/ContactSection";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { getCMSDocuments } from "@/lib/cms";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata(
  "Документация БЕРТА",
  "Актуальные каталоги, технические материалы, сертификаты и протоколы испытаний алюминиевых систем БЕРТА.",
  "/documents",
  "/images/documents-clean-20260908.png",
);

export default async function DocumentsPage() {
  const documents = await getCMSDocuments();

  return (
    <>
      <section className="relative min-h-[650px] overflow-hidden bg-[#cbd2d7] pt-[72px] text-ink">
        <Image src="/images/documents-clean-20260908.png" alt="" fill priority sizes="100vw" className="scale-[1.04] object-cover opacity-45 blur-[5px]" />
        <Image src="/images/documents-clean-20260908.png" alt="Архитектурный объект с алюминиевыми системами БЕРТА" fill priority sizes="100vw" className="hero-zoomout-image object-cover object-[68%_center] sm:origin-right sm:scale-[0.86] lg:scale-[0.8]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#eef1f3]/98 via-[#e9edef]/78 to-[#cbd2d7]/8" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#e8ecee]/55 via-transparent to-[#07111a]/18" />
        <div className="absolute inset-x-0 bottom-0 top-[72px] bg-white/[0.66] sm:hidden" />
        <Container className="relative z-10 flex min-h-[578px] flex-col py-7 sm:py-9">
          <Breadcrumbs items={[{ label: "Документация" }]} />
          <div className="my-auto max-w-[600px] py-8">
            <h1 className="text-balance text-4xl font-semibold leading-[0.97] tracking-[-0.055em] sm:text-6xl lg:text-[4rem]">Документация БЕРТА</h1>
            <p className="mt-6 max-w-[500px] text-base leading-7 text-ink/72 sm:text-lg">Актуальные каталоги и сертификаты на алюминиевые системы БЕРТА. Официальные документы для проектирования и производства.</p>
          </div>
          <div className="grid max-w-[440px] grid-cols-2 border-t border-ink/12 pt-6">
            <HeroFact icon={ShieldCheck} value="Актуальная" label="информация" />
            <HeroFact icon={Download} value="Быстрый" label="доступ к документам" />
          </div>
        </Container>
      </section>

      <section className="bg-[#f5f6f7] py-10 sm:py-12 lg:py-14">
        <Container><DocumentFilters documents={documents} /></Container>
      </section>

      <ContactSection title="Не нашли нужный документ?" description="Оставьте заявку — наш специалист подготовит материалы и ответит на ваши вопросы." />
    </>
  );
}

function HeroFact({ icon: Icon, value, label }: { icon: typeof ShieldCheck; value: string; label: string }) {
  return <div className="flex items-start gap-3 border-r border-ink/12 px-4 first:pl-0 last:border-r-0"><Icon aria-hidden="true" className="mt-0.5 h-7 w-7 shrink-0 text-ink/78" /><div><p className="text-sm font-semibold text-ink sm:text-base">{value}</p><p className="mt-1 text-xs text-ink/58">{label}</p></div></div>;
}
