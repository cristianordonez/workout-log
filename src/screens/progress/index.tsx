import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ProgressStackParamList } from "../../types/types";
import { ProgressScreen } from "./ProgressScreen";

const ProgressStack = createNativeStackNavigator<ProgressStackParamList>();

export function Progress() {
  return (
    <ProgressStack.Navigator>
      <ProgressStack.Screen name="ProgressScreen" component={ProgressScreen} />
    </ProgressStack.Navigator>
  );
}
