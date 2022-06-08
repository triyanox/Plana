import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";
import getthingsdone from "../../assets/getthingsdone.png";
import Image from "next/image";
import { useEffect } from "react";
const GetThingsDone = () => {
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
      className="w-full rounded-xl py-8"
    >
      <Image
        quality={100}
        className="rounded-xl w-full h-full"
        src={getthingsdone}
        alt="Features"
        width={1280}
        height={630}
      />
      <div className="w-full flex flex-col my-4 py-8 px-8 rounded-2xl bg-zinc-100 dark:bg-zinc-800">
        <h1 className="text-xl w-full text-left xl:text-2xl font-semibold text-black dark:text-white">
          Get things done faster
        </h1>
        <h2 className="text-lg  w-full text-left text-zinc-900 dark:text-zinc-100">
          With plana you can be more productive with less effort !
        </h2>
      </div>
    </motion.div>
  );
};
export default GetThingsDone;
