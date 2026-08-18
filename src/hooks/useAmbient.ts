import { useCallback, useEffect, useState } from "react";

import {
  DEFAULT_AMBIENT_INDEX,
  applyAmbient,
  hueForIndex,
  readStoredAmbient,
  storeAmbient,
} from "@/lib/ambient";

const listeners = new Set<(index: number) => void>();
let currentIndex = DEFAULT_AMBIENT_INDEX;

function broadcast(index: number) {
  currentIndex = index;
  for (const listener of listeners) listener(index);
}

/**
 * Starea de lumină ambientală, partajată între toate componentele care o
 * afișează (homepage, galerie PDP). Citirea din localStorage se face după
 * hidratare, ca să nu apară diferențe între server și client.
 */
export function useAmbient() {
  const [index, setIndex] = useState(currentIndex);

  useEffect(() => {
    const listener = (next: number) => setIndex(next);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  useEffect(() => {
    const stored = readStoredAmbient();
    const initial = stored ?? currentIndex;
    applyAmbient(initial);
    broadcast(initial);
  }, []);

  const select = useCallback((next: number) => {
    applyAmbient(next);
    storeAmbient(next);
    broadcast(next);
  }, []);

  return { index, hue: hueForIndex(index), select };
}
