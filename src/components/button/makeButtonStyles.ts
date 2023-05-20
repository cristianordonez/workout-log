import { StyleSheet } from "react-native";
import { Colors } from "../../types/types";

export const makeButtonStyles = (colors: Colors) =>
  StyleSheet.create({
    btnDefault: {
      backgroundColor: colors.primary,
    },
    btnPressed: {
      backgroundColor: colors.button,
    },
    btn: {
      borderRadius: 5,
      minHeight: 40,
      maxHeight: 40,
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      color: colors.background,
    },
  });
