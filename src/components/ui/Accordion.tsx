interface AccordionItem {
  question: string;
  answer: string;
}

export function Accordion({ items }: { items: AccordionItem[] }) {
  return (
    <div className="divide-y divide-ink/10 border-y border-ink/10">
      {items.map((item) => (
        <details key={item.question} className="group py-1">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-semibold text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
            {item.question}
            <span aria-hidden="true" className="text-2xl font-light transition group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="max-w-3xl pb-6 pr-12 leading-7 text-steel">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
