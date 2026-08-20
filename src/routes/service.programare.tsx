import { createFileRoute } from "@tanstack/react-router";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Check,
  CircleDot,
  CircleHelp,
  Disc,
  Phone,
  Snowflake,
  Wrench,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import interiorAmbiental from "@/assets/interior-lumina-ambientala.jpg";
import { DemoNotice } from "@/components/DemoNotice";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
    icon: Wrench,
  },
  {
    id: "frane",
    title: "Frâne și suspensie",
    hint: "Plăcuțe, discuri, zgomote la rulare",
    estimate: "estimare după diagnoză",
    icon: Disc,
  },
  {
    id: "diagnoza",
    title: "Diagnoză electronică",
    hint: "Martor aprins, erori, senzori",
    estimate: "de la 350 lei",
    icon: Activity,
  },
  {
    id: "climatizare",
    title: "Climatizare",
    hint: "Încărcare freon, igienizare",
    estimate: "de la 450 lei",
    icon: Snowflake,
  },
  {
    id: "anvelope",
    title: "Anvelope și geometrie",
    hint: "Schimb sezonier, echilibrare",
    estimate: "de la 250 lei",
    icon: CircleDot,
  },
  {
    id: "altceva",
    title: "Altceva / nu știu exact",
    hint: "Descrii problema, o clarificăm noi la telefon",
    estimate: "stabilim împreună",
    icon: CircleHelp,
  },
] as const;

const timeSlots = ["08:00 – 10:00", "10:00 – 12:00", "12:00 – 14:00", "14:00 – 17:00"];

const stageLabels = ["Serviciu", "Locație", "Date de contact"];

const proofPoints = [
  "Confirmare telefonică în maximum 2 ore lucrătoare.",
  "Estimare de cost înainte de orice intervenție.",
  "Mașină de schimb la cerere, în limita flotei.",
];

const afterSubmit = [
  "Te sunăm în maximum 2 ore lucrătoare pentru confirmarea orei.",
  "Primești estimarea de cost înainte de orice intervenție.",
  "Îți trimitem SMS la preluare, la aprobarea devizului și la predare.",
];

const FORM_ID = "booking-form";

