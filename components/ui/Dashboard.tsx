import SettingsModal from "./SettingsModal";
import Sidebar from "./Sidebard";
import Todos from "./Todos";
import { ModalContext } from "../hooks/Modal";
import { useState } from "react";
import OpenSidebar from "./OpenSidebar";
import { MenuContext } from "../hooks/Menu";
import { CreateList } from "../hooks/CreateList";
import { ListContext, todo } from "../hooks/List";
import CreateListModal from "./CreateListModal";
import { Status } from "@prisma/client";
import { selListContext } from "../hooks/SelectedList";
import Head from "next/head";

type List = todo[];

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isListOpen, setIsListOpen] = useState(false);
  const [list, setList] = useState<List>([]);
  const [seletedList, setSeletedList] = useState({
    id: 0,
    name: "",
    userId: 0,
    createdAt: "",
    updatedAt: "",
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "k" && e.metaKey) {
      setIsOpen(!isOpen);
    }
    if (e.altKey && e.metaKey) {
      setIsListOpen(!isListOpen);
    }
  };

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#000000" />
        <meta name="robots" content="follow, index" />
        <title>{seletedList.name || "Dashboard"} - Minimal To-Do app</title>
        <meta name="description" content={"Minimal To-Do app"} />
        <meta name="author" content="Mohamed Achaq" />
      </Head>
      <section
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className="w-full flex justify-center items-center gap-8 "
      >
        <MenuContext.Provider value={{ isActive, setIsActive }}>
          <ModalContext.Provider value={{ isOpen, setIsOpen }}>
            <CreateList.Provider value={{ isListOpen, setIsListOpen }}>
              <ListContext.Provider
                value={{
                  list,
                  setList,
                }}
              >
                <selListContext.Provider
                  value={{
                    seletedList,
                    setSeletedList,
                  }}
                >
                  <Sidebar />
                  <Todos />
                  <SettingsModal isOpen={isOpen} setIsOpen={setIsOpen} />
                  <OpenSidebar />
                  <CreateListModal />
                </selListContext.Provider>
              </ListContext.Provider>
            </CreateList.Provider>
          </ModalContext.Provider>
        </MenuContext.Provider>
      </section>
    </>
  );
};
export default Dashboard;
