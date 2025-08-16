import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type FriendIdState = {
  id: string;
};

const initialState: FriendIdState = {
  id: "",
};

const friendIdSlice = createSlice({
  name: "friendId",
  initialState,
  reducers: {
    setFriendId(state, action: PayloadAction<string>) {
      state.id = action.payload;
    },
  },
});

export const { setFriendId } = friendIdSlice.actions;

export default friendIdSlice.reducer;
