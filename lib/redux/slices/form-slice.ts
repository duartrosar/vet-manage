import { Owner } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { boolean } from "zod";

interface FormState {
  isOpen: boolean;
  owner: Owner | null;
}

const initialState: FormState = { isOpen: false, owner: null };

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setFormIsOpen(state, action: PayloadAction<boolean>) {
      state.isOpen = action.payload;
    },
    setFormOwner(state, action: PayloadAction<Owner | null>) {
      state.owner = action.payload;
    },
  },
});

export const { setFormIsOpen, setFormOwner } = formSlice.actions;
export default formSlice.reducer;
