import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";

// Define a type for the slice state
interface WorkoutState {
  value: number;
}

// Define the initial state using that type
const initialState: WorkoutState = {
  value: 0,
};

export const workoutSlice = createSlice({
  name: "workouts",
  // `createSlice` will infer the state type from the `initialState` argument
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
});

export const { increment, incrementByAmount } = workoutSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.workouts.value;

export default workoutSlice.reducer;
