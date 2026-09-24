import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  BriefcaseBusiness,
  Grid2X2,
  Handshake,
  Lightbulb,
  MapPin,
  ShieldCheck,
  Users,
} from "lucide-react";
import { ContactSection } from "@/components/sections/ContactSection";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { createMetadata } from "@/lib/metadata";
import { getCMSSuppliers } from "@/lib/cms";

export const metadata: Metadata = createMetadata(
  "О компании БЕРТА",
  "БЕРТА — российская компания с более чем 20-летней историей в производстве светопрозрачных конструкций и собственной линейкой алюминиевых систем.",
  "/about",
  "/images/hero-20260727/about.jpg",
);

const values = [
  {
    icon: ShieldCheck,
    title: "Качество",
    description: "Используем только проверенные материалы и современные технологии производства.",
  },
  {
    icon: Lightbulb,
    title: "Инженерия",
    description: "Собственная разработка систем и постоянное совершенствование конструктивных решений.",
  },
  {
    icon: Users,
    title: "Надёжность",
    description: "Системы БЕРТА проектируются с запасом прочности и проходят многоступенчатый контроль.",
  },
  {
    icon: Handshake,
    title: "Партнёрство",
    description: "Строим долгосрочные отношения и поддерживаем партнёров на каждом этапе проекта.",
  },
];

const process = [
  { title: "Консультация", description: "Изучаем задачу проекта и предлагаем оптимальное решение." },
  { title: "Проектирование", description: "Подбираем системы и разрабатываем технические решения." },
  { title: "Изготовление", description: "Организуем производство с соблюдением высоких стандартов качества." },
  { title: "Поставка", description: "Осуществляем доставку конструкций в срок и в полной комплектации." },
  { title: "Поддержка", description: "Обеспечиваем техническую поддержку и гарантийное обслуживание." },
];

const projects = [
  { src: "/images/about-redesign/02-project-apartments-web.jpg", alt: "Современный жилой комплекс с окнами БЕРТА" },
  { src: "/images/about-redesign/03-project-glass-office-web.jpg", alt: "Стеклянный офисный центр" },
  { src: "/images/about-redesign/04-project-glass-house-web.jpg", alt: "Частный дом с панорамным остеклением" },
  { src: "/images/about-redesign/05-project-business-center-web.jpg", alt: "Современный бизнес-центр" },
];

