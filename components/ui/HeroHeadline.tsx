import Link from "next/link";
import { ActionButton } from "./Buttons";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const Headline = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView();
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);
  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={{
        visible: {
          translateX: 0,
          opacity: 1,
          transformOrigin: "bottom",
          transition: {
            duration: 0.5,
            dump: 0.8,
            stiffness: 100,
            ease: "easeInOut",
          },
        },
        hidden: {
          translateX: -100,
          opacity: 0,
          transformOrigin: "bottom",
          transition: {
            duration: 0.5,
            dump: 0.8,
            stiffness: 100,
            ease: "easeInOut",
          },
        },
      }}
      className="w-full justify-center items-start flex gap-2 flex-col"
    >
      <h1 className="text-5xl xl:text-7xl mb-8 font-semibold  bg-gradient-to-r from-[#0F00FF] to-[#00DAFF] text-transparent bg-clip-text animate-gradient-x py-4">
        Regain control
      </h1>
      <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
        Get things done faster
      </h2>
      <p className="text-2xl text-zinc-800 dark:text-zinc-200">
        Introducing Plana. The best way to stay focused and organized through
        out your day.
      </p>
      <Link href="/signup" passHref>
        <a className="mt-4">
          <ActionButton text="Get started" />
        </a>
      </Link>
    </motion.div>
  );
};
export default Headline;
