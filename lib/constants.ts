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

export const commonSidebarItems: SidebarItemProps[] = [
  {
    title: "Dashboard",
    urlPath: "/app/dashboard",
    icon: IoGrid,
    // pathName: "dashboard",
  },
];

export const employeeSidebarItems: SidebarItemProps[] = [
  {
    title: "Appointments",
    urlPath: "/app/appointments",
    icon: IoCalendar,
    // pathName: "appointments",
  },
  {
    title: "Messages",
    urlPath: "/app/messages",
    icon: IoChatbox,
    // pathName: "messages",
  },
  {
    title: "Owners",
    urlPath: "/app/owners",
    icon: IoPeople,
    // pathName: "owners",
  },
  {
    title: "Pets",
    urlPath: "/app/pets",
    icon: IoPaw,
    // pathName: "pets",
  },
  {
    title: "Vets",
    urlPath: "/app/vets",
    icon: MdHealthAndSafety,
    // pathName: "vets",
  },
];

export const ownerSideBarItems: SidebarItemProps[] = [
  {
    title: "Messages",
    urlPath: "/app/messages",
    icon: IoChatbox,
    // pathName: "messages",
  },
  {
    title: "My Pets",
    urlPath: "/app/my-pets",
    icon: IoPaw,
    // pathName: "my-pets",
  },
];
