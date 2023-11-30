import React, { useContext, useEffect, useRef, useState } from "react";
import DatePickerModal from "./modal";
import DatePickerContext from "./context/context";
import { IoCalendarClearOutline } from "react-icons/io5";

export default function DatePickerContainer() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [direction, setDirection] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLDivElement>(null);
  const { currentDate } = useContext(DatePickerContext);

  useEffect(() => {
    if (containerRef.current && childRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const childRect = childRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (containerRect.y + 310 + 80 > windowHeight) {
        setDirection("up");
        console.log("it's bigger");
      } else {
        setDirection("down");
      }
    }
  }, [dropdownOpen]);

  return (
    <div className="relative" ref={containerRef}>
      <label
        htmlFor="dateOfBirth"
        className="pl-3 text-sm font-bold text-gray-500"
      >
        Date Of Birth
      </label>
      <input
        name="dateOfBirth"
        type="date"
        className="w-full rounded-lg border-2 border-cerulean-100/25 bg-transparent px-3 py-2 font-semibold text-gray-200 hover:bg-cerulean-800 focus:border-cerulean-600 focus:outline-2 focus:outline-cerulean-600 hidden"
      />
      <div
        id="toggler"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className={`flex min-h-[44px] cursor-pointer items-center justify-between rounded-lg  border-2 border-cerulean-100/25 bg-transparent px-3 py-2 font-semibold text-gray-200 hover:bg-cerulean-800 focus:border-cerulean-600 focus:outline-2 focus:outline-cerulean-600`}
      >
        <span>
          {`${currentDate.selectedDay < 10 ? "0" : ""}${
            currentDate.selectedDay
          }/${currentDate.selectedMonth < 10 ? "0" : ""}${
            currentDate.selectedMonth + 1
          }/${currentDate.selectedYear}`}
        </span>
        <span>
          <IoCalendarClearOutline className="text-cerulean-100/25" />
        </span>
      </div>
      {dropdownOpen && (
        <div ref={childRef}>
          <DatePickerModal direction={direction} />
        </div>
      )}
    </div>
  );
}
