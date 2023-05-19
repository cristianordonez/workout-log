import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View } from "react-native";
import { ProgressStackParamList } from "../../types/types";

type ProgressProps = NativeStackScreenProps<
  ProgressStackParamList,
  "ProgressScreen"
>;
export function ProgressScreen({ navigation }: ProgressProps) {
  return <View></View>;
}
