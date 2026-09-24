import type { ReactNode } from "react";

export function Badge({ children, muted = false }: { children: ReactNode; muted?: boolean }) {
  return (
    <span
      className={`inline-flex self-start rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-[0.15em] ${
        muted ? "border-ink/10 bg-ink/5 text-steel" : "border-accent/20 bg-accent/5 text-accent"
      }`}
    >
      {children}
    </span>
  );
}
