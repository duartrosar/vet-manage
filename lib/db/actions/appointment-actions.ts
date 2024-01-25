"use server";

import { appointmentSchema } from "@/lib/zod/zodSchemas";
import { Appointment } from "@prisma/client";
import { db } from "../prisma";
import { revalidatePath } from "next/cache";

export async function getAppoinments() {
  try {
    const appointments = await db.appointment.findMany();

    return { appointments: appointments, success: true };
  } catch (error) {
    console.log("🚀 ~ getAppoinments ~ error:", error);
    return { success: false };
  }
}

export async function createAppointment(data: Appointment) {
  try {
    const appointment = await db.appointment.create({
      data: data,
    });

    revalidatePath("/app/appointments");
    return { appointment, success: true };
  } catch (error) {
    console.log("hello");
    console.log("createAppointment", error);
    return { success: false };
  }
}

export async function updateAppointment(data: Appointment) {
  try {
    const appointment = await db.appointment.update({
      data: data,
      where: {
        id: data.id,
      },
    });

    revalidatePath("/app/appointments");
    return { appointment, success: true };
  } catch (error) {
    console.error("updateAppointment", error);

    return { success: false };
  }
}

export async function deleteAppointment(appointmentId: number) {
  try {
    await db.appointment.delete({
      where: {
        id: appointmentId,
      },
    });
    return { success: true };
  } catch (error) {
    console.error("deleteAppointment", error);

    return { success: false };
  }
}
