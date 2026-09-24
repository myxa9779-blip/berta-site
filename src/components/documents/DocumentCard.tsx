import Image from "next/image";
import { Download, FileText } from "lucide-react";
import type { DocumentItem } from "@/types";

export function DocumentCard({ document, compact = false }: { document: DocumentItem; compact?: boolean }) {
  const available = document.status === "available" && document.href;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-ink/10 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-soft">
      <div className={`relative overflow-hidden bg-[#eef0f2] ${compact ? "aspect-[4/3.2]" : "aspect-[4/2.25]"}`}>
        {document.previewImage ? (
          <Image src={document.previewImage} alt={`Обложка: ${document.title}`} fill sizes={compact ? "(max-width: 768px) 50vw, 20vw" : "(max-width: 768px) 100vw, 25vw"} className={`${compact ? "object-contain p-5" : "object-cover"} transition duration-700 group-hover:scale-[1.025]`} />
        ) : (
          <div className="grid h-full place-items-center"><FileText aria-hidden="true" className="h-12 w-12 text-ink/20" /></div>
        )}
      </div>
      <div className={`flex flex-1 flex-col ${compact ? "p-4" : "p-5"}`}>
        <div className="flex items-start gap-3">
          <FileText aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
          <h3 className={`${compact ? "text-base" : "text-lg"} font-semibold leading-tight tracking-[-0.025em] text-ink`}>{document.title}</h3>
        </div>
        {!compact && document.description ? <p className="mt-4 text-xs leading-5 text-steel">{document.description}</p> : null}
        <div className="mt-auto flex items-end justify-between gap-4 pt-5">
          <p className="text-xs text-steel">{[document.format, document.size].filter(Boolean).join(", ")}</p>
          {available ? (
            <a href={document.href} download aria-label={`Скачать ${document.title}`} className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ink/12 text-ink transition hover:border-accent hover:bg-accent hover:text-white"><Download aria-hidden="true" className="h-4 w-4" /></a>
          ) : (
            <span title="Файл появится после загрузки в CMS" className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ink/8 text-ink/28"><Download aria-hidden="true" className="h-4 w-4" /></span>
          )}
        </div>
      </div>
    </article>
  );
}
