import { Dimensions, View } from "react-native";
import { FormControlType } from "../../types/types";
import { Input } from "../input/Input";

interface Props {
  name: string;
  label: string;
  control: FormControlType;
}

export function InputHeader({ control, name, label }: Props) {
  const windowWidth = Dimensions.get("window").width;
  return (
    <View
      style={{
        width: windowWidth - 50,
      }}
    >
      <Input name={name} label={label} control={control} />
    </View>
  );
}
