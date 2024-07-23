import { ReactNode } from "react";
import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
  ViewProps,
} from "react-native";
import { GlobalStyles } from "../../../styles/GlobalStyles";

interface ButtonProps {
  children: ReactNode;
  onPress: () => void;
  mode?: "flat" | "default";
  style?: ViewProps["style"];
}

export default function Button({
  children,
  onPress,
  mode = "default",
  style,
}: ButtonProps) {
  return (
    <View style={style}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          mode === "flat" && styles.flat,
          pressed && styles.pressed,
        ]}
        onPress={onPress}
      >
        <View>
          <Text style={[styles.buttonText, mode === "flat" && styles.flatText]}>
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary500,
  },
  flat: {
    backgroundColor: "transparent",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
  flatText: {
    color: GlobalStyles.colors.primary200,
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: GlobalStyles.colors.primary100,
    borderRadius: 4,
  },
});
