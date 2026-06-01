"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { HelpCircle, X } from "lucide-react";
import type { StepHelp } from "@/lib/types";
import { KatexBlock } from "./KatexBlock";

// Кнопка "Я не розумію" + модальне вікно з простішим поясненням і прикладами
export function HelpDialog({ help, stepTitle }: { help: StepHelp; stepTitle: string }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="inline-flex items-center gap-1.5 rounded-lg border border-warning/40 bg-warning/10 px-3 py-1.5 text-sm font-medium text-warning transition hover:bg-warning/20">
          <HelpCircle className="h-4 w-4" />
          Я не розумію
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border bg-surface p-6 shadow-2xl shadow-black/60 focus:outline-none">
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

          {/* Просте пояснення «на пальцях» */}
          <p className="mt-4 rounded-xl bg-background/60 p-4 text-[15px] leading-relaxed text-foreground/90">
            {help.plain}
          </p>

          {/* Елементарні приклади */}
          {help.examples && help.examples.length > 0 && (
            <div className="mt-4 space-y-2">
              <p className="text-sm font-medium text-muted">Найпростіші приклади:</p>
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
