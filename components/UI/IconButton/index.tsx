import { Pressable, PressableProps, View, StyleSheet } from "react-native";
import { GlobalStyles } from "../../../styles/GlobalStyles";

import { Ionicons } from "@expo/vector-icons";

export interface IconButtonProps extends PressableProps {
  size: number;
  color: string | undefined;
  icon: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
}

export default function IconButton({
  icon,
  size,
  color,
  onPress,
}: IconButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => pressed && styles.pressed}
      onPress={onPress}
    >
      <View style={styles.buttonContainer}>
        <Ionicons name={icon} size={size} color={color} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 24,
    marginHorizontal: 8,
    marginVertical: 2,
    padding: 6,
  },
  pressed: {
    opacity: 0.75,
  },
});
