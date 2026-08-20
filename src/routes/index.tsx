import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  Car,
  ClipboardList,
  Clock,
  MapPin,
  Phone,
  ShieldCheck,
  Wrench,
} from "lucide-react";

import heroGrila from "@/assets/hero-grila.jpg";
import { MobileStickyBar } from "@/components/layout/MobileStickyBar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { VehicleCard } from "@/components/vehicle/VehicleCard";
import { BrandMark } from "@/components/brands/BrandMark";
import { Button } from "@/components/ui/button";
import { brandAuthorizations, branches, contact, stockFacts } from "@/data/company";
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
  },
  {
    icon: CalendarCheck,
    title: "Vreau programare service",
    body: "3 pași, fără telefon. Îți confirmăm ora în maximum 2 ore lucrătoare.",
    to: "/service/programare" as const,
  },
  {
    icon: ClipboardList,
    title: "Am avut un accident",
    body: "Deschidem dosarul de daună și îți rezervăm mașina de schimb.",
    to: "/service/dosar-daune" as const,
  },
  {
    icon: Wrench,
    title: "Am o problemă chiar acum",
    body: "Bec aprins sau zgomot suspect: sună direct, fără formular lung.",
    to: "/service/urgent" as const,
  },
  {
    icon: Car,
    title: "Vreau să vând mașina",
    body: "Evaluare cu interval de preț și ofertă scrisă, cu termen asumat.",
    to: "/buy-back" as const,
  },
  {
    icon: ShieldCheck,
    title: "Vreau să știu ce verificați",
    body: "Peste 100 de puncte de control și raportul pe care îl primești înainte.",
    to: "/verificare-masini-rulate" as const,
  },
];

const promises = [
  {
    icon: Clock,
    title: "Răspuns în maximum 2 ore lucrătoare",
    body: "Orice cerere trimisă prin site primește răspuns de la un consultant, cu nume și număr direct.",
  },
  {
    icon: BadgeCheck,
    title: "Prețul afișat este prețul discutat",
    body: "Fiecare mașină are prețul, regimul de TVA și sucursala. Fără „preț la cerere”.",
  },
  {
    icon: ShieldCheck,
    title: "Istoric verificat pe mașinile rulate",
    body: "Kilometraj verificat, istoric de service în rețeaua autorizată și garanție inclusă.",
  },
];

const processSteps = [
  {
    title: "Alegi mașina din stoc",
    body: "Filtrezi nou și rulat în aceeași listă, cu prețul final și sucursala vizibile.",
  },
  {
    title: "Vorbești cu un consultant",
    body: "Fără obligația de a cumpăra. Răspuns în maximum 2 ore lucrătoare.",
  },
  {
    title: "Test drive când îți convine",
    body: "Alegi ziua și sucursala. Traseul îl stabilești tu.",
  },
  {
    title: "Verifici documentele și oferta",
    body: "Pe rulate primești raportul de verificare. Prețul din ofertă e cel discutat.",
  },
  {
    title: "Preiei mașina",
    body: "Predare la sucursala aleasă, cu garanția și actele explicate punct cu punct.",
  },
];

const faq = [
  {
    q: "Prețul afișat este prețul final?",
    a: "Da. Prețul include regimul de TVA menționat pe fiecare mașină. Orice cost suplimentar îți este comunicat înainte să semnezi.",
  },
  {
    q: "Pot veni doar să văd mașina, fără să cumpăr?",
    a: "Da. Test drive-ul și discuția cu un consultant nu implică nicio obligație de cumpărare.",
  },
  {
    q: "Ce verificați la o mașină rulată?",
    a: "Kilometrajul, istoricul de service în rețeaua autorizată, structura și componentele de uzură. Raportul îl primești înainte de decizie.",
  },
  {
    q: "Cât durează o programare la service?",
    a: "Îți confirmăm ora în maximum 2 ore lucrătoare, iar la confirmare primești durata estimată și costul lucrării standard.",
  },
];

