import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { StackParamList } from "../../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useExpenses } from "../../contexts/ExpensesContext";
import ExpensesOutput from "../../components/ExpensesOutput";

type AllExpensesProps = {
  navigation: NativeStackNavigationProp<StackParamList, "AllExpenses">;
};

export const AllExpenses = ({ navigation }: AllExpensesProps) => {
  const { expenses } = useExpenses();

  

  return (
    <View style={styles.container}>
      <ExpensesOutput expenses={expenses} expensesPeriod="Despesas Totais" />
    </View>
  );
};
