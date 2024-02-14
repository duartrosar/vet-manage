import RoleGate from "@/components/auth/role-gate";
import Scheduler from "@/components/scheduler/scheduler";
import SchedulerProvider from "@/components/scheduler/scheduler-context";
import { getAppoinments } from "@/lib/db/actions/appointment-actions";
import React from "react";

export default async function AppointmentsPaget() {
  const { appointments } = await getAppoinments();

  return (
    <RoleGate rolesAllowed={["ADMIN", "VET"]}>
      <div className="flex h-full flex-col bg-cerulean-950 p-3">
        <SchedulerProvider>
          <Scheduler appointments={appointments} />
        </SchedulerProvider>
      </div>
    </RoleGate>
  );
}
