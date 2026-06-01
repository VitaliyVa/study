"use client";

import { useState } from "react";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { HelpCircle, X, ChevronDown, Hash, Eye, ArrowRight } from "lucide-react";
import type { StepHelp } from "@/lib/types";
import { getMethod } from "@/lib/methods";
import { KatexBlock } from "./KatexBlock";

export function HelpDialog({
  help,
  stepTitle,
  methodId,
}: {
  help: StepHelp;
  stepTitle: string;
  methodId?: string;
}) {
  const [showSimpler, setShowSimpler] = useState(false);
  const [showCheck, setShowCheck] = useState(false);
  const method = methodId ? getMethod(methodId) : undefined;

  return (
    <Dialog.Root
      onOpenChange={(o) => {
        if (!o) {
          setShowSimpler(false);
          setShowCheck(false);
        }
      }}
    >
      <Dialog.Trigger asChild>
        <button className="inline-flex items-center gap-1.5 rounded-lg border border-warning/40 bg-warning/10 px-3 py-1.5 text-sm font-medium text-warning transition hover:bg-warning/20">
          <HelpCircle className="h-4 w-4" />
          Я не розумію
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[88vh] w-[92vw] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl border border-border bg-surface p-6 shadow-2xl shadow-black/60 focus:outline-none">
          <div className="flex items-start justify-between gap-4">
            <div>
              <Dialog.Title className="flex items-center gap-2 text-lg font-semibold">
                <HelpCircle className="h-5 w-5 text-warning" />
                Пояснюю простіше
              </Dialog.Title>
              <Dialog.Description className="mt-1 text-sm text-muted">
                Крок: {stepTitle}
              </Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <button
                aria-label="Закрити"
                className="rounded-lg p-1.5 text-muted transition hover:bg-surface-2 hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </Dialog.Close>
          </div>

          {/* Рівень 1: просте пояснення */}
          <p className="mt-4 rounded-xl bg-background/60 p-4 text-[15px] leading-relaxed text-foreground/90">
            {help.plain}
          </p>

          {/* Рівень 2: ще простіше (за кнопкою) */}
          {help.simpler && (
            <div className="mt-3">
              {!showSimpler ? (
                <button
                  onClick={() => setShowSimpler(true)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-muted transition hover:bg-surface-2 hover:text-foreground"
                >
                  <ChevronDown className="h-4 w-4" />
                  Все одно складно — поясни ще простіше
                </button>
              ) : (
                <p className="rounded-xl border border-accent-strong/30 bg-accent-soft/40 p-4 text-[15px] leading-relaxed text-foreground/90">
                  {help.simpler}
                </p>
              )}
            </div>
          )}

          {/* На конкретних числах */}
          {help.numeric && help.numeric.length > 0 && (
            <div className="mt-4">
              <p className="flex items-center gap-1.5 text-sm font-medium text-success">
                <Hash className="h-4 w-4" />
                Те саме на конкретних числах:
              </p>
              <div className="mt-2 space-y-2">
                {help.numeric.map((ex, i) => (
                  <div
                    key={i}
                    className="flex flex-wrap items-center gap-3 rounded-xl border border-success/20 bg-success/5 px-4 py-3"
                  >
                    <KatexBlock latex={ex.latex} className="text-lg" />
                    {ex.note && <span className="text-sm text-muted">— {ex.note}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Загальні приклади */}
          {help.examples && help.examples.length > 0 && (
            <div className="mt-4 space-y-2">
              <p className="text-sm font-medium text-muted">Ще приклади того ж правила:</p>
              {help.examples.map((ex, i) => (
                <div
                  key={i}
                  className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-background/40 px-4 py-3"
                >
                  <KatexBlock latex={ex.latex} className="text-lg" />
                  {ex.note && <span className="text-sm text-muted">— {ex.note}</span>}
                </div>
              ))}
            </div>
          )}

          {/* Міні-самоперевірка */}
          {help.check && (
            <div className="mt-4 rounded-xl border border-accent-strong/30 bg-background/40 p-4">
              <p className="text-sm font-medium text-accent">Перевір себе:</p>
              <p className="mt-1 text-[15px] text-foreground/90">{help.check.question}</p>
              {!showCheck ? (
                <button
                  onClick={() => setShowCheck(true)}
                  className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-accent-strong/80 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-accent"
                >
                  <Eye className="h-4 w-4" />
                  Показати відповідь
                </button>
              ) : (
                <div className="mt-3 inline-flex items-center gap-2 rounded-lg bg-success/10 px-4 py-2">
                  <KatexBlock latex={help.check.answer} className="text-lg" />
                </div>
              )}
            </div>
          )}

          {/* Лінк на метод/теорію */}
          {method && (
            <Link
              href={`/theory#method-${method.id}`}
              className="mt-4 flex items-center justify-between gap-2 rounded-xl border px-4 py-3 text-sm transition hover:brightness-125"
              style={{ borderColor: `${method.color}55`, background: `${method.color}14`, color: method.color }}
            >
              <span>
                Детальніше про метод: <strong>{method.name}</strong>
              </span>
              <ArrowRight className="h-4 w-4 shrink-0" />
            </Link>
          )}

          <Dialog.Close asChild>
            <button className="mt-6 w-full rounded-xl bg-accent-strong py-2.5 font-semibold text-white transition hover:bg-accent">
              Тепер зрозуміло 👍
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
