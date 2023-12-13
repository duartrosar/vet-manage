import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SidebarState {
  isOpen: boolean;
  active: string;
}

const initialState: SidebarState = { isOpen: true, active: "Dashboard" };

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setIsOpen(state, action: PayloadAction<boolean>) {
      state.isOpen = action.payload;
    },
    setActive(state, action: PayloadAction<string>) {
      state.active = action.payload;
    },
  },
});

export const { setIsOpen, setActive } = sidebarSlice.actions;
export default sidebarSlice.reducer;
