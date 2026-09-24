import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Check, Ruler, ShieldCheck } from "lucide-react";
import { ContactSection } from "@/components/sections/ContactSection";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { otherProducts } from "@/data/otherProducts";
import { getCMSOtherProduct } from "@/lib/cms";
import { createMetadata } from "@/lib/metadata";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return otherProducts.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getCMSOtherProduct(slug);

  if (!product) {
    return createMetadata("Продукт не найден", "Продукты БЕРТА", `/products/${slug}`);
  }

  return createMetadata(
    product.title,
    product.shortDescription || product.description.slice(0, 155),
    `/products/${slug}`,
    product.image,
  );
}

export default async function OtherProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getCMSOtherProduct(slug);

  if (!product) {
    notFound();
  }

  const technicalCharacteristics = product.technicalCharacteristics || [];
  const advantages = product.advantages || [];

  return (
    <>
      <section className="relative min-h-[610px] overflow-hidden bg-[#07111a] pt-[72px] text-white">
        <Image
          src={product.image}
          alt={product.title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-72"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07111a]/98 via-[#07111a]/78 to-[#07111a]/18" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07111a]/78 via-transparent to-[#07111a]/24" />
        <Container className="relative z-10 flex min-h-[538px] flex-col py-7 sm:py-9">
          <Breadcrumbs items={[{ label: "Продукты БЕРТА", href: "/products" }, { label: product.title }]} inverse />
          <div className="my-auto max-w-[720px] py-12">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-accent">Другие продукты БЕРТА</p>
            <h1 className="mt-5 text-balance text-5xl font-semibold leading-[0.96] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
              {product.title}
            </h1>
            <p className="mt-7 max-w-[620px] text-base leading-7 text-white/82 sm:text-lg">
              {product.shortDescription || product.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {product.applications.map((application) => (
                <span key={application} className="rounded-full border border-white/22 bg-white/8 px-4 py-2 text-xs font-semibold backdrop-blur-sm">
                  {application}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[#eef0f2] py-12 sm:py-16 lg:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-accent">О продукте</p>
              <h2 className="mt-3 text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-ink sm:text-5xl">
                Пространство, свет и комфорт
              </h2>
            </div>
            <div className="whitespace-pre-line text-base leading-8 text-ink/76 sm:text-lg">
              {product.description}
            </div>
          </div>
        </Container>
      </section>

      {technicalCharacteristics.length ? (
        <section className="bg-white py-12 sm:py-16 lg:py-20">
          <Container>
            <div className="flex items-center gap-3">
              <Ruler className="h-6 w-6 text-accent" aria-hidden="true" />
              <h2 className="text-3xl font-semibold tracking-[-0.04em] text-ink sm:text-4xl">Технические характеристики</h2>
            </div>
            <div className="mt-8 grid gap-px overflow-hidden rounded-xl border border-ink/8 bg-ink/8 sm:grid-cols-2">
              {technicalCharacteristics.map((item) => (
                <div key={item} className="flex min-h-[86px] items-start gap-3 bg-[#f5f6f7] p-5 sm:p-6">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                  <p className="text-sm leading-6 text-ink/78 sm:text-base">{item}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {advantages.length ? (
        <section className="bg-[#eef0f2] py-12 sm:py-16 lg:py-20">
          <Container>
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-accent" aria-hidden="true" />
              <h2 className="text-3xl font-semibold tracking-[-0.04em] text-ink sm:text-4xl">Преимущества</h2>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {advantages.map((item, index) => (
                <article key={item} className="rounded-xl border border-ink/8 bg-white p-5 sm:p-6">
                  <span className="text-xs font-bold text-accent">{String(index + 1).padStart(2, "0")}</span>
                  <p className="mt-5 text-base font-semibold leading-6 text-ink">{item}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <ContactSection
        title={`Рассчитаем ${product.title}`}
        description="Оставьте контакты — уточним размеры, конфигурацию и подготовим предложение для вашего проекта."
      />
    </>
  );
}
