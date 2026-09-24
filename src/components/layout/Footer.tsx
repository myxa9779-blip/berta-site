import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { getCMSSystems, getSiteSettings } from "@/lib/cms";

export async function Footer() {
  const [settings, systems] = await Promise.all([
    getSiteSettings(),
    getCMSSystems(),
  ]);
  const phoneHref = settings.phone.replace(/[^+\d]/g, "");
  const navigation = settings.navigation.filter((item) => item.href !== "/projects");

  return (
    <footer className="bg-[#07111a] py-10 text-white sm:py-12">
      <Container>
        <div className="grid gap-9 border-b border-white/10 pb-9 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="relative mb-5 h-10 w-44 overflow-hidden">
              <Image src="/images/berta-logo-light.png" alt={settings.companyName} fill priority sizes="176px" className="object-contain object-left" />
            </div>
            <p className="max-w-xs text-xs leading-5 text-white/55">{settings.description}</p>
          </div>
          <div>
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Разделы</p>
            <ul className="grid gap-2 text-xs">
              {navigation.slice(0, 6).map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-white/70 transition hover:text-white">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Продукты БЕРТА</p>
            <ul className="grid gap-2 text-xs">
              {systems.map((system) => (
                <li key={system.slug}>
                  <Link href={system.slug === "as63" ? "/products/as63" : system.slug === "sr50" ? "/products/f50" : `/products#${system.slug}`} className="text-white/70 transition hover:text-white">{system.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Контакты</p>
            <div className="space-y-2 text-xs text-white/70">
              <a href={`tel:${phoneHref}`} className="block text-base font-semibold text-white transition hover:text-accent">{settings.phone}</a>
              <p>{settings.address}</p>
              <Link href="/contacts" className="inline-block text-white transition hover:text-accent">Все офисы →</Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 pt-6 text-[10px] text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Берта.</p>
          <div className="flex flex-wrap gap-5">
            <Link href="/privacy" className="transition hover:text-white">Политика конфиденциальности</Link>
            <Link href="/terms" className="transition hover:text-white">Пользовательское соглашение</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
