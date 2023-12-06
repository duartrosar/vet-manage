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
    addOwner(state, action: PayloadAction<Owner>) {
      state.owners.push(action.payload);
    },
    removeOwner(state, action: PayloadAction<number>) {
      state.owners.splice(action.payload, 1);
    },
    // TODO: Add and edit reducer
  },
});

export const { setOwners, addOwner, removeOwner } = ownersSlice.actions;
export default ownersSlice.reducer;
