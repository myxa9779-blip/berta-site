import type { Metadata } from "next";
import Image from "next/image";
import { Award, Building2, Feather, Headphones, MapPin, ShieldCheck } from "lucide-react";
import { ProjectsGallery } from "@/components/projects/ProjectsGallery";
import { ContactSection } from "@/components/sections/ContactSection";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { getCMSProjects } from "@/lib/cms";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  ...createMetadata("Проекты БЕРТА", "Подтверждённые реализованные объекты БЕРТА.", "/projects", "/images/hero-20260727/projects.jpg"),
  robots: { index: false, follow: true },
};

const benefits = [
  { icon: ShieldCheck, title: "Надёжность", description: "Строгий контроль качества на всех этапах производства." },
  { icon: Feather, title: "Эстетика", description: "Современный дизайн профилей для архитектурных решений любой сложности." },
  { icon: Award, title: "Энергоэффективность", description: "Высокие показатели теплоизоляции и комфорт в любое время года." },
  { icon: Headphones, title: "Поддержка", description: "Техническое сопровождение от расчёта до реализации проекта." },
];

export default async function ProjectsPage() {
  const projects = await getCMSProjects();

  return (
    <>
      <section className="relative min-h-[650px] overflow-hidden bg-[#e9edf0] pt-[72px] text-ink">
        <Image src="/images/hero-20260727/projects.jpg" alt="" fill priority sizes="100vw" className="scale-[1.04] object-cover opacity-35 blur-[5px]" />
        <Image src="/images/hero-20260727/projects.jpg" alt="Современный объект с фасадными системами БЕРТА" fill priority sizes="100vw" className="hero-zoomout-image object-cover object-[68%_center] sm:origin-right sm:scale-[0.86] lg:scale-[0.8]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#f1f4f6]/98 via-[#eef2f4]/82 to-[#e9edf0]/8" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#edf1f3]/65 via-transparent to-white/12" />
        <div className="absolute inset-x-0 bottom-0 top-[72px] bg-white/[0.62] sm:hidden" />
        <Container className="relative z-10 flex min-h-[578px] flex-col py-7 sm:py-9">
          <Breadcrumbs items={[{ label: "Проекты" }]} />
          <div className="my-auto max-w-[630px] py-8">
            <h1 className="max-w-[570px] text-balance text-4xl font-semibold leading-[0.97] tracking-[-0.055em] sm:text-6xl lg:text-[4rem]">Проекты БЕРТА</h1>
            <p className="mt-6 max-w-[480px] text-base leading-7 text-ink/70 sm:text-lg">В этом разделе будут опубликованы подтверждённые реализованные объекты.</p>
          </div>
          {projects.length ? <div className="grid max-w-[600px] grid-cols-3 border-t border-ink/12 pt-6">
            <HeroFact icon={Building2} value={`${projects.length}`} label="опубликованных объектов" />
            <HeroFact icon={MapPin} value="Россия" label="география проектов" />
            <HeroFact icon={Award} value="БЕРТА" label="алюминиевые системы" />
          </div> : null}
        </Container>
      </section>

      <section className="bg-[#f5f6f7] py-8 sm:py-10">
        <Container><ProjectsGallery projects={projects} /></Container>
      </section>

      <section className="border-t border-ink/8 bg-white py-10 sm:py-12">
        <Container className="grid gap-8 lg:grid-cols-[0.72fr_2.28fr] lg:items-start">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-accent">Преимущества</p>
            <h2 className="mt-3 max-w-[300px] text-3xl font-semibold leading-[1.05] tracking-[-0.04em] text-ink">Почему выбирают системы БЕРТА?</h2>
            <p className="mt-4 max-w-[330px] text-sm leading-6 text-steel">Качества, заложенные в проектирование и производство систем БЕРТА.</p>
          </div>
          <div className="grid gap-px overflow-hidden rounded-xl border border-ink/8 bg-ink/8 sm:grid-cols-2 xl:grid-cols-4">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return <article key={benefit.title} className="min-h-[190px] bg-white p-5"><Icon aria-hidden="true" className="h-6 w-6 text-accent" /><h3 className="mt-6 font-semibold text-ink">{benefit.title}</h3><p className="mt-3 text-xs leading-5 text-steel">{benefit.description}</p></article>;
            })}
          </div>
        </Container>
      </section>

      <ContactSection title="Нужна консультация по вашему проекту?" description="Наши специалисты помогут подобрать оптимальное решение и подготовят техническое предложение." />
    </>
  );
}

function HeroFact({ icon: Icon, value, label }: { icon: typeof Building2; value: string; label: string }) {
  return <div className="border-r border-ink/12 px-4 first:pl-0 last:border-r-0"><Icon aria-hidden="true" className="h-6 w-6 text-ink/78" /><p className="mt-3 text-xl font-semibold tracking-[-0.03em] text-ink sm:text-2xl">{value}</p><p className="mt-1 text-[10px] leading-4 text-ink/58 sm:text-xs">{label}</p></div>;
}
