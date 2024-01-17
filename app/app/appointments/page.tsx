import Scheduler from "@/components/scheduler/scheduler";
import SchedulerProvider from "@/components/scheduler/scheduler-context";
import React from "react";

export default function AppointmentsPage() {
  return (
    <div className="flex h-full flex-col bg-cerulean-950 p-3">
      <SchedulerProvider>
        <Scheduler />
      </SchedulerProvider>
    </div>
  );
}
