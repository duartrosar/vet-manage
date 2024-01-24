"use client";

import React, { useCallback, useEffect, useState } from "react";
import { FormField } from "../ui/form";
import TimePickerProvider from "./time-picker-context";
import TimePicker from ".";
import { addMinutes, format, subMinutes } from "date-fns";

interface TimePickerProps {
  minTime: Date;
  maxTime: Date;
}

export default function TimeRangePicker({ minTime, maxTime }: TimePickerProps) {
  // const [timeSlots, setTimeSlots] = useState<Date[]>([]);
  const [startTimeMin, setStartMin] = useState<Date>(minTime);
  const [endTimeMin, setEndTimeMin] = useState<Date>(addMinutes(minTime, 30));

  const [value, setValue] = useState<string>(format(minTime, "HH:mm"));

  useEffect(() => {}, []);

  const onStartTimeChange = useCallback((value: string) => {
    console.log({ startTime: value });
    const newStartMin = changeTime(minTime, value);
    const newEndMin = addMinutes(newStartMin, 30);
    setEndTimeMin(newEndMin);
  }, []);

  const onEndTimeChange = useCallback((value: string) => {
    console.log({ endTime: value });
  }, []);

  useEffect(() => {
    console.log({ startTimeMin });
  }, [startTimeMin]);

  const changeTime = (date: Date, timeString: string) => {
    const newDate = new Date(date);
    const [hours, minutes] = timeString.split(":");
    newDate.setHours(parseInt(hours, 10));
    newDate.setMinutes(parseInt(minutes, 10));
    return newDate;
  };
  return (
    <>
      <TimePicker
        onTimeChanged={onStartTimeChange}
        label="Start Time"
        minTime={startTimeMin}
        maxTime={subMinutes(maxTime, 30)}
      />
      <TimePicker
        onTimeChanged={onEndTimeChange}
        label="End Time"
        minTime={endTimeMin}
        maxTime={maxTime}
      />
    </>
  );
}
