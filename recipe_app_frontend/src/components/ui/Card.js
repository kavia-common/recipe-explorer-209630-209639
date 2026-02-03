import React from "react";

// PUBLIC_INTERFACE
export function Card({ className = "", hover = false, children, ...props }) {
  /** Surface container with optional hover interaction. */
  return (
    <div className={`card ${hover ? "card-hover" : ""} ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}
