import { mkdir } from "node:fs/promises";

const secret = process.env.PAYLOAD_SECRET || "";
if (secret.length < 32 || secret.startsWith("CHANGE_ME") || secret.startsWith("build-only")) {
  throw new Error("Set a unique PAYLOAD_SECRET of at least 32 characters before starting BERTA.");
}
const siteURL = new URL(process.env.NEXT_PUBLIC_SITE_URL || "");
if (!["https:", "http:"].includes(siteURL.protocol)) throw new Error("Invalid NEXT_PUBLIC_SITE_URL");
await mkdir(process.env.CMS_MEDIA_DIR || "storage/media", { recursive: true });
await import("../server.js");
