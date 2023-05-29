import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { HeaderDate } from "../components/header-date/HeaderDate";
import { useFonts } from "../hooks/useFonts";
import { getInitialExercises } from "../redux/reducers/exercisesReducer";
import { getAllPrograms } from "../redux/reducers/programsReducer";
import { selectColors } from "../redux/reducers/themeReducer";
import { getInitialUserData } from "../redux/reducers/userReducer";
import { useAppDispatch, useAppSelector } from "../redux/redux-hooks/hooks";
import { RootStackParamList } from "../types/types";
import { AddProgram } from "./add-program-screen/AddProgram";
import { SelectExercise } from "./select-exercise-screen/SelectExercise";
import { TabStack } from "./tab-stack/TabStack";

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
        await dispatch(getInitialExercises());
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

  const RootStack = createNativeStackNavigator<RootStackParamList>();
  if (isReady) {
    return (
      <NavigationContainer theme={NavigationTheme}>
        <RootStack.Navigator
          initialRouteName="TabStack"
          screenOptions={({ route }) => ({
            headerStyle: { backgroundColor: colors.background },
            headerTitle: (props) => <HeaderDate {...props} />,
            headerTitleAlign: "center",
            headerShadowVisible: false,
            headerBackTitleVisible: false,
          })}
        >
          <RootStack.Screen name="TabStack" component={TabStack} />
          <RootStack.Screen name="AddProgram" component={AddProgram} />
          <RootStack.Group screenOptions={{ presentation: "modal" }}>
            <RootStack.Screen
              name="SelectExercise"
              component={SelectExercise}
            />
          </RootStack.Group>
        </RootStack.Navigator>
      </NavigationContainer>
    );
  } else {
    return <></>;
  }
}
