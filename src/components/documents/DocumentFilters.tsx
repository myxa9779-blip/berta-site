"use client";

import { Download } from "lucide-react";
import type { DocumentItem } from "@/types";
import { DocumentCard } from "./DocumentCard";

function isCertificate(document: DocumentItem) {
  return /сертифик|испыт|протокол/i.test(`${document.category} ${document.title}`);
}

export function DocumentFilters({ documents }: { documents: DocumentItem[] }) {
  const catalogs = documents.filter((item) => !isCertificate(item));
  const certificates = documents.filter(isCertificate);
  const availableCatalogs = catalogs.filter((item) => item.status === "available" && item.href);

  if (!documents.length) {
    return (
      <div className="rounded-xl border border-ink/10 bg-white px-6 py-12 text-center sm:px-10 sm:py-16">
        <h2 className="text-xl font-semibold text-ink sm:text-2xl">Документы пока не добавлены</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-ink/60 sm:text-base">
          Актуальные каталоги, сертификаты и технические материалы появятся здесь после публикации в административной панели.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {catalogs.length ? (
        <section aria-labelledby="catalogs-title">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <h2 id="catalogs-title" className="text-xs font-bold uppercase tracking-[0.14em] text-ink"><span className="mr-3 inline-block h-px w-5 align-middle bg-accent" />Каталоги систем</h2>
            {availableCatalogs.length === 1 ? <a href={availableCatalogs[0].href} download className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-ink/10 px-4 text-xs font-semibold text-ink transition hover:border-accent hover:text-accent">Скачать каталог <Download aria-hidden="true" className="h-4 w-4" /></a> : null}
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{catalogs.map((item) => <DocumentCard key={item.id} document={item} />)}</div>
        </section>
      ) : null}

      {certificates.length ? (
        <section aria-labelledby="certificates-title">
          <h2 id="certificates-title" className="mb-6 text-xs font-bold uppercase tracking-[0.14em] text-ink"><span className="mr-3 inline-block h-px w-5 align-middle bg-accent" />Сертификаты и испытания</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">{certificates.map((item) => <DocumentCard key={item.id} document={item} compact />)}</div>
        </section>
      ) : null}
    </div>
  );
}
