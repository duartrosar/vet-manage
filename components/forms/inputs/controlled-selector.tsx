"use client";

import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { FieldError } from "react-hook-form";

interface SelectProps {
  label: string;
  options?: string[];
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  error?: FieldError | undefined;
  onChange?(value: string): void;

  open?: boolean;
  defaultOpen?: boolean;
  autoComplete?: string;
  disabled?: boolean;
  required?: boolean;
}

export default function ControlledSelector({
  label,
  onChange,
  options,
  placeholder,
  defaultValue,
  error,
  value,
}: SelectProps) {
  const [isSelected, setIsSelected] = useState(false);
  return (
    <FormItem className="relative gap-1 space-y-0">
      <FormLabel className="pl-3 text-sm font-bold text-gray-500">
        {label}
      </FormLabel>
      <Select onValueChange={onChange} defaultValue={defaultValue}>
        <FormControl>
          <SelectTrigger
            className={clsx(
              "rounded-lg border-2 border-cerulean-100/25 bg-transparent px-3 py-2 font-semibold text-gray-400 hover:bg-cerulean-800 focus:border-cerulean-600 focus:outline-1 focus-visible:outline-none  focus-visible:ring-2 focus-visible:ring-cerulean-600",
              error && "border-red-500",
              value && "text-gray-200",
            )}
          >
            <SelectValue className="" placeholder={placeholder} />
          </SelectTrigger>
        </FormControl>
        <SelectContent
          position="popper"
          className="SelectContent z-50 rounded-lg border-2 border-cerulean-100/25 bg-cerulean-900 py-3 text-sm"
        >
          <div className="pl-3 pr-4">
            {options &&
              options.map((value, index) => (
                <SelectItem
                  key={index}
                  value={value}
                  className="cursor-pointer rounded-lg py-2 pr-3 font-semibold text-gray-400 transition hover:bg-cerulean-800 hover:text-gray-200 hover:shadow-md"
                >
                  {value}
                </SelectItem>
              ))}
          </div>
        </SelectContent>
      </Select>
      <FormMessage className="absolute -bottom-1 right-0 translate-y-full pr-3 text-right text-xs font-bold text-red-500" />
    </FormItem>
  );
}
