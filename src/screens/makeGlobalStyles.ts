import { StyleSheet } from "react-native";
import { Colors } from "../types/types";

export const makeGlobalStyles = (colors: Colors) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: "5%",
      paddingVertical: "5%",
    },
  });
