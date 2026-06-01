import Link from "next/link";
import { ArrowLeft, ArrowLeftRight, Lightbulb, Sparkles, Palette, Wrench } from "lucide-react";
import { KatexBlock } from "@/components/KatexBlock";
import { Equation } from "@/components/Equation";
import { Term } from "@/components/Term";
import { COLOR_COEF, COLOR_POW } from "@/lib/problems";
import { methods } from "@/lib/methods";
import type { Token } from "@/lib/types";

// Кольори для інтегрування частинами
const U = "#818cf8"; // u — індиго
const DV = "#f472b6"; // dv — рожевий
const V = "#34d399"; // v — зелений
const DU = "#fbbf24"; // du — бурштиновий
const c = (color: string, s: string) => `\\textcolor{${color}}{${s}}`;

// Рядки таблиці базових інтегралів (інтерактивні)
const tableRules: { lhs: Token; rhs: Token }[] = [
  {
    lhs: { latex: `\\int x^{${c(COLOR_POW, "n")}}\\,dx`, hint: { term: "степенева функція", text: "Найголовніша. n — будь-який степінь." } },
    rhs: { latex: `\\frac{x^{${c(COLOR_POW, "n+1")}}}{${c(COLOR_POW, "n+1")}} + C`, hint: { term: "степінь +1, поділи на новий", text: "Зелене — той самий n, тільки збільшений на 1." } },
  },
  {
    lhs: { latex: "\\int \\frac{1}{x}\\,dx", hint: { term: "виняток 1/x", text: "Формула степеня тут не працює (дала б ділення на 0)." } },
    rhs: { latex: "\\ln|x| + C", hint: { term: "ln|x|", text: "Це треба просто запам'ятати. Модуль — бо логарифм лише для додатних." } },
  },
  {
    lhs: { latex: "\\int e^{x}\\,dx", hint: { term: "експонента", text: "Найприємніша функція." } },
    rhs: { latex: "e^{x} + C", hint: { term: "eˣ → eˣ", text: "Інтегрується сама в себе. І похідна, і інтеграл — той самий eˣ." } },
  },
  {
    lhs: { latex: "\\int \\cos x\\,dx", hint: { term: "косинус", text: "Уважно зі знаком — тут плюс." } },
    rhs: { latex: `${c(V, "\\sin x")} + C`, hint: { term: "+ sin x", text: "∫cos = +sin (БЕЗ мінуса)." } },
  },
  {
    lhs: { latex: "\\int \\sin x\\,dx", hint: { term: "синус", text: "А тут з'являється мінус — типова пастка." } },
    rhs: { latex: `${c(COLOR_COEF, "-")}\\cos x + C`, hint: { term: "− cos x", text: "∫sin = −cos. Мінус легко загубити!" } },
  },
];

function Concept({
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
      <div className="mt-2 text-[15px] leading-relaxed text-foreground/85">{children}</div>
    </section>
  );
}

