import React from "react";

export default function StatCard({ label, value, sub }) {
  return (
    <div className="rounded-xl border border-line bg-surface p-5 shadow-card">
      <p className="text-sm text-ink-muted">{label}</p>
      <p className="mt-2 font-display text-3xl text-ink">{value}</p>
      {sub && <p className="mt-1 text-xs text-ink-muted">{sub}</p>}
    </div>
  );
}
