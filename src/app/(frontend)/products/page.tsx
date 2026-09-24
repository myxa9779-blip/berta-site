import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  Cpu,
  GraduationCap,
  Headphones,
  House,
  Landmark,
  LayoutGrid,
  ShieldCheck,
  ShieldPlus,
  ThermometerSun,
  BedDouble,
} from "lucide-react";
import { ContactSection } from "@/components/sections/ContactSection";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { getCMSOtherProducts, getCMSSystems } from "@/lib/cms";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata(
  "Продукты БЕРТА",
  "Алюминиевые системы БЕРТА для окон, дверей, фасадов и архитектурных проектов.",
  "/products",
  "/images/products-hero-20260908.png",
);

const systemPresentation = [
  {
    category: "Оконные системы",
    image: "/images/products-redesign/window-system.jpg",
    description: "Премиальная система с минимальной теплопроводностью и минимальной шириной видимых профилей.",
  },
  {
    category: "Фасадные системы",
    image: "/images/products-redesign/facade-system.jpg",
    description: "Стоечно-ригельная фасадная система для крупноформатного остекления и архитектурных проектов любого масштаба.",
  },
  {
    category: "Дверные системы",
    image: "/images/products-redesign/door-system.jpg",
    description: "Премиальная система с повышенной теплоизоляцией и герметичностью для входных групп и панорамных дверей.",
  },
  {
    category: "Дополнительные системы",
    image: "/images/products-redesign/additional-system.jpg",
    description: "Универсальная система для внутренних перегородок, витражей и лёгких светопрозрачных конструкций.",
  },
];

const advantages = [
  { icon: Cpu, title: "Современные технологии", description: "Инновационные решения и постоянное развитие продукции." },
  { icon: ThermometerSun, title: "Высокая энергоэффективность", description: "Теплоизоляция, соответствующая самым высоким требованиям." },
  { icon: ShieldPlus, title: "Надёжность и долговечность", description: "Качественные материалы и строгий контроль производства." },
  { icon: LayoutGrid, title: "Эстетика без компромиссов", description: "Минимализм, большие стеклянные поверхности и чистые линии." },
  { icon: Headphones, title: "Полная техническая поддержка", description: "Помощь на всех этапах: от проектирования до реализации." },
];

const applications = [
  { icon: House, title: "Частные дома и коттеджи", image: "/images/products-redesign/private-houses.jpg" },
  { icon: Building2, title: "Жилые комплексы и апартаменты", image: "/images/products-redesign/residential-complexes.jpg" },
  { icon: BriefcaseBusiness, title: "Бизнес-центры и офисные здания", image: "/images/products-redesign/business-centers.jpg" },
  { icon: BedDouble, title: "Отели и гостиничные комплексы", image: "/images/products-redesign/hotels.jpg" },
  { icon: Landmark, title: "Общественные здания и сооружения", image: "/images/products-redesign/public-buildings.jpg" },
  { icon: GraduationCap, title: "Учебные и детские учреждения", image: "/images/products-redesign/education.jpg" },
];

