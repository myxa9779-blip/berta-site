import { BookOpenCheck, Boxes, DraftingCompass, Factory, Headphones, Layers3, ShieldCheck, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";

const advantages = [
  { icon: Boxes, title: "Собственная линейка", description: "Продукты развиваются как связанная архитектурная система, а не набор разрозненных профилей." },
  { icon: DraftingCompass, title: "Инженерная поддержка", description: "Помощь в подборе системы и технических материалов под конкретную задачу." },
  { icon: Layers3, title: "Жилые и коммерческие объекты", description: "Решения для частной, общественной и деловой архитектуры." },
  { icon: BookOpenCheck, title: "Документация", description: "Каталоги и технические материалы доступны в единой библиотеке сайта." },
  { icon: Headphones, title: "Консультация", description: "Помогаем определить подходящий продукт и подготовить заявку на расчёт." },
  { icon: Factory, title: "Собственное производство", description: "Контроль ключевых этапов и понятное предложение для вашего объекта." },
  { icon: ShieldCheck, title: "Контроль качества", description: "Техническая дисциплина и прозрачная работа с подтверждёнными данными." },
  { icon: Sparkles, title: "Архитектурные возможности", description: "Чистая геометрия алюминия, большие стеклянные плоскости и гибкость применения." },
];

export function AdvantagesSection() {
  return (
    <section>
      <div className="bg-[#0b1620] py-16 sm:py-20 lg:py-24">
        <Container>
          <Heading tone="dark" eyebrow="Почему Берта" title="Система начинается не с профиля, а с понимания проекта" />
        </Container>
      </div>
      <div className="bg-[#7e7e83] py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="grid gap-px overflow-hidden rounded-2xl border border-white/20 bg-white/20 sm:grid-cols-2 lg:grid-cols-4">
            {advantages.map((item) => {
              const Icon = item.icon;
              return <article key={item.title} className="min-h-64 bg-white p-6 sm:p-8"><Icon aria-hidden="true" className="h-6 w-6 text-accent" /><h3 className="mt-12 text-xl font-semibold tracking-[-0.03em] text-ink">{item.title}</h3><p className="mt-3 text-sm leading-6 text-steel">{item.description}</p></article>;
            })}
          </div>
        </Container>
      </div>
    </section>
  );
}
