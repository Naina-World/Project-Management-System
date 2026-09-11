import React from "react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Overview" },
  { to: "/projects", label: "Projects" },
  { to: "/tasks", label: "Tasks" },
  { to: "/team", label: "Team" },
];

export default function MobileNav() {
  return (
    <div className="md:hidden sticky top-0 z-20 bg-ink text-white">
      <div className="flex items-center justify-between px-4 py-3">
        <span className="font-display text-lg">Docket</span>
      </div>
      <nav className="flex gap-1 overflow-x-auto px-3 pb-2 scrollbar-thin">
        {links.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              [
                "whitespace-nowrap rounded-full px-3 py-1.5 text-sm",
                isActive ? "bg-accent text-white" : "bg-white/10 text-white/70",
              ].join(" ")
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
