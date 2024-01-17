"use client";

import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
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
  EventSettingsModel,
} from "@syncfusion/ej2-react-schedule";
import { registerLicense } from "@syncfusion/ej2-base";
import ScheduleHeader from "./schedule-header";
import { SchedulerContext } from "./scheduler-context";
import SchedulerModal from "./scheduler-modal";
import { appointments } from "./appointments";

registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NAaF5cWWJCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWX5fd3RcRWdcU0xzV0I=",
);

const eventSettings: EventSettingsModel = {
  dataSource: appointments,
  fields: {
    id: "id",
    subject: { name: "subject" },
    location: { name: "vetName" },
    startTime: { name: "startTime" },
    endTime: { name: "endTime" },
  },
};

export default function Scheduler() {
  const { setIsOpen } = useContext(SchedulerContext);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedView, setSelectedView] = useState<View>("Month");

  function onPopupOpen(event: PopupOpenEventArgs): void {
    event.cancel = true;
    setIsOpen(true);
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
      <SchedulerModal />
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
          workDays={workingDays}
          showQuickInfo={false}
          eventSettings={eventSettings}
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
