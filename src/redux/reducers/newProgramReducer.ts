import { createSlice } from "@reduxjs/toolkit";
import { AddExerciseType, Day, SetType } from "../../types/types";
import type { RootState } from "../store/store";

interface NewProgramState {
  name: string;
  days: Day[];
  exercises: AddExerciseType[];
  sets: SetType[];
  status: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: NewProgramState = {
  name: "",
  days: [],
  exercises: [],
  sets: [],
  status: "idle",
};

export const newProgramSlice = createSlice({
  name: "newProgram",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export const {} = newProgramSlice.actions;

export const selectNewProgramDays = (state: RootState) => state.newProgram.days;

//// export const getSetsByDayAndExerciseId = createSelector(
////   [
////     selectNewProgramSets,
////     (state, dayId, exerciseId) => {
////       return { dayId, exerciseId };
////     },
////   ],
////   (sets, { dayId, exerciseId }) => {
////     return sets.filter(
////       (set) => set.dayId == dayId && set.exerciseId == exerciseId
////     );
////   }
//// );

export default newProgramSlice.reducer;
