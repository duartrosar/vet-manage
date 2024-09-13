"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import React, { useContext, useEffect, useState } from "react";
import { ChartContext } from "./chart-context";

export default function ChartYearSelector() {
  const { setYear } = useContext(ChartContext);
  const [years, setYears] = useState<number[]>();
  const [value, setValue] = useState<string>(
    new Date().getFullYear().toString(),
  );

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const currentYears: number[] = [];

    for (let i = currentYear; i >= 1900; i--) {
      currentYears.push(i);
    }

    setYears(currentYears);
  }, []);

  const onValueChange = (value: string) => {
    setValue(value);
    setYear(parseInt(value, 10));
  };

  return (
    <Select onValueChange={(value) => onValueChange(value)} value={value}>
      <SelectTrigger className="w-1/5 px-4 py-0 font-semibold">
        {value}
      </SelectTrigger>
      <SelectContent className="SelectContentNoHeight z-50 max-h-52 rounded-lg py-1 text-sm">
        <SelectGroup>
          <div className="space-y-1 pl-1 pr-2">
            {years?.map((value) => (
              <SelectItem
                key={value}
                value={value + ""}
                className="cursor-pointer justify-end rounded-md py-2 pr-4 text-right font-semibold "
              >
                {value}
              </SelectItem>
            ))}
          </div>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
