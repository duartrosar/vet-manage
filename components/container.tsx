"use client";
import React, { useContext, useState } from "react";
import SidebarProvider from "./sidebar/provider";
import Providers from "./sidebar/provider";
import SidebarContext from "./sidebar/context";
import { Transition } from "@headlessui/react";
import { motion } from "framer-motion";
import { easeInOut } from "framer-motion/dom";

export default function Container({ children }: { children: React.ReactNode }) {
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  return (
    <motion.div
      className={`flex w-full h-screen items-center justify-center pt-20 lg:pb-6 lg:pr-6 lg:pt-[104px]`}
      style={{ paddingLeft: "280px" }}
      animate={{ paddingLeft: isOpen ? "280px" : "24px" }}
      transition={{ ease: "easeInOut", duration: isOpen ? 0.3 : 0.2 }}
    >
      <div className="w-full h-full font-bold bg-cerulean-900 lg:rounded-lg lg:border-2 lg:border-cerulean-800/25 overflow-y-scroll p-4">
        {children}
      </div>
    </motion.div>
  );
}
