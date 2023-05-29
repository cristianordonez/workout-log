import { yupResolver } from "@hookform/resolvers/yup";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import * as yup from "yup";
import { Button } from "../components/button/Button";
import { Input } from "../components/input/Input";
import { NewDay } from "../components/new-day/index";
import { selectColors } from "../redux/reducers/themeReducer";
import { useAppSelector } from "../redux/redux-hooks/hooks";
import { RootStackParamList } from "../types/types";
import { globalStyles } from "./globalStyles";

type HomeProps = NativeStackScreenProps<RootStackParamList, "AddProgram">;
const formSchema = yup.object().shape({
  email: yup
    .string()
    .email("Pleae enter a valid email address.")
    .required("Email is required")
    .min(3, "Username must be at least 3 characters long"),
  password: yup
    .string()
    .required("Password is required")
    .min(3, "Password must be at 5 char long"),
  confirmPassword: yup
    .string()
    .required("Password is required")
    .oneOf([yup.ref("password")], "Passwords do not match"),
});

interface Form {
  programName: string;
}

interface Day {
  day: number;
}

export function AddProgram({ navigation }: HomeProps) {
  const colors = useAppSelector(selectColors);

  const formOptions = { resolver: yupResolver(formSchema) };
  const { control, handleSubmit, setError, formState } =
    useForm<Form>(formOptions);
  const { errors } = formState;

  // start with 1 default day
  const [days, setDays] = useState<Day[]>([{ day: 1 }]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View
          style={{
            flex: 1,
            paddingRight: 75,
          }}
        >
          <Input
            name="program-name"
            label="Edit Program Name"
            control={control}
          />
        </View>
      ),
    });
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView style={globalStyles.screen}>
        {days.map((currentDay) => (
          <NewDay key={currentDay.day} day={currentDay.day} control={control} />
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
