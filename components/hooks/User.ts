import { createContext, useContext } from "react";

export const UserContext = createContext({
  user: {
    id: 0,
    name: "",
    email: "",
    lists: [
      {
        id: 0,
        name: "",
        userId: 0,
        createdAt: "",
        updatedAt: "",
      },
    ],
    loggedIn: false,
  },
  setUser: (user: {
    id: number;
    name: string;
    email: string;
    lists: {
      id: number;
      name: string;
      userId: number;
      createdAt: string;
      updatedAt: string;
    }[];
    loggedIn: boolean;
  }) => {},
});

export const useUser = () => {
  return useContext(UserContext);
};
