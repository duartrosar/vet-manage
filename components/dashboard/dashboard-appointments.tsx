import React from "react";
import { getAppoinments } from "@/lib/db/actions/appointment-actions";
import AppointmentsChartDisplay from "./appointments-chart/chart-display";
import ChartProvider from "./appointments-chart/chart-context";
import AppointmentsChartHeader from "./appointments-chart/chart-header";

export default async function DashboardAppointments() {
  const { appointments } = await getAppoinments();

  if (!appointments) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-sm text-gray-400">
          There are currently no appointments.
        </p>
      </div>
    );
  }

  return (
    <ChartProvider>
      <div className="h-full">
        <AppointmentsChartHeader />
        <AppointmentsChartDisplay appointments={appointments} />
      </div>
    </ChartProvider>
  );
}
