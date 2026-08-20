import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

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
        <section className="bg-primary py-16 text-primary-foreground md:py-20">
          <div className="mx-auto w-full max-w-3xl px-5 md:px-6">
            <p className="eyebrow text-primary-foreground/60">Pagină out of scope</p>
            <h1 className="mt-4 text-3xl md:text-4xl">{title}</h1>
            <p className="mt-5 text-base text-primary-foreground/80">
              Acest flux este documentat, dar nu face parte din cele 6 ecrane prototipate în runda
              curentă. Navigația îl păstrează vizibil ca să vedem arhitectura completă a site-ului.
            </p>
          </div>
        </section>

        <section className="mx-auto w-full max-w-3xl px-5 py-16 md:px-6">
          <p className="eyebrow">Persona și tonul fluxului</p>
          <p className="mt-4 text-base text-muted-foreground">{persona}</p>

          <p className="eyebrow mt-12">Ce ar trebui să conțină</p>
          <ul className="mt-4 divide-y divide-border border-y border-border">
            {notes.map((note) => (
              <li key={note} className="py-5 text-sm text-muted-foreground">
                {note}
              </li>
            ))}
          </ul>

          <Button asChild variant="outline" className="mt-10">
            <Link to="/">
              <ArrowLeft className="size-4" aria-hidden />
              Înapoi la prima pagină
            </Link>
          </Button>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
