import { useEffect, useRef, useState } from "react";

/**
 * Custom hook that caches a local copy of a prop value.
 * When the prop changes, the local copy is updated.
 * When the user modifies the local copy, it stays until the prop changes again.
 *
 * Fixed: Uses useRef to track prop changes without causing render loops.
 */
export function useCachedState<T>(propValue: T): [T, (value: T) => void] {
  const [currValue, setCurrValue] = useState(propValue);
  const lastPropRef = useRef(propValue);

  // Sync with prop changes using useEffect to avoid render-during-render
  useEffect(() => {
    if (propValue !== lastPropRef.current) {
      lastPropRef.current = propValue;
      setCurrValue(propValue);
    }
  }, [propValue]);

  return [currValue, setCurrValue];
}
