import React, { useState } from "react";
import { useData } from "../store/DataContext";
import { projectsApi } from "../api/projects";
import { PageHeader } from "./Dashboard";
import Button from "../components/Button";
import Modal from "../components/Modal";
import { Field, TextInput, TextArea, Select } from "../components/Field";
import { EmptyState, PageLoading, ErrorBanner } from "../components/Feedback";

const emptyForm = { title: "", description: "", createdBy: "", teamMembers: [] };

export default function Projects() {
  const { projects, users, tasks, loading, error, loadAll, refreshProjects } = useData();
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

  const openEdit = (project) => {
    setEditing(project);
    setForm({
      title: project.title || "",
      description: project.description || "",
      createdBy: project.createdBy?._id || project.createdBy || "",
      teamMembers: (project.teamMembers || []).map((m) => m._id || m),
    });
    setFormError("");
    setModalOpen(true);
  };

  const toggleMember = (id) => {
    setForm((f) => ({
      ...f,
      teamMembers: f.teamMembers.includes(id)
        ? f.teamMembers.filter((m) => m !== id)
        : [...f.teamMembers, id],
    }));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return setFormError("Title is required.");
    if (!form.createdBy) return setFormError("Choose an owner for this project.");
    setSaving(true);
    setFormError("");
    try {
      if (editing) {
        await projectsApi.update(editing._id, form);
      } else {
        await projectsApi.create(form);
      }
      await refreshProjects();
      setModalOpen(false);
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (project) => {
    if (!window.confirm(`Delete "${project.title}"? This cannot be undone.`)) return;
    try {
      await projectsApi.remove(project._id);
      await refreshProjects();
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <PageLoading />;

  return (
    <div>
      <PageHeader
        eyebrow="Projects"
        title="All projects"
        description="Group work into projects, assign an owner and pull in a team."
        action={
          <Button variant="accent" onClick={openCreate}>
            <PlusIcon /> New project
          </Button>
        }
      />

      <ErrorBanner message={error} onRetry={loadAll} />

      {projects.length === 0 ? (
        <EmptyState
          title="No projects yet"
          description="Projects are the containers your tasks live in."
          action={
            <Button variant="accent" onClick={openCreate}>
              Create a project
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map((p) => {
            const taskCount = tasks.filter((t) => (t.projectId?._id || t.projectId) === p._id).length;
            return (
              <div key={p._id} className="flex flex-col rounded-xl border border-line bg-surface p-5 shadow-card">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display text-lg text-ink">{p.title}</h3>
                  <span className="shrink-0 rounded-full bg-paper px-2.5 py-1 text-xs text-ink-muted">
                    {taskCount} task{taskCount === 1 ? "" : "s"}
                  </span>
                </div>
                <p className="mt-1.5 line-clamp-3 flex-1 text-sm text-ink-muted">
                  {p.description || "No description provided."}
                </p>

                <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
                  <div>
                    <p className="text-xs text-ink-muted">Owner</p>
                    <p className="text-sm text-ink">{p.createdBy?.name || "Unassigned"}</p>
                  </div>
                  <div className="flex -space-x-2">
                    {(p.teamMembers || []).slice(0, 4).map((m) => (
                      <div
                        key={m._id || m}
                        title={m.name}
                        className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-surface bg-accent-soft text-xs font-medium text-accent-ink"
                      >
                        {(m.name || "?").slice(0, 1).toUpperCase()}
                      </div>
                    ))}
                    {(p.teamMembers || []).length === 0 && (
                      <span className="text-xs text-ink-muted">No team</span>
                    )}
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <Button variant="outline" className="flex-1" onClick={() => openEdit(p)}>
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => remove(p)}>
                    Delete
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Edit project" : "New project"}>
        <form onSubmit={submit} className="space-y-4">
          <Field label="Title">
            <TextInput
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Q3 website redesign"
            />
          </Field>
          <Field label="Description">
            <TextArea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="What is this project about?"
            />
          </Field>
          <Field label="Owner">
            <Select value={form.createdBy} onChange={(e) => setForm({ ...form, createdBy: e.target.value })}>
              <option value="">Select an owner…</option>
              {users.map((u) => (
                <option key={u._id} value={u._id}>
                  {u.name}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Team members" hint="Select everyone who should have access to this project.">
            <div className="flex flex-wrap gap-2">
              {users.length === 0 && <p className="text-sm text-ink-muted">Add team members first.</p>}
              {users.map((u) => {
                const active = form.teamMembers.includes(u._id);
                return (
                  <button
                    type="button"
                    key={u._id}
                    onClick={() => toggleMember(u._id)}
                    className={[
                      "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                      active
                        ? "border-accent bg-accent-soft text-accent-ink"
                        : "border-line text-ink-muted hover:border-ink/30",
                    ].join(" ")}
                  >
                    {u.name}
                  </button>
                );
              })}
            </div>
          </Field>

          {formError && <p className="text-sm text-danger">{formError}</p>}

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="accent" disabled={saving}>
              {saving ? "Saving…" : editing ? "Save changes" : "Create project"}
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
