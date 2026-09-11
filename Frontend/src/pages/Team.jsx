import React, { useState } from "react";
import { useData } from "../store/DataContext";
import { usersApi } from "../api/users";
import { PageHeader } from "./Dashboard";
import Button from "../components/Button";
import Modal from "../components/Modal";
import { Field, TextInput } from "../components/Field";
import { EmptyState, PageLoading, ErrorBanner } from "../components/Feedback";

const emptyForm = { name: "", email: "" };

export default function Team() {
  const { users, projects, tasks, loading, error, loadAll, refreshUsers } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      return setFormError("Name and email are both required.");
    }
    setSaving(true);
    setFormError("");
    try {
      await usersApi.create(form);
      await refreshUsers();
      setForm(emptyForm);
      setModalOpen(false);
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <PageLoading />;

  return (
    <div>
      <PageHeader
        eyebrow="Team"
        title="People"
        description="Everyone who can own projects and be assigned tasks."
        action={
          <Button
            variant="accent"
            onClick={() => {
              setForm(emptyForm);
              setFormError("");
              setModalOpen(true);
            }}
          >
            <PlusIcon /> Add person
          </Button>
        }
      />

      <ErrorBanner message={error} onRetry={loadAll} />

      {users.length === 0 ? (
        <EmptyState
          title="No team members yet"
          description="Add people so you can assign them to projects and tasks."
          action={
            <Button variant="accent" onClick={() => setModalOpen(true)}>
              Add your first person
            </Button>
          }
        />
      ) : (
        <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-card">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-line bg-paper/60 text-xs uppercase tracking-wide text-ink-muted">
              <tr>
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Email</th>
                <th className="px-5 py-3 font-medium">Projects owned</th>
                <th className="px-5 py-3 font-medium">Tasks assigned</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => {
                const owned = projects.filter((p) => (p.createdBy?._id || p.createdBy) === u._id).length;
                const assigned = tasks.filter((t) => (t.assignedTo?._id || t.assignedTo) === u._id).length;
                return (
                  <tr key={u._id} className="border-b border-line last:border-0">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-soft text-xs font-medium text-accent-ink">
                          {u.name.slice(0, 1).toUpperCase()}
                        </div>
                        <span className="font-medium text-ink">{u.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-ink-muted">{u.email}</td>
                    <td className="px-5 py-3 text-ink-muted">{owned}</td>
                    <td className="px-5 py-3 text-ink-muted">{assigned}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add person">
        <form onSubmit={submit} className="space-y-4">
          <Field label="Full name">
            <TextInput
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Jordan Reyes"
            />
          </Field>
          <Field label="Email">
            <TextInput
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="jordan@company.com"
            />
          </Field>

          {formError && <p className="text-sm text-danger">{formError}</p>}

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="accent" disabled={saving}>
              {saving ? "Saving…" : "Add person"}
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
