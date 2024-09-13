import { Card, CardTitle } from "@/components/card/card";
import DashboardAppointments from "@/components/dashboard/dashboard-appointments";
import DashBoardCard from "@/components/dashboard/dashboard-card";
import DashboardConversations from "@/components/dashboard/dashboard-conversations";
import DashBoardEntitiesAmount from "@/components/dashboard/dashboard-entities-amount";
import DashboardProfile from "@/components/dashboard/dashboard-profile";
import DashboardUpcomingAppointments from "@/components/dashboard/dashboard-upcoming-appointments";
import React, { Suspense } from "react";

export default function DashBoardPage() {
  return (
    <div className="w-full gap-4 space-y-4 p-4 md:grid md:grid-cols-2 md:space-y-0 lg:grid-cols-3 lg:grid-rows-[repeat(4,minmax(200px,1fr))] lg:space-y-0">
      <Card className="order-1 row-span-2 space-y-4 px-2 py-4 lg:col-span-1">
        <CardTitle>Messages</CardTitle>
        <Suspense
          fallback={
            <div className="h-full animate-pulse bg-cerulean-950"></div>
          }
        >
          <DashboardConversations />
        </Suspense>
      </Card>
      <Card className="row-span-2 space-y-4 px-2 py-4 md:order-2 lg:col-span-1">
        <CardTitle>Upcoming Appointments</CardTitle>
        <Suspense fallback={<div className="animate-pulse"></div>}>
          <DashboardUpcomingAppointments />
        </Suspense>
      </Card>
      <Card className="row-span-2 py-4 md:order-3 md:col-span-2 lg:order-5">
        <DashboardAppointments />
      </Card>
      <div className="row-span-2 flex flex-col gap-4 md:order-4 md:col-span-2 md:flex-row lg:order-3 lg:col-span-1 lg:flex-col ">
        <Card className="flex-grow">
          <DashBoardEntitiesAmount type="vet" title="Vets" />
        </Card>
        <Card className="flex-grow">
          <DashBoardEntitiesAmount type="pet" title="Pets" />
        </Card>
        <Card className="flex-grow">
          <DashBoardEntitiesAmount type="owner" title="Owners" />
        </Card>
      </div>
      <Card className="row-span-2 flex flex-col space-y-4 px-2 py-4 md:order-6 lg:col-span-1">
        <CardTitle>About you</CardTitle>
        <DashboardProfile />
      </Card>
    </div>
  );
}
