import http from "./http";

const userBaseUrl = "/api/users";

export async function createUser(user: {
  name: string;
  email: string;
  password: string;
}) {
  await http.post(userBaseUrl, user);
}
