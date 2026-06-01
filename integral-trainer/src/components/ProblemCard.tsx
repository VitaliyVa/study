import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Problem } from "@/lib/types";
import { Equation } from "./Equation";
import { SolvedCheck } from "./SolvedCheck";

export function ProblemCard({ problem }: { problem: Problem }) {
  return (
    <div className="group relative flex items-center justify-between gap-4 rounded-xl border border-border bg-surface/60 px-5 py-4 transition hover:border-accent-strong/60 hover:bg-surface-2">
      {/* Посилання покриває всю картку — навігація по будь-якому місцю */}
      <Link
        href={`/problem/${problem.id}`}
        aria-label={problem.title}
        className="absolute inset-0 z-0 rounded-xl"
      />

      {/* Контент пропускає кліки до посилання (pointer-events-none), */}
      {/* окрім зони формули — там працюють підказки при наведенні. */}
      <div className="pointer-events-none relative z-10 min-w-0">
        <div className="flex items-center gap-2">
          <p className="truncate text-sm text-muted">{problem.title}</p>
          <SolvedCheck id={problem.id} />
        </div>
        <div className="pointer-events-auto mt-1 inline-block overflow-x-auto">
          <Equation tokens={problem.problemTokens} size="sm" align="start" />
        </div>
      </div>

      <ArrowRight className="pointer-events-none relative z-10 h-5 w-5 shrink-0 text-muted transition group-hover:translate-x-1 group-hover:text-accent" />
    </div>
  );
}
