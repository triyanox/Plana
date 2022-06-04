import Link from "next/link";
import { ActionButton } from "./Buttons";

const Hero = () => {
  return (
    <section className="w-full pt-24 px-12 flex flex-col justify-center items-start gap-8">
      <h1 className="text-5xl font-semibold text-black dark:text-white">
        Regain control
      </h1>
      <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
        Get things done faster
      </h2>
      <p className="text-2xl text-zinc-800 dark:text-zinc-200">
        Plana is more than a to-do list.
        <br /> It&apos;s a better way to manage your daily tasks.
      </p>
      <Link href="/signup" passHref>
        <a className="mt-4">
          <ActionButton text="Get started" />
        </a>
      </Link>
    </section>
  );
};

export default Hero;
