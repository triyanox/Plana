import Fcard from "./FocusedCard";
import GetThingsDone from "./GetThingsDone";
import StayFocused from "./StayFocused";
const Features = () => {
  return (
    <section className="w-full pt-24 lg:pt-48 px-6 sm:px-8 md:px-12 flex flex-col items-center justify-center gap-8">
      <GetThingsDone />
      <StayFocused />
      <Fcard />
    </section>
  );
};
export default Features;
