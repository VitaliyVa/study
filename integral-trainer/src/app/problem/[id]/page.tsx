import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MousePointerClick } from "lucide-react";
import { getProblem, problems } from "@/lib/problems";
import { Equation } from "@/components/Equation";
import { StepSolver } from "@/components/StepSolver";
import { DifficultyBadge } from "@/components/DifficultyBadge";

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

      <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-sm text-muted">
        <MousePointerClick className="h-4 w-4" />
        Наведи (або тапни) на підсвічені елементи формули — там підказки
      </p>

      {/* Покрокове рішення */}
      <StepSolver steps={problem.steps} answer={problem.answer} />
    </div>
  );
}
