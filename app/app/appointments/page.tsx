import Scheduler from "@/components/scheduler/scheduler";
import SchedulerProvider from "@/components/scheduler/scheduler-context";
import { getAppoinments } from "@/lib/db/actions/appointment-actions";
import React, { Suspense } from "react";

export default async function AppointmentsPage() {
  const { appointments } = await getAppoinments();
  console.log("🚀 ~ AppointmentsPage ~ appointments:", appointments);

  return (
    <div className="flex h-full flex-col bg-cerulean-950 p-3">
      <SchedulerProvider>
        <Scheduler appointments={appointments} />
      </SchedulerProvider>
    </div>
  );
}
