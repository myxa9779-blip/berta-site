import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { AluminiumSystem } from "@/types";
import { Badge } from "@/components/ui/Badge";

export function SystemCard({ system, featured = false }: { system: AluminiumSystem; featured?: boolean }) {
  return (
    <Link
      href={system.slug === "as63" ? "/products/as63" : system.slug === "sr50" ? "/products/f50" : `/products#${system.slug}`}
      className={`group relative overflow-hidden rounded-2xl bg-[#0b1620] text-white ${featured ? "min-h-[520px]" : "min-h-[440px]"}`}
    >
      <Image
        src={system.image}
        alt={system.name}
        fill
        sizes={featured ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 768px) 100vw, 50vw"}
        className="object-cover opacity-55 transition duration-700 group-hover:scale-[1.04] group-hover:opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#07111a] via-[#07111a]/35 to-transparent" />
      <div className="relative flex h-full min-h-[inherit] flex-col justify-between p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <Badge>{system.statusLabel}</Badge>
          <span className="rounded-full border border-white/20 p-3 transition group-hover:border-white group-hover:bg-white group-hover:text-ink">
            <ArrowUpRight aria-hidden="true" className="h-5 w-5" />
          </span>
        </div>
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-white/55">{system.categoryLabel}</p>
          <h3 className="text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">{system.name}</h3>
          <p className="mt-5 max-w-lg text-sm leading-6 text-white/70 sm:text-base">{system.summary}</p>
        </div>
      </div>
    </Link>
  );
}
