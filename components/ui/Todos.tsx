import { useEffect, useState } from "react";
import { useUser } from "../hooks/User";
import TodoInput from "../inputs/Todo";
import { useSelectedList } from "../hooks/SelectedList";
import * as Todo from "../../lib/todo";
import { todo } from "../hooks/List";
import TodoCard from "../ui/Todo";
import { AnimatePresence, motion } from "framer-motion";

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.4,
    },
  },
};

const Todos = () => {
  const [todos, setTodos] = useState<todo[]>([]);
  const { seletedList } = useSelectedList();
  useEffect(() => {
    Todo.getTodos(seletedList.id)
      .then((res) => {
        setTodos(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [seletedList]);

  const { user } = useUser();
  const name = user.name;
  return (
    <section
      className="h-screen w-full flex flex-col justify-start items-center pt-16
   mx-8 lg:mx-0 xl:mx-8 transition-all duration-500"
    >
      <h1 className="text-2xl  w-full lg:w-2/3 text-left font-bold text-zinc-800 dark:text-zinc-200">
        Welcome back {name} !
      </h1>
      <p className="text-lg mt-2 mb-8 font-medium w-full lg:w-2/3 text-left text-zinc-700 dark:text-zinc-300">
        Your recent tasks are here !
      </p>

      <TodoInput todos={todos} setTodos={setTodos} />
      <AnimatePresence exitBeforeEnter>
        <motion.div
          variants={stagger}
          className="w-full -translate-y-4 mt-0 lg:w-2/3 overflow-auto no-scrollbar block justify-center items-center pt-4 pb-4 gap-2"
        >
          {todos.map((todo) => (
            <TodoCard key={todo.id} todo={todo} />
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
};
export default Todos;
