import http from "./http";

const authBasePath = "/api/user/auth";

export async function login(user: { email: string; password: string }) {
  await http.post(authBasePath, user);
}
