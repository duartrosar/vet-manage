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
import { setActive, setIsOpen } from "@/lib/redux/slices/sidebar-slice";
import SidebarItem from "./sidebar-item";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { checkRoles } from "@/lib/auth/session-helpers";
import { IoSettings, IoGrid } from "react-icons/io5";
import SettingsButton from "../settings/settings-button";
import Settings from "../settings/settings";

const lalezar = Lalezar({ subsets: ["latin"], weight: "400" });
const kanit = Kanit({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
});

export default function SideBar({
  roles,
}: {
  roles: ("ADMIN" | "EMPLOYEE" | "CUSTOMER")[];
}) {
  const [sidebarExpanded, setSidebarExpanded] = useLocalStorage(
    "sidebarExpanded",
    true,
  );
  const isEmployee = roles.includes("ADMIN") || roles.includes("EMPLOYEE");

  const size = useWindowSize();
  const isOpen = useAppSelector((state) => state.sidebar.isOpen);
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  useEffect(() => {
    const pathSegments = pathname.split("/");
    const activePath = pathSegments[pathSegments.length - 1];
    dispatch(setActive(activePath));
  }, [pathname]);

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
            "fixed bottom-0 left-0 top-0 -translate-x-full border-r-2 border-cerulean-700/25 bg-cerulean-950 lg:translate-x-0",
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
                  pathName="dashboard"
                />
                {isEmployee &&
                  employeeSidebarItems.map((item, index) => (
                    <SidebarItem
                      key={index}
                      title={item.title}
                      urlPath={item.urlPath}
                      icon={item.icon}
                      pathName={item.pathName}
                    />
                  ))}
                {roles.includes("CUSTOMER") &&
                  ownerSideBarItems.map((item, index) => (
                    <SidebarItem
                      key={index}
                      title={item.title}
                      urlPath={item.urlPath}
                      icon={item.icon}
                      pathName={item.pathName}
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
