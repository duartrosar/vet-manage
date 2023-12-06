import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SidebarState {
  isOpen: boolean;
}

const initialState: SidebarState = { isOpen: true };

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setIsOpen(state, action: PayloadAction<boolean>) {
      state.isOpen = action.payload;
    },
  },
});

export const { setIsOpen } = sidebarSlice.actions;
export default sidebarSlice.reducer;
