import { Pressable } from "react-native";
import { selectColors } from "../../redux/reducers/themeReducer";
import { useAppSelector } from "../../redux/redux-hooks/hooks";
import { makeCheckboxStyles } from "./makeCheckboxStyles";

interface Props {
  toggled: boolean;
  handlePress: () => void;
}

export const Checkbox = ({ toggled, handlePress }: Props) => {
  const colors = useAppSelector(selectColors);
  const styles = makeCheckboxStyles(colors);

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        {
          backgroundColor: toggled ? colors.success : colors.card,
        },
        styles.container,
      ]}
    ></Pressable>
  );
};
