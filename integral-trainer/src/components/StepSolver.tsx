"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";
import clsx from "clsx";
import type { Step } from "@/lib/types";
import { KatexBlock } from "./KatexBlock";

export function StepSolver({ steps, answer }: { steps: Step[]; answer: string }) {
  const [revealed, setRevealed] = useState(false);
  const [i, setI] = useState(0);

  const last = steps.length - 1;
  const step = steps[i];
  const atEnd = i === last;

  if (!revealed) {
    return (
      <div className="mt-8 flex justify-center">
        <button
          onClick={() => setRevealed(true)}
          className="group inline-flex items-center gap-2 rounded-xl bg-accent-strong px-6 py-3 font-semibold text-white shadow-lg shadow-accent-strong/30 transition hover:bg-accent active:scale-[0.98]"
        >
          <Lightbulb className="h-5 w-5 transition group-hover:rotate-12" />
          Розв&apos;язати покроково
        </button>
      </div>
    );
  }

  return (
    <div className="mt-8 rounded-2xl border border-border bg-surface/70 p-5 sm:p-6 backdrop-blur">
      {/* Прогрес по кроках */}
      <div className="mb-5 flex items-center gap-2">
        {steps.map((_, idx) => (
          <button
            key={idx}
            aria-label={`Крок ${idx + 1}`}
            onClick={() => setI(idx)}
            className={clsx(
              "h-1.5 flex-1 rounded-full transition-colors",
              idx <= i ? "bg-accent" : "bg-border"
            )}
          />
        ))}
      </div>

      <div className="mb-2 flex items-center justify-between text-sm text-muted">
        <span>
          Крок {i + 1} з {steps.length}
        </span>
        <span className="inline-flex items-center gap-1 font-medium text-accent">
          {step.title}
        </span>
      </div>

      {/* Сам крок */}
      <div className="min-h-[170px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="overflow-x-auto rounded-xl bg-background/60 px-4 py-6">
              <KatexBlock latex={step.latex} display className="text-xl sm:text-2xl" />
            </div>
            <p className="mt-4 flex gap-2 text-[15px] leading-relaxed text-foreground/85">
              <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
              {step.explanation}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Фінальна відповідь — показується на останньому кроці */}
      {atEnd && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-5 flex flex-wrap items-center gap-3 rounded-xl border border-success/30 bg-success/10 px-4 py-3"
        >
          <CheckCircle2 className="h-5 w-5 text-success" />
          <span className="text-sm font-medium text-success">Відповідь:</span>
          <KatexBlock latex={answer} className="text-lg" />
        </motion.div>
      )}

      {/* Навігація */}
      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={() => setI((v) => Math.max(0, v - 1))}
          disabled={i === 0}
          className="inline-flex items-center gap-1 rounded-lg border border-border px-4 py-2 text-sm font-medium transition hover:bg-surface-2 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft className="h-4 w-4" />
          Назад
        </button>

        <button
          onClick={() => {
            setI(0);
            setRevealed(false);
          }}
          className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-muted transition hover:text-foreground"
        >
          <RotateCcw className="h-4 w-4" />
          Спочатку
        </button>

        <button
          onClick={() => setI((v) => Math.min(last, v + 1))}
          disabled={atEnd}
          className="inline-flex items-center gap-1 rounded-lg bg-accent-strong px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent disabled:cursor-not-allowed disabled:opacity-40"
        >
          Вперед
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