export default function TheoryPage() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted transition hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Усі задачі
        </Link>
        <h1 className="mt-4 text-3xl font-bold">Теорія за 10 хвилин</h1>
        <p className="mt-2 text-muted">
          Наводь курсор на{" "}
          <span className="text-accent underline decoration-dotted underline-offset-4">
            підсвічені слова
          </span>{" "}
          і кольорові частини формул — скрізь є прості підказки.
        </p>
      </div>

      {/* Головна ідея: інтеграл — зворотна дія до похідної */}
      <section className="rounded-2xl border border-accent-strong/30 bg-accent-soft/40 p-5 sm:p-6">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <Sparkles className="h-5 w-5 text-accent" />
          Головна ідея: одна дія скасовує іншу
        </h2>
        <p className="mt-2 text-[15px] text-foreground/85">
          <Term hint="Похідна показує швидкість зміни функції — її нахил у точці.">
            Похідна
          </Term>{" "}
          і{" "}
          <Term hint="Інтеграл шукає функцію назад за її похідною (первісну).">
            інтеграл
          </Term>{" "}
          — це дзеркальні операції. Туди й назад:
        </p>
        <div className="mt-4 grid items-center gap-3 sm:grid-cols-[1fr_auto_1fr]">
          <div className="rounded-xl bg-background/60 px-4 py-5 text-center">
            <KatexBlock latex="(x^2)' = 2x" className="text-xl" />
            <p className="mt-2 text-xs text-muted">похідна: функція → нахил</p>
          </div>
          <ArrowLeftRight className="mx-auto h-6 w-6 text-accent" />
          <div className="rounded-xl bg-background/60 px-4 py-5 text-center">
            <KatexBlock latex="\int 2x\,dx = x^2 + C" className="text-xl" />
            <p className="mt-2 text-xs text-muted">інтеграл: нахил → функція</p>
          </div>
        </div>
        <p className="mt-4 flex gap-2 text-sm text-foreground/80">
          <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
          Саме тому рішення можна перевірити: візьми похідну від відповіді — маєш
          отримати те, що було під інтегралом.
        </p>
      </section>

      {/* Базові поняття з підказками */}
      <div className="grid gap-3 sm:grid-cols-2">
        <Concept n={1} title="Похідна">
          <Term hint="Наскільки швидко росте y, коли трохи росте x.">Швидкість зміни</Term>{" "}
          функції. Позначення <KatexBlock latex="y'" /> або <KatexBlock latex="\tfrac{dy}{dx}" />.
        </Concept>
        <Concept n={2} title="Первісна">
          <Term hint="Функція, чия похідна дорівнює заданій. Зворотна задача до похідної.">
            Зворотна задача
          </Term>
          : дано похідну <KatexBlock latex="2x" /> → шукаємо функцію <KatexBlock latex="x^2" />.
        </Concept>
        <Concept n={3} title="Інтеграл">
          Знак первісної: <KatexBlock latex="\int" /> — витягнута{" "}
          <Term hint="Інтеграл «склеює» нескінченно багато крихітних шматочків у ціле — звідси символ суми.">
            S («сума»)
          </Term>
          .
        </Concept>
        <Concept n={4} title="Стала C">
          Похідна будь-якого числа = 0, тож первісна визначена{" "}
          <Term hint="Функції x², x²+1, x²+7 мають ОДНУ похідну 2x. Тому в інтегралі додаємо невідому сталу C.">
            з точністю до + C
          </Term>
          . Завжди дописуй!
        </Concept>
        <Concept n={5} title="Геометричний зміст">
          Інтеграл ={" "}
          <Term hint="Якщо нарізати область під кривою на безліч тонесеньких стовпчиків і скласти — вийде інтеграл.">
            площа під графіком
          </Term>
          .
        </Concept>
        <Concept n={6} title="Самоперевірка">
          Взяв похідну від відповіді й отримав підінтегральну функцію?{" "}
          <span className="text-success">Значить, вірно.</span>
        </Concept>
      </div>

      {/* Анатомія головного правила */}
      <section className="rounded-2xl border border-border bg-surface/50 p-5 sm:p-6">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <Palette className="h-5 w-5 text-accent" />
          Анатомія головного правила
        </h2>
        <p className="mt-1 text-sm text-muted">
          Наведи на частини — поясню кожну. Зелене — це той самий{" "}
          <span style={{ color: COLOR_POW }}>n</span> у трьох місцях.
        </p>
        <div className="mt-4 overflow-x-auto rounded-xl bg-background/60 px-4 py-6">
          <Equation
            tokens={[
              { latex: "\\int", hint: { term: "∫", text: "знайти первісну" } },
              {
                latex: `x^{${c(COLOR_POW, "n")}}`,
                hint: { term: "xⁿ — степенева функція", text: "n — будь-який степінь: 2, 4, 100…" },
              },
              { latex: "dx", hint: { term: "dx", text: "інтегруємо по змінній x" } },
              { latex: "=" },
              {
                latex: `\\frac{x^{${c(COLOR_POW, "n+1")}}}{${c(COLOR_POW, "n+1")}}`,
                hint: { term: "степінь зріс на 1", text: "Той самий n, але +1: і зверху (показник), і знизу (дільник)." },
              },
              { latex: "+" },
              { latex: "C", hint: { term: "+ C", text: "стала — дописуй завжди" } },
            ]}
            size="md"
          />
        </div>
      </section>

      {/* Методи та прийоми розв'язування */}
      <section className="rounded-2xl border border-border bg-surface/50 p-5 sm:p-6">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <Wrench className="h-5 w-5 text-accent" />
          Методи та прийоми розв&apos;язування
        </h2>
        <p className="mt-1 text-sm text-muted">
          Набір інструментів. У кожній задачі видно, який метод застосовано на
          кроці — наведи на бейдж «Метод».
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {methods.map((m) => (
            <div
              key={m.id}
              id={`method-${m.id}`}
              className="scroll-mt-24 rounded-xl border bg-background/40 p-4"
              style={{ borderColor: `${m.color}40` }}
            >
              <div className="flex items-center gap-2">
                <span
                  className="grid h-7 w-7 shrink-0 place-items-center rounded-lg"
                  style={{ background: `${m.color}22`, color: m.color }}
                >
                  <Wrench className="h-4 w-4" />
                </span>
                <h3 className="font-semibold" style={{ color: m.color }}>
                  {m.name}
                </h3>
              </div>
              <p className="mt-2 text-sm font-medium text-foreground/90">{m.short}</p>
              <p className="mt-1 text-xs text-muted">Коли: {m.when}</p>
              <p className="mt-2 text-[14px] leading-relaxed text-foreground/80">
                {m.description}
              </p>
              {m.example && (
                <div className="mt-3 overflow-x-auto rounded-lg bg-background/60 px-3 py-2">
                  <KatexBlock latex={m.example} />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Таблиця базових інтегралів — інтерактивна */}
      <section className="rounded-2xl border border-border bg-surface/50 p-5 sm:p-6">
        <h2 className="text-lg font-semibold">Таблиця базових інтегралів</h2>
        <p className="mt-1 text-sm text-muted">Наведи на будь-яку формулу — буде підказка.</p>
        <div className="mt-4 divide-y divide-border/60">
          {tableRules.map((row, i) => (
            <div key={i} className="py-3">
              <Equation tokens={[row.lhs, { latex: "=" }, row.rhs]} size="md" />
            </div>
          ))}
        </div>
      </section>

      {/* Інтегрування частинами з кольорами */}
      <section className="rounded-2xl border border-border bg-surface/50 p-5 sm:p-6">
        <h2 className="text-lg font-semibold">Інтегрування частинами</h2>
        <p className="mt-2 text-[15px] text-foreground/85">
          Коли під інтегралом{" "}
          <Term hint="Наприклад x·cos x — два різні множники. Степеневе правило тут безсиле.">
            добуток різних функцій
          </Term>
          , вмикається ця формула:
        </p>

        <div className="my-4 overflow-x-auto rounded-xl bg-background/60 px-4 py-6">
          <Equation
            tokens={[
              {
                latex: `\\int ${c(U, "u")}\\,${c(DV, "dv")}`,
                hint: { term: "u · dv", text: "u — те, що спрощується при похідній; dv — решта разом із dx." },
              },
              { latex: "=" },
              {
                latex: `${c(U, "u")}\\cdot ${c(V, "v")}`,
                hint: { term: "u · v", text: "v — первісна (інтеграл) від dv." },
              },
              { latex: "-" },
              {
                latex: `\\int ${c(V, "v")}\\,${c(DU, "du")}`,
                hint: { term: "∫ v · du", text: "du — похідна u. Цей новий інтеграл має бути простішим." },
              },
            ]}
            size="md"
          />
        </div>

        {/* Легенда кольорів */}
        <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-sm">
          {[
            [U, "u — спрощується похідною"],
            [DV, "dv — решта з dx"],
            [V, "v — інтеграл від dv"],
            [DU, "du — похідна u"],
          ].map(([color, label]) => (
            <span key={label} className="inline-flex items-center gap-1.5 text-foreground/80">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: color }} />
              {label}
            </span>
          ))}
        </div>

        <p className="mt-4 text-[15px] text-foreground/85">
          За <span style={{ color: U }} className="font-medium">u</span> бери те, що{" "}
          <Term hint="LIATE: Логарифми → обернені тригонометричні → Алгебраїчні → Тригонометричні → Експоненти. Що вище — те береш за u.">
            спрощується похідною (правило LIATE)
          </Term>
          .
        </p>
      </section>

      {/* Ключові висновки */}
      <section className="rounded-2xl border border-success/30 bg-success/5 p-5 sm:p-6">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-success">
          <Lightbulb className="h-5 w-5" />
          Запам&apos;ятай головне
        </h2>
        <ul className="mt-3 space-y-2 text-[15px] text-foreground/85">
          {[
            "Інтеграл — зворотна дія до похідної. Перевіряй себе похідною.",
            "Степеневе правило: степінь +1, поділи на новий степінь.",
            "Завжди дописуй + C.",
            "1/x — виняток: дає ln|x|, а не степінь.",
          ].map((t, i) => (
            <li key={i} className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-success" />
              {t}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
