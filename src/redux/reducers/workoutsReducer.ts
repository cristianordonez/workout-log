import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getData } from "../api/api";
import type { RootState } from "../store/store";

interface WorkoutState {
  value: number;
  status: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: WorkoutState = {
  value: 0,
  status: "idle",
};

interface Exercises {
  name: string;
}
// todo
export const getInitialWorkoutData = createAsyncThunk<
  Exercises,
  void,
  { state: RootState }
>(
  "workouts/getInititalWorkoutData",
  async (data, { getState, rejectWithValue }) => {
    const state = getState();
    console.log("state: ", state);

    let sql = "select name from sqlite_schema where type='table'";
    let testdata = await getData(sql);
    console.log("testdata: ", testdata);

    try {
      // const data = await getData();
      console.log("data: ", data);
    } catch (err) {
      console.error(err);
      return rejectWithValue(err);
    }
  }
);

export const workoutSlice = createSlice({
  name: "workouts",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInitialWorkoutData.fulfilled, (state, action) => {
        console.log("action.payload: ", action.payload);
      })
      .addCase(getInitialWorkoutData.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export const { increment, incrementByAmount } = workoutSlice.actions;

export const selectCount = (state: RootState) => state.workouts.value;

export default workoutSlice.reducer;
