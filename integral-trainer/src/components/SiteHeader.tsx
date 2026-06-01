import Link from "next/link";
import { Sigma, BookOpen } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-lg">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 sm:px-6 py-3">
        <Link href="/" className="group inline-flex items-center gap-2 font-semibold">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent-strong text-white shadow-md shadow-accent-strong/30 transition group-hover:scale-105">
            <Sigma className="h-5 w-5" />
          </span>
          <span>Integral Trainer</span>
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          <Link
            href="/"
            className="rounded-lg px-3 py-1.5 text-muted transition hover:bg-surface hover:text-foreground"
          >
            Задачі
          </Link>
          <Link
            href="/theory"
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-muted transition hover:bg-surface hover:text-foreground"
          >
            <BookOpen className="h-4 w-4" />
            Теорія
          </Link>
        </nav>
      </div>
    </header>
  );
}
