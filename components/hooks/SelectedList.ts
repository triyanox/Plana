import { Status } from "@prisma/client";
import { createContext, ReactNode, useContext, useState } from "react";

type SelectedListContextType = {
  seletedList: {
    id: number;
    name: string;
    userId: number;
    createdAt: string;
    updatedAt: string;
  };
  setSeletedList: (list: {
    id: number;
    name: string;
    userId: number;
    createdAt: string;
    updatedAt: string;
  }) => void;
};

export const selListContext = createContext<SelectedListContextType>({
  seletedList: {
    id: 0,
    name: "",
    userId: 0,
    createdAt: "",
    updatedAt: "",
  },
  setSeletedList: (seletedList) => {},
});

export const useSelectedList = () => {
  return useContext(selListContext);
};
