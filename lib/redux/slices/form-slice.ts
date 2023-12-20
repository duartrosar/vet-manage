import { Owner, Vet } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { boolean } from "zod";

interface FormState {
  isOwnerFormOpen: boolean;
  isVetFormOpen: boolean;
  isDeleteFormOpen: boolean;
  owner: Owner | null;
  vet: Vet | null;
  userId: number;
}

const initialState: FormState = {
  isOwnerFormOpen: false,
  owner: null,
  isVetFormOpen: false,
  vet: null,
  isDeleteFormOpen: false,
  userId: 0,
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setOwnerFormIsOpen(state, action: PayloadAction<boolean>) {
      state.isOwnerFormOpen = action.payload;
    },
    setVetFormIsOpen(state, action: PayloadAction<boolean>) {
      state.isVetFormOpen = action.payload;
    },
    setFormOwner(state, action: PayloadAction<Owner | null>) {
      state.owner = action.payload;
    },
    setFormVet(state, action: PayloadAction<Vet | null>) {
      state.vet = action.payload;
    },
    setDeleteFormIsOpen(state, action: PayloadAction<boolean>) {
      state.isDeleteFormOpen = action.payload;
    },
    setUserId(state, action: PayloadAction<number>) {
      state.userId = action.payload;
    },
  },
});

export const {
  setOwnerFormIsOpen,
  setVetFormIsOpen,
  setFormOwner,
  setFormVet,
  setDeleteFormIsOpen,
  setUserId,
} = formSlice.actions;
export default formSlice.reducer;
