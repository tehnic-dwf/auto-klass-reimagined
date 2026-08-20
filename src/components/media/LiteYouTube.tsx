import { Play } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Player „lite” local: înainte de click nu există niciun iframe în DOM.
 * După click se montează iframe-ul privacy-enhanced (youtube-nocookie).
 * Fără autoplay înainte de acțiunea explicită a utilizatorului.
 */
export function LiteYouTube({
  videoId,
  title,
  posterSrc,
  posterAlt,
  caption,
  playLabel,
  className,
}: {
  videoId: string;
  title: string;
  posterSrc: string;
  posterAlt: string;
  caption?: string;
  playLabel: string;
  className?: string;
}) {
  const [active, setActive] = useState(false);

  return (
    <div className={cn("overflow-hidden rounded-lg bg-primary", className)}>
      <div className="relative aspect-video w-full">
        {active ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 size-full border-0"
          />
        ) : (
          <>
            <img
              src={posterSrc}
              alt={posterAlt}
              loading="lazy"
              className="absolute inset-0 size-full object-cover"
            />
            <span className="hero-copy-scrim absolute inset-0" aria-hidden />
            <button
              type="button"
              onClick={() => setActive(true)}
              aria-label={playLabel}
              className="press absolute inset-0 flex items-end justify-start p-5 text-primary-foreground md:p-8"
            >
              <span className="flex items-center gap-4">
                <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary-foreground text-primary md:size-16">
                  <Play className="size-6 translate-x-px" strokeWidth={2} aria-hidden />
                </span>
                <span className="text-left">
                  <span className="block text-sm font-bold">{playLabel}</span>
                  {caption ? (
                    <span className="mt-1 block text-xs text-primary-foreground/80 tabular-nums">
                      {caption}
                    </span>
                  ) : null}
                </span>
              </span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
