import React from "react";
import { NavLink } from "react-router-dom";
import { useData } from "../store/DataContext";

const links = [
  { to: "/", label: "Overview", icon: OverviewIcon },
  { to: "/projects", label: "Projects", icon: ProjectsIcon },
  { to: "/tasks", label: "Tasks", icon: TasksIcon },
  { to: "/team", label: "Team", icon: TeamIcon },
];

export default function Sidebar() {
  const { projects, tasks } = useData();
  const openTasks = tasks.filter((t) => t.status !== "completed").length;

  return (
    <aside className="hidden md:flex md:w-64 shrink-0 flex-col bg-ink text-white/90">
      <div className="px-6 py-7 border-b border-white/10">
        <div className="flex items-baseline gap-2">
          <span className="font-display text-2xl tracking-tight text-white">Docket</span>
        </div>
        <p className="mt-1 text-xs text-white/40">Project &amp; task ledger</p>
      </div>

      <nav className="flex-1 px-3 py-5 space-y-1">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              [
                "group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors",
                isActive
                  ? "bg-white/10 text-white"
                  : "text-white/60 hover:bg-white/5 hover:text-white/90",
              ].join(" ")
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={[
                    "h-4 w-[3px] rounded-full",
                    isActive ? "bg-accent" : "bg-transparent",
                  ].join(" ")}
                />
                <Icon className="h-4 w-4 shrink-0" />
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="mx-3 mb-5 rounded-lg border border-white/10 bg-white/5 px-4 py-3">
        <p className="text-xs text-white/40">Snapshot</p>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="font-display text-xl text-white">{projects.length}</span>
          <span className="text-xs text-white/50">projects</span>
        </div>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="font-display text-xl text-white">{openTasks}</span>
          <span className="text-xs text-white/50">open tasks</span>
        </div>
      </div>
    </aside>
  );
}

function OverviewIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <rect x="3" y="3" width="6" height="6" rx="1" />
      <rect x="11" y="3" width="6" height="6" rx="1" />
      <rect x="3" y="11" width="6" height="6" rx="1" />
      <rect x="11" y="11" width="6" height="6" rx="1" />
    </svg>
  );
}
function ProjectsIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M3 5.5A1.5 1.5 0 0 1 4.5 4H8l1.5 2H15.5A1.5 1.5 0 0 1 17 7.5v7A1.5 1.5 0 0 1 15.5 16h-11A1.5 1.5 0 0 1 3 14.5v-9Z" />
    </svg>
  );
}
function TasksIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M4 6h9M4 10h12M4 14h6" strokeLinecap="round" />
    </svg>
  );
}
function TeamIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <circle cx="7" cy="7" r="2.5" />
      <path d="M2.5 16c.5-3 2.2-4.5 4.5-4.5s4 1.5 4.5 4.5" strokeLinecap="round" />
      <circle cx="14.5" cy="7.5" r="2" />
      <path d="M12.8 11.8c1.9.3 3.2 1.6 3.7 4.2" strokeLinecap="round" />
    </svg>
  );
}
