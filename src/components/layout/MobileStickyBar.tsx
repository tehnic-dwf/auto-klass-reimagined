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
    const target = document.getElementById(triggerId);
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        // Vizibil doar când trigger-ul a ieșit din viewport în sus.
        setVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      },
      { threshold: 0 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [triggerId]);

  return (
    <div
      aria-hidden={!visible}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur transition-transform duration-300 md:hidden",
        visible ? "translate-y-0" : "pointer-events-none translate-y-full",
        className,
      )}
    >
      <div className="ambient-line h-px w-full" aria-hidden />
      <div className="grid grid-cols-3 gap-2 p-2">
        <a
          href={contact.phoneHref}
          className="flex flex-col items-center gap-1 rounded-sm border border-border py-2 text-xs font-bold"
        >
          <Phone className="size-4 text-accent" aria-hidden />
          Sună
        </a>
        <a
          href={contact.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 rounded-sm border border-border py-2 text-xs font-bold"
        >
          <MessageCircle className="size-4 text-trust" aria-hidden />
          WhatsApp
        </a>
        <Link
          to="/service/programare"
          className="flex flex-col items-center gap-1 rounded-sm bg-primary py-2 text-xs font-bold text-primary-foreground"
        >
          <CalendarClock className="size-4" aria-hidden />
          Programare
        </Link>
      </div>
    </div>
  );
}
