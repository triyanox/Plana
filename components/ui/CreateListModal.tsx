import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useCreateList } from "../hooks/CreateList";
import * as list from "../../lib/list";
import { useUser } from "../hooks/User";
import { useSelectedList } from "../hooks/SelectedList";
import { useMenu } from "../hooks/Menu";

function SettingsModal() {
  const { isListOpen, setIsListOpen } = useCreateList();
  const [listName, setListName] = useState("");
  const { setSeletedList } = useSelectedList();
  const { user, setUser } = useUser();
  const closeModal = () => {
    setIsListOpen(false);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      makeList();
    }
  };

  const makeList = async () => {
    try {
      let res = await list.create({
        name: listName,
      });
      setListName("");
      setUser({
        ...user,
        lists: [
          ...user.lists,
          {
            id: res.data.id,
            name: res.data.name,
            userId: res.data.userId,
            createdAt: res.data.createdAt,
            updatedAt: res.data.updatedAt,
          },
        ],
      });
      setSeletedList({
        id: res.data.id,
        name: res.data.name,
        userId: res.data.userId,
        createdAt: res.data.createdAt,
        updatedAt: res.data.updatedAt,
      });
      closeModal();
    } catch (e) {}
  };
  return (
    <Transition appear show={isListOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black dark:bg-zinc-900 bg-opacity-20 dark:bg-opacity-20 backdrop-blur-xl" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex h-4/5 items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full h-2/6 md:h-3/6 max-w-lg transform overflow-auto mt-48 rounded-2xl bg-white dark:bg-zinc-800 py-6 px-2 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-xl md:text-2xl flex justify-start items-center font-bold  px-4 mb-2 leading-6 text-zinc-900 dark:text-zinc-100"
                >
                  New List
                </Dialog.Title>
                <Dialog.Title
                  as="h4"
                  className="text-md md:text-lg flex justify-start items-center font-bold  px-4 mb-8 leading-6 text-zinc-700 dark:text-zinc-300"
                >
                  What is the name of your list?
                </Dialog.Title>
                <Dialog.Description className="flex flex-col gap-2 justify-center items-center px-8">
                  <input
                    value={listName}
                    onChange={(e) => setListName(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full text-lg font-medium  outline-none focus:placeholder:invisible  dark:focus:placeholder:text-zinc-900 transition-all duration-200 relative h-8 px-8 py-8 bg-white rounded-lg dark:bg-zinc-800"
                    type="text"
                    placeholder="List Name"
                  />
                </Dialog.Description>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default SettingsModal;
