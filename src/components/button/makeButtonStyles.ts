import { StyleSheet } from "react-native";
import { Colors } from "../../types/types";

export const makeButtonStyles = (selectedColor: keyof Colors, colors: Colors) =>
  StyleSheet.create({
    btnDefault: {
      backgroundColor: colors[selectedColor],
    },
    btnPressed: {
      backgroundColor: colors.button,
    },
    btn: {
      borderRadius: 5,
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
    sm: {
      minHeight: 20,
      maxHeight: 20,
    },
    md: {
      minHeight: 40,
      maxHeight: 40,
    },
    lg: {
      minHeight: 60,
      maxHeight: 60,
    },
    xl: {
      minHeight: 80,
      maxHeight: 80,
    },
  });
