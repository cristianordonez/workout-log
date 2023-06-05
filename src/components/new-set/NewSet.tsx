import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { View } from "react-native";
import { selectColors } from "../../redux/reducers/themeReducer";
import { useAppSelector } from "../../redux/redux-hooks/hooks";
import { ButtonGroup } from "../button-group/ButtonGroup";
import { Checkbox } from "../checkbox/Checkbox";
import { CustomText } from "../custom-text/CustomText";
import { Input } from "../input/Input";
import { makeNewSetStyles } from "./makeNewSetStyles";

interface Props {
  setRankOrder: number;
  setId: number;
  index: number;
}

export function NewSet({ setRankOrder, setId, index }: Props) {
  const { control } = useFormContext();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [toggled, setToggled] = useState<boolean>(false);
  const colors = useAppSelector(selectColors);
  const styles = makeNewSetStyles(colors);

  const handleCheckboxPress = () => {
    setToggled(!toggled);
  };

  const handleTypePress = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerColumn}>
        <CustomText humanText={String(setRankOrder)} />
      </View>
      <View style={styles.innerColumn}>
        <View style={styles.innerRow}>
          <CustomText humanText="Type: " type="subtitle1" />
          <ButtonGroup
            buttons={["absolute", "percentage"]}
            selectedIndex={selectedIndex}
            handlePress={handleTypePress}
          />
        </View>
        <View style={styles.innerRow}>
          <CustomText humanText="Amount: " type="subtitle1" />
          <Input name={`sets.${index}.amount`} label="Type" control={control} />
        </View>
      </View>

      <View style={styles.innerColumn}>
        <View style={styles.innerRow}>
          <CustomText humanText="Reps: " type="subtitle1" />
          <Input name={`sets.${index}.reps`} label="Reps" control={control} />
        </View>
        <View style={styles.innerRow}>
          <CustomText humanText="AMRAP: " type="subtitle1" />
          <Checkbox toggled={toggled} handlePress={handleCheckboxPress} />
        </View>
      </View>

      <View style={styles.innerColumn}>
        <FontAwesome name="remove" size={24} color={colors.black} />
      </View>
    </View>
  );
}
