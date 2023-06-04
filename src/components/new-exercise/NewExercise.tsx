import { AntDesign } from "@expo/vector-icons";
import { useFieldArray, useFormContext } from "react-hook-form";
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
  const sets = useAppSelector((state) =>
    getSetsByDayAndExerciseId(state, dayId, exerciseId)
  );
  const { control } = useFormContext();

  // field arrays for sets
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional: if you are using FormContext)
      name: "sets",
    }
  );

  return (
    <View>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <CustomText humanText={formatTitle(name)} type="h3" />
        <AntDesign name="edit" size={24} color="#ffffff" />
      </View>
      <View>
        <CustomText humanText="Set" type="h4" />
        {sets.map((set) => (
          <NewSet
            key={set.setId}
            setRankOrder={set.rankOrder}
            setId={set.setId}
          />
        ))}
      </View>
      <Button
        text="Add Set"
        handlePress={() => handleAddSet(exerciseId)}
        type="text"
        size="lg"
      />
    </View>
  );
}
