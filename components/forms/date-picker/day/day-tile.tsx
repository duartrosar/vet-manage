import React, { Dispatch, SetStateAction } from "react";

export default function DayTile({
  day,
  selectedDay,
  setSelectedDay,
}: {
  day: number;
  selectedDay: number;
  setSelectedDay: Dispatch<SetStateAction<number>>;
}) {
  // const [selected, setSelected]

  return (
    <div
      onClick={() => {
        setSelectedDay(day);
      }}
      className={`flex items-center justify-center rounded-lg border border-cerulean-100/25 bg-cerulean-950 text-cerulean-100 text-sm hover:bg-cerulean-700 hover:cursor-pointer ${
        selectedDay === day ? "bg-cerulean-700" : ""
      }`}
    >
      {day}
    </div>
  );
}
