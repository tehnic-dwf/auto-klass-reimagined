import { Info } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Prototipul e demonstrativ: formularele nu trimit nimic nicăieri.
 * Marcăm asta explicit ca nimeni să nu creadă că a depus o cerere reală.
 */
export function DemoNotice({ className }: { className?: string }) {
  return (
    <p
      className={cn(
        "flex gap-3 rounded-sm border border-border bg-secondary p-4 text-xs text-muted-foreground",
        className,
      )}
    >
      <Info className="mt-0.5 size-4 shrink-0" aria-hidden />

      <span>
        <strong>Prototip demonstrativ.</strong> Este o simulare de interfață: datele completate
        rămân în browserul tău și nu ajung la Autoklass. Pentru o solicitare reală, folosește
        telefonul afișat.
      </span>
    </p>
  );
}
