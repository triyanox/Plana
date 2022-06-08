import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { useMenu } from "../hooks/Menu";
import { CgClose } from "react-icons/cg";

const OpenSidebar = () => {
  const { isActive, setIsActive } = useMenu();
  const toggle = () => setIsActive(!isActive);
  return (
    <button
      onClick={toggle}
      className="bg-zinc-900 fixed bottom-0 right-0 z-50 mr-8 mb-4 dark:bg-zinc-50 text-white dark:text-black rounded-full px-4 py-4 ring-0 active:ring-4 ring-zinc-200 dark:ring-zinc-800 hover:ring-4 hover:scale-105 transition-all duration-300 active:scale-95"
    >
      {!isActive ? (
        <HiOutlineMenuAlt1 className="text-3xl active:rotate-90 transition-all duration-300" />
      ) : (
        <CgClose className="text-3xl hover:rotate-180 transition-all duration-300" />
      )}
    </button>
  );
};
export default OpenSidebar;
