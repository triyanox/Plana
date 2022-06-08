import { HomeTab, RecentTab, CreateTab, SettingTab, ListTab } from "./Tabs";
import { useModal } from "../hooks/Modal";
import { useMenu } from "../hooks/Menu";
import { AnimatePresence, motion } from "framer-motion";
import { useCreateList } from "../hooks/CreateList";
import { useUser } from "../hooks/User";
const Sidebar = () => {
  const { isActive } = useMenu();
  const { setIsOpen } = useModal();
  const { setIsListOpen } = useCreateList();
  const { user } = useUser();

  return (
    <AnimatePresence exitBeforeEnter>
      {isActive && (
        <motion.section
          initial={{
            translateX: "-100%",
            opacity: 0,
          }}
          animate={{
            translateX: 0,
            opacity: 1,
            transformOrigin: "center",
          }}
          exit={{
            translateX: "-100%",
            opacity: 0,
          }}
          transition={{
            duration: 0.4,
            dump: 0.8,
            ease: "easeInOut",
            stiffness: 100,
            elapsed: 1,
          }}
          className="h-screen fixed lg:relative z-20  w-full  lg:w-2/5 xl:w-1/3  flex flex-col justify-center items-start gap-8"
        >
          <div className="bg-zinc-200 bg-opacity-30 backdrop-blur-xl  py-8 px-4 rounded-2xl shadow-xl xl:mx-0 dark:bg-zinc-800 h-screen w-full flex flex-col justify-between items-center gap-2">
            <div className="no-scrollbar  overflow-scroll w-full flex flex-col items-center gap-2">
              <HomeTab />
              {user.lists.map((list) => (
                <ListTab list={list} key={list.id} />
              ))}
            </div>
            <div className="  w-full flex flex-col  items-center gap-2">
              <div className="flex w-full gap-2 flex-col py-2 justify-between items-center">
                <CreateTab
                  onclick={() => {
                    setIsListOpen(true);
                  }}
                />
                <SettingTab
                  onclick={() => {
                    setIsOpen(true);
                  }}
                />
              </div>
            </div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};
export default Sidebar;
