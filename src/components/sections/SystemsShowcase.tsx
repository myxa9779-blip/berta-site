import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { getCMSSystems } from "@/lib/cms";

const cardPresentation = [
  {
    image: "/images/home-redesign/window-system.jpg",
    category: "Оконные системы",
    description: "Премиальная система с климатическими линиями профиля и высокой теплоизоляцией.",
  },
  {
    image: "/images/home-redesign/facade-system.jpg",
    category: "Фасадные системы",
    description: "Стоечно-ригельная фасадная система для крупноформатного остекления и архитектурных проектов любого масштаба.",
  },
  {
    image: "/images/home-redesign/door-system.jpg",
    category: "Дверные системы",
    description: "Премиальная система с повышенной теплоизоляцией и герметичностью для входных групп и панорамных дверей.",
  },
  {
    image: "/images/home-redesign/additional-system.jpg",
    category: "Дополнительные системы",
    description: "Универсальная система для внутренних перегородок, витражей и лёгких светопрозрачных конструкций.",
  },
];

export async function SystemsShowcase() {
  const systems = await getCMSSystems();

  return (
    <section id="products" className="bg-[#f2f3f4] py-14 sm:py-16 lg:py-20">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-accent">Наши продукты</p>
            <h2 className="mt-3 max-w-[680px] text-balance text-4xl font-semibold leading-[0.98] tracking-[-0.05em] text-ink sm:text-5xl">
              Продукты для окон,<br />дверей и <span className="text-accent">фасадов</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-steel sm:text-base">
            Мы разрабатываем и производим собственные алюминиевые системы, которые отвечают самым высоким требованиям архитекторов, застройщиков и частных клиентов.
          </p>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {systems.slice(0, 4).map((system, index) => {
            const presentation = cardPresentation[index];
            return (
              <Link
                key={system.slug}
                href={system.slug === "as63" ? "/products/as63" : system.slug === "sr50" ? "/products/f50" : `/products#${system.slug}`}
                className="group relative min-h-[440px] overflow-hidden rounded-xl bg-[#07111a] text-white shadow-[0_18px_45px_rgba(7,17,26,0.12)]"
              >
                <Image
                  src={presentation.image}
                  alt={`${presentation.category} ${system.name}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.035]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06101b] via-[#06101b]/35 to-[#06101b]/5" />
                <div className="relative flex min-h-[440px] flex-col justify-between p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-3">
                    <span className="rounded-full border border-white/35 bg-[#07111a]/25 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.12em] backdrop-blur-sm">
                      {presentation.category}
                    </span>
                    {system.status === "development" ? (
                      <span className="rounded-full bg-accent px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.1em] text-white">
                        Скоро в продаже
                      </span>
                    ) : null}
                  </div>
                  <div>
                    <div className="rounded-xl border border-white/10 bg-[#596168]/28 p-4 shadow-[0_12px_32px_rgba(7,17,26,0.12)] backdrop-blur-[3px]">
                      <h3 className="text-2xl font-semibold tracking-[-0.035em] sm:text-[1.7rem]">{system.name}</h3>
                      <p className="mt-3 min-h-[72px] text-xs leading-5 text-white/90 sm:text-[13px]">{presentation.description}</p>
                    </div>
                    <span className="mt-5 grid h-9 w-9 place-items-center rounded-full border border-white/35 transition group-hover:border-accent group-hover:bg-accent">
                      <ArrowRight aria-hidden="true" className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
