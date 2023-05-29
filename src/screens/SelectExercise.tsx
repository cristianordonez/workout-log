import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { CustomText } from "../components/custom-text/CustomText";
import { getExercisesByName } from "../redux/reducers/exercisesReducer";
import { useAppDispatch } from "../redux/redux-hooks/hooks";
import { Exercise, RootStackParamList } from "../types/types";

type HomeProps = NativeStackScreenProps<RootStackParamList, "SelectExercise">;

export function SelectExercise({ navigation }: HomeProps) {
  const dispatch = useAppDispatch();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("bench");

  //   todo call flatlist shape of items and display with flatlist
  // todo call renderitem for each item in flatlist
  const updateExercises = async () => {
    const currentExercises = await dispatch(
      getExercisesByName(searchQuery)
    ).unwrap();
    console.log("currentExercises: ", currentExercises[0]);
    setExercises(currentExercises);
  };

  useEffect(() => {
    updateExercises();
  }, [searchQuery]);

  return (
    <SafeAreaView>
      {exercises.map((exercise: Exercise) => (
        <CustomText key={exercise.id} humanText={exercise.name} />
      ))}
    </SafeAreaView>
  );
}
