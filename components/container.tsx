"use client";
import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useWindowSize } from "@uidotdev/usehooks";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setIsOpen } from "@/lib/redux/slices/sidebar-slice";

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
    <motion.div
      className={`flex h-screen w-full items-center justify-center pt-20 lg:pb-6 lg:pr-6 lg:pt-[104px] ${
        isOpen ? "lg:pl-[280px]" : "lg:pl-6"
      }`}
      // style={{
      //   paddingTop: "104px",
      // }}
      animate={{
        paddingLeft:
          isOpen && size.width! >= 1024
            ? "280px"
            : size.width! < 1024
              ? "0px"
              : "24px",
      }}
      transition={{ ease: "easeInOut", duration: isOpen ? 0.3 : 0.2 }}
    >
      <div
        className={`h-full w-full bg-cerulean-950 font-bold shadow-xl lg:rounded-lg lg:border-2 lg:border-cerulean-700/25 ${className}`}
      >
        {children}
      </div>
    </motion.div>
  );
}
