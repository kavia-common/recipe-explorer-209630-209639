import React from "react";

// PUBLIC_INTERFACE
export function Rating({ value, outOf = 5 }) {
  /** Read-only rating display with stars + numeric label. */
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  const stars = Array.from({ length: outOf }, (_, i) => {
    const idx = i + 1;
    const ch = idx <= full ? "★" : idx === full + 1 && half ? "⯪" : "☆";
    return <span key={idx} aria-hidden="true">{ch}</span>;
  });

  return (
    <span className="rating" aria-label={`Rating ${value} out of ${outOf}`}>
      <span className="stars">{stars}</span>
      <span>{value.toFixed(1)}</span>
    </span>
  );
}
