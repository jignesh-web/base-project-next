import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types/userTypes";

const userSlice = createSlice({
  name: "user",
  initialState: null as User | null,
  reducers: {
    setUserData(state, action: PayloadAction<User | null>) {
      return action.payload ? { ...action.payload } : null;
    },
    updateUser(state, action: PayloadAction<User | null>) {
      return state;
    },
  },
});

export const { setUserData, updateUser } = userSlice.actions;
export default userSlice.reducer;
