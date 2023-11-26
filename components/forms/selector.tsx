import React, { useState, useRef, MouseEvent as ReactMouseEvent } from "react";
// import { useClickAway } from "react-use";
import { IoChevronDown } from "react-icons/io5";

export default function Selector() {
  const [selectedText, setSelectedText] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  //   useClickAway(dropdownRef, (e: MouseEvent) => {
  //     const element = e.target as HTMLElement;
  //     const id = element.id;

  //     if (id === "toggler") return;

  //     setDropdownOpen(false);
  //   });

  function handleClick(e: ReactMouseEvent<HTMLLIElement, MouseEvent>) {
    const element = e.target as HTMLElement;
    const text = element.innerHTML;
    setDropdownOpen(false);
    setSelectedText(text);
  }

  return (
    <>
      <label htmlFor="gender" className="pl-3 text-sm font-bold text-gray-500">
        Gender
      </label>
      <div
        id="toggler"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className={`flex min-h-[44px] cursor-pointer items-center ${
          selectedText ? "justify-between" : "justify-end"
        } rounded-lg  border-2 border-cerulean-100/25 bg-transparent px-3 py-2 font-semibold text-gray-200 hover:bg-cerulean-800 focus:border-cerulean-600 focus:outline-2 focus:outline-cerulean-600`}
      >
        {selectedText}
        <IoChevronDown className="justify-self-end text-cerulean-100/25" />
      </div>
      {dropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute left-0 top-20 w-full rounded-lg border-2 border-cerulean-100/25 bg-cerulean-900"
        >
          <ul className="flex flex-col gap-3 py-2">
            <li
              onClick={(e) => handleClick(e)}
              className="w-full cursor-pointer px-3 py-2 text-gray-500 transition hover:bg-cerulean-800 hover:shadow-md"
            >
              Female
            </li>
            <li
              onClick={(e) => handleClick(e)}
              className="w-full cursor-pointer px-3 py-2 text-gray-500 transition hover:bg-cerulean-800 hover:shadow-md"
            >
              Male
            </li>
            <li
              onClick={(e) => handleClick(e)}
              className="w-full cursor-pointer px-3 py-2 text-gray-500 transition hover:bg-cerulean-800 hover:shadow-md"
            >
              Prefer not to say
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
