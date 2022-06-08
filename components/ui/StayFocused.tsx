import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";
import stayfocused from "../../assets/stayfocused.png";
import { useEffect } from "react";
import Image from "next/image";
import Fcard from "./FocusedCard";

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
      className="w-full flex flex-col lg:flex-row gap-8"
    >
      <Image
        quality={100}
        className="rounded-xl w-full h-full"
        src={stayfocused}
        alt="Features"
        width={1280}
        height={630}
      />
      <Fcard />
    </motion.div>
  );
};
export default StayFocused;
