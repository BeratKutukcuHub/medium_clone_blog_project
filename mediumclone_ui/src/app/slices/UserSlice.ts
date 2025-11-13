import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface User {
  id: string;
  username: string;
  email: string;
}

interface UserSlice {
  user: User | null;
}

const initialState: UserSlice = {
  user: null,
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});
export const selectUser = (state: RootState) => state.user.user;
export const { setUser, clearUser } = UserSlice.actions;
export default UserSlice.reducer;
