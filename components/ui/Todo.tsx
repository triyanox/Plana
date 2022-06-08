import { todo } from "../hooks/List";
import { FiCheck } from "react-icons/fi";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Status } from "@prisma/client";
import * as Todo from "../../lib/todo";
import { HiMinus } from "react-icons/hi";

const TodoCard = (props: {
  todo: todo;
  todos: todo[];
  setTodos: (todos: todo[]) => void;
}) => {
  const [todo, setTodo] = useState(props.todo);
  const handelUpdate = async (e: any) => {
    try {
      const todoData = {
        id: todo.id,
        status: todo.status === Status.DONE ? Status.OPEN : Status.DONE,
      };
      const res = await Todo.update(todoData);
      setTodo(res.data);
    } catch (e) {}
  };
  const handelDelete = async (e: any) => {
    try {
      const res = await Todo.deleteTodo(todo.id);
      const newTodos = props.todos.filter((todo) => todo.id !== res.data.id);
      props.setTodos(newTodos);
    } catch (e) {}
  };
  return (
    <motion.div
      key={todo.id}
      initial={{ opacity: 0, y: -20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.8 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex w-full justify-between gap-6 items-center px-4 py-3 my-4
            bg-zinc-100 rounded-xl dark:bg-zinc-800"
    >
      <div
        onClick={handelUpdate}
        className="w-8 h-6  active:ring-2 ring-offset-zinc-100 dark:ring-offset-zinc-800 ring-offset-2 transition-all duration-300 ring-zinc-300 dark:ring-zinc-600  cursor-pointer flex justify-center items-center bg-zinc-300 dark:bg-zinc-600 rounded-lg"
      >
        <AnimatePresence exitBeforeEnter>
          {todo.status === Status.DONE && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <FiCheck className="text-2xl" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div
        className="flex w-full justify-between items-center  
            "
      >
        <p
          className={`text-lg ${
            todo.status === Status.DONE && "line-through "
          } font-semibold text-left decoration-2  text-zinc-700 dark:text-zinc-300 transition-all duration-500`}
        >
          {todo.text}
        </p>
      </div>

      <HiMinus onClick={handelDelete} className="text-3xl cursor-pointer" />
    </motion.div>
  );
};

export default TodoCard;
