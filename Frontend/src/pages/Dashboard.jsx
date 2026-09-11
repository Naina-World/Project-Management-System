import React from "react";
import { Link } from "react-router-dom";
import { useData } from "../store/DataContext";
import StatCard from "../components/StatCard";
import Badge from "../components/Badge";
import { EmptyState, PageLoading } from "../components/Feedback";

export default function Dashboard() {
  const { users, projects, tasks, loading } = useData();

  if (loading) return <PageLoading />;

  const completed = tasks.filter((t) => t.status === "completed").length;
  const inProgress = tasks.filter((t) => t.status === "in-progress").length;
  const pending = tasks.filter((t) => t.status === "pending").length;
  const total = tasks.length || 1;

  const breakdown = [
    { key: "pending", label: "Pending", count: pending, color: "bg-status-pending" },
    { key: "in-progress", label: "In progress", count: inProgress, color: "bg-status-progress" },
    { key: "completed", label: "Completed", count: completed, color: "bg-status-done" },
  ];

  const recentProjects = [...projects].slice(-4).reverse();

  return (
    <div>
      <PageHeader
        eyebrow="Overview"
        title="Where everything stands"
        description="A running snapshot of your projects, tasks and team."
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Projects" value={projects.length} />
        <StatCard label="Tasks" value={tasks.length} />
        <StatCard label="Completed" value={completed} sub={`${Math.round((completed / total) * 100)}% of all tasks`} />
        <StatCard label="Team members" value={users.length} />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3 rounded-xl border border-line bg-surface p-5 shadow-card">
          <h3 className="font-display text-lg text-ink">Task breakdown</h3>
          <div className="mt-4 space-y-4">
            {breakdown.map((b) => (
              <div key={b.key}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-ink-muted">{b.label}</span>
                  <span className="font-medium text-ink">{b.count}</span>
                </div>
                <div className="h-2 rounded-full bg-paper">
                  <div
                    className={`h-2 rounded-full ${b.color}`}
                    style={{ width: `${(b.count / total) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 rounded-xl border border-line bg-surface p-5 shadow-card">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg text-ink">Recent projects</h3>
            <Link to="/projects" className="text-xs font-medium text-accent-ink hover:underline">
              View all
            </Link>
          </div>
          <div className="mt-4 space-y-3">
            {recentProjects.length === 0 && (
              <EmptyState title="No projects yet" description="Create your first project to get started." />
            )}
            {recentProjects.map((p) => {
              const taskCount = tasks.filter((t) => (t.projectId?._id || t.projectId) === p._id).length;
              return (
                <div key={p._id} className="flex items-center justify-between rounded-lg border border-line px-3 py-2.5">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-ink">{p.title}</p>
                    <p className="text-xs text-ink-muted">{p.createdBy?.name || "Unknown owner"}</p>
                  </div>
                  <Badge status={taskCount ? "in-progress" : "pending"} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export function PageHeader({ eyebrow, title, description, action }) {
  return (
    <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && <p className="text-sm text-accent-ink">{eyebrow}</p>}
        <h1 className="mt-1 font-display text-2xl text-ink sm:text-3xl">{title}</h1>
        {description && <p className="mt-1.5 max-w-lg text-sm text-ink-muted">{description}</p>}
      </div>
      {action}
    </div>
  );
}
