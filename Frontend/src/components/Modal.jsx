import React, { useEffect } from "react";

export default function Modal({ open, onClose, title, children }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-ink/40 px-4 py-8 backdrop-blur-[2px]">
      <div
        className="w-full max-w-lg rounded-xl border border-line bg-surface shadow-xl"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-4">
          <h2 className="font-display text-lg text-ink">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-ink-muted hover:bg-paper hover:text-ink"
            aria-label="Close"
          >
            <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7">
              <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}
