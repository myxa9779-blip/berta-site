import configPromise from "@payload-config";
import { unstable_noStore as noStore } from "next/cache";
import { getPayload } from "payload";
import { company, offices as fallbackOffices } from "@/data/company";
import { otherProducts as fallbackOtherProducts } from "@/data/otherProducts";
import { navigation as fallbackNavigation } from "@/data/navigation";
import { solutions as fallbackSolutions } from "@/data/solutions";
import { systems as fallbackSystems } from "@/data/systems";
import {
  warmDoorPricesFallback,
  type WarmDoorPricesContent,
} from "@/data/warmDoors";
import {
  warmWindowPricesFallback,
  type WarmWindowPricesContent,
} from "@/data/warmWindows";
import type {
  Homepage,
  Media,
  Page,
  SiteSetting,
  SolutionsPage,
  System as CMSSystem,
} from "@/payload-types";
import type {
  AluminiumSystem,
  DocumentItem,
  OtherProduct,
  Solution,
} from "@/types";

export interface CMSProject {
  id: string;
  title: string;
  category: string;
  system: string;
  image: string;
  note: string;
  city?: string;
  gallery: string[];
}

export interface CMSOffice {
  region: string;
  city: string;
  address: string;
  phone: string;
  workingHours?: string;
  routeUrl?: string;
  latitude?: number;
  longitude?: number;
  photo?: string;
  services: string[];
  cardStyle: "light" | "dark" | "accent";
}

export interface CMSSupplier {
  id: string;
  name: string;
  role: string;
  description?: string;
  website?: string;
  logo?: string;
  logoTheme: "light" | "dark" | "green";
}

export interface SiteSettingsData {
  companyName: string;
  description: string;
  phone: string;
  email: string;
  address: string;
  logo: string;
  navigation: Array<{ label: string; href: string }>;
}

export interface HomepageData {
  eyebrow: string;
  title: string;
  description: string;
  heroImage: string;
  promoBanner: {
    enabled: boolean;
    image?: string;
    alt: string;
    href?: string;
    discount: string;
    title: string;
    subtitle: string;
    deadline: string;
    footnote: string;
  };
  primaryAction: { label: string; href: string };
  secondaryAction: { label: string; href: string };
  facts: Array<{ value: string; label: string }>;
  sectionTitles: {
    systems: string;
    solutions: string;
    projects: string;
    contact: string;
  };
}

export interface SolutionsPageData {
  doorPrices: WarmDoorPricesContent;
  windowPrices: WarmWindowPricesContent;
}

async function getCMS() {
  return getPayload({ config: configPromise });
}

function normalizeProductLabel(value: string) {
  return value
    .replace(/\b(?:БЕРТА\s+)?(?:SR|F)[ -]?50\b/gi, "БЕРТА F50")
    .replace(/\b(?:БЕРТА\s+)?(?:AS|AC)[ -]?(45|63|70)\b/gi, (_, number) => {
      return `БЕРТА AS${number}`;
    })
    .replace(/(?:БЕРТА\s+){2,}/gi, "БЕРТА ");
}

function normalizeDoorTitle(value: string) {
  const normalized = normalizeProductLabel(value);

  if (/\bБЕРТА AS63\b/.test(normalized)) return normalized;

  return `${normalized} БЕРТА AS63`;
}

export function resolveMediaURL(
  value: number | Media | null | undefined,
  fallback: string,
) {
  if (typeof value !== "object" || !value?.url) return fallback;

  // Payload builds absolute media URLs from `serverURL`. On the temporary
  // HTTPS-by-IP deployment Next/Image rejects that host as an unconfigured
  // remote source. Media belongs to this application, so keep its file route
  // same-origin. This also prevents saved CMS records from retaining a stale
  // host after the site is moved to its final domain.
  try {
    const mediaURL = new URL(value.url, "http://localhost");

    if (mediaURL.pathname.startsWith("/api/media/file/")) {
      return `${mediaURL.pathname}${mediaURL.search}`;
    }
  } catch {
    // Preserve non-standard URLs so callers still receive the uploaded file.
  }

  return value.url;
}

