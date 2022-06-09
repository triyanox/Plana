import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        key={router.route}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transformOrigin: "50% 50%" }}
        exit={{ opacity: 0, transformOrigin: "center" }}
        transition={{
          duration: 0.5,
          damping: 300,
          ease: "easeInOut",
          stiffness: 300,
        }}
      >
        <NextThemesProvider attribute="class">
          <Component {...pageProps} />
        </NextThemesProvider>
      </motion.div>
    </AnimatePresence>
  );
}

export default MyApp;
