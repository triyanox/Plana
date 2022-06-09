import Link from "next/link";
import { SiTwitter } from "react-icons/si";
import { IconButton } from "./Buttons";

const Footer = () => {
  return (
    <footer className="w-full mt-48 pb-8 flex flex-col md:flex-row px-12 py-4 justify-between items-center">
      <div className="flex w-full justify-center items-start flex-col gap-2">
        <h1 className="text-2xl font-bold text-black dark:text-white">Plana</h1>
        <h2 className="text-xl text-black dark:text-white">
          Take control over your life !
        </h2>
        <p className="text-lg text-black dark:text-white">
          made by{" "}
          <a
            className="text-zinc-700 dark:text-zinc-300"
            href="https://twitter.com/ac__haq"
          >
            @ac__haq
          </a>
        </p>
      </div>
      <Link href="https://twitter.com/ac__haq" passHref>
        <a className="flex flex-row w-full justify-start md:justify-end items-start mt-8">
          <IconButton icon={<SiTwitter />} />
        </a>
      </Link>
    </footer>
  );
};

export default Footer;
