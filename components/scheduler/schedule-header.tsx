import clsx from "clsx";
import DateDisplayer from "./date-displayer";
import { View } from "@syncfusion/ej2-react-schedule";
import { useCallback } from "react";

interface HeaderProps {
  selectedDate: Date;
  selectedView: View;
  navigateToDate: (date: Date) => void;
  navigateToView: (date: View) => void;
}

interface ViewButtonProps {
  view: View;
  selectedView: View;
  navigateToView: (date: View) => void;
}

interface NavigationButtonProps {
  name: string;
  direction: 1 | -1;
  handleClick: (direction: 1 | -1) => void;
}

export default function ScheduleHeader({
  selectedView,
  selectedDate,
  navigateToDate,
  navigateToView,
}: HeaderProps) {
  const handleClick = useCallback(
    (direction: 1 | -1) => {
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
    },
    [selectedDate],
  );

  return (
    <div className="w-full">
      <div className="mb-3 flex w-full items-center justify-between rounded-lg border border-cerulean-700/25 bg-cerulean-900 px-3 py-3">
        <div className="space-x-1">
          <NavigationButton
            name="Prev"
            handleClick={handleClick}
            direction={-1}
          />
          <NavigationButton
            name="Next"
            handleClick={handleClick}
            direction={1}
          />
        </div>
        <div>
          <DateDisplayer
            className="text-sm text-gray-200"
            view={selectedView}
            date={selectedDate}
          />
        </div>
        <div className="space-x-1">
          <ViewButton
            navigateToView={navigateToView}
            view="Day"
            selectedView={selectedView}
          />
          <ViewButton
            navigateToView={navigateToView}
            view="Week"
            selectedView={selectedView}
          />
          <ViewButton
            navigateToView={navigateToView}
            view="Month"
            selectedView={selectedView}
          />
        </div>
      </div>
    </div>
  );
}

function ViewButton({ view, selectedView, navigateToView }: ViewButtonProps) {
  return (
    <button
      onClick={() => navigateToView(view)}
      className={clsx(
        "rounded px-4 py-1 text-sm transition duration-75 hover:bg-cerulean-800 hover:text-gray-200 hover:shadow-md",
        view === selectedView
          ? "bg-cerulean-800 text-gray-200"
          : "text-gray-400",
      )}
    >
      {view}
    </button>
  );
}

function NavigationButton({
  name,
  handleClick,
  direction,
}: NavigationButtonProps) {
  return (
    <button
      onClick={() => handleClick(direction)}
      className="rounded px-4 py-1 text-sm text-gray-400 transition duration-75 hover:bg-cerulean-800 hover:text-gray-200 hover:shadow-md"
    >
      {name}
    </button>
  );
}
