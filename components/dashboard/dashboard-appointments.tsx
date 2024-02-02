import React from "react";
import AppointmentsChartDisplay from "./appointments-chart-display";
import { getAppoinments } from "@/lib/db/actions/appointment-actions";

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

  // const data = getAppoinmentsPerYear(appointments);

  return <AppointmentsChartDisplay appointments={appointments} />;
}

// function getAppoinmentsPerYear(appointments: Appointment[]) {
//   const year = 2024;
//   const appointmentsInYear = appointments
//     .filter((appointment) => appointment.startTime.getFullYear() === year)
//     .map((appointment) => appointment);

//   const currentData = [];

//   for (let i = 0; i <= 11; i++) {
//     const appointment = appointmentsInYear
//       .filter((appointment) => appointment.startTime.getMonth() === i)
//       .map((appointment) => appointment).length;

//     const dataEntry = {
//       amount: appointment,
//       month: MONTHS[i],
//     };
//     currentData.push(dataEntry);
//   }

//   return currentData;
// }
