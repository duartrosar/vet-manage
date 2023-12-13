import Container from "@/components/container";
import OwnersList from "@/components/list/owner/list";
import { getOwners } from "@/lib/db";
// import prisma from "@/lib/db/prisma";

export default async function OwnersHome() {
  const { owners } = await getOwners();
  // TODO: Fix this to make it more safe
  // const owners = await prisma.owner.findMany();

  return (
    <Container>
      <OwnersList owners={owners} />
    </Container>
  );
}
