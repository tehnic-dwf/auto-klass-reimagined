import { Link } from "@tanstack/react-router";
import { Menu, Phone, Search, X } from "lucide-react";
import { useState } from "react";

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
  { label: "Test drive", to: "/autoturisme", hint: "din pagina mașinii" },
  { label: "Sucursale", to: "/", hint: "9 locații în România" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-3 px-4">
        <Link to="/" className="flex items-center gap-2" aria-label="Autoklass — acasă">
          <img src="/__l5e/assets-v1/314fefc9-6eaf-48cc-a6dd-e6119412e33f/autoklass-logo.png" alt="Autoklass" className="h-6 w-auto" />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {primaryNav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm text-foreground/80 transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground font-bold" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <a
            href={contact.phoneHref}
            className="hidden items-center gap-2 rounded-sm px-3 py-2 text-sm font-bold text-foreground sm:flex"
          >
            <Phone className="size-4 text-accent" aria-hidden />
            {contact.phone}
          </a>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
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
          "overflow-hidden border-t border-border bg-background md:hidden",
          open ? "block" : "hidden",
        )}
      >
        <div className="px-4 py-4">
          <Link
            to="/autoturisme"
            onClick={() => setOpen(false)}
            className="mb-4 flex items-center gap-3 rounded-sm border border-border bg-secondary px-3 py-3 text-sm text-muted-foreground"
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
                  className="block rounded-sm px-3 py-3 hover:bg-secondary"
                >
                  <span className="block text-base font-bold">{item.label}</span>
                  <span className="block text-sm text-muted-foreground">
                    {item.description}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-4 border-t border-border pt-4">
            <p className="eyebrow mb-2">Altele</p>
            <ul className="space-y-1">
              {secondaryNav.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-sm px-3 py-2 text-sm hover:bg-secondary"
                  >
                    <span>{item.label}</span>
                    <span className="text-xs text-muted-foreground">{item.hint}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <a
            href={contact.phoneHref}
            className="mt-4 flex items-center justify-center gap-2 rounded-sm bg-primary px-4 py-3 text-sm font-bold text-primary-foreground"
          >
            <Phone className="size-4" aria-hidden />
            Sună {contact.phone}
          </a>
        </div>
      </div>
    </header>
  );
}
