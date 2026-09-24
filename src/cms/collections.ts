import path from "node:path";
import type { CollectionConfig } from "payload";
import { authenticated, publicRead } from "./access";
import {
  prepareDocumentUpload,
  validateProjectUploads,
} from "./contentUploadHooks";

const contentGroup = "Контент сайта";
const systemGroup = "Система";

const versioning = {
  drafts: {
    autosave: false,
  },
  maxPerDoc: 25,
} as const;

const editableContentAccess = {
  create: authenticated,
  delete: authenticated,
  read: publicRead,
  update: authenticated,
};

export const Admins: CollectionConfig = {
  slug: "admins",
  labels: { singular: "Пользователь", plural: "Пользователи" },
  admin: {
    group: systemGroup,
    useAsTitle: "email",
    defaultColumns: ["name", "email", "role"],
  },
  auth: {
    tokenExpiration: 60 * 60 * 8,
    maxLoginAttempts: 5,
    lockTime: 10 * 60 * 1000,
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: "Имя",
    },
    {
      name: "role",
      type: "select",
      label: "Роль",
      required: true,
      defaultValue: "administrator",
      options: [
        { label: "Администратор", value: "administrator" },
        { label: "Редактор", value: "editor" },
      ],
      saveToJWT: true,
    },
  ],
};

export const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: "Файл", plural: "Медиатека" },
  admin: {
    group: contentGroup,
    useAsTitle: "title",
    defaultColumns: ["title", "filename", "mimeType", "updatedAt"],
  },
  access: editableContentAccess,
  upload: {
    staticDir:
      process.env.CMS_MEDIA_DIR || path.resolve(process.cwd(), "storage", "media"),
    mimeTypes: [
      "image/*",
      "application/pdf",
      "application/zip",
      "application/x-zip-compressed",
      "application/x-rar-compressed",
      "application/vnd.rar",
      "application/octet-stream",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/dwg",
      "application/acad",
      "application/x-acad",
      "application/x-autocad",
      "image/vnd.dwg",
    ],
    adminThumbnail: "thumbnail",
    imageSizes: [
      {
        name: "thumbnail",
        width: 480,
        height: 320,
        position: "centre",
      },
      {
        name: "card",
        width: 960,
        height: 720,
        position: "centre",
      },
      {
        name: "wide",
        width: 1920,
        height: 1080,
        position: "centre",
      },
    ],
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Название",
      required: true,
    },
    {
      name: "alt",
      type: "text",
      label: "Описание изображения",
      admin: {
        description: "Кратко опишите изображение для поисковиков и доступности.",
      },
    },
    {
      name: "caption",
      type: "textarea",
      label: "Подпись",
    },
  ],
};

export const Pages: CollectionConfig = {
  slug: "pages",
  labels: { singular: "Страница", plural: "Страницы" },
  admin: {
    group: contentGroup,
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "_status", "updatedAt"],
  },
  access: editableContentAccess,
  versions: versioning,
  fields: [
    {
      name: "title",
      type: "text",
      label: "Название страницы",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      label: "Адрес страницы",
      required: true,
      unique: true,
      index: true,
      admin: {
        description: "Например: about или privacy.",
      },
    },
    {
      name: "eyebrow",
      type: "text",
      label: "Надзаголовок",
    },
    {
      name: "heroTitle",
      type: "text",
      label: "Заголовок первого экрана",
      required: true,
    },
    {
      name: "heroDescription",
      type: "textarea",
      label: "Описание первого экрана",
    },
    {
      name: "heroImage",
      type: "upload",
      relationTo: "media",
      label: "Фоновое изображение",
    },
    {
      name: "body",
      type: "richText",
      label: "Содержание страницы",
    },
    {
      name: "seo",
      type: "group",
      label: "Поисковая оптимизация",
      fields: [
        { name: "title", type: "text", label: "SEO-заголовок" },
        {
          name: "description",
          type: "textarea",
          label: "Описание для поисковых систем",
        },
      ],
    },
  ],
};

