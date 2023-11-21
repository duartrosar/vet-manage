"use client";
import { Owner } from "@/lib/mockup/mockup";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";

export default function EntitiesList({ owners }: { owners: Owner[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [parentsHeight, setParentsHeight] = useState(0);

  useEffect(() => {
    setParentsHeight(ref.current?.clientHeight!);

    function setWindowHeight(this: Window, ev: UIEvent) {
      if (ref.current) {
        setParentsHeight(ref.current.clientHeight);
      }
    }

    window.addEventListener("resize", setWindowHeight);

    return () => {
      window.removeEventListener("resize", setWindowHeight);
    };
  }, []);

  return (
    <div className="w-full h-full" ref={ref}>
      <div
        style={{ height: parentsHeight - 150 }}
        className="overflow-y-scroll"
      >
        <div className="space-y-4 pl-4 pr-2 pt-4">
          {owners.map((owner, index) => (
            <div
              key={index}
              className={`p-2 border-2 border-cerulean-800/50 rounded-xl shadow-xl hover:outline hover:outline-cerulean-800 hover:border-cerulean-800  ${
                index % 2 === 0 ? "bg-cerulean-800/25" : "bg-cerulean-950"
              }`}
            >
              <Image
                className="rounded-full"
                src={owner.imageurl}
                width={60}
                height={60}
                alt="Profile picture"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
