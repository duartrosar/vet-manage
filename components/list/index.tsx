"use client";
import { Owner } from "@prisma/client";
import React, { useRef, useState, useEffect } from "react";
import FormStateContext from "../forms/context/form-context";
import OwnersList from "./owner/list";

export default function List({ owners }: { owners?: Owner[] }) {
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
      <OwnersList owners={owners} />
    </>
  );
}
