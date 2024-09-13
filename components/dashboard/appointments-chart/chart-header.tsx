import React from "react";
import ChartYearSelector from "./year-selector";
import { CardTitle } from "@/components/card/card";

export default function AppointmentsChartHeader() {
  return (
    <div className="flex justify-between px-4">
      <CardTitle className="m-0">Appointments</CardTitle>
      <ChartYearSelector />
    </div>
  );
}
