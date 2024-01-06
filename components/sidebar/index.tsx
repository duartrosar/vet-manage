"use client";

import { useEffect, Fragment } from "react";
import { sidebarItems } from "@/lib/constants";
import { Lalezar, Kanit } from "next/font/google";
import { Transition } from "@headlessui/react";
import { useLocalStorage } from "usehooks-ts";
import { useWindowSize } from "@uidotdev/usehooks";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setActive, setIsOpen } from "@/lib/redux/slices/sidebar-slice";
import SidebarItem from "./sidebar-item";
import clsx from "clsx";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();

  useEffect(() => {
    const pathSegments = pathname.split("/");
    const activePath = pathSegments[pathSegments.length - 1];
    console.log(activePath);
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
              className="bg-cerulean-900/50 fixed inset-0 lg:hidden"
              aria-hidden="true"
            />
          </Transition.Child>
        </Transition>

        <aside
          className={clsx(
            "border-cerulean-700/25 bg-cerulean-950 fixed bottom-0 left-0 top-0 -translate-x-full border-r-2 lg:translate-x-0",
            isOpen ? "w-64 translate-x-0" : "",
          )}
        >
          <div className="h-full px-3 pt-28">
            <ul
              className={`${kanit.className} flex h-full w-full flex-col justify-between pb-3 text-base font-semibold`}
            >
              <span className="space-y-3">
                {sidebarItems.map(
                  (item, index) =>
                    index !== sidebarItems.length - 1 && (
                      <SidebarItem
                        key={index}
                        title={item.title}
                        urlPath={item.urlPath}
                        icon={item.icon}
                      />
                    ),
                )}
              </span>
              <span>
                <SidebarItem
                  title={sidebarItems[sidebarItems.length - 1].title}
                  urlPath={sidebarItems[sidebarItems.length - 1].urlPath}
                  icon={sidebarItems[sidebarItems.length - 1].icon}
                />
              </span>
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}
