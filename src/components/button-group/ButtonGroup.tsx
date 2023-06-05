import { View } from "react-native";
import { selectColors } from "../../redux/reducers/themeReducer";
import { useAppSelector } from "../../redux/redux-hooks/hooks";
import { Button } from "../button/Button";
import { makeButtonGroupStyles } from "./makeButtonGroupStyles";

interface Props {
  buttons: string[];
  selectedIndex: number;
  handlePress: (index: number) => void;
}
export const ButtonGroup = ({ buttons, selectedIndex, handlePress }: Props) => {
  const colors = useAppSelector(selectColors);
  const customGroupStyles = makeButtonGroupStyles(colors);

  return (
    <View>
      {buttons.map((button, index) => (
        <Button text={button} handlePress={() => handlePress(index)} />
      ))}

      {/* <
      buttons={buttons}
      selectedIndex={selectedIndex}
      containerStyle={customGroupStyles.container}
      onPress={(value) => setSelectedIndex(value)}
      buttonContainerStyle={customGroupStyles.buttonContainer}
    /> */}
    </View>
  );
};
