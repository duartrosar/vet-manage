import { Vet } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ownersSlice from "./owners-slice";

interface VetsState {
  vets: Vet[];
  searchParams: string;
}

const initialState: VetsState = { vets: [], searchParams: "" };

const vetsSlice = createSlice({
  name: "vets",
  initialState,
  reducers: {
    setVets(state, action: PayloadAction<Vet[]>) {
      state.vets = action.payload;
    },
    addVetSlice(state, action: PayloadAction<Vet>) {
      state.vets.push(action.payload);
    },
    removeVetSlice(state, action: PayloadAction<number>) {
      state.vets.splice(action.payload, 1);
    },
    removeVetByUserIdSlice(state, action: PayloadAction<string>) {
      const vet = state.vets.findIndex((vet) => vet.userId === action.payload);

      state.vets.splice(vet, 1);
    },
    updateVetSlice(state, action: PayloadAction<Vet>) {
      const index = state.vets.findIndex((vet) => vet.id === action.payload.id);

      state.vets[index] = action.payload;
    },
    vetSearchSlice(state, action: PayloadAction<string>) {
      state.searchParams = action.payload;
    },
  },
});

export const {
  setVets,
  addVetSlice,
  removeVetSlice,
  removeVetByUserIdSlice,
  updateVetSlice,
  vetSearchSlice,
} = vetsSlice.actions;
export default vetsSlice.reducer;
