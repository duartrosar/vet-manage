"use client";

import React, { useEffect, useState } from "react";
import clsx from "clsx";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "../ui/select";
import { addMinutes, format } from "date-fns";

interface TimePickerProps {
  minTime: Date;
  maxTime: Date;
  label: string;
  onTimeChanged: (value: string) => void;
}

export default function TimePicker({
  minTime,
  maxTime,
  label,
  onTimeChanged,
}: TimePickerProps) {
  const [timeSlots, setTimeSlots] = useState<Date[]>([]);

  const [value, setValue] = useState<string>(format(minTime, "HH:mm"));

  useEffect(() => {
    const curTimeSlots: Date[] = [];

    for (let i = minTime; i <= maxTime; i = addMinutes(i, 30)) {
      curTimeSlots.push(i);
    }
    setTimeSlots(curTimeSlots);
    setValue(format(curTimeSlots[0], "HH:mm"));
  }, [minTime]);

  const onValueChange = (value: string) => {
    setValue(value);
    onTimeChanged(value);
  };

  const changeTime = (date: Date, timeString: string) => {
    const [hours, minutes] = timeString.split(":");
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));
    return date;
  };

  return (
    <div className="gap-1">
      <label className="pl-3 text-sm font-bold text-gray-500">{label}</label>
      <Select onValueChange={(value) => onValueChange(value)} value={value}>
        <SelectTrigger
          className={clsx(
            "rounded-lg border-2 border-cerulean-100/25 bg-transparent px-3 py-0 font-semibold text-gray-400 hover:bg-cerulean-800 focus:border-cerulean-600 focus:outline-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cerulean-600",
          )}
        >
          <span>{value}</span>
        </SelectTrigger>
        <SelectContent className="SelectContentNoHeight z-50 max-h-52 rounded-lg border-2 border-cerulean-100/25 bg-cerulean-900 py-1 text-sm">
          <SelectGroup>
            <div className="space-y-1 pl-1 pr-2">
              {timeSlots.map((value, index) => (
                <SelectItem
                  key={index}
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
    </div>
  );
}
