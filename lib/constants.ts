import { SidebarItemsProp } from "./types";
import {
  IoCalendar,
  IoGrid,
  IoChatbox,
  IoPeople,
  IoPaw,
  IoSettings,
  IoPerson,
  IoLogOut,
} from "react-icons/io5";

export const genderOptions: string[] = ["Prefer not to say", "Female", "Male"];

export const sidebarItems: SidebarItemsProp[] = [
  {
    title: "Dashboard",
    urlPath: "/app",
    icon: IoGrid,
  },
  {
    title: "Appointments",
    urlPath: "/app",
    icon: IoCalendar,
  },
  {
    title: "Messages",
    urlPath: "/app",
    icon: IoChatbox,
  },
  {
    title: "Owners",
    urlPath: "/app/owners",
    icon: IoPeople,
  },
  {
    title: "Pets",
    urlPath: "/app",
    icon: IoPaw,
  },
  {
    title: "Settings",
    urlPath: "/app",
    icon: IoSettings,
  },
];
