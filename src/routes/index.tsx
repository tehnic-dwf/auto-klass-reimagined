import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  Car,
  ClipboardList,
  Clock,
  Phone,
  ShieldCheck,
} from "lucide-react";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { VehicleCard } from "@/components/vehicle/VehicleCard";
import { Button } from "@/components/ui/button";
import { brandAuthorizations, contact, stockFacts } from "@/data/company";
import { formatPrice, vehicles } from "@/data/vehicles";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Autoklass — Mercedes-Benz noi și rulate, service cu termen clar",
      },
      {
        name: "description",
        content:
          "Stoc Mercedes-Benz nou și rulat cu prețuri afișate, programare service confirmată în 2 ore și dosar daună gestionat integral. 9 sucursale în România.",
      },
      {
        property: "og:title",
        content: "Autoklass — Mercedes-Benz noi și rulate, service cu termen clar",
      },
      {
        property: "og:description",
        content:
          "Prețuri afișate, termene asumate, mașină de schimb pe durata reparației. Dealer autorizat Mercedes-Benz din 2001.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const intents = [
  {
    icon: Car,
    title: "Vreau o mașină",
    body: "Stoc unificat, nou și rulat, cu prețul final vizibil pe fiecare mașină.",
    to: "/autoturisme" as const,
    cta: "Vezi stocul",
  },
  {
    icon: CalendarCheck,
    title: "Vreau programare service",
    body: "3 pași, fără telefon. Îți confirmăm ora în maximum 2 ore lucrătoare.",
    to: "/service/programare" as const,
    cta: "Programează-te",
  },
  {
    icon: ClipboardList,
    title: "Am avut un accident",
    body: "Deschidem dosarul de daună și îți rezervăm mașina de schimb.",
    to: "/service/dosar-daune" as const,
    cta: "Deschide dosar",
  },
];

const promises = [
  {
    icon: Clock,
    title: "Răspuns în maximum 2 ore lucrătoare",
    body: "Orice cerere trimisă prin site primește un răspuns de la un consultant, cu nume și număr de telefon.",
  },
  {
    icon: BadgeCheck,
    title: "Prețul afișat este prețul discutat",
    body: "Fiecare mașină are prețul, regimul de TVA și sucursala unde se află. Fără „preț la cerere”.",
  },
  {
    icon: ShieldCheck,
    title: "Istoric verificat pe mașinile rulate",
    body: "Kilometraj verificat, istoric de service în rețeaua autorizată și garanție inclusă.",
  },
];

function HomePage() {
  const featured = vehicles.filter((vehicle) => !vehicle.reserved).slice(0, 6);
  const heroVehicle = vehicles.find((vehicle) => vehicle.bodyType === "Sedan");
  const cheapest = Math.min(...vehicles.map((vehicle) => vehicle.priceEur));


  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <SiteHeader />

      <main>
        <section className="relative overflow-hidden bg-primary text-primary-foreground">
          <img
            src={heroVehicle?.image}
            alt="Mercedes-Benz Clasa E în stocul Autoklass"
            className="absolute inset-0 size-full object-cover opacity-35"
          />
          <div className="relative mx-auto w-full max-w-6xl px-4 py-14 md:py-24">
            <p className="eyebrow text-primary-foreground/70">
              Dealer autorizat Mercedes-Benz din 2001
            </p>
            <h1 className="mt-3 max-w-2xl text-3xl leading-tight md:text-5xl">
              {formatPrice(stockFacts.totalMercedes)} de mașini Mercedes-Benz, cu prețul
              și termenul scrise negru pe alb.
            </h1>
            <p className="mt-4 max-w-xl text-primary-foreground/85">
              {stockFacts.newMercedes} mașini noi și {stockFacts.usedMercedes} rulate
              verificate, de la {formatPrice(cheapest)} €. Alege online, te contactăm în
              maximum 2 ore lucrătoare.
            </p>

            <div className="mt-7 flex flex-col gap-2 sm:flex-row">
              <Button asChild size="lg" variant="secondary" className="rounded-sm">
                <Link to="/autoturisme">
                  Vezi stocul disponibil
                  <ArrowRight className="ml-1 size-4" aria-hidden />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-sm border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <Link to="/service/programare">Programare service</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 py-10">
          <h2 className="text-xl md:text-2xl">De ce ai venit azi?</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {intents.map((intent) => (
              <Link
                key={intent.title}
                to={intent.to}
                className="flex flex-col rounded-sm border border-border bg-card p-5 shadow-card transition-colors hover:border-accent"
              >
                <intent.icon className="size-6 text-accent" aria-hidden />
                <h3 className="mt-3 text-lg">{intent.title}</h3>
                <p className="mt-1 flex-1 text-sm text-muted-foreground">{intent.body}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-accent">
                  {intent.cta}
                  <ArrowRight className="size-4" aria-hidden />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="bg-secondary py-10">
          <div className="mx-auto w-full max-w-6xl px-4">
            <h2 className="text-xl md:text-2xl">Ce îți garantăm în scris</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {promises.map((promise) => (
                <div key={promise.title} className="rounded-sm bg-card p-5 shadow-card">
                  <promise.icon className="size-5 text-trust" aria-hidden />
                  <h3 className="mt-3 text-base">{promise.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{promise.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 py-10">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-xl md:text-2xl">Selecție din stoc</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Noi și rulate în aceeași listă, exact cum le compari în realitate.
              </p>
            </div>
            <Link
              to="/autoturisme"
              className="hidden shrink-0 items-center gap-1 text-sm font-bold text-accent md:inline-flex"
            >
              Toate mașinile
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((vehicle) => (
              <VehicleCard key={vehicle.slug} vehicle={vehicle} />
            ))}
          </div>

          <Button asChild variant="outline" className="mt-6 w-full rounded-sm md:hidden">
            <Link to="/autoturisme">Vezi toate mașinile</Link>
          </Button>
        </section>

        <section className="border-y border-border bg-card py-10">
          <div className="mx-auto w-full max-w-6xl px-4">
            <h2 className="text-xl md:text-2xl">Mărci reprezentate oficial</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {brandAuthorizations.map((brand) => (
                <div
                  key={brand.brand}
                  className="rounded-sm border border-border p-4 text-sm"
                >
                  <p className="font-display text-lg">{brand.brand}</p>
                  <p className="text-muted-foreground">
                    {brand.since
                      ? `Autorizat din ${brand.since}`
                      : "Reprezentanță autorizată"}
                  </p>
                  <p className="mt-1 text-muted-foreground">{brand.note}</p>
                </div>
              ))}
            </div>
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
          <Link to="/service/programare">Programare service</Link>
        </Button>
      </div>
    </div>
  );
}
