import { ReactNode } from "react";

type TabProps = {
  icon: ReactNode;
  text: string;
  onClick?: () => void;
};

const Tab = (props: TabProps) => {
  return (
    <button
      onClick={props.onClick}
      className="flex gap-4   transition-all duration-700 hover:bg-zinc-200 hover:dark:bg-zinc-700 text-black dark:text-white justify-start px-4 items-center w-full py-2 rounded-xl "
    >
      {props.icon}
      <span className=" text-2xl">{props.text}</span>
    </button>
  );
};

export default Tab;

export const TabSm = (props: TabProps) => {
  return (
    <button
      onClick={props.onClick}
      className="flex gap-2 transition-all duration-700 hover:bg-zinc-100 hover:dark:bg-zinc-900 text-black dark:text-white justify-start px-4 items-center w-full py-2 rounded-xl "
    >
      {props.icon}
      <span className=" text-lg">{props.text}</span>
    </button>
  );
};
