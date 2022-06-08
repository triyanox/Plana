import { createContext, useContext } from "react";

export const ModalContext = createContext({
  isOpen: false,
  setIsOpen: (isOpen: boolean) => {},
});

export const useModal = () => {
  return useContext(ModalContext);
};
