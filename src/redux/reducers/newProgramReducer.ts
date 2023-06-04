import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AddExerciseType,
  Day,
  NewExercise,
  SetType,
  UpdateNewDay,
} from "../../types/types";
import { getUniqueId } from "../../utils/getUniqueId";
import { getUpdatedRankOrder } from "../../utils/getUpdatedRankOrder";
import type { RootState } from "../store/store";

interface NewProgramState {
  name: string;
  days: Day[];
  exercises: AddExerciseType[];
  sets: SetType[];
  status: "idle" | "pending" | "succeeded" | "failed";
}

const initialSetState: SetType = {
  rankOrder: 0,
  isAmrap: false,
  noReps: 0,
  type: "percentage",
  percentageMultiplier: 0,
  weight: 0,
  setId: 0,
  exerciseId: 0,
  dayId: 0,
};

// no need for unique exercise id because exercise from sqlite db will have one
const initialExerciseState: NewExercise = {
  rankOrder: 0,
  dayId: 0,
};

const initialDayState: Day = {
  rankOrder: 0,
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
      const currentRankOrder = getUpdatedRankOrder(state.days);
      newDay.rankOrder == currentRankOrder;
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
      const currentExerciseRankOrder = getUpdatedRankOrder(state.exercises);
      newExercise.rankOrder = currentExerciseRankOrder;
      newExercise.dayId = dayId;
      state.exercises.push(newExercise);
    },
    // adds new set to sets with updated set rank order and given dayId, exerciseId, and provided setId
    addNewProgramSet(
      state: NewProgramState,
      action: PayloadAction<{
        dayId: number;
        exerciseId: number;
      }>
    ) {
      const { dayId, exerciseId } = action.payload;
      let newSet = { ...initialSetState };
      newSet.setId = getUniqueId();
      newSet.exerciseId = exerciseId;
      newSet.dayId = dayId;
      const currentRankOrder = getUpdatedRankOrder(state.sets);
      newSet.rankOrder = currentRankOrder;
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
