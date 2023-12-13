import Link from "next/link";
import React from "react";
import { GiCrossedBones } from "react-icons/gi";
import { Lalezar, Kanit } from "next/font/google";
import clsx from "clsx";

const lalezar = Lalezar({ subsets: ["latin"], weight: "400" });
const kanit = Kanit({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
});

interface LogoProps {
  size?: "sm" | "lg";
  orientation?: "row" | "col";
}

export default function Logo({ size = "sm", orientation = "row" }: LogoProps) {
  return (
    <div
      className={clsx(
        `${lalezar.className} flex w-full items-center justify-center gap-3 pr-3`,
        orientation === "col" && "flex-col",
        orientation === "row" && "flex-row",
      )}
    >
      <div className="relative rounded-full ">
        <GiCrossedBones
          className={clsx(
            "absolute  rotate-45 text-cerulean-400",
            size === "sm" && "h-8 w-10",
            size === "lg" && "h-28 w-[140px]",
          )}
        />
        <GiCrossedBones
          className={clsx(
            "scale-75 rounded-full text-white",
            size === "sm" && "h-8 w-10",
            size === "lg" && "h-28 w-[140px]",
          )}
        />
      </div>
      {/* <div className="w-[2px] h-12 bg-white border-x border-white ml-2"></div> */}
      <p
        className={clsx(
          "translate-y-[2px] text-3xl font-black lowercase shadow-2xl",
          size === "lg" && "text-7xl",
        )}
        // style={pacifico.style}
      >
        <span className="italic text-white">Vet</span>
        <span className="italic text-cerulean-400">Wise</span>
      </p>
    </div>
  );
}
