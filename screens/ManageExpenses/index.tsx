import React, { useLayoutEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import IconButton from "../../components/UI/IconButton";
import { DUMMY_EXPENSES } from "../../components/ExpensesOutput";

type ManageExpensesProps = NativeStackScreenProps<
  RootStackParamList,
  "ManageExpenses"
>;

export const ManageExpenses = ({ route, navigation }: ManageExpensesProps) => {
  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;

  function handleDeleteItem(expenseId: string) {}

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
            <IconButton icon="save-outline" size={24} color="#fff" />
          ) : (
            <IconButton icon="add" size={24} color="#fff" />
          )}
        </TouchableOpacity>
      ),
    });
  }, [navigation, isEditing]);

  return (
    <View style={styles.container}>
      {isEditing && (
        <IconButton
          onPress={handleDeleteItem.bind(null, expenseId)}
          icon="trash-outline"
          size={24}
          color="#000"
        />
      )}
    </View>
  );
};
