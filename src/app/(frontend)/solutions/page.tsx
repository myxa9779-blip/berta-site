import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  Clock3,
  GraduationCap,
  Handshake,
  Headphones,
  House,
  Landmark,
  Leaf,
  PencilRuler,
  ShieldCheck,
  ShieldPlus,
  ThermometerSun,
  BedDouble,
} from "lucide-react";
import { ContactSection } from "@/components/sections/ContactSection";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata(
  "Решения БЕРТА",
  "Комплексные алюминиевые решения БЕРТА для частных домов, жилых комплексов, бизнеса и общественных зданий.",
  "/solutions",
  "/images/solutions-clean-20260908.png",
);

const solutions = [
  {
    icon: House,
    title: "Частные дома и коттеджи",
    description: "Энергоэффективные системы для максимального комфорта и панорамных видов.",
    image: "/images/solutions-redesign/02-private-houses-web.jpg",
  },
  {
    icon: Building2,
    title: "Жилые комплексы и апартаменты",
    description: "Надёжные фасадные и оконные системы для многоквартирных домов.",
    image: "/images/solutions-redesign/03-residential-complexes-web.jpg",
  },
  {
    icon: BriefcaseBusiness,
    title: "Бизнес-центры и офисные здания",
    description: "Стильные и технологичные решения для престижных объектов бизнеса.",
    image: "/images/solutions-redesign/04-business-centers-web.jpg",
  },
  {
    icon: BedDouble,
    title: "Отели и гостиничные комплексы",
    description: "Комфорт гостей и безупречный внешний вид на долгие годы.",
    image: "/images/solutions-redesign/05-hotels-web.jpg",
  },
  {
    icon: Landmark,
    title: "Общественные здания и сооружения",
    description: "Безопасность, долговечность и соответствие самым строгим нормам.",
    image: "/images/solutions-redesign/06-public-buildings-web.jpg",
  },
  {
    icon: GraduationCap,
    title: "Учебные и детские учреждения",
    description: "Безопасные и экологичные решения для образовательных пространств.",
    image: "/images/solutions-redesign/07-education-web.jpg",
  },
];

const advantages = [
  { icon: ShieldPlus, title: "Надёжность и безопасность", description: "Соответствие российским и международным стандартам качества." },
  { icon: ThermometerSun, title: "Энергоэффективность", description: "Снижение теплопотерь и экономия на отоплении и кондиционировании." },
  { icon: PencilRuler, title: "Архитектурная свобода", description: "Возможность реализации сложных архитектурных форм и решений." },
  { icon: Clock3, title: "Долговечность и качество", description: "Материалы премиум-класса и контроль качества на всех этапах." },
  { icon: Headphones, title: "Техническая поддержка", description: "Сопровождение проекта на всех этапах — от идеи до монтажа." },
  { icon: Leaf, title: "Экологичность", description: "Безопасные материалы и технологии, забота об окружающей среде." },
];

const projects = [
  { title: "Вилла на берегу озера", city: "Частный дом", image: "/images/solutions-redesign/08-lake-villa-web.jpg" },
  { title: "Жилой комплекс «Парк Резиденс»", city: "Москва", image: "/images/solutions-redesign/09-park-residence-web.jpg" },
  { title: "Бизнес-центр «Северная Башня»", city: "Санкт-Петербург", image: "/images/solutions-redesign/10-northern-tower-web.jpg" },
  { title: "Отель Mountain Resort", city: "Красная Поляна", image: "/images/solutions-redesign/11-mountain-resort-web.jpg" },
  { title: "Культурный центр «Горизонт»", city: "Казань", image: "/images/solutions-redesign/12-horizon-cultural-center-web.jpg" },
];

