import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { DeleteTab, SignOut, ThemeTab, UpdateTab } from "./SettingsTabs";

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

function SettingsModal(props: Props) {
  const [tab, setTab] = useState<"delete" | "update" | "theme">("theme");
  const closeModal = () => {
    props.setIsOpen(false);
  };
  return (
    <Transition appear show={props.isOpen} as={Fragment}>
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
          <div className="fixed inset-0 bg-black dark:bg-zinc-900 bg-opacity-20 dark:bg-opacity-60 backdrop-blur-xl" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex h-5/6 items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full h-5/6 max-w-xl transform overflow-auto mt-48 rounded-2xl bg-white dark:bg-zinc-800 py-6 px-2 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-xl md:text-2xl flex justify-start items-center font-bold py-2 px-4 mb-4 leading-6 text-zinc-900 dark:text-zinc-100"
                >
                  Settings
                </Dialog.Title>
                <Dialog.Description className="flex flex-col gap-16 justify-center items-start">
                  <ThemeTab />
                  <UpdateTab />
                  <SignOut />
                  <DeleteTab />
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
