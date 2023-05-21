import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View } from "react-native";
import { TabParamList } from "../../../types/types";

type HistoryProps = NativeStackScreenProps<TabParamList, "History">;

export function History({ navigation }: HistoryProps) {
  return <View></View>;
}
