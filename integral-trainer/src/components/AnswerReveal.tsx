"use client";

import { useState } from "react";
import { Eye, PencilLine } from "lucide-react";
import { KatexBlock } from "./KatexBlock";

// Спершу спонукаємо спробувати на папері, відповідь — під блюром.
export function AnswerReveal({ answer }: { answer: string }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="mt-6 rounded-xl border border-border bg-surface/60 p-4 sm:p-5">
      <p className="flex items-center gap-2 text-sm font-medium text-foreground/90">
        <PencilLine className="h-4 w-4 text-accent" />
        Спершу спробуй розв&apos;язати сам на папері
      </p>

      <div className="relative mt-3 flex min-h-[64px] items-center justify-center rounded-lg bg-background/60 px-4 py-4">
        <div
          className={
            "transition select-none " + (revealed ? "" : "blur-md")
          }
          aria-hidden={!revealed}
        >
          <KatexBlock latex={answer} className="text-2xl" />
        </div>

        {!revealed && (
          <button
            onClick={() => setRevealed(true)}
            className="absolute inset-0 grid place-items-center rounded-lg bg-background/30 backdrop-blur-[1px]"
          >
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-accent-strong px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-accent-strong/30 transition hover:bg-accent">
              <Eye className="h-4 w-4" />
              Показати відповідь
            </span>
          </button>
        )}
      </div>

      {revealed && (
        <p className="mt-2 text-center text-xs text-muted">
          Збіглося? 🎉 Якщо ні — пройди рішення покроково нижче.
        </p>
      )}
    </div>
  );
}
