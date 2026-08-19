/**
 * Arhitectura de navigație apropiată de structura reală autoklass.ro
 * (Autovehicule noi / Oferte actuale / Autovehicule rulate / Service auto /
 * Servicii / Piese și Accesorii / Despre noi / Cum cumpăr? / Blog),
 * dar cu fluxurile prototipate ca linkuri principale în fiecare grup.
 *
 * `prototyped: true` = ecran construit în runda curentă.
 * Restul duc la pagina generică „out of scope”, ca să vedem arhitectura completă.
 */

export type NavLink = {
  label: string;
  to: string;
  hash?: string;
  hint?: string;
  /** Ecran construit în prototip (evidențiat vizual în meniu). */
  prototyped?: boolean;
};

export type NavGroup = {
  label: string;
  /** Link direct când grupul nu are copii (ex. „Cum cumpăr?”, „Blog”). */
  to?: string;
  hash?: string;
  prototyped?: boolean;
  items?: NavLink[];
};

const OUT = "/in-afara-scopului";

export const navigation: NavGroup[] = [
  {
    label: "Autovehicule noi",
    items: [
      {
        label: "Tot stocul de mașini noi",
        to: "/autoturisme",
        hint: "listă unificată, filtru „Nou”",
        prototyped: true,
      },
      { label: "Mercedes-Benz", to: "/autoturisme", hint: "428 în stoc", prototyped: true },
      { label: "smart", to: OUT },
      { label: "Honda", to: OUT },
      { label: "Volkswagen · Audi", to: OUT },
      { label: "XPENG (electrice)", to: OUT },
      { label: "Vehicule comerciale", to: OUT },
    ],
  },
  {
    label: "Oferte actuale",
    items: [
      {
        label: "Disponibile imediat",
        to: "/autoturisme",
        hint: "fără timp de așteptare",
        prototyped: true,
      },
      { label: "Campanii și reduceri", to: OUT },
      { label: "Stoc de flotă", to: OUT },
    ],
  },
  {
    label: "Autovehicule rulate",
    items: [
      {
        label: "Tot stocul de rulate",
        to: "/autoturisme",
        hint: "filtru „Rulat”",
        prototyped: true,
      },
      {
        label: "Cum verificăm rulatele",
        to: "/verificare-masini-rulate",
        hint: "100+ puncte de control",
        prototyped: true,
      },
      {
        label: "Lista mea salvată",
        to: "/comparatie",
        hint: "compară fără grabă",
        prototyped: true,
      },
      {
        label: "Îți cumpărăm mașina",
        to: "/buy-back",
        hint: "evaluare cu interval de preț",
      },
    ],
  },
  {
    label: "Service auto",
    items: [
      {
        label: "Programare service",
        to: "/service/programare",
        hint: "confirmare în max. 2 ore",
        prototyped: true,
      },
      {
        label: "Dosar daună",
        to: "/service/dosar-daune",
        hint: "decontare directă",
        prototyped: true,
      },
      { label: "Service urgent", to: "/service/urgent", hint: "telefon direct" },
      { label: "Revizii și pachete fixe", to: OUT },
      { label: "Tinichigerie și vopsitorie", to: OUT },
    ],
  },
  {
    label: "Servicii",
    items: [
      {
        label: "Test drive",
        to: "/autoturisme",
        hint: "din pagina mașinii",
        prototyped: true,
      },
      { label: "Finanțare și leasing", to: OUT },
      { label: "Asigurări", to: OUT },
      { label: "Pick-up & delivery", to: OUT },
      { label: "Mașină de schimb", to: OUT },
    ],
  },
  {
    label: "Piese și Accesorii",
    items: [
      { label: "Piese originale", to: OUT },
      { label: "Accesorii și personalizare", to: OUT },
      { label: "Anvelope și hotel anvelope", to: OUT },
    ],
  },
  {
    label: "Despre noi",
    items: [
      { label: "Sucursale", to: "/", hash: "sucursale", hint: "9 locații" },
      { label: "Povestea Autoklass", to: OUT },
      { label: "Cariere", to: OUT },
      { label: "Contact", to: OUT },
    ],
  },
  {
    label: "Cum cumpăr?",
    to: "/",
    hash: "cum-functioneaza",
    prototyped: true,
  },
  { label: "Blog", to: OUT },
];
