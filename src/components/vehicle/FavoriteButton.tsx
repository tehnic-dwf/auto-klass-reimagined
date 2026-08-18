import { Heart } from "lucide-react";

import { useFavorites } from "@/lib/favorites";
import { cn } from "@/lib/utils";

/**
 * Salvarea unei mașini reduce presiunea deciziei imediate: poți compara
 * liniștit mai târziu, fără cont și fără urgență artificială.
 */
export function FavoriteButton({
  slug,
  className,
  withLabel = false,
}: {
  slug: string;
  className?: string;
  withLabel?: boolean;
}) {
  const { has, toggle, ready } = useFavorites();
  const active = ready && has(slug);

  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={active ? "Scoate din lista salvată" : "Salvează pentru comparație"}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        toggle(slug);
      }}
      className={cn(
        "inline-flex items-center gap-2 rounded-sm border border-border bg-background/90 px-2 py-2 text-sm transition-colors hover:border-accent",
        active && "border-accent text-accent",
        className,
      )}
    >
      <Heart className={cn("size-4", active && "fill-current")} aria-hidden />
      {withLabel ? (active ? "Salvată" : "Salvează pentru comparație") : null}
    </button>
  );
}
