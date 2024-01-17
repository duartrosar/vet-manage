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
import { registerLicense } from "@syncfusion/ej2-base";
import DateDisplayer from "./date-displayer";
import ScheduleHeader from "./schedule-header";

registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NAaF5cWWJCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWX5fd3RcRWdcU0xzV0I=",
);

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
      <div className="w-full flex-1 rounded-lg border border-cerulean-700/25">
        {/*  */}
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
        {/* <div className="bg-cerulean-950 py-8"></div> */}
      </div>
    </>
  );
}
