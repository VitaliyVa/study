"use client";

import * as Tooltip from "@radix-ui/react-tooltip";
import clsx from "clsx";
import type { Token } from "@/lib/types";
import { MathToken } from "./MathToken";

// Інтерактивне рівняння: рядок токенів, частина з яких має підказки.
export function Equation({
  tokens,
  size = "lg",
}: {
  tokens: Token[];
  size?: "lg" | "md";
}) {
  return (
    <Tooltip.Provider delayDuration={100}>
      <div
        className={clsx(
          "flex flex-wrap items-center justify-center gap-x-0.5 gap-y-2 leading-none",
          size === "lg" ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl"
        )}
      >
        {tokens.map((t, i) => (
          <MathToken key={i} token={t} />
        ))}
      </div>
    </Tooltip.Provider>
  );
}
