import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MousePointerClick } from "lucide-react";
import { getProblem, problems, COLOR_COEF, COLOR_POW } from "@/lib/problems";
import { Equation } from "@/components/Equation";
import { StepSolver } from "@/components/StepSolver";
import { DifficultyBadge } from "@/components/DifficultyBadge";
import { AnswerReveal } from "@/components/AnswerReveal";
import { Pitfalls } from "@/components/Pitfalls";
import { MethodBadge } from "@/components/MethodBadge";

// Статична генерація всіх сторінок задач
export function generateStaticParams() {
  return problems.map((p) => ({ id: p.id }));
}

export default async function ProblemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const problem = getProblem(id);
  if (!problem) notFound();

  return (
    <div>
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-muted transition hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Усі задачі
      </Link>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">{problem.title}</h1>
        <DifficultyBadge difficulty={problem.difficulty} />
      </div>

      {/* Інтерактивне рівняння */}
      <div className="mt-6 rounded-2xl border border-border bg-surface/60 px-4 py-12">
        <Equation tokens={problem.problemTokens} />
      </div>

      {/* Легенда кольорів + підказка про наведення */}
      <div className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-sm text-muted">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: COLOR_COEF }} />
          число (коефіцієнт)
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: COLOR_POW }} />
          степінь
        </span>
        <span className="inline-flex items-center gap-1.5">
          <MousePointerClick className="h-4 w-4" />
          наведи на підсвічене — підказка
        </span>
      </div>

      {/* Методи, якими розв'язується задача */}
      {problem.methodIds && problem.methodIds.length > 0 && (
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted">Розв&apos;язується методами:</span>
          {problem.methodIds.map((mid) => (
            <MethodBadge key={mid} id={mid} label={false} />
          ))}
        </div>
      )}

      {/* Спробуй сам (відповідь під блюром) */}
      <AnswerReveal answer={problem.answer} />

      {/* Покрокове рішення */}
      <StepSolver steps={problem.steps} answer={problem.answer} problemId={problem.id} />

      {/* Типові помилки */}
      {problem.pitfalls && <Pitfalls items={problem.pitfalls} />}
    </div>
  );
}
