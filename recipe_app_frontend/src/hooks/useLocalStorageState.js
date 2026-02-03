import { useEffect, useState } from "react";

// PUBLIC_INTERFACE
export function useLocalStorageState(key, initialValue) {
  /** Keeps state in sync with localStorage (best-effort, client-side only). */
  const [value, setValue] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw == null) return initialValue;
      return JSON.parse(raw);
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Ignore write errors (private mode, quota, etc.)
    }
  }, [key, value]);

  return [value, setValue];
}
