import http from "./http";

// create a list
export async function create(list: { name: string }) {
  const res = await http.post("/api/list", list);
  return res;
}

// delete a list
export async function deleteList(listId: number) {
  const res = await http.delete(`/api/list/${listId}`);
  return res;
}
