/**
 * Lumina ambientală ca sistem de stare al site-ului.
 *
 * Interiorul Mercedes are până la 64 de culori dinamice. Aici, aceleași 64 de
 * culori nu sunt o specificație scrisă în listă — schimbă efectiv atmosfera
 * paginii: gradientele „ambient-bloom", liniile de lumină și marginile luminate
 * citesc toate aceleași două variabile CSS.
 */

export const AMBIENT_COUNT = 64;

export type AmbientScene = {
  /** 0–63, indexul culorii din paletă */
  index: number;
  /** nuanța caldă dominantă, în grade OKLCH */
  hue: number;
};

const WARM_LIGHTNESS = 0.74;
const WARM_CHROMA = 0.17;
const COOL_LIGHTNESS = 0.72;
const COOL_CHROMA = 0.13;
/** decalajul rece: cald + rece, tiparul real din habitaclu */
const COOL_OFFSET = 148;

export const STORAGE_KEY = "autoklass:ambient";

/** Nuanța (în grade) pentru fiecare dintre cele 64 de poziții. */
export function hueForIndex(index: number): number {
  return Math.round((index * 360) / AMBIENT_COUNT);
}

export function warmColor(hue: number): string {
  return `oklch(${WARM_LIGHTNESS} ${WARM_CHROMA} ${hue})`;
}

export function coolColor(hue: number): string {
  return `oklch(${COOL_LIGHTNESS} ${COOL_CHROMA} ${(hue + COOL_OFFSET) % 360})`;
}

/** Cele 64 de culori, în ordinea din paleta de pe ușă. */
export const ambientPalette: AmbientScene[] = Array.from(
  { length: AMBIENT_COUNT },
  (_, index) => ({ index, hue: hueForIndex(index) }),
);

/** Scene numite — ancore emoționale, nu doar coduri de culoare. */
export const ambientPresets: { label: string; description: string; index: number }[] = [
  { label: "Solar", description: "Amber cald, ca la apus pe autostradă", index: 11 },
  { label: "Nautic", description: "Albastru adânc, liniște de seară", index: 38 },
  { label: "Vulcan", description: "Roșu profund, puls scurt", index: 3 },
  { label: "Pădure", description: "Verde rece, aer curat", index: 26 },
  { label: "Orhidee", description: "Violet discret, lounge privat", index: 51 },
  { label: "Platină", description: "Alb-rece, precizie germanică", index: 42 },
];

export const DEFAULT_AMBIENT_INDEX = 11;

/** Scrie culoarea aleasă în variabilele CSS citite de tot site-ul. */
export function applyAmbient(index: number): void {
  if (typeof document === "undefined") return;
  const hue = hueForIndex(index);
  const root = document.documentElement;
  root.style.setProperty("--ambient-amber", warmColor(hue));
  root.style.setProperty("--ambient-cyan", coolColor(hue));
}

export function readStoredAmbient(): number | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === null) return null;
    const value = Number.parseInt(raw, 10);
    if (Number.isNaN(value) || value < 0 || value >= AMBIENT_COUNT) return null;
    return value;
  } catch {
    return null;
  }
}

export function storeAmbient(index: number): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, String(index));
  } catch {
    /* modul privat: rămâne doar pentru sesiunea curentă */
  }
}
