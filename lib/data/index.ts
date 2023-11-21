import { Owner, data } from "../mockup/mockup";

export async function getOwners(): Promise<Owner[]> {
  return data;
}
