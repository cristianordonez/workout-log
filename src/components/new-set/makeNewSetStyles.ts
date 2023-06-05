import { StyleSheet } from "react-native";
import { Colors } from "../../types/types";

export const makeNewSetStyles = (colors: Colors) => {
  return StyleSheet.create({
    container: {
      backgroundColor: colors.card,
      flex: 1,
      flexDirection: "row",
      width: "100%",
      minHeight: 100,
    },
    innerColumn: {
      flex: 1,
      alignItems: "flex-start",
      justifyContent: "center",
    },
    innerRow: {
      flex: 1,
      flexDirection: "row",
    },
  });
};
