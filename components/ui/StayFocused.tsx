import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";
import stayfocused from "../../assets/stayfocused.png";
import { useEffect } from "react";
import Image from "next/image";
import Fcard from "./FocusedCard";
import { ListTab } from "./Tabs";

const lists = [
  {
    id: 1,
    name: "Code",
    userId: 1,
    createdAt: "2020-08-07T00:00:00.000Z",
    updatedAt: "2020-08-08T00:00:00.000Z",
  },
  {
    id: 2,
    name: "Design",
    userId: 1,
    createdAt: "2020-08-09T00:00:00.000Z",
    updatedAt: "2020-08-11T00:00:00.000Z",
  },
  {
    id: 3,
    name: "Music",
    userId: 1,
    createdAt: "2020-09-01T00:00:00.000Z",
    updatedAt: "2020-07-01T00:00:00.000Z",
  },
];

const StayFocused = () => {
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
      className="w-full gap-4 lg:gap-8 py-8 flex flex-col-reverse lg:flex-row justify-center items-center"
    >
      {" "}
      <div className="w-full md:pr-8 flex flex-col py-8 gap-4 justify-center items-start">
        {lists.map((list) => (
          <ListTab list={list} key={list.id} />
        ))}
      </div>
      <div className="w-full flex flex-col py-8 gap-4 justify-center items-start">
        <h1 className="text-2xl w-full text-left md:text-3xl font-bold bg-gradient-to-r from-green-500 to-cyan-500 text-transparent bg-clip-text animate-gradient-x">
          Stay focused
        </h1>
        <h2 className="text-xl md:text-2xl  w-full text-left text-zinc-900 dark:text-zinc-100">
          Plana provides a minimal user interface to help you stay focused and
          organize your tasks in lists and get them done faster !
        </h2>
      </div>
    </motion.div>
  );
};
export default StayFocused;
