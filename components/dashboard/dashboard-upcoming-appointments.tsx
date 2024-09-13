import { getUpcomingAppointments } from "@/lib/db/actions/appointment-actions";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { FaPaw } from "react-icons/fa6";
import Image from "next/image";
import { format } from "date-fns";
import Avatar from "../avatar/avatar";

export default async function DashboardUpcomingAppointments() {
  const { appointments } = await getUpcomingAppointments();

  if (!appointments?.length) {
    return (
      <>
        <p className="pl-2 text-sm font-medium tracking-wide text-gray-400">
          No upcoming appointments.
        </p>
      </>
    );
  }
  return (
    <>
      {appointments.map((appointment) => (
        <Link
          key={appointment.id}
          href={`/app/messages/${appointment.id}`}
          className={cn(
            "flex cursor-pointer items-center gap-2 rounded-xl p-2 shadow hover:bg-gray-100 dark:shadow-lg dark:hover:bg-cerulean-800",
          )}
        >
          <Avatar
            imageUrl={appointment.pet?.imageUrl}
            width={40}
            height={40}
            type="pet"
          />
          {appointment.pet.name && (
            <div className="space-y-1">
              <div className="flex items-end gap-2">
                <p className="text-sm font-semibold text-gray-800 dark:text-white">
                  {appointment.pet.name}
                </p>
                <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                  @ {format(appointment.startTime, "HH:mm")}
                </p>
              </div>
              <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                {appointment.subject}
              </p>
            </div>
          )}
        </Link>
      ))}
    </>
  );
}
