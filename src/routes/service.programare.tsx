import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  Car,
  Phone,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { useState } from "react";

import { DemoNotice } from "@/components/DemoNotice";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { branches, contact } from "@/data/company";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/service/programare")({
  head: () => ({
    meta: [
      { title: "Programare service Mercedes-Benz — confirmare în 2 ore | Autoklass" },
      {
        name: "description",
        content:
          "Programează-ți mașina la service în 3 pași, de pe telefon. Confirmăm ora în maximum 2 ore lucrătoare și îți spunem estimarea de cost înainte de intervenție.",
      },
      {
        property: "og:title",
        content: "Programare service Mercedes-Benz — confirmare în 2 ore | Autoklass",
      },
      {
        property: "og:description",
        content:
          "3 pași, fără telefon. Estimare de cost înainte de intervenție și mașină de schimb la cerere.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ServiceBookingPage,
});

const services = [
  {
    id: "revizie",
    title: "Revizie periodică",
    hint: "Schimb ulei, filtre, verificare completă",
    estimate: "de la 1.100 lei",
  },
  {
    id: "frane",
    title: "Frâne și suspensie",
    hint: "Plăcuțe, discuri, zgomote la rulare",
    estimate: "estimare după diagnoză",
  },
  {
    id: "diagnoza",
    title: "Diagnoză electronică",
    hint: "Martor aprins, erori, senzori",
    estimate: "de la 350 lei",
  },
  {
    id: "climatizare",
    title: "Climatizare",
    hint: "Încărcare freon, igienizare",
    estimate: "de la 450 lei",
  },
  {
    id: "anvelope",
    title: "Anvelope și geometrie",
    hint: "Schimb sezonier, echilibrare",
    estimate: "de la 250 lei",
  },
  {
    id: "altceva",
    title: "Altceva / nu știu exact",
    hint: "Descrii problema, o clarificăm noi la telefon",
    estimate: "stabilim împreună",
  },
] as const;

const timeSlots = ["08:00 – 10:00", "10:00 – 12:00", "12:00 – 14:00", "14:00 – 17:00"];

function ServiceBookingPage() {
  const [step, setStep] = useState(1);
  const [service, setService] = useState<string | null>(null);
  const [branch, setBranch] = useState<string | null>(null);
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState<string | null>(null);
  const [replacementCar, setReplacementCar] = useState(false);
  const [done, setDone] = useState(false);

  const selectedService = services.find((item) => item.id === service);

  if (done) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <main className="mx-auto w-full max-w-2xl px-4 py-12">
          <div className="rounded-sm border border-trust bg-trust/10 p-6">
            <Check className="size-8 text-trust" aria-hidden />
            <h1 className="mt-3 text-2xl">Cererea de programare a fost trimisă</h1>
            <p className="mt-2 text-muted-foreground">
              Un consilier service de la {branch} te sună pentru confirmarea orei în
              maximum 2 ore lucrătoare.
            </p>

            <dl className="mt-6 space-y-2 border-t border-trust/30 pt-4 text-sm">
              <Row label="Ce facem" value={selectedService?.title ?? "-"} />
              <Row label="Unde" value={branch ?? "-"} />
              <Row
                label="Când"
                value={`${date || "dată de confirmat"} · ${slot ?? "interval de confirmat"}`}
              />
              <Row
                label="Mașină de schimb"
                value={replacementCar ? "Solicitată" : "Nu"}
              />
              <Row label="Estimare orientativă" value={selectedService?.estimate ?? "-"} />
            </dl>

            <p className="mt-6 text-sm text-muted-foreground">
              Nu începem nicio lucrare peste estimarea confirmată de tine. Primești un SMS
              cu stadiul mașinii la preluare, la aprobarea devizului și la finalizare.
            </p>

            <Button asChild variant="outline" className="mt-6 rounded-sm">
              <a href={contact.phoneHref}>
                <Phone className="mr-1 size-4" aria-hidden />
                Sună {contact.phone}
              </a>
            </Button>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-28 md:pb-0">
      <SiteHeader />

      <main className="mx-auto w-full max-w-2xl px-4 py-8">
        <p className="eyebrow">Service autorizat · {branches.length} locații</p>
        <h1 className="mt-2 text-2xl md:text-3xl">Programare service în 3 pași</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Fără formulare lungi și fără telefoane pierdute. Îți confirmăm ora în maximum 2
          ore lucrătoare.
        </p>

        <div className="mt-5 flex items-center gap-3">
          <Progress value={(step / 3) * 100} className="h-1.5" />
          <span className="shrink-0 text-xs text-muted-foreground">Pasul {step} din 3</span>
        </div>

        {step === 1 ? (
          <section className="mt-6">
            <h2 className="text-lg">Ce trebuie făcut la mașină?</h2>
            <div className="mt-4 space-y-2">
              {services.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setService(item.id)}
                  className={cn(
                    "flex w-full items-start justify-between gap-3 rounded-sm border p-4 text-left transition-colors",
                    service === item.id
                      ? "border-accent bg-accent/5"
                      : "border-border bg-card hover:border-accent/50",
                  )}
                >
                  <span>
                    <span className="flex items-center gap-2 text-base font-bold">
                      <Wrench className="size-4 text-accent" aria-hidden />
                      {item.title}
                    </span>
                    <span className="mt-1 block text-sm text-muted-foreground">
                      {item.hint}
                    </span>
                  </span>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {item.estimate}
                  </span>
                </button>
              ))}
            </div>

            <p className="mt-4 flex gap-2 rounded-sm bg-secondary p-3 text-sm text-muted-foreground">
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-trust" aria-hidden />
              Estimările sunt orientative. Costul final se confirmă după diagnoză și nu
              începem lucrarea fără acordul tău.
            </p>
          </section>
        ) : null}

        {step === 2 ? (
          <section className="mt-6">
            <h2 className="text-lg">Unde și când?</h2>

            <Label className="mt-4 block text-sm font-bold">Sucursala</Label>
            <div className="mt-2 space-y-2">
              {branches.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setBranch(item.name)}
                  className={cn(
                    "flex w-full flex-col rounded-sm border p-3 text-left",
                    branch === item.name
                      ? "border-accent bg-accent/5"
                      : "border-border bg-card",
                  )}
                >
                  <span className="text-sm font-bold">{item.name}</span>
                  <span className="text-xs text-muted-foreground">{item.address}</span>
                </button>
              ))}
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="booking-date">Data preferată</Label>
                <Input
                  id="booking-date"
                  type="date"
                  className="mt-1 rounded-sm"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                />
              </div>
              <div>
                <Label className="block">Interval orar</Label>
                <div className="mt-1 grid grid-cols-2 gap-2">
                  {timeSlots.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setSlot(item)}
                      className={cn(
                        "rounded-sm border px-2 py-2 text-xs",
                        slot === item
                          ? "border-accent bg-accent/5 font-bold"
                          : "border-border bg-card",
                      )}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setReplacementCar((value) => !value)}
              className={cn(
                "mt-5 flex w-full items-start gap-3 rounded-sm border p-4 text-left",
                replacementCar ? "border-accent bg-accent/5" : "border-border bg-card",
              )}
            >
              <Car className="mt-0.5 size-4 text-accent" aria-hidden />
              <span>
                <span className="block text-sm font-bold">
                  Am nevoie de mașină de schimb
                </span>
                <span className="block text-sm text-muted-foreground">
                  În limita disponibilității flotei; îți confirmăm la telefon.
                </span>
              </span>
            </button>
          </section>
        ) : null}

        {step === 3 ? (
          <form
            className="mt-6"
            onSubmit={(event) => {
              event.preventDefault();
              setDone(true);
            }}
          >
            <h2 className="text-lg">Datele tale</h2>
            <div className="mt-4 space-y-3">
              <div>
                <Label htmlFor="booking-name">Nume</Label>
                <Input
                  id="booking-name"
                  required
                  autoComplete="name"
                  className="mt-1 rounded-sm"
                />
              </div>
              <div>
                <Label htmlFor="booking-phone">Telefon</Label>
                <Input
                  id="booking-phone"
                  type="tel"
                  inputMode="tel"
                  required
                  autoComplete="tel"
                  className="mt-1 rounded-sm"
                />
              </div>
              <div>
                <Label htmlFor="booking-plate">Număr de înmatriculare sau model</Label>
                <Input
                  id="booking-plate"
                  required
                  placeholder="B 123 ABC sau Clasa C 220 d"
                  className="mt-1 rounded-sm"
                />
              </div>
              <div>
                <Label htmlFor="booking-notes">Detalii (opțional)</Label>
                <Textarea
                  id="booking-notes"
                  rows={3}
                  placeholder="Ex: se aprinde martorul de motor la rece"
                  className="mt-1 rounded-sm"
                />
              </div>
            </div>

            <div className="mt-5 rounded-sm border border-border bg-secondary p-4 text-sm">
              <p className="flex items-center gap-2 font-bold">
                <Clock className="size-4 text-accent" aria-hidden />
                Ce se întâmplă după ce trimiți
              </p>
              <ol className="mt-2 list-decimal space-y-1 pl-5 text-muted-foreground">
                <li>Te sunăm în maximum 2 ore lucrătoare pentru confirmarea orei.</li>
                <li>Primești estimarea de cost înainte de orice intervenție.</li>
                <li>Îți trimitem SMS la preluare, la aprobarea devizului și la predare.</li>
              </ol>
            </div>

            <Button type="submit" size="lg" className="mt-5 hidden w-full rounded-sm md:flex">
              Trimite cererea de programare
            </Button>
          </form>
        ) : null}

        <div className="mt-6 hidden items-center justify-between md:flex">
          <Button
            variant="ghost"
            className="rounded-sm"
            disabled={step === 1}
            onClick={() => setStep((value) => Math.max(1, value - 1))}
          >
            <ArrowLeft className="mr-1 size-4" aria-hidden />
            Pasul anterior
          </Button>
          {step < 3 ? (
            <Button
              className="rounded-sm"
              disabled={(step === 1 && !service) || (step === 2 && !branch)}
              onClick={() => setStep((value) => Math.min(3, value + 1))}
            >
              Continuă
              <ArrowRight className="ml-1 size-4" aria-hidden />
            </Button>
          ) : null}
        </div>
      </main>

      <SiteFooter />

      {/* Bară fixă mobil: acțiunea principală mereu la degetul mare */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 backdrop-blur md:hidden">
        {step < 3 ? (
          <Button
            className="w-full rounded-sm"
            size="lg"
            disabled={(step === 1 && !service) || (step === 2 && !branch)}
            onClick={() => setStep((value) => Math.min(3, value + 1))}
          >
            Continuă
            <ArrowRight className="ml-1 size-4" aria-hidden />
          </Button>
        ) : (
          <Button className="w-full rounded-sm" size="lg" onClick={() => setDone(true)}>
            Trimite cererea de programare
          </Button>
        )}
        {step > 1 ? (
          <button
            type="button"
            className="mt-2 w-full text-center text-sm text-muted-foreground"
            onClick={() => setStep((value) => Math.max(1, value - 1))}
          >
            Înapoi la pasul {step - 1}
          </button>
        ) : null}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right font-bold">{value}</dd>
    </div>
  );
}
