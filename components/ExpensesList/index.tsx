import { FlatList, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../styles/GlobalStyles";

import { formatToBRL } from "../../utils/formatToBRL";
import { formatDate } from "../../utils/formatDate";

type ItemProps = {
  id: string;
  description: string;
  amount: number;
  date: Date;
};

type ExpensesProps = {
  expenses: ItemProps[];
};

function renderExpenseItem({ item }: { item: ItemProps }) {
  return (
    <View style={styles.itemContainer}>
      <View>
        <Text style={styles.itemDescription}>{item.description}</Text>
        <Text style={styles.purchaseDate}>{formatDate(item.date)}</Text>
      </View>
      <View>
        <Text style={styles.itemAmount}>R${formatToBRL(item.amount)}</Text>
      </View>
    </View>
  );
}

export default function ExpensesList({ expenses }: ExpensesProps) {
  return (
    <FlatList
      style={styles.flatList}
      data={expenses}
      // o renderItem é uma função que recebe um objeto com a propriedade item
      renderItem={renderExpenseItem}
      // Key Extractor busca o item de fato, não sendo o objeto, e sim cada item do objeto
      keyExtractor={(item) => item.id}
    />
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
    backgroundColor: GlobalStyles.colors.primary400,
    borderRadius: 10,
  },
  itemDescription: {
    fontSize: 14,
    color: "#fff",
  },
  itemAmount: {
    fontSize: 15,
    color: GlobalStyles.colors.primary400,
    backgroundColor: "#fff",
    padding: 5,
    minWidth: 100,
    textAlign: "center",
    fontWeight: "bold",
    borderRadius: 12,
  },
  purchaseDate: {
    fontSize: 13,
    color: "#ccc",
    marginTop: 3,
  },
  flatList: {
    marginTop: 10,
  },
});
