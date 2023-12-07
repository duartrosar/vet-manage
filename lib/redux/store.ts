import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "@/lib/redux/slices/sidebar-slice";
import ownersReducer from "@/lib/redux/slices/owners-slice";
import formReducer from "@/lib/redux/slices/form-slice";

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    owners: ownersReducer,
    form: formReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
