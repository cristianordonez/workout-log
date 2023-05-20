import { StyleSheet } from "react-native";
import { Colors } from "../../types/types";

export const makeHomeStyles = (colors: Colors) => {
  return StyleSheet.create({
    mainSection: {
      flex: 1,
      alignItems: "flex-start",
      gap: 10,
    },
    btnTextContainer: {
      width: "100%",
    },
  });
};
