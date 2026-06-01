import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { KatexBlock } from "@/components/KatexBlock";

const tableRules: [string, string][] = [
  ["\\int x^{n}\\,dx", "\\frac{x^{n+1}}{n+1} + C"],
  ["\\int \\frac{1}{x}\\,dx", "\\ln|x| + C"],
  ["\\int e^{x}\\,dx", "e^{x} + C"],
  ["\\int \\cos x\\,dx", "\\sin x + C"],
  ["\\int \\sin x\\,dx", "-\\cos x + C"],
];

function Section({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-border bg-surface/50 p-5">
      <h3 className="flex items-center gap-2 font-semibold">
        <span className="grid h-6 w-6 place-items-center rounded-md bg-accent-strong/20 text-xs font-bold text-accent">
          {n}
        </span>
        {title}
      </h3>
      <div className="mt-2 text-[15px] leading-relaxed text-foreground/85">
        {children}
      </div>
    </section>
  );
}

export default function TheoryPage() {
  return (
    <div className="space-y-6">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-muted transition hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Усі задачі
      </Link>

      <h1 className="text-3xl font-bold">Теорія за 10 хвилин</h1>
      <p className="text-muted">
        Драбинка понять: кожен щабель — одна ідея. Від похідної до інтеграла.
      </p>

      <div className="grid gap-3 sm:grid-cols-2">
        <Section n={1} title="Похідна">
          Швидкість зміни функції — її «крутизна» в точці. Позначення{" "}
          <KatexBlock latex="y' \text{ або } \tfrac{dy}{dx}" />.
        </Section>
        <Section n={2} title="Первісна">
          Зворотна задача: дано похідну — знайди саму функцію. Похідна{" "}
          <KatexBlock latex="2x" /> → функція <KatexBlock latex="x^2 + C" />.
        </Section>
        <Section n={3} title="Інтеграл">
          Знак первісної. <KatexBlock latex="\int 2x\,dx = x^2 + C" />. Знак{" "}
          <KatexBlock latex="\int" /> — витягнута S, «сума».
        </Section>
        <Section n={4} title="Стала C">
          Похідна сталої = 0, тож первісна визначена з точністю до{" "}
          <KatexBlock latex="+\,C" />. Завжди дописуй її!
        </Section>
        <Section n={5} title="Геометричний зміст">
          Інтеграл = площа під графіком функції (сума нескінченно тонких
          стовпчиків).
        </Section>
        <Section n={6} title="Самоперевірка">
          Взяв похідну від відповіді — отримав підінтегральну функцію? Значить,
          рішення вірне.
        </Section>
      </div>

      {/* Таблиця базових інтегралів */}
      <div className="rounded-xl border border-border bg-surface/50 p-5">
        <h3 className="font-semibold">Таблиця базових інтегралів</h3>
        <div className="mt-4 divide-y divide-border/60">
          {tableRules.map(([lhs, rhs], i) => (
            <div key={i} className="flex items-center gap-4 py-3">
              <KatexBlock latex={lhs} className="text-lg" />
              <span className="text-muted">=</span>
              <KatexBlock latex={rhs} className="text-lg text-accent" />
            </div>
          ))}
        </div>
      </div>

      {/* Інтегрування частинами */}
      <div className="rounded-xl border border-border bg-surface/50 p-5">
        <h3 className="font-semibold">Інтегрування частинами</h3>
        <p className="mt-2 text-[15px] text-foreground/85">
          Коли під інтегралом добуток різних функцій (напр.{" "}
          <KatexBlock latex="x\cos x" />) — звичайне правило не бере. Формула:
        </p>
        <div className="my-4 rounded-lg bg-background/60 py-4">
          <KatexBlock latex="\int u\,dv = u\cdot v - \int v\,du" display className="text-xl" />
        </div>
        <p className="text-[15px] text-foreground/85">
          За <KatexBlock latex="u" /> беремо те, що при похідній спрощується
          (мнемоніка LIATE: логарифми → обернені тригонометричні → алгебраїчні →
          тригонометричні → експоненти).
        </p>
      </div>
    </div>
  );
}
