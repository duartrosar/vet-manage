"use server";

import { appointmentSchema } from "@/lib/zod/zodSchemas";
import { Appointment, Vet } from "@prisma/client";
import { db } from "../prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { getVetByUserId } from "./vet-actions";
import { getOwnerByUserId } from "./owner-actions";
import { AppointmentWithPets, OwnerWithPets } from "../extended-types";

interface UpcomingAppointmentsResponse {
  appointments: AppointmentWithPets[] | null;
}

export async function getAppoinments() {
  try {
    const appointments = await db.appointment.findMany();

    return { appointments, success: true };
  } catch (error) {
    console.log("🚀 ~ getAppoinments ~ error:", error);
    return { appointments: null, success: false };
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

export async function getUpcomingAppointments(): Promise<UpcomingAppointmentsResponse> {
  try {
    const session = await auth();

    if (session) {
      const roles = session.user.roles.flatMap((role) => role.role as string);
      console.log(session.user.roles);

      if (roles.includes("ADMIN") || roles.includes("EMPLOYEE")) {
        const { vet } = await getVetByUserId(session.user.id);
        console.log({ vet });

        if (!vet) {
          const { appointments } = await getAdminAppointments();
          return { appointments };
        }

        const { appointments } = await getVetAppointments(vet);
        return { appointments };
      }
      const { owner } = await getOwnerByUserId(session.user.id);

      if (owner) {
        const { appointments } = await getOwnerAppointments(owner);
        return { appointments };
      }
    }
    return { appointments: null };
  } catch (error) {
    return { appointments: null };
  }
}

export async function getAdminAppointments() {
  try {
    const appointments = await db.appointment.findMany({
      include: {
        pet: true,
      },
      take: 5,
    });
    return { appointments };
  } catch (error) {
    return { appointments: null };
  }
}

export async function getVetAppointments(vet: Vet) {
  try {
    const appointments = await db.appointment.findMany({
      where: {
        vetId: vet?.id,
      },
      include: {
        pet: true,
      },
      take: 5,
    });
    return { appointments };
  } catch (error) {
    return { appointments: null };
  }
}

export async function getOwnerAppointments(owner: OwnerWithPets) {
  try {
    const petIds = owner.pets.flatMap((pet) => pet.id);

    const appointments = await db.appointment.findMany({
      where: {
        petId: {
          in: petIds,
        },
      },
      include: {
        pet: true,
      },
      take: 5,
    });
    return { appointments };
  } catch (error) {
    return { appointments: null };
  }
}
