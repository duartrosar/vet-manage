import React from "react";
import ChartYearSelector from "./year-selector";

export default function AppointmentsChartHeader() {
  return (
    <div className="flex justify-between px-4">
      <h2 className="w-full text-lg font-medium tracking-wide text-gray-200">
        Appointments
      </h2>
      <ChartYearSelector />
    </div>
  );
}
