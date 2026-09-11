import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { usersApi } from "../api/users";
import { projectsApi } from "../api/projects";
import { tasksApi } from "../api/tasks";

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [u, p, t] = await Promise.all([
        usersApi.list(),
        projectsApi.list(),
        tasksApi.list(),
      ]);
      setUsers(u);
      setProjects(p);
      setTasks(t);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const refreshUsers = useCallback(async () => {
    setUsers(await usersApi.list());
  }, []);
  const refreshProjects = useCallback(async () => {
    setProjects(await projectsApi.list());
  }, []);
  const refreshTasks = useCallback(async () => {
    setTasks(await tasksApi.list());
  }, []);

  const value = useMemo(
    () => ({
      users,
      projects,
      tasks,
      loading,
      error,
      setError,
      loadAll,
      refreshUsers,
      refreshProjects,
      refreshTasks,
    }),
    [users, projects, tasks, loading, error, loadAll, refreshUsers, refreshProjects, refreshTasks]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within a DataProvider");
  return ctx;
}
