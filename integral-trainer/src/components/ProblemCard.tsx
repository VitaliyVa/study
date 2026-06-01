import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Problem } from "@/lib/types";
import { KatexBlock } from "./KatexBlock";
import { SolvedCheck } from "./SolvedCheck";

// Збираємо latex умови з токенів для прев'ю на картці
function previewLatex(p: Problem): string {
  return p.problemTokens.map((t) => t.latex).join(" ");
}

export function ProblemCard({ problem }: { problem: Problem }) {
  return (
    <Link
      href={`/problem/${problem.id}`}
      className="group flex items-center justify-between gap-4 rounded-xl border border-border bg-surface/60 px-5 py-4 transition hover:border-accent-strong/60 hover:bg-surface-2"
    >
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <p className="truncate text-sm text-muted">{problem.title}</p>
          <SolvedCheck id={problem.id} />
        </div>
        <div className="mt-1 overflow-x-auto text-foreground">
          <KatexBlock latex={previewLatex(problem)} className="text-xl" />
        </div>
      </div>
      <ArrowRight className="h-5 w-5 shrink-0 text-muted transition group-hover:translate-x-1 group-hover:text-accent" />
    </Link>
  );
}
