import React from "react";

// PUBLIC_INTERFACE
export function Button({
  variant = "default",
  size = "default",
  as: Comp = "button",
  className = "",
  ...props
}) {
  /** Retro-styled button. `as` can be "button" or a Link component. */
  const variantClass =
    variant === "primary" ? "btn-primary" : variant === "ghost" ? "btn-ghost" : "";
  const sizeClass = size === "small" ? "btn-small" : "";
  return <Comp className={`btn ${variantClass} ${sizeClass} ${className}`.trim()} {...props} />;
}
