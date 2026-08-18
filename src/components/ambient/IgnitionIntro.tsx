import { useCallback, useEffect, useState } from "react";

const SESSION_KEY = "autoklass:ignition";
const DURATION = 3200;

/**
 * „Urcarea în mașină": ecran negru, steaua se aprinde, lumina ambientală
 * porneşte pe margini ca la deschiderea portierei, apoi cortina se ridică
 * și site-ul rămâne aprins. O singură dată pe sesiune, sărită la orice tap.
 */
export function IgnitionIntro() {
  const [phase, setPhase] = useState<"idle" | "playing" | "closing" | "done">("idle");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    try {
      seen = window.sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      seen = false;
    }
    if (reduced || seen) {
      setPhase("done");
      return;
    }
    try {
      window.sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* modul privat */
    }
    setPhase("playing");
    document.documentElement.style.overflow = "hidden";
    const close = window.setTimeout(() => setPhase("closing"), DURATION);
    const end = window.setTimeout(() => setPhase("done"), DURATION + 900);
    return () => {
      window.clearTimeout(close);
      window.clearTimeout(end);
      document.documentElement.style.overflow = "";
    };
  }, []);

  const skip = useCallback(() => {
    setPhase((current) => (current === "playing" ? "closing" : current));
    window.setTimeout(() => setPhase("done"), 900);
  }, []);

  useEffect(() => {
    if (phase === "done") document.documentElement.style.overflow = "";
  }, [phase]);

  if (phase === "idle" || phase === "done") return null;

  return (
    <div
      className={`ignition-overlay fixed inset-0 z-[100] flex flex-col items-center justify-center bg-primary text-primary-foreground ${
        phase === "closing" ? "ignition-overlay--closing" : ""
      }`}
      onClick={skip}
      role="presentation"
    >
      <div className="ambient-bloom pointer-events-none absolute inset-0 mix-blend-screen" aria-hidden />
      <div className="ignition-edge pointer-events-none absolute inset-0" aria-hidden />

      <svg
        className="ignition-star"
        viewBox="0 0 100 100"
        width="104"
        height="104"
        aria-hidden
      >
        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeOpacity="0.8" strokeWidth="3" />
        <g stroke="currentColor" strokeWidth="3.5" strokeLinecap="round">
          <line x1="50" y1="50" x2="50" y2="7" />
          <line x1="50" y1="50" x2="87" y2="71" />
          <line x1="50" y1="50" x2="13" y2="71" />
        </g>
      </svg>

      <div className="ambient-line ignition-line mt-10 w-48 max-w-[70vw] md:w-72" aria-hidden />

      <p className="ignition-word mt-8 text-center font-display text-lg tracking-[0.18em] uppercase md:text-2xl">
        Ai urcat.
      </p>
      <p className="ignition-word ignition-word--late mt-2 max-w-xs text-center text-sm text-primary-foreground/70">
        Lumina e aprinsă. Restul e al tău.
      </p>

      <button
        type="button"
        onClick={skip}
        className="absolute bottom-8 text-[0.7rem] uppercase tracking-[0.2em] text-primary-foreground/45"
      >
        Intră direct
      </button>
    </div>
  );
}
