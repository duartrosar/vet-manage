"use client";

import React, { useCallback, useEffect, useState } from "react";
import { FormField } from "../ui/form";
import TimePicker from "./time-picker";
import { addMinutes, format, subMinutes } from "date-fns";
import { UseFormReturn } from "react-hook-form";
import { AppointmentFormData } from "../forms/appointment/appointment-form";

interface TimePickerProps {
  minTime: Date;
  maxTime: Date;
  startTime: Date;
  endTime: Date;
  form: UseFormReturn<AppointmentFormData>;
}

export default function TimeRangePicker({
  minTime,
  maxTime,
  startTime: startTime,
  endTime: endTime,
  form,
}: TimePickerProps) {
  // const [timeSlots, setTimeSlots] = useState<Date[]>([]);
  const [startTimeMin, setStartMin] = useState<Date>(minTime);
  const [endTimeMin, setEndTimeMin] = useState<Date>(addMinutes(startTime, 30));
  const [endTimeValue, setEndTimeValue] = useState<Date>(endTime);

  const [value, setValue] = useState<string>(format(minTime, "HH:mm"));

  useEffect(() => {
    // setStartMin(startTime);
    // setEndTimeMin(addMinutes(endTime, 30));
  }, []);

  const onStartTimeChange = useCallback(
    (value: string) => {
      const newStartMin = changeTime(minTime, value);
      const newEndMin = addMinutes(newStartMin, 30);
      setEndTimeMin(newEndMin);
      // console.log({ newStartMin });
      // console.log({ endTimeValue });
      if (newStartMin >= endTimeValue) {
        setEndTimeValue(addMinutes(newStartMin, 30));
      }
    },
    [endTimeValue],
  );

  const onEndTimeChange = useCallback((value: string) => {
    const curEndTime = changeTime(endTime, value);
    // console.log({ curEndTime });
    setEndTimeValue(curEndTime);
    // const endTimeVa/lue
  }, []);

  useEffect(() => {
    // console.log({ startTimeMin });
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
      <FormField
        control={form.control}
        name="startTime"
        render={({ field }) => (
          <TimePicker
            onChange={field.onChange}
            defaultValue={format(startTime, "HH:mm")}
            onTimeChanged={onStartTimeChange}
            label="Start Time"
            minTime={startTimeMin}
            maxTime={subMinutes(maxTime, 30)}
          />
        )}
      />
      <FormField
        control={form.control}
        name="endTime"
        render={({ field }) => (
          <TimePicker
            onChange={field.onChange}
            defaultValue={format(endTimeValue, "HH:mm")}
            onTimeChanged={onEndTimeChange}
            label="End Time"
            minTime={endTimeMin}
            maxTime={maxTime}
          />
        )}
      />
      {/* <TimePicker
        onChange={() => {}}
        onTimeChanged={onEndTimeChange}
        label="End Time"
        minTime={endTimeMin}
        maxTime={maxTime}
      /> */}
    </>
  );
}
