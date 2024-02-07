"use client";

import { Dispatch, SetStateAction, createContext, useState } from "react";

interface ChartContextValues {
  year: number;
  setYear: Dispatch<SetStateAction<number>>;
}

export const ChartContext = createContext<ChartContextValues>({
  year: new Date().getFullYear(),
  setYear: () => {},
});

export default function ChartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [year, setYear] = useState(new Date().getFullYear());

  return (
    <ChartContext.Provider value={{ year, setYear }}>
      {children}
    </ChartContext.Provider>
  );
}
