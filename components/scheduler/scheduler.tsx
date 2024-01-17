"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Day,
  Week,
  Month,
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  Inject,
  Resize,
  DragAndDrop,
  PopupOpenEventArgs,
  QuickInfoTemplatesModel,
  View,
  ActionEventArgs,
} from "@syncfusion/ej2-react-schedule";
import clsx from "clsx";
import { format } from "date-fns";
import { MONTHS } from "../date-picker/constants";
import { el } from "date-fns/locale";

export default function Scheduler() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedView, setSelectedView] = useState<View>("Month");
  const quickInfo: QuickInfoTemplatesModel = {
    content: '<div class="bg-red-500 w-full h-full">Hello World</div>',
  };

  function onPopupOpen(event: PopupOpenEventArgs): void {
    // event.cancel = true;
    console.log({ event });
  }

  const workingDays: number[] = [0, 1, 2, 3, 4, 5, 6];
  const scheduleRef = useRef<ScheduleComponent>(null);

  const navigateToDate = useCallback((date: Date) => {
    setSelectedDate(date);
  }, []);

  const navigateToView = useCallback((view: View) => {
    if (scheduleRef.current) {
      setSelectedView(view);
      scheduleRef.current.changeCurrentView(view);
    }
  }, []);

  function onActionBegin(e: ActionEventArgs) {
    if (!scheduleRef.current || !e.event) return;

    const currentDate = scheduleRef.current.selectedDate;

    setSelectedView("Day");
    setSelectedDate(currentDate);
  }

  return (
    <>
      <ScheduleHeader
        selectedDate={selectedDate}
        selectedView={selectedView}
        navigateToDate={navigateToDate}
        navigateToView={navigateToView}
      />
      <ScheduleComponent
        actionBegin={(e) => onActionBegin(e)}
        ref={scheduleRef}
        startHour="09:00"
        endHour="18:00"
        width="100%"
        height="100%"
        currentView="Month"
        selectedDate={selectedDate}
        popupOpen={(event) => onPopupOpen(event)}
        quickInfoTemplates={quickInfo}
        workDays={workingDays}
        showQuickInfo={false}
      >
        <ViewsDirective>
          <ViewDirective option="Week" />
          <ViewDirective option="Month" />
          <ViewDirective option="Day" />
        </ViewsDirective>
        <Inject services={[Week, Month, Day, Resize, DragAndDrop]} />
      </ScheduleComponent>
    </>
  );
}

interface HeaderProps {
  selectedDate: Date;
  selectedView: View;
  navigateToDate: (date: Date) => void;
  navigateToView: (date: View) => void;
}

function ScheduleHeader({
  selectedView,
  selectedDate,
  navigateToDate,
  navigateToView,
}: HeaderProps) {
  function handleClick(direction: 1 | -1) {
    const day = selectedDate.getDate();
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();

    if (selectedView === "Day") {
      navigateToDate(new Date(year, month, day + direction));
    }
    if (selectedView === "Month") {
      navigateToDate(new Date(year, month + direction, day));
    }
    if (selectedView === "Week") {
      navigateToDate(new Date(year, month, day + 7 * direction));
    }
  }

  return (
    <div className="flex h-16 w-full items-center justify-between bg-cerulean-950">
      <div className="">
        <button
          onClick={() => handleClick(-1)}
          className="px-5 py-3 text-sm text-white hover:bg-gray-700"
        >
          Prev
        </button>
        <button
          onClick={() => handleClick(1)}
          className="px-5 py-3 text-sm text-white hover:bg-gray-700"
        >
          Next
        </button>
      </div>
      <div>
        <DateDisplayer view={selectedView} date={selectedDate} />
      </div>
      <div>
        <button
          onClick={() => navigateToView("Day")}
          className={clsx(
            "px-5 py-3 text-sm text-white hover:bg-gray-700",
            selectedView === "Day" && "bg-gray-700",
          )}
        >
          Day
        </button>
        <button
          onClick={() => navigateToView("Week")}
          className={clsx(
            "px-5 py-3 text-sm text-white hover:bg-gray-700",
            selectedView === "Week" && "bg-gray-700",
          )}
        >
          Week
        </button>
        <button
          onClick={() => navigateToView("Month")}
          className={clsx(
            "px-5 py-3 text-sm text-white hover:bg-gray-700",
            selectedView === "Month" && "bg-gray-700",
          )}
        >
          Month
        </button>
      </div>
    </div>
  );
}

function DateDisplayer({ date, view }: { date: Date; view: View }) {
  if (view === "Month") {
    const month = MONTHS[date.getMonth()];
    const year = date.getFullYear();
    return (
      <span className="text-white">
        {month} - {year}
      </span>
    );
  }

  if (view === "Week") {
    const year = date.getFullYear();
    const dayOfWeek = date.getDay();
    const dayOfMonth = date.getDate();
    const daysInMonth = new Date(year, date.getMonth() + 1, 0).getDate();
    const month = new Date(year, date.getMonth() + 1, 0).getMonth();

    let firstOfWeek;
    console.log({ "dayOfMonth - dayOfWeek =": dayOfMonth - dayOfWeek });
    console.log({ "daysInMonth - dayOfWeek =": daysInMonth - dayOfWeek });

    // firstOfWeek =
    //   dayOfMonth - dayOfWeek <= 0
    //     ? daysInMonth - dayOfWeek
    //     : dayOfMonth - dayOfWeek;

    console.log({ month });
    console.log({ dayOfWeek });
    console.log({ daysInMonth });
  }

  if (view === "Day") {
    // console.log({ date });
    const month = MONTHS[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return (
      <span className="text-white">
        {month} {day}, - {year}
      </span>
    );
  }

  return <div></div>;
}
