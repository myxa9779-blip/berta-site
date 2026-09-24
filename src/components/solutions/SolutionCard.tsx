import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Solution } from "@/types";

export function SolutionCard({ solution, index }: { solution: Solution; index: number }) {
  return (
    <Link href={`/solutions#${solution.slug}`} className="group flex min-h-72 flex-col justify-between border-t border-ink/15 py-6 transition hover:border-accent sm:p-6 sm:hover:bg-white sm:hover:shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <span className="text-xs font-bold tracking-[0.2em] text-steel">0{index + 1}</span>
        <ArrowRight aria-hidden="true" className="h-5 w-5 text-steel transition group-hover:translate-x-1 group-hover:text-accent" />
      </div>
      <div>
        <h3 className="text-2xl font-semibold tracking-[-0.035em] text-ink">{solution.title}</h3>
        <p className="mt-3 text-sm leading-6 text-steel">{solution.description}</p>
        <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-accent">{solution.systems.join(" · ")}</p>
      </div>
    </Link>
  );
}
