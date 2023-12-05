"use client";
import { Owner } from "@prisma/client";
import React, { useRef, useState, useEffect, useContext } from "react";
import Image from "next/image";
import { IoCloseCircleOutline, IoPencil, IoTrash } from "react-icons/io5";
import { FaUser } from "react-icons/fa6";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FormStateContext from "../forms/context/form-context";

export default function EntitiesList({ owners }: { owners?: Owner[] }) {
  const { isOpen, setIsOpen, setEntityId } = useContext(FormStateContext);
  const ref = useRef<HTMLDivElement>(null);
  const [parentsHeight, setParentsHeight] = useState(0);
  const router = useRouter();

  useEffect(() => {
    console.log(owners);
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
      <div className="h-full w-full" ref={ref}>
        <div
          style={{ height: parentsHeight - 215 }}
          className="overflow-y-scroll"
        >
          <div className="pl-6 pr-4 pt-4">
            {owners?.map((owner, index) => (
              <div
                key={index}
                className={`cursor-pointer border-x-2 border-b-2 border-cerulean-800/50 px-4 py-2 shadow-xl hover:border-cerulean-800 hover:bg-cerulean-700/50 hover:outline-cerulean-800 ${
                  index % 2 === 0 ? "bg-cerulean-800/25" : "bg-cerulean-950"
                } ${index === 0 ? "rounded-t-xl border-t-2" : ""} ${
                  index === owners.length - 1 ? "rounded-b-xl" : ""
                }`}
              >
                <div className="flex w-full items-center justify-between gap-10 py-2">
                  <div className="flex min-h-[50px] min-w-[50px] items-center justify-center rounded-full border-2 border-cerulean-800/50">
                    {owner.imageUrl ? (
                      <Image
                        className="flex-none rounded-full"
                        src={owner.imageUrl}
                        width={50}
                        height={50}
                        alt="Profile picture"
                      />
                    ) : (
                      <FaUser className="h-[30px] w-[30px] text-cerulean-500/50" />
                    )}
                  </div>

                  <div className="flex w-48 flex-none flex-col text-base font-normal text-white">
                    {owner.firstName} {owner.lastName}
                    <span className="text-sm text-cerulean-100/50">
                      {owner.email}
                    </span>
                  </div>
                  <div className="hidden w-48 flex-none  text-base font-normal text-white md:block">
                    {owner.mobileNumber}
                  </div>
                  <div className="hidden w-48 flex-none text-base font-normal text-white lg:block">
                    {owner.dateOfBirth.toLocaleDateString()}
                  </div>
                  <div className="flex w-72 gap-2">
                    <button
                      onClick={() => {
                        setEntityId(owner.id);
                        setIsOpen(true);
                      }}
                      className="text-xm flex items-center justify-start gap-2 rounded-lg bg-cerulean-600 px-3 py-2 text-sm font-normal text-white shadow-md shadow-cerulean-950 transition hover:bg-cerulean-700 "
                    >
                      <IoPencil className="h-[20px] w-[20px]" />
                      <span className="">Edit owner</span>
                    </button>
                    <button
                      onClick={() => {
                        setEntityId(owner.id);
                        setIsOpen(true);
                      }}
                      className="text-xm flex items-center justify-start gap-2 rounded-lg bg-red-600 px-3 py-2 text-sm font-normal text-white shadow-md shadow-cerulean-950 transition hover:bg-red-700 "
                    >
                      <IoTrash className="h-[20px] w-[20px]" />
                      <span className="">Delete owner</span>
                    </button>
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
