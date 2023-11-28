import React from "react";

export default function MonthSelection() {
  const months: string[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <div className="grid grid-cols-4 w-full gap-1 h-[228px]">
      {months.map((value, index) => (
        <div
          key={index}
          className="flex items-center justify-center rounded-lg border border-cerulean-100/25 bg-cerulean-950 text-cerulean-100 text-sm hover:bg-cerulean-700 hover:cursor-pointer py-2"
        >
          {value}
        </div>
      ))}
    </div>
  );
}
