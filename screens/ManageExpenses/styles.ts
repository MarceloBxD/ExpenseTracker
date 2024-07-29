import { StyleSheet } from "react-native";
import { GlobalStyles } from "../../styles/GlobalStyles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary800,
    padding: 24,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginHorizontal: 8,
    minWidth: 120,
  },
  label: {
    color: GlobalStyles.colors.primary100,
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary700,
    color: GlobalStyles.colors.primary100,
    padding: 8,
    marginBottom: 16,
    borderRadius: 8,
  },
  errorText: {
    color: GlobalStyles.colors.error50,
    marginBottom: 16,
  },
});
