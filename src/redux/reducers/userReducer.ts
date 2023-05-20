import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getData } from "../api/api";
import type { RootState } from "../store/store";

interface UserState {
  age: number | null;
  height: number | null;
  weight: number | null;
  gender: "male" | "female" | null;
  current_program: number | null;
  status: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: UserState = {
  age: null,
  height: null,
  weight: null,
  gender: null,
  current_program: null,
  status: "idle",
};

type User = string[];

// called when app is initialized to populate this slice with data from user table
export const getInitialUserData = createAsyncThunk<
  User,
  void,
  { state: RootState }
>("user/getInitialUserData", async (_, { rejectWithValue }) => {
  try {
    const sql = "SELECT * FROM user";
    const user = await getData(sql);
    return user;
  } catch (err) {
    console.error("err in get user data: ", err);
    return rejectWithValue(err);
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInitialUserData.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getInitialUserData.fulfilled, (state, action) => {
        if (action.payload.length) {
          // todo update all state
          console.log("action.payload: ", action.payload);
        }
        state.status = "succeeded";
      })
      .addCase(getInitialUserData.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export const {} = userSlice.actions;

export const selectCurrentProgram = (state: RootState) =>
  state.user.current_program;

export default userSlice.reducer;
