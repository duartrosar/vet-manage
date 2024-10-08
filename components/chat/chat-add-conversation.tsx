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
import useFilterUsers from "@/lib/hooks/useFilterUsers";
import { Button } from "../ui/button";
import Avatar from "../avatar/avatar";

export default function ChatAddConversation() {
  const [isOpen, setIsOpen] = useState<boolean>();
  const { employees, customers, filterUsers, removeUser } = useFilterUsers();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/api/conversations/users", {
        method: "GET",
      });

      const { users, isCustomer } = await response.json();

      if (users) {
        filterUsers(users, isCustomer);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    // ({ employees });
    // ({ customers });
  }, [employees, customers]);

  const onValueChange = async (value: string) => {
    const userId = value.split("-")[0];

    await createConversation(userId);

    removeUser(userId);

    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger className="rounded-lg">
        <Button>
          <IoAddOutline className="h-[20px] w-[20px] cursor-pointer" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="p-0">
        <Command
          onValueChange={onValueChange}
          className="z-50 space-y-2 overflow-y-auto rounded-lg py-2 text-sm"
        >
          <CommandInput className="px-2" placeholder="Search User..." />
          <CommandEmpty className="py-6 text-center text-gray-600">
            No User found.
          </CommandEmpty>
          <CommandList>
            {employees?.length && (
              <CommandGroup heading="Vets" className="px-2">
                {employees.map((user, index) => (
                  <CommandItem
                    onSelect={onValueChange}
                    key={user.id}
                    value={user.id + "-" + `${user.name}`}
                    className="flex w-full cursor-pointer items-center gap-2 rounded-lg p-2 "
                  >
                    <Avatar
                      imageUrl={user.image}
                      width={45}
                      height={45}
                      type="user"
                    />
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-gray-800 dark:text-white">
                        {user?.name}
                      </p>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            {customers?.length && (
              <CommandGroup heading="Owners" className="px-2">
                {customers.map((user, index) => (
                  <CommandItem
                    onSelect={onValueChange}
                    key={user.id}
                    value={user.id + "-" + `${user.name}`}
                    className="flex w-full cursor-pointer items-center gap-2 rounded-lg p-2"
                  >
                    <Avatar
                      imageUrl={user.image}
                      width={45}
                      height={45}
                      type="user"
                    />
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-gray-800 dark:text-white">
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
