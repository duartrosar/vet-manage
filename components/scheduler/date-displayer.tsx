import { View } from "@syncfusion/ej2-react-schedule";
import { MONTHS } from "@/components/date-picker/constants";
import clsx from "clsx";

export default function DateDisplayer({
  date,
  view,
  className,
}: {
  date: Date;
  view: View;
  className: string;
}) {
  return (
    <>
      {view === "Day" && <DisplayDayView date={date} className={className} />}
      {view === "Week" && <DisplayWeekView date={date} className={className} />}
      {view === "Month" && (
        <DisplayMonthView date={date} className={className} />
      )}
    </>
  );
}

function DisplayDayView({
  date,
  className,
}: {
  date: Date;
  className: string;
}) {
  const month = MONTHS[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  return (
    <span className={clsx(className)}>
      {month} {day}, {year}
    </span>
  );
}

function DisplayMonthView({
  date,
  className,
}: {
  date: Date;
  className: string;
}) {
  const month = MONTHS[date.getMonth()];
  const year = date.getFullYear();
  return (
    <span className={clsx(className)}>
      {month}, {year}
    </span>
  );
}

function DisplayWeekView({
  date,
  className,
}: {
  date: Date;
  className: string;
}) {
  const year = date.getFullYear();
  const dayOfWeek = date.getDay();

  let firstOfWeek = new Date(date);
  firstOfWeek.setDate(date.getDate() - dayOfWeek);
  let month = MONTHS[firstOfWeek.getMonth()];
  let lastOfWeek = new Date(firstOfWeek);
  lastOfWeek.setDate(firstOfWeek.getDate() + 6);
  let lastMonth = MONTHS[lastOfWeek.getMonth()];

  return (
    <span className={clsx(className)}>
      {month} {firstOfWeek.getDate()} - {lastMonth !== month && lastMonth}{" "}
      {lastOfWeek.getDate()}, {year}
    </span>
  );
}
