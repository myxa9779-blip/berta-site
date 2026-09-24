import Link from "next/link";
import { ArrowRight, Building2, DoorOpen, House, LayoutGrid, Maximize2, PanelsTopLeft, PanelTop, Snowflake } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { getCMSSolutions, getHomepage } from "@/lib/cms";

const solutionIcons = [House, DoorOpen, Building2, LayoutGrid, PanelsTopLeft, PanelTop, Maximize2, Snowflake];

export async function SolutionsSection() {
  const [solutions, homepage] = await Promise.all([
    getCMSSolutions(),
    getHomepage(),
  ]);

  return (
    <section id="home-solutions" className="scroll-mt-24 bg-white py-12 sm:py-14 lg:py-16">
      <Container>
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-accent">{homepage.sectionTitles.solutions}</p>
            <h2 className="mt-3 text-balance text-3xl font-semibold leading-[1.02] tracking-[-0.045em] text-ink sm:text-4xl">
              Выберите задачу — мы покажем подходящую систему
            </h2>
          </div>
          <Link href="/solutions" className="inline-flex min-h-11 shrink-0 items-center gap-2 self-start rounded-lg border border-ink/12 px-5 text-sm font-semibold text-ink transition hover:border-accent hover:text-accent sm:self-auto">
            Все решения <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {solutions.slice(0, 8).map((solution, index) => {
            const Icon = solutionIcons[index];
            return (
              <Link
                key={solution.slug}
                href={`/solutions#${solution.slug}`}
                className="group flex min-h-[148px] flex-col rounded-lg border border-ink/10 bg-white p-5 transition duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-[0_14px_35px_rgba(17,24,32,0.08)]"
              >
                <div className="flex items-start gap-3">
                  <Icon aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <div>
                    <h3 className="text-base font-semibold tracking-[-0.02em] text-ink">{solution.title}</h3>
                    <p className="mt-2 text-xs leading-5 text-steel">{solution.description}</p>
                  </div>
                </div>
                <span className="mt-auto inline-flex items-center gap-2 pt-4 text-[11px] font-semibold text-accent">
                  Подобрать систему <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
