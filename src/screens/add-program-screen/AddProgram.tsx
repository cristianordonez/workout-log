import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
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
  const { control } = useForm<ProgramForm>({
    defaultValues: {
      programName: "",
    },
  });

  useEffect(() => {
    navigation.setOptions({
      headerTitleAlign: "center",
      headerTitle: () => (
        <InputHeader
          name="programName"
          label="Edit Program Name"
          control={control}
        />
      ),
    });
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView style={globalStyles.screen}>
        {days.map((currentDay, index) => (
          <NewDay
            key={currentDay.dayRankOrder}
            dayId={currentDay.dayId}
            dayRankOrder={currentDay.dayRankOrder}
            control={control}
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
            handlePress={() => console.log("pressed")}
          />
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