function mapSystem(system: CMSSystem): AluminiumSystem {
  return {
    slug: system.slug,
    name: normalizeProductLabel(system.name),
    code: normalizeProductLabel(system.code),
    category: system.category,
    categoryLabel: system.categoryLabel,
    status: system.status,
    statusLabel:
      system.status === "development"
        ? "Скоро в продаже"
        : system.statusLabel,
    tagline: normalizeProductLabel(system.tagline),
    summary: normalizeProductLabel(system.summary),
    audience:
      system.audience?.map((item) => normalizeProductLabel(item.text)) || [],
    applications:
      system.applications?.map((item) => normalizeProductLabel(item.text)) || [],
    constructionTypes:
      system.constructionTypes?.map((item) =>
        normalizeProductLabel(item.text),
      ) || [],
    benefits: system.benefits?.map((item) => ({
      title: normalizeProductLabel(item.title),
      description: normalizeProductLabel(item.description),
    })) || [],
    image: resolveMediaURL(system.image, system.legacyImage || "/images/hero-building.jpg"),
    gallery: system.gallery?.map((item) => ({
      src: resolveMediaURL(item.image, item.legacyImage || "/images/hero-building.jpg"),
      alt: normalizeProductLabel(item.alt || system.name),
    })) || [],
    specifications: system.specifications?.map((item) => ({
      label: normalizeProductLabel(item.label),
      value: normalizeProductLabel(item.value),
    })) || [],
    faqs: system.faqs?.map((item) => ({
      question: normalizeProductLabel(item.question),
      answer: normalizeProductLabel(item.answer),
    })) || [],
  };
}

export async function getSiteSettings(): Promise<SiteSettingsData> {
  noStore();

  try {
    const payload = await getCMS();
    const settings = (await payload.findGlobal({
      slug: "site-settings",
      depth: 1,
    })) as SiteSetting;

    return {
      companyName: settings.companyName || company.name,
      description: settings.description || company.description,
      phone: settings.phone || company.phone,
      email: settings.email || company.email,
      address: settings.address || company.address,
      logo: resolveMediaURL(settings.logo, "/images/berta-logo.png"),
      navigation:
        settings.navigation
          ?.filter(
            (item) =>
              item.enabled !== false &&
              item.href !== "/architects" &&
              item.href !== "/partners",
          )
          .map((item) =>
            item.href === "/systems"
              ? { label: "Продукты БЕРТА", href: "/products" }
              : { label: item.label, href: item.href },
          ) || [...fallbackNavigation],
    };
  } catch (error) {
    console.error("CMS site settings fallback:", error);
    return {
      companyName: company.name,
      description: company.description,
      phone: company.phone,
      email: company.email,
      address: company.address,
      logo: "/images/berta-logo.png",
      navigation: [...fallbackNavigation],
    };
  }
}

