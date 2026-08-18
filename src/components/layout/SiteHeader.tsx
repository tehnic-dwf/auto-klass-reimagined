import { Link } from "@tanstack/react-router";
import { Menu, Phone, Search, X } from "lucide-react";
import { useState } from "react";

import logoUrl from "@/assets/autoklass-logo.png";
import { Button } from "@/components/ui/button";
import { contact } from "@/data/company";
import { cn } from "@/lib/utils";

/**
 * Meniu simplificat: 5 intrări principale, fiecare cu o singură intenție.
 * Structura veche (7+ categorii suprapuse) a fost comasată conform auditului UX.
 */
const primaryNav = [
  {
    label: "Autoturisme",
    to: "/autoturisme",
    description: "Stoc unificat: noi și rulate, cu filtre pe buget",
  },
  {
    label: "Programare service",
    to: "/service/programare",
    description: "3 pași, confirmare în maximum 2 ore lucrătoare",
  },
  {
    label: "Dosar daună",
    to: "/service/dosar-daune",
    description: "Constatare, mașină de schimb, decontare directă",
  },
] as const;

const secondaryNav = [
  {
    label: "Cum verificăm rulatele",
    to: "/verificare-masini-rulate",
    hint: "100+ puncte de control",
  },
  { label: "Lista mea salvată", to: "/comparatie", hint: "compară fără grabă" },
  { label: "Test drive", to: "/autoturisme", hint: "din pagina mașinii" },
  { label: "Sucursale", to: "/", hint: "9 locații în România" },
] as const;


export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-primary text-primary-foreground backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-3 px-4">
        <Link to="/" className="flex items-center gap-2" aria-label="Autoklass — acasă">
          <img src={logoUrl} alt="Autoklass" className="h-6 w-auto" />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {primaryNav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm text-primary-foreground/80 transition-colors hover:text-primary-foreground"
              activeProps={{ className: "text-primary-foreground font-bold" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <a
            href={contact.phoneHref}
            className="hidden items-center gap-2 rounded-sm px-3 py-2 text-sm font-bold text-primary-foreground sm:flex"
          >
            <Phone className="size-4 text-accent" aria-hidden />
            {contact.phone}
          </a>
          <Button
            variant="ghost"
            size="icon"
            className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground md:hidden"
            aria-label={open ? "Închide meniul" : "Deschide meniul"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}

          </Button>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-primary-foreground/15 bg-primary md:hidden",
          open ? "block" : "hidden",
        )}
      >
        <div className="px-4 py-4">
          <Link
            to="/autoturisme"
            onClick={() => setOpen(false)}
            className="mb-4 flex items-center gap-3 rounded-sm border border-primary-foreground/20 bg-primary-foreground/5 px-3 py-3 text-sm text-primary-foreground/70"
          >
            <Search className="size-4" aria-hidden />
            Caută în stocul de 1.172 mașini Mercedes-Benz
          </Link>

          <ul className="space-y-1">
            {primaryNav.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="block rounded-sm px-3 py-3 hover:bg-primary-foreground/10"
                >
                  <span className="block text-base font-bold">{item.label}</span>
                  <span className="block text-sm text-primary-foreground/65">
                    {item.description}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-4 border-t border-primary-foreground/15 pt-4">
            <p className="eyebrow mb-2 text-primary-foreground/60">Altele</p>
            <ul className="space-y-1">
              {secondaryNav.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-sm px-3 py-2 text-sm hover:bg-primary-foreground/10"
                  >
                    <span>{item.label}</span>
                    <span className="text-xs text-primary-foreground/60">{item.hint}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <a
            href={contact.phoneHref}
            className="mt-4 flex items-center justify-center gap-2 rounded-sm bg-primary-foreground px-4 py-3 text-sm font-bold text-primary"
          >
            <Phone className="size-4" aria-hidden />
            Sună {contact.phone}
          </a>
        </div>
      </div>
    </header>
  );
}
