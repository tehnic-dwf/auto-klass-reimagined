import { Link } from "@tanstack/react-router";
import {
  CalendarClock,
  ChevronDown,
  Heart,
  Mail,
  Menu,
  MessageCircle,
  Phone,
  Search,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import logoUrl from "@/assets/autoklass-logo.png";
import { Button } from "@/components/ui/button";
import { contact } from "@/data/company";
import { navigation, type NavGroup, type NavLink } from "@/data/navigation";
import { cn } from "@/lib/utils";

const OUT = "/in-afara-scopului";

/** Marcaj discret pentru ecranele efectiv construite în prototip. */
function ProtoDot({ on }: { on?: boolean | undefined }) {
  if (!on) return null;
  return (
    <span
      className="ml-2 inline-block size-1.5 shrink-0 rounded-full bg-accent align-middle"
      aria-label="ecran prototipat"
    />
  );
}

function groupSections(items: NavLink[]): Array<[string, NavLink[]]> {
  const out: Array<[string, NavLink[]]> = [];
  for (const item of items) {
    const key = item.section ?? "";
    const last = out[out.length - 1];
    if (last && last[0] === key) last[1].push(item);
    else out.push([key, [item]]);
  }
  return out;
}

function DesktopGroup({ group }: { group: NavGroup }) {
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  if (!group.items) {
    return (
      <Link
        to={group.to!}
        {...(group.hash ? { hash: group.hash } : {})}
        className="flex min-h-11 items-center whitespace-nowrap px-4 text-sm text-primary-foreground/75 transition-colors hover:text-primary-foreground"
        activeProps={{ className: "text-primary-foreground font-bold" }}
      >
        {group.label}
      </Link>
    );
  }

  const sections = groupSections(group.items);
  const wide = sections.length > 1;

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        if (timer.current) clearTimeout(timer.current);
        setOpen(true);
      }}
      onMouseLeave={() => {
        timer.current = setTimeout(() => setOpen(false), 140);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex min-h-11 items-center gap-1.5 whitespace-nowrap px-4 text-sm transition-colors",
          open
            ? "text-primary-foreground"
            : "text-primary-foreground/75 hover:text-primary-foreground",
        )}
      >
        {group.label}
        <ChevronDown
          className={cn("size-4 transition-transform", open && "rotate-180")}
          aria-hidden
        />
      </button>

      <div
        className={cn(
          "z-50 rounded-sm border border-border bg-card p-6 text-foreground shadow-panel",
          wide
            ? "fixed left-1/2 top-20 w-[min(46rem,calc(100vw-3rem))] -translate-x-1/2"
            : "absolute left-0 top-full w-80 max-w-[calc(100vw-3rem)]",
          open ? "block" : "hidden",
        )}
      >
        <div className={cn("grid gap-x-8 gap-y-6", wide ? "grid-cols-3" : "grid-cols-1")}>
          {sections.map(([section, items]) => (
            <div key={section}>
              {section ? (
                <p className="eyebrow mb-3 border-b border-border pb-2">{section}</p>
              ) : null}
              <ul className="space-y-1">
                {items.map((item) => (
                  <li key={`${item.label}-${item.to}`}>
                    <Link
                      to={item.to}
                      {...(item.hash ? { hash: item.hash } : {})}
                      onClick={() => setOpen(false)}
                      className="flex min-h-11 flex-col justify-center rounded-sm px-3 py-2 transition-colors hover:bg-muted"
                    >
                      <span className="block text-sm font-bold">
                        {item.label}
                        <ProtoDot on={item.prototyped} />
                      </span>
                      {item.hint ? (
                        <span className="mt-0.5 block text-xs text-muted-foreground">
                          {item.hint}
                        </span>
                      ) : null}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


function MobileGroup({ group, onNavigate }: { group: NavGroup; onNavigate: () => void }) {
  const [open, setOpen] = useState(false);

  if (!group.items) {
    return (
      <li className="border-b border-primary-foreground/10">
        <Link
          to={group.to!}
          {...(group.hash ? { hash: group.hash } : {})}
          onClick={onNavigate}
          className="flex min-h-14 items-center text-base font-bold"
        >
          {group.label}
        </Link>
      </li>
    );
  }

  return (
    <li className="border-b border-primary-foreground/10">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex min-h-14 w-full items-center justify-between gap-4 text-left text-base font-bold"
      >
        {group.label}
        <ChevronDown
          className={cn(
            "size-5 shrink-0 text-primary-foreground/60 transition-transform",
            open && "rotate-180",
          )}
          aria-hidden
        />
      </button>

      {open ? (
        <div className="pb-4">
          {groupSections(group.items).map(([section, items]) => (
            <div key={section} className="mb-4 last:mb-0">
              {section ? (
                <p className="eyebrow mb-1 text-primary-foreground/55">{section}</p>
              ) : null}
              <ul>
                {items.map((item: NavLink) => (
                  <li key={`${item.label}-${item.to}`}>
                    <Link
                      to={item.to}
                      {...(item.hash ? { hash: item.hash } : {})}
                      onClick={onNavigate}
                      className="flex min-h-12 flex-col justify-center rounded-sm py-2 transition-colors hover:bg-primary-foreground/10"
                    >
                      <span className="text-sm">
                        {item.label}
                        <ProtoDot on={item.prototyped} />
                      </span>
                      {item.hint ? (
                        <span className="text-xs text-primary-foreground/55">{item.hint}</span>
                      ) : null}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : null}
    </li>
  );
}

function ActionIcon({
  to,
  label,
  icon: Icon,
}: {
  to: string;
  label: string;
  icon: React.ElementType;
}) {
  return (
    <Link
      to={to}
      className="flex size-11 items-center justify-center rounded-sm text-primary-foreground/75 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground"
      aria-label={label}
      title={label}
    >
      <Icon className="size-5" aria-hidden />
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  // Cât timp meniul e deschis, pagina de dedesubt nu se mai mișcă.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-primary text-primary-foreground">
        {/* Desktop: un singur rând de 80px */}
        <div className="hidden lg:block">
          <div className="mx-auto flex h-20 w-full max-w-7xl items-center gap-6 px-6">
            <Link
              to="/"
              className="flex min-h-11 shrink-0 items-center"
              aria-label="Autoklass — acasă"
            >
              <img src={logoUrl} alt="Autoklass" className="h-8 w-auto" />
            </Link>


            <nav className="flex flex-1 items-center" aria-label="Navigație principală">
              {navigation.map((group) => (
                <DesktopGroup key={group.label} group={group} />
              ))}
            </nav>

            <div className="flex shrink-0 items-center gap-1">
              <ActionIcon to="/autoturisme" label="Caută în stoc" icon={Search} />
              <ActionIcon to="/comparatie" label="Mașini salvate" icon={Heart} />
              <ActionIcon to={OUT} label="Autentificare" icon={User} />
              <ActionIcon to={OUT} label="Coșul meu" icon={ShoppingCart} />
              <Button asChild variant="secondary" className="ml-3">
                <Link to="/service/programare">Programare service</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile: un singur nivel de 64px */}
        <div className="flex h-16 w-full items-center justify-between gap-3 px-4 lg:hidden">
          <Link to="/" aria-label="Autoklass — acasă">
            <img src={logoUrl} alt="Autoklass" className="h-7 w-auto" />
          </Link>

          <div className="flex items-center gap-1">
            <a
              href={contact.phoneHref}
              aria-label={`Sună la ${contact.phone}`}
              className="flex size-12 items-center justify-center rounded-sm text-primary-foreground"
            >
              <Phone className="size-5" aria-hidden />
            </a>
            <button
              type="button"
              className="flex size-12 items-center justify-center rounded-sm text-primary-foreground"
              aria-label={open ? "Închide meniul" : "Deschide meniul"}
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Meniu mobil pe tot ecranul: acoperă complet ce e dedesubt, inclusiv bara sticky */}
      <div
        className={cn(
          "fixed inset-0 z-[60] flex-col bg-primary text-primary-foreground lg:hidden",
          open ? "flex" : "hidden",
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Meniu"
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-primary-foreground/15 px-4">
          <img src={logoUrl} alt="Autoklass" className="h-7 w-auto" />
          <button
            type="button"
            className="flex size-12 items-center justify-center rounded-sm text-primary-foreground"
            aria-label="Închide meniul"
            onClick={() => setOpen(false)}
          >
            <X className="size-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 pb-8">
          <Link
            to="/autoturisme"
            onClick={() => setOpen(false)}
            className="my-5 flex min-h-12 items-center gap-3 rounded-sm border border-primary-foreground/20 px-4 text-sm text-primary-foreground/75"
          >
            <Search className="size-5 shrink-0" aria-hidden />
            Caută în stoc: noi și rulate
          </Link>

          <ul>
            {navigation.map((group) => (
              <MobileGroup key={group.label} group={group} onNavigate={() => setOpen(false)} />
            ))}
            <MobileGroup
              group={{
                label: "Autoklass",
                items: [
                  { label: "Mașini salvate și comparație", to: "/comparatie", prototyped: true },
                  { label: "Autentificare", to: OUT },
                  { label: "Coșul meu", to: OUT },
                  { label: "Contact", to: OUT },
                  { label: "Despre noi", to: OUT },
                  { label: "Blog", to: OUT },
                ],
              }}
              onNavigate={() => setOpen(false)}
            />
          </ul>

          {/* Cele 3 micro-conversii rămân la finalul meniului */}
          <div className="mt-8 space-y-3 border-t border-primary-foreground/15 pt-6">
            <a
              href={contact.phoneHref}
              onClick={() => setOpen(false)}
              className="flex min-h-12 items-center gap-3 rounded-sm bg-primary-foreground px-4 text-sm font-bold text-primary"
            >
              <Phone className="size-5" aria-hidden />
              Sună {contact.phone}
            </a>
            <a
              href={contact.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex min-h-12 items-center gap-3 rounded-sm border border-primary-foreground/25 px-4 text-sm font-bold"
            >
              <MessageCircle className="size-5" aria-hidden />
              Scrie pe WhatsApp
            </a>
            <Link
              to="/service/programare"
              onClick={() => setOpen(false)}
              className="flex min-h-12 items-center gap-3 rounded-sm border border-primary-foreground/25 px-4 text-sm font-bold"
            >
              <CalendarClock className="size-5" aria-hidden />
              Programare service
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
