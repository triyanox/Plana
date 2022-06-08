import { createContext, useContext } from "react";

export const MenuContext = createContext({
  isActive: false,
  setIsActive: (isActive: boolean) => {},
});

export const useMenu = () => {
  return useContext(MenuContext);
};
