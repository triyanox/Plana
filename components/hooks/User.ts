import { createContext, useContext } from "react";

export const UserContext = createContext({
  id: 0,
  name: "",
  email: "",
  loggedIn: false,
});

export const useUser = () => {
  return useContext(UserContext);
};
