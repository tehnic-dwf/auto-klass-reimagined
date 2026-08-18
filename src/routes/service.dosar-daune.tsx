import { createFileRoute } from "@tanstack/react-router";
import {
  Check,
  ClipboardCheck,
  Car,
  FileText,
  Phone,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { useState } from "react";

import { PhotoUpload } from "@/components/damage/PhotoUpload";
import { DemoNotice } from "@/components/DemoNotice";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { branches, contact, damageFaq, insurers } from "@/data/company";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/service/dosar-daune")({
  head: () => ({
    meta: [
      { title: "Dosar daună auto — constatare și mașină de schimb | Autoklass" },
      {
        name: "description",
        content:
          "Deschidem dosarul de daună în câteva ore, ne ocupăm de formalitățile cu asiguratorul și îți rezervăm mașina de schimb pe durata reparației.",
      },
      {
        property: "og:title",
        content: "Dosar daună auto — constatare și mașină de schimb | Autoklass",
      },
      {
        property: "og:description",
        content:
          "Groupama, Allianz-Țiriac, Omniasig, Asirom, Generali, UNIQA. Decontare directă și comunicare pe fiecare etapă.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DamageFilePage,
});

const steps = [
  {
    icon: Phone,
    title: "1. Ne spui ce s-a întâmplat",
    body: "Completezi formularul sau ne suni. Îți spunem exact ce documente pregătești.",
    duration: "5 minute",
  },
  {
    icon: ClipboardCheck,
    title: "2. Facem constatarea",
    body: "Programăm constatarea la sucursală și deschidem dosarul la asigurator.",
    duration: "în câteva ore",
  },
  {
    icon: Car,
    title: "3. Primești mașină de schimb",
    body: "Îți rezervăm o mașină pe durata reparației, în limita disponibilității flotei.",
    duration: "la preluarea mașinii",
  },
  {
    icon: Wrench,
    title: "4. Reparăm și te ținem la curent",
    body: "Primești actualizări la aprobarea dosarului, la comanda pieselor și la predare.",
    duration: "de regulă 3 zile – 2 săptămâni",
  },
];

const documents = [
  "Constatare amiabilă sau proces-verbal de la poliție",
  "Talon (certificat de înmatriculare)",
  "Permis de conducere",
  "Carte de identitate",
  "Polița RCA sau CASCO",
];

function DamageFilePage() {
  const [insurer, setInsurer] = useState<string | null>(null);
  const [branch, setBranch] = useState<string | null>(null);
  const [needsCar, setNeedsCar] = useState(true);
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-0">
      <SiteHeader />

      <main>
        <section className="bg-primary text-primary-foreground">
          <div className="mx-auto w-full max-w-4xl px-4 py-10 md:py-14">
            <p className="eyebrow text-primary-foreground/70">Dosar daună auto</p>
            <h1 className="mt-2 text-2xl md:text-4xl">
              Ai avut un accident? Ne ocupăm noi de dosar.
            </h1>
            <p className="mt-3 max-w-2xl text-primary-foreground/85">
              Deschidem dosarul de daună în câteva ore, comunicăm direct cu asiguratorul și
              îți rezervăm mașina de schimb. Tu nu alergi între birouri.
            </p>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <Button asChild size="lg" variant="secondary" className="rounded-sm">
                <a href="#formular-daune">Deschide dosarul online</a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-sm border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <a href={contact.phoneHref}>
                  <Phone className="mr-1 size-4" aria-hidden />
                  {contact.phone}
                </a>
              </Button>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-4xl px-4 py-10">
          <h2 className="text-xl md:text-2xl">Cum se desfășoară, pas cu pas</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {steps.map((step) => (
              <div
                key={step.title}
                className="rounded-sm border border-border bg-card p-5 shadow-card"
              >
                <step.icon className="size-5 text-accent" aria-hidden />
                <h3 className="mt-3 text-base">{step.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{step.body}</p>
                <p className="mt-2 text-xs font-bold text-trust">{step.duration}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-secondary py-10">
          <div className="mx-auto w-full max-w-4xl px-4">
            <h2 className="text-xl md:text-2xl">Ce documente pregătești</h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {documents.map((document) => (
                <li
                  key={document}
                  className="flex items-start gap-2 rounded-sm bg-card p-3 text-sm shadow-card"
                >
                  <FileText className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                  {document}
                </li>
              ))}
            </ul>
            <p className="mt-4 flex gap-2 text-sm text-muted-foreground">
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-trust" aria-hidden />
              Dauna se anunță în maximum 24–48 de ore de la incident, în funcție de
              asigurator. Dacă nu ai toate documentele, deschide oricum dosarul — te ghidăm
              noi.
            </p>
          </div>
        </section>

        <section id="formular-daune" className="mx-auto w-full max-w-2xl px-4 py-10">
          {sent ? (
            <div className="rounded-sm border border-trust bg-trust/10 p-6">
              <Check className="size-8 text-trust" aria-hidden />
              <h2 className="mt-3 text-2xl">Dosarul tău a intrat în lucru</h2>
              <p className="mt-2 text-muted-foreground">
                Un coordonator daune te contactează în maximum 2 ore lucrătoare pentru
                programarea constatării{needsCar ? " și confirmarea mașinii de schimb" : ""}
                .
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                Asigurator: <strong>{insurer ?? "de stabilit"}</strong> · Sucursală:{" "}
                <strong>{branch ?? "de stabilit"}</strong>
              </p>
              <DemoNotice className="mt-4 bg-card" />
              <Button asChild variant="outline" className="mt-5 rounded-sm">
                <a href={contact.phoneHref}>
                  <Phone className="mr-1 size-4" aria-hidden />
                  Sună {contact.phone}
                </a>
              </Button>
            </div>

          ) : (
            <form
              className="rounded-sm border border-border bg-card p-5 shadow-card"
              onSubmit={(event) => {
                event.preventDefault();
                setSent(true);
              }}
            >
              <h2 className="text-xl">Deschide dosarul de daună</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                4 câmpuri obligatorii. Restul detaliilor le clarificăm la telefon.
              </p>

              <div className="mt-5 space-y-3">
                <div>
                  <Label htmlFor="damage-name">Nume</Label>
                  <Input
                    id="damage-name"
                    required
                    autoComplete="name"
                    className="mt-1 rounded-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="damage-phone">Telefon</Label>
                  <Input
                    id="damage-phone"
                    type="tel"
                    inputMode="tel"
                    required
                    autoComplete="tel"
                    className="mt-1 rounded-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="damage-plate">Număr de înmatriculare</Label>
                  <Input
                    id="damage-plate"
                    required
                    placeholder="B 123 ABC"
                    className="mt-1 rounded-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="damage-details">Ce s-a întâmplat</Label>
                  <Textarea
                    id="damage-details"
                    rows={3}
                    required
                    placeholder="Ex: lovit în parcare, aripă dreapta față"
                    className="mt-1 rounded-sm"
                  />
                </div>
                <div>
                  <Label className="block text-sm font-bold">Poze cu avaria</Label>
                  <PhotoUpload />
                </div>
              </div>

              <DemoNotice className="mt-4" />


              <Label className="mt-5 block text-sm font-bold">Asigurator</Label>
              <div className="mt-2 flex flex-wrap gap-2">
                {insurers.map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setInsurer(item.name)}
                    className={cn(
                      "rounded-sm border px-3 py-2 text-sm",
                      insurer === item.name
                        ? "border-accent bg-accent/5 font-bold"
                        : "border-border",
                    )}
                  >
                    {item.name}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setInsurer("Alt asigurator")}
                  className={cn(
                    "rounded-sm border px-3 py-2 text-sm",
                    insurer === "Alt asigurator"
                      ? "border-accent bg-accent/5 font-bold"
                      : "border-border",
                  )}
                >
                  Altul / nu știu
                </button>
              </div>
              {insurer && insurer !== "Alt asigurator" ? (
                <p className="mt-2 text-sm text-muted-foreground">
                  {insurers.find((item) => item.name === insurer)?.detail}
                </p>
              ) : null}

              <Label className="mt-5 block text-sm font-bold">
                Unde vrei să faci constatarea
              </Label>
              <div className="mt-2 flex flex-wrap gap-2">
                {branches.map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setBranch(item.name)}
                    className={cn(
                      "rounded-sm border px-3 py-2 text-sm",
                      branch === item.name
                        ? "border-accent bg-accent/5 font-bold"
                        : "border-border",
                    )}
                  >
                    {item.name.replace("Autoklass ", "")}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setNeedsCar((value) => !value)}
                className={cn(
                  "mt-5 flex w-full items-start gap-3 rounded-sm border p-4 text-left",
                  needsCar ? "border-accent bg-accent/5" : "border-border",
                )}
              >
                <Car className="mt-0.5 size-4 text-accent" aria-hidden />
                <span>
                  <span className="block text-sm font-bold">
                    Rezervă-mi mașină de schimb
                  </span>
                  <span className="block text-sm text-muted-foreground">
                    În limita disponibilității flotei, conform condițiilor asiguratorului.
                  </span>
                </span>
              </button>

              <Button type="submit" size="lg" className="mt-5 w-full rounded-sm">
                Trimite dosarul
              </Button>
              <p className="mt-2 text-center text-xs text-muted-foreground">
                Te contactăm în maximum 2 ore lucrătoare.
              </p>
            </form>
          )}
        </section>

        <section className="border-t border-border bg-card py-10">
          <div className="mx-auto w-full max-w-3xl px-4">
            <h2 className="text-xl md:text-2xl">Întrebări frecvente</h2>
            <Accordion type="single" collapsible className="mt-4">
              {damageFaq.map((item, index) => (
                <AccordionItem key={item.q} value={`faq-${index}`}>
                  <AccordionTrigger className="text-left">{item.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>

      <SiteFooter />

      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-border bg-background/95 p-3 backdrop-blur md:hidden">
        <Button asChild variant="outline" className="rounded-sm">
          <a href={contact.phoneHref}>
            <Phone className="mr-1 size-4" aria-hidden />
            Sună
          </a>
        </Button>
        <Button asChild className="rounded-sm">
          <a href="#formular-daune">Deschide dosarul</a>
        </Button>
      </div>
    </div>
  );
}
