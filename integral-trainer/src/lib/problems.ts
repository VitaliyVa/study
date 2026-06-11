import type { Problem, Level } from "./types";

// ── Рівні складності (тематичні сходинки, кожен difficulty унікальний) ──
export const levels: Level[] = [
  { difficulty: 1, name: "Зведення до табличного", summary: "Корінь/дріб переписуємо як степінь — і степеневе правило" },
  { difficulty: 2, name: "Лінійна заміна (t = ax + b)", summary: "Усередині лінійний вираз: заміна й ділення на коефіцієнт" },
  { difficulty: 3, name: "Заміна змінної", summary: "t = внутрішня функція, коли поряд стоїть її похідна" },
  { difficulty: 4, name: "Тригонометричні перетворення", summary: "Формули зниження степеня перед інтегруванням" },
  { difficulty: 5, name: "Інтегрування частинами", summary: "Добуток різних функцій: ∫u dv = u·v − ∫v du" },
  { difficulty: 6, name: "Корінь і квадратний тричлен", summary: "Повний квадрат → arcsin / arctan / ln" },
];

// ── Кольорове кодування (кольори тягнуться через усі кроки) ──
// co — число (коефіцієнт), бурштинове
// po — степінь (показник), зелене
export const COLOR_COEF = "#fbbf24";
export const COLOR_POW = "#34d399";
const co = (s: string) => `\\textcolor{${COLOR_COEF}}{${s}}`;
const po = (s: string) => `\\textcolor{${COLOR_POW}}{${s}}`;

// Спільні підказки для повторюваних елементів
const hintIntegral = {
  term: "∫ — знак інтеграла",
  text: "Витягнута літера S («сума»). Означає: знайди функцію, похідна якої дорівнює тому, що стоїть під знаком.",
};
const hintDx = {
  term: "dx — по якій змінній",
  text: "Показує, що інтегруємо по x. Усе інше вважаємо просто числами.",
};
const hintMinus = {
  term: "− — різниця",
  text: "Інтеграл різниці = різниця інтегралів. Кожен доданок беремо окремо.",
};
const hintC = {
  term: "+ C обов'язково",
  text: "Стала інтегрування. Без неї відповідь вважають неповною.",
};

