import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";

const steps = ["Получение заявки", "Определение задачи", "Подбор системы", "Техническая консультация", "Подготовка предложения", "Документация или запуск заказа"];

export function ProcessSection() {
  return (
    <section>
      <div className="bg-[#0b1620] py-16 sm:py-20 lg:py-24">
        <Container>
          <Heading tone="dark" eyebrow="Процесс" title="От задачи до системного решения — шесть прозрачных этапов" />
        </Container>
      </div>
      <div className="bg-[#7e7e83] py-16 sm:py-20 lg:py-24">
        <Container>
          <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{steps.map((step, index) => <li key={step} className="group flex min-h-44 flex-col justify-between rounded-2xl border border-ink/10 bg-white p-6 transition hover:-translate-y-1 hover:shadow-soft"><span className="text-xs font-bold tracking-[0.2em] text-accent">0{index + 1}</span><p className="max-w-xs text-xl font-semibold tracking-[-0.025em] text-ink">{step}</p></li>)}</ol>
        </Container>
      </div>
    </section>
  );
}
