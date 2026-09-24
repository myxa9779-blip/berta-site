import { APIError } from "payload";
import type { CollectionBeforeValidateHook } from "payload";
import type { Document, Media, Project } from "@/payload-types";

type UploadReference = Media | number | null | undefined;

function getUploadID(value: UploadReference) {
  if (typeof value === "number") return value;
  if (typeof value === "object" && value?.id) return value.id;
  return undefined;
}

async function getMedia(
  value: UploadReference,
  req: Parameters<CollectionBeforeValidateHook>[0]["req"],
) {
  if (typeof value === "object" && value?.id) return value;

  const id = getUploadID(value);
  if (!id) return undefined;

  return req.payload.findByID({
    collection: "media",
    id,
    depth: 0,
    overrideAccess: true,
    req,
  });
}

function ensureImage(media: Media | undefined, label: string) {
  if (media?.mimeType && !media.mimeType.startsWith("image/")) {
    throw new APIError(`${label}: выберите изображение из медиатеки.`, 400);
  }
}

function ensureDocument(media: Media | undefined) {
  if (media?.mimeType?.startsWith("image/")) {
    throw new APIError(
      "В поле «Файл документа» загрузите PDF, архив, таблицу или технический файл, а не изображение.",
      400,
    );
  }
}

function getFileFormat(media: Media) {
  const extension = media.filename?.split(".").pop()?.trim();

  if (extension && extension !== media.filename) return extension.toUpperCase();
  if (media.mimeType === "application/pdf") return "PDF";
  return "Файл";
}

function getFileSize(media: Media) {
  const bytes = media.filesize;
  if (!bytes) return undefined;

  const megabytes = bytes / 1024 / 1024;
  if (megabytes >= 1) {
    return `${megabytes.toFixed(megabytes >= 10 ? 1 : 2).replace(".", ",")} МБ`;
  }

  return `${Math.max(1, Math.round(bytes / 1024))} КБ`;
}

export const validateProjectUploads: CollectionBeforeValidateHook<Project> =
  async ({ data, originalDoc, req }) => {
    if (!data) return data;

    const image = data.image ?? originalDoc?.image;
    const legacyImage = data.legacyImage ?? originalDoc?.legacyImage;
    const publishStatus = data._status ?? originalDoc?._status;

    if (publishStatus === "published" && !getUploadID(image) && !legacyImage) {
      throw new APIError(
        "Перед публикацией проекта загрузите главную фотографию.",
        400,
      );
    }

    ensureImage(await getMedia(image, req), "Главная фотография");

    for (const item of data.gallery ?? []) {
      ensureImage(
        await getMedia(item.image, req),
        "Дополнительная фотография",
      );
    }

    return data;
  };

export const prepareDocumentUpload: CollectionBeforeValidateHook<Document> =
  async ({ data, originalDoc, req }) => {
    if (!data) return data;

    const file = data.file ?? originalDoc?.file;
    const previewImage = data.previewImage ?? originalDoc?.previewImage;
    const publishStatus = data._status ?? originalDoc?._status;
    if (publishStatus === "published" && !getUploadID(file)) {
      throw new APIError(
        "Перед публикацией документа загрузите файл документа.",
        400,
      );
    }

    if (publishStatus === "published") {
      data.status = "published";
    }

    const media = await getMedia(file, req);
    ensureDocument(media);
    ensureImage(await getMedia(previewImage, req), "Обложка документа");

    if (media) {
      data.format = getFileFormat(media);
      data.size = getFileSize(media);
    }

    return data;
  };
