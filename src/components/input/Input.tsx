import { useController } from "react-hook-form";
import { KeyboardTypeOptions, TextInput } from "react-native";
import { selectColors } from "../../redux/reducers/themeReducer";
import { useAppSelector } from "../../redux/redux-hooks/hooks";
import { FormControlType, TextContentType } from "../../types/types";
import { makeInputStyles } from "./makeInputStyles";

interface Props {
  name: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions | undefined;
  textContentType?: TextContentType;
  label: string;
  control?: FormControlType;
}

export const Input = ({
  secureTextEntry = false,
  keyboardType = "default",
  textContentType = "none",
  control,
  label,
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
