import { View } from "react-native";
import { CustomText } from "../custom-text/CustomText";

interface Props {}

export function NewSet({}: Props) {
  return (
    <View>
      <CustomText humanText="new set" />
    </View>
  );
}
