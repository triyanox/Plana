import Link from "next/link";
import { SiTwitter } from "react-icons/si";
import { IconButton } from "./Buttons";

const Footer = () => {
  return (
    <footer className="w-full mt-24 pb-8 flex flex-row px-6 sm:px-8 md:px-12 py-4 justify-between items-center">
      <div className="flex w-full justify-center items-start flex-col gap-2">
        <h1 className="text-2xl font-bold text-black dark:text-white">Plana</h1>
        <h2 className="text-xl text-black dark:text-white">
          Take control over your life !
        </h2>
      </div>
      <div className="mt-8 flex w-full flex-row items-start justify-end md:justify-end">
        <Link href="https://twitter.com/ac__haq" passHref>
          <a>
            <IconButton icon={<SiTwitter />} />
          </a>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
