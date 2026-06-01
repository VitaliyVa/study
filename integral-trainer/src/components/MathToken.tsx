"use client";

import * as Tooltip from "@radix-ui/react-tooltip";
import { useState } from "react";
import type { Token } from "@/lib/types";
import { KatexBlock } from "./KatexBlock";

export function MathToken({ token }: { token: Token }) {
  const [open, setOpen] = useState(false);

  // Неінтерактивний токен (дужки, +) — просто рендеримо
  if (!token.hint) {
    return <KatexBlock latex={token.latex} className="select-none" />;
  }

  return (
    <Tooltip.Root open={open} onOpenChange={setOpen} delayDuration={100}>
      <Tooltip.Trigger asChild>
        <span
          className="math-token"
          tabIndex={0}
          role="button"
          aria-label={token.hint.term}
          data-open={open || undefined}
          onClick={() => setOpen((v) => !v)} // тап на мобілці
        >
          <KatexBlock latex={token.latex} className="select-none" />
        </span>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          side="top"
          sideOffset={10}
          collisionPadding={12}
          className="z-50 max-w-xs rounded-xl border border-accent-strong/40 bg-surface-2 px-4 py-3 text-left shadow-xl shadow-black/40"
        >
          <p className="text-sm font-semibold text-accent">{token.hint.term}</p>
          <p className="mt-1 text-sm leading-relaxed text-foreground/85">
            {token.hint.text}
          </p>
          <Tooltip.Arrow className="fill-surface-2" width={12} height={6} />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}
