import clsx from "clsx";
import type { Difficulty } from "@/lib/types";

// Колір за складністю: зелений → жовтий → червоний
const palette: Record<number, string> = {
  1: "bg-success/15 text-success border-success/30",
  2: "bg-success/15 text-success border-success/30",
  3: "bg-warning/15 text-warning border-warning/30",
  4: "bg-warning/15 text-warning border-warning/30",
  5: "bg-orange-400/15 text-orange-300 border-orange-400/30",
  6: "bg-red-400/15 text-red-300 border-red-400/30",
  7: "bg-red-400/15 text-red-300 border-red-400/30",
};

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold",
        palette[difficulty]
      )}
    >
      {Array.from({ length: 7 }).map((_, idx) => (
        <span
          key={idx}
          className={clsx(
            "h-1 w-1 rounded-full",
            idx < difficulty ? "bg-current" : "bg-current/25"
          )}
        />
      ))}
      <span className="ml-1">рівень {difficulty}</span>
    </span>
  );
}
