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
import { Owner } from "@prisma/client";
import clsx from "clsx";
import { Check, ChevronsUpDown } from "lucide-react";
import React, { useRef, useState } from "react";
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
import { SERVER_DIRECTORY } from "next/dist/shared/lib/constants";

interface ComboboxProps<T extends FieldValues> {
  label: string;
  error: FieldError | undefined;
  setValue: UseFormSetValue<T>;
  value: number;
  owners: Owner[];
  clearErrors: UseFormClearErrors<T>;
}

export default function ControlledCombobox<T extends FieldValues>({
  label,
  error,
  setValue,
  value,
  owners,
  clearErrors,
}: ComboboxProps<T>) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
            <span className="flex w-full items-center justify-between">
              {value
                ? `${owners.find((owner) => owner.id === value)
                    ?.firstName} ${owners.find((owner) => owner.id === value)
                    ?.lastName}`
                : "Select Owner"}
              <ChevronsUpDown
                id="icon"
                className="ml-2 h-4 w-4 shrink-0 opacity-50"
              />
            </span>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent
          ref={contentRef}
          className="PopoverContent w-full rounded-lg border-0 bg-cerulean-900 p-0"
        >
          <Command className="rounded-lg border-2 border-cerulean-100/25 bg-cerulean-900 py-1 text-sm">
            <CommandInput
              className="text-gray-200"
              placeholder="Search Owner..."
            />
            <CommandEmpty className="py-6 text-center text-gray-400">
              No owner found.
            </CommandEmpty>
            <CommandGroup>
              {owners.map((owner) => (
                <CommandItem
                  className="rounded-lg hover:bg-cerulean-800 hover:text-gray-200 aria-selected:bg-cerulean-800"
                  value={`${owner.firstName} ${owner.lastName}`}
                  key={owner.id}
                  onSelect={() => {
                    setValue(
                      "ownerId" as Path<T>,
                      owner.id as PathValue<T, Path<T>>,
                    );
                    clearErrors("ownerId" as Path<T>);
                    setDropdownOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4 text-gray-400",
                      owner.id === value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  <div className="flex items-center gap-3">
                    {owner?.imageUrl ? (
                      <Image
                        className="flex-none rounded-full bg-cerulean-950"
                        src={owner?.imageUrl}
                        width={30}
                        height={30}
                        alt="Profile picture"
                      />
                    ) : (
                      <span className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-cerulean-950">
                        <FaUser className="h-[15px] w-[15px] text-cerulean-500/50" />
                      </span>
                    )}
                    {owners && (
                      <span className=" text-gray-400">
                        {owner.firstName} {owner.lastName}
                      </span>
                    )}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      <FormMessage className="absolute -bottom-1 right-0 translate-y-full pr-3 text-right text-xs font-bold text-red-500" />
    </FormItem>
  );
}
