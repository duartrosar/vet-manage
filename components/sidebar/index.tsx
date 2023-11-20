"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useContext, Fragment } from "react";
// import { useClickAway } from "react-use";
// import SidebarContext from "./SidebarContext";
// import profilePic from "../../public/profilepic.jpg";

import { GiSniffingDog, GiCrossedBones } from "react-icons/gi";
import { HiOutlineMenuAlt2, HiMenuAlt2 } from "react-icons/hi";
import { CgMenuLeft } from "react-icons/cg";
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
import { Dialog, Transition } from "@headlessui/react";
import SidebarContext from "./context";
// import ProfileMenu from "./ProfileMenu";

const lalezar = Lalezar({ subsets: ["latin"], weight: "400" });
const kanit = Kanit({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
});

export default function SideBar() {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [windowWidth, setWindowWidth] = useState(0);
  //   const { isOpen, setIsOpen } = useContext(SidebarContext);
  // const { user } = props;
  const [isOpen, setIsOpen] = useState(false);
  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    setWindowWidth(window.innerWidth);

    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  //   useClickAway(sidebarRef, (e) => {
  //     const element = e.target as HTMLElement;

  //     if (windowWidth >= 1024) return;

  //     if (element.dataset.sidebarToggle) return;

  //     setSidebarOpen(false);
  //   });

  return (
    <>
      <div className="fixed left-0 top-0 z-50 h-20 w-full">
        <div className="h-full w-full bg-cerulean-950 shadow-2xl shadow-cerulean-950">
          <div className="flex h-full items-center justify-between gap-3 p-3">
            <div className="flex items-center gap-3">
              <button
                id="sidebarToggle"
                data-sidebar-toggle={true}
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
                className="cursor-pointer rounded-lg p-3 hover:bg-cerulean-900"
              >
                <CgMenuLeft
                  data-sidebar-toggle={true}
                  className="h-6 w-6 text-gray-400"
                />
              </button>
              <Link href="/" className="">
                <div
                  className={`${lalezar.className} flex w-full items-center justify-start gap-3 py-3 pr-3`}
                >
                  <div className="rounded-full">
                    <GiCrossedBones className="absolute h-8 w-8 rotate-45 text-cerulean-400" />
                    <GiCrossedBones className="h-8 w-8 scale-75 rounded-full text-cerulean-100" />
                  </div>
                  {/* <div className="w-[2px] h-12 bg-white border-x border-white ml-2"></div> */}
                  <p
                    className={`translate-y-[2px] text-3xl font-black lowercase shadow-2xl `}
                    // style={pacifico.style}
                  >
                    <span className="text-cerulean-100">Vet</span>
                    <span className="text-cerulean-400">Wise</span>
                  </p>
                </div>
              </Link>
            </div>
            {/* <ProfileMenu user={user} /> */}
          </div>
        </div>
      </div>
      <Transition show={isOpen}>
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
              onClick={closeMenu}
              className="fixed inset-0 bg-cerulean-900/50 lg:hidden"
              aria-hidden="true"
            />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <aside className="fixed bottom-0 left-0 top-0 w-64 bg-cerulean-900 border-r-2 border-cerulean-800/25">
              <div className="flex flex-col items-start justify-start gap-5 pt-28 px-3">
                <ul
                  className={`${kanit.className} w-full space-y-3 text-base font-semibold`}
                >
                  <li className="group w-full rounded-lg px-3 py-2 transition hover:bg-cerulean-800 hover:shadow-md ">
                    <Link
                      href="/app"
                      className="flex items-center justify-start gap-3 text-gray-400 group-hover:text-gray-200"
                    >
                      <span>
                        <IoGrid className="h-[20px] w-[20px] text-cerulean-500" />
                      </span>
                      Dashboard
                    </Link>
                  </li>
                  <li className="group w-full rounded-lg px-3 py-2 transition hover:bg-cerulean-800 hover:shadow-md">
                    <Link
                      href="/"
                      className="flex items-center justify-start gap-3 text-gray-400 group-hover:text-gray-200"
                    >
                      <span>
                        <IoCalendar className="h-[20px] w-[20px] text-cerulean-500" />
                      </span>
                      Appointments
                    </Link>
                  </li>
                  <li className="group w-full rounded-lg px-3 py-2 transition hover:bg-cerulean-800 hover:shadow-md">
                    <Link
                      href="/"
                      className="flex items-center justify-start gap-3 text-gray-400 group-hover:text-gray-200"
                    >
                      <span>
                        <IoChatbox className="h-[20px] w-[20px] text-cerulean-500" />
                      </span>
                      Messages
                    </Link>
                  </li>
                  <li className="group w-full rounded-lg px-3 py-2 transition hover:bg-cerulean-800 hover:shadow-md">
                    <Link
                      href="/app/owners"
                      className="flex items-center justify-start gap-3 text-gray-400 group-hover:text-gray-200"
                    >
                      <span>
                        <IoPeople className="h-[20px] w-[20px] text-cerulean-500" />
                      </span>
                      Owners
                    </Link>
                  </li>
                  <li className="group w-full rounded-lg px-3 py-2 transition hover:bg-cerulean-800 hover:shadow-md">
                    <Link
                      href="/app/pets"
                      className="flex items-center justify-start gap-3 text-gray-400 group-hover:text-gray-200"
                    >
                      <span>
                        <IoPaw className="h-[20px] w-[20px] text-cerulean-500" />
                      </span>
                      Pets
                    </Link>
                  </li>
                  <li className="group w-full rounded-lg px-3 py-2 transition hover:bg-cerulean-800 hover:shadow-md">
                    <Link
                      href="/"
                      className="flex items-center justify-start gap-3 text-gray-400 group-hover:text-gray-200"
                    >
                      <span>
                        <IoSettings className="h-[20px] w-[20px] text-cerulean-500" />
                      </span>
                      Settings
                    </Link>
                  </li>
                </ul>
              </div>
            </aside>
          </Transition.Child>
        </div>
      </Transition>
    </>
  );
}
