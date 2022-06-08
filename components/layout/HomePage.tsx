import Features from "../ui/Features";
import Hero from "../ui/Hero";
import Main from "./Main";

const HomePage = () => {
  return (
    <Main
      pageTitle="Plana | Regain control"
      siteName="Plana"
      description="Minimal To-Do app"
    >
      <Hero />
      <Features />
    </Main>
  );
};

export default HomePage;
