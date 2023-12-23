import PetsList from "@/components/list/pet/pets-list";
import { getPets } from "@/lib/db";
import { Pet } from "@prisma/client";
import React from "react";

export default async function PetsHome() {
  const petsStatic: Pet[] = [
    {
      id: 1,
      name: "Buddy",
      type: "Dog",
      imageUrl: "",
      ownerId: 101,
    },
    {
      id: 2,
      name: "Whiskers",
      type: "Cat",
      imageUrl: "",
      ownerId: 102,
    },
    {
      id: 3,
      name: "Charlie",
      type: "Parrot",
      imageUrl: "",
      ownerId: 103,
    },
    {
      id: 4,
      name: "Max",
      type: "Hamster",
      imageUrl: "",
      ownerId: 104,
    },
    {
      id: 5,
      name: "Mittens",
      type: "Cat",
      imageUrl: "",
      ownerId: 105,
    },
    {
      id: 6,
      name: "Rio",
      type: "Fish",
      imageUrl: "",
      ownerId: 106,
    },
  ];

  const { pets } = await getPets();

  return <PetsList pets={pets} />;
}
