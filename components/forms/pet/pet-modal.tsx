"use client";

import Modal from "@/components/modal";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setFormPet, setPetFormIsOpen } from "@/lib/redux/slices/form-slice";
import React, { useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import FormContainer from "../form-container";
import PetForm from "./pet-form";
import { getOwners } from "@/lib/db";
import { Owner } from "@prisma/client";

export default function PetFormModal() {
  const [owners, setOwners] = useState<Owner[] | null>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getOwners();
        if (response.success) {
          setOwners(response.owners);
        } else {
          setOwners(null);
        }
      } catch (error) {
        // Handle any unexpected errors during the fetch
        console.error("Error fetching owners", error);
      }
    };

    fetchData();
  }, []);

  // const owners = getOwners().then((res) => res.owners);

  // const owners: Owner[] = [
  //   {
  //     id: 1,
  //     imageUrl: "https://source.unsplash.com/random/200x200/?man+face+1",
  //     firstName: "John",
  //     lastName: "Doe",
  //     mobileNumber: "555-1234-5678",
  //     dateOfBirth: new Date(),
  //     gender: "Prefer not to say",
  //     email: "JohnDoe@fakemail.com",
  //     address: "Fake address, 17",
  //     userId: 1,
  //   },
  // ];

  const isOpen = useAppSelector((state) => state.form.isPetFormOpen);
  const dispatch = useAppDispatch();

  return (
    <>
      <button
        onClick={() => {
          dispatch(setPetFormIsOpen(true));
          dispatch(setFormPet(null));
        }}
        className="text-xm flex items-center justify-start gap-2 rounded-lg bg-cerulean-600 px-3 py-2 text-sm font-normal text-white shadow-md shadow-cerulean-950 transition hover:bg-cerulean-700"
      >
        <IoAdd className="h-[20px] w-[20px]" />
        <span className="hidden sm:block">Add pet</span>
      </button>
      <Modal<"form/setPetFormIsOpen">
        setIsOpen={setPetFormIsOpen}
        isOpen={isOpen}
      >
        <FormContainer type="pet">
          <PetForm owners={owners} />
        </FormContainer>
      </Modal>
    </>
  );
}
