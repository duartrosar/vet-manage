"use client";

import React, { useContext, useEffect, useState } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import FormContainer from "../forms/form-container";
import { SchedulerContext } from "./scheduler-context";
import AppointmentFormHeader from "../forms/appointment/appointment-form-header";
import AppointmentForm from "../forms/appointment/appointment-form";
import { Pet, Vet } from "@prisma/client";
import { getPets } from "@/lib/db/actions/pet-actions";
import { getVets } from "@/lib/db/actions/vet-actions";
import { useParams } from "next/navigation";

export interface AppointmentData {
  id: number;
  startTime: Date;
  endTime: Date;
  subject: string;
  description: string;
  vetId: number;
  petId: number;
  minTime: Date;
  maxTime: Date;
}

export default function SchedulerModal() {
  const params = useParams();
  const { isOpen, setIsOpen } = useContext(SchedulerContext);
  const [pets, setPets] = useState<Pet[] | null>();
  const [vets, setVets] = useState<Vet[] | null>();

  useEffect(() => {
    ({ params });
    const fetchData = async () => {
      try {
        const { pets } = await getPets();
        const { vets } = await getVets();

        setPets(pets);
        setVets(vets);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Dialog
        open={isOpen}
        onOpenChange={() => {
          setIsOpen(false);
        }}
      >
        <DialogContent className="flex justify-center" id="panel">
          <div className="h-screen max-h-screen w-screen max-w-2xl overflow-y-auto border-0 border-cerulean-100/25 bg-cerulean-950 py-12 shadow-lg md:h-full md:w-[90vw] md:overflow-y-hidden md:rounded-lg md:py-0 lg:border-2 landscape:overflow-y-auto">
            <AppointmentFormHeader />
            <div className="flex items-center justify-center p-4">
              <AppointmentForm pets={pets} vets={vets} />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
