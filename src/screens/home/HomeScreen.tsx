import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View } from "react-native";
import { HomeStackParamList } from "../../types/types";

type HomeProps = NativeStackScreenProps<HomeStackParamList, "HomeScreen">;

export function HomeScreen({ navigation }: HomeProps) {
  return <View></View>;
}
