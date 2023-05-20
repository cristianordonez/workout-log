import { Text } from "react-native";
import { selectColors, selectText } from "../../redux/reducers/themeReducer";
import { useAppSelector } from "../../redux/redux-hooks/hooks";

interface Props {
  humanText: string;
  type: "h0" | "h1" | "h2" | "h3" | "h4" | "p" | "subtitle1" | "subtitle2";
  textAlign?: "left" | "right" | "center";
  opacity?: boolean;
  gap?: boolean;
  color?:
    | "error"
    | "text"
    | "primary"
    | "secondary"
    | "button"
    | "success"
    | "black";
}

export const CustomText = ({
  textAlign = "center",
  opacity = false,
  gap = false,
  humanText,
  type,
  color,
}: Props) => {
  const colors = useAppSelector(selectColors);
  const text = useAppSelector(selectText);

  let currentColor;
  switch (color) {
    case "error":
      currentColor = colors.error;
      break;
    case "text":
      currentColor = colors.text;
      break;
    case "primary":
      currentColor = colors.primary;
      break;
    case "secondary":
      currentColor = colors.secondary;
      break;
    case "button":
      currentColor = colors.button;
      break;
    case "success":
      currentColor = colors.success;
      break;
    case "black":
      currentColor = colors.background;
      break;
    default:
      currentColor = colors.text;
  }

  let textStyle;
  switch (type) {
    case "h0":
      textStyle = text.h0;
      break;
    case "h1":
      textStyle = text.h1;
      break;
    case "h2":
      textStyle = text.h2;
      break;
    case "h3":
      textStyle = text.h3;
      break;
    case "p":
      textStyle = text.p;
      break;
    case "subtitle1":
      textStyle = text.subtitle1;
      break;
    case "subtitle2":
      textStyle = text.subtitle2;
      break;
    default:
      textStyle = text.p;
  }

  return (
    <Text
      style={[
        {
          textAlign,
          color: currentColor,
        },
        textStyle,
        opacity === true ? { opacity: 0.75 } : { opacity: 1 },
        gap === true ? { paddingBottom: 10 } : { paddingBottom: 0 },
      ]}
    >
      {humanText}
    </Text>
  );
};
