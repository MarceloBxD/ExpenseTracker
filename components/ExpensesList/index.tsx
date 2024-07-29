import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../styles/GlobalStyles";

import { formatToBRL } from "../../utils/formatToBRL";
import { formatDate } from "../../utils/formatDate";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";
import { RootStackParamList } from "../../App";

export type ItemProps = {
  id: string;
  description: string;
  amount: number;
  date: Date;
};

type ExpensesProps = {
  expenses: ItemProps[];
};

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ManageExpenses"
>;

const ExpenseItem = ({ item }: { item: ItemProps }) => {
  const navigation = useNavigation<NavigationProp>();

  function expensePressHandler() {
    navigation.navigate("ManageExpenses", {
      expenseId: item.id,
    });
  }

  return (
    <Pressable
      onPress={expensePressHandler}
      style={({ pressed }) => {
        return pressed
          ? [styles.itemContainer, styles.pressed]
          : styles.itemContainer;
      }}
    >
      <View>
        <Text style={styles.itemDescription}>{item.description}</Text>
        <Text style={styles.purchaseDate}>{formatDate(item.date)}</Text>
      </View>
      <View>
        <Text style={styles.itemAmount}>R${formatToBRL(item.amount)}</Text>
      </View>
    </Pressable>
  );
};

export default function ExpensesList({ expenses }: ExpensesProps) {
  return (
    <>
      {expenses.length === 0 && (
        <Text style={styles.noExpenses}>Nenhuma despesa cadastrada</Text>
      )}
      <FlatList
        style={styles.flatList}
        data={expenses}
        renderItem={({ item }) => <ExpenseItem item={item} />}
        keyExtractor={(item) => item.id}
      />
    </>
  );
}
