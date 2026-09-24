"use client";

import type { ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
}

export function Modal({ open, title, children, onClose }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-ink/70 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-auto rounded-2xl bg-white p-6 shadow-soft sm:p-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 id="modal-title" className="text-2xl font-semibold text-ink">
            {title}
          </h2>
          <button onClick={onClose} aria-label="Закрыть окно" className="rounded-full p-2 text-steel transition hover:bg-mist hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
            <X aria-hidden="true" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
