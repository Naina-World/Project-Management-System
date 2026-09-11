import { api } from "./client";

export const projectsApi = {
  list: () => api.get("/projects/get-project").then((r) => r.projects || []),
  create: (payload) =>
    api.post("/projects/create-project", payload).then((r) => r.project),
  update: (id, payload) =>
    api.put(`/projects/update/project/${id}`, payload).then((r) => r.project),
  remove: (id) => api.del(`/projects/delete/project/${id}`),
};
