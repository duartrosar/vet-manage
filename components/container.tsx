"use client";

import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useWindowSize } from "@uidotdev/usehooks";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { setIsOpen } from "@/lib/redux/slices/sidebar-slice";
import clsx from "clsx";
import { generateAppointments } from "@/prisma/seed-data";

export default function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const isOpen = useAppSelector((state) => state.sidebar.isOpen);
  const dispatch = useAppDispatch();
  const size = useWindowSize();

  useEffect(() => {
    if (size?.width && size?.width < 1024) {
      dispatch(setIsOpen(false));
    }
  }, []);

  return (
    <div
      className={clsx(
        `relative flex h-full w-full items-center justify-center overflow-y-auto bg-cerulean-950 pt-[78px] backdrop-blur-2xl lg:pb-0 lg:pr-0`,
        isOpen ? "lg:pl-64" : "lg:pl-[68px]",
      )}
      // style={{
      //   paddingTop: "104px",
      // }}
      // animate={{
      //   paddingLeft:
      //     isOpen && size.width! >= 1024
      //       ? "256px"
      //       : size.width! < 1024
      //         ? "0px"
      //         : "68px",
      // }}
      // transition={{ ease: "linear", duration: isOpen ? 0.025 : 0.01 }}
    >
      <main
        className={`h-full w-full bg-cerulean-950 font-bold shadow-xl ${className}`}
      >
        {children}
      </main>
    </div>
  );
}
