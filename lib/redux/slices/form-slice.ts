import { Owner } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { boolean } from "zod";

interface FormState {
  isFormOpen: boolean;
  isDeleteFormOpen: boolean;
  owner: Owner | null;
  userId: number;
}

const initialState: FormState = {
  isFormOpen: false,
  owner: null,
  isDeleteFormOpen: false,
  userId: 0,
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setFormIsOpen(state, action: PayloadAction<boolean>) {
      state.isFormOpen = action.payload;
    },
    setFormOwner(state, action: PayloadAction<Owner | null>) {
      state.owner = action.payload;
    },
    setDeleteFormIsOpen(state, action: PayloadAction<boolean>) {
      state.isDeleteFormOpen = action.payload;
    },
    setUserId(state, action: PayloadAction<number>) {
      state.userId = action.payload;
    },
  },
});

export const { setFormIsOpen, setFormOwner, setDeleteFormIsOpen, setUserId } =
  formSlice.actions;
export default formSlice.reducer;
