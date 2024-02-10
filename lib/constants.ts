import { SidebarItemProps } from "./types";
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

interface SidebarItem extends SidebarItemProps {
  rolesAllowed: string[];
}

export const sidebarItems: SidebarItem[] = [
  {
    title: "Dashboard",
    urlPath: "/app/dashboard",
    icon: IoGrid,
    rolesAllowed: ["ADMIN", "EMPLOYEE", "CUSTOMER"],
  },
  {
    title: "Appointments",
    urlPath: "/app/appointments",
    icon: IoCalendar,
    rolesAllowed: ["ADMIN", "EMPLOYEE"],
  },
  {
    title: "Messages",
    urlPath: "/app/messages",
    icon: IoChatbox,
    rolesAllowed: ["ADMIN", "EMPLOYEE", "CUSTOMER"],
  },
  {
    title: "Owners",
    urlPath: "/app/owners",
    icon: IoPeople,
    rolesAllowed: ["ADMIN", "EMPLOYEE"],
  },
  {
    title: "Pets",
    urlPath: "/app/pets",
    icon: IoPaw,
    rolesAllowed: ["ADMIN", "EMPLOYEE"],
  },
  {
    title: "Vets",
    urlPath: "/app/vets",
    icon: MdHealthAndSafety,
    rolesAllowed: ["ADMIN", "EMPLOYEE"],
  },

  {
    title: "Settings",
    urlPath: "/app",
    icon: IoSettings,
    rolesAllowed: ["ADMIN", "EMPLOYEE", "CUSTOMER"],
  },
];
