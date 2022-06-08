import { useState } from "react";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { useMenu } from "../hooks/Menu";

const OpenSidebar = () => {
  const { isActive, setIsActive } = useMenu();
  const toggle = () => setIsActive(!isActive);
  return (
    <button
      onClick={toggle}
      className="bg-zinc-900 fixed top-0 right-0 z-50 mr-8 mt-4 dark:bg-zinc-50 text-white dark:text-black rounded-full px-4 py-4 ring-0 active:ring-4 ring-zinc-200 dark:ring-zinc-800 hover:ring-4 hover:scale-105 transition-all duration-300 active:scale-95"
    >
      <HiOutlineMenuAlt1 className="text-3xl" />
    </button>
  );
};
export default OpenSidebar;