export const problems: Problem[] = [
  // ═══════════════════════ Рівень 1 — зведення до табличного ═══════════════════════
  // 1.8  ∫ (2x³ − √x + 4)/√x dx
  {
    id: "poly-over-sqrt",
    title: "1.8 — дріб зі степенями й коренем",
    difficulty: 1,
    problemTokens: [
      { latex: "\\int", hint: hintIntegral },
      {
        latex: `\\frac{${co("2")}x^{${po("3")}} - \\sqrt{x} + ${co("4")}}{\\sqrt{x}}`,
        hint: {
          term: "дріб на √x",
          text: "Кожен доданок чисельника ділимо на √x окремо — корінь перетвориться на степінь.",
        },
      },
      { latex: "dx", hint: hintDx },
    ],
    steps: [
      {
        title: "Ділимо почленно на √x",
        tokens: [
          { latex: `\\frac{${co("2")}x^{${po("3")}}}{\\sqrt{x}}`, hint: { term: "перший доданок", text: "2x³ ділимо на √x." } },
          { latex: "-", hint: hintMinus },
          { latex: `\\frac{\\sqrt{x}}{\\sqrt{x}}`, hint: { term: "= 1", text: "√x поділити на √x дорівнює 1." } },
          { latex: "+" },
          { latex: `\\frac{${co("4")}}{\\sqrt{x}}`, hint: { term: "третій доданок", text: "4 ділимо на √x." } },
        ],
        explanation:
          "Дріб з сумою в чисельнику = сума дробів. Розбиваємо на три простіші частини, кожну ділимо на √x.",
        methodIds: ["linearity"],
        help: {
          plain: "Спільний знаменник дозволяє ділити чисельник почленно: (a−b+c)/d = a/d − b/d + c/d.",
          examples: [{ latex: "\\frac{a+b}{c} = \\frac{a}{c} + \\frac{b}{c}", note: "те саме правило" }],
        },
      },
      {
        title: "Переписуємо корені як степені",
        tokens: [
          { latex: `${co("2")}x^{${po("5/2")}}`, hint: { term: "x³/√x", text: "x³ : x^½ = x^(3−½) = x^(5/2). Ділиш степені з однаковою основою — показники віднімаєш." } },
          { latex: "-" },
          { latex: `${co("1")}`, hint: { term: "стала 1", text: "Середній доданок став просто одиницею." } },
          { latex: "+" },
          { latex: `${co("4")}x^{${po("-1/2")}}`, hint: { term: "4/√x", text: "1/√x = x^(−½): корінь у знаменнику дає мінус у показнику." } },
        ],
        explanation:
          "Корінь — це «півстепеня»: √x = x^½. А ділення степенів з тією самою основою = віднімання показників: x³ ÷ x^½ = x^(3−½) = x^(5/2). Дріб 1/√x — це той самий корінь, тільки внизу, тому показник стає мінусовим: x^(−½).",
        methodIds: ["rewrite"],
        help: {
          plain: "Два факти — і все стане на місце. 1) Корінь = степінь ½: √x = x^½ (бо щоб «зняти» корінь, його підносять у квадрат, а ½·2 = 1). 2) Ділиш однакові основи — показники віднімаєш: x³ ÷ x^½ = x^(3−½) = x^(5/2).",
          simpler: "Корінь ховає ½. «Поділити на» = «відняти показники». А якщо щось стоїть під дробом (1/√x) — це теж мінус: 1/x^½ = x^(−½). Більше нічого знати не треба.",
          numeric: [
            { latex: "\\frac{x^{3}}{x^{1/2}} = x^{3-1/2}", note: "віднімаємо показники" },
            { latex: "3 - \\tfrac12 = \\tfrac52", note: "отримали 5/2" },
            { latex: "\\frac{1}{x^{1/2}} = x^{-1/2}", note: "під дробом → мінус показник" },
          ],
          examples: [{ latex: "\\frac{1}{\\sqrt{x}} = x^{-1/2}", note: "корінь у знаменнику → мінус показник" }],
        },
      },
      {
        title: "Інтегруємо кожен степінь",
        tokens: [
          { latex: `${co("2")}\\cdot\\frac{x^{${po("7/2")}}}{${po("7/2")}}`, hint: { term: "x^(5/2) → x^(7/2)", text: "Показник +1: 5/2+1 = 7/2. Ділимо на 7/2." } },
          { latex: "-" },
          { latex: `x`, hint: { term: "∫1 dx", text: "Інтеграл сталої 1 дорівнює x." } },
          { latex: "+" },
          { latex: `${co("4")}\\cdot\\frac{x^{${po("1/2")}}}{${po("1/2")}}`, hint: { term: "x^(−½) → x^(½)", text: "Показник +1: −1/2+1 = 1/2. Ділимо на 1/2." } },
        ],
        explanation: "Степеневе правило ∫xⁿdx = xⁿ⁺¹/(n+1) для кожного доданка. Ділення на 1 дробу = множення на обернений.",
        methodIds: ["table"],
        help: {
          plain: "Те саме правило, що й для цілих степенів: показник +1, поділити на новий показник. Дроби в показнику нічого не змінюють.",
          numeric: [
            { latex: "\\int x^{5/2}\\,dx", note: "показник = 5/2" },
            { latex: "\\tfrac52 + 1 = \\tfrac72", note: "рух 1: +1" },
            { latex: "\\frac{x^{7/2}}{7/2} = \\tfrac27 x^{7/2}", note: "рух 2: ділимо на 7/2" },
          ],
          check: { question: "Чому дорівнює ∫x^(−½) dx?", answer: "2x^{1/2} + C" },
        },
      },
      {
        title: "Спрощуємо коефіцієнти",
        tokens: [
          { latex: `\\frac{${co("4")}}{${co("7")}}x^{${po("7/2")}}`, hint: { term: "2 : 7/2 = 4/7", text: "2 поділити на 7/2 = 2·2/7 = 4/7." } },
          { latex: "-" },
          { latex: `x` },
          { latex: "+" },
          { latex: `${co("8")}\\sqrt{x}`, hint: { term: "4 : 1/2 = 8", text: "4 поділити на 1/2 = 8, а x^½ = √x." } },
          { latex: "+" },
          { latex: "C", hint: hintC },
        ],
        explanation: "Ділення на дріб = множення на перевернутий: 2·(2/7) = 4/7, 4·2 = 8. Повертаємо √x і дописуємо + C.",
        help: {
          plain: "«Поділити на 7/2» = «помножити на 2/7». «Поділити на 1/2» = «помножити на 2». Звідси 4/7 і 8.",
          examples: [{ latex: "\\frac{4}{1/2} = 4\\cdot 2 = 8", note: "ділення на половину подвоює" }],
        },
      },
      {
        title: "Перевірка похідною",
        tokens: [
          { latex: `\\left(\\tfrac{${co("4")}}{${co("7")}}x^{${po("7/2")}} - x + ${co("8")}\\sqrt{x} + C\\right)'`, hint: { term: "беремо похідну", text: "Похідна — зворотна дія до інтеграла." } },
          { latex: "=" },
          { latex: `${co("2")}x^{${po("5/2")}} - ${co("1")} + ${co("4")}x^{${po("-1/2")}}`, hint: { term: "= підінтегральна", text: "Це і є (2x³−√x+4)/√x після почленного ділення." } },
        ],
        explanation: "Похідна відповіді збіглася з підінтегральною функцією — рішення правильне.",
        methodIds: ["verify"],
        help: {
          plain: "(4/7·x^{7/2})′ = 4/7·7/2·x^{5/2} = 2x^{5/2}. (8√x)′ = 8·1/(2√x) = 4x^{−1/2}. Усе сходиться.",
        },
      },
    ],
    answer: `\\frac{${co("4")}}{${co("7")}}x^{${po("7/2")}} - x + ${co("8")}\\sqrt{x} + C`,
    methodIds: ["linearity", "rewrite", "table", "verify"],
    pitfalls: [
      "Спроба інтегрувати дріб «цілком» — спершу **почленно поділи** на √x.",
      "При діленні степенів показники **віднімаються** (x³/√x = x^{5/2}), а не діляться.",
      "Забути, що середній доданок дає **просто x**, а не зникає.",
      "Загубити **+ C**.",
    ],
  },

  // ═══════════════════════ Рівень 2 — лінійна заміна t = ax + b ═══════════════════════
  // 2.8  ∫ √(5 − 4x) dx
  {
    id: "sqrt-5-4x",
    title: "2.8 — корінь з лінійного виразу",
    difficulty: 2,
    problemTokens: [
      { latex: "\\int", hint: hintIntegral },
      {
        latex: `\\sqrt{${co("5")} - ${co("4")}x}`,
        hint: { term: "√(5−4x)", text: "Під коренем лінійний вираз 5−4x. Це сигнал до заміни t = 5−4x." },
      },
      { latex: "dx", hint: hintDx },
    ],
    steps: [
      {
        title: "Вводимо заміну t = 5 − 4x",
        tokens: [
          { latex: `t = ${co("5")} - ${co("4")}x`, hint: { term: "нова змінна", text: "Позначаємо весь вираз під коренем буквою t." } },
          { latex: "\\Rightarrow" },
          { latex: `dt = -${co("4")}\\,dx`, hint: { term: "диференціал", text: "Похідна t по x дорівнює −4, тому dt = −4 dx." } },
          { latex: "\\Rightarrow" },
          { latex: `dx = -\\tfrac{${co("1")}}{${co("4")}}\\,dt`, hint: { term: "виражаємо dx", text: "Звідси dx = −dt/4." } },
        ],
        explanation: "Внутрішній лінійний вираз позначаємо t. Знаходимо dt = (t)′dx = −4 dx і виражаємо dx.",
        methodIds: ["substitution"],
        help: {
          plain: "Ідея заміни: складне «всередині» назвати однією буквою t, щоб інтеграл став табличним. Обов'язково перерахуй dx через dt.",
          simpler: "t — це просто нове ім'я для виразу під коренем. Щоб інтеграл «заговорив» мовою t, треба й dx перекласти: dx = −dt/4.",
          examples: [{ latex: "t = ax+b \\Rightarrow dt = a\\,dx", note: "для лінійного завжди так" }],
          check: { question: "Якщо t = 3 − 2x, чому дорівнює dx?", answer: "-\\tfrac12\\,dt" },
        },
      },
      {
        title: "Переписуємо інтеграл через t",
        tokens: [
          { latex: `\\int \\sqrt{t}\\cdot\\left(-\\tfrac{${co("1")}}{${co("4")}}\\right)dt` },
          { latex: "=" },
          { latex: `-\\tfrac{${co("1")}}{${co("4")}}\\int t^{${po("1/2")}}\\,dt`, hint: { term: "число наперед", text: "−1/4 виносимо за знак, √t = t^{1/2}." } },
        ],
        explanation: "Замість √(5−4x) тепер √t, а dx замінили на −dt/4. Сталу виносимо наперед, корінь пишемо як степінь.",
        methodIds: ["linearity", "rewrite"],
      },
      {
        title: "Інтегруємо за степеневим правилом",
        tokens: [
          { latex: `-\\tfrac{${co("1")}}{${co("4")}}\\cdot\\frac{t^{${po("3/2")}}}{${po("3/2")}}`, hint: { term: "t^{1/2} → t^{3/2}", text: "Показник +1: 1/2+1 = 3/2, ділимо на 3/2." } },
          { latex: "=" },
          { latex: `-\\tfrac{${co("1")}}{${co("6")}}t^{${po("3/2")}}`, hint: { term: "−1/4 · 2/3", text: "1/4 · 2/3 = 2/12 = 1/6." } },
        ],
        explanation: "∫t^{1/2}dt = t^{3/2}/(3/2) = (2/3)t^{3/2}. Множимо на −1/4: отримуємо −1/6.",
        methodIds: ["table"],
        help: {
          plain: "Степеневе правило для t таке саме, як для x. Потім перемножуємо числа: 1/4 · 2/3 = 1/6.",
          numeric: [
            { latex: "\\tfrac12 + 1 = \\tfrac32", note: "новий показник" },
            { latex: "\\tfrac14\\cdot\\tfrac23 = \\tfrac16", note: "перемноження коефіцієнтів" },
          ],
        },
      },
      {
        title: "Повертаємось до x і перевіряємо",
        tokens: [
          { latex: `-\\tfrac{${co("1")}}{${co("6")}}(${co("5")}-${co("4")}x)^{${po("3/2")}} + C`, hint: { term: "назад t = 5−4x", text: "Підставляємо назад вираз для t." } },
          { latex: "\\xrightarrow{(\\,)'}" },
          { latex: `\\sqrt{${co("5")}-${co("4")}x}`, hint: { term: "= підінтегральна", text: "Похідна вертає корінь — рішення правильне." } },
        ],
        explanation: "Замінюємо t назад на 5−4x. Перевірка: похідна дає −1/6·3/2·(−4)·(5−4x)^{1/2} = (5−4x)^{1/2}. ✓",
        methodIds: ["verify"],
      },
    ],
    answer: `-\\frac{${co("1")}}{${co("6")}}(${co("5")}-${co("4")}x)^{${po("3/2")}} + C`,
    methodIds: ["substitution", "table", "verify"],
    pitfalls: [
      "Забути **поділити на коефіцієнт** при x: −4 у dt дає множник −1/4.",
      "Втратити **знак мінус** від dt = −4 dx.",
      "Не повернутись від t **назад до x** у кінці.",
    ],
  },

  // 3.8  ∫ 1/(9 + 7x) dx
  {
    id: "one-over-9-7x",
    title: "3.8 — дріб 1/(лінійний)",
    difficulty: 2,
    problemTokens: [
      { latex: "\\int", hint: hintIntegral },
      {
        latex: `\\frac{${co("1")}}{${co("9")} + ${co("7")}x}`,
        hint: { term: "1/(9+7x)", text: "Дріб 1/(лінійний вираз) → інтеграл буде логарифмом. Заміна t = 9+7x." },
      },
      { latex: "dx", hint: hintDx },
    ],
    steps: [
      {
        title: "Заміна t = 9 + 7x",
        tokens: [
          { latex: `t = ${co("9")} + ${co("7")}x` },
          { latex: "\\Rightarrow" },
          { latex: `dt = ${co("7")}\\,dx` },
          { latex: "\\Rightarrow" },
          { latex: `dx = \\tfrac{${co("1")}}{${co("7")}}\\,dt`, hint: { term: "dx через dt", text: "Похідна 9+7x дорівнює 7, тому dx = dt/7." } },
        ],
        explanation: "Знаменник позначаємо t, знаходимо dt = 7 dx, виражаємо dx = dt/7.",
        methodIds: ["substitution"],
      },
      {
        title: "Переписуємо через t",
        tokens: [
          { latex: `\\int \\frac{${co("1")}}{t}\\cdot\\tfrac{${co("1")}}{${co("7")}}\\,dt` },
          { latex: "=" },
          { latex: `\\tfrac{${co("1")}}{${co("7")}}\\int \\frac{${co("1")}}{t}\\,dt`, hint: { term: "1/7 наперед", text: "Сталий множник виносимо за інтеграл." } },
        ],
        explanation: "Знаменник став t, dx = dt/7. Виносимо 1/7 наперед — лишається табличний ∫dt/t.",
        methodIds: ["linearity"],
      },
      {
        title: "Табличний інтеграл 1/t",
        tokens: [
          { latex: `\\tfrac{${co("1")}}{${co("7")}}\\ln|t|`, hint: { term: "∫dt/t = ln|t|", text: "Це окрема таблична формула: первісна 1/t — натуральний логарифм." } },
          { latex: "=" },
          { latex: `\\tfrac{${co("1")}}{${co("7")}}\\ln|${co("9")}+${co("7")}x| + C`, hint: { term: "назад t", text: "Підставляємо t = 9+7x." } },
        ],
        explanation: "∫dt/t = ln|t| + C — окрема формула таблиці (степеневе правило тут не працює, бо показник був би −1+1 = 0).",
        methodIds: ["table"],
        help: {
          plain: "Чому логарифм, а не степінь? Бо для 1/t = t^{−1} степеневе правило дало б ділення на нуль (−1+1=0). Тому для 1/t — окрема формула: ln|t|.",
          examples: [{ latex: "\\int \\frac{dt}{t} = \\ln|t| + C", note: "єдиний виняток зі степеневого правила" }],
          check: { question: "Чому дорівнює ∫1/x dx?", answer: "\\ln|x| + C" },
        },
      },
      {
        title: "Перевірка похідною",
        tokens: [
          { latex: `\\left(\\tfrac{${co("1")}}{${co("7")}}\\ln|${co("9")}+${co("7")}x|\\right)'` },
          { latex: "=" },
          { latex: `\\tfrac{${co("1")}}{${co("7")}}\\cdot\\frac{${co("7")}}{${co("9")}+${co("7")}x} = \\frac{${co("1")}}{${co("9")}+${co("7")}x}`, hint: { term: "= підінтегральна", text: "Похідна логарифма дає 1/(9+7x). ✓" } },
        ],
        explanation: "(ln|9+7x|)′ = 7/(9+7x) за правилом складної функції; 1/7 скорочує сімку. Збіглося.",
        methodIds: ["verify"],
      },
    ],
    answer: `\\frac{${co("1")}}{${co("7")}}\\ln|${co("9")}+${co("7")}x| + C`,
    methodIds: ["substitution", "table", "verify"],
    pitfalls: [
      "Спокуса застосувати степеневе правило до 1/(9+7x) — для **1/(лінійний)** відповідь логарифм.",
      "Забути множник **1/7** (ділення на коефіцієнт при x).",
      "Загубити **модуль** під логарифмом: ln|…|.",
    ],
  },

  // 4.8  ∫ cos(3 − 4x) dx
  {
    id: "cos-3-4x",
    title: "4.8 — косинус від лінійного",
    difficulty: 2,
    problemTokens: [
      { latex: "\\int", hint: hintIntegral },
      {
        latex: `\\cos(${co("3")} - ${co("4")}x)`,
        hint: { term: "cos(3−4x)", text: "Усередині косинуса лінійний вираз. Заміна t = 3−4x зведе до табличного ∫cos t dt." },
      },
      { latex: "dx", hint: hintDx },
    ],
    steps: [
      {
        title: "Заміна t = 3 − 4x",
        tokens: [
          { latex: `t = ${co("3")} - ${co("4")}x` },
          { latex: "\\Rightarrow" },
          { latex: `dt = -${co("4")}\\,dx` },
          { latex: "\\Rightarrow" },
          { latex: `dx = -\\tfrac{${co("1")}}{${co("4")}}\\,dt`, hint: { term: "dx через dt", text: "Похідна 3−4x дорівнює −4." } },
        ],
        explanation: "Аргумент косинуса позначаємо t. dt = −4 dx, отже dx = −dt/4.",
        methodIds: ["substitution"],
      },
      {
        title: "Переписуємо через t",
        tokens: [
          { latex: `\\int \\cos t\\cdot\\left(-\\tfrac{${co("1")}}{${co("4")}}\\right)dt` },
          { latex: "=" },
          { latex: `-\\tfrac{${co("1")}}{${co("4")}}\\int \\cos t\\,dt`, hint: { term: "−1/4 наперед", text: "Сталу виносимо за знак інтеграла." } },
        ],
        explanation: "Замість cos(3−4x) тепер cos t, dx замінили на −dt/4.",
        methodIds: ["linearity"],
      },
      {
        title: "Табличний ∫cos t dt = sin t",
        tokens: [
          { latex: `-\\tfrac{${co("1")}}{${co("4")}}\\sin t`, hint: { term: "∫cos = sin", text: "Первісна косинуса — синус." } },
          { latex: "=" },
          { latex: `-\\tfrac{${co("1")}}{${co("4")}}\\sin(${co("3")}-${co("4")}x) + C`, hint: { term: "назад t", text: "Повертаємо t = 3−4x." } },
        ],
        explanation: "∫cos t dt = sin t + C. Підставляємо t назад.",
        methodIds: ["table"],
        help: {
          plain: "Дві сусідні формули таблиці: ∫cos t dt = sin t, ∫sin t dt = −cos t. Тут косинус → синус.",
          check: { question: "Чому дорівнює ∫sin t dt?", answer: "-\\cos t + C" },
        },
      },
      {
        title: "Перевірка похідною",
        tokens: [
          { latex: `\\left(-\\tfrac{${co("1")}}{${co("4")}}\\sin(${co("3")}-${co("4")}x)\\right)'` },
          { latex: "=" },
          { latex: `\\cos(${co("3")}-${co("4")}x)`, hint: { term: "= підінтегральна", text: "(sin u)′ = cos u · u′; (−1/4)·(−4) = 1. ✓" } },
        ],
        explanation: "Похідна синуса — косинус, помножений на похідну аргументу (−4). Мінуси й четвірки скорочуються.",
        methodIds: ["verify"],
      },
    ],
    answer: `-\\frac{${co("1")}}{${co("4")}}\\sin(${co("3")}-${co("4")}x) + C`,
    methodIds: ["substitution", "table", "verify"],
    pitfalls: [
      "Забути **поділити на −4** — найчастіша помилка з лінійним аргументом.",
      "Переплутати знак: ∫cos = +sin, але ∫sin = **−cos**.",
      "Не повернути t назад до 3−4x.",
    ],
  },

  // 6.8  ∫ e^(7x − 2) dx
  {
    id: "exp-7x-2",
    title: "6.8 — експонента від лінійного",
    difficulty: 2,
    problemTokens: [
      { latex: "\\int", hint: hintIntegral },
      {
        latex: `e^{${co("7")}x - ${co("2")}}`,
        hint: { term: "e^{7x−2}", text: "У показнику лінійний вираз. Заміна t = 7x−2 зведе до табличного ∫eᵗ dt." },
      },
      { latex: "dx", hint: hintDx },
    ],
    steps: [
      {
        title: "Заміна t = 7x − 2",
        tokens: [
          { latex: `t = ${co("7")}x - ${co("2")}` },
          { latex: "\\Rightarrow" },
          { latex: `dt = ${co("7")}\\,dx` },
          { latex: "\\Rightarrow" },
          { latex: `dx = \\tfrac{${co("1")}}{${co("7")}}\\,dt`, hint: { term: "dx через dt", text: "Похідна показника 7x−2 дорівнює 7." } },
        ],
        explanation: "Показник степеня позначаємо t. dt = 7 dx, отже dx = dt/7.",
        methodIds: ["substitution"],
      },
      {
        title: "Переписуємо через t",
        tokens: [
          { latex: `\\int e^{t}\\cdot\\tfrac{${co("1")}}{${co("7")}}\\,dt` },
          { latex: "=" },
          { latex: `\\tfrac{${co("1")}}{${co("7")}}\\int e^{t}\\,dt`, hint: { term: "1/7 наперед", text: "Сталу виносимо за знак." } },
        ],
        explanation: "Замість e^{7x−2} тепер eᵗ, dx = dt/7. Виносимо 1/7.",
        methodIds: ["linearity"],
      },
      {
        title: "Табличний ∫eᵗ dt = eᵗ",
        tokens: [
          { latex: `\\tfrac{${co("1")}}{${co("7")}}e^{t}`, hint: { term: "∫eᵗ = eᵗ", text: "Експонента — єдина функція, що дорівнює власній похідній і первісній." } },
          { latex: "=" },
          { latex: `\\tfrac{${co("1")}}{${co("7")}}e^{${co("7")}x-${co("2")}} + C`, hint: { term: "назад t", text: "Повертаємо t = 7x−2." } },
        ],
        explanation: "∫eᵗ dt = eᵗ + C. Підставляємо t назад.",
        methodIds: ["table"],
        help: {
          plain: "eᵗ — особлива: інтегрування й диференціювання її не змінюють. Тут лише з'являється множник 1/7 від заміни.",
          check: { question: "Чому дорівнює ∫e^{2x} dx?", answer: "\\tfrac12 e^{2x} + C" },
        },
      },
      {
        title: "Перевірка похідною",
        tokens: [
          { latex: `\\left(\\tfrac{${co("1")}}{${co("7")}}e^{${co("7")}x-${co("2")}}\\right)'` },
          { latex: "=" },
          { latex: `e^{${co("7")}x-${co("2")}}`, hint: { term: "= підінтегральна", text: "(e^{7x−2})′ = 7·e^{7x−2}; 1/7 скорочує сімку. ✓" } },
        ],
        explanation: "Похідна експоненти множиться на похідну показника (7), а 1/7 її гасить.",
        methodIds: ["verify"],
      },
    ],
    answer: `\\frac{${co("1")}}{${co("7")}}e^{${co("7")}x-${co("2")}} + C`,
    methodIds: ["substitution", "table", "verify"],
    pitfalls: [
      "Забути множник **1/7** (ділення на коефіцієнт при x у показнику).",
      "Думати, що показник «−2» якось змінюється — він просто переноситься в відповідь.",
      "Загубити **+ C**.",
    ],
  },

  // ═══════════════════════ Рівень 3 — заміна змінної (нелінійна) ═══════════════════════
  // 9.8  ∫ e^(3 − x²)·x dx
  {
    id: "x-exp-3-x2",
    title: "9.8 — множник = похідна показника",
    difficulty: 3,
    problemTokens: [
      { latex: "\\int", hint: hintIntegral },
      {
        latex: `e^{${co("3")} - x^{${po("2")}}}`,
        hint: { term: "e^{3−x²}", text: "У показнику нелінійний вираз 3−x². Поряд стоїть x — це майже його похідна." },
      },
      { latex: "x", hint: { term: "множник x", text: "Похідна 3−x² дорівнює −2x. Наявність x поряд робить заміну t = 3−x² можливою." } },
      { latex: "dx", hint: hintDx },
    ],
    steps: [
      {
        title: "Помічаємо: x — це майже похідна показника",
        tokens: [
          { latex: `t = ${co("3")} - x^{${po("2")}}`, hint: { term: "що беремо за t", text: "Внутрішню функцію показника." } },
          { latex: "\\Rightarrow" },
          { latex: `dt = -${co("2")}x\\,dx`, hint: { term: "ключ", text: "(3−x²)′ = −2x. Саме x і стоїть поряд — це знак, що заміна спрацює." } },
          { latex: "\\Rightarrow" },
          { latex: `x\\,dx = -\\tfrac{${co("1")}}{${co("2")}}\\,dt`, hint: { term: "виражаємо x dx", text: "Увесь блок x dx замінюється на −dt/2." } },
        ],
        explanation: "Заміна спрацьовує тоді, коли поряд із внутрішньою функцією стоїть її похідна (з точністю до числа). Тут (3−x²)′ = −2x, а x dx у нас є.",
        methodIds: ["substitution"],
        help: {
          plain: "Головна ідея: якщо бачиш «функцію від чогось» і поряд похідну цього «чогось» — бери це «щось» за t. Тоді x dx акуратно перетвориться на dt.",
          simpler: "Дивись на показник 3−x². Його похідна −2x. У прикладі стоїть x. Майже збіг — різниця лише в числі −2, його й «винесемо» через x dx = −dt/2.",
          numeric: [
            { latex: "(3-x^2)' = -2x", note: "похідна показника" },
            { latex: "x\\,dx = -\\tfrac12\\,dt", note: "виражаємо наявний блок" },
          ],
          check: { question: "Якщо t = x²+1, чому дорівнює x dx?", answer: "\\tfrac12\\,dt" },
        },
      },
      {
        title: "Переписуємо через t",
        tokens: [
          { latex: `\\int e^{t}\\cdot\\left(-\\tfrac{${co("1")}}{${co("2")}}\\right)dt` },
          { latex: "=" },
          { latex: `-\\tfrac{${co("1")}}{${co("2")}}\\int e^{t}\\,dt`, hint: { term: "−1/2 наперед", text: "Усе зайве пішло в число −1/2." } },
        ],
        explanation: "e^{3−x²} стало eᵗ, а x dx — це −dt/2. Інтеграл став суто табличним.",
        methodIds: ["linearity"],
      },
      {
        title: "Інтегруємо й повертаємось",
        tokens: [
          { latex: `-\\tfrac{${co("1")}}{${co("2")}}e^{t}`, hint: { term: "∫eᵗ = eᵗ", text: "Табличний інтеграл експоненти." } },
          { latex: "=" },
          { latex: `-\\tfrac{${co("1")}}{${co("2")}}e^{${co("3")}-x^{${po("2")}}} + C`, hint: { term: "назад t", text: "Повертаємо t = 3−x²." } },
        ],
        explanation: "∫eᵗ dt = eᵗ. Підставляємо t = 3−x² назад.",
        methodIds: ["table"],
      },
      {
        title: "Перевірка похідною",
        tokens: [
          { latex: `\\left(-\\tfrac{${co("1")}}{${co("2")}}e^{${co("3")}-x^{${po("2")}}}\\right)'` },
          { latex: "=" },
          { latex: `e^{${co("3")}-x^{${po("2")}}}\\,x`, hint: { term: "= підінтегральна", text: "(e^{3−x²})′ = e^{3−x²}·(−2x); −1/2·(−2x) = x. ✓" } },
        ],
        explanation: "Похідна показника −2x з множником −1/2 дає рівно x — підінтегральна функція відновилась.",
        methodIds: ["verify"],
      },
    ],
    answer: `-\\frac{${co("1")}}{${co("2")}}e^{${co("3")}-x^{${po("2")}}} + C`,
    methodIds: ["substitution", "table", "verify"],
    pitfalls: [
      "Не помітити, що **x поряд — це похідна показника**, і кинутись інтегрувати «в лоб».",
      "Помилитись зі знаком: (3−x²)′ = **−2x**, тому з'являється −1/2.",
      "Забути повернути t = 3−x².",
    ],
  },

  // 8.8  ∫ cos x/(3 − sin x) dx
  {
    id: "cos-over-3-sinx",
    title: "8.8 — у чисельнику похідна знаменника",
    difficulty: 3,
    problemTokens: [
      { latex: "\\int", hint: hintIntegral },
      {
        latex: `\\frac{\\cos(x)}{${co("3")} - \\sin(x)}`,
        hint: { term: "cos x / (3−sin x)", text: "Похідна знаменника (3−sin x)′ = −cos x — а в чисельнику саме cos x. Заміна t = 3−sin x." },
      },
      { latex: "dx", hint: hintDx },
    ],
    steps: [
      {
        title: "У чисельнику — похідна знаменника",
        tokens: [
          { latex: `t = ${co("3")} - \\sin(x)`, hint: { term: "беремо знаменник", text: "За t беремо знаменник." } },
          { latex: "\\Rightarrow" },
          { latex: `dt = -\\cos(x)\\,dx`, hint: { term: "ключ", text: "(3−sin x)′ = −cos x. Чисельник cos x dx = −dt." } },
          { latex: "\\Rightarrow" },
          { latex: `\\cos(x)\\,dx = -dt`, hint: { term: "виражаємо чисельник", text: "Увесь чисельник перетворюється на −dt." } },
        ],
        explanation: "Коли в чисельнику стоїть похідна знаменника — це прямий натяк на заміну t = знаменник. Тоді чисельник·dx = ±dt.",
        methodIds: ["substitution"],
        help: {
          plain: "Шаблон ∫(похідна знаменника)/(знаменник) dx завжди дає логарифм знаменника. Тут саме він, з мінусом від похідної синуса.",
          examples: [{ latex: "\\int \\frac{f'(x)}{f(x)}\\,dx = \\ln|f(x)| + C", note: "корисний шаблон" }],
          check: { question: "Якщо t = 3 − sin x, чому дорівнює cos x dx?", answer: "-dt" },
        },
      },
      {
        title: "Переписуємо через t",
        tokens: [
          { latex: `\\int \\frac{-dt}{t}` },
          { latex: "=" },
          { latex: `-\\int \\frac{${co("1")}}{t}\\,dt`, hint: { term: "−1 наперед", text: "Знак мінус виносимо за інтеграл." } },
        ],
        explanation: "Чисельник cos x dx = −dt, знаменник = t. Лишається табличний ∫dt/t зі знаком мінус.",
        methodIds: ["linearity"],
      },
      {
        title: "Інтегруємо й повертаємось",
        tokens: [
          { latex: `-\\ln|t|`, hint: { term: "∫dt/t = ln|t|", text: "Табличний логарифм." } },
          { latex: "=" },
          { latex: `-\\ln|${co("3")} - \\sin(x)| + C`, hint: { term: "назад t", text: "Підставляємо t = 3−sin x. Бо 3−sin x>0, модуль можна зняти." } },
        ],
        explanation: "∫dt/t = ln|t|. Оскільки 3−sin x завжди додатне (sin x ≤ 1 < 3), модуль не обов'язковий.",
        methodIds: ["table"],
      },
      {
        title: "Перевірка похідною",
        tokens: [
          { latex: `\\left(-\\ln(${co("3")}-\\sin(x))\\right)'` },
          { latex: "=" },
          { latex: `-\\frac{-\\cos(x)}{${co("3")}-\\sin(x)} = \\frac{\\cos(x)}{${co("3")}-\\sin(x)}`, hint: { term: "= підінтегральна", text: "Два мінуси дають плюс. ✓" } },
        ],
        explanation: "Похідна ln(3−sin x) = (−cos x)/(3−sin x); зовнішній мінус робить результат додатним.",
        methodIds: ["verify"],
      },
    ],
    answer: `-\\ln|${co("3")} - \\sin(x)| + C`,
    methodIds: ["substitution", "table", "verify"],
    pitfalls: [
      "Не побачити, що **чисельник = похідна знаменника** (шаблон f′/f).",
      "Загубити **мінус** від (sin x)′.",
      "Спробувати степеневе правило — для f′/f відповідь **логарифм**.",
    ],
  },

  // 7.8  ∫ 1/((x+1)(ln(x+1))²) dx
  {
    id: "one-over-x-ln2",
    title: "7.8 — заміна t = ln(x+1)",
    difficulty: 3,
    problemTokens: [
      { latex: "\\int", hint: hintIntegral },
      {
        latex: `\\frac{${co("1")}}{(x+1)\\,(\\ln(x+1))^{${po("2")}}}`,
        hint: { term: "1 / ((x+1)·ln²(x+1))", text: "(ln(x+1))′ = 1/(x+1) — а цей множник у знаменнику є. Заміна t = ln(x+1)." },
      },
      { latex: "dx", hint: hintDx },
    ],
    steps: [
      {
        title: "Помічаємо похідну логарифма",
        tokens: [
          { latex: `t = \\ln(x+1)`, hint: { term: "беремо логарифм", text: "За t — внутрішній логарифм." } },
          { latex: "\\Rightarrow" },
          { latex: `dt = \\frac{${co("1")}}{x+1}\\,dx`, hint: { term: "ключ", text: "(ln(x+1))′ = 1/(x+1). А множник 1/(x+1) у знаменнику якраз є." } },
        ],
        explanation: "Множник 1/(x+1) у знаменнику — це похідна ln(x+1). Тому заміна t = ln(x+1) поглинає і його, і dx.",
        methodIds: ["substitution"],
        help: {
          plain: "Дивись: у знаменнику два «куски» — (x+1) і ln²(x+1). Перший разом з dx дає dt, бо (ln(x+1))′ = 1/(x+1). Лишається тільки t².",
          numeric: [
            { latex: "(\\ln(x+1))' = \\tfrac{1}{x+1}", note: "похідна логарифма" },
            { latex: "\\tfrac{dx}{x+1} = dt", note: "цей блок = dt" },
          ],
          check: { question: "Якщо t = ln x, чому дорівнює dx/x?", answer: "dt" },
        },
      },
      {
        title: "Переписуємо через t",
        tokens: [
          { latex: `\\int \\frac{${co("1")}}{t^{${po("2")}}}\\,dt` },
          { latex: "=" },
          { latex: `\\int t^{${po("-2")}}\\,dt`, hint: { term: "1/t² = t^{−2}", text: "Дріб переписуємо як степінь з мінусом." } },
        ],
        explanation: "Блок dx/(x+1) = dt, а (ln(x+1))² = t². Лишається ∫dt/t² = ∫t^{−2}dt.",
        methodIds: ["rewrite"],
      },
      {
        title: "Степеневе правило й повернення",
        tokens: [
          { latex: `\\frac{t^{${po("-1")}}}{${po("-1")}}`, hint: { term: "t^{−2} → t^{−1}", text: "Показник +1: −2+1 = −1, ділимо на −1." } },
          { latex: "=" },
          { latex: `-\\frac{${co("1")}}{t} = -\\frac{${co("1")}}{\\ln(x+1)} + C`, hint: { term: "назад t", text: "t^{−1} = 1/t, потім t = ln(x+1)." } },
        ],
        explanation: "∫t^{−2}dt = t^{−1}/(−1) = −1/t. Підставляємо t = ln(x+1).",
        methodIds: ["table"],
      },
      {
        title: "Перевірка похідною",
        tokens: [
          { latex: `\\left(-\\frac{${co("1")}}{\\ln(x+1)}\\right)'` },
          { latex: "=" },
          { latex: `\\frac{${co("1")}}{(x+1)(\\ln(x+1))^{${po("2")}}}`, hint: { term: "= підінтегральна", text: "(−1/t)′ = 1/t²·t′, t′ = 1/(x+1). ✓" } },
        ],
        explanation: "Похідна −1/ln(x+1) = 1/(ln(x+1))² · 1/(x+1) — рівно підінтегральна функція.",
        methodIds: ["verify"],
      },
    ],
    answer: `-\\frac{${co("1")}}{\\ln(x+1)} + C`,
    methodIds: ["substitution", "table", "verify"],
    pitfalls: [
      "Не розпізнати, що **1/(x+1) — це похідна ln(x+1)** (без цього заміна не видно).",
      "При степеневому правилі для t^{−2}: новий показник **−1**, ділимо на −1 → знак мінус.",
      "Забути повернути t = ln(x+1).",
    ],
  },

  // ═══════════════════════ Рівень 4 — тригонометричні перетворення ═══════════════════════
  // 11.8  ∫ (cos x + 4)² dx
  {
    id: "cosx-plus-4-sq",
    title: "11.8 — квадрат суми з косинусом",
    difficulty: 4,
    problemTokens: [
      { latex: "\\int", hint: hintIntegral },
      {
        latex: `(\\cos(x) + ${co("4")})^{${po("2")}}`,
        hint: { term: "(cos x + 4)²", text: "Квадрат суми. Спершу розкриваємо, а cos²x зводимо формулою зниження степеня." },
      },
      { latex: "dx", hint: hintDx },
    ],
    steps: [
      {
        title: "Розкриваємо квадрат суми",
        tokens: [
          { latex: `\\cos^{${po("2")}}(x)`, hint: { term: "перший доданок", text: "Квадрат першого: cos²x." } },
          { latex: "+" },
          { latex: `${co("8")}\\cos(x)`, hint: { term: "подвоєний добуток", text: "2·cos x·4 = 8 cos x." } },
          { latex: "+" },
          { latex: `${co("16")}`, hint: { term: "квадрат другого", text: "4² = 16." } },
        ],
        explanation: "(a+b)² = a² + 2ab + b². Тут a = cos x, b = 4: cos²x + 8 cos x + 16.",
        methodIds: ["linearity"],
        help: {
          plain: "Спочатку просто розкриваємо дужки за формулою квадрата суми, ще не інтегруючи.",
          examples: [{ latex: "(a+b)^2 = a^2 + 2ab + b^2", note: "базова формула" }],
        },
      },
      {
        title: "Знижуємо степінь косинуса",
        tokens: [
          { latex: `\\cos^{${po("2")}}(x) = \\frac{${co("1")} + \\cos(${co("2")}x)}{${co("2")}}`, hint: { term: "формула зниження", text: "cos²x = (1+cos2x)/2 — інакше квадрат косинуса не табличний." } },
        ],
        explanation: "cos²x напряму не інтегрується. Формула зниження степеня cos²x = (1+cos2x)/2 робить його сумою сталої й косинуса подвійного кута.",
        methodIds: ["trig-identity"],
        help: {
          plain: "Квадрат синуса/косинуса завжди спершу «розгортають» цією формулою — інакше інтеграл не взяти елементарно.",
          simpler: "Запам'ятай пару: cos²x = (1+cos2x)/2, sin²x = (1−cos2x)/2. Різниця лише в знаку перед cos2x.",
          examples: [{ latex: "\\sin^2 x = \\frac{1-\\cos 2x}{2}", note: "сусідня формула" }],
          check: { question: "Чому дорівнює cos²x за формулою зниження?", answer: "\\frac{1+\\cos 2x}{2}" },
        },
      },
      {
        title: "Збираємо підінтегральну функцію",
        tokens: [
          { latex: `\\frac{${co("1")}}{${co("2")}} + \\frac{${co("1")}}{${co("2")}}\\cos(${co("2")}x) + ${co("8")}\\cos(x) + ${co("16")}` },
          { latex: "=" },
          { latex: `\\frac{${co("33")}}{${co("2")}} + \\frac{${co("1")}}{${co("2")}}\\cos(${co("2")}x) + ${co("8")}\\cos(x)`, hint: { term: "звели сталі", text: "1/2 + 16 = 33/2." } },
        ],
        explanation: "Підставили (1+cos2x)/2 і додали сталі: 1/2 + 16 = 33/2. Тепер усе — табличне.",
        methodIds: ["linearity"],
      },
      {
        title: "Інтегруємо кожен доданок",
        tokens: [
          { latex: `\\frac{${co("33")}}{${co("2")}}x`, hint: { term: "∫стала", text: "∫(33/2)dx = 33/2·x." } },
          { latex: "+" },
          { latex: `\\frac{${co("1")}}{${co("4")}}\\sin(${co("2")}x)`, hint: { term: "∫cos2x", text: "∫cos2x dx = sin2x/2, з множником 1/2 → 1/4." } },
          { latex: "+" },
          { latex: `${co("8")}\\sin(x)`, hint: { term: "∫cos x", text: "∫cos x dx = sin x." } },
          { latex: "+" },
          { latex: "C", hint: hintC },
        ],
        explanation: "∫(33/2)dx = 33x/2; ∫cos2x dx = (1/2)sin2x (лінійна заміна), тож (1/2)·(1/2) = 1/4; ∫cos x dx = sin x.",
        methodIds: ["table"],
      },
      {
        title: "Перевірка похідною",
        tokens: [
          { latex: `\\left(\\tfrac{${co("33")}}{${co("2")}}x + \\tfrac{${co("1")}}{${co("4")}}\\sin(${co("2")}x) + ${co("8")}\\sin(x)\\right)'` },
          { latex: "=" },
          { latex: `(\\cos(x)+${co("4")})^{${po("2")}}`, hint: { term: "= підінтегральна", text: "33/2 + (1/2)cos2x + 8cos x = cos²x + 8cos x + 16. ✓" } },
        ],
        explanation: "Похідна: 33/2 + (1/4)·2cos2x + 8cos x = 33/2 + (1/2)cos2x + 8cos x, а це знову (cos x+4)².",
        methodIds: ["verify"],
      },
    ],
    answer: `\\frac{${co("33")}}{${co("2")}}x + \\frac{${co("1")}}{${co("4")}}\\sin(${co("2")}x) + ${co("8")}\\sin(x) + C`,
    methodIds: ["trig-identity", "linearity", "table", "verify"],
    pitfalls: [
      "Інтегрувати cos²x «як є» — спершу **формула зниження** cos²x = (1+cos2x)/2.",
      "Забути **подвоєний добуток** 2·cos x·4 = 8 cos x при розкритті квадрата.",
      "У ∫cos2x загубити множник **1/2** від лінійної заміни.",
    ],
  },

  // ═══════════════════════ Рівень 5 — інтегрування частинами ═══════════════════════
  // 12.8  ∫ (x − 3)·cos x dx
  {
    id: "x-3-cosx",
    title: "12.8 — добуток многочлена й косинуса",
    difficulty: 5,
    problemTokens: [
      { latex: "\\int", hint: hintIntegral },
      { latex: "(", },
      { latex: `x - ${co("3")}`, hint: { term: "x − 3", text: "Многочлен — його зручно диференціювати (стане 1). Це наш u." } },
      { latex: ")" },
      { latex: `\\cos(x)`, hint: { term: "cos x", text: "Косинус легко інтегрується. Це наш dv." } },
      { latex: "dx", hint: hintDx },
    ],
    steps: [
      {
        title: "Обираємо u та dv (правило LIATE)",
        tokens: [
          { latex: `u = x - ${co("3")}`, hint: { term: "u — що диференціюємо", text: "Многочлен: його похідна простіша (du = dx)." } },
          { latex: `du = dx` },
          { latex: `dv = \\cos(x)\\,dx`, hint: { term: "dv — що інтегруємо", text: "Косинус інтегрується легко." } },
          { latex: `v = \\sin(x)`, hint: { term: "v = ∫dv", text: "∫cos x dx = sin x." } },
        ],
        explanation: "За u беремо те, що спрощується похідною (многочлен x−3), за dv — решту (cos x dx). Знаходимо du і v.",
        methodIds: ["by-parts"],
        help: {
          plain: "Інтегрування частинами для добутку «многочлен × тригонометрія»: многочлен у u (бо похідна його спрощує), тригонометрію у dv.",
          simpler: "Правило LIATE підказує порядок вибору u: Логарифм, Обернені, Алгебра(многочлен), Тригонометрія, Експонента. Тут із пари бере той, що раніше — многочлен x−3.",
          examples: [{ latex: "\\int u\\,dv = uv - \\int v\\,du", note: "сама формула частинами" }],
          check: { question: "Що взяти за u в ∫x·sin x dx?", answer: "u = x" },
        },
      },
      {
        title: "Підставляємо у формулу ∫u dv = uv − ∫v du",
        tokens: [
          { latex: `(x-${co("3")})\\sin(x)`, hint: { term: "u·v", text: "(x−3)·sin x." } },
          { latex: "-" },
          { latex: `\\int \\sin(x)\\,dx`, hint: { term: "∫v du", text: "∫sin x · dx — лишився простий інтеграл." } },
        ],
        explanation: "uv − ∫v du = (x−3)sin x − ∫sin x dx. Новий інтеграл простіший за початковий — у цьому суть методу.",
        methodIds: ["by-parts"],
      },
      {
        title: "Беремо залишковий інтеграл",
        tokens: [
          { latex: `(x-${co("3")})\\sin(x)`, },
          { latex: "-" },
          { latex: `(-\\cos(x))`, hint: { term: "∫sin = −cos", text: "∫sin x dx = −cos x." } },
          { latex: "=" },
          { latex: `(x-${co("3")})\\sin(x) + \\cos(x) + C`, hint: { term: "два мінуси → плюс", text: "−(−cos x) = +cos x." } },
        ],
        explanation: "∫sin x dx = −cos x. Мінус перед інтегралом і мінус косинуса дають +cos x.",
        methodIds: ["table"],
      },
      {
        title: "Перевірка похідною",
        tokens: [
          { latex: `\\left((x-${co("3")})\\sin(x) + \\cos(x)\\right)'` },
          { latex: "=" },
          { latex: `(x-${co("3")})\\cos(x)`, hint: { term: "= підінтегральна", text: "sin x + (x−3)cos x − sin x = (x−3)cos x. ✓" } },
        ],
        explanation: "Похідна добутку: sin x + (x−3)cos x, мінус sin x від cos x. Синуси скорочуються — лишається (x−3)cos x.",
        methodIds: ["verify"],
      },
    ],
    answer: `(x-${co("3")})\\sin(x) + \\cos(x) + C`,
    methodIds: ["by-parts", "table", "verify"],
    pitfalls: [
      "Переплутати u і dv: за **u — многочлен** (спрощується похідною), за dv — косинус.",
      "У формулі загубити **мінус** перед ∫v du.",
      "∫sin x dx = **−cos x** (знак!), тому в відповіді +cos x.",
    ],
  },

  // 13.8  ∫ ln(x + 3) dx
  {
    id: "ln-x-3",
    title: "13.8 — логарифм частинами",
    difficulty: 5,
    problemTokens: [
      { latex: "\\int", hint: hintIntegral },
      {
        latex: `\\ln(x + ${co("3")})`,
        hint: { term: "ln(x+3)", text: "Логарифм окремо береться частинами: u = ln(x+3), dv = dx." },
      },
      { latex: "dx", hint: hintDx },
    ],
    steps: [
      {
        title: "Обираємо u = ln(x+3), dv = dx",
        tokens: [
          { latex: `u = \\ln(x+${co("3")})`, hint: { term: "u — логарифм", text: "Логарифм у u: його похідна — проста дробова функція." } },
          { latex: `du = \\frac{${co("1")}}{x+${co("3")}}\\,dx` },
          { latex: `dv = dx` },
          { latex: `v = x`, hint: { term: "v = ∫dx", text: "∫dx = x." } },
        ],
        explanation: "Хоч множника й не видно, ln береться частинами проти dv = dx. Похідна логарифма = 1/(x+3).",
        methodIds: ["by-parts"],
        help: {
          plain: "Трюк: ln(x+3) = ln(x+3)·1. За u — логарифм (бо diff його спрощує), за dv — одиниця, тобто dx.",
          simpler: "Сам логарифм не табличний для інтеграла, зате його похідна — проста. Тому ставимо його в u, а dv = dx дає v = x.",
          examples: [{ latex: "\\int \\ln x\\,dx = x\\ln x - x + C", note: "класичний приклад того ж прийому" }],
          check: { question: "Чому дорівнює (ln(x+3))′?", answer: "\\frac{1}{x+3}" },
        },
      },
      {
        title: "Підставляємо у формулу частинами",
        tokens: [
          { latex: `x\\ln(x+${co("3")})`, hint: { term: "u·v", text: "x·ln(x+3)." } },
          { latex: "-" },
          { latex: `\\int \\frac{x}{x+${co("3")}}\\,dx`, hint: { term: "∫v du", text: "∫x·1/(x+3) dx." } },
        ],
        explanation: "uv − ∫v du = x·ln(x+3) − ∫x/(x+3) dx. Лишився раціональний інтеграл.",
        methodIds: ["by-parts"],
      },
      {
        title: "Спрощуємо дріб x/(x+3)",
        tokens: [
          { latex: `\\frac{x}{x+${co("3")}} = ${co("1")} - \\frac{${co("3")}}{x+${co("3")}}`, hint: { term: "виділяємо цілу частину", text: "x/(x+3) = (x+3−3)/(x+3) = 1 − 3/(x+3)." } },
        ],
        explanation: "Неправильний дріб розкладаємо: чисельник x = (x+3) − 3, тому x/(x+3) = 1 − 3/(x+3). Тепер інтеграл елементарний.",
        methodIds: ["rewrite"],
        help: {
          plain: "Коли степінь чисельника ≥ степеня знаменника — виділи цілу частину. Тут додай і відніми 3: x = (x+3) − 3.",
          numeric: [
            { latex: "x = (x+3) - 3", note: "штучний прийом" },
            { latex: "\\tfrac{(x+3)-3}{x+3} = 1 - \\tfrac{3}{x+3}", note: "поділили почленно" },
          ],
        },
      },
      {
        title: "Інтегруємо й збираємо",
        tokens: [
          { latex: `x\\ln(x+${co("3")}) - \\left(x - ${co("3")}\\ln|x+${co("3")}|\\right)` },
          { latex: "=" },
          { latex: `(x+${co("3")})\\ln(x+${co("3")}) - x + C`, hint: { term: "зводимо логарифми", text: "x·ln + 3·ln = (x+3)·ln." } },
        ],
        explanation: "∫(1 − 3/(x+3))dx = x − 3ln|x+3|. Підставляємо: x·ln − x + 3ln = (x+3)ln(x+3) − x.",
        methodIds: ["table"],
      },
      {
        title: "Перевірка похідною",
        tokens: [
          { latex: `\\left((x+${co("3")})\\ln(x+${co("3")}) - x\\right)'` },
          { latex: "=" },
          { latex: `\\ln(x+${co("3")})`, hint: { term: "= підінтегральна", text: "ln(x+3) + (x+3)/(x+3) − 1 = ln(x+3). ✓" } },
        ],
        explanation: "Похідна: ln(x+3) + (x+3)·1/(x+3) − 1 = ln(x+3) + 1 − 1 = ln(x+3). Збіглося.",
        methodIds: ["verify"],
      },
    ],
    answer: `(x+${co("3")})\\ln(x+${co("3")}) - x + C`,
    methodIds: ["by-parts", "rewrite", "table", "verify"],
    pitfalls: [
      "Не здогадатись, що ln береться **частинами** проти dv = dx.",
      "Залишити ∫x/(x+3) dx — спершу **виділи цілу частину**: 1 − 3/(x+3).",
      "Загубити **−x** у відповіді.",
    ],
  },

  // ═══════════════════════ Рівень 6 — корінь і квадратний тричлен ═══════════════════════
  // 5.8  ∫ 1/√(3 − 5x²) dx
  {
    id: "one-over-sqrt-3-5x2",
    title: "5.8 — табличний arcsin",
    difficulty: 6,
    problemTokens: [
      { latex: "\\int", hint: hintIntegral },
      {
        latex: `\\frac{${co("1")}}{\\sqrt{${co("3")} - ${co("5")}x^{${po("2")}}}}`,
        hint: { term: "1/√(3−5x²)", text: "Під коренем «стала − x²» → це форма arcsin. Треба звести до √(a²−u²)." },
      },
      { latex: "dx", hint: hintDx },
    ],
    steps: [
      {
        title: "Згадуємо табличну формулу",
        tokens: [
          { latex: `\\int \\frac{dx}{\\sqrt{a^{${po("2")}} - x^{${po("2")}}}} = \\arcsin\\frac{x}{a} + C`, hint: { term: "форма arcsin", text: "Корінь з «a² − x²» у знаменнику → завжди arcsin." } },
        ],
        explanation: "Шаблон ∫dx/√(a²−x²) = arcsin(x/a). Наша мета — підігнати 3−5x² під цей вигляд.",
        methodIds: ["table"],
        help: {
          plain: "Дві близькі форми: √(a²−x²) у знаменнику → arcsin; a²+x² у знаменнику → arctan. Тут корінь і мінус → arcsin.",
          examples: [{ latex: "\\int \\frac{dx}{a^2+x^2} = \\tfrac1a\\arctan\\tfrac{x}{a}", note: "сусідня форма (arctan)" }],
        },
      },
      {
        title: "Виносимо 5 з-під кореня",
        tokens: [
          { latex: `\\sqrt{${co("5")}\\left(\\tfrac{${co("3")}}{${co("5")}} - x^{${po("2")}}\\right)}`, hint: { term: "виносимо 5", text: "3−5x² = 5·(3/5 − x²)." } },
          { latex: "=" },
          { latex: `\\sqrt{${co("5")}}\\,\\sqrt{\\tfrac{${co("3")}}{${co("5")}} - x^{${po("2")}}}`, hint: { term: "√(добутку)", text: "√(5·…) = √5·√(…)." } },
        ],
        explanation: "Щоб коефіцієнт при x² став 1, виносимо 5: 3−5x² = 5(3/5 − x²). Корінь розкладається на √5·√(3/5 − x²).",
        methodIds: ["rewrite"],
      },
      {
        title: "Інтегруємо за формулою arcsin",
        tokens: [
          { latex: `\\tfrac{${co("1")}}{\\sqrt{${co("5")}}}\\int \\frac{dx}{\\sqrt{\\tfrac{${co("3")}}{${co("5")}} - x^{${po("2")}}}}`, hint: { term: "a² = 3/5", text: "Тепер a = √(3/5)." } },
          { latex: "=" },
          { latex: `\\tfrac{${co("1")}}{\\sqrt{${co("5")}}}\\arcsin\\frac{x}{\\sqrt{${co("3")}/${co("5")}}} + C`, hint: { term: "застосували формулу", text: "arcsin(x/a) з a = √(3/5)." } },
        ],
        explanation: "1/√5 виносимо наперед. Тут a² = 3/5, тож за формулою отримуємо (1/√5)·arcsin(x/√(3/5)).",
        methodIds: ["table"],
      },
      {
        title: "Спрощуємо й перевіряємо",
        tokens: [
          { latex: `\\tfrac{${co("1")}}{\\sqrt{${co("5")}}}\\arcsin\\frac{\\sqrt{${co("5")}}\\,x}{\\sqrt{${co("3")}}} + C`, hint: { term: "акуратний вигляд", text: "x/√(3/5) = x·√5/√3 = √5·x/√3." } },
          { latex: "\\xrightarrow{(\\,)'}" },
          { latex: `\\frac{${co("1")}}{\\sqrt{${co("3")} - ${co("5")}x^{${po("2")}}}}`, hint: { term: "= підінтегральна", text: "Похідна вертає 1/√(3−5x²). ✓" } },
        ],
        explanation: "x/√(3/5) = √5·x/√3. Перевірка похідною повертає 1/√(3−5x²). Можна записати й як (√5/5)·arcsin(√15·x/3).",
        methodIds: ["verify"],
      },
    ],
    answer: `\\frac{${co("1")}}{\\sqrt{${co("5")}}}\\arcsin\\frac{\\sqrt{${co("5")}}\\,x}{\\sqrt{${co("3")}}} + C`,
    methodIds: ["table", "rewrite", "verify"],
    pitfalls: [
      "Не звести коефіцієнт при x² до **одиниці** перед формулою arcsin.",
      "Переплутати форми: корінь і мінус → **arcsin**, без кореня й плюс → arctan.",
      "Загубити множник **1/√5** від винесення 5.",
    ],
  },

  // 14.8  ∫ 1/(x² + x + 2) dx
  {
    id: "one-over-x2-x-2",
    title: "14.8 — квадратний тричлен → arctan",
    difficulty: 6,
    problemTokens: [
      { latex: "\\int", hint: hintIntegral },
      {
        latex: `\\frac{${co("1")}}{x^{${po("2")}} + x + ${co("2")}}`,
        hint: { term: "1/(x²+x+2)", text: "Квадратний тричлен у знаменнику без дійсних коренів → arctan через повний квадрат." },
      },
      { latex: "dx", hint: hintDx },
    ],
    steps: [
      {
        title: "Виділяємо повний квадрат",
        tokens: [
          { latex: `x^{${po("2")}} + x + ${co("2")}`, },
          { latex: "=" },
          { latex: `\\left(x + \\tfrac{${co("1")}}{${co("2")}}\\right)^{${po("2")}} + \\tfrac{${co("7")}}{${co("4")}}`, hint: { term: "повний квадрат", text: "Половину коефіцієнта при x (це 1/2) у квадрат: (x+1/2)². Залишок 2 − 1/4 = 7/4." } },
        ],
        explanation: "x²+x = (x+1/2)² − 1/4. Тому x²+x+2 = (x+1/2)² + 2 − 1/4 = (x+1/2)² + 7/4. Дискримінант від'ємний — коренів немає, буде arctan.",
        methodIds: ["complete-square"],
        help: {
          plain: "Беремо половину коефіцієнта при x (тут 1/2), підносимо до квадрата (1/4). Додаємо й віднімаємо її: x²+x+1/4 = (x+1/2)², а решта 2−1/4 = 7/4.",
          simpler: "Мета — побачити (щось)² + число. Половина від 1 — це 1/2; вона й стоятиме в дужках: (x+1/2)². Перевір розкриттям: (x+1/2)² = x²+x+1/4.",
          numeric: [
            { latex: "\\left(\\tfrac{1}{2}\\right)^2 = \\tfrac14", note: "половину коефіцієнта в квадрат" },
            { latex: "2 - \\tfrac14 = \\tfrac74", note: "вільний залишок" },
          ],
          check: { question: "Виділи повний квадрат у x²+x.", answer: "\\left(x+\\tfrac12\\right)^2 - \\tfrac14" },
        },
      },
      {
        title: "Зводимо до форми a² + u²",
        tokens: [
          { latex: `\\int \\frac{dx}{\\left(x+\\tfrac{${co("1")}}{${co("2")}}\\right)^{${po("2")}} + \\left(\\tfrac{\\sqrt{${co("7")}}}{${co("2")}}\\right)^{${po("2")}}}`, hint: { term: "a = √7/2", text: "7/4 = (√7/2)², а u = x+1/2." } },
        ],
        explanation: "Записуємо 7/4 як (√7/2)². Тепер знаменник = u² + a² з u = x+1/2, a = √7/2 — чиста форма arctan.",
        methodIds: ["complete-square"],
      },
      {
        title: "Застосовуємо формулу arctan",
        tokens: [
          { latex: `\\int \\frac{du}{u^{${po("2")}} + a^{${po("2")}}} = \\tfrac{${co("1")}}{a}\\arctan\\tfrac{u}{a}`, hint: { term: "таблична форма", text: "Знаменник u²+a² → arctan, з множником 1/a." } },
          { latex: "=" },
          { latex: `\\tfrac{${co("2")}}{\\sqrt{${co("7")}}}\\arctan\\frac{${co("2")}x + ${co("1")}}{\\sqrt{${co("7")}}} + C`, hint: { term: "підставили a, u", text: "1/a = 2/√7; u/a = (x+1/2)/(√7/2) = (2x+1)/√7." } },
        ],
        explanation: "∫du/(u²+a²) = (1/a)arctan(u/a). Тут 1/a = 2/√7, а u/a = (2x+1)/√7 (множимо чисельник і знаменник на 2).",
        methodIds: ["table"],
      },
      {
        title: "Перевірка похідною",
        tokens: [
          { latex: `\\left(\\tfrac{${co("2")}}{\\sqrt{${co("7")}}}\\arctan\\tfrac{${co("2")}x+${co("1")}}{\\sqrt{${co("7")}}}\\right)'` },
          { latex: "=" },
          { latex: `\\frac{${co("1")}}{x^{${po("2")}} + x + ${co("2")}}`, hint: { term: "= підінтегральна", text: "Після спрощення 4/(7+(2x+1)²) = 1/(x²+x+2). ✓" } },
        ],
        explanation: "Похідна дає 4/(7+(2x+1)²); а 7+(2x+1)² = 4(x²+x+2), тож 4/(4(x²+x+2)) = 1/(x²+x+2). Збіглося.",
        methodIds: ["verify"],
      },
    ],
    answer: `\\frac{${co("2")}}{\\sqrt{${co("7")}}}\\arctan\\frac{${co("2")}x + ${co("1")}}{\\sqrt{${co("7")}}} + C`,
    methodIds: ["complete-square", "table", "verify"],
    pitfalls: [
      "Спроба розкласти на множники — дискримінант **від'ємний**, тому йдемо через повний квадрат.",
      "Помилка в залишку: 2 − 1/4 = **7/4**, а не 2.",
      "Забути множник **1/a = 2/√7** перед arctan.",
    ],
  },

  // 15.8  ∫ 1/√(1 − x − x²) dx
  {
    id: "one-over-sqrt-1-x-x2",
    title: "15.8 — корінь з тричлена → arcsin",
    difficulty: 6,
    problemTokens: [
      { latex: "\\int", hint: hintIntegral },
      {
        latex: `\\frac{${co("1")}}{\\sqrt{${co("1")} - x - x^{${po("2")}}}}`,
        hint: { term: "1/√(1−x−x²)", text: "Під коренем квадратний тричлен зі знаком «−» при x². Повний квадрат → arcsin." },
      },
      { latex: "dx", hint: hintDx },
    ],
    steps: [
      {
        title: "Виносимо мінус і групуємо",
        tokens: [
          { latex: `${co("1")} - x - x^{${po("2")}}`, },
          { latex: "=" },
          { latex: `-\\left(x^{${po("2")}} + x - ${co("1")}\\right)`, hint: { term: "−( … )", text: "Виносимо −1, щоб x² мав плюс усередині дужок." } },
        ],
        explanation: "Щоб виділити повний квадрат, спершу робимо коефіцієнт при x² додатним: 1−x−x² = −(x²+x−1).",
        methodIds: ["complete-square"],
      },
      {
        title: "Виділяємо повний квадрат",
        tokens: [
          { latex: `-\\left(\\left(x+\\tfrac{${co("1")}}{${co("2")}}\\right)^{${po("2")}} - \\tfrac{${co("5")}}{${co("4")}}\\right)`, hint: { term: "повний квадрат", text: "x²+x−1 = (x+1/2)² − 1/4 − 1 = (x+1/2)² − 5/4." } },
          { latex: "=" },
          { latex: `\\tfrac{${co("5")}}{${co("4")}} - \\left(x+\\tfrac{${co("1")}}{${co("2")}}\\right)^{${po("2")}}`, hint: { term: "розкрили мінус", text: "Отримали форму a² − u²." } },
        ],
        explanation: "x²+x−1 = (x+1/2)² − 5/4. З мінусом спереду: 1−x−x² = 5/4 − (x+1/2)² — чиста форма a²−u² під коренем.",
        methodIds: ["complete-square"],
        help: {
          plain: "Половина коефіцієнта при x — це 1/2, у квадрат — 1/4. (x+1/2)² = x²+x+1/4, тому x²+x−1 = (x+1/2)² − 1/4 − 1 = (x+1/2)² − 5/4.",
          numeric: [
            { latex: "-\\tfrac14 - 1 = -\\tfrac54", note: "залишок після квадрата" },
            { latex: "\\tfrac54 = \\left(\\tfrac{\\sqrt5}{2}\\right)^2", note: "це a²" },
          ],
          check: { question: "Виділи повний квадрат у x²+x−1.", answer: "\\left(x+\\tfrac12\\right)^2 - \\tfrac54" },
        },
      },
      {
        title: "Застосовуємо формулу arcsin",
        tokens: [
          { latex: `\\int \\frac{dx}{\\sqrt{\\left(\\tfrac{\\sqrt{${co("5")}}}{${co("2")}}\\right)^{${po("2")}} - \\left(x+\\tfrac{${co("1")}}{${co("2")}}\\right)^{${po("2")}}}}`, hint: { term: "a = √5/2", text: "5/4 = (√5/2)², u = x+1/2." } },
          { latex: "=" },
          { latex: `\\arcsin\\frac{${co("2")}x + ${co("1")}}{\\sqrt{${co("5")}}} + C`, hint: { term: "arcsin(u/a)", text: "u/a = (x+1/2)/(√5/2) = (2x+1)/√5." } },
        ],
        explanation: "∫dx/√(a²−u²) = arcsin(u/a) з a = √5/2, u = x+1/2. Тут 1/a-множника немає (бо коефіцієнт при u² = 1). u/a = (2x+1)/√5.",
        methodIds: ["table"],
      },
      {
        title: "Перевірка похідною",
        tokens: [
          { latex: `\\left(\\arcsin\\tfrac{${co("2")}x+${co("1")}}{\\sqrt{${co("5")}}}\\right)'` },
          { latex: "=" },
          { latex: `\\frac{${co("1")}}{\\sqrt{${co("1")} - x - x^{${po("2")}}}}`, hint: { term: "= підінтегральна", text: "2/√(5−(2x+1)²), а 5−(2x+1)² = 4(1−x−x²). ✓" } },
        ],
        explanation: "Похідна arcsin дає 2/√(5−(2x+1)²); а 5−(2x+1)² = 4(1−x−x²), тож √ = 2√(1−x−x²) і двійки скорочуються.",
        methodIds: ["verify"],
      },
    ],
    answer: `\\arcsin\\frac{${co("2")}x + ${co("1")}}{\\sqrt{${co("5")}}} + C`,
    methodIds: ["complete-square", "table", "verify"],
    pitfalls: [
      "Забути **винести мінус** перед виділенням квадрата (x² має бути з плюсом усередині).",
      "Помилитись у залишку: −1/4 − 1 = **−5/4**.",
      "Переплутати з arctan — тут **корінь** у знаменнику й форма a²−u² → arcsin.",
    ],
  },

  // 10.8  ∫ (2x − 5)/√(7x² + 3) dx
  {
    id: "2x-5-over-sqrt-7x2-3",
    title: "10.8 — розбиття на два інтеграли",
    difficulty: 6,
    problemTokens: [
      { latex: "\\int", hint: hintIntegral },
      {
        latex: `\\frac{${co("2")}x - ${co("5")}}{\\sqrt{${co("7")}x^{${po("2")}} + ${co("3")}}}`,
        hint: { term: "(2x−5)/√(7x²+3)", text: "Чисельник 2x−5 розбиваємо: частина «2x» дає корінь, частина «−5» — логарифм." },
      },
      { latex: "dx", hint: hintDx },
    ],
    steps: [
      {
        title: "Розбиваємо на два інтеграли",
        tokens: [
          { latex: `\\int \\frac{${co("2")}x}{\\sqrt{${co("7")}x^{${po("2")}}+${co("3")}}}\\,dx`, hint: { term: "перший", text: "Чисельник 2x — майже похідна 7x²+3. Дасть корінь." } },
          { latex: "-" },
          { latex: `\\int \\frac{${co("5")}}{\\sqrt{${co("7")}x^{${po("2")}}+${co("3")}}}\\,dx`, hint: { term: "другий", text: "Стала 5 над коренем. Дасть логарифм." } },
        ],
        explanation: "Дріб з різницею в чисельнику = різниця дробів. Перша частина береться заміною, друга — таблична (логарифм).",
        methodIds: ["linearity"],
        help: {
          plain: "Хитрість: 2x у чисельнику не випадкова — це похідна підкореневого 7x²+3 з точністю до числа. Тому ділимо задачу на «зручну» і «табличну» частини.",
        },
      },
      {
        title: "Перший інтеграл: заміна t = 7x² + 3",
        tokens: [
          { latex: `t = ${co("7")}x^{${po("2")}}+${co("3")}`, },
          { latex: "\\Rightarrow" },
          { latex: `dt = ${co("14")}x\\,dx`, hint: { term: "похідна", text: "(7x²+3)′ = 14x." } },
          { latex: "\\Rightarrow" },
          { latex: `${co("2")}x\\,dx = \\tfrac{${co("1")}}{${co("7")}}\\,dt`, hint: { term: "наш блок", text: "2x dx = dt/7 (бо 14x dx = dt)." } },
        ],
        explanation: "Підкореневе беремо за t. dt = 14x dx, а нам потрібен блок 2x dx = dt/7.",
        methodIds: ["substitution"],
      },
      {
        title: "Беремо перший інтеграл",
        tokens: [
          { latex: `\\tfrac{${co("1")}}{${co("7")}}\\int t^{${po("-1/2")}}\\,dt = \\tfrac{${co("1")}}{${co("7")}}\\cdot ${co("2")}\\sqrt{t}`, hint: { term: "∫t^{−1/2}=2√t", text: "Степеневе правило: −1/2+1 = 1/2, ділимо на 1/2 → ×2." } },
          { latex: "=" },
          { latex: `\\tfrac{${co("2")}}{${co("7")}}\\sqrt{${co("7")}x^{${po("2")}}+${co("3")}}`, hint: { term: "назад t", text: "Підставляємо t = 7x²+3." } },
        ],
        explanation: "1/√t = t^{−1/2}; ∫t^{−1/2}dt = 2√t. З множником 1/7 → (2/7)√(7x²+3).",
        methodIds: ["table"],
      },
      {
        title: "Другий інтеграл: таблична форма з логарифмом",
        tokens: [
          { latex: `${co("5")}\\int \\frac{dx}{\\sqrt{${co("7")}x^{${po("2")}}+${co("3")}}}`, },
          { latex: "=" },
          { latex: `\\tfrac{${co("5")}}{\\sqrt{${co("7")}}}\\ln\\left|\\sqrt{${co("7")}}\\,x + \\sqrt{${co("7")}x^{${po("2")}}+${co("3")}}\\right|`, hint: { term: "форма ln", text: "∫dx/√(b²x²+a²) = (1/b)ln|bx+√(b²x²+a²)|, тут b=√7." } },
        ],
        explanation: "Для √(7x²+3) у знаменнику (з плюсом!) працює логарифмічна формула: ∫dx/√(b²x²+a²) = (1/b)ln|bx+√(…)|, b = √7.",
        methodIds: ["table"],
        help: {
          plain: "Це «гіперболічний» родич arcsin: коли під коренем b²x²+a² (плюс), відповідь — логарифм, а не arcsin.",
          examples: [{ latex: "\\int \\frac{dx}{\\sqrt{x^2+a^2}} = \\ln\\left|x+\\sqrt{x^2+a^2}\\right|", note: "базовий випадок b=1" }],
        },
      },
      {
        title: "Збираємо та перевіряємо",
        tokens: [
          { latex: `\\tfrac{${co("2")}}{${co("7")}}\\sqrt{${co("7")}x^{${po("2")}}+${co("3")}} - \\tfrac{${co("5")}}{\\sqrt{${co("7")}}}\\ln\\left|\\sqrt{${co("7")}}\\,x+\\sqrt{${co("7")}x^{${po("2")}}+${co("3")}}\\right| + C`, },
          { latex: "\\xrightarrow{(\\,)'}" },
          { latex: `\\frac{${co("2")}x-${co("5")}}{\\sqrt{${co("7")}x^{${po("2")}}+${co("3")}}}`, hint: { term: "= підінтегральна", text: "Похідна обох частин складається у вихідний дріб. ✓" } },
        ],
        explanation: "Складаємо результати з кроку 3 і 4 з мінусом. Перевірка похідною повертає (2x−5)/√(7x²+3).",
        methodIds: ["verify"],
      },
    ],
    answer: `\\frac{${co("2")}}{${co("7")}}\\sqrt{${co("7")}x^{${po("2")}}+${co("3")}} - \\frac{${co("5")}}{\\sqrt{${co("7")}}}\\ln\\left|\\sqrt{${co("7")}}\\,x+\\sqrt{${co("7")}x^{${po("2")}}+${co("3")}}\\right| + C`,
    methodIds: ["linearity", "substitution", "table", "verify"],
    pitfalls: [
      "Намагатись узяти інтеграл одним шматком — спершу **розбий** чисельник 2x−5 на дві частини.",
      "Для частини зі сталою 5: під коренем **плюс** → відповідь логарифм (не arcsin).",
      "Загубити множник **1/7** у першій частині або **1/√7** у другій.",
    ],
  },
];

export function getProblem(id: string): Problem | undefined {
  return problems.find((p) => p.id === id);
}

export function problemsByDifficulty(d: number): Problem[] {
  return problems.filter((p) => p.difficulty === d);
}
