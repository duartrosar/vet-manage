import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import {
  PopoverContent,
  PopoverTrigger,
  Popover,
} from "@/components/ui/popover";
import { Pet } from "@prisma/client";
import clsx from "clsx";
import { Check, ChevronsUpDown } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import {
  FieldError,
  FieldValues,
  Path,
  PathValue,
  UseFormClearErrors,
  UseFormSetValue,
} from "react-hook-form";
import { useOnClickOutside } from "usehooks-ts";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { FaUser } from "react-icons/fa6";

interface ComboboxProps<T extends FieldValues> {
  label: string;
  error: FieldError | undefined;
  setValue: UseFormSetValue<T>;
  value: number;
  pets: Pet[];
  clearErrors: UseFormClearErrors<T>;
}

export default function PetsCombobox<T extends FieldValues>({
  label,
  error,
  setValue,
  value,
  pets,
  clearErrors,
}: ComboboxProps<T>) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [pet, setPet] = useState<Pet>();

  useEffect(() => {
    if (value) {
      const currentPet = pets.find((pet) => pet.id === value);

      setPet(currentPet);
    }
  }, [value]);

  useOnClickOutside(contentRef, (e: MouseEvent) => {
    const element = e.target as HTMLElement;
    const id = element.id;

    if (id === "toggler" || id === "icon") return;

    setDropdownOpen(!dropdownOpen);
  });

  return (
    <FormItem className="relative gap-1 space-y-0">
      <FormLabel className="pl-3 text-sm font-bold text-gray-500">
        {label}
      </FormLabel>
      <Popover open={dropdownOpen}>
        <PopoverTrigger
          id="toggler"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className={cn(
            `flex w-full cursor-pointer items-center justify-between rounded-lg border-2 border-cerulean-100/25 bg-transparent px-3 py-2 text-sm font-semibold text-gray-400 hover:bg-cerulean-800 focus:border-cerulean-600 focus:outline-2 focus:outline-cerulean-600`,
            error && "border-red-500",
            value && "text-gray-200",
          )}
        >
          <FormControl>
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-3">
                {pet?.imageUrl ? (
                  <Image
                    className="h-[30px] w-[30px] flex-none rounded-full bg-cerulean-950"
                    src={pet?.imageUrl}
                    width={30}
                    height={30}
                    alt="Profile picture"
                  />
                ) : (
                  <span className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-cerulean-950">
                    <FaUser className="h-[15px] w-[15px] text-cerulean-500/50" />
                  </span>
                )}
                {pet ? `${pet.name}` : "Select Pet"}
              </div>
              <ChevronsUpDown
                id="icon"
                className="ml-2 h-4 w-4 shrink-0 opacity-50"
              />
            </div>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent
          ref={contentRef}
          className="PopoverContent w-full rounded-lg border-0 bg-cerulean-900 p-0"
        >
          <Command className="rounded-lg border-2 border-cerulean-100/25 bg-cerulean-900 py-1 text-sm">
            <CommandInput
              className="text-gray-200"
              placeholder="Search Pet..."
            />
            <CommandEmpty className="py-6 text-center text-gray-400">
              No Pet found.
            </CommandEmpty>
            <CommandGroup>
              {pets.map((pet) => (
                <CommandItem
                  className="rounded-lg hover:bg-cerulean-800 hover:text-gray-200 aria-selected:bg-cerulean-800"
                  value={`${pet.id}`}
                  key={pet.id}
                  onSelect={() => {
                    setValue(
                      "petId" as Path<T>,
                      pet.id as PathValue<T, Path<T>>,
                    );
                    clearErrors("petId" as Path<T>);
                    setDropdownOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4 text-gray-400",
                      pet.id === value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  <div className="flex items-center gap-3">
                    {pet?.imageUrl ? (
                      <Image
                        className="h-[30px] w-[30px] flex-none rounded-full bg-cerulean-950"
                        src={pet?.imageUrl}
                        width={30}
                        height={30}
                        alt="Profile picture"
                      />
                    ) : (
                      <span className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-cerulean-950">
                        <FaUser className="h-[15px] w-[15px] text-cerulean-500/50" />
                      </span>
                    )}
                    {pets && <span className=" text-gray-400">{pet.name}</span>}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      <FormMessage className="absolute right-0 top-1 pr-3 text-right text-[10px] font-bold text-red-500" />
    </FormItem>
  );
}
