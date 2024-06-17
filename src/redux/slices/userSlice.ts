import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@supabase/supabase-js";

const userSlice = createSlice({
  name: "user",
  initialState: null as User | null,
  reducers: {
    setUserDetails(state, action: PayloadAction<User | null>) {
      return action.payload ? { ...action.payload } : null;
    },
    updateUserDetails(state, action: PayloadAction<User | null>) {
      return state;
    },
  },
});

export const { setUserDetails, updateUserDetails } = userSlice.actions;
export default userSlice.reducer;
