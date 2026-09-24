import type { GlobalConfig } from "payload";
import { warmDoorPricesFallback } from "@/data/warmDoors";
import { warmWindowPricesFallback } from "@/data/warmWindows";
import { authenticated, publicRead } from "./access";

const globalAccess = {
  read: publicRead,
  update: authenticated,
};

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Настройки сайта",
  admin: { group: "Настройки" },
  access: globalAccess,
  fields: [
    {
      name: "companyName",
      type: "text",
      label: "Название компании",
      required: true,
      defaultValue: "Берта",
    },
    {
      name: "description",
      type: "textarea",
      label: "Описание компании",
      required: true,
    },
    {
      name: "phone",
      type: "text",
      label: "Горячая линия",
      required: true,
    },
    { name: "email", type: "email", label: "Электронная почта" },
    {
      name: "address",
      type: "text",
      label: "Адрес главного офиса",
      required: true,
    },
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
      label: "Логотип",
    },
    {
      name: "navigation",
      type: "array",
      label: "Главное меню",
      fields: [
        { name: "label", type: "text", label: "Название", required: true },
        { name: "href", type: "text", label: "Ссылка", required: true },
        {
          name: "enabled",
          type: "checkbox",
          label: "Показывать",
          defaultValue: true,
        },
      ],
    },
    {
      name: "socials",
      type: "group",
      label: "Социальные сети",
      fields: [
        { name: "telegram", type: "text", label: "Telegram" },
        { name: "vk", type: "text", label: "ВКонтакте" },
      ],
    },
    {
      name: "crm",
      type: "group",
      label: "Подключение CRM",
      admin: {
        description:
          "Заявка сначала сохраняется в CMS, затем отправляется в CRM. Токены и секреты задаются только переменными окружения сервера.",
      },
      fields: [
        {
          name: "enabled",
          type: "checkbox",
          label: "Отправлять заявки в CRM",
          defaultValue: false,
        },
        {
          name: "mode",
          type: "select",
          label: "Способ подключения",
          defaultValue: "webhook",
          options: [
            { label: "Webhook", value: "webhook" },
            { label: "Прямой API", value: "api" },
          ],
        },
        {
          name: "endpoint",
          type: "text",
          label: "Адрес API или webhook",
          admin: {
            description:
              "Можно оставить пустым и задать CRM_WEBHOOK_URL или CRM_API_URL на сервере.",
          },
        },
      ],
    },
    {
      name: "seo",
      type: "group",
      label: "Поисковая оптимизация",
      fields: [
        { name: "defaultTitle", type: "text", label: "Заголовок сайта" },
        {
          name: "defaultDescription",
          type: "textarea",
          label: "Описание сайта",
        },
      ],
    },
    {
      name: "seeded",
      type: "checkbox",
      defaultValue: false,
      admin: { hidden: true },
    },
  ],
};

export const Homepage: GlobalConfig = {
  slug: "homepage",
  label: "Главная страница",
  admin: { group: "Страницы" },
  access: globalAccess,
  versions: {
    drafts: { autosave: false },
  },
  fields: [
    {
      name: "eyebrow",
      type: "text",
      label: "Надзаголовок",
      required: true,
      defaultValue: "Алюминиевые системы БЕРТА",
    },
    {
      name: "title",
      type: "text",
      label: "Главный заголовок",
      required: true,
      defaultValue:
        "Прежде чем заказать — сравните предложение БЕРТА",
    },
    {
      name: "description",
      type: "textarea",
      label: "Описание",
      required: true,
      defaultValue:
        "Собственные алюминий и метеллопрозрачные системы для окон, дверей, фасадов и светопрозрачных конструкций. Технологичность, надёжность и архитектурная эстетика в каждой детали.",
    },
    {
      name: "heroImage",
      type: "upload",
      relationTo: "media",
      label: "Фоновая фотография",
    },
    {
      name: "legacyHeroImage",
      type: "text",
      label: "Текущее фоновое изображение",
      admin: { readOnly: true },
    },
    {
      name: "promoBanner",
      type: "group",
      label: "Акционный баннер на первом экране",
      admin: {
        description:
          "Баннер появляется справа через одну секунду после открытия главной страницы.",
      },
      fields: [
        {
          name: "enabled",
          type: "checkbox",
          label: "Показывать баннер",
          defaultValue: true,
        },
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          label: "Изображение баннера",
          admin: {
            description:
              "Необязательное прозрачное PNG/WebP. Основной текст баннера формируется сайтом.",
          },
        },
        {
          name: "legacyImage",
          type: "text",
          label: "Текущее изображение баннера",
          defaultValue: "/images/promo-decor-launch-50.png",
          admin: { readOnly: true },
        },
        {
          name: "discount",
          type: "text",
          label: "Главный акцент",
          defaultValue: "−50%",
        },
        {
          name: "title",
          type: "text",
          label: "Заголовок",
          defaultValue: "Декор изделия",
        },
        {
          name: "subtitle",
          type: "text",
          label: "Подзаголовок",
          defaultValue: "Только на момент запуска системы",
        },
        {
          name: "deadline",
          type: "text",
          label: "Срок акции",
          defaultValue: "До конца августа",
        },
        {
          name: "expiresAt",
          type: "date",
          label: "Автоматически скрыть после",
          admin: {
            date: { pickerAppearance: "dayAndTime" },
            description: "Оставьте пустым, если баннер отключается вручную.",
          },
        },
        {
          name: "footnote",
          type: "text",
          label: "Сноска",
          defaultValue: "Скидка 50% предоставляется на услугу ламинации",
        },
        {
          name: "alt",
          type: "text",
          label: "Описание баннера",
          defaultValue:
            "Скидка 50% на декор изделия до конца августа",
        },
        {
          name: "href",
          type: "text",
          label: "Ссылка при нажатии",
          defaultValue: "#contact",
        },
      ],
    },
    {
      name: "primaryAction",
      type: "group",
      label: "Основная кнопка",
      fields: [
        { name: "label", type: "text", label: "Текст" },
        { name: "href", type: "text", label: "Ссылка" },
      ],
    },
    {
      name: "secondaryAction",
      type: "group",
      label: "Дополнительная кнопка",
      fields: [
        { name: "label", type: "text", label: "Текст" },
        { name: "href", type: "text", label: "Ссылка" },
      ],
    },
    {
      name: "facts",
      type: "array",
      label: "Полоса доверия под первым экраном",
      minRows: 4,
      maxRows: 4,
      fields: [
        { name: "value", type: "text", label: "Значение", required: true },
        { name: "label", type: "text", label: "Подпись", required: true },
      ],
    },
    {
      name: "sectionTitles",
      type: "group",
      label: "Заголовки разделов",
      fields: [
        { name: "systems", type: "text", label: "Системы" },
        { name: "solutions", type: "text", label: "Решения" },
        { name: "projects", type: "text", label: "Проекты" },
        { name: "contact", type: "text", label: "Форма заявки" },
      ],
    },
    {
      name: "seeded",
      type: "checkbox",
      defaultValue: false,
      admin: { hidden: true },
    },
  ],
};

