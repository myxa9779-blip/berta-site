import { Container } from "@/components/ui/Container";
import { getHomepage } from "@/lib/cms";

export async function TrustStrip() {
  const homepage = await getHomepage();

  if (!homepage.facts.length) return null;

  return (
    <section className="border-b border-white/10 bg-[#0b1620] py-7 text-white sm:py-9">
      <Container>
        <div className="grid grid-cols-2 gap-x-5 gap-y-7 lg:grid-cols-4 lg:divide-x lg:divide-white/15">
          {homepage.facts.slice(0, 4).map((fact) => (
            <div key={`${fact.value}-${fact.label}`} className="lg:px-8 first:lg:pl-0 last:lg:pr-0">
              <p className="text-xl font-semibold tracking-[-0.035em] text-white sm:text-2xl">
                {fact.value}
              </p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.13em] text-white/65">
                {fact.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
