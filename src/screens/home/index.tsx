import { useRoute } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeStackParamList, TabParamList } from "../../types/types";
import { AddProgramScreen } from "./AddProgramScreen";
import { HomeScreen } from "./HomeScreen";

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

type HomeStackType = NativeStackScreenProps<TabParamList, "Home">;

export function Home({ navigation }: HomeStackType) {
  const route = useRoute();
  console.log("route: ", route);

  console.log("navigation: ", navigation);
  // useEffect(() => {
  //   navigation.setOptions({ tabBarStyle: { display: "none" } });
  // }, []);
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen name="AddProgramScreen" component={AddProgramScreen} />
    </HomeStack.Navigator>
  );
}
