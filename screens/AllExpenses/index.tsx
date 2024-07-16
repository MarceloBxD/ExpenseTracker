import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { StackParamList } from "../../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type AllExpensesProps = {
  navigation: NativeStackNavigationProp<StackParamList, "AllExpenses">;
};

export const AllExpenses = ({ navigation }: AllExpensesProps) => {
  return (
    <View style={styles.container}>
      <Text>All Expenses</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("ManageExpenses");
        }}
        style={{ marginTop: 20 }}
      >
        <Text>Press me!</Text>
      </TouchableOpacity>
    </View>
  );
};
