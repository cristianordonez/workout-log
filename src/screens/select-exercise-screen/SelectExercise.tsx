import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import {
  DeviceEventEmitter,
  FlatList,
  Keyboard,
  SafeAreaView,
  TouchableWithoutFeedback,
} from "react-native";
import { Exercise } from "../../components/exercise/Exercise";
import { InputHeader } from "../../components/input-header/InputHeader";
import {
  selectMatchingExercises,
  updateSearchQuery,
} from "../../redux/reducers/exercisesReducer";
import { useAppDispatch, useAppSelector } from "../../redux/redux-hooks/hooks";
import { ExerciseType, RootStackParamList } from "../../types/types";
import { globalStyles } from "../globalStyles";

type HomeProps = NativeStackScreenProps<RootStackParamList, "SelectExercise">;

export function SelectExercise({ navigation, route }: HomeProps) {
  const dispatch = useAppDispatch();
  const exercises = useAppSelector(selectMatchingExercises);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const { control } = useForm({
    defaultValues: {
      searchQuery: "",
    },
  });
  const { eventId } = route.params;

  // watch the search query value in input
  const searchQuery = useWatch({
    control,
    name: "searchQuery",
  });

  // update searchquery string in redux with watch input value
  useEffect(() => {
    setRefreshing(true);
    dispatch(updateSearchQuery(searchQuery));
    setRefreshing(false);
  }, [searchQuery]);

  // update the header of current screen with custom search input bar
  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <InputHeader name="searchQuery" label="Search" control={control} />
      ),
    });
  }, []);

  // render exercise item with onPress handler that return id of selected exercise
  const renderItem = ({ item }: { item: ExerciseType }) => {
    const handleItemPress = () => {
      DeviceEventEmitter.emit(eventId, item.id);
      navigation.goBack();
    };
    return <Exercise item={item} onPress={handleItemPress} />;
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={[globalStyles.screen, globalStyles.margin]}>
        <FlatList
          data={exercises}
          renderItem={renderItem}
          refreshing={refreshing}
          keyExtractor={(item: ExerciseType) => item.id.toString()}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
