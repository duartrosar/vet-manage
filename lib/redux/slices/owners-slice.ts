import { Owner } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OwnersState {
  owners: Owner[];
  searchParams: string;
}

const initialState: OwnersState = { owners: [], searchParams: "" };

const ownersSlice = createSlice({
  name: "owners",
  initialState,
  reducers: {
    setOwners(state, action: PayloadAction<Owner[]>) {
      state.owners = action.payload;
    },
    addOwnerSlice(state, action: PayloadAction<Owner>) {
      state.owners.push(action.payload);
    },
    removeOwnerSlice(state, action: PayloadAction<number>) {
      state.owners.splice(action.payload, 1);
    },
    updateOwnerSlice(state, action: PayloadAction<Owner>) {
      const index = state.owners.findIndex(
        (owner) => owner.id === action.payload.id,
      );

      if (index) {
        state.owners[index] = action.payload;
      }
    },
    ownerSearch(state, action: PayloadAction<string>) {
      state.searchParams = action.payload;
    },
  },
});

export const {
  setOwners,
  addOwnerSlice,
  removeOwnerSlice,
  updateOwnerSlice,
  ownerSearch,
} = ownersSlice.actions;
export default ownersSlice.reducer;
