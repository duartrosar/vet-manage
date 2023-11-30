import { createContext, Dispatch, SetStateAction } from "react";

interface SidebarContextValue {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const SidebarContext = createContext<SidebarContextValue>({
  isOpen: true,
  setIsOpen: () => {},
});

export default SidebarContext;