export async function getHomepage(): Promise<HomepageData> {
  noStore();

  try {
    const payload = await getCMS();
    const page = (await payload.findGlobal({
      slug: "homepage",
      depth: 1,
      draft: false,
    })) as Homepage;

    return {
      eyebrow: page.eyebrow,
      title: page.title,
      description: page.description,
      heroImage: resolveMediaURL(
        page.heroImage,
        page.legacyHeroImage || "/images/hero-20260727/home.jpg",
      ),
      promoBanner: {
        enabled:
          (page.promoBanner?.enabled ?? false) &&
          (!page.promoBanner?.expiresAt ||
            new Date(page.promoBanner.expiresAt).getTime() >= Date.now()),
        image:
          typeof page.promoBanner?.image === "object" &&
          page.promoBanner.image?.url
            ? page.promoBanner.image.url
            : undefined,
        alt:
          page.promoBanner?.alt ||
          "Скидка 50% на декор изделия до конца августа",
        href: page.promoBanner?.href || "#contact",
        discount: page.promoBanner?.discount || "−50%",
        title: page.promoBanner?.title || "Декор изделия",
        subtitle:
          page.promoBanner?.subtitle || "Только на момент запуска системы",
        deadline: page.promoBanner?.deadline || "До конца августа",
        footnote:
          page.promoBanner?.footnote ||
          "Скидка 50% предоставляется на услугу ламинации",
      },
      primaryAction: {
        label: page.primaryAction?.label || "Подобрать систему",
        href: page.primaryAction?.href || "/products",
      },
      secondaryAction: {
        label:
          page.secondaryAction?.label || "Скачать каталог",
        href:
          page.secondaryAction?.href || "/documents",
      },
      facts:
        page.facts?.map((item) => ({
          value: normalizeProductLabel(item.value),
          label: item.label,
        })) || [],
      sectionTitles: {
        systems: page.sectionTitles?.systems || "Наши продукты",
        solutions: page.sectionTitles?.solutions || "Подбор решения",
        projects: page.sectionTitles?.projects || "Проекты и архитектура",
        contact: page.sectionTitles?.contact || "Бесплатная консультация",
      },
    };
  } catch (error) {
    console.error("CMS homepage fallback:", error);
    return {
      eyebrow: "Алюминиевые системы БЕРТА",
      title:
        "Прежде чем заказать — сравните предложение БЕРТА",
      description:
        "Собственные алюминий и метеллопрозрачные системы для окон, дверей, фасадов и светопрозрачных конструкций. Технологичность, надёжность и архитектурная эстетика в каждой детали.",
      heroImage: "/images/hero-20260727/home.jpg",
      promoBanner: {
        enabled: true,
        alt: "Скидка 50% на декор изделия до конца августа",
        href: "#contact",
        discount: "−50%",
        title: "Декор изделия",
        subtitle: "Только на момент запуска системы",
        deadline: "До конца августа",
        footnote: "Скидка 50% предоставляется на услугу ламинации",
      },
      primaryAction: { label: "Подобрать систему", href: "/products" },
      secondaryAction: {
        label: "Скачать каталог",
        href: "/documents",
      },
      facts: [
        { value: "С 2005 года", label: "На рынке светопрозрачных конструкций" },
        { value: "Более 1 000 000", label: "Изготовленных алюминиевых изделий" },
        { value: "15", label: "Офисов в ключевых городах Юга России" },
        { value: "5 лет", label: "Гарантии на все системы БЕРТА" },
      ],
      sectionTitles: {
        systems: "Наши продукты",
        solutions: "Подбор решения",
        projects: "Проекты и архитектура",
        contact: "Бесплатная консультация",
      },
    };
  }
}

export async function getSolutionsPageSettings(): Promise<SolutionsPageData> {
  noStore();

  try {
    const payload = await getCMS();
    const page = (await payload.findGlobal({
      slug: "solutions-page",
      depth: 0,
    })) as SolutionsPage;
    const configuredCards = page.doorPrices?.cards;
    const configuredWindowCards = page.windowPrices?.cards;

    return {
      doorPrices: {
        eyebrow:
          page.doorPrices?.eyebrow || warmDoorPricesFallback.eyebrow,
        title: page.doorPrices?.title || warmDoorPricesFallback.title,
        description:
          normalizeProductLabel(
            page.doorPrices?.description || warmDoorPricesFallback.description,
          ),
        ctaLabel:
          page.doorPrices?.ctaLabel || warmDoorPricesFallback.ctaLabel,
        ctaHref: page.doorPrices?.ctaHref || warmDoorPricesFallback.ctaHref,
        cards: warmDoorPricesFallback.cards.map((fallback, index) => {
          const card = configuredCards?.[index];

          if (!card) return fallback;

          return {
            title: normalizeDoorTitle(card.title || fallback.title),
            note: card.note || fallback.note,
            price: card.price || fallback.price,
            oldPrice: card.oldPrice || undefined,
            variant: card.variant || fallback.variant,
          };
        }),
      },
      windowPrices: {
        eyebrow:
          page.windowPrices?.eyebrow || warmWindowPricesFallback.eyebrow,
        title: page.windowPrices?.title || warmWindowPricesFallback.title,
        description:
          normalizeProductLabel(
            page.windowPrices?.description ||
              warmWindowPricesFallback.description,
          ),
        ctaLabel:
          page.windowPrices?.ctaLabel || warmWindowPricesFallback.ctaLabel,
        ctaHref:
          page.windowPrices?.ctaHref || warmWindowPricesFallback.ctaHref,
        cards: warmWindowPricesFallback.cards.map((fallback, index) => {
          const card = configuredWindowCards?.[index];

          if (!card) return fallback;

          return {
            title: normalizeProductLabel(card.title || fallback.title),
            note: card.note || fallback.note,
            price: card.price || fallback.price,
            oldPrice: card.oldPrice || undefined,
            variant: card.variant || fallback.variant,
          };
        }),
      },
    };
  } catch (error) {
    console.error("CMS solutions page fallback:", error);
    return {
      doorPrices: warmDoorPricesFallback,
      windowPrices: warmWindowPricesFallback,
    };
  }
}

