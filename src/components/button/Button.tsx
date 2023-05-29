import { GestureResponderEvent, Pressable, View } from "react-native";
import { selectColors } from "../../redux/reducers/themeReducer";
import { useAppSelector } from "../../redux/redux-hooks/hooks";
import { Colors } from "../../types/types";
import { CustomText } from "../custom-text/CustomText";
import { makeButtonStyles } from "./makeButtonStyles";

interface Props {
  text: string;
  handlePress: (event: GestureResponderEvent) => void;
  color?: keyof Colors;
  textPressedColor?: keyof Colors;
  size?: "sm" | "md" | "lg" | "xl";
  type?: "button" | "text";
}

export function Button({
  text,
  handlePress,
  color = "primary",
  // the color of text when type is text and button is currently pressed
  textPressedColor = "text",
  size = "md",
  type = "button",
}: Props) {
  const colors = useAppSelector(selectColors);
  // pass down selected color to stylesheet to pick background color of button
  const styles = makeButtonStyles(color, colors);

  let btnSize:
    | typeof styles.sm
    | typeof styles.md
    | typeof styles.lg
    | typeof styles.xl;
  let textSize: "p" | "h3" | "h0" | "subtitle1";

  switch (size) {
    case "sm":
      btnSize = styles.sm;
      textSize = "subtitle1";
      break;
    case "md":
      btnSize = styles.md;
      textSize = "p";
      break;
    case "lg":
      btnSize = styles.lg;
      textSize = "h3";
      break;
    case "xl":
      btnSize = styles.xl;
      textSize = "h0";
      break;
  }

  return (
    <Pressable
      onPress={handlePress}
      style={styles.container}
      children={({ pressed }) =>
        type == "button" ? (
          <View
            style={[
              pressed ? styles.btnPressed : styles.btnDefault,
              styles.btn,
              btnSize,
            ]}
          >
            <CustomText humanText={text} />
          </View>
        ) : (
          <CustomText
            humanText={text}
            type={textSize}
            color={pressed ? textPressedColor : "button"}
          />
        )
      }
    />
  );
}
