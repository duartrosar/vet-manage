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
    <div className="h-[228px] flex flex-col">
      <div className="flex items-center justify-around text-cerulean-100 bg-cerulean-950 rounded-lg px-2 gap-2 mb-2">
        <button
          type="button"
          onClick={() => handleClick("prev")}
          className="flex justify-center rounded-lg flex-1 text-center hover:bg-cerulean-800 hover:cursor-pointer px-4 py-2 text-sm"
        >
          <GrFormPrevious className="text-2xl" />
        </button>
        <div className="flex justify-center rounded-lg  text-cerulean-100 flex-1 hover:bg-cerulean-800 hover:cursor-pointer px-4 py-2 text-sm">
          2013 - 2024
        </div>
        <button
          type="button"
          onClick={() => handleClick("next")}
          className="flex justify-center rounded-lg flex-1 text-right hover:bg-cerulean-800 hover:cursor-pointer px-4 py-2 text-sm"
        >
          <GrFormNext className="text-2xl" />
        </button>
      </div>
      <div className="grid grid-cols-4 w-full gap-1 flex-grow">
        {years.map((year, index) => (
          <YearTile key={index} year={year} />
        ))}
      </div>
    </div>
  );
}