export default async function AboutPage() {
  const suppliers = await getCMSSuppliers();
  return (
    <>
      <section className="relative min-h-[650px] overflow-hidden bg-[#07111a] pt-[72px] text-white">
        <Image
          src="/images/hero-20260727/about.jpg"
          alt=""
          fill
          sizes="100vw"
          className="scale-[1.04] object-cover opacity-55 blur-[5px]"
        />
        <Image
          src="/images/hero-20260727/about.jpg"
          alt="Современный офисный комплекс с алюминиевым фасадом"
          fill
          priority
          sizes="100vw"
          className="hero-zoomout-image object-cover object-[62%_center] sm:origin-right sm:scale-[0.86] lg:scale-[0.8]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#06101b]/94 via-[#06101b]/58 to-[#06101b]/12" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06101b]/58 via-transparent to-[#06101b]/22" />
        <Container className="relative z-10 flex min-h-[578px] flex-col py-7 sm:py-9">
          <Breadcrumbs items={[{ label: "О компании" }]} inverse />
          <div className="my-auto max-w-[620px] py-8">
            <h1 className="text-balance text-5xl font-semibold leading-[0.96] tracking-[-0.055em] sm:text-6xl lg:text-[3.75rem]">
              О компании БЕРТА
            </h1>
            <p className="mt-6 max-w-[500px] text-base leading-7 text-white/78 sm:text-lg">
              Более 20 лет мы создаём светопрозрачные конструкции, объединяя инженерный опыт, современные технологии и понимание реальных условий эксплуатации в России.
            </p>
          </div>
          <div className="grid max-w-[820px] grid-cols-2 border-t border-white/18 pt-6 sm:grid-cols-4">
            <HeroFact icon={BriefcaseBusiness} value="С 2005 года" label="на оконном рынке России" compact />
            <HeroFact icon={Grid2X2} value="Более 1 000 000" label="установленных окон" />
            <HeroFact icon={MapPin} value="15" label="действующих офисов" />
            <HeroFact icon={ShieldCheck} value="5 лет" label="гарантии" />
          </div>
        </Container>
      </section>

      <section id="about-approach" className="bg-[#f5f6f7] py-12 sm:py-14 lg:py-16">
        <Container>
          <div className="grid gap-8 border-b border-ink/10 pb-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink/62"><span className="mr-3 inline-block h-px w-5 align-middle bg-accent" />Наш подход</p>
              <h2 className="mt-5 max-w-[420px] text-4xl font-semibold leading-[1.03] tracking-[-0.045em] text-ink sm:text-5xl">
                Технологии, проверенные практикой
              </h2>
            </div>
            <div className="max-w-[650px] text-sm leading-7 text-steel lg:pt-8">
              <p>
                Более 20 лет мы создаём светопрозрачные конструкции, адаптированные к реальным условиям эксплуатации в России. Сегодня этот опыт воплощён в собственной линейке алюминиевых систем БЕРТА.
              </p>
              <p className="mt-4">
                Сегодня БЕРТА объединяет многолетний производственный опыт, строгий контроль и собственную линейку оконных, дверных и фасадных систем.
              </p>
            </div>
          </div>

          <div className="grid gap-px overflow-hidden rounded-xl border border-ink/8 bg-ink/8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <article key={value.title} className="min-h-[220px] bg-[#f5f6f7] p-6">
                  <Icon aria-hidden="true" className="h-7 w-7 text-accent" />
                  <h3 className="mt-8 text-lg font-semibold tracking-[-0.025em] text-ink">{value.title}</h3>
                  <p className="mt-3 text-xs leading-5 text-steel">{value.description}</p>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section id="about-process" className="bg-white py-12 sm:py-14 lg:py-16">
        <Container>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink/62"><span className="mr-3 inline-block h-px w-5 align-middle bg-accent" />Как мы работаем</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.045em] text-ink sm:text-5xl">От идеи до реализации</h2>
          <div className="mt-9 grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-0">
            {process.map((step, index) => (
              <article key={step.title} className="relative border-t border-ink/16 pt-7 lg:pr-7">
                <span className="absolute -top-5 left-0 grid h-10 w-10 place-items-center rounded-full border border-accent/35 bg-white text-xs font-bold text-accent">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-base font-semibold text-ink">{step.title}</h3>
                <p className="mt-3 text-xs leading-5 text-steel">{step.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section id="about-projects" className="bg-[#f5f6f7] py-12 sm:py-14 lg:py-16">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink/62"><span className="mr-3 inline-block h-px w-5 align-middle bg-accent" />Наши проекты</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.045em] text-ink sm:text-5xl">Реализованные решения</h2>
            </div>
            <p className="max-w-[620px] text-sm leading-6 text-steel">
              Мы гордимся каждым объектом, в котором применяются системы БЕРТА. Архитектура, в которой сочетаются эстетика, функциональность и надёжность, становится частью городской среды на долгие годы.
            </p>
          </div>
          <div className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {projects.map((project) => (
              <Link key={project.src} href="/projects" className="group relative aspect-[4/3.25] overflow-hidden rounded-lg bg-[#07111a]">
                <Image src={project.src} alt={project.alt} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover transition duration-700 group-hover:scale-[1.04]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07111a]/35 to-transparent" />
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {suppliers.length > 0 ? (
        <section id="about-suppliers" className="bg-white py-12 sm:py-14">
          <Container>
            <div className="grid gap-7 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink/62"><span className="mr-3 inline-block h-px w-5 align-middle bg-accent" />Подтверждённые компании и бренды</p>
                <h2 className="mt-4 text-4xl font-semibold tracking-[-0.045em] text-ink sm:text-5xl">Поставщики и партнёры</h2>
              </div>
              <p className="max-w-[640px] text-sm leading-6 text-steel">
                В списке представлены компании и бренды, подтверждённые сертификатами и партнёрскими документами БЕРТА.
              </p>
            </div>
            <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {suppliers.map((supplier) => {
                const content = (
                  <>
                    <div className="flex h-16 items-center">
                      {supplier.logo ? (
                        <div
                          className={
                            supplier.logoTheme === "green"
                              ? "inline-flex rounded-lg bg-[#008c70] px-4 py-2"
                              : supplier.logoTheme === "dark"
                                ? "inline-flex rounded-lg bg-[#07111a] px-4 py-2"
                                : "inline-flex"
                          }
                        >
                          <Image
                            src={supplier.logo}
                            alt={`Логотип ${supplier.name}`}
                            width={180}
                            height={64}
                            className="max-h-12 w-auto max-w-[180px] object-contain object-left"
                          />
                        </div>
                      ) : (
                        <span className="text-2xl font-semibold tracking-[-0.04em] text-ink">{supplier.name}</span>
                      )}
                    </div>
                    <p className="mt-5 text-sm font-semibold text-ink">{supplier.role}</p>
                    {supplier.description ? <p className="mt-2 text-xs leading-5 text-steel">{supplier.description}</p> : null}
                  </>
                );

                return supplier.website ? (
                  <a key={supplier.id} href={supplier.website} target="_blank" rel="noreferrer" className="rounded-xl border border-ink/10 bg-[#f7f8f9] p-6 transition hover:-translate-y-0.5 hover:border-accent/35 hover:shadow-lg">{content}</a>
                ) : (
                  <article key={supplier.id} className="rounded-xl border border-ink/10 bg-[#f7f8f9] p-6">{content}</article>
                );
              })}
            </div>
          </Container>
        </section>
      ) : null}

      <ContactSection
        title="Обсудим ваш проект?"
        description="Оставьте заявку — наши специалисты свяжутся с вами и подберут оптимальное решение для вашего объекта."
      />
    </>
  );
}

function HeroFact({ icon: Icon, value, label, compact = false }: { icon: typeof BriefcaseBusiness; value: string; label: string; compact?: boolean }) {
  return (
    <div className="flex min-h-[86px] items-start gap-3 border-r border-white/14 px-3 first:pl-0 last:border-r-0 sm:px-5">
      <Icon aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-white/88 sm:h-6 sm:w-6" />
      <div>
        <p className={`${compact ? "text-sm sm:text-base" : "text-lg sm:text-xl"} font-semibold tracking-[-0.025em] text-white`}>{value}</p>
        <p className="mt-1 text-[10px] leading-4 text-white/62 sm:text-xs">{label}</p>
      </div>
    </div>
  );
}
