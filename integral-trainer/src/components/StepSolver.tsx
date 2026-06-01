"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  Lightbulb,
  RotateCcw,
  CheckCircle2,
  MousePointerClick,
  ListChecks,
} from "lucide-react";
import type { Step } from "@/lib/types";
import { KatexBlock } from "./KatexBlock";
import { Equation } from "./Equation";
import { HelpDialog } from "./HelpDialog";

export function StepSolver({ steps, answer }: { steps: Step[]; answer: string }) {
  // Скільки кроків уже показано (0 = рішення ще не почато)
  const [shown, setShown] = useState(0);

  const total = steps.length;
  const allShown = shown >= total;

  if (shown === 0) {
    return (
      <div className="mt-8 flex justify-center">
        <button
          onClick={() => setShown(1)}
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
      {/* Шапка з прогресом */}
      <div className="mb-5 flex items-center justify-between">
        <span className="text-sm text-muted">
          Показано {Math.min(shown, total)} з {total} кроків
        </span>
        <div className="flex items-center gap-1.5">
          {steps.map((_, idx) => (
            <span
              key={idx}
              className={
                "h-1.5 w-6 rounded-full transition-colors " +
                (idx < shown ? "bg-accent" : "bg-border")
              }
            />
          ))}
        </div>
      </div>

      {/* Усі розкриті кроки — стопкою згори вниз */}
      <ol className="space-y-3">
        <AnimatePresence initial={false}>
          {steps.slice(0, shown).map((step, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="rounded-xl border border-border bg-background/40 p-4 sm:p-5"
            >
              <div className="mb-3 flex items-center gap-2">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-accent-strong/20 text-xs font-bold text-accent">
                  {idx + 1}
                </span>
                <span className="text-sm font-medium text-accent">{step.title}</span>
              </div>

              {/* Інтерактивна формула — наводься на підсвічені частини */}
              <div className="overflow-x-auto rounded-lg bg-background/60 px-4 py-5">
                <Equation tokens={step.tokens} size="md" />
              </div>
              <p className="mt-2 flex items-center justify-center gap-1.5 text-center text-xs text-muted">
                <MousePointerClick className="h-3.5 w-3.5" />
                Наведи (або тапни) на підсвічені частини
              </p>

              <p className="mt-3 flex gap-2 text-[15px] leading-relaxed text-foreground/85">
                <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
                {step.explanation}
              </p>

              {step.help && (
                <div className="mt-3">
                  <HelpDialog help={step.help} stepTitle={step.title} />
                </div>
              )}
            </motion.li>
          ))}
        </AnimatePresence>
      </ol>

      {/* Фінальна відповідь */}
      {allShown && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 flex flex-wrap items-center gap-3 rounded-xl border border-success/30 bg-success/10 px-4 py-3"
        >
          <CheckCircle2 className="h-5 w-5 text-success" />
          <span className="text-sm font-medium text-success">Відповідь:</span>
          <KatexBlock latex={answer} className="text-lg" />
        </motion.div>
      )}

      {/* Керування */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={() => setShown(0)}
          className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-muted transition hover:text-foreground"
        >
          <RotateCcw className="h-4 w-4" />
          Згорнути
        </button>

        {!allShown ? (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShown(total)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm font-medium transition hover:bg-surface-2"
            >
              <ListChecks className="h-4 w-4" />
              Показати все
            </button>
            <button
              onClick={() => setShown((v) => Math.min(total, v + 1))}
              className="inline-flex items-center gap-1.5 rounded-lg bg-accent-strong px-5 py-2 text-sm font-semibold text-white transition hover:bg-accent active:scale-[0.98]"
            >
              Наступний крок
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-success">
            <CheckCircle2 className="h-4 w-4" />
            Готово!
          </span>
        )}
      </div>
    </div>
  );
}
