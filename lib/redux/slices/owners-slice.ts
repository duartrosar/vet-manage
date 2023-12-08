import { Owner } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OwnersState {
  owners: Owner[];
}

const initialState: OwnersState = { owners: [] };

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
    // TODO: Add and edit reducer
  },
});

export const { setOwners, addOwnerSlice, removeOwnerSlice, updateOwnerSlice } =
  ownersSlice.actions;
export default ownersSlice.reducer;
