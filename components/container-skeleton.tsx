"use client";
import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useWindowSize } from "@uidotdev/usehooks";
import { useAppSelector } from "@/lib/redux/hooks";

export default function ContainerSkeleton({
  className = "",
}: {
  className?: string;
}) {
  const isOpen = useAppSelector((state) => state.sidebar.isOpen);
  const size = useWindowSize();
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
        className={`h-full w-full bg-cerulean-950 bg-gradient-to-bl from-cerulean-950 to-cerulean-800/10 font-bold shadow-xl lg:rounded-lg lg:border-2 lg:border-cerulean-700/25 ${className}`}
      ></div>
    </motion.div>
  );
}
