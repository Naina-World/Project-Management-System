import React from "react";

const base =
  "inline-flex items-center justify-center gap-1.5 rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

const variants = {
  primary: "bg-ink text-white hover:bg-ink-soft px-4 py-2",
  accent: "bg-accent text-white hover:bg-accent-ink px-4 py-2",
  ghost: "text-ink-muted hover:bg-paper px-3 py-1.5",
  danger: "text-danger hover:bg-danger-bg px-3 py-1.5",
  outline: "border border-line text-ink hover:bg-paper px-4 py-2",
};

export default function Button({ variant = "primary", className = "", ...props }) {
  return <button className={`${base} ${variants[variant]} ${className}`} {...props} />;
}
