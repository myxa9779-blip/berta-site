import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { company } from "@/data/company";
import { getSiteSettings } from "@/lib/cms";
import "../globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return {
    metadataBase: new URL(company.siteUrl),
    title: {
      default: `${settings.companyName} — алюминиевые системы для современной архитектуры`,
      template: `%s | ${settings.companyName}`,
    },
    description: settings.description,
    keywords: [
      "алюминиевые системы",
      "алюминиевые окна",
      "алюминиевые двери",
      "фасадные системы",
      "архитектурное остекление",
    ],
    openGraph: {
      type: "website",
      locale: "ru_RU",
      siteName: settings.companyName,
      title: `${settings.companyName} — алюминиевые системы для современной архитектуры`,
      description: settings.description,
      images: [{ url: "/images/hero-20260727/home.jpg", width: 1706, height: 922, alt: "Современный дом с панорамным алюминиевым остеклением" }],
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f7f8f8",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ru">
      <body className="font-sans antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
