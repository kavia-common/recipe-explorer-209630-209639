import React from "react";

// PUBLIC_INTERFACE
export function Badge({ tone = "neutral", className = "", children, ...props }) {
  /** Small tag/badge component used for cuisines, tags, and meta. */
  const toneClass =
    tone === "primary" ? "badge-primary" : tone === "success" ? "badge-success" : "badge-neutral";
  return (
    <span className={`badge ${toneClass} ${className}`.trim()} {...props}>
      {children}
    </span>
  );
}
