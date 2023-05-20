import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SettingsStackParamList } from "../../types/types";
import { SettingsScreen } from "./SettingsScreen";

const SettingsStack = createNativeStackNavigator<SettingsStackParamList>();

export function Settings() {
  return (
    <SettingsStack.Navigator screenOptions={{ headerShown: false }}>
      <SettingsStack.Screen name="SettingsScreen" component={SettingsScreen} />
    </SettingsStack.Navigator>
  );
}
