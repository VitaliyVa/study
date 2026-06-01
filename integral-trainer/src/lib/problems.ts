import type { Problem, Level } from "./types";

// Сходинки складності — план навчання
export const levels: Level[] = [
  { difficulty: 1, name: "Гола формула", summary: "Степенева функція xⁿ — одне правило в лоб" },
  { difficulty: 2, name: "Корені та дроби", summary: "Та сама формула, але спершу переписати у вигляді степеня" },
  { difficulty: 3, name: "Табличні функції", summary: "sin, cos, eˣ, 1/x — вивчити таблицю" },
  { difficulty: 4, name: "Заміна змінної", summary: "Поява «складної функції» всередині" },
  { difficulty: 5, name: "Інтегрування частинами", summary: "Коли під інтегралом добуток функцій" },
  { difficulty: 6, name: "Раціональні дроби", summary: "Розклад на простіші дроби" },
  { difficulty: 7, name: "Тригонометричні заміни", summary: "Найскладніше на 1 курсі" },
];

// Спільні підказки для повторюваних елементів
const hintIntegral = {
  term: "∫ — знак інтеграла",
  text: "Витягнута літера S («сума»). Означає: знайти первісну — функцію, похідна якої дорівнює тому, що стоїть під знаком.",
};
const hintDx = {
  term: "dx — змінна інтегрування",
  text: "Показує, ПО ЯКІЙ змінній інтегруємо. Тут — по x. Усе інше вважається сталим.",
};
const hintPlus = {
  term: "+ — сума під інтегралом",
  text: "Інтеграл суми = сумі інтегралів. Кожен доданок інтегруємо окремо.",
};

