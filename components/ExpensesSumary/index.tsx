import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../styles/GlobalStyles";
import { formatToBRL } from "../../utils/formatToBRL";

type Expense = {
  id: string;
  description: string;
  amount: number;
  date: Date;
};

type Props = {
  expenses: Expense[];
  periodName: string;
};

const ExpensesSumary = ({ expenses, periodName }: Props) => {
  const expensesSum = expenses.reduce(
    (acc, expense) => acc + expense.amount,
    0
  );

  return (
    <View style={styles.container}>
      <Text style={styles.period}>{periodName}</Text>
      <Text style={styles.sum}>
        R$
        {expensesSum > 0 ? formatToBRL(expensesSum) : "0,00"}
      </Text>
    </View>
  );
};

export default ExpensesSumary;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "100%",
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 10,
  },
  period: {
    fontSize: 16,
    color: GlobalStyles.colors.primary400,
  },
  sum: {
    fontSize: 16,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary400,
  },
});
