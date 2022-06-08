import { createContext, useContext } from "react";

export const CreateList = createContext({
  isListOpen: false,
  setIsListOpen: (isListOpen: boolean) => {},
});

export const useCreateList = () => {
  return useContext(CreateList);
};
