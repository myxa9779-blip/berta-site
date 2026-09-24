import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { getCMSProjects, getHomepage } from "@/lib/cms";

export async function ProjectsSection() {
  const [projects, homepage] = await Promise.all([
    getCMSProjects(),
    getHomepage(),
  ]);

  if (!projects.length) return null;

  return (
    <section>
      <div className="bg-[#0b1620] py-16 sm:py-20 lg:py-24">
        <Container className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <Heading tone="dark" eyebrow={homepage.sectionTitles.projects} title="Реализованные проекты БЕРТЫ" />
          <Button href="/projects" variant="light" showArrow>Все проекты</Button>
        </Container>
      </div>
      <div className="bg-[#7e7e83] py-16 sm:py-20 lg:py-24">
        <Container>
          <p className="max-w-2xl text-pretty text-base leading-7 text-white sm:text-lg">
            Фотографии объектов, в которых применены продукты БЕРТА. Раздел пополняется через административную панель.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {projects.slice(0, 4).map((project, index) => (
              <div key={project.id} className={`rounded-2xl bg-white p-4 ${index === 0 ? "md:col-span-2" : ""}`}>
                <ProjectCard project={project} large={index === 0} />
              </div>
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