export const Systems: CollectionConfig = {
  slug: "systems",
  labels: { singular: "Система", plural: "Системы" },
  admin: {
    group: contentGroup,
    useAsTitle: "name",
    defaultColumns: ["name", "code", "status", "_status", "updatedAt"],
  },
  access: editableContentAccess,
  versions: versioning,
  fields: [
    { name: "name", type: "text", label: "Название", required: true },
    {
      name: "slug",
      type: "text",
      label: "Адрес",
      required: true,
      unique: true,
      index: true,
    },
    { name: "code", type: "text", label: "Код", required: true },
    {
      name: "category",
      type: "select",
      label: "Категория",
      required: true,
      options: [
        { label: "Тёплая система", value: "warm" },
        { label: "Холодная система", value: "cold" },
        { label: "Фасадная система", value: "facade" },
      ],
    },
    {
      name: "categoryLabel",
      type: "text",
      label: "Название категории",
      required: true,
    },
    {
      name: "status",
      type: "select",
      label: "Статус продукта",
      required: true,
      options: [
        { label: "Доступна", value: "available" },
        { label: "В разработке", value: "development" },
      ],
    },
    {
      name: "statusLabel",
      type: "text",
      label: "Текст статуса",
      required: true,
    },
    { name: "tagline", type: "text", label: "Слоган", required: true },
    {
      name: "summary",
      type: "textarea",
      label: "Краткое описание",
      required: true,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      label: "Главное изображение",
    },
    {
      name: "legacyImage",
      type: "text",
      label: "Текущее изображение",
      admin: { readOnly: true },
    },
    {
      name: "audience",
      type: "array",
      label: "Для кого",
      fields: [{ name: "text", type: "text", label: "Пункт", required: true }],
    },
    {
      name: "applications",
      type: "array",
      label: "Области применения",
      fields: [{ name: "text", type: "text", label: "Пункт", required: true }],
    },
    {
      name: "constructionTypes",
      type: "array",
      label: "Типы конструкций",
      fields: [{ name: "text", type: "text", label: "Пункт", required: true }],
    },
    {
      name: "benefits",
      type: "array",
      label: "Преимущества",
      fields: [
        { name: "title", type: "text", label: "Заголовок", required: true },
        {
          name: "description",
          type: "textarea",
          label: "Описание",
          required: true,
        },
      ],
    },
    {
      name: "gallery",
      type: "array",
      label: "Галерея",
      fields: [
        { name: "image", type: "upload", relationTo: "media", label: "Изображение" },
        {
          name: "legacyImage",
          type: "text",
          label: "Текущее изображение",
          admin: { readOnly: true },
        },
        { name: "alt", type: "text", label: "Описание изображения" },
      ],
    },
    {
      name: "specifications",
      type: "array",
      label: "Характеристики",
      fields: [
        { name: "label", type: "text", label: "Параметр", required: true },
        { name: "value", type: "text", label: "Значение", required: true },
      ],
    },
    {
      name: "faqs",
      type: "array",
      label: "Вопросы и ответы",
      fields: [
        { name: "question", type: "text", label: "Вопрос", required: true },
        { name: "answer", type: "textarea", label: "Ответ", required: true },
      ],
    },
  ],
};

export const Solutions: CollectionConfig = {
  slug: "solutions",
  labels: { singular: "Решение", plural: "Решения" },
  admin: {
    group: contentGroup,
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "order", "_status"],
  },
  access: editableContentAccess,
  versions: versioning,
  fields: [
    { name: "title", type: "text", label: "Название", required: true },
    {
      name: "slug",
      type: "text",
      label: "Адрес",
      required: true,
      unique: true,
      index: true,
    },
    {
      name: "description",
      type: "textarea",
      label: "Описание",
      required: true,
    },
    { name: "order", type: "number", label: "Порядок", defaultValue: 0 },
    {
      name: "systems",
      type: "array",
      label: "Подходящие системы",
      fields: [{ name: "name", type: "text", label: "Система", required: true }],
    },
    {
      name: "objects",
      type: "array",
      label: "Типовые объекты",
      fields: [{ name: "name", type: "text", label: "Объект", required: true }],
    },
  ],
};

