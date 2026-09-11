import React from "react";

const STATUS_STYLES = {
  pending: "bg-status-pendingBg text-status-pending",
  "in-progress": "bg-status-progressBg text-status-progress",
  completed: "bg-status-doneBg text-status-done",
};

const STATUS_LABELS = {
  pending: "Pending",
  "in-progress": "In progress",
  completed: "Completed",
};

export default function Badge({ status }) {
  const style = STATUS_STYLES[status] || "bg-paper text-ink-muted";
  const label = STATUS_LABELS[status] || status;
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${style}`}>
      {label}
    </span>
  );
}
