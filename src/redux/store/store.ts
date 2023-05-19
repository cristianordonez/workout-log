import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../reducers/themeReducer";
import workoutsReducer from "../reducers/workoutsReducer";

export const store = configureStore({
  reducer: {
    workouts: workoutsReducer,
    theme: themeReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