export const Projects: CollectionConfig = {
  slug: "projects",
  labels: { singular: "Проект", plural: "Проекты" },
  admin: {
    group: contentGroup,
    useAsTitle: "title",
    defaultColumns: ["title", "image", "city", "category", "system", "isReal", "order", "_status"],
    description:
      "Создавайте проекты и загружайте главную фотографию и галерею прямо здесь. Город можно не заполнять.",
  },
  access: editableContentAccess,
  versions: versioning,
  hooks: {
    beforeValidate: [validateProjectUploads],
  },
  fields: [
    { name: "title", type: "text", label: "Название", required: true },
    {
      name: "slug",
      type: "text",
      label: "Адрес",
      required: true,
      unique: true,
      index: true,
    },
    { name: "category", type: "text", label: "Категория", required: true },
    { name: "system", type: "text", label: "Система", required: true },
    {
      name: "city",
      type: "text",
      label: "Город",
      admin: { description: "Необязательное поле." },
    },
    { name: "note", type: "text", label: "Примечание" },
    { name: "order", type: "number", label: "Порядок", defaultValue: 0 },
    {
      name: "isReal",
      type: "checkbox",
      label: "Это реальный реализованный объект",
      defaultValue: true,
      required: true,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      label: "Главная фотография",
      filterOptions: { mimeType: { contains: "image/" } },
      admin: {
        description:
          "Обложка проекта на странице «Проекты». Для нового опубликованного проекта обязательна.",
      },
    },
    {
      name: "legacyImage",
      type: "text",
      label: "Текущее изображение",
      admin: { readOnly: true },
    },
    {
      name: "gallery",
      type: "array",
      label: "Дополнительные фотографии",
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          label: "Фотография",
          required: true,
          filterOptions: { mimeType: { contains: "image/" } },
        },
      ],
    },
  ],
};

export const Documents: CollectionConfig = {
  slug: "documents",
  labels: { singular: "Документ", plural: "Документы" },
  admin: {
    group: contentGroup,
    useAsTitle: "title",
    defaultColumns: ["title", "file", "system", "category", "format", "_status"],
    description:
      "Загружайте каталоги, сертификаты и технические файлы. Формат и размер файла заполняются автоматически.",
  },
  access: editableContentAccess,
  versions: versioning,
  hooks: {
    beforeValidate: [prepareDocumentUpload],
  },
  fields: [
    { name: "title", type: "text", label: "Название", required: true },
    {
      name: "slug",
      type: "text",
      label: "Идентификатор",
      required: true,
      unique: true,
      index: true,
    },
    { name: "system", type: "text", label: "Система", required: true },
    { name: "category", type: "text", label: "Категория", required: true },
    { name: "format", type: "text", label: "Формат", required: true },
    { name: "size", type: "text", label: "Размер" },
    { name: "version", type: "text", label: "Версия" },
    {
      name: "documentDate",
      type: "date",
      label: "Дата документа или обновления",
      admin: { date: { pickerAppearance: "dayOnly" } },
    },
    {
      name: "description",
      type: "textarea",
      label: "Краткое описание",
    },
    { name: "order", type: "number", label: "Порядок", defaultValue: 0 },
    {
      name: "status",
      type: "select",
      label: "Готовность",
      defaultValue: "demo",
      options: [
        { label: "Опубликован", value: "published" },
        { label: "Готовится", value: "demo" },
      ],
      admin: {
        readOnly: true,
        description:
          "Меняется автоматически: после публикации с загруженным файлом документ появится на сайте.",
      },
    },
    {
      name: "file",
      type: "upload",
      relationTo: "media",
      label: "Файл документа",
      admin: {
        description:
          "PDF, ZIP, DWG, DOCX, XLSX и другие разрешённые технические файлы. Для статуса «Опубликован» обязателен.",
      },
    },
    {
      name: "previewImage",
      type: "upload",
      relationTo: "media",
      label: "Обложка документа",
      filterOptions: { mimeType: { contains: "image/" } },
      admin: {
        description: "Изображение для карточки в разделе «Документация».",
      },
    },
  ],
};

