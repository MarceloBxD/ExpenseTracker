import React, { useLayoutEffect, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
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

const convertToNumber = (value: string) => parseFloat(value.replace(",", "."));

const verifyIfAmountIsABrlCurrency = (value: string) => {
  const regex = /^(\d{1,3}(\.\d{3})*|(\d+))(\,\d{2})?$/;
  return regex.test(value);
};

export const ManageExpenses = ({ route, navigation }: ManageExpensesProps) => {
  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;
  const { expenses, addExpense, updateExpense, deleteExpense } = useExpenses();
  const itemToEdit = expenses.find((item) => item.id === expenseId);
  const [inputValues, setInputValues] = useState({
    description: { value: "", isValid: false },
    amount: { value: "", isValid: false },
  });

  const amountIsValid =
    !isNaN(convertToNumber(inputValues.amount.value)) &&
    convertToNumber(inputValues.amount.value) > 0 &&
    verifyIfAmountIsABrlCurrency(inputValues.amount.value);
  const descriptionIsValid = inputValues.description.value.trim().length > 0;
  const formIsInvalid = !amountIsValid || !descriptionIsValid;

  useEffect(() => {
    if (isEditing && itemToEdit) {
      setInputValues({
        description: { value: itemToEdit.description, isValid: true },
        amount: {
          value: itemToEdit.amount.toString().replace(".", ","),
          isValid: true,
        },
      });
    }
  }, [isEditing, itemToEdit]);

  const handleInputChange = (inputIdentifier: string, inputValue: string) => {
    setInputValues((prev) => ({
      ...prev,
      [inputIdentifier]: {
        value: inputValue,
        isValid:
          inputIdentifier === "description"
            ? inputValue.trim().length > 0
            : amountIsValid,
      },
    }));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Editar Despesa" : "Adicionar Despesa",
      headerRight: () => (
        <TouchableOpacity onPress={() => console.log("Save Expense")}>
          <IconButton
            icon={isEditing ? "save-outline" : "add"}
            size={24}
            color="#fff"
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, isEditing]);

  const handleDeleteItem = (expenseId: string) => {
    deleteExpense(expenseId);
    navigation.goBack();
  };

  const handleAddExpense = () => {
    if (formIsInvalid) {
      setInputValues((prev) => ({
        ...prev,
        description: { ...prev.description, isValid: descriptionIsValid },
        amount: { ...prev.amount, isValid: amountIsValid },
      }));
      return;
    }

    addExpense({
      description: inputValues.description.value,
      amount: convertToNumber(inputValues.amount.value),
      date: new Date(),
    });

    navigation.goBack();
  };

  const handleUpdateExpense = () => {
    if (formIsInvalid) {
      setInputValues((prev) => ({
        ...prev,
        description: { ...prev.description, isValid: descriptionIsValid },
        amount: { ...prev.amount, isValid: amountIsValid },
      }));
      return;
    }

    updateExpense(expenseId, {
      description: inputValues.description.value,
      amount: convertToNumber(inputValues.amount.value),
      date: new Date(),
    });

    navigation.goBack();
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Descrição</Text>
      <TextInput
        value={inputValues.description.value}
        onChangeText={(text) => handleInputChange("description", text)}
        multiline
        numberOfLines={4}
        keyboardType="ascii-capable"
        style={styles.input}
      />
      <Text style={styles.label}>Valor</Text>
      <TextInput
        value={inputValues.amount.value}
        onChangeText={(text) => handleInputChange("amount", text)}
        keyboardType="numeric"
        style={styles.input}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Por favor, preencha todos os campos corretamente.
        </Text>
      )}
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
            onPress={() => handleDeleteItem(expenseId)}
            icon="trash-outline"
            size={24}
            color={GlobalStyles.colors.error50}
          />
        </View>
      )}
    </View>
  );
};
