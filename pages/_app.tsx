import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { UserContext } from "../components/hooks/User";
import http from "../lib/http";

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

function MyApp({ Component, pageProps, router }: AppProps) {
  const [user, setUser] = useState<UserState>({
    id: 0,
    name: "",
    email: "",
    lists: [],
    loggedIn: false,
  });
  useEffect(() => {
    http
      .get("/api/user/me")
      .then((res) => {
        setUser({
          id: res.data.user.id,
          name: res.data.user.name,
          email: res.data.user.email,
          lists: res.data.user.lists,
          loggedIn: true,
        });
      })
      .catch((err) => {
        setUser({
          id: 0,
          name: "",
          email: "",
          lists: [],
          loggedIn: false,
        });
      });
  }, []);

  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        key={router.route}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transformOrigin: "50% 50%" }}
        exit={{ opacity: 0, transformOrigin: "center" }}
        transition={{
          duration: 0.5,
          damping: 300,
          ease: "easeInOut",
          stiffness: 300,
        }}
      >
        <NextThemesProvider attribute="class">
          <UserContext.Provider value={{ user, setUser }}>
            <Component {...pageProps} />
          </UserContext.Provider>
        </NextThemesProvider>
      </motion.div>
    </AnimatePresence>
  );
}

export default MyApp;
