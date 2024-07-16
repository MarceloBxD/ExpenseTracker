export interface Expenses {
  id: number;
  title: string;
  amount: number;
  date: string;
  category: string;
  method: "credit" | "debit" | "cash" | "pix" | "transfer" | "check";
}

export const filterRecentExpenses = (expenses: Expenses[]) => {};
