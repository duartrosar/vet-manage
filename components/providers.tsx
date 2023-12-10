"use client";

import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import { store } from "@/lib/redux/store";

export const Providers = (props: React.PropsWithChildren) => {
  return (
    <Provider store={store}>
      <SessionProvider>{props.children}</SessionProvider>
    </Provider>
  );
};
