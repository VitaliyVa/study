"use client";

// Простий прогрес у localStorage: множина id розв'язаних задач.
const KEY = "integral-trainer:solved";

export function getSolved(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(KEY);
    return new Set(raw ? (JSON.parse(raw) as string[]) : []);
  } catch {
    return new Set();
  }
}

export function isSolved(id: string): boolean {
  return getSolved().has(id);
}

export function markSolved(id: string) {
  if (typeof window === "undefined") return;
  const set = getSolved();
  if (set.has(id)) return;
  set.add(id);
  try {
    window.localStorage.setItem(KEY, JSON.stringify([...set]));
    // повідомляємо інші компоненти (дашборд) про зміну
    window.dispatchEvent(new Event("progress-updated"));
  } catch {
    /* ignore */
  }
}
