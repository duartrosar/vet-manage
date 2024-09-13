"use client";

import React, { useEffect, useState } from "react";
import { Toggle } from "@/components/ui/toggle";
import { IoSunnyOutline } from "react-icons/io5";
import { BiMoon } from "react-icons/bi";
import { Button } from "../ui/button";

export default function ThemeToggle() {
  const [pressed, setPressed] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (
      window.localStorage.getItem("theme") === "dark" ||
      (!("theme" in window.localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
      setPressed(true);
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      window.localStorage.setItem("theme", "light");
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      window.localStorage.setItem("theme", "dark");
      document.documentElement.setAttribute("data-theme", "dark");
    }
    setDarkMode(!darkMode);
    setPressed(!pressed);
  };

  return (
    <Button onClick={() => toggleDarkMode()}>
      {!pressed ? (
        <BiMoon className="h-6 w-6 text-gray-400 " />
      ) : (
        <IoSunnyOutline className="h-6 w-6 text-cerulean-500 " />
      )}
    </Button>
  );
}
