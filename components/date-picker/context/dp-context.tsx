import { createContext, Dispatch, SetStateAction } from "react";

export interface CurrentDate {
  selectedDay: number;
  selectedMonth: number;
  selectedYear: number;
}

export interface DatePickerContextValue {
  selectedView: string;
  setSelectedView: Dispatch<SetStateAction<string>>;
  currentDate: CurrentDate;
  setCurrentDate: Dispatch<SetStateAction<CurrentDate>>;
  dropdownOpen: boolean;
  setDropdownOpen: Dispatch<SetStateAction<boolean>>;
}

const DatePickerContext = createContext<DatePickerContextValue>({
  selectedView: "year",
  setSelectedView: () => {},
  currentDate: {
    selectedDay: new Date().getMonth(),
    selectedMonth: new Date().getMonth(),
    selectedYear: new Date().getFullYear(),
  },
  setCurrentDate: () => {},
  dropdownOpen: false,
  setDropdownOpen: () => {},
});

export default DatePickerContext;
