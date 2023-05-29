import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Exercise } from "../../types/types";
import { getData } from "../api/api";
import type { RootState } from "../store/store";

interface ExerciseState {
  allExercises: Exercise[];
  currentExercises: Exercise[];
  status: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: ExerciseState = {
  allExercises: [],
  currentExercises: [],
  status: "idle",
};

// updates initial state with all programs from sqlite file
export const getInitialExercises = createAsyncThunk<
  Exercise[],
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

// get exercise by given search query
export const getExercisesByName = createAsyncThunk<
  Exercise[],
  string,
  { state: RootState }
>(
  "exercises/getExercisesByName",
  async (search_query: string, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      if (search_query.length == 0) {
        return state.exercises.allExercises;
      } else {
        const sql =
          "select id, name, equipment, gif, body_part from exercises where name like ?";
        const arg = "%" + search_query.toLowerCase() + "%";
        const allExercises = await getData(sql, arg);
        return allExercises;
      }
    } catch (err) {
      console.error("err in getExercisesByName: ", err);
      return rejectWithValue(err);
    }
  }
);

export const exercisesSlice = createSlice({
  name: "exercises",
  initialState,
  reducers: {},
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
      }),
      builder
        .addCase(getExercisesByName.fulfilled, (state, action) => {
          if (action.payload.length) {
            state.currentExercises = action.payload;
          }
        })
        .addCase(getExercisesByName.rejected, (state, action) => {
          console.log("action.payload: ", action.payload);
        });
  },
});

export const {} = exercisesSlice.actions;

export const selectAllExercises = (state: RootState) =>
  state.exercises.allExercises;

export default exercisesSlice.reducer;
