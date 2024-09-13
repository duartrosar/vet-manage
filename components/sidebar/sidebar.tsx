"use client";

import { useEffect, Fragment } from "react";
import {
  ownerSideBarItems,
  commonSidebarItems,
  employeeSidebarItems,
} from "@/lib/constants";
import { Lalezar, Kanit } from "next/font/google";
import { Transition } from "@headlessui/react";
import { useLocalStorage } from "usehooks-ts";
import { useWindowSize } from "@uidotdev/usehooks";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { setIsOpen } from "@/lib/redux/slices/sidebar-slice";
import SidebarItem from "./sidebar-item";
import clsx from "clsx";
import { IoGrid } from "react-icons/io5";
import Settings from "../settings/settings";

const lalezar = Lalezar({ subsets: ["latin"], weight: "400" });
const kanit = Kanit({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function SideBar({
  roles,
}: {
  roles: ("ADMIN" | "VET" | "OWNER")[];
}) {
  const [sidebarExpanded, setSidebarExpanded] = useLocalStorage(
    "sidebarExpanded",
    true,
  );
  const isEmployee = roles.includes("ADMIN") || roles.includes("VET");

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
      dispatch(setIsOpen(false));
      setSidebarExpanded(false);
    }
  }, [size.width]);

  return (
    <>
      <div className="relative z-30">
        <Transition show={isOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-150"
            enterFrom="opacity-0 backdrop-blur-none translate-x-full"
            enterTo="opacity-100 backdrop-blur-[.5px] translate-x-0"
            leave="transition-all ease-in-out duration-50"
            leaveFrom="opacity-100 backdrop-blur-[.5px] translate-x-0"
            leaveTo="opacity-0 backdrop-blur-none translate-x-full"
          >
            <div
              onClick={() => setMenu(!isOpen)}
              className="fixed inset-0 bg-cerulean-900/50 lg:hidden"
              aria-hidden="true"
            />
          </Transition.Child>
        </Transition>

        <aside
          className={clsx(
            "fixed bottom-0 left-0 top-0 -translate-x-full border-r-2 border-gray-300 dark:border-r dark:border-cerulean-700/25 dark:bg-cerulean-900 lg:translate-x-0",
            isOpen ? "w-64 translate-x-0" : "",
          )}
        >
          <div className="h-full px-3 pt-28">
            <ul
              className={`${kanit.className} flex h-full w-full flex-col justify-between pb-3 text-base font-semibold`}
            >
              <span className="space-y-3">
                <SidebarItem
                  title={"Dashboard"}
                  urlPath="/app/dashboard"
                  icon={IoGrid}
                />
                {isEmployee &&
                  employeeSidebarItems.map((item, index) => (
                    <SidebarItem
                      key={index}
                      title={item.title}
                      urlPath={item.urlPath}
                      icon={item.icon}
                    />
                  ))}
                {roles.includes("OWNER") &&
                  ownerSideBarItems.map((item, index) => (
                    <SidebarItem
                      key={index}
                      title={item.title}
                      urlPath={item.urlPath}
                      icon={item.icon}
                    />
                  ))}
              </span>
              <span>
                <Settings />
              </span>
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}
