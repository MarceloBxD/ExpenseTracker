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
