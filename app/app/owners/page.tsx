import Container from "@/components/container";
import OwnersList from "@/components/list/owner/list";
import prisma from "@/lib/db/prisma";

export default async function OwnersHome() {
  // const { owners } = await getOwners();
  const owners = await prisma.owner.findMany();

  return (
    <Container>
      <OwnersList owners={owners} />
    </Container>
  );
}
