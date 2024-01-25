"use client";

import TimeRangePicker from "@/components/time-picker/time-range-picker";
import { Form, FormField } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Appointment, Pet, Vet } from "@prisma/client";
import { format } from "date-fns";
import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import VetsCombobox from "./vets-combobox";
import PetsCombobox from "./pets-combobox";
import ControlledTextInput from "../inputs/controlled-text-input";
import ControlledTextArea from "../inputs/controlled-textarea";
import { appointmentSchema } from "@/lib/zod/zodSchemas";
import { SchedulerContext } from "@/components/scheduler/scheduler-context";
import {
  createAppointment,
  deleteAppointment,
  updateAppointment,
} from "@/lib/db/actions/appointment-actions";
import { changeTime } from "@/lib/utils";
import { toast } from "sonner";
import Toast from "@/components/toast/toasters";

export interface AppointmentFormData {
  id: number;
  subject: string;
  vetName: string;
  startTime: string;
  endTime: string;
  description: string;
  vetId: number;
  petId: number;
}

interface AppointmentFormProps {
  vets?: Vet[] | null;
  pets?: Pet[] | null;
}

export default function AppointmentForm({ vets, pets }: AppointmentFormProps) {
  const { appointmentData, setIsOpen, schedulerRef } =
    useContext(SchedulerContext);
  const form = useForm<AppointmentFormData>({
    defaultValues: {
      id: 0,
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
    if (!appointmentData) return;

    console.log({ appointmentData });

    form.setValue("startTime", format(appointmentData.startTime, "HH:mm"));
    form.setValue("endTime", format(appointmentData.endTime, "HH:mm"));
    form.setValue("subject", appointmentData.subject);
    form.setValue("description", appointmentData.description);
    form.setValue("vetId", appointmentData.vetId);
    form.setValue("petId", appointmentData.petId);
  }, []);

  const onSubmit = async (data: AppointmentFormData) => {
    console.log({ appointmentData });

    if (!appointmentData) return;

    const appointment = {
      subject: data.subject,
      description: data.description,
      vetId: data.vetId,
      petId: data.petId,
      startTime: changeTime(appointmentData.startTime, data.startTime),
      endTime: changeTime(appointmentData.endTime, data.endTime),
    };

    if (!appointmentData.id) {
      // FIXME: because typescript is dumb, I have to do this wretched hack
      const result = await createAppointment(appointment as Appointment);

      if (!result.success) {
        toast.custom((t) => (
          <Toast t={t} message="Could not create appointment." type="danger" />
        ));
        return;
      }

      toast.custom((t) => (
        <Toast t={t} message="Appointment created." type="success" />
      ));

      const createdAppointment = { ...appointment, id: result.appointment?.id };

      schedulerRef?.current?.addEvent(createdAppointment);
    } else {
      const appointmentToUpdate = { ...appointment, id: appointmentData.id };
      const result = await updateAppointment(
        appointmentToUpdate as Appointment,
      );

      if (!result.success) {
        toast.custom((t) => (
          <Toast t={t} message="Could not update appointment." type="danger" />
        ));
        return;
      }

      toast.custom((t) => (
        <Toast t={t} message="Appointment updated." type="success" />
      ));

      schedulerRef?.current?.deleteEvent(appointmentToUpdate.id);
      schedulerRef?.current?.addEvent(appointmentToUpdate);
    }

    setIsOpen(false);
  };

  const onDeleteCLick = async () => {
    if (!appointmentData?.id) return;

    const result = await deleteAppointment(appointmentData.id);
    schedulerRef?.current?.deleteEvent(appointmentData.id);

    if (!result.success) {
      toast.custom((t) => (
        <Toast t={t} message="Could not delete appointment." type="danger" />
      ));
      return;
    }
    toast.custom((t) => (
      <Toast t={t} message="Appointment deleted." type="success" />
    ));

    setIsOpen(false);
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
          {appointmentData && (
            <TimeRangePicker
              form={form}
              minTime={appointmentData.minTime}
              maxTime={appointmentData.maxTime}
              startTime={appointmentData.startTime}
              endTime={appointmentData.endTime}
            />
          )}
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
        {appointmentData && (
          <div className="col-start-2 flex gap-2 text-end lg:text-start ">
            <button
              type="submit"
              className="w-full whitespace-nowrap rounded-lg border-2 border-cerulean-100/25 bg-cerulean-600 px-6 py-2 text-cerulean-100 hover:bg-cerulean-800 focus:border-cerulean-600 focus:outline-2 focus:outline-cerulean-600 lg:w-1/2"
            >
              {appointmentData.id ? "Save" : "Create"}
            </button>
            {appointmentData.id && (
              <button
                type="button"
                onClick={() => onDeleteCLick()}
                className="w-full whitespace-nowrap rounded-lg border-2 border-cerulean-100/25 bg-red-600 px-6 py-2 text-cerulean-100 hover:bg-red-800 focus:border-red-600 focus:outline-2 focus:outline-cerulean-600 lg:w-1/2"
              >
                Delete
              </button>
            )}
          </div>
        )}
      </form>
    </Form>
  );
}
