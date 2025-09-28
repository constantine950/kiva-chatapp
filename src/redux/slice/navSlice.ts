import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { NavState } from "../../lib/types";

const initialState: NavState = {
  isMenuOpen: false,
};

const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    toggleMenu(state) {
      state.isMenuOpen = !state.isMenuOpen;
    },
    setMenuOpen(state, action: PayloadAction<boolean>) {
      state.isMenuOpen = action.payload;
    },
  },
});

export const { toggleMenu, setMenuOpen } = navSlice.actions;

export default navSlice.reducer;
