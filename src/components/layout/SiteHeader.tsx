import { Link } from "@tanstack/react-router";
import {
  CalendarClock,
  ChevronDown,
  ExternalLink,
  Globe,
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

/** Badge discret pentru ecranele efectiv construite în prototip. */
function ProtoDot({ on }: { on?: boolean | undefined }) {
  if (!on) return null;
  return (
    <span
      className="ml-2 inline-block size-1.5 shrink-0 rounded-full bg-accent align-middle"
      aria-label="ecran prototipat"
    />
  );
}

function DesktopGroup({ group }: { group: NavGroup }) {
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  if (!group.items) {
    return (
      <Link
        to={group.to!}
        {...(group.hash ? { hash: group.hash } : {})}
        className="whitespace-nowrap px-3 py-2.5 text-[13px] text-primary-foreground/80 transition-colors hover:text-primary-foreground"
        activeProps={{ className: "text-primary-foreground font-bold" }}
      >
        {group.label}
      </Link>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        if (timer.current) clearTimeout(timer.current);
        setOpen(true);
      }}
      onMouseLeave={() => {
        timer.current = setTimeout(() => setOpen(false), 120);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex items-center gap-1 whitespace-nowrap px-3 py-2.5 text-[13px] transition-colors",
          open
            ? "text-primary-foreground"
            : "text-primary-foreground/80 hover:text-primary-foreground",
        )}
      >
        {group.label}
        <ChevronDown
          className={cn("size-3.5 transition-transform", open && "rotate-180")}
          aria-hidden
        />
      </button>

      <div
        className={cn(
          "absolute left-0 top-full z-50 w-72 border border-border bg-card p-2 text-foreground shadow-card",
          open ? "block" : "hidden",
        )}
      >
        <div className="ambient-line mb-2 h-px w-full" aria-hidden />
        <ul>
          {group.items.map((item) => (
            <li key={`${item.label}-${item.to}`}>
              <Link
                to={item.to}
                {...(item.hash ? { hash: item.hash } : {})}
                onClick={() => setOpen(false)}
                className="block rounded-sm px-3 py-2 hover:bg-muted"
              >
                <span className="block text-sm font-bold">
                  {item.label}
                  <ProtoDot on={item.prototyped} />
                </span>
                {item.hint ? (
                  <span className="block text-xs text-muted-foreground">{item.hint}</span>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function MobileGroup({
  group,
  onNavigate,
}: {
  group: NavGroup;
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);

  if (!group.items) {
    return (
      <li className="border-b border-primary-foreground/10">
        <Link
          to={group.to!}
          {...(group.hash ? { hash: group.hash } : {})}
          onClick={onNavigate}
          className="block px-1 py-4 text-base font-bold"
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
        className="flex w-full items-center justify-between px-1 py-4 text-left text-base font-bold"
      >
        {group.label}
        <ChevronDown
          className={cn(
            "size-5 text-primary-foreground/70 transition-transform",
            open && "rotate-180",
          )}
          aria-hidden
        />
      </button>

      {open ? (
        <ul className="pb-3 pl-1">
          {group.items.map((item: NavLink) => (
            <li key={`${item.label}-${item.to}`}>
              <Link
                to={item.to}
                {...(item.hash ? { hash: item.hash } : {})}
                onClick={onNavigate}
                className="block rounded-sm px-3 py-2.5 hover:bg-primary-foreground/10"
              >
                <span className="block text-sm">
                  {item.label}
                  <ProtoDot on={item.prototyped} />
                </span>
                {item.hint ? (
                  <span className="block text-xs text-primary-foreground/55">
                    {item.hint}
                  </span>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  );
}

function UtilityIcon({
  to,
  label,
  icon: Icon,
  count,
}: {
  to: string;
  label: string;
  icon: React.ElementType;
  count?: number;
}) {
  return (
    <Link
      to={to}
      className="group relative flex flex-col items-center gap-1 p-2 text-[11px] font-medium text-primary-foreground/80 transition-colors hover:text-primary-foreground"
      aria-label={label}
    >
      <div className="relative">
        <Icon className="size-6" aria-hidden />
        {count ? (
          <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-white">
            {count}
          </span>
        ) : null}
      </div>
      <span className="hidden xl:inline">{label}</span>
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
      <header className="sticky top-0 z-50 border-b border-border bg-primary text-primary-foreground">
        {/* Desktop: top strip + middle strip + nav strip */}
        <div className="hidden lg:block">
          {/* Top strip */}
          <div className="border-b border-primary-foreground/10 bg-black/20">
            <div className="mx-auto flex h-9 w-full max-w-7xl items-center justify-between px-4 text-xs">
              <div className="flex items-center gap-4">
                <Link
                  to={OUT}
                  className="flex items-center gap-1.5 text-primary-foreground/70 transition-colors hover:text-primary-foreground"
                >
                  Contact
                </Link>
                <Link
                  to={OUT}
                  className="flex items-center gap-1.5 text-primary-foreground/70 transition-colors hover:text-primary-foreground"
                >
                  Piese auto <ExternalLink className="size-3" aria-hidden />
                </Link>
                <Link
                  to={OUT}
                  className="flex items-center gap-1.5 text-primary-foreground/70 transition-colors hover:text-primary-foreground"
                >
                  Închirieri auto <ExternalLink className="size-3" aria-hidden />
                </Link>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-primary-foreground/60">
                  Ai nevoie de ajutor? Contactează-ne la:
                </span>
                <a
                  href={contact.phoneHref}
                  className="flex items-center gap-1.5 font-bold transition-colors hover:text-white"
                >
                  <Phone className="size-3.5" aria-hidden />
                  {contact.phone}
                </a>
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-1.5 text-primary-foreground/70 transition-colors hover:text-primary-foreground"
                >
                  <Mail className="size-3.5" aria-hidden />
                  {contact.email}
                </a>
                <button
                  type="button"
                  className="flex items-center gap-1.5 text-primary-foreground/70 transition-colors hover:text-primary-foreground"
                >
                  <Globe className="size-3.5" aria-hidden />
                  Română
                </button>
              </div>
            </div>
          </div>

          {/* Middle strip */}
          <div className="mx-auto flex h-[72px] w-full max-w-7xl items-center justify-between gap-6 px-4">
            <Link to="/" className="flex shrink-0 items-center gap-2" aria-label="Autoklass — acasă">
              <img src={logoUrl} alt="Autoklass" className="h-8 w-auto" />
            </Link>

            {/* Search bar */}
            <div className="mx-4 flex flex-1 justify-center">
              <Link
                to="/autoturisme"
                className="flex h-11 w-full max-w-xl items-center gap-3 rounded-sm border border-primary-foreground/20 bg-primary-foreground/5 px-4 text-sm text-primary-foreground/60 transition-colors hover:border-primary-foreground/30 hover:text-primary-foreground/80"
              >
                <Search className="size-5 shrink-0" aria-hidden />
                <span className="truncate">Termenul dumneavoastră de căutare...</span>
              </Link>
            </div>

            <div className="flex shrink-0 items-center gap-1">
              <UtilityIcon to="/comparatie" label="Favorite" icon={Heart} count={0} />
              <UtilityIcon to={OUT} label="Autentificare" icon={User} />
              <UtilityIcon to={OUT} label="Coșul meu" icon={ShoppingCart} count={0} />
            </div>
          </div>

          {/* Nav strip */}
          <div className="border-t border-primary-foreground/10">
            <nav
              className="mx-auto flex h-12 w-full max-w-7xl items-center px-4"
              aria-label="Navigație principală"
            >
              {navigation.map((group) => (
                <DesktopGroup key={group.label} group={group} />
              ))}
            </nav>
          </div>
        </div>

        {/* Mobile: single strip */}
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-3 px-4 lg:hidden">
          <Link to="/" className="flex items-center gap-2" aria-label="Autoklass — acasă">
            <img src={logoUrl} alt="Autoklass" className="h-6 w-auto" />
          </Link>

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
              className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              aria-label={open ? "Închide meniul" : "Deschide meniul"}
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </Button>
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
          <img src={logoUrl} alt="Autoklass" className="h-6 w-auto" />
          <Button
            variant="ghost"
            size="icon"
            className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            aria-label="Închide meniul"
            onClick={() => setOpen(false)}
          >
            <X className="size-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-8">
          <Link
            to="/autoturisme"
            onClick={() => setOpen(false)}
            className="my-4 flex items-center gap-3 rounded-sm border border-primary-foreground/20 bg-primary-foreground/5 px-3 py-3 text-sm text-primary-foreground/70"
          >
            <Search className="size-4" aria-hidden />
            Caută în stoc: noi și rulate, în aceeași listă
          </Link>

          <ul>
            {navigation.map((group) => (
              <MobileGroup
                key={group.label}
                group={group}
                onNavigate={() => setOpen(false)}
              />
            ))}
          </ul>

          {/* Cele 3 micro-conversii rămân la finalul meniului */}
          <div className="mt-8 space-y-2 border-t border-primary-foreground/15 pt-6">
            <a
              href={contact.phoneHref}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-sm bg-primary-foreground px-4 py-3 text-sm font-bold text-primary"
            >
              <Phone className="size-4" aria-hidden />
              Sună {contact.phone}
            </a>
            <a
              href={contact.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-sm border border-primary-foreground/25 px-4 py-3 text-sm font-bold"
            >
              <MessageCircle className="size-4 text-trust" aria-hidden />
              Scrie pe WhatsApp
            </a>
            <Link
              to="/service/programare"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-sm border border-primary-foreground/25 px-4 py-3 text-sm font-bold"
            >
              <CalendarClock className="size-4 text-accent" aria-hidden />
              Programare service
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
