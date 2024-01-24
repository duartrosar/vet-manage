"use client";

import TimeRangePicker from "@/components/time-picker/time-range-picker";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export interface AppointmentFormData {
  subject: string;
  vetName: string;
  startTime: string;
  endTime: string;
  description: string;
}

interface AppointmentFormProps {
  startTime: Date;
  endTime: Date;
}

const appointmentSchema = z.object({
  startTime: z.string().min(0, "You must select a start time"),
  endTime: z.string().min(0, "You must select an end time"),
});

export default function AppointmentForm({
  startTime,
  endTime,
}: AppointmentFormProps) {
  const form = useForm<AppointmentFormData>({
    defaultValues: { startTime: "", endTime: "" },
    resolver: zodResolver(appointmentSchema),
  });

  useEffect(() => {
    form.setValue("startTime", format(startTime, "HH:mm"));
    form.setValue("endTime", format(endTime, "HH:mm"));
  }, []);

  const onSubmit = async (data: AppointmentFormData) => {
    console.log({ data });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-96 space-y-4">
        <div className="w-full space-y-3 md:grid md:grid-cols-2 md:gap-3 md:space-y-0 xl:grid-cols-2">
          <TimeRangePicker
            form={form}
            minTime={new Date("2024-01-06T09:00:00.000Z")}
            maxTime={new Date("2024-01-06T18:00:00.000Z")}
            startTime={startTime}
            endTime={endTime}
          />
        </div>
        <div className="col-start-2 gap-1 text-end lg:text-start">
          <button
            type="submit"
            className="w-full whitespace-nowrap rounded-lg border-2 border-cerulean-100/25 bg-cerulean-600 px-6 py-2 text-cerulean-100 hover:bg-cerulean-800 focus:border-cerulean-600 focus:outline-2 focus:outline-cerulean-600 lg:w-1/2"
          >
            Submit
          </button>
        </div>
      </form>
    </Form>
  );
}
