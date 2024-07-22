export interface Expenses {
  id: string;
  description: string;
  amount: number;
  date: Date;
}

export const filterRecentExpenses = (expenses: Expenses[]) => {
  const today = new Date();
  const minusSevenDays = new Date(today);
  minusSevenDays.setDate(today.getDate() - 7);

  return expenses.filter((expense) => {
    return expense.date >= minusSevenDays;
  });
};
