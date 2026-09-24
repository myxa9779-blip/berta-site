export type DoorVariant = "split" | "panoramic" | "asymmetric" | "double";

export interface WarmDoorPriceCard {
  title: string;
  note: string;
  price: string;
  oldPrice?: string;
  variant: DoorVariant;
}

export interface WarmDoorPricesContent {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  cards: WarmDoorPriceCard[];
}

export const warmDoorPricesFallback: WarmDoorPricesContent = {
  eyebrow: "Тёплые входные двери",
  title: "Четыре конфигурации для вашего проекта",
  description:
    "Ориентировочная стоимость конструкций на базе тёплой системы БЕРТА AS63. Точный расчёт зависит от размеров, заполнения и комплектации.",
  ctaLabel: "Получить точный расчёт",
  ctaHref: "/#contact",
  cards: [
    {
      title: "Тёплая входная дверь из алюминия БЕРТА AS63",
      note: "Одностворчатая · два световых поля",
      oldPrice: "от 27 000 руб./м²",
      price: "от 23 000 руб./м²",
      variant: "split",
    },
    {
      title: "Панорамная входная дверь БЕРТА AS63",
      note: "Одностворчатая · цельное остекление",
      price: "от 22 500 руб./м²",
      variant: "panoramic",
    },
    {
      title: "Дверь с боковой створкой БЕРТА AS63",
      note: "Двустворчатая · асимметричное открывание",
      price: "от 24 000 руб./м²",
      variant: "asymmetric",
    },
    {
      title: "Двустворчатая входная дверь БЕРТА AS63",
      note: "Симметричное исполнение · четыре поля",
      price: "от 26 000 руб./м²",
      variant: "double",
    },
  ],
};
