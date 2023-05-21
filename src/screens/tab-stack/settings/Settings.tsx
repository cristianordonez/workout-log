import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View } from "react-native";

import { TabParamList } from "../../../types/types";

type SettingsProps = NativeStackScreenProps<TabParamList, "Settings">;

export function Settings({ navigation }: SettingsProps) {
  return <View></View>;
}
