"use client";

import * as Tooltip from "@radix-ui/react-tooltip";
import { useState } from "react";

// Інлайн-термін з підказкою при наведенні/тапі (для жаргону в тексті теорії)
export function Term({
  children,
  hint,
  color,
}: {
  children: React.ReactNode;
  hint: string;
  color?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Tooltip.Provider delayDuration={100}>
      <Tooltip.Root open={open} onOpenChange={setOpen}>
        <Tooltip.Trigger asChild>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="cursor-help font-medium underline decoration-dotted decoration-from-font underline-offset-4 transition hover:opacity-80"
            style={color ? { color } : undefined}
          >
            {children}
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side="top"
            sideOffset={8}
            collisionPadding={12}
            className="z-50 max-w-xs rounded-xl border border-accent-strong/40 bg-surface-2 px-4 py-3 text-left text-sm leading-relaxed text-foreground/90 shadow-xl shadow-black/40"
          >
            {hint}
            <Tooltip.Arrow className="fill-surface-2" width={12} height={6} />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
