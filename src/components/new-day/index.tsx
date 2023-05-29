import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { View } from "react-native";
import { selectColors } from "../../redux/reducers/themeReducer";
import { useAppSelector } from "../../redux/redux-hooks/hooks";
import { Exercise, RootStackParamList } from "../../types/types";
import { Button } from "../button/Button";
import { CustomText } from "../custom-text/CustomText";
import { Input } from "../input/Input";

interface Props {
  day: number;
  // change type any
  control: any;
}

export function NewDay({ day, control }: Props) {
  const [workoutExercises, setWorkoutExercises] = useState<Exercise[]>([]);
  const colors = useAppSelector(selectColors);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleAddExercise = () => {
    navigation.navigate({ name: "SelectExercise", params: {} });
  };

  return (
    <View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          backgroundColor: colors.card,
          height: 50,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={{ flex: 1 }}>
          <CustomText humanText={`Day ${day}`} color="text" />
        </View>
        <View style={{ flex: 2 }}>
          <Input control={control} name="" label="Edit Day Name" />
        </View>
      </View>
      {workoutExercises.map((exercise) => (
        <CustomText humanText="exercise test" />
      ))}
      <Button
        text="Add Exercise"
        handlePress={handleAddExercise}
        type="text"
        size="xl"
      />
    </View>
  );
}
