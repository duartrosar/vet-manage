import Link from "next/link";
import React from "react";
import { GiCrossedBones } from "react-icons/gi";
import { Lalezar, Kanit } from "next/font/google";

const lalezar = Lalezar({ subsets: ["latin"], weight: "400" });
const kanit = Kanit({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
});

export default function Logo() {
  return (
    <div
      className={`${lalezar.className} flex w-full items-center justify-center gap-3 pr-3`}
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
  );
}
