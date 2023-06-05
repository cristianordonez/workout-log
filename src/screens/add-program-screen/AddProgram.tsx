import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import {
  FormProvider,
  UseFormReturn,
  useFieldArray,
  useForm,
} from "react-hook-form";
import {
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Button } from "../../components/button/Button";
import { InputHeader } from "../../components/input-header/InputHeader";
import { NewDay } from "../../components/new-day/NewDay";
import {
  AddExerciseType,
  Day,
  ProgramForm,
  RootStackParamList,
} from "../../types/types";
import { getUniqueId } from "../../utils/getUniqueId";
import { getUpdatedRankOrder } from "../../utils/getUpdatedRankOrder";
import { globalStyles } from "../globalStyles";

type HomeProps = NativeStackScreenProps<RootStackParamList, "AddProgram">;

const initialDayState: Day = {
  rankOrder: 0,
  dayId: getUniqueId(),
  name: "",
};

export function AddProgram({ navigation }: HomeProps) {
  const hookFormMethods: UseFormReturn<ProgramForm, any> = useForm<ProgramForm>(
    {
      defaultValues: {
        programName: "",
        days: [initialDayState],
        exercises: [] as AddExerciseType[],
        sets: [],
      },
    }
  );

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control: hookFormMethods.control,
      name: "days",
    }
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitleAlign: "center",
      headerTitle: () => (
        <InputHeader
          name="programName"
          label="Edit Program Name"
          control={hookFormMethods.control}
        />
      ),
    });
  }, []);

  const handleAddDay = () => {
    let newDay = { ...initialDayState };
    newDay.dayId = getUniqueId();
    const currentRankOrder = getUpdatedRankOrder(fields);
    newDay.rankOrder = currentRankOrder;
    append(newDay);
  };

  const onSubmit = (data: ProgramForm) => {
    console.log("data: ", data);
  };

  const onErrors = (errors: any) => {
    console.log("errors: ", errors);
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <FormProvider {...hookFormMethods}>
        <ScrollView style={globalStyles.screen}>
          {fields.map((field, index) => (
            <NewDay
              key={field.id}
              dayId={field.dayId}
              dayRankOrder={field.rankOrder}
              index={index}
            />
          ))}
          <View>
            <Button
              text="Add Day"
              color="secondary"
              handlePress={() => handleAddDay()}
            />
            <Button
              text="Enter Training Maxes"
              color="primary"
              handlePress={hookFormMethods.handleSubmit(onSubmit, onErrors)}
            />
          </View>
        </ScrollView>
      </FormProvider>
    </TouchableWithoutFeedback>
  );
}
