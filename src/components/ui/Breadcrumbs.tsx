import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items, inverse = false, mobileInverse = false }: { items: BreadcrumbItem[]; inverse?: boolean; mobileInverse?: boolean }) {
  const textClass = inverse
    ? "text-white/55"
    : mobileInverse
      ? "text-white/65 sm:text-steel"
      : "text-steel";
  const linkClass = inverse
    ? "hover:text-white"
    : mobileInverse
      ? "hover:text-white sm:hover:text-ink"
      : "hover:text-ink";
  const currentClass = inverse
    ? "text-white"
    : mobileInverse
      ? "text-white sm:text-ink"
      : "text-ink";

  return (
    <nav aria-label="Хлебные крошки" className={`mb-8 flex flex-wrap items-center gap-2 text-sm ${textClass}`}>
      <Link href="/" className={`transition ${linkClass}`}>
        Главная
      </Link>
      {items.map((item) => (
        <span key={item.label} className="flex items-center gap-2">
          <ChevronRight aria-hidden="true" className="h-3.5 w-3.5" />
          {item.href ? (
            <Link href={item.href} className={`transition ${linkClass}`}>
              {item.label}
            </Link>
          ) : (
            <span className={currentClass}>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
