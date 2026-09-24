import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Download,
  Droplets,
  FileText,
  ShieldCheck,
  Sparkles,
  Thermometer,
  Volume2,
} from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata(
  "БЕРТА F50 — стоечно-ригельная фасадная система",
  "Современная фасадная система БЕРТА F50 для светопрозрачных фасадов, атриумов и наклонного остекления.",
  "/products/f50",
  "/images/f50-detail/hero.jpg",
);

const heroBenefits = [
  { icon: Thermometer, label: "Высокая\nтеплоизоляция" },
  { icon: Volume2, label: "Эффективная\nшумоизоляция" },
  { icon: ShieldCheck, label: "Надёжность\nи долговечность" },
  { icon: Droplets, label: "Защита от влаги\nи ветра" },
  { icon: Sparkles, label: "Эстетика и гибкость\nдизайна" },
];

const specifications = [
  { value: "R₀ = 1,6 м²·°C/Вт", label: "Теплоизоляция" },
  { value: "62 мм", label: "Толщина заполнения" },
  { value: "класс 4", label: "Воздухопроницаемость" },
  { value: "более 50 лет", label: "Долговечность" },
];

const advantages = [
  {
    image: "/images/f50-detail/profile-angle-20260908.png",
    title: "Узкие видимые линии",
    description: "Максимум света и современный внешний вид конструкции.",
  },
  {
    image: "/images/f50-detail/mullions-transoms.jpg",
    title: "Стойки и ригели для любых нагрузок",
    description: "Надёжность и долговечность для масштабных объектов.",
  },
  {
    image: "/images/f50-detail/design-flexibility.jpg",
    title: "Гибкость проектирования",
    description: "Фасады, наклонное остекление, атриумы и входные группы любой сложности.",
  },
  {
    image: "/images/f50-detail/connections-20260908.png",
    title: "Различные варианты соединений",
    description: "Современные технологии и качество в каждой детали.",
  },
];

const applications = [
  { image: "/images/f50-detail/offices.jpg", title: "Офисные и бизнес-центры" },
  { image: "/images/f50-detail/public-buildings.jpg", title: "Общественные здания" },
  { image: "/images/f50-detail/atriums.jpg", title: "Атриумы и входные группы" },
  { image: "/images/f50-detail/complex-facades.jpg", title: "Фасады различной сложности" },
  { image: "/images/f50-detail/inclined-glazing.jpg", title: "Наклонные остекления" },
];

const documents = [{ title: "Доступные сертификаты и материалы", meta: "Раздел документации" }];

