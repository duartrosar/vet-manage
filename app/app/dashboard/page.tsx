import DashBoardCard from "@/components/dashboard/dashboard-card";
import DashboardConversations from "@/components/dashboard/dashboard-conversations";
import React, { Suspense } from "react";

export default function DashBoardPage() {
  return (
    <div className="grid w-full grid-cols-3 grid-rows-[repeat(5,minmax(200px,1fr))]  gap-4 bg-cerulean-950 p-4">
      <DashBoardCard className="order-1 col-span-1 row-span-2 px-2 py-4">
        <Suspense fallback={<div className="animate-pulse"></div>}>
          <DashboardConversations />
        </Suspense>
      </DashBoardCard>
      <DashBoardCard className="order-2 col-span-1 row-span-2">
        <h2 className="text-lg font-medium tracking-wide text-gray-200">
          Upcoming appointments
        </h2>
      </DashBoardCard>
      <DashBoardCard className="order-5 col-span-2 row-span-2">
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
      {/* <DashBoardCard className="order-7 col-span-1 row-span-2">
        <h2 className="text-lg font-medium tracking-wide text-gray-200">
          Messages
        </h2>
      </DashBoardCard> */}
    </div>
  );
}
