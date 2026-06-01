# study

Матеріали з вищої математики (інтеграли) + інтерактивний застосунок-тренажер.

## Integral Trainer

Веб-застосунок для вивчення інтегралів: підказки на елементах формул і
покрокові рішення з перемоткою.

- Код: [`integral-trainer/`](integral-trainer/)
- Стек: Next.js + TypeScript + Tailwind + KaTeX
- Жива версія (після першого деплою): **https://VitaliyVa.github.io/study/**

### Локальний запуск

```bash
cd integral-trainer
npm install
npm run dev      # http://localhost:3000
```

### Як додавати контент

Правила створення методів, задач, кроків, підказок і формул (щоб тримати планку
навчання) — у [`integral-trainer/CONTENT_GUIDE.md`](integral-trainer/CONTENT_GUIDE.md).

### Деплой

Автоматичний через GitHub Actions ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml))
при кожному пуші в `main`. Статика будується (`output: export`) і публікується на GitHub Pages.

> Після першого пушу увімкни Pages: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

## Конспекти

- [`інтеграли_основи.md`](інтеграли_основи.md) — теорія від нуля до інтегрування частинами
- [`тренажер_сходинка2.md`](тренажер_сходинка2.md) — задачі на корені та від'ємні степені
