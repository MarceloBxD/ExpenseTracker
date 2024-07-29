import React, { useLayoutEffect, useState } from "react";
import { View } from "react-native";
import { styles } from "./styles";

import { filterRecentExpenses } from "../../utils/filterRecentExpenses";
import { useExpenses } from "../../contexts/ExpensesContext";
import ExpensesOutput from "../../components/ExpensesOutput";

export const RecentExpenses = () => {
  const { expenses } = useExpenses();

  const [recentExpenses, setRecentExpenses] = useState(expenses);

  useLayoutEffect(() => {
    setRecentExpenses(filterRecentExpenses(expenses));
  }, [expenses]);

  return (
    <View style={styles.container}>
      <ExpensesOutput
        expenses={recentExpenses}
        expensesPeriod="Despesas Recentes"
      />
    </View>
  );
};
