import type { NextPage } from "next";
import HomePage from "../components/layout/HomePage";
import { UserContext, useUser } from "../components/hooks/User";
import Dashboard from "../components/ui/Dashboard";
import { useState } from "react";
import jwt from "jsonwebtoken";
import { env } from "process";
import http from "../lib/http";
import useSWR from "swr";

type UserState = {
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
};

type User = {
  userData: UserState;
};

const fetcher = (url: string) => http.get(url).then((res) => res.data);

const Home: NextPage<User> = ({ userData }) => {
  const [user, setUser] = useState<UserState>(userData);

  const { data } = useSWR("/api/lists", fetcher);
  userData.lists = data || [];

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {user.loggedIn ? <Dashboard /> : <HomePage />}
    </UserContext.Provider>
  );
};

export default Home;

Home.getInitialProps = async ({ req }) => {
  const cookies = req ? req.headers.cookie : document.cookie;
  const token = cookies
    ? cookies.split(";").find((c) => c.trim().startsWith("token="))
    : null;

  if (token) {
    try {
      const user: any = jwt.verify(
        token.split("=")[1],
        env.JWT_SECRET as string
      );
      return {
        userData: {
          id: user.id,
          name: user.name,
          email: user.email,
          lists: [],
          loggedIn: true,
        },
      };
    } catch {
      return {
        userData: {
          id: 0,
          name: "",
          email: "",
          lists: [],
          loggedIn: false,
        },
      };
    }
  }
  return {
    userData: {
      id: 0,
      name: "",
      email: "",
      lists: [],
      loggedIn: false,
    },
  };
};
