import { useInView } from "react-intersection-observer";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import getthingsdone from "../../assets/getthingsdone.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import { HiMinus } from "react-icons/hi";
import { FiCheck } from "react-icons/fi";
const GetThingsDone = () => {
  const controls = useAnimation();
  const [checked, setChecked] = useState(false);
  const [ref, inView] = useInView();
  useEffect(() => {
    if (inView) {
      controls.start("visible");
      setTimeout(() => {
        setChecked(true);
      }, 1000);
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
      className="w-full gap-4 lg:gap-8 py-8 flex flex-col lg:flex-row justify-center items-center"
    >
      <div className="w-full flex flex-col py-8 gap-4 justify-center items-start">
        <h1 className="text-2xl w-full text-left md:text-3xl font-bold bg-gradient-to-r from-rose-500 to-purple-500 text-transparent bg-clip-text animate-gradient-x">
          Get things done faster
        </h1>
        <h2 className="text-xl md:text-2xl  w-full text-left text-zinc-900 dark:text-zinc-100">
          With plana you can be more productive with less effort and no time.
          Organize and track your tasks with ease.
        </h2>
      </div>
      <div className="w-full flex flex-col py-8 gap-4 justify-center items-start">
        <div
          className="flex w-full justify-between gap-6 items-center px-4 py-3 my-4
            bg-zinc-100 rounded-xl dark:bg-zinc-800"
        >
          <div
            onClick={() => {
              setChecked(!checked);
            }}
            className="w-8 h-6  hover:ring-2 ring-offset-zinc-100 dark:ring-offset-zinc-800 ring-offset-2 transition-all duration-300 ring-zinc-300 dark:ring-zinc-600  cursor-pointer flex justify-center items-center bg-zinc-300 dark:bg-zinc-600 rounded-lg"
          >
            <AnimatePresence exitBeforeEnter>
              {checked && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <FiCheck className="text-2xl" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div
            className="flex w-full justify-between items-center  
            "
          >
            <p
              className={`text-lg ${
                checked && "line-through "
              } font-semibold text-left decoration-2  text-zinc-700 dark:text-zinc-300 transition-all duration-500`}
            >
              Do something
            </p>
          </div>

          <HiMinus className="text-3xl cursor-pointer" />
        </div>
      </div>
    </motion.div>
  );
};
export default GetThingsDone;
