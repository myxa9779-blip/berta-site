import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowRight,
  Clock3,
  Headphones,
  MapPin,
  MessageSquareText,
  Navigation,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { OfficeLocator } from "@/components/contacts/OfficeLocator";
import { ContactForm } from "@/components/forms/ContactForm";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { getCMSOffices, getSiteSettings } from "@/lib/cms";
import { createMetadata } from "@/lib/metadata";
import { offices as fallbackOffices } from "@/data/company";

export const metadata: Metadata = createMetadata(
  "Контакты",
  "Офисы БЕРТА, единая линия и удобный маршрут до ближайшего офиса.",
  "/contacts",
  "/images/contacts-clean-20260908.png",
);

export default async function ContactsPage() {
  const [settings, cmsOffices] = await Promise.all([getSiteSettings(), getCMSOffices()]);
  const offices = [...cmsOffices];
  for (const office of fallbackOffices) {
    if (!offices.some((item) => item.city === office.city && item.address === office.address)) {
      offices.push({ ...office, services: [], cardStyle: "light" });
    }
  }
  const hotlineHref = `tel:${settings.phone.replace(/[^+\d]/g, "")}`;

  return (
    <>
      <section className="relative min-h-[650px] overflow-hidden bg-[#07111a] pt-[72px] text-white sm:bg-[#e9edef] sm:text-ink">
        <Image src="/images/contacts-clean-20260908.png" alt="" fill sizes="100vw" className="scale-[1.04] object-cover opacity-22 blur-[5px]" />
        <Image
          src="/images/contacts-clean-20260908.png"
          alt="Современный офисный комплекс с алюминиевым остеклением"
          fill
          priority
          sizes="100vw"
          className="hero-zoomout-image object-cover object-[66%_center] sm:origin-right sm:scale-[0.88] lg:scale-[0.82]"
        />
        <div className="absolute inset-0 bg-[#07111a]/62 sm:bg-transparent sm:bg-gradient-to-r sm:from-white/98 sm:via-white/78 sm:to-white/5" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07111a]/88 via-[#07111a]/18 to-[#07111a]/10 sm:from-white/35 sm:via-transparent sm:to-white/10" />
        <Container className="relative z-10 flex min-h-[578px] flex-col py-7 sm:py-9">
          <Breadcrumbs items={[{ label: "Контакты" }]} mobileInverse />
          <div className="my-auto max-w-[570px] py-9">
            <h1 className="text-balance text-5xl font-semibold leading-[0.96] tracking-[-0.055em] sm:text-6xl lg:text-[4.4rem]">
              Свяжитесь<br />с БЕРТА
            </h1>
            <p className="mt-7 max-w-[450px] text-base leading-7 text-white/82 sm:text-lg sm:text-ink/76">
              Мы всегда на связи и готовы ответить на ваши вопросы, предоставить консультацию и подобрать оптимальное решение.
            </p>
          </div>
          <div className="grid max-w-[820px] gap-px overflow-hidden rounded-2xl border border-white/18 bg-white/14 sm:grid-cols-3 sm:border-ink/10 sm:bg-ink/10">
            <HeroBenefit icon={Headphones} title="Быстрая поддержка" text="Обычно отвечаем в течение 30 минут" />
            <HeroBenefit icon={MessageSquareText} title="Профессиональные консультации" text="Подберём решение под ваш проект" />
            <HeroBenefit icon={ShieldCheck} title="Надёжное сотрудничество" text="Сопровождаем на всех этапах" />
          </div>
        </Container>
      </section>

      <OfficeLocator offices={offices} hotline={settings.phone} />

      <section id="message" className="scroll-mt-24 bg-[#f6f7f8] py-12 sm:py-16 lg:py-20">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-3xl bg-white p-6 shadow-[0_18px_50px_rgba(17,24,32,0.07)] sm:p-9">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-accent">Обратная связь</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-[-0.045em] text-ink">Отправьте нам сообщение</h2>
              <p className="mt-4 max-w-xl text-sm leading-6 text-steel">Оставьте контакты — специалист БЕРТА перезвонит и поможет с вашим вопросом.</p>
              <div className="mt-8"><ContactForm submitLabel="Отправить сообщение" /></div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <ContactCard icon={Phone} label="Единая бесплатная линия" value={settings.phone} href={hotlineHref} />
              <ContactCard icon={MapPin} label="Региональная сеть" value={`${offices.length} офисов — выберите ближайший на карте`} href="#office-locator-title" />
              {settings.email ? <ContactCard icon={MessageSquareText} label="Электронная почта" value={settings.email} href={`mailto:${settings.email}`} /> : null}
            </div>
          </div>

          <div className="relative mt-7 overflow-hidden rounded-3xl bg-[#07111a] text-white">
            <Image src="/images/contacts-redesign/consultation.jpg" alt="Профиль алюминиевой системы БЕРТА" fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover object-[75%_center] opacity-72 lg:object-[82%_center]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#07111a] via-[#07111a]/94 to-[#07111a]/18" />
            <div className="relative max-w-[710px] px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
              <h2 className="text-4xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-5xl">Нужна консультация по проекту?</h2>
              <p className="mt-5 max-w-[560px] text-sm leading-6 text-white/72 sm:text-base">Наши специалисты помогут подобрать оптимальное решение и рассчитают стоимость вашего проекта.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#message" className="inline-flex min-h-12 items-center gap-3 rounded-full bg-accent px-6 text-sm font-semibold text-white transition hover:bg-[#b80f16]">Получить консультацию <ArrowRight className="h-4 w-4" aria-hidden="true" /></a>
                <a href={hotlineHref} className="inline-flex min-h-12 items-center gap-3 rounded-full border border-white/28 bg-white/5 px-6 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white/60"><Phone className="h-4 w-4" aria-hidden="true" />{settings.phone}</a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <Container>
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-accent">Все адреса</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-[-0.045em] text-ink sm:text-5xl">Офисы БЕРТА</h2>
            </div>
            <p className="max-w-[460px] text-sm leading-6 text-steel">Выберите удобный адрес, позвоните напрямую или откройте маршрут в Яндекс Картах.</p>
          </div>

          <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {offices.map((office) => {
              const routeUrl = office.routeUrl || (office.latitude && office.longitude
                ? `https://yandex.ru/maps/?mode=routes&rtext=~${office.latitude},${office.longitude}&rtt=auto`
                : `https://yandex.ru/maps/?text=${encodeURIComponent(`${office.city}, ${office.address}`)}`);
              return (
                <article key={`${office.city}-${office.address}`} className="flex min-h-[270px] flex-col justify-between rounded-2xl border border-ink/9 bg-[#f6f7f8] p-6 transition hover:-translate-y-1 hover:border-ink/18 hover:shadow-soft">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-accent">{office.region}</p>
                    <h3 className="mt-4 text-2xl font-semibold tracking-[-0.035em] text-ink">{office.city}</h3>
                    <p className="mt-3 text-sm leading-6 text-steel">{office.address}</p>
                    {office.workingHours ? <p className="mt-3 flex items-center gap-2 text-sm text-steel"><Clock3 className="h-4 w-4 text-accent" aria-hidden="true" />{office.workingHours}</p> : null}
                  </div>
                  <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-ink/8 pt-5">
                    <a href={`tel:${office.phone.replace(/[^+\d]/g, "")}`} className="font-semibold text-ink transition hover:text-accent">{office.phone}</a>
                    <a href={routeUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.08em] text-accent"><Navigation className="h-4 w-4" aria-hidden="true" />Маршрут</a>
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}

function HeroBenefit({ icon: Icon, title, text }: { icon: typeof Headphones; title: string; text: string }) {
  return (
    <article className="flex min-h-[118px] items-start gap-4 bg-[#07111a]/78 p-5 backdrop-blur-md sm:bg-white/86 sm:p-6">
      <Icon className="h-7 w-7 shrink-0 text-white/88 sm:text-ink/82" aria-hidden="true" />
      <div>
        <h2 className="text-sm font-semibold leading-5 text-white sm:text-ink">{title}</h2>
        <p className="mt-2 text-xs leading-5 text-white/68 sm:text-steel">{text}</p>
      </div>
    </article>
  );
}

function ContactCard({ icon: Icon, label, value, href }: { icon: typeof Phone; label: string; value: string; href: string }) {
  return (
    <a href={href} className="group flex min-h-[150px] items-start gap-5 rounded-3xl border border-ink/8 bg-white p-6 transition hover:border-accent/35 hover:shadow-[0_18px_50px_rgba(17,24,32,0.07)] sm:p-7">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-mist text-accent transition group-hover:bg-accent group-hover:text-white"><Icon className="h-5 w-5" aria-hidden="true" /></span>
      <span>
        <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-steel">{label}</span>
        <span className="mt-3 block text-lg font-semibold leading-6 text-ink">{value}</span>
      </span>
    </a>
  );
}
