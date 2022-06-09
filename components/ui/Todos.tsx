import { Fragment, useEffect, useState } from "react";
import { useUser } from "../hooks/User";
import TodoInput from "../inputs/Todo";
import { useSelectedList } from "../hooks/SelectedList";
import * as Todo from "../../lib/todo";
import * as List from "../../lib/list";
import { todo } from "../hooks/List";
import TodoCard from "../ui/Todo";
import { AnimatePresence, motion } from "framer-motion";
import { MdDelete } from "react-icons/md";
import Image from "next/image";
import notodos from "../../assets/notodos.svg";

const Todos = () => {
  const [todos, setTodos] = useState<todo[]>([]);
  const { seletedList, setSeletedList } = useSelectedList();
  const { user, setUser } = useUser();
  useEffect(() => {
    if (seletedList.id === 0) {
      Todo.getAll()
        .then((res) => {
          setTodos(res.data);
        })
        .catch(() => {});
    } else {
      Todo.getTodos(seletedList.id)
        .then((res) => {
          setTodos(res.data);
        })
        .catch(() => {});
    }
  }, [seletedList]);

  const handleDeleteList = async (e: any) => {
    e.preventDefault();
    try {
      await List.deleteList(seletedList.id);
      setUser({
        ...user,
        lists: [...user.lists.filter((list) => list.id !== seletedList.id)],
      });
      setSeletedList({
        id: 0,
        name: "",
        userId: 0,
        createdAt: "",
        updatedAt: "",
      });
    } catch (e) {}
  };

  const name = user.name;
  return (
    <section
      className="h-screen w-full flex flex-col justify-start items-center pt-16
   mx-8 lg:mx-0 xl:mx-8 transition-all duration-500"
    >
      <div className="flex w-full lg:w-2/3 justify-between items-center">
        <div className="flex w-full  justify-center  flex-col items-start">
          <h1 className="text-3xl  font-bold bg-gradient-to-r from-[#0F00FF] to-[#00DAFF] text-transparent bg-clip-text animate-gradient-x py-2">
            {seletedList.id === 0
              ? `Welcome Back ${name} !`
              : `${seletedList.name} Todos`}
          </h1>
          <p className="text-lg mt-2 mb-8 font-medium  text-zinc-700 dark:text-zinc-300">
            {seletedList.id === 0
              ? "Your recent tasks are here !"
              : `Here are your todos for ${seletedList.name}`}
          </p>
        </div>
        {seletedList.id !== 0 && (
          <button
            onClick={handleDeleteList}
            className="flex h-full pt-2 flex-col justify-start items-center"
          >
            <MdDelete className="text-3xl" />
          </button>
        )}
      </div>
      {seletedList.id !== 0 && (
        <AnimatePresence exitBeforeEnter>
          <TodoInput todos={todos} setTodos={setTodos} />
        </AnimatePresence>
      )}
      {todos.length > 0 && (
        <AnimatePresence exitBeforeEnter>
          <Fragment>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full -translate-y-4 mt-0 lg:w-2/3 overflow-auto no-scrollbar block justify-center items-center pt-4 pb-4 gap-2"
            >
              {todos.map((todo) => (
                <TodoCard
                  key={todo.id}
                  todo={todo}
                  todos={todos}
                  setTodos={setTodos}
                />
              ))}
            </motion.div>
          </Fragment>
        </AnimatePresence>
      )}
      {seletedList.id === 0 && todos.length === 0 && (
        <AnimatePresence exitBeforeEnter>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="flex pt-16 md:pt-8 justify-center items-center"
          >
            <Image
              src={notodos}
              alt={"No Todos"}
              width={281.4525}
              height={352.05}
            />
          </motion.div>
        </AnimatePresence>
      )}
    </section>
  );
};
export default Todos;
