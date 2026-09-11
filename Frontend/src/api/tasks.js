import { api } from "./client";

export const tasksApi = {
  list: () => api.get("/tasks/get-task").then((r) => r.tasks || []),
  create: (payload) => api.post("/tasks/create-task", payload).then((r) => r.task),
  update: (id, payload) =>
    api.put(`/tasks/update/task/${id}`, payload).then((r) => r.task),
  remove: (id) => api.del(`/tasks/delete/task/${id}`),
};
