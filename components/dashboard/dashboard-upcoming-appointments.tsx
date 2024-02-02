import { getUpcomingAppointments } from "@/lib/db/actions/appointment-actions";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { FaPaw } from "react-icons/fa6";
import Image from "next/image";
import { format } from "date-fns";

export default async function DashboardUpcomingAppointments() {
  const { appointments } = await getUpcomingAppointments();

  if (!appointments) {
    return (
      <div className="space-y-4 pl-2">
        <h2 className="text-lg font-medium tracking-wide text-gray-200">
          Upcoming appointments
        </h2>
        <p className="text-sm font-medium tracking-wide text-gray-400">
          No upcoming appointments.
        </p>
      </div>
    );
  }
  return (
    <div className="space-y-4">
      <h2 className="ml-2 text-lg font-medium tracking-wide text-gray-200">
        Upcoming appointments
      </h2>
      {appointments.map((appointment) => (
        <Link
          key={appointment.id}
          href={`/app/messages/${appointment.id}`}
          className={cn(
            "flex cursor-pointer items-center gap-2 rounded-lg p-2 hover:bg-cerulean-800",
          )}
        >
          {appointment.pet?.imageUrl ? (
            <Image
              className="h-[45px] w-[45px] flex-none rounded-full bg-cerulean-950"
              src={appointment.pet?.imageUrl}
              width={45}
              height={45}
              alt="Profile picture"
            />
          ) : (
            <span className="flex h-[45px] w-[45px] items-center justify-center rounded-full bg-cerulean-950">
              <FaPaw className="h-[30px] w-[30px] text-cerulean-500/50" />
            </span>
          )}
          {appointment.pet.name && (
            <div className="space-y-1">
              <div className="flex items-end gap-2">
                <p className="text-sm font-semibold text-white">
                  {appointment.pet.name}
                </p>
                <p className="text-xs font-semibold text-gray-400">
                  @ {format(appointment.startTime, "HH:mm")}
                </p>
              </div>
              <p className="text-xs font-semibold text-gray-400">
                {appointment.subject}
              </p>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
}