export async function getCMSSystems(): Promise<AluminiumSystem[]> {
  noStore();

  try {
    const payload = await getCMS();
    const result = await payload.find({
      collection: "systems",
      depth: 1,
      draft: false,
      limit: 100,
      sort: "createdAt",
      where: { _status: { equals: "published" } },
    });

    return result.docs.length
      ? result.docs.map(mapSystem)
      : fallbackSystems;
  } catch (error) {
    console.error("CMS systems fallback:", error);
    return fallbackSystems;
  }
}

export async function getCMSSystem(
  slug: string,
): Promise<AluminiumSystem | undefined> {
  const systems = await getCMSSystems();
  return systems.find((system) => system.slug === slug);
}

export async function getCMSSolutions(): Promise<Solution[]> {
  noStore();

  try {
    const payload = await getCMS();
    const result = await payload.find({
      collection: "solutions",
      depth: 0,
      draft: false,
      limit: 100,
      sort: "order",
      where: { _status: { equals: "published" } },
    });

    return result.docs.length
      ? result.docs.map((solution) => ({
          slug: solution.slug,
          title: solution.title,
          description: solution.description,
          systems:
            solution.systems?.map((item) =>
              normalizeProductLabel(item.name),
            ) || [],
          objects: solution.objects?.map((item) => item.name) || [],
        }))
      : fallbackSolutions;
  } catch (error) {
    console.error("CMS solutions fallback:", error);
    return fallbackSolutions;
  }
}

export async function getCMSProjects(): Promise<CMSProject[]> {
  noStore();

  try {
    const payload = await getCMS();
    const result = await payload.find({
      collection: "projects",
      depth: 1,
      draft: false,
      limit: 100,
      sort: "order",
      where: {
        and: [
          { _status: { equals: "published" } },
          { isReal: { equals: true } },
        ],
      },
    });

    return result.docs.length
      ? result.docs.map((project) => ({
          id: project.slug,
          title: project.title,
          category: project.category,
          system: normalizeProductLabel(project.system),
          image: resolveMediaURL(
            project.image,
            project.legacyImage || "/images/hero-building.jpg",
          ),
          note: project.note || "",
          city: project.city || undefined,
          gallery:
            project.gallery
              ?.map((item) => resolveMediaURL(item.image, ""))
              .filter(Boolean) || [],
        }))
      : [];
  } catch (error) {
    console.error("CMS projects unavailable:", error);
    return [];
  }
}

export async function getCMSDocuments(): Promise<DocumentItem[]> {
  noStore();

  try {
    const payload = await getCMS();
    const result = await payload.find({
      collection: "documents",
      depth: 1,
      draft: false,
      limit: 200,
      sort: "order",
      where: {
        and: [
          { _status: { equals: "published" } },
          { status: { equals: "published" } },
        ],
      },
    });

    return result.docs.length
      ? result.docs
          .filter(
            (document) =>
              typeof document.file === "object" && Boolean(document.file?.url),
          )
          .map((document) => ({
          id: document.slug,
          title: normalizeProductLabel(document.title),
          system: normalizeProductLabel(document.system),
          category: document.category,
          format: document.format,
          size: document.size || "",
          status: document.status === "published" ? "available" : "demo",
          href:
            typeof document.file === "object"
              ? document.file?.url || undefined
              : undefined,
          version: document.version || undefined,
          documentDate: document.documentDate || undefined,
          description: document.description || undefined,
          previewImage: resolveMediaURL(document.previewImage, "") || undefined,
        }))
      : [];
  } catch (error) {
    console.error("CMS documents unavailable:", error);
    return [];
  }
}

