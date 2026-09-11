import { api } from "./client";

export const usersApi = {
  list: () => api.get("/user/get-users").then((r) => r.users || []),
  create: (payload) => api.post("/user/create-user", payload).then((r) => r.user),
};
