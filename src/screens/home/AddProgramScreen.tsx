import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View } from "react-native";
import { selectColors } from "../../redux/reducers/themeReducer";
import { useAppSelector } from "../../redux/redux-hooks/hooks";
import { HomeStackParamList } from "../../types/types";
import { globalStyles } from "../globalStyles";

type HomeProps = NativeStackScreenProps<HomeStackParamList, "AddProgramScreen">;

export function AddProgramScreen({ navigation }: HomeProps) {
  const colors = useAppSelector(selectColors);

  return <View style={globalStyles.screen}></View>;
}
