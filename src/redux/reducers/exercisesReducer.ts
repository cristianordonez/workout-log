import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { ExerciseType } from "../../types/types";
import { getData } from "../api/api";
import type { RootState } from "../store/store";

interface ExerciseState {
  allExercises: ExerciseType[];
  searchQuery: string;
  status: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: ExerciseState = {
  allExercises: [],
  searchQuery: "",
  status: "idle",
};

// updates initial state with all programs from sqlite file
export const getInitialExercises = createAsyncThunk<
  ExerciseType[],
  void,
  { state: RootState }
>("programs/getAllPrograms", async (_, { rejectWithValue }) => {
  try {
    const sql = "select id, name, equipment, gif, body_part from exercises";
    const exercises = await getData(sql);
    return exercises;
  } catch (err) {
    console.error("err in get all exercises; ", err);
    return rejectWithValue(err);
  }
});

export const exercisesSlice = createSlice({
  name: "exercises",
  initialState,
  reducers: {
    updateSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInitialExercises.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getInitialExercises.fulfilled, (state, action) => {
        if (action.payload.length) {
          state.allExercises = action.payload;
        }
        state.status = "succeeded";
      })
      .addCase(getInitialExercises.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export const { updateSearchQuery } = exercisesSlice.actions;

export const selectAllExercises = (state: RootState) =>
  state.exercises.allExercises;

export const selectSearchQuery = (state: RootState) =>
  state.exercises.searchQuery;

//get a list of unique exercises found in currently selected program
export const selectMatchingExercises = createSelector(
  [
    selectAllExercises,
    (state: RootState) => {
      return state;
    },
  ],
  (exercises, state) => {
    return exercises.filter((exercise) =>
      exercise.name.startsWith(state.exercises.searchQuery.toLowerCase())
    );
  }
);
export default exercisesSlice.reducer;
