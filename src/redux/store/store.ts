import { configureStore } from "@reduxjs/toolkit";
import currentProgramsReducer from "../reducers/currentProgramsReducer";
import exercisesReducer from "../reducers/exercisesReducer";
import newProgramReducer from "../reducers/newProgramReducer";
import themeReducer from "../reducers/themeReducer";
import userReducer from "../reducers/userReducer";

export const store = configureStore({
  reducer: {
    newProgram: newProgramReducer,
    currentPrograms: currentProgramsReducer,
    theme: themeReducer,
    user: userReducer,
    exercises: exercisesReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
