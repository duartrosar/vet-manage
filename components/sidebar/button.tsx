import React from "react";
import { CgMenuLeft } from "react-icons/cg";

export default function SidebarButton() {
  return (
    <button
      id="sidebarToggle"
      data-sidebar-toggle={true}
      //   onClick={() => setIsOpen(!isOpen)}
      className="cursor-pointer rounded-lg p-3 hover:bg-cerulean-900"
    >
      <CgMenuLeft
        data-sidebar-toggle={true}
        className="h-6 w-6 text-gray-400"
      />
    </button>
  );
}