export const SolutionsPage: GlobalConfig = {
  slug: "solutions-page",
  label: "Страница «Решения»",
  admin: { group: "Страницы" },
  access: globalAccess,
  fields: [
    {
      name: "doorPrices",
      type: "group",
      label: "Блок цен на тёплые двери",
      fields: [
        {
          name: "eyebrow",
          type: "text",
          label: "Надзаголовок",
          defaultValue: warmDoorPricesFallback.eyebrow,
        },
        {
          name: "title",
          type: "text",
          label: "Заголовок",
          defaultValue: warmDoorPricesFallback.title,
        },
        {
          name: "description",
          type: "textarea",
          label: "Описание",
          defaultValue: warmDoorPricesFallback.description,
        },
        {
          name: "ctaLabel",
          type: "text",
          label: "Текст кнопки",
          defaultValue: warmDoorPricesFallback.ctaLabel,
        },
        {
          name: "ctaHref",
          type: "text",
          label: "Ссылка кнопки",
          defaultValue: warmDoorPricesFallback.ctaHref,
        },
        {
          name: "cards",
          type: "array",
          label: "Варианты дверей",
          minRows: 4,
          maxRows: 4,
          defaultValue: warmDoorPricesFallback.cards,
          admin: {
            description:
              "Четыре карточки выводятся на странице в указанном порядке.",
          },
          fields: [
            {
              name: "title",
              type: "text",
              label: "Название",
              required: true,
            },
            {
              name: "note",
              type: "text",
              label: "Краткое описание",
              required: true,
            },
            {
              name: "oldPrice",
              type: "text",
              label: "Прежняя цена (будет зачёркнута)",
              admin: {
                description:
                  "Оставьте пустым, если карточке не нужна прежняя цена.",
              },
            },
            {
              name: "price",
              type: "text",
              label: "Текущая цена",
              required: true,
            },
            {
              name: "variant",
              type: "select",
              label: "Схема двери",
              required: true,
              options: [
                { label: "Одностворчатая, два поля", value: "split" },
                { label: "Одностворчатая, панорамная", value: "panoramic" },
                { label: "Двустворчатая, асимметричная", value: "asymmetric" },
                { label: "Двустворчатая, четыре поля", value: "double" },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "windowPrices",
      type: "group",
      label: "Блок цен на тёплые окна",
      fields: [
        {
          name: "eyebrow",
          type: "text",
          label: "Надзаголовок",
          defaultValue: warmWindowPricesFallback.eyebrow,
        },
        {
          name: "title",
          type: "text",
          label: "Заголовок",
          defaultValue: warmWindowPricesFallback.title,
        },
        {
          name: "description",
          type: "textarea",
          label: "Описание",
          defaultValue: warmWindowPricesFallback.description,
        },
        {
          name: "ctaLabel",
          type: "text",
          label: "Текст кнопки",
          defaultValue: warmWindowPricesFallback.ctaLabel,
        },
        {
          name: "ctaHref",
          type: "text",
          label: "Ссылка кнопки",
          defaultValue: warmWindowPricesFallback.ctaHref,
        },
        {
          name: "cards",
          type: "array",
          label: "Варианты окон",
          minRows: 3,
          maxRows: 3,
          defaultValue: warmWindowPricesFallback.cards,
          admin: {
            description:
              "Три карточки выводятся на странице в указанном порядке.",
          },
          fields: [
            {
              name: "title",
              type: "text",
              label: "Название",
              required: true,
            },
            {
              name: "note",
              type: "text",
              label: "Краткое описание",
              required: true,
            },
            {
              name: "oldPrice",
              type: "text",
              label: "Прежняя цена (будет зачёркнута)",
              admin: {
                description:
                  "Оставьте пустым, если карточке не нужна прежняя цена.",
              },
            },
            {
              name: "price",
              type: "text",
              label: "Текущая цена",
              required: true,
            },
            {
              name: "variant",
              type: "select",
              label: "Схема окна",
              required: true,
              options: [
                { label: "Одностворчатое", value: "single" },
                { label: "Двустворчатое", value: "double" },
                { label: "Трёхстворчатое", value: "triple" },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "seeded",
      type: "checkbox",
      defaultValue: false,
      admin: { hidden: true },
    },
  ],
};

export const globals = [SiteSettings, Homepage, SolutionsPage];
