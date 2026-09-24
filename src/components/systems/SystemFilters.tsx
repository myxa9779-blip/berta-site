"use client";

import { useMemo, useState } from "react";
import type { AluminiumSystem, SystemCategory } from "@/types";
import { SystemCard } from "./SystemCard";

const filters: Array<{ label: string; value: "all" | SystemCategory }> = [
  { label: "Все системы", value: "all" },
  { label: "Тёплые", value: "warm" },
  { label: "Холодные", value: "cold" },
  { label: "Фасадные", value: "facade" },
];

export function SystemFilters({ systems }: { systems: AluminiumSystem[] }) {
  const [filter, setFilter] = useState<(typeof filters)[number]["value"]>("all");
  const filtered = useMemo(() => systems.filter((system) => filter === "all" || system.category === filter), [filter, systems]);

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2" aria-label="Фильтр систем">
        {filters.map((item) => (
          <button key={item.value} type="button" onClick={() => setFilter(item.value)} aria-pressed={filter === item.value} className={`rounded-full px-5 py-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${filter === item.value ? "bg-ink text-white" : "bg-white text-steel hover:text-ink"}`}>
            {item.label}
          </button>
        ))}
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {filtered.map((system) => <SystemCard key={system.slug} system={system} />)}
      </div>
    </div>
  );
}
