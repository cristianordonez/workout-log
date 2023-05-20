import { Dimensions } from "react-native";

export const createFlexGap = (itemsPerRow: number, gap: number) => {
  const totalGapSize = (itemsPerRow - 1) * gap;
  const windowWidth = Dimensions.get("window").width;
  const childWidth = (windowWidth - totalGapSize) / itemsPerRow;
  return {
    height: childWidth - 10,
    width: childWidth - 10,
    marginVertical: gap / 2,
    marginHorizontal: gap / 2,
  };
};
