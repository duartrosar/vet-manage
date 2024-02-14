"use client";

import React, { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import DropDownList from "./drop-down-list";
import DropDownToggler from "./drop-down-toggler";
import { Listbox } from "@headlessui/react";

export default function Dropdown({ children }: { children: React.ReactNode }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(dropdownRef, (event: MouseEvent) => {
    const element = event.target as HTMLElement;
    const id = element.id;

    if (id === "toggler") return;

    setDropdownOpen(false);
  });

  const togglerChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === DropDownToggler) {
      //   ("Hello");
      return React.cloneElement(child as React.ReactElement<any>, {});
    }
    return null;
  });

  const listChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === DropDownList) {
      return React.cloneElement(child as React.ReactElement<any>, {
        ref: dropdownRef,
      });
    }
    return null;
  });

  return (
    <div>
      {togglerChildren}
      {dropdownOpen && listChildren}
    </div>
  );
}