export default async function ProductsPage() {
  const [systems, otherProducts] = await Promise.all([
    getCMSSystems(),
    getCMSOtherProducts(),
  ]);

  return (
    <>
      <section className="relative min-h-[650px] overflow-hidden bg-[#e9edef] pt-[72px] text-ink">
        <Image
          src="/images/products-hero-20260908.png"
          alt=""
          fill
          sizes="100vw"
          className="scale-[1.04] object-cover opacity-25 blur-[5px]"
        />
        <Image
          src="/images/products-hero-20260908.png"
          alt="Современное здание с алюминиевым фасадом"
          fill
          priority
          sizes="100vw"
          className="hero-zoomout-image object-cover object-[64%_center] sm:origin-right sm:scale-[0.86] lg:scale-[0.8]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/72 to-white/5" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-white/20" />
        <Container className="relative z-10 flex min-h-[578px] flex-col py-7 sm:py-9">
          <Breadcrumbs items={[{ label: "Продукты БЕРТА" }]} />
          <div className="my-auto max-w-[640px] py-10">
            <h1 className="text-balance text-5xl font-semibold leading-[0.96] tracking-[-0.055em] sm:whitespace-nowrap sm:text-6xl lg:text-[3.5rem]">
              Продукты БЕРТА
            </h1>
            <p className="mt-7 max-w-[430px] text-base leading-7 text-ink/76 sm:text-lg">
              Алюминиевые системы нового поколения для современных архитектурных решений. Технологичность, надёжность и эстетика в каждой детали.
            </p>
          </div>
          <div className="grid max-w-[620px] grid-cols-3 border-t border-ink/14 pt-6">
            <HeroFact icon={Building2} value="10+" label="систем в линейке" />
            <HeroFact icon={BadgeCheck} value="100%" label="контроль качества" />
            <HeroFact icon={ShieldCheck} value="5 лет" label="гарантии" />
          </div>
        </Container>
      </section>

      <section id="systems" className="scroll-mt-24 bg-[#f5f6f7] py-12 sm:py-14 lg:py-16">
        <Container>
          <div className="grid items-end gap-7 lg:grid-cols-[1fr_1fr]">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-accent">Системы БЕРТА</p>
              <h2 className="mt-3 max-w-[560px] text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-ink sm:text-5xl">
                Алюминиевые системы для любых задач
              </h2>
            </div>
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <p className="max-w-[470px] text-sm leading-6 text-steel">
                Разработаны для реализации любых архитектурных решений — от частных домов до масштабных коммерческих объектов. Каждая система сочетает эффективность, надёжность и современный дизайн.
              </p>
              <Link href="/documents" className="inline-flex min-h-12 shrink-0 items-center justify-center gap-3 rounded-lg border border-ink/14 bg-white px-5 text-sm font-semibold text-ink transition hover:border-accent hover:text-accent">
                Документация <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="mt-9 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {systems.slice(0, 4).map((system, index) => {
              const presentation = systemPresentation[index];
              return (
                <Link
                  id={system.slug}
                  key={system.slug}
                  href={system.slug === "as63" ? "/products/as63" : system.slug === "sr50" ? "/products/f50" : "/#contact"}
                  className="group relative min-h-[500px] scroll-mt-28 overflow-hidden rounded-xl bg-[#07111a] text-white"
                >
                  <Image src={presentation.image} alt={system.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw" className="object-cover transition duration-700 group-hover:scale-[1.035]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07111a]/98 via-[#07111a]/28 to-[#07111a]/3" />
                  <div className="relative flex min-h-[500px] flex-col p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-3">
                      <span className="rounded-md border border-white/24 bg-[#07111a]/22 px-3 py-2 text-[9px] font-bold uppercase tracking-[0.12em] backdrop-blur-sm">{presentation.category}</span>
                      {system.status === "development" ? <span className="rounded-full bg-accent px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.1em]">{system.statusLabel}</span> : null}
                    </div>
                    <div className="mt-auto">
                      <div className="rounded-xl border border-white/10 bg-[#596168]/28 p-4 shadow-[0_12px_32px_rgba(7,17,26,0.12)] backdrop-blur-[3px]">
                        <h3 className="text-[1.75rem] font-semibold tracking-[-0.04em]">{system.name}</h3>
                        <p className="mt-3 max-w-[285px] text-sm leading-5 text-white/90">{presentation.description}</p>
                      </div>
                      <span className="mt-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/32 transition group-hover:border-white group-hover:bg-white group-hover:text-ink">
                        <ArrowRight aria-hidden="true" className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-9 border-t border-ink/10 pt-7">
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.18em] text-accent">Преимущества систем БЕРТА</p>
            <div className="grid gap-px overflow-hidden rounded-xl border border-ink/8 bg-ink/8 sm:grid-cols-2 lg:grid-cols-5">
              {advantages.map((advantage) => {
                const Icon = advantage.icon;
                return (
                  <article key={advantage.title} className="min-h-[180px] bg-[#f5f6f7] p-5">
                    <Icon aria-hidden="true" className="h-6 w-6 text-accent" />
                    <h3 className="mt-6 text-base font-semibold leading-5 tracking-[-0.02em] text-ink">{advantage.title}</h3>
                    <p className="mt-3 text-xs leading-5 text-steel">{advantage.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      <section id="other-products" className="scroll-mt-24 bg-[#eef0f2] py-12 sm:py-14 lg:py-16">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-accent">Другие продукты</p>
              <h2 className="mt-3 max-w-[650px] text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-ink sm:text-5xl">
                Окна и панорамные системы
              </h2>
            </div>
            <p className="max-w-[520px] text-sm leading-6 text-steel lg:justify-self-end">
              Проверенные ПВХ-решения, складные и раздвижные конструкции для жилых и коммерческих объектов.
            </p>
          </div>

          <div className="mt-9 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {otherProducts.map((product) => (
              <article key={product.slug} className="group overflow-hidden rounded-xl border border-ink/8 bg-white shadow-[0_14px_38px_rgba(7,17,26,0.06)]">
                <div className="relative aspect-[16/10] overflow-hidden bg-[#07111a]">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.035]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07111a]/52 via-transparent to-transparent" />
                </div>
                <div className="p-5 sm:p-6">
                  <h3 className="text-2xl font-semibold tracking-[-0.035em] text-ink">{product.title}</h3>
                  <p className="mt-3 min-h-[72px] text-sm leading-6 text-steel">{product.shortDescription || product.description}</p>
                  {product.applications.length ? (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {product.applications.slice(0, 3).map((application) => (
                        <span key={application} className="rounded-full bg-[#eef0f2] px-3 py-1.5 text-[10px] font-semibold text-ink/70">
                          {application}
                        </span>
                      ))}
                    </div>
                  ) : null}
                  <Link
                    href={`/products/${product.slug}`}
                    className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-lg border border-ink/14 px-4 text-sm font-semibold text-ink transition hover:border-accent hover:text-accent"
                  >
                    Подробнее <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section id="applications" className="scroll-mt-24 bg-white py-10 sm:py-12 lg:py-14">
        <Container>
          <div className="flex items-center justify-between gap-5">
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-ink">Области применения</h2>
            <Link href="/solutions" className="hidden min-h-11 items-center gap-2 rounded-lg border border-ink/12 px-5 text-sm font-semibold text-ink transition hover:border-accent hover:text-accent sm:inline-flex">
              Все решения <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {applications.map((application) => {
              const Icon = application.icon;
              return (
                <Link key={application.title} href="/solutions" className="group relative min-h-[230px] overflow-hidden rounded-xl bg-[#07111a] text-white">
                  <Image src={application.image} alt={application.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1280px) 33vw, 17vw" className="object-cover transition duration-700 group-hover:scale-[1.04]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07111a]/92 via-[#07111a]/12 to-transparent" />
                  <div className="relative flex min-h-[230px] flex-col justify-end p-4">
                    <Icon aria-hidden="true" className="mb-3 h-6 w-6 text-white/92" />
                    <h3 className="text-sm font-semibold leading-5">{application.title}</h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      <ContactSection
        title="Подберём систему под ваш проект"
        description="Наши специалисты помогут подобрать оптимальное решение под ваши задачи."
      />
    </>
  );
}

function HeroFact({ icon: Icon, value, label }: { icon: typeof Building2; value: string; label: string }) {
  return (
    <div className="flex min-h-[84px] items-start gap-3 border-r border-ink/12 px-3 first:pl-0 last:border-r-0 sm:gap-4 sm:px-6">
      <Icon aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-ink/78 sm:h-6 sm:w-6" />
      <div>
        <p className="text-xl font-semibold tracking-[-0.035em] text-ink sm:text-2xl">{value}</p>
        <p className="mt-1 text-[10px] leading-4 text-ink/62 sm:text-xs">{label}</p>
      </div>
    </div>
  );
}
