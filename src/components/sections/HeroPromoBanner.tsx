"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

interface HeroPromoBannerProps {
  enabled: boolean;
  image?: string;
  alt: string;
  href?: string;
  discount: string;
  title: string;
  subtitle: string;
  deadline: string;
  footnote: string;
}

export function HeroPromoBanner({
  enabled,
  image,
  alt,
  href,
  discount,
  title,
  subtitle,
  deadline,
  footnote,
}: HeroPromoBannerProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setIsVisible(false);
      return;
    }

    const timer = window.setTimeout(() => setIsVisible(true), 1000);
    return () => window.clearTimeout(timer);
  }, [enabled]);

  if (!enabled) return null;

  const content = (
    <span className="relative flex min-h-[300px] flex-col overflow-hidden rounded-xl border border-white/28 bg-[#07111a]/38 px-6 py-7 text-left shadow-[0_28px_80px_rgba(0,0,0,0.3)] backdrop-blur-[7px] transition duration-500 group-hover:-translate-y-1 group-hover:border-white/45 sm:min-h-[330px] sm:px-7 sm:py-8">
      {image ? (
        <span className="pointer-events-none absolute inset-0 opacity-15">
          <Image src={image} alt="" fill sizes="340px" className="object-contain" />
        </span>
      ) : null}
      <span className="relative block text-[clamp(4.2rem,7vw,6.6rem)] font-semibold leading-[0.82] tracking-[-0.09em] text-white drop-shadow-[0_8px_24px_rgba(0,0,0,0.34)]">
        {discount}
      </span>
      <span className="relative mt-5 block text-lg font-bold uppercase leading-[1] tracking-[-0.025em] text-white sm:text-xl">
        {title}
      </span>
      <span className="relative mt-4 h-px w-11 bg-accent" />
      <span className="relative mt-5 block text-xs leading-5 text-white/72">
        Акция действует<br />{deadline.toLocaleLowerCase()}
      </span>
      <span className="relative mt-auto flex items-end justify-between gap-4 pt-4">
        <span className="max-w-[155px] text-[9px] font-semibold uppercase leading-4 tracking-[0.12em] text-white/45">{subtitle || footnote}</span>
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-accent text-white shadow-[0_10px_30px_rgba(217,25,32,0.35)] transition group-hover:translate-x-1">
          <ArrowRight aria-hidden="true" className="h-5 w-5" />
        </span>
      </span>
    </span>
  );

  const className = [
    "group block w-full max-w-[280px] justify-self-center lg:max-w-[300px] lg:justify-self-end",
    "transition-[opacity,transform,filter] duration-700 ease-out motion-reduce:transition-none",
    isVisible
      ? "translate-y-0 scale-100 opacity-100 blur-0"
      : "pointer-events-none translate-y-6 scale-[0.96] opacity-0 blur-[3px]",
  ].join(" ");

  return href ? (
    <Link href={href} className={className} aria-label={alt}>
      {content}
    </Link>
  ) : (
    <div className={className}>{content}</div>
  );
}
