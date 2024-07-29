import { ActivityIndicator, View } from "react-native";
import { styles } from "./styles";
import { useExpenses } from "../../../contexts/ExpensesContext";

export const LoadingOverlay = () => {

  const {  } = useExpenses();

  return (
    <View style={styles.overlay}>
      <ActivityIndicator size="large" color="white" />
    </View>
  );
};
