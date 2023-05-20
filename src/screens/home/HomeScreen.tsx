import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View } from "react-native";
import { HomeStackParamList } from "../../types/types";

type HomeProps = NativeStackScreenProps<HomeStackParamList, "HomeScreen">;

export function HomeScreen({ navigation }: HomeProps) {
  // 1. first get all upcoming workouts
  return (
    <View>
      {/* Upcoming workouts section */}
      {/* My Programs section */}
      {/* Quick Start section */}
    </View>
  );
}
