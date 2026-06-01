import { AlertTriangle } from "lucide-react";

// Рендерить **жирний** текст усередині рядка
function renderBold(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-semibold text-foreground">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export function Pitfalls({ items }: { items: string[] }) {
  if (!items.length) return null;
  return (
    <div className="mt-6 rounded-xl border border-red-400/30 bg-red-400/5 p-4 sm:p-5">
      <p className="flex items-center gap-2 text-sm font-semibold text-red-300">
        <AlertTriangle className="h-4 w-4" />
        Типові помилки — не наступай на ці граблі
      </p>
      <ul className="mt-3 space-y-2">
        {items.map((it, i) => (
          <li key={i} className="flex gap-2 text-[15px] leading-relaxed text-foreground/85">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400/70" />
            <span>{renderBold(it)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
