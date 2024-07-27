import React, { useLayoutEffect, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { styles } from "./styles";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import IconButton from "../../components/UI/IconButton";
import { GlobalStyles } from "../../styles/GlobalStyles";
import Button from "../../components/UI/Button";
import { useExpenses } from "../../contexts/ExpensesContext";

type ManageExpensesProps = NativeStackScreenProps<
  RootStackParamList,
  "ManageExpenses"
>;

export const ManageExpenses = ({ route, navigation }: ManageExpensesProps) => {
  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;

  const { expenses, addExpense, updateExpense, deleteExpense } = useExpenses();

  const itemToEdit = expenses.find((item) => item.id === expenseId);

  const [inputValues, setInputValues] = useState({
    description: "",
    amount: "",
  });

  useEffect(() => {
    if (isEditing && itemToEdit) {
      setInputValues({
        description: itemToEdit.description,
        amount: itemToEdit.amount.toString(),
      });
    }
  }, [isEditing, itemToEdit]);

  function handleInputChange(inputIdentifier: string, inputValue: string) {
    setInputValues((prev) => {
      return {
        ...prev,
        [inputIdentifier]: inputValue,
      };
    });
  }

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

  function handleDeleteItem(expenseId: string) {
    console.log("expenseId", expenseId);

    deleteExpense(expenseId);
    navigation.goBack();
  }

  function handleAddExpense() {
    if (!inputValues.description || !inputValues.amount) return;

    addExpense({
      description: inputValues.description,
      amount: +inputValues.amount,
      date: new Date(),
    });
    navigation.goBack();
  }

  function handleUpdateExpense() {
    updateExpense(expenseId, {
      description: inputValues.description,
      amount: +inputValues.amount,
      date: new Date(),
    });
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Descrição</Text>
      <TextInput
        value={inputValues.description}
        onChangeText={handleInputChange.bind(this, "description")}
        multiline
        numberOfLines={4}
        keyboardType="ascii-capable"
        style={styles.input}
      />
      <Text style={styles.label}>Valor</Text>
      <TextInput
        value={inputValues.amount}
        onChangeText={handleInputChange.bind(this, "amount")}
        keyboardType="numeric"
        style={styles.input}
      />
      <View style={styles.buttonsContainer}>
        <Button style={styles.button} mode="flat" onPress={cancelHandler}>
          Cancelar
        </Button>
        <Button
          onPress={isEditing ? handleUpdateExpense : handleAddExpense}
          style={styles.button}
        >
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
