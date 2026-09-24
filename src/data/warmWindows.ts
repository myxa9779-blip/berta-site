export type WindowVariant = "single" | "double" | "triple";

export interface WarmWindowPriceCard {
  title: string;
  note: string;
  price: string;
  oldPrice?: string;
  variant: WindowVariant;
}

export interface WarmWindowPricesContent {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  cards: WarmWindowPriceCard[];
}

export const warmWindowPricesFallback: WarmWindowPricesContent = {
  eyebrow: "Тёплые алюминиевые окна",
  title: "Оконные решения для дома и бизнеса",
  description:
    "Варианты тёплых окон на базе системы БЕРТА AS63. Укажите размеры и конфигурацию — подготовим точный расчёт для вашего проекта.",
  ctaLabel: "Рассчитать окна",
  ctaHref: "/#contact",
  cards: [
    {
      title: "Тёплое одностворчатое окно БЕРТА AS63",
      note: "Одна створка · поворотно-откидное открывание",
      price: "Цена по запросу",
      variant: "single",
    },
    {
      title: "Двустворчатое окно БЕРТА AS63",
      note: "Две створки · комбинированное открывание",
      price: "Цена по запросу",
      variant: "double",
    },
    {
      title: "Трёхстворчатое окно БЕРТА AS63",
      note: "Три световых поля · центральная створка",
      price: "Цена по запросу",
      variant: "triple",
    },
  ],
};
