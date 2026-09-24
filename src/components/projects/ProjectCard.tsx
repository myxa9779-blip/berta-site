import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bookmark } from "lucide-react";

interface ProjectCardProps {
  project: {
    title: string;
    category: string;
    system: string;
    image: string;
    note: string;
    city?: string;
  };
  large?: boolean;
}

export function ProjectCard({ project, large = false }: ProjectCardProps) {
  return (
    <article className={`group flex h-full flex-col overflow-hidden rounded-xl border border-ink/10 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-soft ${large ? "md:col-span-2" : ""}`}>
      <div className={`relative overflow-hidden bg-mist ${large ? "aspect-[16/8.2]" : "aspect-[4/2.65]"}`}>
        <Image src={project.image} alt={project.title} fill sizes={large ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"} className="object-cover transition duration-700 group-hover:scale-[1.04]" />
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#07111a]/45 to-transparent" />
        <span className="absolute left-3 top-3 rounded-md bg-white/12 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur-md">{project.category}</span>
        <Bookmark aria-hidden="true" className="absolute right-3 top-3 h-5 w-5 text-white" />
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="text-xl font-semibold leading-tight tracking-[-0.03em] text-ink">{project.title}</h3>
        <span className="mt-4 w-fit rounded-md bg-[#f0f1f2] px-2 py-1 text-[11px] font-semibold text-ink">{project.system}</span>
        <div className="mt-auto flex items-end justify-between gap-4 pt-5">
          <div>
            {project.city ? <p className="text-xs text-steel">{project.city}</p> : null}
            {project.note ? <p className="mt-2 text-xs text-steel">{project.note}</p> : null}
          </div>
          <Link href="/contacts" aria-label={`Обсудить проект ${project.title}`} className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-ink transition hover:bg-accent hover:text-white">
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
