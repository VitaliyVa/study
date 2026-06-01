"use client";

import * as Tooltip from "@radix-ui/react-tooltip";
import type { Token } from "@/lib/types";
import { MathToken } from "./MathToken";

// Інтерактивне рівняння: рядок токенів, частина з яких має підказки.
export function Equation({ tokens }: { tokens: Token[] }) {
  return (
    <Tooltip.Provider>
      <div className="flex flex-wrap items-center justify-center gap-x-0.5 gap-y-2 text-3xl sm:text-4xl leading-none">
        {tokens.map((t, i) => (
          <MathToken key={i} token={t} />
        ))}
      </div>
    </Tooltip.Provider>
  );
}
