import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import YearTile from "./year-tile";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

export default function YearSelection() {
  const [years, setYears] = useState<number[]>([]);

  useEffect(() => {
    setCurrentYears();
  }, []);

  const handleClick = (direction: string) => {
    const newYears: number[] = [];

    if (direction === "next") {
      for (let i = 0; i < years.length; i++) {
        newYears.push(years[i] + 12);
      }
    } else {
      for (let i = 0; i < years.length; i++) {
        newYears.push(years[i] - 12);
      }
    }
    setYears(newYears);
  };

  function setCurrentYears() {
    const newYears: number[] = [];
    for (let i = 2013; i < 2013 + 12; i++) {
      newYears.push(i);
    }
    setYears(newYears);
  }

  return (
    <div className="flex h-[228px] flex-col">
      <div className="mb-2 flex items-center justify-around gap-2 rounded-lg bg-cerulean-950 px-2 text-cerulean-100">
        <button
          type="button"
          onClick={() => handleClick("prev")}
          className="flex flex-1 justify-center rounded-lg px-4 py-2 text-center text-sm hover:cursor-pointer hover:bg-cerulean-800"
        >
          <GrFormPrevious className="text-2xl" />
        </button>
        <div className="flex justify-center rounded-lg px-4 py-2 text-sm text-cerulean-100 hover:cursor-pointer hover:bg-cerulean-800">
          2013 - 2024
        </div>
        <button
          type="button"
          onClick={() => handleClick("next")}
          className="flex flex-1 justify-center rounded-lg px-4 py-2 text-right text-sm hover:cursor-pointer hover:bg-cerulean-800"
        >
          <GrFormNext className="text-2xl" />
        </button>
      </div>
      <div className="grid w-full flex-grow grid-cols-4 gap-1">
        {years.map((year, index) => (
          <YearTile key={index} year={year} />
        ))}
      </div>
    </div>
  );
}
