import { ReactNode } from "react";

type FilledButton = {
  text: string;
  onClick?: () => void;
};

export const FilledButton = (props: FilledButton) => {
  return (
    <button className="px-6 py-2 rounded-full text-white dark:text-black bg-black dark:bg-white text-xl font-bold ring-zinc-200 dark:ring-zinc-800 hover:ring-4 hover:scale-105 transition-all duration-300 active:scale-95">
      {props.text}
    </button>
  );
};

export const ActionButton = (props: FilledButton) => {
  return (
    <button className="px-8 py-3 rounded-full font-bold text-white dark:text-black bg-black dark:bg-white text-lg ring-0 hover:ring-4 ring-zinc-200 dark:ring-zinc-800 hover:scale-105 transition-all duration-300 active:scale-95">
      {props.text}
    </button>
  );
};

type IconButton = {
  icon: ReactNode;
  onclick?: () => void;
};

export const IconButton = (props: IconButton) => {
  return (
    <button
      onClick={props.onclick}
      className="p-2 rounded-full text-white dark:text-black bg-black dark:bg-white text-xl font-bold ring-zinc-200 dark:ring-zinc-800 hover:ring-4 hover:scale-105 transition-all duration-300 active:scale-95"
    >
      {props.icon}
    </button>
  );
};

type SubmitButton = {
  text: string;
};

export const SubmitButton = (props: SubmitButton) => {
  return (
    <button
      type="submit"
      className="w-[360px] md:w-[400px] mt-4 dark:bg-zinc-100 bg-zinc-900 dark:text-black text-white font-bold py-3 px-4 rounded-2xl hover:ring-4 dark:hover:ring-zinc-700 hover:ring-zinc-300 transition-all duration-300 active:scale-95"
    >
      {props.text}
    </button>
  );
};
