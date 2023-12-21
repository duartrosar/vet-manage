import { Owner, Pet, Vet } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { boolean } from "zod";

interface FormState {
  isOwnerFormOpen: boolean;
  isVetFormOpen: boolean;
  isPetFormOpen: boolean;
  isDeleteFormOpen: boolean;
  owner: Owner | null;
  vet: Vet | null;
  pet: Pet | null;
  userId: number;
}

const initialState: FormState = {
  isOwnerFormOpen: false,
  isVetFormOpen: false,
  isPetFormOpen: false,
  owner: null,
  vet: null,
  pet: null,
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
    setPetFormIsOpen(state, action: PayloadAction<boolean>) {
      state.isPetFormOpen = action.payload;
    },
    setFormOwner(state, action: PayloadAction<Owner | null>) {
      state.owner = action.payload;
    },
    setFormVet(state, action: PayloadAction<Vet | null>) {
      state.vet = action.payload;
    },
    setFormPet(state, action: PayloadAction<Pet | null>) {
      state.pet = action.payload;
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
  setPetFormIsOpen,
  setFormOwner,
  setFormVet,
  setFormPet,
  setDeleteFormIsOpen,
  setUserId,
} = formSlice.actions;
export default formSlice.reducer;
