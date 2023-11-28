import React from "react";

export default function DayTile({ day }: { day: number }) {
  return (
    <div className="flex items-center justify-center rounded-lg border border-cerulean-100/25 bg-cerulean-950 text-cerulean-100 text-sm hover:bg-cerulean-700 hover:cursor-pointer">
      {day}
    </div>
  );
}
