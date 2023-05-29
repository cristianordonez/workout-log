import { Entypo } from "@expo/vector-icons";
import { GestureResponderEvent, TouchableOpacity, View } from "react-native";
import { selectColors } from "../../redux/reducers/themeReducer";
import { useAppSelector } from "../../redux/redux-hooks/hooks";
import { ExerciseType } from "../../types/types";
import { formatTitle } from "../../utils/formatTitle";
import { CustomText } from "../custom-text/CustomText";
import { makeExerciseStyles } from "./makeExerciseStyles";

interface Props {
  item: ExerciseType;
  onPress: (event: GestureResponderEvent) => void;
}

export function Exercise({ item, onPress }: Props) {
  const colors = useAppSelector(selectColors);
  const styles = makeExerciseStyles(colors);
  return (
    <TouchableOpacity onPress={onPress} style={styles.exerciseContainer}>
      <View style={styles.name}>
        <CustomText
          humanText={formatTitle(item.name)}
          type="h3"
          gap={false}
          opacity={true}
          textAlign="left"
        />
      </View>
      <View style={styles.icon}>
        <Entypo name="info-with-circle" size={24} color={colors.border} />
      </View>
    </TouchableOpacity>
  );
}
