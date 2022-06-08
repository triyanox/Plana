import { useState } from "react";
import * as Todo from "../../lib/todo";
import { useSelectedList } from "../hooks/SelectedList";
import { useUser } from "../hooks/User";
import { todo } from "../hooks/List";

const TodoInput = (props: {
  todos: todo[];
  setTodos: (todos: todo[]) => void;
}) => {
  const { seletedList } = useSelectedList();
  const [todo, setTodo] = useState({
    text: "",
    listId: 0,
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      submitTodo();
      setTodo({
        text: "",
        listId: seletedList.id,
      });
    }
  };

  const submitTodo = async () => {
    try {
      const res = await Todo.create(todo);
      props.setTodos([res.data, ...props.todos]);
    } catch {}
  };

  return (
    <input
      onChange={(e) => setTodo({ ...todo, text: e.target.value })}
      value={todo.text}
      onKeyDown={handleKeyDown}
      className="w-full z-10 shadow-2xl bg-opacity-30 backdrop-blur-lg  lg:w-2/3 text-lg font-medium   outline-none focus:placeholder:invisible  dark:focus:placeholder:text-zinc-900 transition-all duration-200 relative h-8 px-8 py-8 bg-zinc-200 rounded-lg dark:bg-zinc-800"
      type="text"
      placeholder="Write a todo..."
    />
  );
};

export default TodoInput;
