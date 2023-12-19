import { Owner } from "@prisma/client";
import React from "react";
import TableRow from "./table-row";

export default function TableBody({ children }: { children: React.ReactNode }) {
  return <tbody className="text-white">{children}</tbody>;
}
