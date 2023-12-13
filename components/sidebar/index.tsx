"use client";

import Link from "next/link";
import { useEffect, Fragment } from "react";
import { GiCrossedBones } from "react-icons/gi";
import { CgMenuLeft } from "react-icons/cg";
import { sidebarItems } from "@/lib/constants";
import {
  IoCalendar,
  IoGrid,
  IoChatbox,
  IoPeople,
  IoPaw,
  IoSettings,
  IoPerson,
  IoLogOut,
} from "react-icons/io5";

import { Lalezar, Kanit } from "next/font/google";
import { Transition } from "@headlessui/react";
import { useLocalStorage } from "usehooks-ts";
import { useWindowSize } from "@uidotdev/usehooks";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setIsOpen } from "@/lib/redux/slices/sidebar-slice";
import Logo from "../logo";
import SidebarItem from "./sidebar-item";

const lalezar = Lalezar({ subsets: ["latin"], weight: "400" });
const kanit = Kanit({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
});

export default function SideBar() {
  const [sidebarExpanded, setSidebarExpanded] = useLocalStorage(
    "sidebarExpanded",
    true,
  );

  const size = useWindowSize();
  const isOpen = useAppSelector((state) => state.sidebar.isOpen);
  const dispatch = useAppDispatch();

  const setMenu = (value: boolean) => {
    dispatch(setIsOpen(value));
    setSidebarExpanded(value);
  };

  const closeMenu = () => {
    if (size.width && size.width <= 1024) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (size.width !== null && size.width < 1024) {
      console.log("ggel");
      setIsOpen(false);
      setSidebarExpanded(false);
    }
  }, [size.width]);

  return (
    <>
      <div className="fixed left-0 top-0 z-50 h-20 w-full">
        <div className="h-full w-full border-b-2 border-cerulean-700/25 bg-cerulean-950 shadow-xl">
          <div className="flex h-full items-center justify-between gap-3 p-3">
            <div className="flex items-center gap-3">
              {/* <SidebarButton /> */}
              <button
                id="sidebarToggle"
                data-sidebar-toggle={true}
                onClick={() => setMenu(!isOpen)}
                className="cursor-pointer rounded-lg p-3 hover:bg-cerulean-900"
              >
                <CgMenuLeft
                  data-sidebar-toggle={true}
                  className="h-6 w-6 text-gray-400"
                />
              </button>
              <Logo />
            </div>
            {/* <ProfileMenu user={user} /> */}
          </div>
        </div>
      </div>
      <Transition show={true}>
        <div className="relative z-40">
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div
              onClick={() => setMenu(!isOpen)}
              className="fixed inset-0 bg-cerulean-900/50 lg:hidden"
              aria-hidden="true"
            />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-all linear duration-[25ms]"
            enterFrom="-translate-x-full translate-x-0 w-10"
            enterTo="translate-x-0 w-64"
            leave="transition-all linear duration-[10ms]"
            leaveFrom="translate-x-0 w-64"
            leaveTo="translate-x-0 w-10"
          >
            <aside className="fixed bottom-0 left-0 top-0 w-64 border-r-2 border-cerulean-700/25 bg-cerulean-950">
              <div className="flex flex-col items-start justify-start gap-5 px-3 pt-28">
                <ul
                  className={`${kanit.className} w-full space-y-3 text-base font-semibold`}
                >
                  {sidebarItems.map((item, index) => (
                    <SidebarItem
                      key={index}
                      title={item.title}
                      urlPath={item.urlPath}
                      icon={item.icon}
                    />
                  ))}
                </ul>
              </div>
            </aside>
          </Transition.Child>
        </div>
      </Transition>
    </>
  );
}
