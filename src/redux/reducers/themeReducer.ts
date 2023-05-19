import { createSlice } from "@reduxjs/toolkit";
import { Colors } from "../../types/types";
import type { RootState } from "../store/store";

interface TextStyleSheet {
  fontSize: number;
  fontFamily:
    | "Lato_Thin"
    | "Lato_ThinItalic"
    | "Lato_Light"
    | "Lato_LightItalic"
    | "Lato"
    | "Lato_Italic"
    | "Lato_Bold"
    | "Lato_BoldItalic"
    | "Lato_Black"
    | "Lato_BlackItalic";
}

interface Text {
  h0: TextStyleSheet;
  h1: TextStyleSheet;
  h2: TextStyleSheet;
  h3: TextStyleSheet;
  h4: TextStyleSheet;
  p: TextStyleSheet;
  subtitle1: TextStyleSheet;
  subtitle2: TextStyleSheet;
}

interface ThemeState {
  colors: Colors;
  text: Text;
}

const initialState: ThemeState = {
  colors: {
    primary: "#AE71EA",
    secondary: "#14FFEC",
    background: "#000000",
    card: "#0F0F0F",
    text: "#FFFFFF",
    border: "#0F0F0F",
    notification: "#0F0F0F",
    error: "#EF4444",
    button: "#9CA5F2",
    success: "#4BD37B",
  },
  text: {
    h0: { fontSize: 24, fontFamily: "Lato_Black" },
    h1: { fontSize: 20, fontFamily: "Lato_Black" },
    h2: { fontSize: 18, fontFamily: "Lato_Bold" },
    h3: { fontSize: 16, fontFamily: "Lato_Bold" },
    h4: { fontSize: 14, fontFamily: "Lato" },
    p: { fontSize: 12, fontFamily: "Lato" },
    subtitle1: { fontSize: 10, fontFamily: "Lato_Light" },
    subtitle2: { fontSize: 8, fontFamily: "Lato_Thin" },
  },
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {},
});

export const {} = themeSlice.actions;

export const selectTheme = (state: RootState) => state.theme;
export const selectColors = (state: RootState) => state.theme.colors;
export const selectText = (state: RootState) => state.theme.text;

export default themeSlice.reducer;
