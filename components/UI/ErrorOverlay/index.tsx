import React from "react";
import { Text, View } from "react-native";
import Button from "../Button";
import { styles } from "./styles";

type ErrorOverlayProps = {
  type: string;
  action: () => void;
};

const ErrorOverlay = ({ type, action }: ErrorOverlayProps) => {
  let errorMessage = "";

  switch (type) {
    case "ADD":
      errorMessage = "Erro ao adicionar despesa, tente novamente mais tarde!";
      break;
    case "UPDATE":
      errorMessage = "Erro ao atualizar despesa, tente novamente mais tarde!";
      break;
    case "DELETE":
      errorMessage = "Erro ao deletar despesa, tente novamente mais tarde!";
      break;
    case "LOAD":
      errorMessage = "Erro ao carregar despesas, tente novamente mais tarde!";
      break;
    default:
      errorMessage = "Ocorreu um erro inesperado!";
      break;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>{errorMessage}</Text>
      <Button
        onPress={() => {
          action();
        }}
        style={{ marginTop: 12 }}
      >
        Tentar novamente
      </Button>
    </View>
  );
};

export default ErrorOverlay;
