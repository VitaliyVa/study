// Рівень складності (поки використовуємо лише рівень 1)
export type Difficulty = 1 | 2 | 3 | 4 | 5 | 6 | 7;

// Підказка на елементі формули
export interface Hint {
  term: string; // короткий заголовок, напр. "∫ — інтеграл"
  text: string; // пояснення
}

// Один токен рівняння. Якщо є hint — токен інтерактивний (підсвітка + tooltip).
export interface Token {
  latex: string;
  hint?: Hint;
}

// Простий приклад усередині модалки "Я не розумію"
export interface HelpExample {
  latex: string;
  note: string;
}

// Вміст модального вікна "Я не розумію" для кроку
export interface StepHelp {
  plain: string; // ще простіше пояснення «на пальцях»
  examples?: HelpExample[]; // елементарні приклади того ж правила
}

// Один крок покрокового рішення
export interface Step {
  title: string; // що робимо на цьому кроці
  tokens: Token[]; // інтерактивна формула кроку (наведення = підказка)
  explanation: string; // чому/як (текст під формулою)
  help?: StepHelp; // що показати, якщо студент натисне "Я не розумію"
}

export interface Problem {
  id: string;
  title: string;
  difficulty: Difficulty;
  problemTokens: Token[]; // інтерактивне рівняння-умова
  steps: Step[]; // покрокове рішення
  answer: string; // фінальна відповідь (latex)
}

export interface Level {
  difficulty: Difficulty;
  name: string;
  summary: string; // одним рядком, що це за тип
}
