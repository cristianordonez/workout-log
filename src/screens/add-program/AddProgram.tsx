import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View } from "react-native";
import { selectColors } from "../../redux/reducers/themeReducer";
import { useAppSelector } from "../../redux/redux-hooks/hooks";
import { RootStackParamList } from "../../types/types";
import { globalStyles } from "../globalStyles";

type HomeProps = NativeStackScreenProps<RootStackParamList, "AddProgram">;

export function AddProgram({ navigation }: HomeProps) {
  const colors = useAppSelector(selectColors);

  return <View style={globalStyles.screen}></View>;
}
