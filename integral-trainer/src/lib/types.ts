// Рівень складності (сходинки 1-7, як у плані навчання)
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

// Один крок покрокового рішення
export interface Step {
  title: string; // що робимо на цьому кроці
  latex: string; // стан рішення (рендериться як блок)
  explanation: string; // чому/як
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
