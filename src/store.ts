import { configureStore } from "@reduxjs/toolkit";
import navReducer from "./redux/navSlice";
import friendIdReducer from "./redux/setFriendIdSlice";

const store = configureStore({
  reducer: {
    nav: navReducer,
    friendId: friendIdReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
