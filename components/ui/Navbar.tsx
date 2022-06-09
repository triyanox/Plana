import { FilledButton } from "./Buttons";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  return (
    <nav className="w-full flex px-4 sm:px-8 md:px-12 py-4 justify-between items-center">
      <Link href="/" passHref>
        <a className="text-2xl font-bold text-black dark:text-white">Plana</a>
      </Link>
      <div className="flex justify-center items gap-4">
        <Link href="/login" passHref>
          <a>
            <FilledButton text="Login" />
          </a>
        </Link>
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
