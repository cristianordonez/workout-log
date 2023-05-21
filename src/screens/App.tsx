import { AntDesign } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { HeaderDate } from "../components/header-date/HeaderDate";
import { useFonts } from "../hooks/useFonts";
import { getAllPrograms } from "../redux/reducers/programsReducer";
import { selectColors } from "../redux/reducers/themeReducer";
import { getInitialUserData } from "../redux/reducers/userReducer";
import { useAppDispatch, useAppSelector } from "../redux/redux-hooks/hooks";
import { TabParamList } from "../types/types";
import { History } from "./history";
import { Home } from "./home";
import { Progress } from "./progress";
import { Settings } from "./settings";

interface Icons {
  Home: keyof typeof AntDesign.glyphMap;
  Progress: keyof typeof AntDesign.glyphMap;
  History: keyof typeof AntDesign.glyphMap;
  Settings: keyof typeof AntDesign.glyphMap;
}

const Tab = createBottomTabNavigator<TabParamList>();

export default function App() {
  const [isReady, setIsReady] = useState<boolean>(false);
  const colors = useAppSelector(selectColors);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function prepare() {
      try {
        await useFonts();
        await dispatch(getInitialUserData());
        await dispatch(getAllPrograms());
      } catch (err) {
        console.error("err in useeffect App.tsx: ", err);
      } finally {
        setIsReady(true);
      }
    }
    prepare();
  }, []);

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
          initialRouteName="Home"
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
