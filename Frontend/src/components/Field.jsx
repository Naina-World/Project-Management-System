import React from "react";

export function Field({ label, children, hint }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-ink-muted">{hint}</span>}
    </label>
  );
}

const inputClass =
  "w-full rounded-md border border-line bg-white px-3 py-2 text-sm text-ink placeholder:text-ink-muted/60 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20";

export function TextInput({ className = "", ...props }) {
  return <input className={`${inputClass} ${className}`} {...props} />;
}

export function TextArea({ className = "", ...props }) {
  return <textarea className={`${inputClass} min-h-[80px] resize-y ${className}`} {...props} />;
}

export function Select({ children, className = "", ...props }) {
  return (
    <select className={`${inputClass} ${className}`} {...props}>
      {children}
    </select>
  );
}
