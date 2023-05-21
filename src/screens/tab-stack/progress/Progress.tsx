import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View } from "react-native";
import { TabParamList } from "../../../types/types";

type ProgressProps = NativeStackScreenProps<TabParamList, "Progress">;
export function Progress({ navigation }: ProgressProps) {
  return <View></View>;
}
