import { AntDesign } from "@expo/vector-icons";
import { useFieldArray, useFormContext } from "react-hook-form";
import { View } from "react-native";
import { SetType } from "../../types/types";
import { formatTitle } from "../../utils/formatTitle";
import { getUniqueId } from "../../utils/getUniqueId";
import { getUpdatedRankOrder } from "../../utils/getUpdatedRankOrder";
import { Button } from "../button/Button";
import { CustomText } from "../custom-text/CustomText";
import { NewSet } from "../new-set/NewSet";

interface Props {
  exerciseId: number;
  dayId: number;
  name: string;
  exerciseRankOrder: number;
  index: number;
}

const initialSetState: SetType = {
  rankOrder: 0,
  isAmrap: false,
  noReps: 0,
  type: "percentage",
  percentageMultiplier: 0,
  weight: 0,
  setId: 0,
  exerciseId: 0,
  dayId: 0,
  id: "",
};

export function NewExercise({
  exerciseId,
  dayId,
  name,
  exerciseRankOrder,
  index,
}: Props) {
  const { control } = useFormContext();
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: `exercises.${index}.sets` as "exercises.0.sets",
    }
  );
  const sets = fields as unknown as SetType[];

  const handleAddSet = (exerciseId: number) => {
    let newSet = { ...initialSetState };
    newSet.setId = getUniqueId();
    newSet.exerciseId = exerciseId;
    newSet.dayId = dayId;
    const currentRankOrder = getUpdatedRankOrder(sets);
    newSet.rankOrder = currentRankOrder;
    append(newSet);
  };

  return (
    <View>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <CustomText humanText={formatTitle(name)} type="h3" />
        <AntDesign name="edit" size={24} color="#ffffff" />
      </View>
      <View style={{ display: "flex", gap: 20 }}>
        <CustomText humanText="Set" type="h4" />
        {sets.map((set, index) => (
          <NewSet
            key={set.id}
            setRankOrder={set.rankOrder}
            setId={set.setId}
            index={index}
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
