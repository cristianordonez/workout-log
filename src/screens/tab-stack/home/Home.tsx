import { CommonActions } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { GestureResponderEvent, View } from "react-native";
import { Button } from "../../../components/button/Button";
import { CustomText } from "../../../components/custom-text/CustomText";
import { SquareContainer } from "../../../components/square-container/SquareContainer";
import {
  selectAllPrograms,
  selectUpcomingWorkouts,
} from "../../../redux/reducers/programsReducer";
import { selectColors } from "../../../redux/reducers/themeReducer";
import { useAppSelector } from "../../../redux/redux-hooks/hooks";
import { TabParamList } from "../../../types/types";
import { globalStyles } from "../../globalStyles";
import { makeHomeStyles } from "./makeHomeStyles";
type HomeProps = NativeStackScreenProps<TabParamList, "Home">;

export function Home({ navigation }: HomeProps) {
  const upcomingWorkouts = useAppSelector(selectUpcomingWorkouts);
  const allPrograms = useAppSelector(selectAllPrograms);
  const colors = useAppSelector(selectColors);
  const styles = makeHomeStyles(colors);

  // handles action for quick start btn

  const handlePress = (event: GestureResponderEvent) => {
    console.log("event: ", event);
    navigation.getParent()?.dispatch(
      CommonActions.navigate({
        name: "AddProgram",
        params: {},
      })
    );
  };
  return (
    <View style={globalStyles.screen}>
      {/* Upcoming workouts section */}
      {upcomingWorkouts.length ? (
        <View style={styles.mainSection}>
          <CustomText humanText="Upcoming workouts" type="h0" />
        </View>
      ) : null}
      {/* My Programs section */}
      <View style={styles.mainSection}>
        <CustomText humanText="My Programs" type="h0" />
        <SquareContainer index={0} handlePress={() => console.log("here")}>
          <CustomText
            humanText="Tap to Add New Program"
            type="h3"
            textAlign="center"
            color="primary"
          />
        </SquareContainer>
        {allPrograms.map((program, index) => (
          <SquareContainer index={index} handlePress={() => null}>
            <CustomText humanText="" type="h0" />
          </SquareContainer>
        ))}
      </View>
      {/* Quick Start section */}
      <View style={styles.mainSection}>
        <CustomText humanText="Quick Start" type="h0" />
        <Button text="Start an Empty Workout" handlePress={handlePress} />
      </View>
    </View>
  );
}
