import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AddExerciseType,
  Day,
  NewExercise,
  SetType,
  UpdateNewDay,
} from "../../types/types";
import { getUniqueId } from "../../utils/getUniqueId";
import type { RootState } from "../store/store";

interface NewProgramState {
  name: string;
  days: Day[];
  exercises: AddExerciseType[];
  sets: SetType[];
  status: "idle" | "pending" | "succeeded" | "failed";
}

const initialSetState: SetType = {
  setRankOrder: 0,
  isAmrap: false,
  noReps: 0,
  type: "percentage",
  percentageMultiplier: null,
  weight: 0,
  setId: 0,
  exerciseId: null,
  dayId: null,
};

// no need for unique exercise id because exercise from sqlite db will have one
const initialExerciseState: NewExercise = {
  exerciseRankOrder: 0,
  dayId: null,
};

const initialDayState: Day = {
  dayRankOrder: 0,
  dayId: getUniqueId(),
  name: "",
};

const initialState: NewProgramState = {
  name: "",
  days: [{ ...initialDayState }],
  exercises: [],
  sets: [],
  status: "idle",
};

export const newProgramSlice = createSlice({
  name: "newProgram",
  initialState,
  reducers: {
    // adds new day with given dayId and updated day rank order
    addNewProgramDay(state: NewProgramState, action: PayloadAction<number>) {
      let newDay = { ...initialDayState };
      newDay.dayId = action.payload;
      let currentRankOrder = 0;
      state.days.forEach((day) => {
        if (day.dayRankOrder > currentRankOrder) {
          currentRankOrder = day.dayRankOrder;
        }
      });
      newDay.dayRankOrder == currentRankOrder + 1;
      state.days.push(newDay);
    },
    // adds new exercise to specific new program day with updated exercise rank order and given dayId
    addNewProgramExercise(
      state: NewProgramState,
      action: PayloadAction<UpdateNewDay>
    ) {
      const { dayId, exercise } = action.payload;
      let newExercise: AddExerciseType = {
        ...exercise,
        ...initialExerciseState,
      };
      let currentExerciseRankOrder = 0;
      state.exercises.forEach((exercise) => {
        if (exercise.exerciseRankOrder > currentExerciseRankOrder) {
          currentExerciseRankOrder = exercise.exerciseRankOrder;
        }
      });
      newExercise.exerciseRankOrder = currentExerciseRankOrder + 1;
      newExercise.dayId = dayId;
      state.exercises.push(newExercise);
    },
    // adds new set to sets with updated set rank order and given dayId, exerciseId, and provided setId
    addNewProgramSet(
      state: NewProgramState,
      action: PayloadAction<{
        dayId: number;
        exerciseId: number;
        setId: number;
      }>
    ) {
      const { dayId, exerciseId, setId } = action.payload;
      let newSet = { ...initialSetState };
      newSet.setId = setId;
      newSet.exerciseId = exerciseId;
      newSet.dayId = dayId;
      state.sets.push(newSet);
    },
    // updates specific set with updated user data
    updateNewProgramSet(
      state: NewProgramState,
      action: PayloadAction<number>
    ) {},
  },
  extraReducers: (builder) => {},
});

export const { addNewProgramExercise, addNewProgramSet, updateNewProgramSet } =
  newProgramSlice.actions;

export const selectNewProgramDays = (state: RootState) => state.newProgram.days;
export const selectNewProgramExercises = (state: RootState) =>
  state.newProgram.exercises;
export const selectNewProgramSets = (state: RootState) => state.newProgram.sets;

export const getNewProgramExercisesByDayId = createSelector(
  [selectNewProgramExercises, (state, dayId) => dayId],
  (newExercises, dayId) => {
    console.log("dayId: ", dayId);
    console.log("newExercises: ", newExercises);
    return newExercises.filter((exercise) => exercise.dayId == dayId);
  }
);

export const getSetsByDayAndExerciseId = createSelector(
  [
    selectNewProgramSets,
    (state, dayId, exerciseId) => {
      return { dayId, exerciseId };
    },
  ],
  (sets, { dayId, exerciseId }) => {
    return sets.filter(
      (set) => set.dayId == dayId && set.exerciseId == exerciseId
    );
  }
);

export default newProgramSlice.reducer;
