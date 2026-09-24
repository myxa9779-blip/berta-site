"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

interface MobileMenuProps {
  navigation: Array<{ label: string; href: string }>;
  phone: string;
  dark?: boolean;
}

export function MobileMenu({ navigation, phone, dark = false }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="xl:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Открыть меню"
        aria-expanded={open}
        className={`rounded-full border p-3 shadow-[0_8px_24px_rgba(7,17,26,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${dark ? "border-white/30 bg-[#07111a] text-white" : "border-ink/10 bg-white text-ink"}`}
      >
        <Menu aria-hidden="true" className="h-5 w-5" />
      </button>
      {open && (
        <div className="fixed inset-0 z-[90] flex flex-col bg-white p-5 sm:p-8">
          <div className="flex items-center justify-between border-b border-ink/10 pb-5">
            <span className="text-sm font-bold uppercase tracking-[0.18em] text-ink">Навигация</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Закрыть меню"
              className="rounded-full border border-ink/10 p-3 text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <X aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex flex-1 flex-col justify-center" aria-label="Мобильная навигация">
            {navigation.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="group flex items-baseline justify-between border-b border-ink/10 py-3 text-xl font-semibold tracking-[-0.03em] text-ink transition hover:text-accent sm:text-2xl"
              >
                {item.label}
                <span className="text-xs font-medium tracking-normal text-steel">0{index + 1}</span>
              </Link>
            ))}
          </nav>
          <div className="space-y-3">
            <a href={`tel:${phone.replace(/[^+\d]/g, "")}`} className="block rounded-full border border-ink/15 px-6 py-4 text-center text-sm font-semibold text-ink">
              Позвонить: {phone}
            </a>
            <Link href="/#contact" onClick={() => setOpen(false)} className="block rounded-full bg-accent px-6 py-4 text-center text-sm font-semibold text-white">
              Получить консультацию
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
