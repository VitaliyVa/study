"use client";

import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { isSolved } from "@/lib/progress";

// Галочка "розв'язано" на картці задачі (читає localStorage)
export function SolvedCheck({ id }: { id: string }) {
  const [solved, setSolved] = useState(false);

  useEffect(() => {
    const update = () => setSolved(isSolved(id));
    update();
    window.addEventListener("progress-updated", update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener("progress-updated", update);
      window.removeEventListener("storage", update);
    };
  }, [id]);

  if (!solved) return null;
  return (
    <span
      title="Розв'язано"
      className="inline-flex items-center gap-1 rounded-full bg-success/15 px-2 py-0.5 text-xs font-medium text-success"
    >
      <CheckCircle2 className="h-3.5 w-3.5" />
      розв&apos;язано
    </span>
  );
}
