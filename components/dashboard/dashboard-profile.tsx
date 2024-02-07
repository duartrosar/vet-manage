import { auth } from "@/auth";
import React from "react";
import Image from "next/image";
import { FaUser } from "react-icons/fa6";
import Link from "next/link";
import { MdOutlineLaunch } from "react-icons/md";
import { getOwnerDataByUserId } from "@/lib/db/actions/owner-actions";
import { getVetDataByUserId } from "@/lib/db/actions/vet-actions";
import { format } from "date-fns";

export default async function DashboardProfile() {
  const session = await auth();

  if (!session) {
    return (
      <div className="space-y-4 pl-2">
        <h2 className="text-lg font-medium tracking-wide text-gray-200">
          About You
        </h2>
        <p className="text-sm font-medium tracking-wide text-gray-400">
          No user data found.
        </p>
      </div>
    );
  }

  const user = session.user;
  const roles = user.roles.flatMap((role) => role.role);

  let dateOfbirth: Date | null = new Date();
  let mobileNumber: string | null = "No mobile number found";

  if (roles.includes("CUSTOMER")) {
    // get owner dateofbirth and phone number
    const { owner } = await getOwnerDataByUserId(user.id);

    if (owner) {
      dateOfbirth = owner.dateOfBirth;
      mobileNumber = owner.mobileNumber;
    }
  } else {
    // get vet date of birth and phone number
    const { vet } = await getVetDataByUserId(user.id);

    if (vet) {
      dateOfbirth = vet.dateOfBirth;
      mobileNumber = vet.mobileNumber;
    }
  }

  function capitalize(word: string) {
    const lower = word.slice(1).toLowerCase();

    const firstLetter = word[0].toUpperCase();

    return firstLetter + lower;
  }

  console.log(user.roles);

  return (
    <div className="flex h-full flex-col space-y-4 ">
      <h2 className="text-lg font-medium tracking-wide text-gray-200">
        About you
      </h2>
      <div className="flex flex-1 flex-col justify-between gap-4">
        <div className="space-y-4 pl-2">
          {user?.image ? (
            <Image
              className="h-[40px] w-[40px] flex-none rounded-full bg-cerulean-950"
              src={user.image}
              width={40}
              height={40}
              alt="Profile picture"
            />
          ) : (
            <span className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-cerulean-950">
              <FaUser className="h-[25px] w-[25px] text-cerulean-500/50" />
            </span>
          )}
          <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-400">Name</span>
            <span className="text-sm text-gray-200">{user.name}</span>
          </div>
          {dateOfbirth && (
            <div className="flex flex-col gap-1">
              <span className="text-xs text-gray-400">Date Of Birth</span>
              <span className="text-sm text-gray-200">
                {format(dateOfbirth, "dd/MM/yyyy")}
              </span>
            </div>
          )}
          <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-400">Roles</span>
            <div>
              {roles.map((role) => (
                <span key={role} className="text-sm text-gray-200">
                  {capitalize(role)}{" "}
                  {roles.indexOf(role) < roles.length - 1 ? ", " : ""}
                </span>
              ))}
            </div>
          </div>
          {mobileNumber && (
            <div className="flex flex-col gap-1">
              <span className="text-xs text-gray-400">Phone Number</span>
              <span className="text-sm text-gray-200">{mobileNumber}</span>
            </div>
          )}
          <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-400">Email</span>
            <span className="text-sm text-gray-200">{user.email}</span>
          </div>
        </div>
        <Link
          href={"/app/dashboard"}
          target="_blank"
          className="group flex justify-center gap-1 rounded-md border border-cerulean-100/25 p-2 text-xs text-cerulean-400 transition hover:rounded-md hover:bg-cerulean-800 hover:text-cerulean-200"
        >
          Edit Profile
          {/* <MdOutlineLaunch className="w-3 text-gray-200 group-hover:text-cerulean-200" /> */}
        </Link>
      </div>
    </div>
  );
}
