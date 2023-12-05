"use client";

import { Owner } from "@prisma/client";
import React, { useRef, useState, useEffect, useContext } from "react";
import Image from "next/image";
import {
  IoCloseCircleOutline,
  IoPencil,
  IoSearch,
  IoTrash,
} from "react-icons/io5";
import { FaUser } from "react-icons/fa6";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FormStateContext from "@/components/forms/context/form-context";
import FormBase from "@/components/forms/form-base";
import SearchInput from "@/components/list/search-input";
import OwnerListHeader from "./list-header";
import ListItem from "./list-item";

export default function OwnersList({ owners }: { owners?: Owner[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [parentsHeight, setParentsHeight] = useState(0);

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
      <OwnerListHeader />
      <div className="flex h-full flex-col">
        <div className="h-full w-full" ref={ref}>
          <div
            style={{ height: parentsHeight - 215 }}
            className="overflow-y-scroll"
          >
            <div className="pl-6 pr-4 pt-4">
              {owners?.map((owner, index) => (
                <ListItem
                  key={index}
                  owner={owner}
                  index={index}
                  ownersLength={owners.length}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
