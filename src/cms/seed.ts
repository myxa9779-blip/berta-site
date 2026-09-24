import path from "node:path";
import type { CollectionSlug, GlobalSlug, Payload, Where } from "payload";
import initialContent from "./initial-content.json";

const mediaFields = new Set(["image", "heroImage", "logo", "previewImage", "file", "photo"]);

function remap(value: unknown, media: Map<number, number | string>, key = ""): unknown {
  if (Array.isArray(value)) return value.map((item) => remap(item, media));
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([name, item]) => [name, remap(item, media, name)]));
  }
  if (mediaFields.has(key) && typeof value === "number") {
    const id = media.get(value);
    if (id === undefined) throw new Error(`Missing initial media reference: ${value}`);
    return id;
  }
  return value;
}

/** Import public launch content once; never copy accounts, leads or CRM secrets. */
export async function seedCMS(payload: Payload) {
  if (process.env.BERTA_BUILD === "1") return;
  const settings = await payload.findGlobal({ slug: "site-settings", depth: 0 });
  if (settings.seeded) return;

  const admins = await payload.count({ collection: "admins" });
  if (!admins.totalDocs) {
    const email = process.env.CMS_ADMIN_EMAIL;
    const password = process.env.CMS_ADMIN_PASSWORD;
    if (!email || !password || password.length < 16 || password.startsWith("CHANGE_ME")) {
      throw new Error("First launch requires CMS_ADMIN_EMAIL and a unique CMS_ADMIN_PASSWORD of at least 16 characters.");
    }
    await payload.create({ collection: "admins", data: { email, password, role: "administrator" } });
  }

  const media = new Map<number, number | string>();
  for (const item of initialContent.media) {
    const existing = await payload.find({ collection: "media", where: { filename: { equals: item.filename } }, limit: 1, depth: 0 });
    const document = existing.docs[0] || await payload.create({
      collection: "media",
      data: { title: item.title, alt: item.alt, caption: item.caption },
      filePath: path.resolve(process.cwd(), "seed", "media", item.filename),
    });
    media.set(item.sourceId, document.id);
  }

  for (const [name, documents] of Object.entries(initialContent.collections)) {
    const collection = name as CollectionSlug;
    for (const document of documents) {
      const entry = document as Record<string, unknown>;
      const where: Where = name === "offices"
        ? { and: [{ city: { equals: entry.city } }, { address: { equals: entry.address } }] }
        : { slug: { equals: entry.slug } };
      const existing = await payload.find({ collection, where, limit: 1, depth: 0 });
      if (!existing.docs.length) {
        await payload.create({ collection, data: remap(document, media) as never });
      }
    }
  }

  for (const name of ["homepage", "solutions-page", "site-settings"] as const) {
    await payload.updateGlobal({
      slug: name as GlobalSlug,
      data: { ...(remap(initialContent.globals[name], media) as object), seeded: true },
    });
  }
  payload.logger.info("BERTA public launch content initialized.");
}
