import DashBoardCard from "@/components/dashboard/dashboard-card";
import DashboardConversations from "@/components/dashboard/dashboard-conversations";
import DashboardUpcomingAppointments from "@/components/dashboard/dashboard-upcoming-appointments";
import React, { Suspense } from "react";

export default function DashBoardPage() {
  return (
    <div className="w-full gap-4 space-y-4 bg-cerulean-950 p-4 md:grid md:grid-cols-2 md:space-y-0 lg:grid-cols-3 lg:grid-rows-[repeat(5,minmax(200px,1fr))] lg:space-y-0">
      <DashBoardCard className="order-1 row-span-2 px-2 py-4 lg:col-span-1">
        <Suspense
          fallback={
            <div className="h-full animate-pulse bg-cerulean-950"></div>
          }
        >
          <DashboardConversations />
        </Suspense>
      </DashBoardCard>
      <DashBoardCard className="row-span-2 px-2 py-4 md:order-2 lg:col-span-1">
        <Suspense fallback={<div className="animate-pulse"></div>}>
          <DashboardUpcomingAppointments />
        </Suspense>
      </DashBoardCard>
      <DashBoardCard className="row-span-2 md:order-3 md:col-span-2 lg:order-5">
        <h2 className="text-lg font-medium tracking-wide text-gray-200">
          Appointments
        </h2>
      </DashBoardCard>

      <DashBoardCard className="order-3">
        <h2 className="text-lg font-medium tracking-wide text-gray-200">
          Vets
        </h2>
      </DashBoardCard>
      <DashBoardCard className="order-4">
        <h2 className="text-lg font-medium tracking-wide text-gray-200">
          Pets
        </h2>
      </DashBoardCard>

      <DashBoardCard className="order-6">
        <h2 className="text-lg font-medium tracking-wide text-gray-200">
          Owners
        </h2>
      </DashBoardCard>
      {/* <DashBoardCard className="order-7 lg:col-span-1 row-span-2">
        <h2 className="text-lg font-medium tracking-wide text-gray-200">
          Messages
        </h2>
      </DashBoardCard> */}
    </div>
  );
}
