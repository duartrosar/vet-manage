"use client";

import { Appointment } from "@prisma/client";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { MONTHS } from "@/components/date-picker/constants";
import { ChartContext } from "./chart-context";

interface AppointmentChartData {
  amount: number;
  month: string;
}

export default function AppointmentsChartDisplay({
  appointments,
}: {
  appointments: Appointment[];
}) {
  const { year } = useContext(ChartContext);

  const data = useMemo(() => {
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
  }, [appointments, year]);

  return (
    <>
      <div className="flex h-full items-center px-4">
        {data && (
          <ResponsiveContainer
            // width="100%"
            height={400}
          >
            <BarChart
              margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
              data={data}
            >
              <XAxis
                dataKey="month"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                allowDecimals={false}
                width={20}
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
    </>
  );
}
