import React from "react";

export function EmptyState({ title, description, action }) {
  return (
    <div className="rounded-xl border border-dashed border-line bg-white/50 px-6 py-14 text-center">
      <p className="font-display text-lg text-ink">{title}</p>
      {description && <p className="mx-auto mt-1.5 max-w-sm text-sm text-ink-muted">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function Spinner({ className = "" }) {
  return (
    <svg
      className={`animate-spin ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      width="20"
      height="20"
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.2" strokeWidth="3" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function PageLoading() {
  return (
    <div className="flex h-64 items-center justify-center text-ink-muted">
      <Spinner className="mr-2" />
      Loading data from the server…
    </div>
  );
}

export function ErrorBanner({ message, onRetry }) {
  if (!message) return null;
  return (
    <div className="mb-6 flex items-start justify-between gap-4 rounded-lg border border-danger/30 bg-danger-bg px-4 py-3 text-sm text-danger">
      <div>
        <p className="font-medium">Something went wrong</p>
        <p className="mt-0.5 text-danger/90">{message}</p>
      </div>
      {onRetry && (
        <button onClick={onRetry} className="shrink-0 font-medium underline underline-offset-2">
          Retry
        </button>
      )}
    </div>
  );
}
