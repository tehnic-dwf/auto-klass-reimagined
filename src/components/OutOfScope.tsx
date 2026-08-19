import { Link } from "@tanstack/react-router";
import { ArrowLeft, Construction } from "lucide-react";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Button } from "@/components/ui/button";

type OutOfScopeProps = {
  title: string;
  persona: string;
  notes: string[];
};

export function OutOfScope({ title, persona, notes }: OutOfScopeProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="bg-primary py-12 text-primary-foreground md:py-16">
          <div className="mx-auto w-full max-w-3xl px-4">
            <span className="inline-flex items-center gap-2 rounded-sm border border-primary-foreground/25 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground/80">
              <Construction className="size-3.5" aria-hidden />
              Pagină out of scope
            </span>
            <h1 className="mt-4 text-3xl md:text-4xl">{title}</h1>
            <p className="mt-3 text-sm leading-relaxed text-primary-foreground/80">
              Acest flux este documentat, dar nu face parte din cele 6 ecrane
              prototipate în runda curentă. Navigația îl păstrează vizibil ca să
              vedem arhitectura completă a site-ului.
            </p>
          </div>
        </section>

        <section className="mx-auto w-full max-w-3xl px-4 py-12">
          <h2 className="rule-accent text-xl">Persona și tonul fluxului</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{persona}</p>

          <h2 className="rule-accent mt-10 text-xl">Ce ar trebui să conțină</h2>
          <ul className="mt-4 space-y-2.5">
            {notes.map((note) => (
              <li
                key={note}
                className="rounded-sm border border-border bg-card p-4 text-sm leading-relaxed text-muted-foreground shadow-card"
              >
                {note}
              </li>
            ))}
          </ul>

          <Button asChild variant="outline" className="mt-8">
            <Link to="/">
              <ArrowLeft className="size-4" aria-hidden />
              Înapoi la prima pagină
            </Link>
          </Button>
        </section>
      </main>
      <SiteFooter minimal />
    </div>
  );
}
