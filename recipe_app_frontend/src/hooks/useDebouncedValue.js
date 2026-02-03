import { useEffect, useState } from "react";

// PUBLIC_INTERFACE
export function useDebouncedValue(value, delayMs = 250) {
  /** Debounces any value to reduce expensive recalculations (e.g., filtering lists). */
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const t = window.setTimeout(() => setDebounced(value), delayMs);
    return () => window.clearTimeout(t);
  }, [value, delayMs]);

  return debounced;
}
