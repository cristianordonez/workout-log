import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getData } from "../api/api";
import type { RootState } from "../store/store";

const initialDayState = {
  day: 1,
};
const initialNewProgramState = {
  days: [initialDayState],
};
interface ProgramsState {
  all_programs: any[];
  upcoming_workouts: any[];
  status: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: ProgramsState = {
  all_programs: [],
  upcoming_workouts: [],
  status: "idle",
};

type Programs = string[];

// updates initial state with all programs from sqlite file
export const getAllPrograms = createAsyncThunk<
  Programs,
  void,
  { state: RootState }
>("programs/getAllPrograms", async (_, { rejectWithValue }) => {
  try {
    const sql = "select * from programs";
    const programs = await getData(sql);
    return programs;
  } catch (err) {
    console.error("err in get all programs; ", err);
    return rejectWithValue(err);
  }
});

export const programsSlice = createSlice({
  name: "programs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPrograms.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getAllPrograms.fulfilled, (state, action) => {
        if (action.payload.length) {
          // todo update state.programs.all_programs array
          console.log("action.payload in getprograms: ");
        }
        state.status = "succeeded";
      })
      .addCase(getAllPrograms.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export const {} = programsSlice.actions;

export const selectAllPrograms = (state: RootState) =>
  state.programs.all_programs;

export const selectUpcomingWorkouts = (state: RootState) =>
  state.programs.upcoming_workouts;

export default programsSlice.reducer;
