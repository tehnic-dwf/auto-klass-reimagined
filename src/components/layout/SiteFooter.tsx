import { Link } from "@tanstack/react-router";
import { Mail, Phone } from "lucide-react";

import logoUrl from "@/assets/autoklass-logo.png";
import { branches, contact } from "@/data/company";

const OUT = "/in-afara-scopului";

const columns: Array<{
  title: string;
  links: Array<{ label: string; to: string; hash?: string }>;
}> = [
  {
    title: "Cumpără",
    links: [
      { label: "Stoc: noi și rulate", to: "/autoturisme" },
      { label: "Cum verificăm rulatele", to: "/verificare-masini-rulate" },
      { label: "Mașini salvate și comparație", to: "/comparatie" },
      { label: "Cum cumpăr?", to: "/", hash: "cum-functioneaza" },
      { label: "Îți cumpărăm mașina", to: "/buy-back" },
    ],
  },
  {
    title: "Service",
    links: [
      { label: "Programare service", to: "/service/programare" },
      { label: "Service urgent", to: "/service/urgent" },
      { label: "Dosar daună", to: "/service/dosar-daune" },
      { label: "Piese și accesorii", to: OUT },
    ],
  },
  {
    title: "Autoklass",
    links: [
      { label: "Sucursale", to: "/", hash: "sucursale" },
      { label: "Despre noi", to: OUT },
      { label: "Cariere", to: OUT },
      { label: "Blog", to: OUT },
      { label: "Contact", to: OUT },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-6">
        <div className="grid gap-12 md:grid-cols-[1.2fr_repeat(3,1fr)]">
          <div>
            <img src={logoUrl} alt="Autoklass" className="h-8 w-auto" />
            <div className="mt-6 space-y-3 text-sm">
              <a href={contact.phoneHref} className="flex items-center gap-3 font-bold">
                <Phone className="size-5 shrink-0" aria-hidden />
                {contact.phone}
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-3 text-primary-foreground/75"
              >
                <Mail className="size-5 shrink-0" aria-hidden />
                {contact.email}
              </a>
            </div>
            <p className="mt-6 text-xs text-primary-foreground/60">
              {branches.length} sucursale în România: Otopeni, Băneasa, Pipera, Militari,
              Cluj-Napoca, Sibiu, Brașov, Timișoara, Ploiești.
            </p>
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <p className="eyebrow text-primary-foreground/55">{column.title}</p>
              <ul className="mt-4 space-y-3 text-sm">
                {column.links.map((link) => (
                  <li key={`${column.title}-${link.label}`}>
                    <Link
                      to={link.to}
                      {...(link.hash ? { hash: link.hash } : {})}
                      className="text-primary-foreground/80 transition-colors hover:text-primary-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-primary-foreground/15 pt-8 text-xs text-primary-foreground/60 md:flex-row md:justify-between">
          <p>
            {contact.legalName} · CUI {contact.cui}
          </p>
          <p>Prototip de redesign pe baza datelor publice Autoklass, august 2026.</p>
        </div>
      </div>
    </footer>
  );
}
