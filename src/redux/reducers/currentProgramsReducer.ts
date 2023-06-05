import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Program } from "../../types/types";
import { getData } from "../api/api";
import type { RootState } from "../store/store";

interface CurrentProgramsState {
  allPrograms: any[];
  upcomingWorkouts: any[];
  status: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: CurrentProgramsState = {
  allPrograms: [],
  upcomingWorkouts: [],
  status: "idle",
};

// updates initial state with all currentPrograms from sqlite file
export const getAllPrograms = createAsyncThunk<
  Program[],
  void,
  { state: RootState }
>("currentPrograms/getAllPrograms", async (_, { rejectWithValue }) => {
  try {
    const sql = "SELECT * FROM programs";
    const programs = await getData(sql);
    return programs;
  } catch (err) {
    console.error("Error in getAllPrograms; ", err);
    return rejectWithValue(err);
  }
});

export const currentProgramsSlice = createSlice({
  name: "currentPrograms",
  initialState,
  reducers: {
    //// beginActiveWorkout(state) {
    ////   if (state.isWorkoutActive) {
    ////   } else {
    ////     let interval;
    ////     state.isWorkoutActive = true;
    ////     interval = window.setInterval(() => {
    ////       state.timerInSeconds++;
    ////     }, 1000);
    ////   }
    //// },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPrograms.fulfilled, (state, action) => {
        if (action.payload.length) {
          console.log("action.payload in getAllPrograms: ");
        }
        state.status = "succeeded";
      })
      .addCase(getAllPrograms.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const {} = currentProgramsSlice.actions;

export const selectAllPrograms = (state: RootState) =>
  state.currentPrograms.allPrograms;

export const selectUpcomingWorkouts = (state: RootState) =>
  state.currentPrograms.upcomingWorkouts;

export default currentProgramsSlice.reducer;
