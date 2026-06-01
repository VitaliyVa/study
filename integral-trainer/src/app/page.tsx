import { levels, problemsByDifficulty } from "@/lib/problems";
import { ProblemCard } from "@/components/ProblemCard";
import { Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-strong/30 bg-accent-soft px-3 py-1 text-sm text-accent">
          <Sparkles className="h-4 w-4" />
          Інтеграли — крок за кроком
        </span>
        <h1 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight">
          Зрозумій інтеграли,
          <br className="hidden sm:block" /> а не зазубрюй
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-muted">
          Наведи курсор на будь-який елемент формули — отримаєш підказку. Тисни
          «Розв&apos;язати покроково» — пройди рішення з перемоткою по кроках.
        </p>
      </section>

      {/* Сходинки складності */}
      {levels.map((level) => {
        const list = problemsByDifficulty(level.difficulty);
        if (list.length === 0) return null;
        return (
          <section key={level.difficulty}>
            <div className="mb-4 flex items-baseline gap-3">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-accent-strong/20 text-sm font-bold text-accent">
                {level.difficulty}
              </span>
              <div>
                <h2 className="text-lg font-semibold">{level.name}</h2>
                <p className="text-sm text-muted">{level.summary}</p>
              </div>
            </div>
            <div className="grid gap-3">
              {list.map((p) => (
                <ProblemCard key={p.id} problem={p} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
