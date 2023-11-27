"use client";
import { Owner } from "@prisma/client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { IoCloseCircleOutline, IoPencil, IoTrash } from "react-icons/io5";
import { FaUser } from "react-icons/fa6";
import Link from "next/link";

export default function EntitiesList({ owners }: { owners?: Owner[] }) {
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
    <>
      {/* <div className="pl-4 pr-4 pt-4 border-b border-cerulean-800/50 shadow-xl">
        <div className="px-4 py-4 ">
          <div className="w-full flex items-center justify-between gap-10">
            <div className="w-[60px]"></div>
            <div className="text-base font-semibold text-gray-500 text-start flex-1">
              Name
            </div>
            <div className="hidden text-base font-semibold text-gray-500 text-start flex-1 md:block">
              Phone Number
            </div>
            <div className="text-base font-semibold text-gray-500 text-start">
              Action
            </div>
          </div>
        </div>
      </div> */}
      <div className="w-full h-full" ref={ref}>
        <div
          style={{ height: parentsHeight - 150 }}
          className="overflow-y-scroll"
        >
          <div className="space-y-4 pl-4 pr-2 pt-4">
            {owners?.map((owner, index) => (
              <div
                key={index}
                className={`px-4 py-2 border-2 border-cerulean-800/50 rounded-xl shadow-xl hover:outline hover:outline-cerulean-800 hover:border-cerulean-800  ${
                  index % 2 === 0 ? "bg-cerulean-800/25" : "bg-cerulean-950"
                }`}
              >
                <div className="w-full flex items-center justify-between gap-10">
                  <div className="rounded-full border-2 border-cerulean-800/50 w-20 h-20 flex items-center justify-center">
                    {owner.imageUrl ? (
                      <Image
                        className="rounded-full flex-none"
                        src={owner.imageUrl}
                        width={80}
                        height={80}
                        alt="Profile picture"
                      />
                    ) : (
                      <FaUser className="w-[50px] h-[50px] text-cerulean-500/50" />
                    )}
                  </div>

                  <div className="text-base font-normal text-cerulean-100 text-start flex-1">
                    {owner.firstName} {owner.lastName}
                  </div>
                  <div className="text-base font-normal hidden text-cerulean-100 text-start flex-1 md:block">
                    {owner.mobileNumber}
                  </div>
                  <div className="text-base font-normal hidden text-cerulean-100 text-start flex-1 lg:block">
                    {owner.email}
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/owners/edit/${owner.id}`} target="_blank">
                      <IoPencil className="h-[20px] w-[20px] text-cerulean-500" />
                    </Link>
                    <Link href={`/owners/edit/${owner.id}`} target="_blank">
                      <IoTrash className="h-[20px] w-[20px] text-cerulean-500" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
