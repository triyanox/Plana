import { Status } from "@prisma/client";
import http from "./http";

//create a todo
export async function create(todo: { text: string; listId: number }) {
  const res = await http.post("/api/todos", todo);
  return res;
}

// get todo from a list
export async function getTodos(listId: number) {
  const res = await http.get(`/api/todos/${listId}`);
  return res;
}

// update the status of a todo
export async function update(todo: { id: number; status: Status }) {
  const res = await http.put(`/api/todos/todo/${todo.id}`, todo);
  return res;
}
