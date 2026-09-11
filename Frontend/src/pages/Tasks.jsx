import React, { useState } from "react";
import { useData } from "../store/DataContext";
import { tasksApi } from "../api/tasks";
import { PageHeader } from "./Dashboard";
import Button from "../components/Button";
import Modal from "../components/Modal";
import Badge from "../components/Badge";
import { Field, TextInput, TextArea, Select } from "../components/Field";
import { EmptyState, PageLoading, ErrorBanner } from "../components/Feedback";

const COLUMNS = [
  { key: "pending", label: "Pending" },
  { key: "in-progress", label: "In progress" },
  { key: "completed", label: "Completed" },
];

const emptyForm = {
  title: "",
  description: "",
  projectId: "",
  createdBy: "",
  assignedTo: "",
  status: "pending",
};

export default function Tasks() {
  const { tasks, users, projects, loading, error, loadAll, refreshTasks } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setFormError("");
    setModalOpen(true);
  };

  const openEdit = (task) => {
    setEditing(task);
    setForm({
      title: task.title || "",
      description: task.description || "",
      projectId: task.projectId?._id || task.projectId || "",
      createdBy: task.createdBy?._id || task.createdBy || "",
      assignedTo: task.assignedTo?._id || task.assignedTo || "",
      status: task.status || "pending",
    });
    setFormError("");
    setModalOpen(true);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return setFormError("Title is required.");
    if (!editing && (!form.projectId || !form.createdBy)) {
      return setFormError("Project and creator are required.");
    }
    setSaving(true);
    setFormError("");
    try {
      if (editing) {
        const { projectId, ...updatable } = form;
        await tasksApi.update(editing._id, updatable);
      } else {
        await tasksApi.create(form);
      }
      await refreshTasks();
      setModalOpen(false);
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const changeStatus = async (task, status) => {
    try {
      await tasksApi.update(task._id, { status });
      await refreshTasks();
    } catch (err) {
      alert(err.message);
    }
  };

  const remove = async (task) => {
    if (!window.confirm(`Delete task "${task.title}"?`)) return;
    try {
      await tasksApi.remove(task._id);
      await refreshTasks();
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <PageLoading />;

  const noProjects = projects.length === 0;

  return (
    <div>
      <PageHeader
        eyebrow="Tasks"
        title="Task board"
        description="Move work from pending to done, and keep ownership clear."
        action={
          <Button variant="accent" onClick={openCreate} disabled={noProjects}>
            <PlusIcon /> New task
          </Button>
        }
      />

      <ErrorBanner message={error} onRetry={loadAll} />

      {noProjects && (
        <p className="mb-6 rounded-lg border border-line bg-white/60 px-4 py-3 text-sm text-ink-muted">
          Create a project before adding tasks.
        </p>
      )}

      {tasks.length === 0 && !noProjects ? (
        <EmptyState
          title="No tasks yet"
          description="Break your projects down into tasks and assign them to your team."
          action={
            <Button variant="accent" onClick={openCreate}>
              Create a task
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {COLUMNS.map((col) => {
            const colTasks = tasks.filter((t) => t.status === col.key);
            return (
              <div key={col.key} className="rounded-xl border border-line bg-white/50 p-3">
                <div className="mb-3 flex items-center justify-between px-1">
                  <h3 className="text-sm font-semibold text-ink">{col.label}</h3>
                  <span className="text-xs text-ink-muted">{colTasks.length}</span>
                </div>
                <div className="space-y-3">
                  {colTasks.map((t) => (
                    <div key={t._id} className="rounded-lg border border-line bg-surface p-4 shadow-card">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium text-ink">{t.title}</p>
                        <Badge status={t.status} />
                      </div>
                      {t.description && (
                        <p className="mt-1 line-clamp-2 text-xs text-ink-muted">{t.description}</p>
                      )}
                      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-muted">
                        <span>{t.projectId?.title || "No project"}</span>
                        <span>·</span>
                        <span>{t.assignedTo?.name || "Unassigned"}</span>
                      </div>
                      <div className="mt-3 flex items-center gap-2">
                        <Select
                          value={t.status}
                          onChange={(e) => changeStatus(t, e.target.value)}
                          className="!py-1.5 text-xs"
                        >
                          {COLUMNS.map((c) => (
                            <option key={c.key} value={c.key}>
                              {c.label}
                            </option>
                          ))}
                        </Select>
                        <Button variant="ghost" className="!px-2 !py-1.5 text-xs" onClick={() => openEdit(t)}>
                          Edit
                        </Button>
                        <Button variant="danger" className="!px-2 !py-1.5 text-xs" onClick={() => remove(t)}>
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                  {colTasks.length === 0 && (
                    <p className="px-1 py-6 text-center text-xs text-ink-muted">Nothing here</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Edit task" : "New task"}>
        <form onSubmit={submit} className="space-y-4">
          <Field label="Title">
            <TextInput
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Design the login screen"
            />
          </Field>
          <Field label="Description">
            <TextArea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Add any useful context"
            />
          </Field>
          <Field label="Project">
            <Select
              value={form.projectId}
              onChange={(e) => setForm({ ...form, projectId: e.target.value })}
              disabled={!!editing}
            >
              <option value="">Select a project…</option>
              {projects.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.title}
                </option>
              ))}
            </Select>
          </Field>
          {!editing && (
            <Field label="Created by">
              <Select value={form.createdBy} onChange={(e) => setForm({ ...form, createdBy: e.target.value })}>
                <option value="">Select a user…</option>
                {users.map((u) => (
                  <option key={u._id} value={u._id}>
                    {u.name}
                  </option>
                ))}
              </Select>
            </Field>
          )}
          <Field label="Assigned to">
            <Select value={form.assignedTo} onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}>
              <option value="">Unassigned</option>
              {users.map((u) => (
                <option key={u._id} value={u._id}>
                  {u.name}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Status">
            <Select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              {COLUMNS.map((c) => (
                <option key={c.key} value={c.key}>
                  {c.label}
                </option>
              ))}
            </Select>
          </Field>

          {formError && <p className="text-sm text-danger">{formError}</p>}

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="accent" disabled={saving}>
              {saving ? "Saving…" : editing ? "Save changes" : "Create task"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M8 3v10M3 8h10" strokeLinecap="round" />
    </svg>
  );
}
