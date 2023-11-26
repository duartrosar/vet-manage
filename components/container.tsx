"use client";
import React, { useContext, useEffect, useState } from "react";
import SidebarContext from "./sidebar/context";
import { motion } from "framer-motion";
import { useWindowSize } from "@uidotdev/usehooks";
import { useReadLocalStorage } from "usehooks-ts";

export default function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  const size = useWindowSize();
  return (
    <motion.div
      className={`flex w-full h-screen items-center justify-center pt-20 lg:pb-6 lg:pr-6 lg:pt-[104px] ${
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
        className={`w-full h-full font-bold shadow-xl bg-cerulean-950 lg:rounded-lg lg:border-2 lg:border-cerulean-700/25 ${className}`}
      >
        {children}
      </div>
    </motion.div>
  );
}
