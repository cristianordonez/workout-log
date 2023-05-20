import { Pressable } from "react-native";
import { selectColors } from "../../redux/reducers/themeReducer";
import { useAppSelector } from "../../redux/redux-hooks/hooks";
import { createFlexGap } from "../../utils/createFlexGap";

interface Props {
  children: React.ReactNode;
  itemsPerRow: number;
  gap: number;
  index: number;
  handlePress: (index: number) => void;
}

export const CustomScreenContainerItem = ({
  children,
  itemsPerRow,
  gap,
  index,
  handlePress,
}: Props) => {
  const colors = useAppSelector(selectColors);
  const { height, width, marginHorizontal, marginVertical } = createFlexGap(
    itemsPerRow,
    gap
  );

  return (
    <Pressable
      onPress={() => handlePress(index)}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? colors.primary : colors.card,
          height: height,
          width: width,
          marginVertical: marginVertical,
          marginHorizontal: marginHorizontal,
          alignItems: "center",
          justifyContent: "space-evenly",
          borderRadius: 20,
        },
      ]}
    >
      {children}
    </Pressable>
  );
};