import Container from "@/components/container";
import FormBase from "@/components/forms";
import OwnerForm from "@/components/forms/owner";
import { createOwner, getOwners } from "@/lib/data";
import { data } from "@/lib/mockup/mockup";
import { randomFill } from "crypto";
import Image from "next/image";
import Link from "next/link";
import List from "@/components/list";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { IoPencil, IoAdd, IoSearch, IoTrash } from "react-icons/io5";
import OwnersList from "@/components/list/owner/list";

export default async function OwnersHome() {
  const { owners } = await getOwners();

  return (
    <Container>
      <OwnersList owners={owners} />
    </Container>
  );
}
