"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { SiteSettingsData } from "@/lib/cms";
import { Container } from "@/components/ui/Container";
import { MobileMenu } from "./MobileMenu";

export function HeaderSurface({ settings }: { settings: SiteSettingsData }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const phoneHref = settings.phone.replace(/[^+\d]/g, "");
  const overlaysDarkHero = (pathname === "/" || pathname === "/solutions" || pathname === "/about" || pathname === "/documents" || pathname === "/products/as63" || pathname === "/products/f50") && !scrolled;
  const overlaysLightHero = pathname === "/products" && !scrolled;
  const overlaysBrightHero = (pathname === "/projects" || pathname === "/contacts") && !scrolled;
  const navigation = settings.navigation.filter((item) => item.href !== "/projects");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 28);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition duration-300 ${
        overlaysDarkHero
          ? "border-b border-white/12 bg-[#07111a] text-white shadow-[0_10px_30px_rgba(7,17,26,0.14)] xl:bg-[#07111a]/18 xl:shadow-none xl:backdrop-blur-[2px]"
          : overlaysLightHero
            ? "border-b border-white/12 bg-[#07111a] text-white shadow-[0_10px_30px_rgba(7,17,26,0.14)] xl:bg-[#07111a]/30 xl:shadow-none xl:backdrop-blur-[2px]"
            : overlaysBrightHero
              ? "border-b border-ink/10 bg-white text-ink shadow-[0_10px_30px_rgba(7,17,26,0.08)] xl:bg-white/10 xl:shadow-none xl:backdrop-blur-[2px]"
          : "border-b border-ink/10 bg-white text-ink shadow-[0_8px_30px_rgba(7,17,26,0.06)]"
      }`}
    >
      <Container className="flex h-[72px] items-center justify-between gap-5">
        <Link href="/" aria-label="Берта — главная" className="relative h-10 w-[152px] shrink-0 sm:w-[166px]">
          <Image
            src={overlaysDarkHero || overlaysLightHero ? "/images/berta-logo-light.png" : settings.logo}
            alt={settings.companyName}
            fill
            priority
            sizes="(max-width: 640px) 152px, 166px"
            className="object-contain transition"
          />
        </Link>
        <nav aria-label="Основная навигация" className="hidden items-center gap-6 xl:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-[12px] font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                overlaysDarkHero || overlaysLightHero ? "text-white/75 hover:text-white" : "text-ink/68 hover:text-ink"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href={`tel:${phoneHref}`}
            aria-label={`Позвонить на горячую линию ${settings.phone}`}
            className={`group flex items-center gap-2 rounded-lg border px-3 py-3 transition sm:px-4 sm:py-2.5 ${
              overlaysDarkHero || overlaysLightHero
                ? "border-white/25 text-white hover:border-white/60"
                : "border-ink/10 text-ink hover:border-accent hover:text-accent"
            }`}
          >
            <Phone aria-hidden="true" className="h-4 w-4 shrink-0" />
            <span className="hidden whitespace-nowrap text-sm font-semibold sm:inline">{settings.phone}</span>
          </a>
          <MobileMenu navigation={navigation} phone={settings.phone} dark={overlaysDarkHero || overlaysLightHero} />
        </div>
      </Container>
    </header>
  );
}
