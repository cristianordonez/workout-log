import { configureStore } from "@reduxjs/toolkit";
import exercisesReducer from "../reducers/exercisesReducer";
import programsReducer from "../reducers/programsReducer";
import themeReducer from "../reducers/themeReducer";
import userReducer from "../reducers/userReducer";

export const store = configureStore({
  reducer: {
    programs: programsReducer,
    theme: themeReducer,
    user: userReducer,
    exercises: exercisesReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
