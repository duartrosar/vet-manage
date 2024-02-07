"use client";

import React, { useEffect, useState } from "react";
import clsx from "clsx";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { addMinutes, format } from "date-fns";
import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";

interface TimePickerProps {
  timeSlots: Date[];
  label: string;
  defaultValue: string;
  onChange(value: string): void;
  onTimeChanged: (value: string) => void;
}

export default function TimePicker({
  label,
  onTimeChanged,
  defaultValue,
  onChange,
  timeSlots,
}: TimePickerProps) {
  const [value, setValue] = useState<string>(defaultValue);
  useEffect(() => {
    setValue(defaultValue);
    onChange(defaultValue);
  }, [defaultValue]);

  const onValueChange = (value: string) => {
    onChange(value);
    setValue(value);
    onTimeChanged(value);
  };

  return (
    <FormItem className="relative gap-1 space-y-0">
      <FormLabel className="pl-3 text-sm font-bold text-gray-500">
        {label}
      </FormLabel>
      <Select onValueChange={(value) => onValueChange(value)} value={value}>
        <FormControl>
          <SelectTrigger
            className={clsx(
              "w-full rounded-lg border-2 border-cerulean-100/25 bg-transparent px-3 py-0 font-semibold text-gray-400 hover:bg-cerulean-800 focus:border-cerulean-600 focus:outline-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cerulean-600",
            )}
          >
            <span>{value}</span>
          </SelectTrigger>
        </FormControl>
        <SelectContent className="SelectContentNoHeight z-50 max-h-52 rounded-lg border-2 border-cerulean-100/25 bg-cerulean-900 py-1 text-sm">
          <SelectGroup>
            <div className="space-y-1 pl-1 pr-2">
              {timeSlots.map((value, index) => (
                <SelectItem
                  key={format(value, "HH:mm")}
                  value={format(value, "HH:mm")}
                  className="cursor-pointer justify-end rounded-md py-2 pr-4 text-right font-semibold text-gray-400 transition hover:bg-cerulean-800 hover:text-gray-200 hover:shadow-md"
                >
                  {format(value, "HH:mm")}
                </SelectItem>
              ))}
            </div>
          </SelectGroup>
        </SelectContent>
      </Select>
      <FormMessage className="absolute -bottom-1 right-0 translate-y-full pr-3 text-right text-xs font-bold text-red-500" />
    </FormItem>
  );
}
