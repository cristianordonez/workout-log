import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { DeviceEventEmitter, View } from "react-native";
import {
  addNewProgramExercise,
  addNewProgramSet,
  getNewProgramExercisesByDayId,
} from "../../redux/reducers/newProgramReducer";
import { selectColors } from "../../redux/reducers/themeReducer";
import { useAppDispatch, useAppSelector } from "../../redux/redux-hooks/hooks";
import {
  ExerciseType,
  FormControlType,
  RootStackParamList,
} from "../../types/types";
import { getUniqueId } from "../../utils/getUniqueId";
import { Button } from "../button/Button";
import { CustomText } from "../custom-text/CustomText";
import { Input } from "../input/Input";
import { NewExercise } from "../new-exercise/NewExercise";
import { makeNewDayStyles } from "./makeNewDayStyles";

interface Props {
  control: FormControlType;
  dayRankOrder: number;
  dayId: number;
}

export function NewDay({ control, dayRankOrder, dayId }: Props) {
  const dispatch = useAppDispatch();
  const newExercises = useAppSelector((state) =>
    getNewProgramExercisesByDayId(state, dayId)
  );
  const colors = useAppSelector(selectColors);
  const styles = makeNewDayStyles(colors);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const eventId = `onExerciseSelected${dayId}`;

  // called when selecting a new exercise from selectExercise screen to update new program exercises
  const handleExerciseSelected = (exercise: ExerciseType) => {
    dispatch(addNewProgramExercise({ dayId, exercise }));
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

  // updates new program exercise with new set object
  const handleAddSet = (exerciseId: number) => {
    const setId = getUniqueId();
    dispatch(addNewProgramSet({ dayId, exerciseId, setId }));
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
      {newExercises.map((exercise, index) => (
        <NewExercise
          key={exercise.id}
          exerciseId={exercise.id}
          name={exercise.name}
          exerciseRankOrder={index}
          dayId={dayId}
          handleAddSet={handleAddSet}
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
