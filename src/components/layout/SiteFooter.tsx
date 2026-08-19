import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";

import { branches, contact } from "@/data/company";

const OUT = "/in-afara-scopului";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto w-full max-w-6xl px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-lg">Autoklass</p>
            <p className="mt-2 text-sm text-primary-foreground/70">
              {contact.legalName} · CUI {contact.cui}
            </p>
            <div className="mt-4 space-y-2 text-sm">
              <a href={contact.phoneHref} className="flex items-center gap-2 font-bold">
                <Phone className="size-4" aria-hidden />
                {contact.phone}
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-2 text-primary-foreground/80"
              >
                <Mail className="size-4" aria-hidden />
                {contact.email}
              </a>
            </div>
          </div>

          <div>
            <p className="eyebrow text-primary-foreground/60">Ce poți face aici</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link to="/autoturisme" className="text-primary-foreground/85">
                  Stoc autoturisme noi și rulate
                </Link>
              </li>
              <li>
                <Link to="/service/programare" className="text-primary-foreground/85">
                  Programare service
                </Link>
              </li>
              <li>
                <Link to="/service/dosar-daune" className="text-primary-foreground/85">
                  Dosar daună și mașină de schimb
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="eyebrow text-primary-foreground/60">Autoklass</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link to="/" hash="sucursale" className="text-primary-foreground/85">
                  Sucursale
                </Link>
              </li>
              <li>
                <Link to={OUT} className="text-primary-foreground/85">
                  Povestea Autoklass
                </Link>
              </li>
              <li>
                <Link to={OUT} className="text-primary-foreground/85">
                  Cariere
                </Link>
              </li>
              <li>
                <Link to={OUT} className="text-primary-foreground/85">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/" hash="cum-functioneaza" className="text-primary-foreground/85">
                  Cum cumpăr?
                </Link>
              </li>
              <li>
                <Link to={OUT} className="text-primary-foreground/85">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="eyebrow text-primary-foreground/60">
              Sucursale cu service ({branches.length})
            </p>
            <ul className="mt-3 space-y-2 text-sm text-primary-foreground/80">
              {branches.slice(0, 5).map((branch) => (
                <li key={branch.name} className="flex gap-2">
                  <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden />
                  <span>
                    <span className="block text-primary-foreground">{branch.name}</span>
                    {branch.address}
                  </span>
                </li>
              ))}
              <li className="text-primary-foreground/60">
                și {branches.length - 5} alte locații: Sibiu, Brașov, Timișoara,
                Ploiești.
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-10 border-t border-primary-foreground/15 pt-6 text-xs text-primary-foreground/60">
          Prototip de redesign realizat pe baza datelor publice Autoklass. Prețurile și
          stocul sunt cele afișate pe autoklass.ro în august 2026.
        </p>
      </div>
    </footer>
  );
}
