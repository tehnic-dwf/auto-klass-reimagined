import { Link } from "@tanstack/react-router";
import { CalendarClock, MessageCircle, Phone } from "lucide-react";
import { useEffect, useState } from "react";

import { contact } from "@/data/company";
import { cn } from "@/lib/utils";

/**
 * Bară de micro-conversii pe mobil: sună, WhatsApp, programare service.
 * Apare doar după ce butonul „Cum funcționează procesul, pas cu pas”
 * (id-ul primit ca `triggerId`) a ieșit din viewport — nu de la început,
 * ca să nu acopere hero-ul.
 */
export function MobileStickyBar({
  triggerId = "cum-functioneaza-cta",
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
      // Vizibil doar după ce trigger-ul a ieșit din viewport în sus.
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

  return (
    <div
      aria-hidden={!visible}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 backdrop-blur transition-transform duration-300 md:hidden",
        visible ? "translate-y-0" : "pointer-events-none translate-y-full",
        className,
      )}
    >
      {visible ? (
        <div className="pb-safe grid grid-cols-3 gap-2 px-2 pt-2">
          <a
            href={contact.phoneHref}
            className="flex min-h-12 flex-col items-center justify-center gap-1 rounded-sm border border-border text-xs font-bold"
          >
            <Phone className="size-5" strokeWidth={1.5} aria-hidden />
            Sună
          </a>
          <a
            href={contact.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-12 flex-col items-center justify-center gap-1 rounded-sm border border-border text-xs font-bold"
          >
            <MessageCircle className="size-5" strokeWidth={1.5} aria-hidden />
            WhatsApp
          </a>
          <Link
            to="/service/programare"
            className="flex min-h-12 flex-col items-center justify-center gap-1 rounded-sm bg-primary text-xs font-bold text-primary-foreground"
          >
            <CalendarClock className="size-5" strokeWidth={1.5} aria-hidden />
            Programare
          </Link>
        </div>
      ) : null}
    </div>
  );
}
