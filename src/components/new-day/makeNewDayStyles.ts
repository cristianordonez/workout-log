import { StyleSheet } from "react-native";
import { Colors } from "../../types/types";

export const makeNewDayStyles = (colors: Colors) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "row",
      backgroundColor: colors.card,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
    },
    programDay: {
      flex: 1,
    },
    dayInput: {
      flex: 2,
    },
  });
};
