import Image from "next/image";
import { Phone } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { Container } from "@/components/ui/Container";
import { getHomepage, getSiteSettings } from "@/lib/cms";

interface ContactSectionProps {
  title?: string;
  description?: string;
}

export async function ContactSection({
  title = "Подберём систему и подготовим следующий шаг",
  description = "Оставьте заявку, и наш специалист свяжется с вами, чтобы подобрать оптимальное решение под ваш проект.",
}: ContactSectionProps = {}) {
  const [homepage, settings] = await Promise.all([
    getHomepage(),
    getSiteSettings(),
  ]);
  const phoneHref = settings.phone.replace(/[^+\d]/g, "");

  return (
    <section id="contact" className="relative overflow-hidden bg-accent py-9 text-white sm:py-11 lg:py-12">
      <Image src="/images/home-redesign/hero-house.jpg" alt="" fill priority sizes="55vw" className="pointer-events-none object-cover object-left opacity-[0.13] mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#9e090f]/70 via-accent/85 to-accent" />
      <Container className="relative grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="max-w-xl">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">{homepage.sectionTitles.contact}</p>
          <h2 className="text-balance text-3xl font-semibold leading-[1.02] tracking-[-0.05em] sm:text-4xl lg:text-[2.75rem]">{title}</h2>
          <p className="mt-4 max-w-lg text-sm leading-6 text-white/74">{description}</p>
          <a href={`tel:${phoneHref}`} className="mt-5 inline-flex items-center gap-3 text-xl font-semibold text-white transition hover:text-white/75">
            <Phone aria-hidden="true" className="h-5 w-5" /> {settings.phone}
          </a>
        </div>
        <div className="rounded-xl bg-white p-4 text-ink shadow-[0_22px_55px_rgba(82,0,4,0.2)] sm:p-5 lg:p-6"><ContactForm compact submitLabel="Отправить" /></div>
      </Container>
    </section>
  );
}
