import { AntDesign } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { selectColors } from "../../redux/reducers/themeReducer";
import { useAppSelector } from "../../redux/redux-hooks/hooks";
import { TabParamList } from "../../types/types";
import { History } from "./history/History";
import { Home } from "./home/Home";
import { Progress } from "./progress/Progress";
import { Settings } from "./settings/Settings";

interface Icons {
  Home: keyof typeof AntDesign.glyphMap;
  Progress: keyof typeof AntDesign.glyphMap;
  History: keyof typeof AntDesign.glyphMap;
  Settings: keyof typeof AntDesign.glyphMap;
}

const Tab = createBottomTabNavigator<TabParamList>();

export function TabStack() {
  const colors = useAppSelector(selectColors);
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          const icons: Icons = {
            Home: "home",
            Progress: "linechart",
            History: "calendar",
            Settings: "setting",
          };
          return (
            <AntDesign name={icons[route.name]} size={size} color={color} />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Progress" component={Progress} />
      <Tab.Screen name="History" component={History} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}
