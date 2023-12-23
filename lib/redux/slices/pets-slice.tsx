import { Pet } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface PetsState {
  pets: Pet[];
  searchParams: string;
}

const initialState: PetsState = { pets: [], searchParams: "" };

const petsSlice = createSlice({
  name: "pets",
  initialState,
  reducers: {
    setPets(state, action: PayloadAction<Pet[]>) {
      state.pets = action.payload;
    },
    addPetSlice(state, action: PayloadAction<Pet>) {
      state.pets.push(action.payload);
    },
    removePetSlice(state, action: PayloadAction<number>) {
      console.log(action.payload);
      state.pets.splice(action.payload, 1);
    },
    updatePetSlice(state, action: PayloadAction<Pet>) {
      const index = state.pets.findIndex((Pet) => Pet.id === action.payload.id);

      state.pets[index] = action.payload;
    },
    petSearchSlice(state, action: PayloadAction<string>) {
      state.searchParams = action.payload;
    },
  },
});

export const {
  setPets,
  addPetSlice,
  removePetSlice,
  updatePetSlice,
  petSearchSlice,
} = petsSlice.actions;
export default petsSlice.reducer;
