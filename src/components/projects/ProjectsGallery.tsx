"use client";

import { RotateCcw, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { ProjectCard } from "./ProjectCard";

interface ProjectItem {
  id: string;
  title: string;
  category: string;
  system: string;
  image: string;
  note: string;
  city?: string;
}

export function ProjectsGallery({ projects }: { projects: ProjectItem[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Все типы");
  const [system, setSystem] = useState("Все системы");
  const [city, setCity] = useState("Все города");

  const categories = ["Все типы", ...Array.from(new Set(projects.map((item) => item.category)))];
  const systems = ["Все системы", ...Array.from(new Set(projects.map((item) => item.system)))];
  const cities = ["Все города", ...Array.from(new Set(projects.map((item) => item.city).filter((item): item is string => Boolean(item))))];

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("ru");
    return projects.filter((item) => {
      const searchable = [item.title, item.category, item.system, item.city, item.note].filter(Boolean).join(" ").toLocaleLowerCase("ru");
      return (
        (!normalizedQuery || searchable.includes(normalizedQuery)) &&
        (category === "Все типы" || item.category === category) &&
        (system === "Все системы" || item.system === system) &&
        (city === "Все города" || item.city === city)
      );
    });
  }, [category, city, projects, query, system]);

  const reset = () => {
    setQuery("");
    setCategory("Все типы");
    setSystem("Все системы");
    setCity("Все города");
  };

  if (!projects.length) {
    return (
      <div className="rounded-xl border border-ink/10 bg-white px-6 py-12 text-center sm:px-10 sm:py-16">
        <h2 className="text-xl font-semibold text-ink sm:text-2xl">Проекты пока не добавлены</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-ink/60 sm:text-base">
          Здесь будут опубликованы подтверждённые реализованные объекты БЕРТА.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid gap-3 border-b border-ink/10 pb-5 lg:grid-cols-[auto_1fr_1fr_1fr_1.35fr_auto] lg:items-center">
        <span className="text-xs font-semibold uppercase tracking-[0.13em] text-ink">Фильтры</span>
        <select value={category} onChange={(event) => setCategory(event.target.value)} aria-label="Тип объекта" className="min-h-12 rounded-lg border border-ink/10 bg-white px-4 text-sm text-ink outline-none focus:border-accent">
          {categories.map((item) => <option key={item}>{item}</option>)}
        </select>
        <select value={system} onChange={(event) => setSystem(event.target.value)} aria-label="Система БЕРТА" className="min-h-12 rounded-lg border border-ink/10 bg-white px-4 text-sm text-ink outline-none focus:border-accent">
          {systems.map((item) => <option key={item}>{item}</option>)}
        </select>
        <select value={city} onChange={(event) => setCity(event.target.value)} aria-label="Город" className="min-h-12 rounded-lg border border-ink/10 bg-white px-4 text-sm text-ink outline-none focus:border-accent">
          {cities.map((item) => <option key={item}>{item}</option>)}
        </select>
        <label className="relative">
          <span className="sr-only">Поиск по проектам</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Поиск по проектам" className="min-h-12 w-full rounded-lg border border-ink/10 bg-white px-4 pr-11 text-sm outline-none focus:border-accent" />
          <Search aria-hidden="true" className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-steel" />
        </label>
        <button type="button" onClick={reset} className="inline-flex min-h-12 items-center justify-center gap-2 px-2 text-sm text-steel transition hover:text-accent">
          Сбросить <RotateCcw aria-hidden="true" className="h-4 w-4" />
        </button>
      </div>

      {filtered.length ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {filtered.map((project) => <ProjectCard key={project.id} project={project} />)}
        </div>
      ) : (
        <p className="py-20 text-center text-steel">По выбранным условиям проекты не найдены.</p>
      )}
    </div>
  );
}
