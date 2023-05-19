import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View } from "react-native";

import { SettingsStackParamList } from "../../types/types";
type SettingsProps = NativeStackScreenProps<
  SettingsStackParamList,
  "SettingsScreen"
>;
export function SettingsScreen({ navigation }: SettingsProps) {
  return <View></View>;
}
