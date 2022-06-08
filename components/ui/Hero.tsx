import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import main from "../../assets/hero.svg";
import { useEffect } from "react";
import Image from "next/image";
import Headline from "./HeroHeadline";

const Hero = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView();
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);
  return (
    <section className="w-full pt-16 px-12 flex flex-col-reverse items-center justify-center md:flex-row  gap-8">
      <Headline />
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
        className="w-full hidden lg:flex justify-center items-center"
      >
        <Image src={main} alt="dark" width={211.58} height={403.47} />
      </motion.div>
    </section>
  );
};

export default Hero;
