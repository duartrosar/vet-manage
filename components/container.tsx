"use client";
import React, { useContext, useState } from "react";
import SidebarContext from "./sidebar/context";
import { motion } from "framer-motion";
import { useWindowSize } from "@uidotdev/usehooks";

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
      className={`flex w-full h-screen items-center justify-center pt-20 lg:pb-6 lg:pr-6 lg:pt-[104px]`}
      style={{
        paddingLeft:
          isOpen && size.width! > 1024
            ? "280px"
            : size.width! < 1024
            ? "0px"
            : "24px",
      }}
      animate={{
        paddingLeft:
          isOpen && size.width! > 1024
            ? "280px"
            : size.width! < 1024
            ? "0px"
            : "24px",
      }}
      transition={{ ease: "easeInOut", duration: isOpen ? 0.3 : 0.2 }}
    >
      <div
        className={`w-full h-full font-bold shadow-2xl bg-cerulean-900 lg:rounded-lg lg:border-2 lg:border-cerulean-800/25 ${className}`}
      >
        {children}
      </div>
    </motion.div>
  );
}
