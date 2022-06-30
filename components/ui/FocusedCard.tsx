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
      className="w-full flex flex-col gap-8 md:flex-row pt-16"
    >
      <div className="w-full flex flex-col gap-2 ">
        <h1 className="text-2xl w-full text-left md:text-3xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 text-transparent bg-clip-text animate-gradient-x">
          Exited to try plana
        </h1>
        <h2 className="text-xl md:text-2xl  w-full text-left text-zinc-900 dark:text-zinc-100">
          Get started today
        </h2>
      </div>
      <div className="w-full flex md:justify-end items-center gap-2 ">
        <Link href="/signup" passHref>
          <a>
            <ActionButton text="Get started" />
          </a>
        </Link>
      </div>
    </motion.div>
  );
};
export default Fcard;
