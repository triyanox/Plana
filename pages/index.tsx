import type { NextPage } from "next";
import HomePage from "../components/layout/HomePage";
import { useUser } from "../components/hooks/User";
import Dashboard from "../components/ui/Dashboard";

const Home: NextPage = () => {
  const { user } = useUser();
  return user.loggedIn ? <Dashboard /> : <HomePage />;
};

export default Home;
