import { StyleSheet } from "react-native";
import { GlobalStyles } from "../../styles/GlobalStyles";

export const styles = StyleSheet.create({
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
    maxWidth: 200,
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
  pressed: {
    opacity: 0.75,
  },
  noExpenses: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    padding: 20,
  },
});
