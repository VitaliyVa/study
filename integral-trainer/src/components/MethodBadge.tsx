"use client";

import * as Tooltip from "@radix-ui/react-tooltip";
import { useState } from "react";
import { Wrench } from "lucide-react";
import { getMethod } from "@/lib/methods";
import { KatexBlock } from "./KatexBlock";

// Чип "Метод: <назва>" з підказкою-описом при наведенні/тапі
export function MethodBadge({ id, label = true }: { id: string; label?: boolean }) {
  const [open, setOpen] = useState(false);
  const method = getMethod(id);
  if (!method) return null;

  return (
    <Tooltip.Provider delayDuration={100}>
      <Tooltip.Root open={open} onOpenChange={setOpen}>
        <Tooltip.Trigger asChild>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition hover:brightness-125"
            style={{
              color: method.color,
              borderColor: `${method.color}55`,
              background: `${method.color}1a`,
            }}
          >
            <Wrench className="h-3 w-3" />
            {label ? "Метод: " : ""}
            {method.name}
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side="top"
            sideOffset={8}
            collisionPadding={12}
            className="z-50 max-w-xs rounded-xl border bg-surface-2 px-4 py-3 text-left shadow-xl shadow-black/40"
            style={{ borderColor: `${method.color}66` }}
          >
            <p className="text-sm font-semibold" style={{ color: method.color }}>
              {method.name}
            </p>
            <p className="mt-1 text-xs font-medium text-foreground/70">
              Коли: {method.when}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-foreground/90">
              {method.description}
            </p>
            {method.example && (
              <div className="mt-2 overflow-x-auto rounded-lg bg-background/60 px-3 py-2">
                <KatexBlock latex={method.example} />
              </div>
            )}
            <Tooltip.Arrow className="fill-surface-2" width={12} height={6} />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
