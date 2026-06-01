"use client";

import * as Tooltip from "@radix-ui/react-tooltip";
import clsx from "clsx";
import type { Token } from "@/lib/types";
import { MathToken } from "./MathToken";

// Інтерактивне рівняння: рядок токенів, частина з яких має підказки.
export function Equation({
  tokens,
  size = "lg",
  align = "center",
}: {
  tokens: Token[];
  size?: "sm" | "md" | "lg";
  align?: "center" | "start";
}) {
  const sizeCls =
    size === "lg"
      ? "text-3xl sm:text-4xl"
      : size === "md"
        ? "text-2xl sm:text-3xl"
        : "text-lg sm:text-xl";

  return (
    <Tooltip.Provider delayDuration={100}>
      <div
        className={clsx(
          "flex flex-wrap items-center gap-x-0.5 gap-y-2 leading-none",
          align === "center" ? "justify-center" : "justify-start",
          sizeCls
        )}
      >
        {tokens.map((t, i) => (
          <MathToken key={i} token={t} />
        ))}
      </div>
    </Tooltip.Provider>
  );
}
