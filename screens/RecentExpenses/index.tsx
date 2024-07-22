import React, { useLayoutEffect } from "react";
import { View } from "react-native";
import { styles } from "./styles";
import ExpensesOutput, {
  DUMMY_EXPENSES,
} from "../../components/ExpensesOutput";
import { filterRecentExpenses } from "../../utils/filterRecentExpenses";

export const RecentExpenses = () => {
  console.log("DUMMY", DUMMY_EXPENSES);
  const [recentExpenses, setRecentExpenses] = React.useState(DUMMY_EXPENSES);

  useLayoutEffect(() => {
    setRecentExpenses(filterRecentExpenses(DUMMY_EXPENSES));
  }, []);

  return (
    <View style={styles.container}>
      <ExpensesOutput
        expenses={recentExpenses}
        expensesPeriod="Despesas Recentes"
      />
    </View>
  );
};
