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
import { selectNewProgramDays } from "../../redux/reducers/newProgramReducer";
import { useAppSelector } from "../../redux/redux-hooks/hooks";
import { ProgramForm, RootStackParamList } from "../../types/types";
import { globalStyles } from "../globalStyles";

type HomeProps = NativeStackScreenProps<RootStackParamList, "AddProgram">;

export function AddProgram({ navigation }: HomeProps) {
  const days = useAppSelector(selectNewProgramDays);
  const hookFormMethods: UseFormReturn<ProgramForm, any> = useForm<ProgramForm>(
    {
      defaultValues: {
        programName: "",
        days: [{ name: "" }],
        sets: [
          {
            isAmrap: false,
            noReps: 0,
            type: "absolute",
            percentageMultiplier: 0,
            weight: 0,
          },
        ],
      },
    }
  );

  // field arrays for days
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

  const onSubmit = (data) => {
    console.log("data: ", data);
  };

  const onErrors = (errors) => {
    console.log("errors: ", errors);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <FormProvider {...hookFormMethods}>
        <ScrollView style={globalStyles.screen}>
          {days.map((currentDay, index) => (
            <NewDay
              key={currentDay.rankOrder}
              dayId={currentDay.dayId}
              dayRankOrder={currentDay.rankOrder}
            />
          ))}
          <View>
            <Button
              text="Add Day"
              color="secondary"
              handlePress={() => console.log("pressed")}
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
