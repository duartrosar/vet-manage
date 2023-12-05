import { createContext, Dispatch, SetStateAction } from "react";

export interface FormOpenState {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  entityId: number;
  setEntityId: Dispatch<SetStateAction<number>>;
}

const FormStateContext = createContext<FormOpenState>({
  isOpen: false,
  setIsOpen: () => {},
  entityId: 0,
  setEntityId: () => {},
});

export default FormStateContext;
