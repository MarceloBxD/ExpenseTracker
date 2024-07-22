import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { StackParamList } from "../../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import ExpensesOutput, {
  DUMMY_EXPENSES,
} from "../../components/ExpensesOutput";

type AllExpensesProps = {
  navigation: NativeStackNavigationProp<StackParamList, "AllExpenses">;
};

export const AllExpenses = ({ navigation }: AllExpensesProps) => {
  return (
    <View style={styles.container}>
      <ExpensesOutput
        expenses={DUMMY_EXPENSES}
        expensesPeriod="Despesas Totais"
      />
    </View>
  );
};
