import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => {
      return action.payload;
    },
    removeUserFromFeed: (state, action) => {
      const newArray = state?.data?.filter((req) => req._id !== action.payload);
      return newArray;
    }
  }
});
export const { addFeed, removeUserFromFeed } = feedSlice.actions;
export default feedSlice.reducer;
