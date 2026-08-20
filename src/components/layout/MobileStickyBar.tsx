import { Link } from "@tanstack/react-router";
import { MessageCircle, Phone } from "lucide-react";
import { useEffect, useState } from "react";

import { contact } from "@/data/company";
import { cn } from "@/lib/utils";

/**
 * Dock flotant de acțiuni rapide pe mobil: sună, WhatsApp, programare service.
 * Apare doar după ce hero-ul a ieșit din viewport, ca să nu acopere povestea
 * de sus. Inset pe toate laturile, cu safe-area iOS.
 */
export function MobileStickyBar({
  triggerId = "acasa-hero",
  className,
}: {
  triggerId?: string;
  className?: string;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      const target = document.getElementById(triggerId);
      if (!target) {
        setVisible(false);
        return;
      }
      setVisible(target.getBoundingClientRect().bottom < 0);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [triggerId]);

  if (!visible) return null;

  return (
    <nav
      aria-label="Acțiuni rapide"
      className={cn("bottom-safe fixed inset-x-3 z-40 md:hidden", className)}
    >
      <div className="flex items-center gap-1.5 rounded-lg border border-border bg-card/95 p-1.5 shadow-panel backdrop-blur min-[360px]:gap-2 min-[360px]:p-2">
        <a
          href={contact.phoneHref}
          aria-label={`Sună la ${contact.phone}`}
          className="press flex size-11 shrink-0 items-center justify-center rounded-sm border border-border text-foreground min-[360px]:size-12"
        >
          <Phone className="size-5" strokeWidth={1.5} aria-hidden />
        </a>
        <a
          href={contact.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Scrie pe WhatsApp"
          className="press flex size-11 shrink-0 items-center justify-center rounded-sm border border-border text-foreground min-[360px]:size-12"
        >
          <MessageCircle className="size-5" strokeWidth={1.5} aria-hidden />
        </a>
        <Link
          to="/service/programare"
          aria-label="Programare service"
          className="press flex h-13 min-h-13 flex-1 items-center justify-center whitespace-nowrap rounded-sm bg-primary px-3 text-sm font-bold text-primary-foreground min-[360px]:px-4"
        >
          <span className="min-[360px]:hidden">Service</span>
          <span className="hidden min-[360px]:inline">Programare service</span>
        </Link>
      </div>

    </nav>
  );
}
