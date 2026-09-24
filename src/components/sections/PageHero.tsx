import Image from "next/image";
import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  description: string;
  image?: string;
  imageClassName?: string;
  overlayClassName?: string;
  breadcrumbs: Array<{ label: string; href?: string }>;
}

export function PageHero({ eyebrow, title, description, image, imageClassName = "object-center", overlayClassName = "bg-gradient-to-r from-[#07111a] via-[#07111a]/75 to-[#07111a]/20", breadcrumbs }: PageHeroProps) {
  return (
    <section className={`relative overflow-hidden pt-[76px] ${image ? "min-h-[720px] bg-[#0b1620] text-white" : "architectural-grid bg-[#f7f8f8]"}`}>
      {image && <><Image src={image} alt="" fill priority sizes="100vw" className={`object-cover opacity-45 ${imageClassName}`} /><div className={`absolute inset-0 ${overlayClassName}`} /></>}
      <Container className={`relative z-10 flex min-h-[520px] flex-col justify-center py-20 ${image ? "lg:min-h-[644px]" : ""}`}>
        <Breadcrumbs items={breadcrumbs} inverse={Boolean(image)} />
        <p className={`mb-6 text-xs font-bold uppercase tracking-[0.22em] ${image ? "text-white/60" : "text-accent"}`}>{eyebrow}</p>
        <h1 className={`max-w-5xl text-balance text-5xl font-semibold leading-[0.95] tracking-[-0.065em] sm:text-6xl lg:text-8xl ${image ? "text-white" : "text-ink"}`}>{title}</h1>
        <p className={`mt-7 max-w-2xl text-pretty text-base leading-7 sm:text-lg ${image ? "text-white/65" : "text-steel"}`}>{description}</p>
      </Container>
    </section>
  );
}
