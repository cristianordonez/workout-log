import { AntDesign } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { HeaderDate } from "../components/header-date/HeaderDate";
import { useFonts } from "../hooks/useFonts";
import { selectColors } from "../redux/reducers/themeReducer";
import { useAppSelector } from "../redux/redux-hooks/hooks";
import { Home } from "./home";

import { History } from "./history";
import { Progress } from "./progress";
import { Settings } from "./settings";

type TabParamList = {
  Home: {};
  History: {};
  Progress: {};
  Settings: {};
};

const Tab = createBottomTabNavigator<TabParamList>();

export default function App() {
  const colors = useAppSelector(selectColors);
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    async function prepare() {
      try {
        await useFonts();
      } catch (err) {
        console.error("err: ", err);
      } finally {
        setIsReady(true);
      }
    }
    prepare();
  }, []);

  interface Icons {
    Home: keyof typeof AntDesign.glyphMap;
    Progress: keyof typeof AntDesign.glyphMap;
    History: keyof typeof AntDesign.glyphMap;
    Settings: keyof typeof AntDesign.glyphMap;
  }
  const NavigationTheme = {
    dark: true,
    colors: {
      primary: colors.primary,
      background: colors.background,
      card: colors.card,
      text: colors.text,
      border: colors.border,
      notification: colors.notification,
    },
  };
  if (isReady) {
    return (
      <NavigationContainer theme={NavigationTheme}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerStyle: { backgroundColor: colors.background },
            headerTitle: (props) => <HeaderDate {...props} />,
            tabBarIcon: ({ color, size }) => {
              const icons: Icons = {
                Home: "home",
                Progress: "linechart",
                History: "calendar",
                Settings: "setting",
              };
              return (
                // <Ionicons name={icons[route.name]} size={size} color={color} />
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
      </NavigationContainer>
    );
  } else {
    return <></>;
  }
}
