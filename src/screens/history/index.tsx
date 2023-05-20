import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HistoryStackParamList } from "../../types/types";
import { HistoryScreen } from "./HistoryScreen";

const HistoryStack = createNativeStackNavigator<HistoryStackParamList>();

export function History() {
  return (
    <HistoryStack.Navigator screenOptions={{ headerShown: false }}>
      <HistoryStack.Screen name="HistoryScreen" component={HistoryScreen} />
    </HistoryStack.Navigator>
  );
}
