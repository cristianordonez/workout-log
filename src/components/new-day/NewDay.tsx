import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { DeviceEventEmitter, View } from "react-native";
import { selectColors } from "../../redux/reducers/themeReducer";
import { useAppSelector } from "../../redux/redux-hooks/hooks";
import {
  AddExerciseType,
  ExerciseType,
  NewExerciseType,
  RootStackParamList,
} from "../../types/types";
import { getUpdatedRankOrder } from "../../utils/getUpdatedRankOrder";
import { Button } from "../button/Button";
import { CustomText } from "../custom-text/CustomText";
import { Input } from "../input/Input";
import { NewExercise } from "../new-exercise/NewExercise";
import { makeNewDayStyles } from "./makeNewDayStyles";

interface Props {
  dayRankOrder: number;
  dayId: number;
  index: number;
}

const initialExerciseState: NewExerciseType = {
  rankOrder: 0,
  dayId: 0,
  exerciseId: 0,
};

export function NewDay({ index, dayRankOrder, dayId }: Props) {
  const colors = useAppSelector(selectColors);
  const styles = makeNewDayStyles(colors);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const eventId = `onExerciseSelected${dayId}`;
  const { control } = useFormContext();
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: `days.${index}.exercises` as "days.0.exercises",
    }
  );
  const exercises = fields as unknown as AddExerciseType[];

  // called when selecting a new exercise from selectExercise screen to update new program exercises
  const handleExerciseSelected = (exercise: ExerciseType) => {
    let newExercise: AddExerciseType = {
      ...exercise,
      ...initialExerciseState,
    };
    newExercise["id"] = newExercise["exerciseId"];
    delete newExercise["id"];
    const currentExerciseRankOrder = getUpdatedRankOrder(exercises);
    newExercise.rankOrder = currentExerciseRankOrder;
    newExercise.dayId = dayId;
    append(newExercise);
  };

  // create the event emitters to get selected dayId of exercise
  useEffect(() => {
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
          <CustomText humanText={`Day ${dayRankOrder + 1}`} color="text" />
        </View>
        <View style={styles.dayInput}>
          <Input control={control} name="" label="Edit Day Name" />
        </View>
      </View>
      {exercises.map((exercise, index) => (
        <NewExercise
          key={exercise.id}
          exerciseId={exercise.exerciseId}
          name={exercise.name}
          exerciseRankOrder={exercise.rankOrder}
          dayId={dayId}
          index={index}
        />
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
