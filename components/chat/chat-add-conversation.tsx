"use session";

import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IoAddOutline } from "react-icons/io5";
import {
  getUser,
  getEmployeeUsers,
  getAllUsers,
} from "@/lib/db/actions/user-actions";
import Image from "next/image";
import { FaUser } from "react-icons/fa6";
import { User } from "@prisma/client";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { createConversation } from "@/lib/db/actions/chat-actions";
import { useSession } from "next-auth/react";

export default function ChatAddConversation() {
  const [isOpen, setIsOpen] = useState<boolean>();
  const [employeeUsers, setEmployeeUsers] = useState<User[]>();
  const [customerUsers, setCustomerUsers] = useState<User[]>();
  const session = useSession();

  useEffect(() => {
    const fetchUsers = async () => {
      if (!session.data?.user) return;
      const user = session.data.user;
      const userId = session.data.user.id;

      // TODO: extract this logic into a hook
      // Add a remove user function to more easily
      // remove users from the list when we add a new conversation
      const isCustomer = user.roles.some((role) => role.role === "CUSTOMER");

      const result = await getEmployeeUsers(userId);

      if (result?.users) {
        setEmployeeUsers(result.users);
      }

      if (!isCustomer) {
        const result = await getAllUsers(userId);

        if (result?.users) {
          setCustomerUsers(result.users);
        }
      }
    };
    fetchUsers();
  }, [session]);

  const onValueChange = async (value: string) => {
    const userId = value.split("-")[0];

    await createConversation(userId);

    const newUsers = employeeUsers?.filter((user) => user.id !== userId);

    setEmployeeUsers(newUsers);

    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger className="rounded-lg p-3 hover:bg-cerulean-800">
        <IoAddOutline className="h-[20px] w-[20px] cursor-pointer text-white" />
      </PopoverTrigger>
      <PopoverContent align="start" className="border-0 bg-cerulean-900 p-0">
        <Command
          onValueChange={onValueChange}
          className="z-50 space-y-2 overflow-y-auto rounded-lg border-2 border-cerulean-100/25 bg-cerulean-900 py-2 text-sm"
        >
          <CommandInput
            className="px-2 text-gray-200"
            placeholder="Search User..."
          />
          <CommandEmpty className="py-6 text-center text-gray-400">
            No User found.
          </CommandEmpty>
          <CommandList>
            {employeeUsers?.length && (
              <CommandGroup heading="Vets" className="px-2">
                {employeeUsers.map((user, index) => (
                  <CommandItem
                    onSelect={onValueChange}
                    key={user.id}
                    value={user.id + "-" + `${user.name}`}
                    className="flex w-full cursor-pointer items-center gap-2 rounded-lg p-2 hover:bg-cerulean-800 aria-selected:bg-cerulean-800"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-cerulean-100/10">
                      {user.image ? (
                        <Image
                          className="h-11 w-11 flex-none rounded-full"
                          src={user.image}
                          width={50}
                          height={50}
                          alt="Profile picture"
                        />
                      ) : (
                        <FaUser className="h-[20px] w-[20px] text-cerulean-500/50" />
                      )}
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-white">
                        {user?.name}
                      </p>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            {customerUsers?.length && (
              <CommandGroup heading="Owners" className="px-2">
                {customerUsers.map((user, index) => (
                  <CommandItem
                    onSelect={onValueChange}
                    key={user.id}
                    value={user.id + "-" + `${user.name}`}
                    className="flex w-full cursor-pointer items-center gap-2 rounded-lg p-2 hover:bg-cerulean-800 aria-selected:bg-cerulean-800"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-cerulean-100/10">
                      {user.image ? (
                        <Image
                          className="h-11 w-11 flex-none rounded-full"
                          src={user.image}
                          width={50}
                          height={50}
                          alt="Profile picture"
                        />
                      ) : (
                        <FaUser className="h-[20px] w-[20px] text-cerulean-500/50" />
                      )}
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-white">
                        {user?.name}
                      </p>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
