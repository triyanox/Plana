import Link from "next/link";
import { ActionButton } from "./Buttons";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

const Fcard = () => {
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
          translateY: 0,
          scale: 1,
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
          translateY: 100,
          scale: 0.6,
          opacity: 0.2,
          transformOrigin: "bottom",
          transition: {
            duration: 0.5,
            dump: 0.8,
            stiffness: 100,
            ease: "easeInOut",
          },
        },
      }}
      className="w-full flex flex-col my-4 py-10 px-8 rounded-2xl bg-zinc-100 dark:bg-zinc-800"
    >
      <h1 className="text-xl mb-2 w-full text-left xl:text-2xl font-semibold text-black dark:text-white">
        Stay focused
      </h1>
      <h2 className="text-lg  w-full text-left text-zinc-900 dark:text-zinc-100">
        Plana provides a minimal user interface to help you stay focused and
        organized, so you can forget about distructions !
      </h2>
      <Link href="/signup" passHref>
        <a className="mt-8 w-full flex lg:justify-end">
          <ActionButton text="Get started" />
        </a>
      </Link>
    </motion.div>
  );
};
export default Fcard;
