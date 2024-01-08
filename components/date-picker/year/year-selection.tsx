import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import YearTile from "./year-tile";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { IoChevronBackSharp, IoChevronForwardSharp } from "react-icons/io5";

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
    <div className="flex flex-col">
      <div className="flex items-center justify-between gap-1 rounded-lg py-1 text-cerulean-100 ">
        <button
          type="button"
          onClick={() => handleClick("prev")}
          className="flex justify-center rounded-md border border-cerulean-700/25 p-2 text-center text-sm transition duration-75 hover:cursor-pointer hover:bg-cerulean-800"
        >
          <IoChevronBackSharp className="text-xs" />
          {/* <GrFormPrevious className="text-lg" /> */}
        </button>
        <div className="flex w-full justify-center px-4 text-sm text-cerulean-100">
          {years[0]} - {years[years.length - 1]}
        </div>
        <button
          type="button"
          onClick={() => handleClick("next")}
          className="flex justify-center rounded-md border border-cerulean-700/25 p-2 text-right text-sm transition duration-75 hover:cursor-pointer hover:bg-cerulean-800"
        >
          <IoChevronForwardSharp className="text-xs" />
          {/* <GrFormNext className="text-lg" /> */}
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
