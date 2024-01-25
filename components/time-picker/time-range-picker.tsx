"use client";

import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { FormField } from "../ui/form";
import TimePicker from "./time-picker";
import { addMinutes, format, subMinutes } from "date-fns";
import { UseFormReturn } from "react-hook-form";
import { AppointmentFormData } from "../forms/appointment/appointment-form";
import { SchedulerContext } from "../scheduler/scheduler-context";
import { changeTime } from "@/lib/utils";

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
  startTime,
  endTime,
  form,
}: TimePickerProps) {
  const [startTimeMin, setStartMin] = useState<Date>(minTime);
  const [endTimeMin, setEndTimeMin] = useState<Date>(addMinutes(startTime, 30));
  const [startTimeValue, setStarTimeValue] = useState<Date>(startTime);
  const [endTimeValue, setEndTimeValue] = useState<Date>(endTime);

  const onStartTimeChange = useCallback(
    (value: string) => {
      const newStartMin = changeTime(minTime, value);
      const newEndMin = addMinutes(newStartMin, 30);
      setEndTimeMin(newEndMin);

      if (newStartMin >= endTimeValue) {
        setEndTimeValue(addMinutes(newStartMin, 30));
      }
    },
    [endTimeValue],
  );

  const onEndTimeChange = useCallback((value: string) => {
    const curEndTime = changeTime(endTime, value);
    setEndTimeValue(curEndTime);
  }, []);

  const timeSlotsStart = useMemo(() => {
    const slots: Date[] = [];
    for (let i = minTime; i < maxTime; i = addMinutes(i, 30)) {
      slots.push(i);
    }
    return slots;
  }, [minTime]);

  const timeSlotsEnd = useMemo(() => {
    const slots: Date[] = [];
    for (let i = endTimeMin; i <= maxTime; i = addMinutes(i, 30)) {
      slots.push(i);
    }
    return slots;
  }, [endTimeMin]);

  return (
    <>
      <FormField
        control={form.control}
        name="startTime"
        render={({ field }) => (
          <TimePicker
            timeSlots={timeSlotsStart}
            onChange={field.onChange}
            defaultValue={format(startTime, "HH:mm")}
            onTimeChanged={onStartTimeChange}
            label="Start Time"
          />
        )}
      />
      <FormField
        control={form.control}
        name="endTime"
        render={({ field }) => (
          <TimePicker
            timeSlots={timeSlotsEnd}
            onChange={field.onChange}
            defaultValue={format(endTimeValue, "HH:mm")}
            onTimeChanged={onEndTimeChange}
            label="End Time"
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
