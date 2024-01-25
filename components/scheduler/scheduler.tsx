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
  DragEventArgs,
  ResizeEventArgs,
} from "@syncfusion/ej2-react-schedule";
import { registerLicense } from "@syncfusion/ej2-base";
import ScheduleHeader from "./schedule-header";
import { SchedulerContext } from "./scheduler-context";
import SchedulerModal, { AppointmentData } from "./scheduler-modal";
import { appointments } from "./appointments";
import { Appointment } from "@prisma/client";

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

export default function Scheduler({
  appointments,
}: {
  appointments?: Appointment[];
}) {
  const { setIsOpen, setAppointmentData, schedulerRef } =
    useContext(SchedulerContext);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedView, setSelectedView] = useState<View>("Month");
  // const schedulerRef = useRef<ScheduleComponent>(null);
  const workingDays: number[] = [0, 1, 2, 3, 4, 5, 6];

  eventSettings.dataSource = appointments;

  function onPopupOpen(event: PopupOpenEventArgs): void {
    event.cancel = true;
    setIsOpen(true);
    console.log({ event });

    if (!event.data) return;

    event.data.isAllDay = false;
    const appointment = event.data as AppointmentData;

    appointment.minTime = new Date(
      appointment.startTime.getFullYear(),
      appointment.startTime.getMonth(),
      appointment.startTime.getDate(),
      9,
      0,
    );
    appointment.maxTime = new Date(
      appointment.startTime.getFullYear(),
      appointment.startTime.getMonth(),
      appointment.startTime.getDate(),
      18,
      0,
    );

    if (appointment.id) {
      setAppointmentData(appointment);
    } else {
      const year = appointment.startTime.getFullYear();
      const month = appointment.startTime.getMonth();
      const day = appointment.startTime.getDate();
      const startTime = new Date(year, month, day, 9, 0);
      const endTime = new Date(year, month, day, 9, 30);
      if (selectedView === "Day" || selectedView === "Week") {
        startTime.setHours(appointment.startTime.getHours());
        startTime.setMinutes(appointment.startTime.getMinutes());
        endTime.setHours(appointment.endTime.getHours());
        endTime.setMinutes(appointment.endTime.getMinutes());
      }
      appointment.startTime = startTime;
      appointment.endTime = endTime;
      setAppointmentData(appointment);
    }
  }

  function onDrag(event: DragEventArgs) {
    if (event.name === "dragStart") {
      event.cancel = true;
      return;
    }
    console.log({ event });
  }

  function onResize(event: ResizeEventArgs) {
    if (event.name === "resizeStart") {
      event.cancel = true;
      return;
    }
    console.log({ event });
  }

  const navigateToDate = useCallback((date: Date) => {
    setSelectedDate(date);
  }, []);

  const navigateToView = useCallback((view: View) => {
    if (schedulerRef?.current) {
      setSelectedView(view);
      schedulerRef.current.changeCurrentView(view);
    }
  }, []);

  function onActionBegin(e: ActionEventArgs) {
    if (!schedulerRef?.current || !e.event) return;

    const currentDate = schedulerRef.current.selectedDate;

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
          ref={schedulerRef}
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
          dragStop={onDrag}
          resizeStop={onResize}
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