export const problems: Problem[] = [
  // ─────────────────────────── Сходинка 1 ───────────────────────────
  {
    id: "poly-6x4-3x2",
    title: "Інтеграл многочлена",
    difficulty: 1,
    problemTokens: [
      { latex: "\\int", hint: hintIntegral },
      { latex: "(" },
      {
        latex: "6x^4",
        hint: {
          term: "6x⁴ — степенева функція з коефіцієнтом",
          text: "6 — сталий множник (його можна винести наперед). x⁴ — степінь. Правило: степінь зросте на 1, а коефіцієнт поділимо на новий степінь.",
        },
      },
      { latex: "+", hint: hintPlus },
      {
        latex: "3x^2",
        hint: {
          term: "3x² — другий доданок",
          text: "Інтегруємо незалежно від першого. 3 виносимо, x² за тим самим правилом.",
        },
      },
      { latex: ")" },
      { latex: "dx", hint: hintDx },
    ],
    steps: [
      {
        title: "Розбиваємо суму",
        latex: "\\int (6x^4 + 3x^2)\\,dx = \\int 6x^4\\,dx + \\int 3x^2\\,dx",
        explanation: "Інтеграл суми = сума інтегралів. Кожен доданок беремо окремо.",
      },
      {
        title: "Виносимо коефіцієнти",
        latex: "= 6\\int x^4\\,dx + 3\\int x^2\\,dx",
        explanation: "Сталий множник можна винести за знак інтеграла — він не заважає інтегруванню.",
      },
      {
        title: "Застосовуємо формулу ∫xⁿdx = xⁿ⁺¹/(n+1)",
        latex: "= 6\\cdot\\frac{x^{5}}{5} + 3\\cdot\\frac{x^{3}}{3}",
        explanation: "Степінь зростає на 1 (x⁴→x⁵, x²→x³), ділимо на новий степінь.",
      },
      {
        title: "Спрощуємо",
        latex: "= \\frac{6}{5}x^{5} + x^{3} + C",
        explanation: "6 на 5 не ділиться націло → лишаємо дробом 6/5. А 3/3 = 1, тож просто x³. Не забуваємо + C.",
      },
      {
        title: "Перевірка похідною",
        latex: "\\left(\\tfrac{6}{5}x^5 + x^3 + C\\right)' = 6x^4 + 3x^2",
        explanation: "Беремо похідну відповіді — отримали підінтегральну функцію. Значить, усе вірно. Це золоте правило самоперевірки.",
      },
    ],
    answer: "\\frac{6}{5}x^{5} + x^{3} + C",
  },
  {
    id: "poly-2x3-5",
    title: "Многочлен зі сталою",
    difficulty: 1,
    problemTokens: [
      { latex: "\\int", hint: hintIntegral },
      { latex: "(" },
      {
        latex: "2x^3",
        hint: { term: "2x³", text: "Коефіцієнт 2 виносимо, x³ за степеневим правилом." },
      },
      { latex: "+", hint: hintPlus },
      {
        latex: "5",
        hint: {
          term: "5 — стала",
          text: "Сталу можна вважати 5·x⁰. Інтеграл сталої a — це a·x. Тобто ∫5 dx = 5x.",
        },
      },
      { latex: ")" },
      { latex: "dx", hint: hintDx },
    ],
    steps: [
      {
        title: "Розбиваємо суму",
        latex: "\\int (2x^3 + 5)\\,dx = \\int 2x^3\\,dx + \\int 5\\,dx",
        explanation: "Два доданки — два окремі інтеграли.",
      },
      {
        title: "Інтегруємо степінь",
        latex: "\\int 2x^3\\,dx = 2\\cdot\\frac{x^4}{4} = \\frac{x^4}{2}",
        explanation: "x³→x⁴, ділимо на 4. 2/4 скорочується до 1/2.",
      },
      {
        title: "Інтегруємо сталу",
        latex: "\\int 5\\,dx = 5x",
        explanation: "Інтеграл сталої — це стала, помножена на x.",
      },
      {
        title: "Збираємо відповідь",
        latex: "= \\frac{x^4}{2} + 5x + C",
        explanation: "Додаємо + C.",
      },
    ],
    answer: "\\frac{x^4}{2} + 5x + C",
  },

  // ─────────────────────────── Сходинка 2 ───────────────────────────
  {
    id: "sqrt-x",
    title: "Інтеграл кореня",
    difficulty: 2,
    problemTokens: [
      { latex: "\\int", hint: hintIntegral },
      {
        latex: "\\sqrt{x}",
        hint: {
          term: "√x — це степінь!",
          text: "Корінь треба переписати як степінь: √x = x^(1/2). Тоді працює звичайна формула.",
        },
      },
      { latex: "dx", hint: hintDx },
    ],
    steps: [
      {
        title: "Переписуємо корінь як степінь",
        latex: "\\int \\sqrt{x}\\,dx = \\int x^{1/2}\\,dx",
        explanation: "Головний трюк сходинки 2: √x = x^(1/2). Далі — звичайне степеневе правило.",
      },
      {
        title: "Додаємо 1 до степеня",
        latex: "\\tfrac{1}{2} + 1 = \\tfrac{3}{2}",
        explanation: "Новий степінь — 3/2.",
      },
      {
        title: "Ділимо на новий степінь",
        latex: "\\int x^{1/2}\\,dx = \\frac{x^{3/2}}{3/2} + C = \\frac{2}{3}x^{3/2} + C",
        explanation: "Ділення на 3/2 = множення на 2/3. Це місце, де найчастіше помиляються — не переплутай напрям!",
      },
      {
        title: "Повертаємось до кореня (за бажанням)",
        latex: "= \\frac{2}{3}x\\sqrt{x} + C",
        explanation: "x^(3/2) = x·x^(1/2) = x·√x. Можна лишити і в степеневому вигляді.",
      },
    ],
    answer: "\\frac{2}{3}x^{3/2} + C",
  },
  {
    id: "x2-plus-inv-sqrt",
    title: "Сума: степінь + обернений корінь",
    difficulty: 2,
    problemTokens: [
      { latex: "\\int", hint: hintIntegral },
      { latex: "(" },
      { latex: "x^2", hint: { term: "x²", text: "Звичайний степінь — за основною формулою." } },
      { latex: "+", hint: hintPlus },
      {
        latex: "\\frac{1}{\\sqrt{x}}",
        hint: {
          term: "1/√x — від'ємний дробовий степінь",
          text: "1/√x = x^(−1/2). Дріб і корінь разом — переписуємо в один степінь.",
        },
      },
      { latex: ")" },
      { latex: "dx", hint: hintDx },
    ],
    steps: [
      {
        title: "Переписуємо все як степені",
        latex: "\\int\\left(x^2 + \\tfrac{1}{\\sqrt{x}}\\right)dx = \\int\\left(x^2 + x^{-1/2}\\right)dx",
        explanation: "1/√x = x^(−1/2). Тепер обидва доданки — степені x.",
      },
      {
        title: "Інтегруємо перший доданок",
        latex: "\\int x^2\\,dx = \\frac{x^3}{3}",
        explanation: "x²→x³, ділимо на 3.",
      },
      {
        title: "Інтегруємо другий доданок",
        latex: "\\int x^{-1/2}\\,dx = \\frac{x^{1/2}}{1/2} = 2\\sqrt{x}",
        explanation: "−1/2 + 1 = 1/2. Ділення на 1/2 = множення на 2. x^(1/2) = √x.",
      },
      {
        title: "Збираємо відповідь",
        latex: "= \\frac{x^3}{3} + 2\\sqrt{x} + C",
        explanation: "Додаємо + C.",
      },
    ],
    answer: "\\frac{x^3}{3} + 2\\sqrt{x} + C",
  },
  {
    id: "inv-x",
    title: "Пастка: 1/x",
    difficulty: 2,
    problemTokens: [
      { latex: "\\int", hint: hintIntegral },
      {
        latex: "\\frac{1}{x}",
        hint: {
          term: "1/x — ВИНЯТОК!",
          text: "1/x = x^(−1). Якби застосували формулу, вийшло б ділення на (−1+1)=0. Тому для цього випадку окрема формула: відповідь ln|x|.",
        },
      },
      { latex: "dx", hint: hintDx },
    ],
    steps: [
      {
        title: "Чому формула НЕ працює",
        latex: "\\int x^{-1}\\,dx \\;\\neq\\; \\frac{x^{0}}{0}",
        explanation: "1/x = x^(−1). Новий степінь був би −1+1 = 0, а ділити на 0 не можна. Тут потрібен інший інструмент.",
      },
      {
        title: "Застосовуємо спеціальну формулу",
        latex: "\\int \\frac{1}{x}\\,dx = \\ln|x| + C",
        explanation: "Це табличний результат, його треба просто запам'ятати. Модуль |x| — бо логарифм визначений лише для додатних чисел.",
      },
    ],
    answer: "\\ln|x| + C",
  },

  // ─────────────────────────── Сходинка 3 ───────────────────────────
  {
    id: "sin-x",
    title: "Інтеграл синуса",
    difficulty: 3,
    problemTokens: [
      { latex: "\\int", hint: hintIntegral },
      {
        latex: "\\sin x",
        hint: {
          term: "sin x — таблична функція",
          text: "Тут немає степеневого правила. Згадуємо: похідна (−cos x)′ = sin x. Отже первісна синуса — це −cos x.",
        },
      },
      { latex: "dx", hint: hintDx },
    ],
    steps: [
      {
        title: "Згадуємо обернену похідну",
        latex: "(\\cos x)' = -\\sin x \\;\\Rightarrow\\; (-\\cos x)' = \\sin x",
        explanation: "Інтеграл — це зворотна операція до похідної. Шукаємо функцію, похідна якої = sin x.",
      },
      {
        title: "Записуємо результат",
        latex: "\\int \\sin x\\,dx = -\\cos x + C",
        explanation: "Увага на знак мінус — на ньому масово помиляються. ∫sin = −cos, а ∫cos = +sin.",
      },
    ],
    answer: "-\\cos x + C",
  },
  {
    id: "exp-plus-cos",
    title: "Сума: eˣ + cos x",
    difficulty: 3,
    problemTokens: [
      { latex: "\\int", hint: hintIntegral },
      { latex: "(" },
      {
        latex: "e^x",
        hint: { term: "eˣ — унікальна функція", text: "Похідна й інтеграл eˣ — це сам eˣ. Найприємніший випадок." },
      },
      { latex: "+", hint: hintPlus },
      {
        latex: "\\cos x",
        hint: { term: "cos x", text: "∫cos x dx = sin x (без мінуса). Не плутай із синусом." },
      },
      { latex: ")" },
      { latex: "dx", hint: hintDx },
    ],
    steps: [
      {
        title: "Розбиваємо суму",
        latex: "\\int (e^x + \\cos x)\\,dx = \\int e^x\\,dx + \\int \\cos x\\,dx",
        explanation: "Дві табличні функції — інтегруємо окремо.",
      },
      {
        title: "Інтеграл eˣ",
        latex: "\\int e^x\\,dx = e^x",
        explanation: "eˣ інтегрується сам у себе.",
      },
      {
        title: "Інтеграл cos x",
        latex: "\\int \\cos x\\,dx = \\sin x",
        explanation: "∫cos = +sin (без мінуса!).",
      },
      {
        title: "Збираємо відповідь",
        latex: "= e^x + \\sin x + C",
        explanation: "Додаємо + C.",
      },
    ],
    answer: "e^x + \\sin x + C",
  },
];

export function getProblem(id: string): Problem | undefined {
  return problems.find((p) => p.id === id);
}

export function problemsByDifficulty(d: number): Problem[] {
  return problems.filter((p) => p.difficulty === d);
}
