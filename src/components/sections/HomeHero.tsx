import Image from "next/image";
import { Box, Building2, ShieldCheck, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getHomepage } from "@/lib/cms";
import { HeroPromoBanner } from "./HeroPromoBanner";

const factIcons = [Box, Star, Building2, ShieldCheck];

export async function HomeHero() {
  const homepage = await getHomepage();
  const hasPromoBanner = homepage.promoBanner.enabled && !/до конца августа/i.test(homepage.promoBanner.deadline || "");
  const facts = homepage.facts.slice(0, 4).map((fact) => {
    const text = `${fact.value} ${fact.label}`.toLocaleLowerCase("ru-RU");
    if (text.includes("офис")) return { ...fact, value: "15", label: "офисов в регионах присутствия" };
    if (text.includes("1 000 000") || text.includes("миллион")) return { ...fact, value: "Более 1 000 000", label: "установленных окон" };
    if (text.includes("гарант")) return { ...fact, label: "гарантии" };
    return fact;
  });
  const hasDirectCatalog = /\.pdf(?:$|\?)/i.test(homepage.secondaryAction.href);
  const useBrandedHeadline = homepage.title.toLocaleLowerCase("ru-RU").includes("сравните предложение");

  return (
    <section className="relative overflow-hidden bg-[#07111a] pt-[72px] text-white">
      <Image
        src="/images/hero-20260727/home.jpg"
        alt=""
        fill
        sizes="100vw"
        className="scale-[1.04] object-cover opacity-55 blur-[5px]"
      />
      <Image
        src={homepage.heroImage}
        alt="Современный дом с панорамным алюминиевым остеклением"
        fill
        priority
        sizes="100vw"
        className="hero-zoomout-image object-cover object-[58%_55%] sm:origin-right sm:scale-[0.86] lg:scale-[0.8]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#06101b]/95 via-[#06101b]/72 to-[#06101b]/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#06101b]/85 via-transparent to-[#06101b]/30" />

      <Container className="relative z-10 flex min-h-[720px] flex-col justify-between pb-6 pt-8 sm:min-h-[760px] sm:pb-8 lg:min-h-[790px] lg:pt-12">
        <div className={`reveal grid flex-1 items-center gap-8 py-8 lg:py-10 ${hasPromoBanner ? "lg:grid-cols-[minmax(0,1fr)_270px] xl:grid-cols-[minmax(0,1fr)_300px]" : ""}`}>
          <div className={hasPromoBanner ? "max-w-[760px]" : "max-w-[920px]"}>
            <div className="mb-5 text-[11px] font-bold uppercase tracking-[0.17em] text-accent sm:text-xs">
              {homepage.eyebrow}
            </div>
            <h1 className="max-w-[790px] text-balance text-[clamp(2.6rem,5.4vw,5.35rem)] font-semibold leading-[0.96] tracking-[-0.06em] text-white">
              {useBrandedHeadline ? (
                <>
                  Прежде чем заказать окна — сравните предложение{" "}
                  <span className="inline-block whitespace-nowrap align-[0.03em]">
                    <Image
                      src="/images/berta-logo-light.png"
                      alt="БЕРТА"
                      width={1108}
                      height={177}
                      className="inline-block h-[0.62em] w-auto"
                    />
                  </span>
                </>
              ) : homepage.title}
            </h1>
            <p className="mt-5 max-w-[590px] text-pretty text-sm leading-6 text-white/78 sm:text-base sm:leading-7">
              Собственное производство. Честные цены. Более 20 лет опыта и более миллиона установленных окон.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button href={homepage.primaryAction.href} showArrow className="rounded-md px-7">Получить предложение</Button>
              {hasDirectCatalog ? <Button href={homepage.secondaryAction.href} variant="light" className="rounded-md px-7">{homepage.secondaryAction.label}</Button> : null}
            </div>
          </div>
          <HeroPromoBanner
            enabled={hasPromoBanner}
            image={homepage.promoBanner.image}
            alt={homepage.promoBanner.alt}
            href={homepage.promoBanner.href}
            discount={homepage.promoBanner.discount}
            title={homepage.promoBanner.title}
            subtitle={homepage.promoBanner.subtitle}
            deadline={homepage.promoBanner.deadline}
            footnote={homepage.promoBanner.footnote}
          />
        </div>
        {facts.length ? (
          <div className="grid grid-cols-2 overflow-hidden rounded-xl border border-white/22 bg-[#07111a]/28 shadow-[0_20px_60px_rgba(0,0,0,0.18)] backdrop-blur-[5px] lg:grid-cols-4 lg:divide-x lg:divide-white/18">
            {facts.map((fact, index) => {
              const Icon = factIcons[index];
              return (
                <div key={`${fact.value}-${fact.label}`} className="flex min-h-[104px] gap-4 border-b border-white/12 p-4 last:border-b-0 sm:p-5 lg:border-b-0 lg:px-6">
                  <Icon aria-hidden="true" className="mt-0.5 h-6 w-6 shrink-0 text-white/85" />
                  <div>
                    <p className="text-lg font-semibold tracking-[-0.03em] text-white">{fact.value}</p>
                    <p className="mt-1 max-w-[190px] text-[11px] leading-4 text-white/62">{fact.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}
      </Container>
    </section>
  );
}
