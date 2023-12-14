"use client";

import { Owner } from "@prisma/client";
import React, { useRef, useState, useEffect } from "react";
import OwnerListHeader from "./list-header";
import TrItem from "./tr-item";
import { useDispatch } from "react-redux";
import { setOwners } from "@/lib/redux/slices/owners-slice";
import { useAppSelector } from "@/lib/hooks";
import TheadItem from "./thead-item";

export default function OwnersList({ owners }: { owners?: Owner[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const currentOwners = useAppSelector((state) => state.owners.owners);
  const dispatch = useDispatch();
  const [parentsHeight, setParentsHeight] = useState(0);
  console.log(currentOwners.length);

  useEffect(() => {
    setParentsHeight(ref.current?.clientHeight!);
    if (owners) {
      const sortedOwners = [...owners].sort((a, b) => a.id - b.id);
      dispatch(setOwners(sortedOwners));
    }

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
        <div className="relative h-full w-full pt-[30px]" ref={ref}>
          <div
            className={`overflow-auto-y ${
              currentOwners.length === 0 ? "" : ""
            }`}
          >
            {/* <div className="absolute left-6 right-6 top-4 z-10 h-5 rounded-t-xl border border-b-0 border-cerulean-800/50 bg-cerulean-950 backdrop-blur-xl"></div> */}
            <div className="rounded-b-xl border-x border-b border-cerulean-800/50 bg-cerulean-950 pb-11">
              <table className="relative w-full table-auto border-separate border-spacing-0 text-sm">
                <TheadItem
                  headers={[
                    "",
                    "Name",
                    "Phone Number",
                    "Date Of Birth",
                    "Gender",
                    "",
                  ]}
                />
                <tbody className="text-white">
                  {currentOwners?.map((owner, index) => (
                    <TrItem
                      key={index}
                      owner={owner}
                      index={index}
                      ownersLength={currentOwners.length}
                    />
                  ))}
                  {currentOwners?.map((owner, index) => (
                    <TrItem
                      key={index}
                      owner={owner}
                      index={index}
                      ownersLength={currentOwners.length}
                    />
                  ))}
                  {currentOwners?.map((owner, index) => (
                    <TrItem
                      key={index}
                      owner={owner}
                      index={index}
                      ownersLength={currentOwners.length}
                    />
                  ))}
                  {currentOwners?.map((owner, index) => (
                    <TrItem
                      key={index}
                      owner={owner}
                      index={index}
                      ownersLength={currentOwners.length}
                    />
                  ))}
                  {currentOwners?.map((owner, index) => (
                    <TrItem
                      key={index}
                      owner={owner}
                      index={index}
                      ownersLength={currentOwners.length}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
