"use client";

import React, { MouseEvent as ReactMouseEvent, useState } from "react";
import DropDownList from "../dropdown/drop-down-list";
import Dropdown from "../dropdown";
import { genderOptions } from "@/lib/constants";
import { IoChevronDown } from "react-icons/io5";
import DropDownToggler from "../dropdown/drop-down-toggler";
import { Popover } from "@headlessui/react";
import { FaUser } from "react-icons/fa6";

export default function ProfileMenu() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  function handleClick(e: ReactMouseEvent<HTMLLIElement, MouseEvent>) {
    const element = e.target as HTMLElement;
    const text = element.innerHTML;
    console.log(text);
  }

  return (
    <div className=" gap-1">
      <Popover className="relative flex w-48 justify-end">
        <Popover.Button className="mr-3 flex h-11 w-11 items-center justify-center rounded-full border border-cerulean-100/10 bg-transparent">
          <FaUser className="h-[20px] w-[20px] text-cerulean-500/50" />
        </Popover.Button>

        <Popover.Panel className="absolute top-14 z-10 w-full rounded-lg border-2 border-cerulean-100/25 bg-cerulean-900 pb-2 pt-6 text-sm">
          <div className="border-b border-cerulean-100/25 px-5 pb-5">
            <h2 className=" text-white">Duarte Ribeiro</h2>
            <p className="text-gray-500">duartrosar@gmail.com</p>
          </div>
          <ul className="flex flex-col pt-2">
            {genderOptions &&
              genderOptions.map((value, index) => (
                <li
                  key={index}
                  onClick={(e) => handleClick(e)}
                  className="w-full cursor-pointer px-5 py-2 text-gray-500 transition hover:bg-cerulean-800 hover:shadow-md"
                >
                  {value}
                </li>
              ))}
          </ul>
        </Popover.Panel>
      </Popover>
    </div>
  );
}