function HomePage() {
  const newCars = vehicles
    .filter((vehicle) => !vehicle.reserved && vehicle.condition === "nou")
    .slice(0, 3);
  const usedCars = vehicles
    .filter((vehicle) => !vehicle.reserved && vehicle.condition === "rulat")
    .slice(0, 3);
  const featured = [...newCars, ...usedCars];
  const cheapest = Math.min(...vehicles.map((vehicle) => vehicle.priceEur));

  const heroStats = [
    { value: formatPrice(stockFacts.totalMercedes), label: "În stoc" },
    { value: String(stockFacts.branchCount), label: "Sucursale" },
    { value: "2h", label: "Timp de răspuns" },
  ];

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <SiteHeader />

      <main>
        {/* 1. Hero editorial: imaginea respiră, textul stă jos, un singur overlay */}
        <section className="relative isolate overflow-hidden bg-primary text-primary-foreground">
          <img
            src={heroGrila}
            alt="Mercedes-Benz văzut frontal, cu grila și farurile aprinse"
            width={1920}
            height={1280}
            className="absolute inset-0 size-full object-cover object-[center_30%]"
          />
          <div className="hero-scrim absolute inset-0" aria-hidden />

          <div className="relative mx-auto flex min-h-[32rem] w-full max-w-7xl flex-col justify-end px-5 pb-12 pt-32 md:min-h-[42rem] md:px-6 md:pb-16 md:pt-40">
            <p className="eyebrow text-primary-foreground/80">
              Dealer autorizat Mercedes-Benz din 2001
            </p>
            <h1 className="mt-5 max-w-3xl text-4xl leading-[1.05] md:text-6xl">
              O mașină care se potrivește cui ai devenit.
            </h1>
            <p className="mt-6 max-w-xl text-base text-primary-foreground/85">
              {formatPrice(stockFacts.totalMercedes)} de Mercedes-Benz în stoc,{" "}
              {stockFacts.newMercedes} noi și {stockFacts.usedMercedes} rulate verificate, de la{" "}
              {formatPrice(cheapest)} €. Prețul e scris, termenul e asumat.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" variant="secondary">
                <Link to="/autoturisme">
                  Vezi stocul disponibil
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <Link to="/service/programare">Programare service</Link>
              </Button>
            </div>
          </div>

          <div className="relative border-t border-primary-foreground/15">
            <div className="mx-auto grid w-full max-w-7xl grid-cols-3 gap-x-6 px-5 py-8 md:px-6">
              {heroStats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-2xl leading-none md:text-3xl">{stat.value}</p>
                  <p className="mt-2 text-xs text-primary-foreground/65">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 2. O singură suprafață pentru toate intențiile și serviciile */}
        <section className="mx-auto w-full max-w-7xl px-5 py-20 md:px-6 md:py-28">
          <div className="max-w-2xl">
            <p className="eyebrow">Începe de aici</p>
            <h2 className="mt-4 text-3xl md:text-4xl">De ce ai venit azi?</h2>
          </div>

          <div className="mt-10 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {intents.map((intent) => (
              <Link
                key={intent.title}
                to={intent.to}
                className="group flex flex-col gap-3 bg-card p-8 transition-colors hover:bg-muted"
              >
                <intent.icon className="size-6 text-foreground" aria-hidden />
                <h3 className="text-lg leading-snug">{intent.title}</h3>
                <p className="text-sm text-muted-foreground">{intent.body}</p>
                <ArrowRight
                  className="mt-auto size-5 text-accent transition-transform group-hover:translate-x-1"
                  aria-hidden
                />
              </Link>
            ))}
          </div>

          <a
            href="#cum-functioneaza"
            id="cum-functioneaza-cta"
            className="mt-8 inline-flex min-h-12 items-center gap-2 text-sm font-bold text-accent"
          >
            Cum funcționează procesul, pas cu pas
            <ArrowRight className="size-4" aria-hidden />
          </a>
        </section>

        {/* 3. Selecție din stoc: 3 noi + 3 rulate */}
        <section className="border-y border-border bg-secondary py-20 md:py-28">
          <div className="mx-auto w-full max-w-7xl px-5 md:px-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <p className="eyebrow">Selecție din stoc</p>
                <h2 className="mt-4 text-3xl md:text-4xl">Noi și rulate, în aceeași listă</h2>
              </div>
              <Link
                to="/autoturisme"
                className="hidden min-h-11 shrink-0 items-center gap-2 text-sm font-bold text-accent md:inline-flex"
              >
                Toate mașinile
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((vehicle) => (
                <VehicleCard key={vehicle.slug} vehicle={vehicle} />
              ))}
            </div>

            <Button asChild variant="outline" className="mt-8 w-full md:hidden">
              <Link to="/autoturisme">Vezi toate mașinile</Link>
            </Button>
          </div>
        </section>

        {/* 4. Proces + ce garantăm, într-o singură secțiune */}
        <section
          id="cum-functioneaza"
          className="mx-auto w-full max-w-7xl scroll-mt-24 px-5 py-20 md:px-6 md:py-28"
        >
          <div className="max-w-2xl">
            <p className="eyebrow">Procesul</p>
            <h2 className="mt-4 text-3xl md:text-4xl">Cinci pași, fără etape ascunse</h2>
            <p className="mt-4 text-base text-muted-foreground">
              Poți opri oricând, la orice pas. Prețul final e comunicat înainte să începem orice
              lucrare.
            </p>
          </div>

          <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
            {processSteps.map((step, index) => (
              <li key={step.title} className="border-t-2 border-foreground pt-5">
                <p className="font-display text-2xl leading-none text-muted-foreground">
                  0{index + 1}
                </p>
                <h3 className="mt-4 text-lg leading-snug">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.body}</p>
              </li>
            ))}
          </ol>

          <div className="mt-16 grid gap-10 border-t border-border pt-12 md:grid-cols-3">
            {promises.map((promise) => (
              <div key={promise.title}>
                <promise.icon className="size-6 text-trust" aria-hidden />
                <h3 className="mt-4 text-lg leading-snug">{promise.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{promise.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Rețeaua: mărci reprezentate + sucursale */}
        <section
          id="sucursale"
          className="scroll-mt-24 border-t border-border bg-primary py-20 text-primary-foreground md:py-28"
        >
          <div className="mx-auto w-full max-w-7xl px-5 md:px-6">
            <div className="max-w-2xl">
              <p className="eyebrow text-primary-foreground/60">Rețeaua</p>
              <h2 className="mt-4 text-3xl md:text-4xl">
                {stockFacts.branchCount} sucursale, aceleași reguli
              </h2>
              <p className="mt-4 text-base text-primary-foreground/75">
                Alegi sucursala la test drive sau la programarea de service. Prețurile și termenele
                sunt identice în toată rețeaua.
              </p>
            </div>

            <ul className="mt-12 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
              {branches.map((branch) => (
                <li
                  key={branch.name}
                  className="flex gap-3 border-t border-primary-foreground/15 pt-5"
                >
                  <MapPin className="mt-1 size-5 shrink-0 text-primary-foreground/60" aria-hidden />
                  <div className="min-w-0">
                    <p className="text-base leading-snug">{branch.name}</p>
                    <p className="mt-1 text-xs text-primary-foreground/65">
                      {branch.address}
                      {branch.hasService ? " · service autorizat" : ""}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-16 border-t border-primary-foreground/15 pt-10">
              <p className="eyebrow text-primary-foreground/60">Mărci reprezentate oficial</p>
              <ul className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                {brandAuthorizations.map((brand) => (
                  <li key={brand.brand} className="flex items-center gap-5">
                    <span className="flex size-14 shrink-0 items-center justify-center rounded-sm bg-primary-foreground text-primary">
                      <BrandMark brand={brand.brand} className="h-8 w-auto" />
                    </span>
                    <div className="min-w-0">
                      <p className="font-display text-xl">{brand.brand}</p>
                      <p className="mt-1 text-xs text-primary-foreground/65">
                        {brand.stockCount} mașini în stoc
                        {brand.since ? ` · autorizat din ${brand.since}` : ""}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 6. Întrebări + închiderea conversației */}
        <section className="mx-auto w-full max-w-7xl px-5 py-20 md:px-6 md:py-28">
          <div className="grid gap-16 lg:grid-cols-[1fr_1fr]">
            <div>
              <p className="eyebrow">Înainte de prima vizită</p>
              <h2 className="mt-4 text-3xl md:text-4xl">Întrebări frecvente</h2>
              <dl className="mt-10 space-y-8">
                {faq.map((item) => (
                  <div key={item.q} className="border-t border-border pt-5">
                    <dt className="text-lg leading-snug">{item.q}</dt>
                    <dd className="mt-2 text-sm text-muted-foreground">{item.a}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="rounded-sm bg-secondary p-8 md:p-12 lg:sticky lg:top-28 lg:self-start">
              <h2 className="text-2xl md:text-3xl">Începe de la mașină sau de la o întrebare.</h2>
              <p className="mt-4 text-base text-muted-foreground">
                Răspundem în maximum 2 ore lucrătoare, cu nume și număr direct. Fără obligația de a
                cumpăra.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <Link to="/autoturisme">Vezi stocul disponibil</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href={contact.phoneHref}>
                    <Phone className="size-4" aria-hidden />
                    {contact.phone}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />

      <MobileStickyBar />
    </div>
  );
}
