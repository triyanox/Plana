import http from "./http";

const userBaseUrl = "/api/users";

export async function createUser(user: {
  name: string;
  email: string;
  password: string;
}) {
  await http.post(userBaseUrl, user);
}

export async function updateUser(user: {
  name: string;
  email: string;
  password: string;
}) {
  await http.put(userBaseUrl, user);
}

export async function deleteUser() {
  await http.delete(userBaseUrl);
}

export async function signout() {
  await http.post("/api/user/signout");
}
