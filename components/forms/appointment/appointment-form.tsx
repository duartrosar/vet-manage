"use client";

import TimeRangePicker from "@/components/time-picker/time-range-picker";
import { Form, FormField } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pet, Vet } from "@prisma/client";
import { format } from "date-fns";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import VetsCombobox from "./vets-combobox";
import PetsCombobox from "./pets-combobox";
import ControlledTextInput from "../inputs/controlled-text-input";
import ControlledTextArea from "../inputs/controlled-textarea";

export interface AppointmentFormData {
  subject: string;
  vetName: string;
  startTime: string;
  endTime: string;
  description: string;
  vetId: number;
  petId: number;
}

interface AppointmentFormProps {
  startTime: Date;
  endTime: Date;
  vets?: Vet[] | null;
  pets?: Pet[] | null;
}

const appointmentSchema = z.object({
  subject: z.string().min(1, "You must enter a subject"),
  startTime: z.string().min(0, "You must select a start time"),
  endTime: z.string().min(0, "You must select an end time"),
  vetId: z.number().min(1, { message: "You must choose a vet" }),
  petId: z.number().min(1, { message: "You must choose a pet" }),
  description: z.string().min(1, "You must enter a description"),
});

export default function AppointmentForm({
  startTime,
  endTime,
  vets,
  pets,
}: AppointmentFormProps) {
  const form = useForm<AppointmentFormData>({
    defaultValues: {
      subject: "",
      startTime: "",
      endTime: "",
      vetId: 0,
      petId: 0,
      description: "",
    },
    resolver: zodResolver(appointmentSchema),
  });

  useEffect(() => {
    form.setValue("startTime", format(startTime, "HH:mm"));
    form.setValue("endTime", format(endTime, "HH:mm"));
    console.log({ vets });
    console.log({ pets });
  }, []);

  const onSubmit = async (data: AppointmentFormData) => {
    console.log({ data });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <div className="lg:coll-span-2 w-full">
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <ControlledTextInput
                label="Subject"
                {...field}
                placeholder="Subject"
                error={form.formState.errors.subject}
              />
            )}
          />
        </div>

        <div className="w-full space-y-3 md:grid md:grid-cols-2 md:gap-3 md:space-y-0 xl:grid-cols-2">
          <TimeRangePicker
            form={form}
            minTime={new Date("2024-01-06T09:00:00.000Z")}
            maxTime={new Date("2024-01-06T18:00:00.000Z")}
            startTime={startTime}
            endTime={endTime}
          />
        </div>
        <div className="w-full space-y-3 md:grid md:grid-cols-2 md:gap-3 md:space-y-0 xl:grid-cols-2">
          {vets && (
            <FormField
              control={form.control}
              name="vetId"
              render={({ field }) => (
                <VetsCombobox
                  vets={vets}
                  setValue={form.setValue}
                  value={field.value}
                  label="Vet"
                  error={form.formState.errors.vetId}
                  clearErrors={form.clearErrors}
                />
              )}
            />
          )}
          {pets && (
            <FormField
              control={form.control}
              name="petId"
              render={({ field }) => (
                <PetsCombobox
                  pets={pets}
                  setValue={form.setValue}
                  value={field.value}
                  label="Pet"
                  error={form.formState.errors.petId}
                  clearErrors={form.clearErrors}
                />
              )}
            />
          )}
        </div>
        <div className="lg:coll-span-2 w-full">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <ControlledTextArea
                label="Description"
                {...field}
                placeholder="Description"
                error={form.formState.errors.subject}
              />
            )}
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
