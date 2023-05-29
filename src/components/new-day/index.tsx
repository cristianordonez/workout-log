import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { DeviceEventEmitter, View } from "react-native";
import { selectColors } from "../../redux/reducers/themeReducer";
import { useAppSelector } from "../../redux/redux-hooks/hooks";
import {
  ExerciseType,
  FormControlType,
  RootStackParamList,
} from "../../types/types";
import { Button } from "../button/Button";
import { CustomText } from "../custom-text/CustomText";
import { Input } from "../input/Input";
import { makeNewDayStyles } from "./makeNewDayStyles";

interface Props {
  day: number;
  control: FormControlType;
  id: number;
}

export function NewDay({ day, control, id }: Props) {
  const [workoutExercises, setWorkoutExercises] = useState<ExerciseType[]>([]);
  const colors = useAppSelector(selectColors);
  const styles = makeNewDayStyles(colors);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const eventId = `onExerciseSelected${id}`;

  useEffect(() => {
    const handleExerciseSelected = (exerciseId: number) => {
      console.log("exerciseId in NewDay component: ", exerciseId);
    };
    DeviceEventEmitter.addListener(eventId, handleExerciseSelected);
    return () => {
      DeviceEventEmitter.removeAllListeners(eventId);
    };
  }, []);
  // navigates to selectExercise screen modal
  const handleAddExercise = () => {
    navigation.navigate({
      name: "SelectExercise",
      params: { eventId },
    });
  };

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.programDay}>
          <CustomText humanText={`Day ${day}`} color="text" />
        </View>
        <View style={styles.dayInput}>
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
