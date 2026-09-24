"use client";

import { useState } from "react";

interface TabItem {
  label: string;
  content: string[];
}

export function Tabs({ items }: { items: TabItem[] }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div role="tablist" aria-label="Информация о системе" className="flex gap-2 overflow-x-auto pb-3">
        {items.map((item, index) => (
          <button
            key={item.label}
            role="tab"
            aria-selected={active === index}
            onClick={() => setActive(index)}
            className={`shrink-0 rounded-full px-5 py-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
              active === index ? "bg-ink text-white" : "bg-mist text-steel hover:text-ink"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items[active]?.content.map((value) => (
          <div key={value} className="border-l-2 border-accent bg-white px-5 py-4 text-sm font-medium text-ink">
            {value}
          </div>
        ))}
      </div>
    </div>
  );
}
