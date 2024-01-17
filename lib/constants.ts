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

import { MdHealthAndSafety } from "react-icons/md";

export const genderOptions: string[] = ["Prefer not to say", "Female", "Male"];

export const sidebarItems: SidebarItemsProp[] = [
  {
    title: "Dashboard",
    urlPath: "/app",
    icon: IoGrid,
  },
  {
    title: "Appointments",
    urlPath: "/app/appointments",
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
    urlPath: "/app/pets",
    icon: IoPaw,
  },
  { title: "Vets", urlPath: "/app/vets", icon: MdHealthAndSafety },
  {
    title: "Settings",
    urlPath: "/app",
    icon: IoSettings,
  },
];
