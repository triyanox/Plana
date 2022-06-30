import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";

type TabProps = {
  icon: ReactNode;
  text: string;
  date?: string;
  onClick?: () => void;
};

const Tab = (props: TabProps) => {
  return (
    <AnimatePresence exitBeforeEnter>
      <motion.button
        initial={{ opacity: 0, y: -20, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.8 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        onClick={props.onClick}
        className="flex  outline-none  transition-all duration-300 lg:hover:bg-zinc-100  lg:hover:dark:bg-zinc-800 text-black dark:text-white justify-between px-4 items-center w-full py-2 rounded-xl "
      >
        <div className="flex gap-4 justify-start items-center">
          {props.icon}
          <span className=" text-2xl">{props.text}</span>
        </div>
        {props.date && (
          <div className="text-sm rounded-lg px-2 py-1 bg-zinc-200 dark:bg-zinc-700">
            {props.date}
          </div>
        )}
      </motion.button>
    </AnimatePresence>
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
