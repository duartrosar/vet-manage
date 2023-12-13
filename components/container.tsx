"use client";
import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useWindowSize } from "@uidotdev/usehooks";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setIsOpen } from "@/lib/redux/slices/sidebar-slice";
import clsx from "clsx";

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
      className={clsx(
        `flex h-screen w-full items-center justify-center bg-cerulean-950 pl-64 pt-20 backdrop-blur-2xl lg:pb-0 lg:pr-0 lg:pt-20`,
        isOpen ? "lg:pl-64" : "lg:pl-0",
      )}
      // style={{
      //   paddingTop: "104px",
      // }}
      animate={{
        paddingLeft:
          isOpen && size.width! >= 1024
            ? "256px"
            : size.width! < 1024
              ? "0px"
              : "0",
      }}
      transition={{ ease: "linear", duration: isOpen ? 0.025 : 0.01 }}
    >
      <div
        className={`h-full w-full bg-cerulean-950 font-bold shadow-xl ${className}`}
      >
        {children}
      </div>
    </motion.div>
  );
}
