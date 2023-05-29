import { StyleSheet } from "react-native";
import { Colors } from "../../types/types";

export const makeExerciseStyles = (colors: Colors) =>
  StyleSheet.create({
    exerciseContainer: {
      height: 50,
      width: "100%",
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      borderBottomWidth: 2,
      borderBottomColor: colors.border,
    },
    name: { flex: 4 },
    icon: { flex: 1, alignItems: "flex-end", paddingHorizontal: 15 },
  });
