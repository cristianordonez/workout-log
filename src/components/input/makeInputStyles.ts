import { StyleSheet } from "react-native";
import { Colors } from "../../types/types";

export const makeInputStyles = (colors: Colors) => {
  return StyleSheet.create({
    input: {
      padding: 10,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 5,
      color: colors.text,
      width: "100%",
    },
  });
};
