import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Button } from "../../components/button/Button";
import { InputHeader } from "../../components/input-header/InputHeader";
import { NewDay } from "../../components/new-day/index";
import { ProgramForm, RootStackParamList } from "../../types/types";
import { globalStyles } from "../globalStyles";

type HomeProps = NativeStackScreenProps<RootStackParamList, "AddProgram">;

interface Day {
  day: number;
}

export function AddProgram({ navigation }: HomeProps) {
  const [days, setDays] = useState<Day[]>([{ day: 1 }]);
  const { control, handleSubmit, setError, formState } = useForm<ProgramForm>({
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
        {days.map((currentDay) => (
          <NewDay
            key={currentDay.day}
            day={currentDay.day}
            control={control}
            id={currentDay.day}
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
