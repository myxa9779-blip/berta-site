"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { leadSchema, type LeadData } from "@/lib/leadSchema";

interface ContactFormProps {
  compact?: boolean;
  submitLabel?: string;
}

const inputClass =
  "min-h-12 w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-steel/65 focus:border-accent focus:ring-2 focus:ring-accent/15";

export function ContactForm({ compact = false, submitLabel = "Отправить заявку" }: ContactFormProps) {
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<LeadData>({
    resolver: zodResolver(leadSchema),
    defaultValues: { sourcePage: "/", consent: false },
  });

  useEffect(() => {
    const savedSource = window.sessionStorage.getItem("bertaContactSource");
    setValue("sourcePage", savedSource || window.location.pathname);
  }, [setValue]);

  const onSubmit = async (data: LeadData) => {
    setServerError("");
    const response = await fetch("/api/contact-leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      setServerError("Не удалось отправить заявку. Попробуйте ещё раз.");
      return;
    }

    setSuccess(true);
    window.sessionStorage.removeItem("bertaContactSource");
    reset({
      sourcePage: window.location.pathname,
      consent: false,
    });
  };

  if (success) {
    return (
      <div className="flex min-h-72 flex-col items-start justify-center rounded-2xl bg-white p-8 text-ink">
        <CheckCircle2 aria-hidden="true" className="mb-5 h-10 w-10 text-accent" />
        <h3 className="text-2xl font-semibold">Заявка принята</h3>
        <p className="mt-3 max-w-md leading-6 text-steel">
          Спасибо. Специалист БЕРТЫ свяжется с вами и уточнит детали расчёта.
        </p>
        <button type="button" onClick={() => setSuccess(false)} className="mt-6 text-sm font-semibold text-accent underline-offset-4 hover:underline">
          Отправить ещё одну заявку
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <input type="hidden" {...register("sourcePage")} />
      <div className={`grid gap-5 ${compact ? "sm:grid-cols-2" : "md:grid-cols-2"}`}>
        <Field label="ФИО" error={errors.name?.message} required>
          <input {...register("name")} className={inputClass} autoComplete="name" />
        </Field>
        <Field label="Телефон" error={errors.phone?.message} required>
          <input {...register("phone")} className={inputClass} inputMode="tel" autoComplete="tel" />
        </Field>
        <Field label="Город" error={errors.city?.message} required className={compact ? "sm:col-span-2" : "md:col-span-2"}>
          <input {...register("city")} className={inputClass} autoComplete="address-level2" />
        </Field>
      </div>
      <label className="flex cursor-pointer items-start gap-3 text-sm leading-5 text-steel">
        <input type="checkbox" {...register("consent")} className="mt-0.5 h-5 w-5 rounded border-ink/20 accent-[var(--color-accent)]" />
        <span>Согласен на обработку персональных данных и ознакомлен с политикой конфиденциальности.</span>
      </label>
      {errors.consent?.message && <p role="alert" className="text-sm text-accent">{errors.consent.message}</p>}
      {serverError && <p role="alert" className="text-sm text-accent">{serverError}</p>}
      <button type="submit" disabled={isSubmitting} className="inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-accent px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#b80f16] disabled:cursor-wait disabled:opacity-70 sm:w-auto">
        {isSubmitting && <LoaderCircle aria-hidden="true" className="h-4 w-4 animate-spin" />}
        {isSubmitting ? "Отправляем…" : submitLabel}
      </button>
    </form>
  );
}

function Field({ label, error, required = false, className = "", children }: { label: string; error?: string; required?: boolean; className?: string; children: React.ReactNode }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-sm font-semibold text-ink">{label}{required && <span className="text-accent"> *</span>}</span>
      {children}
      {error && <span role="alert" className="mt-1.5 block text-xs text-accent">{error}</span>}
    </label>
  );
}
