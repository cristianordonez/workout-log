import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View } from "react-native";
import { HistoryStackParamList } from "../../types/types";

type HistoryProps = NativeStackScreenProps<
  HistoryStackParamList,
  "HistoryScreen"
>;

export function HistoryScreen({ navigation }: HistoryProps) {
  return <View></View>;
}
