import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "@/lib/redux/slices/sidebar-slice";
import ownersReducer from "@/lib/redux/slices/owners-slice";
import formReducer from "@/lib/redux/slices/form-slice";
import vetsReducer from "@/lib/redux/slices/vets-slice";
import petsReducer from "@/lib/redux/slices/pets-slice";

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    owners: ownersReducer,
    vets: vetsReducer,
    form: formReducer,
    pets: petsReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
