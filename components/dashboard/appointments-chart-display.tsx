"use client";

import { Appointment } from "@prisma/client";
import React, { useEffect, useMemo, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { MONTHS } from "@/components/date-picker/constants";

interface AppointmentChartData {
  amount: number;
  month: string;
}

export default function AppointmentsChartDisplay({
  appointments,
}: {
  appointments: Appointment[];
}) {
  const data = useMemo(() => {
    const year = 2024;
    const monthlyCount = Array(12).fill(0);

    appointments.forEach((appointment) => {
      const date = appointment.startTime;

      if (date.getFullYear() === year) {
        monthlyCount[date.getMonth()]++;
      }
    });

    return monthlyCount.map((count, index) => ({
      amount: count,
      month: MONTHS[index],
    }));
  }, [appointments]);

  return (
    <div className="h-full">
      <h2 className="ml-4 text-lg font-medium tracking-wide text-gray-200">
        Appointments
      </h2>
      <div className="flex h-full items-center px-2">
        {data && (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={data}
              margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
            >
              <XAxis
                dataKey="month"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Bar
                dataKey="amount"
                fill="currentColor"
                radius={[4, 4, 0, 0]}
                className="fill-primary"
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
