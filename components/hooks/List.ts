import { Status } from "@prisma/client";
import { createContext, ReactNode, useContext, useState } from "react";

export type todo = {
  id: number;
  text: string;
  status: Status;
};

type ListContextType = {
  list: todo[];
  setList: (list: todo[]) => void;
};

export const ListContext = createContext<ListContextType>({
  list: [],
  setList: (list: todo[]) => {},
});

export const useList = () => {
  return useContext(ListContext);
};
