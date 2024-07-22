import { StyleSheet, View } from "react-native";
import { ExpensesList, ExpensesSumary } from "../index";
import { filterRecentExpenses } from "../../utils/filterRecentExpenses";
import { GlobalStyles } from "../../styles/GlobalStyles";

type Expense = {
  id: string;
  description: string;
  amount: number;
  date: Date;
};

type Props = {
  expenses: Expense[];
  expensesPeriod: string;
};

export const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "Toilet Paper",
    amount: 94.12,
    date: new Date(2024, 6, 18),
  },
  {
    id: "e2",
    description: "New TV",
    amount: 799.49,
    date: new Date(2024, 6, 19),
  },
  {
    id: "e3",
    description: "Car Insurance",
    amount: 294.67,
    date: new Date(2024, 4, 21),
  },
  {
    id: "e4",
    description: "New Desk (Wooden)",
    amount: 450,
    date: new Date(2024, 6, 12),
  },
  {
    id: "e5",
    description: "Toilet Paper",
    amount: 94.12,
    date: new Date(2020, 5, 14),
  },
  {
    id: "e6",
    description: "New Iphone",
    amount: 94.12,
    date: new Date(2020, 12, 14),
  },
];

export default function ExpensesOutput({ expenses, expensesPeriod }: Props) {
  console.log("filtrados", filterRecentExpenses(expenses));
  return (
    <View style={styles.container}>
      <ExpensesSumary expenses={expenses} periodName={expensesPeriod} />
      <ExpensesList expenses={expenses} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});
