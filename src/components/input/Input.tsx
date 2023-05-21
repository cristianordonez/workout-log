import { useController } from "react-hook-form";
import { KeyboardTypeOptions, TextInput } from "react-native";
import { selectColors } from "../../redux/reducers/themeReducer";
import { useAppSelector } from "../../redux/redux-hooks/hooks";
import { TextContentType } from "../../types/types";
import { makeInputStyles } from "./makeInputStyles";

interface Props {
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions | undefined;
  textContentType?: TextContentType;
  label: string;
  control: any;
  // control: Control<SignupForm | LoginForm, unknown>;
  name: string;
}

export const Input = ({
  secureTextEntry = false,
  keyboardType = "default",
  textContentType = "none",
  label,
  control,
  name,
}: Props) => {
  const {
    field,
    fieldState: { invalid, isTouched, isDirty },
    formState: { touchedFields, dirtyFields },
  } = useController({
    name,
    control,
    rules: { required: true },
  });
  const colors = useAppSelector(selectColors);
  const styles = makeInputStyles(colors);

  return (
    <TextInput
      onBlur={field.onBlur}
      onChangeText={field.onChange}
      value={field.value}
      placeholder={label}
      secureTextEntry={secureTextEntry}
      keyboardAppearance="dark"
      keyboardType={keyboardType}
      style={styles.input}
      textContentType={textContentType}
      returnKeyType="done"
      textAlign="center"
    />
  );
};
