"use server";

import { appointmentSchema } from "@/lib/zod/zodSchemas";
import { Appointment } from "@prisma/client";
import { db } from "../prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

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

export async function getUpcomingAppointments() {
  try {
    const session = await auth();

    if (session) {
      const appointments = await db.appointment.findMany({
        include: {
          pet: true,
        },
        take: 5,
      });

      return { appointments };
    }
    return { appointments: null };
  } catch (error) {
    return { appointments: null };
  }
}