export const Suppliers: CollectionConfig = {
  slug: "suppliers",
  labels: { singular: "Поставщик", plural: "Поставщики" },
  admin: {
    group: contentGroup,
    useAsTitle: "name",
    defaultColumns: ["name", "role", "order", "published", "updatedAt"],
    description:
      "Реальные поставщики и технологические партнёры. Добавляйте только подтверждённые компании и бренды.",
  },
  access: editableContentAccess,
  fields: [
    { name: "name", type: "text", label: "Название", required: true },
    {
      name: "slug",
      type: "text",
      label: "Идентификатор",
      required: true,
      unique: true,
      index: true,
    },
    {
      name: "role",
      type: "text",
      label: "Роль",
      required: true,
      admin: {
        description: "Например: поставщик фурнитуры или производитель стеклопакетов.",
      },
    },
    { name: "description", type: "textarea", label: "Описание" },
    { name: "website", type: "text", label: "Официальный сайт" },
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
      label: "Логотип",
      filterOptions: { mimeType: { contains: "image/" } },
    },
    {
      name: "logoTheme",
      type: "select",
      label: "Подложка логотипа",
      defaultValue: "light",
      options: [
        { label: "Светлая", value: "light" },
        { label: "Тёмная", value: "dark" },
        { label: "Фирменная зелёная", value: "green" },
      ],
      admin: {
        description: "Для белого логотипа ТБМ выберите фирменную зелёную подложку.",
      },
    },
    { name: "order", type: "number", label: "Порядок", defaultValue: 0 },
    {
      name: "published",
      type: "checkbox",
      label: "Показывать на сайте",
      defaultValue: true,
    },
  ],
};

export const Offices: CollectionConfig = {
  slug: "offices",
  labels: { singular: "Офис", plural: "Офисы" },
  admin: {
    group: contentGroup,
    useAsTitle: "city",
    defaultColumns: ["city", "region", "phone", "order", "published"],
  },
  access: editableContentAccess,
  fields: [
    { name: "region", type: "text", label: "Регион", required: true },
    { name: "city", type: "text", label: "Город", required: true },
    { name: "address", type: "text", label: "Адрес", required: true },
    { name: "phone", type: "text", label: "Телефон", required: true },
    { name: "workingHours", type: "text", label: "Режим работы" },
    { name: "routeUrl", type: "text", label: "Ссылка «Построить маршрут»" },
    {
      name: "latitude",
      type: "number",
      label: "Широта для карты",
      admin: { description: "Например: 44.0486" },
    },
    {
      name: "longitude",
      type: "number",
      label: "Долгота для карты",
      admin: { description: "Например: 43.0594" },
    },
    {
      name: "photo",
      type: "upload",
      relationTo: "media",
      label: "Фото офиса",
    },
    {
      name: "services",
      type: "array",
      label: "Доступные услуги",
      fields: [
        { name: "title", type: "text", label: "Услуга", required: true },
      ],
    },
    {
      name: "cardStyle",
      type: "select",
      label: "Оформление карточки",
      defaultValue: "light",
      options: [
        { label: "Светлая", value: "light" },
        { label: "Тёмная", value: "dark" },
        { label: "Красный акцент", value: "accent" },
      ],
    },
    { name: "order", type: "number", label: "Порядок", defaultValue: 0 },
    {
      name: "published",
      type: "checkbox",
      label: "Показывать на сайте",
      defaultValue: true,
    },
  ],
};