export default function F50Page() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#07111a] pt-[72px] text-white">
        <Image
          src="/images/f50-detail/hero-20260908.png"
          alt="Профиль фасадной системы БЕРТА F50"
          fill
          priority
          sizes="100vw"
          className="object-contain object-right pb-6 pt-[92px] opacity-45 sm:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07111a] via-[#07111a]/90 to-[#07111a]/12 sm:via-[#07111a]/65" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07111a]/92 via-transparent to-[#07111a]/20" />

        <Container className="relative z-10 flex min-h-[610px] flex-col py-7 sm:min-h-[650px] sm:py-9 lg:min-h-[690px]">
          <Breadcrumbs
            inverse
            items={[
              { label: "Продукты БЕРТА", href: "/products" },
              { label: "БЕРТА F50" },
            ]}
          />

          <div className="my-auto max-w-[600px] py-8 sm:py-10">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-accent sm:text-xs">
              Стоечно-ригельная фасадная система
            </p>
            <h1 className="mt-5 text-balance text-5xl font-semibold leading-[0.92] tracking-[-0.06em] sm:text-6xl lg:text-[5rem]">
              БЕРТА F50
            </h1>
            <p className="mt-6 max-w-[490px] text-base leading-7 text-white/78 sm:text-lg">
              Современная стоечно-ригельная система для создания светопрозрачных фасадов любой сложности. Эстетика, прочность и надёжность в каждой детали.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/documents"
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-accent px-6 text-sm font-semibold text-white transition hover:bg-[#b20b12]"
              >
                Документация <FileText aria-hidden="true" className="h-4 w-4" />
              </Link>
              <Link
                href="/#contact"
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-lg border border-white/36 bg-[#07111a]/12 px-6 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white hover:bg-white hover:text-ink"
              >
                Запросить расчёт <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="grid border-t border-white/16 sm:grid-cols-2 lg:grid-cols-5">
            {heroBenefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.label}
                  className="flex min-h-[92px] items-center gap-4 border-b border-white/10 px-2 py-4 sm:border-r sm:px-5 lg:border-b-0 first:pl-0 last:border-r-0"
                >
                  <Icon aria-hidden="true" className="h-6 w-6 shrink-0 text-white/88" strokeWidth={1.5} />
                  <p className="whitespace-pre-line text-xs font-medium leading-5 text-white/84">{benefit.label}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-[#f4f5f6] py-10 sm:py-12">
        <Container>
          <SectionHeading title="Технические характеристики" />
          <div className="grid gap-px overflow-hidden rounded-xl border border-ink/8 bg-ink/8 sm:grid-cols-2 xl:grid-cols-4">
            {specifications.map((specification) => (
              <article key={specification.value} className="min-h-[140px] bg-[#f4f5f6] p-5 sm:p-6">
                <p className="text-xl font-semibold tracking-[-0.035em] text-ink">{specification.value}</p>
                <p className="mt-3 text-xs leading-5 text-steel">{specification.label}</p>
              </article>
            ))}
          </div>
          <div className="mt-5 flex justify-end">
            <Link href="/documents" className="inline-flex items-center gap-2 text-sm font-semibold text-ink transition hover:text-accent">
              Все технические характеристики <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </section>

      <section className="bg-[#f4f5f6] pb-12 sm:pb-14 lg:pb-16">
        <Container>
          <SectionHeading title="Преимущества системы" />
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {advantages.map((advantage) => (
              <article key={advantage.title} className="overflow-hidden rounded-xl border border-ink/8 bg-white">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={advantage.image} alt={advantage.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw" className={advantage.image.endsWith("20260908.png") ? "object-cover object-right" : "object-cover transition duration-700 hover:scale-[1.03]"} />
                </div>
                <div className="p-5">
                  <h3 className="text-base font-semibold leading-5 tracking-[-0.02em] text-ink">{advantage.title}</h3>
                  <p className="mt-3 text-xs leading-5 text-steel">{advantage.description}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-12 sm:py-14 lg:py-16">
        <Container>
          <SectionHeading title="Области применения" />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {applications.map((application) => (
              <Link key={application.title} href="/projects" className="group relative min-h-[260px] overflow-hidden rounded-xl bg-[#07111a] text-white">
                <Image src={application.image} alt={application.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1280px) 33vw, 20vw" className="object-cover transition duration-700 group-hover:scale-[1.035]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07111a]/92 via-[#07111a]/10 to-transparent" />
                <h3 className="absolute inset-x-0 bottom-0 p-5 text-lg font-semibold leading-6 tracking-[-0.025em]">{application.title}</h3>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[#f4f5f6] py-12 sm:py-14 lg:py-16">
        <Container className="grid gap-4 lg:grid-cols-[0.78fr_1.72fr]">
          <div id="documents" className="scroll-mt-24 rounded-xl border border-ink/8 bg-white p-5 sm:p-6">
            <h2 className="text-sm font-bold uppercase tracking-[0.08em] text-ink">Документация</h2>
            <div className="mt-5 divide-y divide-ink/8">
              {documents.map((document) => (
                <Link key={document.title} href="/documents" className="group flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                  <FileText aria-hidden="true" className="h-4 w-4 shrink-0 text-ink/55" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-xs font-medium text-ink">{document.title}</span>
                    <span className="mt-0.5 block text-[10px] text-steel">{document.meta}</span>
                  </span>
                  <Download aria-hidden="true" className="h-4 w-4 text-ink/55 transition group-hover:text-accent" />
                </Link>
              ))}
            </div>
            <Link href="/documents" className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-ink transition hover:text-accent">
              Смотреть всю документацию <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>

          <div className="relative min-h-[360px] overflow-hidden rounded-xl bg-[#07111a] text-white sm:min-h-[340px]">
            <Image src="/images/f50-detail/profile-angle-20260908.png" alt="Профиль системы БЕРТА F50" fill sizes="(max-width: 1024px) 100vw, 70vw" className="object-contain object-right p-4 opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#07111a] via-[#07111a]/92 to-[#07111a]/12" />
            <div className="relative flex min-h-[360px] max-w-[600px] flex-col justify-center p-6 sm:min-h-[340px] sm:p-9 lg:p-11">
              <h2 className="text-balance text-3xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-4xl">
                Нужна консультация по системе БЕРТА F50?
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-6 text-white/70">
                Наши специалисты помогут подобрать оптимальное решение и рассчитают конструкцию под ваш проект.
              </p>
              <Link href="/#contact" className="mt-7 inline-flex min-h-12 w-fit items-center gap-3 rounded-lg bg-accent px-6 text-sm font-semibold text-white transition hover:bg-[#b20b12]">
                Получить консультацию <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function SectionHeading({ title }: { title: string }) {
  return (
    <div className="mb-7 flex items-center gap-4">
      <h2 className="shrink-0 text-sm font-bold uppercase tracking-[0.06em] text-ink sm:text-base">{title}</h2>
      <span className="h-px w-full bg-ink/10" />
    </div>
  );
}
