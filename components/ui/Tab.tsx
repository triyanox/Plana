import { ReactNode } from "react";

type TabProps = {
  icon: ReactNode;
  text: string;
};

const Tab = (props: TabProps) => {
  return (
    <button className="flex gap-4 transition-all duration-700 hover:bg-zinc-300 hover:dark:bg-zinc-700 text-black dark:text-white justify-start px-4 items-center w-full py-2 rounded-xl ">
      {props.icon}
      <span className=" text-2xl">{props.text}</span>
    </button>
  );
};

export default Tab;