export const Leads: CollectionConfig = {
  slug: "leads",
  labels: { singular: "Заявка", plural: "Заявки" },
  admin: {
    group: "Продажи",
    useAsTitle: "phone",
    defaultColumns: ["name", "phone", "city", "crmStatus", "status", "createdAt"],
  },
  access: {
    create: publicRead,
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    { name: "name", type: "text", label: "Имя", required: true },
    { name: "phone", type: "text", label: "Телефон", required: true },
    { name: "city", type: "text", label: "Город", required: true },
    { name: "sourcePage", type: "text", label: "Источник страницы", required: true },
    { name: "email", type: "email", label: "Электронная почта", admin: { hidden: true } },
    { name: "company", type: "text", label: "Компания", admin: { hidden: true } },
    { name: "role", type: "text", label: "Роль", admin: { hidden: true } },
    { name: "message", type: "textarea", label: "Комментарий", admin: { hidden: true } },
    {
      name: "crmStatus",
      type: "select",
      label: "Передача в CRM",
      defaultValue: "disabled",
      required: true,
      options: [
        { label: "CRM отключена", value: "disabled" },
        { label: "Ожидает отправки", value: "pending" },
        { label: "Отправлена", value: "sent" },
        { label: "Ошибка", value: "failed" },
      ],
    },
    { name: "crmAttempts", type: "number", label: "Попыток отправки", defaultValue: 0 },
    { name: "crmResponse", type: "textarea", label: "Ответ CRM", admin: { readOnly: true } },
    { name: "crmUpdatedAt", type: "date", label: "Последняя попытка CRM", admin: { readOnly: true } },
    {
      name: "status",
      type: "select",
      label: "Статус",
      defaultValue: "new",
      required: true,
      options: [
        { label: "Новая", value: "new" },
        { label: "В работе", value: "in_progress" },
        { label: "Обработана", value: "completed" },
        { label: "Спам", value: "spam" },
      ],
    },
  ],
};

export const OtherProducts: CollectionConfig = {
  slug: "other-products",
  labels: { singular: "Другой продукт", plural: "Другие продукты" },
  admin: {
    group: contentGroup,
    useAsTitle: "title",
    defaultColumns: ["title", "order", "published", "updatedAt"],
  },
  access: editableContentAccess,
  fields: [
    { name: "title", type: "text", label: "Название", required: true },
    { name: "slug", type: "text", label: "Идентификатор", required: true, unique: true, index: true },
    {
      name: "shortDescription",
      type: "textarea",
      label: "Краткое описание для карточки",
      admin: { description: "Короткий текст для каталога продуктов." },
    },
    { name: "description", type: "textarea", label: "Полное описание", required: true },
    { name: "image", type: "upload", relationTo: "media", label: "Изображение" },
    { name: "legacyImage", type: "text", label: "Текущее изображение", admin: { readOnly: true } },
    {
      name: "applications",
      type: "array",
      label: "Области применения",
      fields: [{ name: "title", type: "text", label: "Пункт", required: true }],
    },
    {
      name: "technicalCharacteristics",
      type: "array",
      label: "Технические характеристики",
      fields: [{ name: "title", type: "textarea", label: "Характеристика", required: true }],
    },
    {
      name: "advantages",
      type: "array",
      label: "Преимущества",
      fields: [{ name: "title", type: "textarea", label: "Преимущество", required: true }],
    },
    { name: "order", type: "number", label: "Порядок", defaultValue: 0 },
    { name: "published", type: "checkbox", label: "Показывать на сайте", defaultValue: true },
  ],
};

export const collections = [
  Admins,
  Media,
  Pages,
  Systems,
  Solutions,
  Projects,
  Documents,
  Suppliers,
  Offices,
  Leads,
  OtherProducts,
];
