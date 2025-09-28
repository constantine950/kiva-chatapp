import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
// import type { ThemeType, ThemeMode } from "../../lib/types";

export type ThemeMode = "light" | "dark" | "system";

export type ThemeType = {
  mode: ThemeMode;
  emailNotification: boolean;
};

const savedTheme = localStorage.getItem("theme") as ThemeMode | null;

const initialState: ThemeType = {
  mode: savedTheme ?? "system",
  emailNotification: true,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setThemeMode(state, action: PayloadAction<ThemeMode>) {
      state.mode = action.payload;
      localStorage.setItem("theme", action.payload);
    },
    toggleEmail(state) {
      state.emailNotification = !state.emailNotification;
    },
  },
});

export const { setThemeMode, toggleEmail } = themeSlice.actions;
export default themeSlice.reducer;