/** Panou editorial întunecat: promisiunea de service, fără colecții de iconițe. */
function EditorialPanel() {
  return (
    <aside className="relative isolate hidden overflow-hidden rounded-2xl bg-primary text-primary-foreground lg:block">
      <img
        src={interiorAmbiental}
        alt=""
        aria-hidden
        className="absolute inset-0 size-full object-cover opacity-45"
      />
      <div className="hero-copy-scrim absolute inset-0" aria-hidden />
      <div className="relative flex h-full flex-col justify-end p-10">
        <p className="eyebrow text-primary-foreground/70">
          Service autorizat Mercedes-Benz · {branches.length} locații
        </p>
        <p className="mt-5 font-display text-3xl leading-tight">
          Îți spunem ora, costul și termenul înainte să ne dai cheia.
        </p>
        <ul className="mt-8 space-y-4 border-t border-primary-foreground/20 pt-6">
          {proofPoints.map((point) => (
            <li key={point} className="flex gap-3 text-sm text-primary-foreground/85">
              <Check className="mt-0.5 size-5 shrink-0 text-primary-foreground" strokeWidth={2} />
              <span className="sr-only">Inclus:</span>
              {point}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

function MobileBanner() {
  return (
    <div className="relative isolate h-[150px] overflow-hidden rounded-2xl lg:hidden">
      <img
        src={interiorAmbiental}
        alt=""
        aria-hidden
        className="absolute inset-0 size-full object-cover"
      />
      <div className="hero-copy-scrim absolute inset-0" aria-hidden />
      <p className="relative flex h-full items-end p-5 font-display text-xl text-primary-foreground">
        Service autorizat, cu ora și costul confirmate înainte.
      </p>
    </div>
  );
}

function Stepper({ step }: { step: number }) {
  return (
    <ol className="flex gap-2" aria-label="Pașii programării">
      {stageLabels.map((label, index) => {
        const stage = index + 1;
        const complete = stage < step;
        const current = stage === step;
        return (
          <li key={label} className="min-w-0 flex-1">
            <div
              className={cn("h-1 rounded-sm", complete || current ? "bg-accent" : "bg-border")}
              aria-hidden
            />
            <p
              className={cn(
                "mt-2 flex items-center gap-1.5 text-xs",
                current ? "font-bold text-foreground" : "text-muted-foreground",
              )}
              {...(current ? { "aria-current": "step" as const } : {})}
            >
              {complete ? (
                <Check className="size-5 shrink-0 text-trust" strokeWidth={2} aria-hidden />
              ) : (
                <span className="tabular-nums">{stage}.</span>
              )}
              <span className="truncate">{label}</span>
              {complete ? <span className="sr-only">(finalizat)</span> : null}
            </p>
          </li>
        );
      })}
    </ol>
  );
}

function ServiceBookingPage() {
  const [step, setStep] = useState(1);
  const [service, setService] = useState<string | null>(null);
  const [branch, setBranch] = useState<string | null>(null);
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState<string | null>(null);
  const [replacementCar, setReplacementCar] = useState(false);
  const [done, setDone] = useState(false);
  const successRef = useRef<HTMLHeadingElement>(null);

  const selectedService = services.find((item) => item.id === service);

  useEffect(() => {
    if (done) successRef.current?.focus();
  }, [done]);

  if (done) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <main className="mx-auto w-full max-w-[1280px] px-5 py-10 md:px-6 md:py-14">
          <div className="grid gap-6 lg:grid-cols-[40%_1fr] lg:gap-10">
            <EditorialPanel />
            <div
              className="rounded-2xl border border-border bg-card p-6 shadow-panel md:p-10"
              role="status"
              aria-live="polite"
            >
              <Check className="size-12 text-trust md:size-14" strokeWidth={2} aria-hidden />
              <h1
                ref={successRef}
                tabIndex={-1}
                className="mt-4 text-2xl md:text-3xl focus-visible:outline-none"
              >
                Cererea de programare a fost trimisă
              </h1>
              <p className="mt-3 text-base text-muted-foreground">
                Un consilier service de la {branch} te sună pentru confirmarea orei în maximum 2 ore
                lucrătoare.
              </p>

              <dl className="mt-8 divide-y divide-border border-y border-border text-sm">
                <Row label="Ce facem" value={selectedService?.title ?? "-"} />
                <Row label="Unde" value={branch ?? "-"} />
                <Row
                  label="Când"
                  value={`${date || "dată de confirmat"} · ${slot ?? "interval de confirmat"}`}
                />
                <Row label="Mașină de schimb" value={replacementCar ? "Solicitată" : "Nu"} />
                <Row label="Estimare orientativă" value={selectedService?.estimate ?? "-"} />
              </dl>

              <p className="mt-6 text-sm text-muted-foreground">
                Primești SMS cu stadiul mașinii la preluare, la aprobarea devizului și la
                finalizare.
              </p>

              <Button asChild variant="outline" className="mt-8">
                <a href={contact.phoneHref}>
                  <Phone className="size-4" strokeWidth={2} aria-hidden />
                  Sună {contact.phone}
                </a>
              </Button>

              <DemoNotice className="mt-8 border-none bg-transparent p-0 text-xs text-muted-foreground" />
            </div>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const blocked = (step === 1 && !service) || (step === 2 && !branch);

  return (
    <div className="min-h-screen bg-background pb-40 md:pb-0">
      <SiteHeader />

      <main className="mx-auto w-full max-w-[1280px] px-5 py-8 md:px-6 md:py-14">
        <div className="grid gap-6 lg:grid-cols-[40%_1fr] lg:gap-10">
          <EditorialPanel />

          <div className="min-w-0">
            <MobileBanner />

            <div className="mt-6 rounded-2xl border border-border bg-card p-5 shadow-panel md:mt-0 md:p-10">
              <h1 className="text-balance text-2xl md:text-3xl">Programare service în 3 pași</h1>
              <p className="mt-3 max-w-[52ch] text-pretty text-base text-muted-foreground">
                Fără formulare lungi și fără telefoane pierdute. Îți confirmăm ora în maximum 2 ore
                lucrătoare.
              </p>

              <div className="mt-8">
                <Stepper step={step} />
              </div>

              {step === 1 ? (
                <section className="mt-8">
                  <h2 className="text-lg" id="service-legend">
                    Ce trebuie făcut la mașină?
                  </h2>
                  <div
                    role="radiogroup"
                    aria-labelledby="service-legend"
                    className="mt-5 grid gap-3 md:grid-cols-2"
                  >
                    {services.map((item) => {
                      const selected = service === item.id;
                      return (
                        <label
                          key={item.id}
                          className={cn(
                            "flex min-h-11 cursor-pointer flex-col gap-2 rounded-sm border p-4 transition-colors min-[480px]:flex-row min-[480px]:items-start min-[480px]:justify-between",
                            selected
                              ? "border-accent bg-accent/5"
                              : "border-border bg-card hover:border-accent/50",
                          )}
                        >
                          <input
                            type="radio"
                            name="service"
                            value={item.id}
                            checked={selected}
                            onChange={() => setService(item.id)}
                            className="sr-only"
                          />
                          <span className="min-w-0">
                            <span className="flex items-center gap-2 text-base font-bold">
                              <item.icon
                                className={cn(
                                  "size-5 shrink-0",
                                  selected ? "text-accent" : "text-muted-foreground",
                                )}
                                strokeWidth={1.5}
                                aria-hidden
                              />
                              <span className="min-w-0">{item.title}</span>
                              {selected ? (
                                <Check
                                  className="size-5 shrink-0 text-accent"
                                  strokeWidth={2}
                                  aria-hidden
                                />
                              ) : null}
                            </span>
                            <span className="mt-1 block text-sm text-muted-foreground">
                              {item.hint}
                            </span>
                          </span>
                          <span className="shrink-0 rounded-sm bg-secondary px-2 py-1 text-sm text-muted-foreground min-[480px]:ml-3">
                            {item.estimate}
                          </span>
                        </label>
                      );
                    })}
                  </div>

                  <p className="mt-5 text-sm text-muted-foreground">
                    Estimările sunt orientative. Costul final se confirmă după diagnoză și nu
                    începem lucrarea fără acordul tău.
                  </p>
                </section>
              ) : null}

              {step === 2 ? (
                <section className="mt-8">
                  <h2 className="text-lg">Unde și când?</h2>

                  <p className="mt-5 text-sm font-bold" id="branch-legend">
                    Sucursala
                  </p>
                  <div
                    role="radiogroup"
                    aria-labelledby="branch-legend"
                    className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
                  >
                    {branches.map((item) => {
                      const selected = branch === item.name;
                      return (
                        <label
                          key={item.name}
                          className={cn(
                            "flex min-h-11 cursor-pointer flex-col rounded-sm border p-4 transition-colors",
                            selected
                              ? "border-accent bg-accent/5"
                              : "border-border bg-card hover:border-accent/50",
                          )}
                        >
                          <input
                            type="radio"
                            name="branch"
                            value={item.name}
                            checked={selected}
                            onChange={() => setBranch(item.name)}
                            className="sr-only"
                          />
                          <span className="flex items-start gap-2 text-sm font-bold">
                            <span className="min-w-0">{item.name}</span>
                            {selected ? (
                              <Check
                                className="ml-auto size-5 shrink-0 text-accent"
                                strokeWidth={2}
                                aria-hidden
                              />
                            ) : null}
                          </span>
                          <span className="mt-1 text-sm text-muted-foreground">{item.address}</span>
                        </label>
                      );
                    })}
                  </div>

                  <div className="mt-8 grid gap-6 border-t border-border pt-6 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="booking-date">Data preferată</Label>
                      <Input
                        id="booking-date"
                        type="date"
                        className="mt-2"
                        value={date}
                        onChange={(event) => setDate(event.target.value)}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-bold" id="slot-legend">
                        Interval orar
                      </p>
                      <div
                        role="radiogroup"
                        aria-labelledby="slot-legend"
                        className="mt-2 grid grid-cols-2 gap-2"
                      >
                        {timeSlots.map((item) => {
                          const selected = slot === item;
                          return (
                            <label
                              key={item}
                              className={cn(
                                "flex min-h-11 cursor-pointer items-center justify-center gap-1.5 rounded-sm border px-2 text-sm transition-colors",
                                selected
                                  ? "border-accent bg-accent/5 font-bold"
                                  : "border-border bg-card hover:border-accent/50",
                              )}
                            >
                              <input
                                type="radio"
                                name="slot"
                                value={item}
                                checked={selected}
                                onChange={() => setSlot(item)}
                                className="sr-only"
                              />
                              {selected ? (
                                <Check
                                  className="size-5 shrink-0 text-accent"
                                  strokeWidth={2}
                                  aria-hidden
                                />
                              ) : null}
                              {item}
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <label
                    className={cn(
                      "mt-8 flex min-h-11 cursor-pointer items-start gap-3 rounded-sm border p-4 transition-colors",
                      replacementCar
                        ? "border-accent bg-accent/5"
                        : "border-border bg-card hover:border-accent/50",
                    )}
                  >
                    <input
                      type="checkbox"
                      checked={replacementCar}
                      onChange={() => setReplacementCar((value) => !value)}
                      className="mt-0.5 size-5 shrink-0 accent-[var(--color-accent)]"
                    />
                    <span>
                      <span className="block text-sm font-bold">Am nevoie de mașină de schimb</span>
                      <span className="block text-sm text-muted-foreground">
                        În limita disponibilității flotei; îți confirmăm la telefon.
                      </span>
                    </span>
                  </label>
                </section>
              ) : null}

              {step === 3 ? (
                <form
                  id={FORM_ID}
                  className="mt-8"
                  onSubmit={(event) => {
                    event.preventDefault();
                    setDone(true);
                  }}
                >
                  <h2 className="text-lg">Datele tale</h2>

                  <dl className="mt-5 divide-y divide-border border-y border-border text-sm">
                    <Row label="Serviciu" value={selectedService?.title ?? "-"} />
                    <Row label="Sucursala" value={branch ?? "-"} />
                    <Row
                      label="Când"
                      value={`${date || "dată de confirmat"} · ${slot ?? "interval de confirmat"}`}
                    />
                  </dl>

                  <div className="mt-6 space-y-5">
                    <div className="grid gap-5 md:grid-cols-2">
                      <div>
                        <Label htmlFor="booking-name">Nume</Label>
                        <Input id="booking-name" required autoComplete="name" className="mt-2" />
                      </div>
                      <div>
                        <Label htmlFor="booking-phone">Telefon</Label>
                        <Input
                          id="booking-phone"
                          type="tel"
                          inputMode="tel"
                          required
                          autoComplete="tel"
                          className="mt-2"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="booking-plate">Număr de înmatriculare sau model</Label>
                      <Input
                        id="booking-plate"
                        required
                        placeholder="B 123 ABC sau Clasa C 220 d"
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="booking-notes">Detalii (opțional)</Label>
                      <Textarea
                        id="booking-notes"
                        rows={3}
                        placeholder="Ex: se aprinde martorul de motor la rece"
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div className="mt-8 border-t border-border pt-6">
                    <p className="text-sm font-bold">Ce se întâmplă după ce trimiți</p>
                    <ol className="mt-3 space-y-3">
                      {afterSubmit.map((item, index) => (
                        <li key={item} className="flex gap-3 text-sm text-muted-foreground">
                          <span className="font-display text-base tabular-nums text-foreground">
                            {index + 1}
                          </span>
                          <span className="text-pretty">{item}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <Button type="submit" size="lg" className="mt-8 hidden w-full md:flex">
                    Trimite cererea de programare
                  </Button>
                </form>
              ) : null}

              <div className="mt-8 hidden items-center justify-between md:flex">
                <Button
                  variant="ghost"
                  disabled={step === 1}
                  onClick={() => setStep((value) => Math.max(1, value - 1))}
                >
                  <ArrowLeft className="size-4" strokeWidth={2} aria-hidden />
                  Pasul anterior
                </Button>
                {step < 3 ? (
                  <Button
                    disabled={blocked}
                    onClick={() => setStep((value) => Math.min(3, value + 1))}
                  >
                    Continuă
                    <ArrowRight className="size-4" strokeWidth={2} aria-hidden />
                  </Button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />

      {/* Bară fixă mobil: acțiunea principală mereu la degetul mare */}
      <div className="pb-safe fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 px-4 pt-3 backdrop-blur md:hidden">
        {step > 1 ? (
          <button
            type="button"
            className="mb-2 flex h-12 w-full items-center justify-center text-center text-sm text-muted-foreground"
            onClick={() => setStep((value) => Math.max(1, value - 1))}
          >
            <ArrowLeft className="mr-1 size-4" strokeWidth={2} aria-hidden />
            Înapoi la pasul {step - 1}
          </button>
        ) : null}
        {step < 3 ? (
          <Button
            className="h-13 w-full"
            size="lg"
            disabled={blocked}
            onClick={() => setStep((value) => Math.min(3, value + 1))}
          >
            Continuă
            <ArrowRight className="size-4" strokeWidth={2} aria-hidden />
          </Button>
        ) : (
          <Button type="submit" form={FORM_ID} className="h-13 w-full" size="lg">
            Trimite cererea de programare
          </Button>
        )}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 py-3">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right font-bold">{value}</dd>
    </div>
  );
}
