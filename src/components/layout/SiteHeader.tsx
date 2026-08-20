import { Link } from "@tanstack/react-router";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  ChevronDown,
  Heart,
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

function DesktopGroup({
  group,
  open,
  onOpen,
  onClose,
}: {
  group: NavGroup;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  if (!group.items) {
    return (
      <Link
        to={group.to!}
        {...(group.hash ? { hash: group.hash } : {})}
        className="flex min-h-11 items-center whitespace-nowrap px-2 text-sm text-primary-foreground/75 transition-colors hover:text-primary-foreground xl:px-4"
        activeProps={{ className: "text-primary-foreground font-bold" }}
      >
        {group.label}
      </Link>
    );
  }

  const sections = groupSections(group.items);

  return (
    <div
      onMouseEnter={() => {
        if (timer.current) clearTimeout(timer.current);
        onOpen();
      }}
      onMouseLeave={() => {
        timer.current = setTimeout(onClose, 140);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={() => (open ? onClose() : onOpen())}
        onFocus={onOpen}
        className={cn(
          "flex min-h-11 items-center gap-1.5 whitespace-nowrap px-2 text-sm transition-colors xl:px-4",
          open
            ? "text-primary-foreground"
            : "text-primary-foreground/75 hover:text-primary-foreground",
        )}
      >
        {group.label}
        <ChevronDown
          className={cn("size-4 transition-transform", open && "rotate-180")}
          strokeWidth={1.5}
          aria-hidden
        />
      </button>

      {open ? (
        <div className="absolute inset-x-0 top-full z-50 border-t border-border bg-card text-foreground shadow-panel">
          <div className="mx-auto w-full max-w-7xl px-6 py-8">
            <div
              className={cn(
                "grid gap-x-10 gap-y-8",
                sections.length > 2
                  ? "md:grid-cols-3"
                  : sections.length === 2
                    ? "md:grid-cols-2"
                    : "md:grid-cols-1",
              )}
            >
              {sections.map(([section, items]) => (
                <div key={section}>
                  {section ? (
                    <p className="eyebrow mb-3 border-b border-border pb-2">{section}</p>
                  ) : null}
                  <ul>
                    {items.map((item) => (
                      <li key={`${item.label}-${item.to}`}>
                        <Link
                          to={item.to}
                          {...(item.hash ? { hash: item.hash } : {})}
                          onClick={onClose}
                          className="flex min-h-11 flex-col justify-center rounded-sm px-3 py-2 transition-colors hover:bg-muted"
                        >
                          <span className="block text-sm font-bold">{item.label}</span>
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
      ) : null}
    </div>
  );
}

function MobileGroup({
  group,
  open,
  onToggle,
  onNavigate,
}: {
  group: NavGroup;
  open: boolean;
  onToggle: () => void;
  onNavigate: () => void;
}) {
  if (!group.items) {
    return (
      <li className="border-b border-primary-foreground/12">
        <Link
          to={group.to!}
          {...(group.hash ? { hash: group.hash } : {})}
          onClick={onNavigate}
          className="flex min-h-16 items-center px-5 text-lg"
        >
          {group.label}
        </Link>
      </li>
    );
  }

  return (
    <li className="border-b border-primary-foreground/12">
      <button
        type="button"
        aria-expanded={open}
        onClick={onToggle}
        className="flex min-h-16 w-full items-center justify-between gap-4 px-5 text-left text-lg"
      >
        {group.label}
        <ChevronDown
          className={cn(
            "size-5 shrink-0 text-primary-foreground/60 transition-transform",
            open && "rotate-180",
          )}
          strokeWidth={1.5}
          aria-hidden
        />
      </button>

      <div className="nav-collapse" data-open={open ? "true" : "false"}>
        <div className="overflow-hidden bg-primary-foreground/[0.06]">
          <div className="px-5 py-3">
            {groupSections(group.items).map(([section, items]) => (
              <div key={section} className="mb-4 last:mb-0">
                {section ? (
                  <p className="eyebrow mb-1 text-primary-foreground/60">{section}</p>
                ) : null}
                <ul>
                  {items.map((item: NavLink) => (
                    <li key={`${item.label}-${item.to}`}>
                      <Link
                        to={item.to}
                        {...(item.hash ? { hash: item.hash } : {})}
                        onClick={onNavigate}
                        tabIndex={open ? undefined : -1}
                        className="flex min-h-12 flex-col justify-center rounded-sm py-2 transition-colors hover:bg-primary-foreground/10"
                      >
                        <span className="text-sm font-bold">{item.label}</span>
                        {item.hint ? (
                          <span className="text-xs text-primary-foreground/60">{item.hint}</span>
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
      <Icon className="size-5" strokeWidth={1.5} aria-hidden />
    </Link>
  );
}

const extraGroup: NavGroup = {
  label: "Autoklass",
  items: [
    { label: "Mașini salvate și comparație", to: "/comparatie" },
    { label: "Autentificare", to: OUT },
    { label: "Coșul meu", to: OUT },
    { label: "Contact", to: OUT },
    { label: "Despre noi", to: OUT },
    { label: "Blog", to: OUT },
  ],
};

export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [desktopGroup, setDesktopGroup] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  // Varianta suprapusă (doar homepage): transparent peste hero, grafit după scroll.
  useEffect(() => {
    if (!overlay) return;
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [overlay]);

  // Escape închide mega-panelul de desktop.
  useEffect(() => {
    if (!desktopGroup) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDesktopGroup(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [desktopGroup]);

  useEffect(() => {
    if (!open) setOpenGroup(null);
  }, [open]);

  const heroState = overlay && !scrolled && !desktopGroup;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 text-primary-foreground transition-colors duration-300",
        heroState
          ? "header-overlay-scrim bg-transparent"
          : overlay
            ? "bg-primary/92 backdrop-blur"
            : "bg-primary",
      )}
    >
      {/* Desktop: un singur rând de 80px, mega-panel ancorat la header */}
      <div className="relative hidden lg:block">
        <div className="mx-auto flex h-20 w-full max-w-7xl items-center gap-3 px-4 xl:gap-6 xl:px-6">
          <Link
            to="/"
            className="flex min-h-11 shrink-0 items-center"
            aria-label="Autoklass — acasă"
          >
            <img src={logoUrl} alt="Autoklass" className="h-6 w-auto xl:h-8" />
          </Link>

          <nav className="flex min-w-0 flex-1 items-center" aria-label="Navigație principală">
            {navigation.map((group) => (
              <DesktopGroup
                key={group.label}
                group={group}
                open={desktopGroup === group.label}
                onOpen={() => setDesktopGroup(group.label)}
                onClose={() =>
                  setDesktopGroup((current) => (current === group.label ? null : current))
                }
              />
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-0.5">
            <ActionIcon to="/autoturisme" label="Caută în stoc" icon={Search} />
            <ActionIcon to="/comparatie" label="Mașini salvate" icon={Heart} />
            <span className="hidden xl:flex">
              <ActionIcon to={OUT} label="Autentificare" icon={User} />
            </span>
            <span className="hidden xl:flex">
              <ActionIcon to={OUT} label="Coșul meu" icon={ShoppingCart} />
            </span>
            <Button
              asChild
              variant={heroState ? "outline" : "secondary"}
              size="sm"
              className={cn(
                "press ml-1 px-3 xl:hidden",
                heroState &&
                  "border-primary-foreground/45 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground",
              )}
            >
              <Link to="/service/programare">Programare</Link>
            </Button>
            <Button
              asChild
              variant={heroState ? "outline" : "secondary"}
              className={cn(
                "press ml-3 hidden xl:inline-flex",
                heroState &&
                  "border-primary-foreground/45 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground",
              )}
            >
              <Link to="/service/programare">Programare service</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile: un singur nivel de 64px */}
      <div className="flex h-16 w-full items-center justify-between gap-3 px-4 lg:hidden">
        <Link to="/" className="flex min-h-11 items-center" aria-label="Autoklass — acasă">
          <img src={logoUrl} alt="Autoklass" className="h-7 w-auto" />
        </Link>

        <div className="flex items-center gap-1">
          <a
            href={contact.phoneHref}
            aria-label={`Sună la ${contact.phone}`}
            className="flex size-12 items-center justify-center rounded-sm text-primary-foreground"
          >
            <Phone className="size-5" strokeWidth={1.5} aria-hidden />
          </a>

          <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
            <DialogPrimitive.Trigger
              className="flex size-12 items-center justify-center rounded-sm text-primary-foreground"
              aria-label="Deschide meniul"
            >
              <Menu className="size-6" strokeWidth={1.5} aria-hidden />
            </DialogPrimitive.Trigger>

            <DialogPrimitive.Portal>
              <DialogPrimitive.Overlay className="fixed inset-0 z-[60] bg-primary/60 lg:hidden" />
              <DialogPrimitive.Content
                aria-label="Meniu"
                className="fixed inset-0 z-[70] flex flex-col bg-primary text-primary-foreground lg:hidden"
              >
                <DialogPrimitive.Title className="sr-only">Meniu Autoklass</DialogPrimitive.Title>
                <div className="pt-safe shrink-0 border-b border-primary-foreground/15">
                  <div className="flex h-16 items-center justify-between px-4">
                    <img src={logoUrl} alt="Autoklass" className="h-7 w-auto" />
                    <DialogPrimitive.Close
                      className="flex size-12 items-center justify-center rounded-sm text-primary-foreground"
                      aria-label="Închide meniul"
                    >
                      <X className="size-6" strokeWidth={1.5} aria-hidden />
                    </DialogPrimitive.Close>
                  </div>
                </div>

                <div className="pb-safe-lg flex-1 overflow-y-auto">
                  <div className="px-5">
                    <Link
                      to="/autoturisme"
                      onClick={() => setOpen(false)}
                      className="my-5 flex min-h-12 items-center gap-3 rounded-sm border border-primary-foreground/25 px-4 text-sm text-primary-foreground/80"
                    >
                      <Search className="size-5 shrink-0" strokeWidth={1.5} aria-hidden />
                      Caută în stoc: noi și rulate
                    </Link>
                  </div>

                  <ul className="border-t border-primary-foreground/12">
                    {[...navigation, extraGroup].map((group) => (
                      <MobileGroup
                        key={group.label}
                        group={group}
                        open={openGroup === group.label}
                        onToggle={() =>
                          setOpenGroup((current) => (current === group.label ? null : group.label))
                        }
                        onNavigate={() => setOpen(false)}
                      />
                    ))}
                  </ul>

                  <div className="mt-8 px-5">
                    <Link
                      to="/service/programare"
                      onClick={() => setOpen(false)}
                      className="press flex min-h-13 items-center justify-center rounded-sm bg-primary-foreground px-4 text-sm font-bold text-primary"
                    >
                      Programare service
                    </Link>
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      <a
                        href={contact.phoneHref}
                        onClick={() => setOpen(false)}
                        className="press flex min-h-12 items-center justify-center gap-2 rounded-sm border border-primary-foreground/25 text-sm"
                      >
                        <Phone className="size-5" strokeWidth={1.5} aria-hidden />
                        Sună
                      </a>
                      <a
                        href={contact.whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setOpen(false)}
                        className="press flex min-h-12 items-center justify-center gap-2 rounded-sm border border-primary-foreground/25 text-sm"
                      >
                        <MessageCircle className="size-5" strokeWidth={1.5} aria-hidden />
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
          </DialogPrimitive.Root>
        </div>
      </div>
    </header>
  );
}
