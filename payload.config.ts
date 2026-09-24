import path from "node:path";
import { fileURLToPath } from "node:url";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { ru } from "@payloadcms/translations/languages/ru";
import { buildConfig } from "payload";
import sharp from "sharp";
import { collections } from "./src/cms/collections";
import { globals } from "./src/cms/globals";
import { seedCMS } from "./src/cms/seed";
import { migrations } from "./src/migrations";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: "admins",
    meta: {
      titleSuffix: "— BERTA CMS",
    },
  },
  collections,
  globals,
  db: sqliteAdapter({
    client: {
      url:
        process.env.DATABASE_URL ||
        `file:${path.resolve(dirname, "storage", "berta.db")}`,
    },
    migrationDir: path.resolve(dirname, "src", "migrations"),
    prodMigrations: migrations,
    push: false,
  }),
  editor: lexicalEditor(),
  i18n: {
    fallbackLanguage: "ru",
    supportedLanguages: { ru },
  },
  onInit: seedCMS,
  secret:
    process.env.PAYLOAD_SECRET ||
    "development-only-change-this-secret-before-production",
  serverURL:
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  sharp,
  telemetry: false,
  typescript: {
    outputFile: path.resolve(dirname, "src", "payload-types.ts"),
  },
});
