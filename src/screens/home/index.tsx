import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../../types/types";
import { HomeScreen } from "./HomeScreen";

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

export function Home() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
    </HomeStack.Navigator>
  );
}
