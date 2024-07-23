import React, { useLayoutEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { styles } from "./styles";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import IconButton from "../../components/UI/IconButton";
import { DUMMY_EXPENSES } from "../../components/ExpensesOutput";
import { GlobalStyles } from "../../styles/GlobalStyles";
import Button from "../../components/UI/Button";

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

  function cancelHandler() {}

  function submitHandler() {}

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <Button style={styles.button} mode="flat" onPress={cancelHandler}>
          Cancelar
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {isEditing ? "Salvar" : "Adicionar"}
        </Button>
      </View>
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            onPress={handleDeleteItem.bind(null, expenseId)}
            icon="trash-outline"
            size={24}
            color={GlobalStyles.colors.error50}
          />
        </View>
      )}
    </View>
  );
};
