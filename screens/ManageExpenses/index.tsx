import React, { useLayoutEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import IconButton from "../../components/UI/IconButton";

type ManageExpensesProps = NativeStackScreenProps<
  RootStackParamList,
  "ManageExpenses"
>;

export const ManageExpenses = ({ route, navigation }: ManageExpensesProps) => {
  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Editar Despesa" : "Adicionar Despesa",
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            console.log("Save Expense");
          }}
        >
          {isEditing ? (
            <IconButton icon="save" size={24} color="#fff" />
          ) : (
            <IconButton icon="add" size={24} color="#fff" />
          )}
        </TouchableOpacity>
      ),
    });
  }, [navigation, isEditing]);

  return (
    <View style={styles.container}>
      <Text>Manage Expenses</Text>
    </View>
  );
};