export default function SolutionsPage() {
  return (
    <>
      <section className="relative min-h-[650px] overflow-hidden bg-[#07111a] pt-[72px] text-white">
        <Image
          src="/images/solutions-clean-20260908.png"
          alt=""
          fill
          sizes="100vw"
          className="scale-[1.04] object-cover opacity-55 blur-[5px]"
        />
        <Image
          src="/images/solutions-clean-20260908.png"
          alt="Современное здание с панорамным алюминиевым остеклением"
          fill
          priority
          sizes="100vw"
          className="hero-zoomout-image object-cover object-[62%_center] sm:origin-right sm:scale-[0.86] lg:scale-[0.8]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#06101b]/92 via-[#06101b]/58 to-[#06101b]/12" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06101b]/55 via-transparent to-[#06101b]/22" />
        <Container className="relative z-10 flex min-h-[578px] flex-col py-7 sm:py-9">
          <Breadcrumbs items={[{ label: "Решения" }]} inverse />
          <div className="my-auto max-w-[600px] py-8">
            <h1 className="text-balance text-5xl font-semibold leading-[0.96] tracking-[-0.055em] sm:text-6xl lg:text-[3.75rem]">
              Решения БЕРТА
            </h1>
            <p className="mt-6 max-w-[450px] text-base leading-7 text-white/78 sm:text-lg">
              Комплексные алюминиевые решения для любых архитектурных задач — от частного дома до масштабных общественных проектов.
            </p>
          </div>
          <div className="grid max-w-[780px] grid-cols-2 border-t border-white/18 pt-6 sm:grid-cols-4">
            <HeroFact icon={BadgeCheck} value="10+" label="систем в линейке" />
            <HeroFact icon={ShieldCheck} value="100%" label="контроль качества" />
            <HeroFact icon={Handshake} value="Индивидуальный" label="подход к проекту" compact />
            <HeroFact icon={ShieldPlus} value="5 лет" label="гарантии" />
          </div>
        </Container>
      </section>

      <section id="solutions-list" className="scroll-mt-24 bg-[#f5f6f7] py-12 sm:py-14 lg:py-16">
        <Container>
          <div className="grid items-end gap-6 lg:grid-cols-[1fr_1fr]">
            <h2 className="text-4xl font-semibold tracking-[-0.045em] text-ink sm:text-5xl">Наши решения</h2>
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <p className="max-w-[510px] text-sm leading-6 text-steel">
                Мы предлагаем решения, которые отвечают требованиям современной архитектуры: энергоэффективность, прочность, эстетика и долговечность в каждой детали.
              </p>
              <Link href="#contact" className="inline-flex min-h-12 shrink-0 items-center justify-center gap-3 rounded-lg border border-ink/14 bg-white px-5 text-sm font-semibold text-ink transition hover:border-accent hover:text-accent">
                Подобрать решение <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {solutions.map((solution) => {
              const Icon = solution.icon;
              return (
                <Link key={solution.title} href="#contact" className="group overflow-hidden rounded-xl bg-white text-ink transition hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(7,17,26,0.1)]">
                  <div className="relative aspect-[4/4.45] overflow-hidden bg-[#07111a]">
                    <Image src={solution.image} alt={solution.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1280px) 33vw, 17vw" className="object-cover transition duration-700 group-hover:scale-[1.035]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07111a]/82 via-transparent to-transparent" />
                    <Icon aria-hidden="true" className="absolute bottom-4 left-4 h-7 w-7 text-white" />
                  </div>
                  <div className="flex min-h-[210px] flex-col p-4">
                    <h3 className="text-base font-semibold leading-5 tracking-[-0.02em]">{solution.title}</h3>
                    <p className="mt-3 text-xs leading-5 text-steel">{solution.description}</p>
                    <span className="mt-auto inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink/16 transition group-hover:border-accent group-hover:text-accent">
                      <ArrowRight aria-hidden="true" className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-10 border-t border-ink/10 pt-8">
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-ink">Преимущества наших решений</h2>
            <div className="mt-7 grid gap-px overflow-hidden rounded-xl border border-ink/8 bg-ink/8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              {advantages.map((advantage) => {
                const Icon = advantage.icon;
                return (
                  <article key={advantage.title} className="min-h-[190px] bg-[#f5f6f7] p-5">
                    <Icon aria-hidden="true" className="h-6 w-6 text-accent" />
                    <h3 className="mt-6 text-sm font-semibold leading-5 text-ink">{advantage.title}</h3>
                    <p className="mt-3 text-xs leading-5 text-steel">{advantage.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      <section id="solution-projects" className="scroll-mt-24 bg-white py-11 sm:py-13 lg:py-14">
        <Container>
          <div className="flex items-center justify-between gap-5">
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-ink">Примеры реализации решений</h2>
            <Link href="/projects" className="hidden min-h-11 items-center gap-2 rounded-lg border border-ink/12 px-5 text-sm font-semibold text-ink transition hover:border-accent hover:text-accent sm:inline-flex">
              Смотреть все проекты <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {projects.map((project) => (
              <Link key={project.title} href="/projects" className="group relative min-h-[220px] overflow-hidden rounded-xl bg-[#07111a] text-white">
                <Image src={project.image} alt={project.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1280px) 33vw, 20vw" className="object-cover transition duration-700 group-hover:scale-[1.04]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07111a]/92 via-[#07111a]/8 to-transparent" />
                <div className="relative flex min-h-[220px] flex-col justify-end p-4">
                  <h3 className="text-base font-semibold leading-5">{project.title}</h3>
                  <p className="mt-1 text-xs text-white/62">{project.city}</p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <ContactSection
        title="Подберём решение под ваш проект"
        description="Наши специалисты помогут выбрать оптимальное решение, исходя из ваших задач и бюджета."
      />
    </>
  );
}

function HeroFact({ icon: Icon, value, label, compact = false }: { icon: typeof BadgeCheck; value: string; label: string; compact?: boolean }) {
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
