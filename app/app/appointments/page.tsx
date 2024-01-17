import Scheduler from "@/components/scheduler/scheduler";
import React from "react";

export default function AppointmentsPage() {
  return (
    <div className="flex h-full flex-col bg-cerulean-950 p-3">
      {/*   */}
      <Scheduler />
    </div>
  );
}