export async function getCMSSuppliers(): Promise<CMSSupplier[]> {
  noStore();

  try {
    const payload = await getCMS();
    const result = await payload.find({
      collection: "suppliers",
      depth: 1,
      limit: 100,
      sort: "order",
      where: { published: { equals: true } },
    });

    return result.docs.map((supplier) => ({
      id: supplier.slug,
      name: supplier.name,
      role: supplier.role,
      description: supplier.description || undefined,
      website: supplier.website || undefined,
      logo: resolveMediaURL(supplier.logo, "") || undefined,
      logoTheme: supplier.logoTheme === "dark" || supplier.logoTheme === "green" ? supplier.logoTheme : "light",
    }));
  } catch (error) {
    console.error("CMS suppliers unavailable:", error);
    return [];
  }
}

export async function getCMSOffices(): Promise<CMSOffice[]> {
  noStore();

  try {
    const payload = await getCMS();
    const result = await payload.find({
      collection: "offices",
      depth: 1,
      limit: 200,
      sort: "order",
      where: { published: { equals: true } },
    });

    return result.docs.length
      ? result.docs.map((office) => {
          const fallbackOffice = fallbackOffices.find(
            (item) => item.phone.replace(/\D/g, "").slice(-10) === office.phone.replace(/\D/g, "").slice(-10),
          );

          return {
          region: office.region,
          city: office.city,
          address: office.address,
          phone: office.phone,
          workingHours: office.workingHours || undefined,
          routeUrl: office.routeUrl || undefined,
          latitude: office.latitude ?? fallbackOffice?.latitude,
          longitude: office.longitude ?? fallbackOffice?.longitude,
          photo:
            typeof office.photo === "object" && office.photo?.url
              ? office.photo.url
              : undefined,
          services: office.services?.map((item) => item.title) || [],
          cardStyle: office.cardStyle || "light",
          };
        })
      : fallbackOffices.map((office) => ({
          ...office,
          services: [],
          cardStyle: "light" as const,
        }));
  } catch (error) {
    console.error("CMS offices fallback:", error);
    return fallbackOffices.map((office) => ({
      ...office,
      services: [],
      cardStyle: "light" as const,
    }));
  }
}

export async function getCMSOtherProducts(): Promise<OtherProduct[]> {
  noStore();

  try {
    const payload = await getCMS();
    const result = await payload.find({
      collection: "other-products",
      depth: 1,
      limit: 100,
      sort: "order",
      where: { published: { equals: true } },
    });

    return result.docs.length
      ? result.docs.map((product) => ({
          slug: product.slug,
          title: product.title,
          shortDescription: product.shortDescription || undefined,
          description: product.description,
          image: resolveMediaURL(
            product.image,
            product.legacyImage || "/images/hero-building.jpg",
          ),
          applications: product.applications?.map((item) => item.title) || [],
          technicalCharacteristics:
            product.technicalCharacteristics?.map((item) => item.title) || [],
          advantages: product.advantages?.map((item) => item.title) || [],
        }))
      : fallbackOtherProducts;
  } catch (error) {
    console.error("CMS other products fallback:", error);
    return fallbackOtherProducts;
  }
}

export async function getCMSOtherProduct(slug: string): Promise<OtherProduct | undefined> {
  const products = await getCMSOtherProducts();
  return products.find((product) => product.slug === slug);
}

export async function getCMSPage(slug: string): Promise<Page | undefined> {
  noStore();

  try {
    const payload = await getCMS();
    const result = await payload.find({
      collection: "pages",
      depth: 1,
      draft: false,
      limit: 1,
      where: {
        and: [
          { slug: { equals: slug } },
          { _status: { equals: "published" } },
        ],
      },
    });

    return result.docs[0];
  } catch (error) {
    console.error(`CMS page fallback (${slug}):`, error);
    return undefined;
  }
}
