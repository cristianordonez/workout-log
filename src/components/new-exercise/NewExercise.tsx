import { AntDesign } from "@expo/vector-icons";
import { View } from "react-native";
import { getSetsByDayAndExerciseId } from "../../redux/reducers/newProgramReducer";
import { useAppSelector } from "../../redux/redux-hooks/hooks";
import { formatTitle } from "../../utils/formatTitle";
import { Button } from "../button/Button";
import { CustomText } from "../custom-text/CustomText";
import { NewSet } from "../new-set/NewSet";

interface Props {
  exerciseId: number;
  dayId: number;
  name: string;
  exerciseRankOrder: number;
  handleAddSet: (exerciseRankOrder: number) => void;
}

export function NewExercise({
  exerciseId,
  dayId,
  name,
  exerciseRankOrder,
  handleAddSet,
}: Props) {
  console.log("name: ", name);
  const sets = useAppSelector((state) =>
    getSetsByDayAndExerciseId(state, dayId, exerciseId)
  );
  console.log("sets: ", sets);

  return (
    <View>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <CustomText humanText={formatTitle(name)} type="h3" />
        <AntDesign name="edit" size={24} color="#ffffff" />
      </View>
      {sets.map((set) => (
        <NewSet key={set.setId} />
      ))}
      <Button
        text="Add Set"
        handlePress={() => handleAddSet(exerciseId)}
        type="text"
        size="lg"
      />
    </View>
  );
}
