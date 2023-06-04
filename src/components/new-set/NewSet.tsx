import { useFormContext } from "react-hook-form";
import { View } from "react-native";
import { selectColors } from "../../redux/reducers/themeReducer";
import { useAppSelector } from "../../redux/redux-hooks/hooks";
import { CustomText } from "../custom-text/CustomText";
import { Input } from "../input/Input";
import { makeNewSetStyles } from "./makeNewSetStyles";

interface Props {
  setRankOrder: number;
  setId: number;
  //   type: "Absolute" | "Percentage";
  //   reps: number;
  //   amrap: boolean;
}

export function NewSet({ setRankOrder, setId }: Props) {
  const { control } = useFormContext();
  const colors = useAppSelector(selectColors);
  const styles = makeNewSetStyles(colors);

  return (
    <View style={styles.container}>
      <CustomText humanText={String(setRankOrder)} />
      <View>
        <View style={styles.container}>
          <CustomText humanText="Type: " />
          <Input name="test" label="Type" control={control} />
        </View>
        <CustomText humanText="Amount: " />
      </View>
      <View>
        <CustomText humanText="Reps: " />
        <CustomText humanText="AMRAP: " />
      </View>
      <View></View>
    </View>
  );
}
