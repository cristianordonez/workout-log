import { GestureResponderEvent, Pressable } from "react-native";
import { selectColors } from "../../redux/reducers/themeReducer";
import { useAppSelector } from "../../redux/redux-hooks/hooks";
import { CustomText } from "../custom-text/CustomText";
import { makeButtonStyles } from "./makeButtonStyles";

interface Props {
  text: string;
  handlePress: (event: GestureResponderEvent) => void;
}

export function Button({ text, handlePress }: Props) {
  const colors = useAppSelector(selectColors);
  const styles = makeButtonStyles(colors);

  return (
    <Pressable
      style={({ pressed }) => [
        pressed ? styles.btnPressed : styles.btnDefault,
        styles.btn,
      ]}
      onPress={handlePress}
    >
      <CustomText humanText={text} type="p" />
    </Pressable>
  );
}
