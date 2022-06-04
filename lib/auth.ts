import http from "./http";

const authBasePath = "/api/auth";

export async function login(user: { email: string; password: string }) {
  await http.post(authBasePath, user);
}
