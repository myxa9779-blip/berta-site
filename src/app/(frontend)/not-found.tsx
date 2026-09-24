import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="architectural-grid grid min-h-screen place-items-center pt-[76px]">
      <Container className="py-20 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent">Ошибка 404</p>
        <h1 className="mt-5 text-6xl font-semibold tracking-[-0.06em] text-ink sm:text-8xl">Страница не найдена</h1>
        <p className="mx-auto mt-6 max-w-xl leading-7 text-steel">Возможно, раздел ещё готовится или адрес был изменён.</p>
        <Button href="/" className="mt-8">Вернуться на главную</Button>
      </Container>
    </section>
  );
}
