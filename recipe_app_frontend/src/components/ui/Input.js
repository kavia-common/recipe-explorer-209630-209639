import React from "react";

// PUBLIC_INTERFACE
export function Input({ className = "", ...props }) {
  /** Accessible input with consistent styling. */
  return <input className={`input ${className}`.trim()} {...props} />;
}
