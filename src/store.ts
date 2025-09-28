import { configureStore } from "@reduxjs/toolkit";
import navReducer from "./redux/slice/navSlice";
import themeReducer from "./redux/slice/themeSlice";

const store = configureStore({
  reducer: {
    nav: navReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
