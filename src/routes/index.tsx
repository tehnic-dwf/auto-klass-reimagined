import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  Car,
  ClipboardList,
  Clock,
  KeyRound,
  MapPin,
  MessageSquare,
  Phone,
  Search,
  ShieldCheck,
  Wrench,
} from "lucide-react";

import heroGrila from "@/assets/hero-grila.jpg";
import interiorAmbiental from "@/assets/interior-lumina-ambientala.jpg";
import { AmbientPalette } from "@/components/ambient/AmbientPalette";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { VehicleCard } from "@/components/vehicle/VehicleCard";
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

const processSteps = [
  {
    icon: Search,
    title: "Alegi mașina din stoc",
    body: "Filtrezi nou și rulat în aceeași listă. Fiecare mașină are prețul final, regimul de TVA și sucursala unde se află.",
  },
  {
    icon: MessageSquare,
    title: "Vorbești cu un consultant",
    body: "Fără obligația de a cumpăra. Primești răspuns în maximum 2 ore lucrătoare, cu nume și număr direct.",
  },
  {
    icon: Car,
    title: "Test drive când îți convine",
    body: "Alegi ziua și sucursala. Mașina te așteaptă pregătită, iar traseul îl stabilești tu.",
  },
  {
    icon: ClipboardList,
    title: "Verifici documentele și oferta",
    body: "Pe rulate primești raportul de verificare tehnică. Prețul din ofertă e cel discutat, fără costuri apărute la final.",
  },
  {
    icon: KeyRound,
    title: "Preiei mașina",
    body: "Predare la sucursala aleasă, cu garanția, actele și pachetul de service explicate punct cu punct.",
  },
];

const afterSales = [
  {
    icon: CalendarCheck,
    title: "Programare service în 3 pași",
    body: "Alegi tipul de lucrare, sucursala și intervalul. Confirmarea vine în maximum 2 ore lucrătoare.",
    to: "/service/programare" as const,
    cta: "Programează o revizie sau reparație",
  },
  {
    icon: Wrench,
    title: "Ai avut un accident?",
    body: "Deschidem dosarul de daună, comunicăm direct cu asigurătorul și îți rezervăm mașina de schimb.",
    to: "/service/dosar-daune" as const,
    cta: "Deschide un dosar de daună",
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
  const featured = vehicles.filter((vehicle) => !vehicle.reserved).slice(0, 6);
  const cheapest = Math.min(...vehicles.map((vehicle) => vehicle.priceEur));

  const heroStats = [
    { value: formatPrice(stockFacts.newMercedes), label: "Mercedes-Benz noi" },
    { value: formatPrice(stockFacts.usedMercedes), label: "Rulate verificate" },
    { value: "9", label: "Sucursale" },
    { value: "2h", label: "Timp de răspuns" },
  ];

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <SiteHeader />

      <main>
        {/* Hero: fața mașinii, frontal, cu grila în centru — semnalul citit instinctiv */}
        <section className="relative isolate overflow-hidden bg-primary text-primary-foreground">
          <img
            src={heroGrila}
            alt="Mercedes-Benz văzut frontal, cu grila și farurile aprinse"
            width={1920}
            height={1280}
            className="absolute inset-0 size-full object-cover object-[center_28%] md:object-[center_34%]"
          />
          <div className="hero-veil absolute inset-0" aria-hidden />
          <div
            className="ambient-bloom pointer-events-none absolute inset-0 mix-blend-screen"
            aria-hidden
          />
          <div className="hero-copy-scrim pointer-events-none absolute inset-0" aria-hidden />

          <div className="relative mx-auto flex min-h-[34rem] w-full max-w-6xl flex-col items-center px-4 pb-12 pt-20 text-center md:min-h-[44rem] md:pb-16 md:pt-28">
            <p className="eyebrow text-primary-foreground/85">
              Dealer autorizat Mercedes-Benz din 2001
            </p>
            <h1 className="hero-text-shadow mt-4 max-w-3xl text-[2.2rem] leading-[1.03] tracking-tight md:text-6xl">
              O mașină care se potrivește
              <span className="block text-primary-foreground/75">cui ai devenit.</span>
            </h1>
            <div className="ambient-line mt-7 w-56 max-w-full md:w-80" aria-hidden />
            <p className="hero-text-shadow mt-6 max-w-lg text-sm leading-relaxed text-primary-foreground/95 md:text-base">
              {formatPrice(stockFacts.totalMercedes)} de Mercedes-Benz în stoc,{" "}
              {stockFacts.newMercedes} noi și {stockFacts.usedMercedes} rulate verificate,
              de la {formatPrice(cheapest)} €. Prețul e scris, termenul e asumat.
            </p>


            <div className="mt-auto flex w-full flex-col gap-2 pt-12 sm:w-auto sm:flex-row">
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

          <div className="relative border-t border-primary-foreground/15">
            <div className="mx-auto grid w-full max-w-6xl grid-cols-2 px-4 md:grid-cols-4">
              {heroStats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`py-4 md:py-5 ${
                    index % 2 === 1 ? "border-l border-primary-foreground/15 pl-4" : ""
                  } md:border-l md:border-primary-foreground/15 md:pl-6 ${
                    index === 0 ? "md:border-l-0 md:pl-0" : ""
                  }`}
                >
                  <p className="font-display text-2xl leading-none md:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[0.7rem] uppercase tracking-[0.14em] text-primary-foreground/60">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bandă deschisă, contrastantă: al doilea CTA, pentru cine nu e încă decis */}
        <section className="border-y border-border bg-secondary">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-7 md:flex-row md:items-center md:justify-between md:py-8">
            <div>
              <p className="eyebrow text-muted-foreground">Nu ești încă decis</p>
              <p className="mt-2 max-w-xl text-base leading-snug text-foreground md:text-lg">
                Vezi exact cum funcționează procesul, pas cu pas — de la prima
                întrebare până la predarea cheii.
              </p>
            </div>
            <Button asChild size="lg" variant="outline" className="shrink-0 rounded-sm">
              <a href="#cum-functioneaza">
                Cum funcționează procesul, pas cu pas
                <ArrowRight className="ml-1 size-4" aria-hidden />
              </a>
            </Button>
          </div>
        </section>


        {/* Lumina ambientală — senzație, nu specificație */}
        <section className="relative isolate overflow-hidden bg-primary text-primary-foreground">
          <div className="mx-auto grid w-full max-w-6xl items-stretch gap-0 md:grid-cols-2">
            <div className="relative min-h-[16rem] overflow-hidden md:min-h-[26rem]">
              <img
                src={interiorAmbiental}
                alt="Interior Mercedes-Benz noaptea, cu lumina ambientală aprinsă"
                loading="lazy"
                width={1600}
                height={1200}
                className="size-full object-cover"
              />
              <div
                className="ambient-bloom pointer-events-none absolute inset-0 mix-blend-screen"
                aria-hidden
              />
            </div>
            <div className="ambient-edge flex flex-col justify-center p-6 md:p-10">
              <p className="eyebrow text-primary-foreground/60">Interior, după apus</p>
              <h2 className="mt-3 text-2xl leading-tight md:text-4xl">
                Alege lumina.
                <span className="block text-primary-foreground/55">
                  Restul site-ului se schimbă cu ea.
                </span>
              </h2>
              <div className="ambient-line mt-5 w-44" aria-hidden />
              <p className="mt-5 text-sm leading-relaxed text-primary-foreground/75 md:text-base">
                Nu scriem „64 de culori” într-o listă de dotări. Apasă una și o vezi
                aprinsă peste tot, exact cum se aprinde habitaclul seara: un spațiu care
                e al tău înainte să pornești motorul.
              </p>
              <AmbientPalette className="mt-6" />
              <Link
                to="/autoturisme"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-primary-foreground"
              >
                Vezi mașinile cu interiorul care te așteaptă
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </div>
        </section>


        <section className="mx-auto w-full max-w-6xl px-4 py-12 md:py-16">
          <h2 className="rule-accent text-2xl md:text-3xl">De ce ai venit azi?</h2>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {intents.map((intent, index) => (
              <Link
                key={intent.title}
                to={intent.to}
                className="group relative flex flex-col overflow-hidden rounded-sm border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-lift"
              >
                <span className="absolute right-5 top-5 font-display text-4xl leading-none text-border transition-colors group-hover:text-accent/25">
                  0{index + 1}
                </span>
                <span className="flex size-11 items-center justify-center rounded-sm bg-primary text-primary-foreground transition-colors group-hover:bg-accent">
                  <intent.icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-4 text-lg">{intent.title}</h3>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {intent.body}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-accent">
                  {intent.cta}
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-1"
                    aria-hidden
                  />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="bg-primary py-12 text-primary-foreground md:py-16">
          <div className="mx-auto w-full max-w-6xl px-4">
            <h2 className="rule-accent text-2xl md:text-3xl">Ce îți garantăm în scris</h2>
            <div className="mt-6 grid gap-px overflow-hidden rounded-sm bg-primary-foreground/15 md:grid-cols-3">
              {promises.map((promise) => (
                <div key={promise.title} className="bg-primary p-6">
                  <promise.icon className="size-6 text-trust" aria-hidden />
                  <h3 className="mt-4 text-base leading-snug">{promise.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-primary-foreground/70">
                    {promise.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 py-12 md:py-16">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="rule-accent text-2xl md:text-3xl">Selecție din stoc</h2>
              <p className="mt-2 text-sm text-muted-foreground">
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

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((vehicle) => (
              <VehicleCard key={vehicle.slug} vehicle={vehicle} />
            ))}
          </div>

          <Button asChild variant="outline" className="mt-6 w-full rounded-sm md:hidden">
            <Link to="/autoturisme">Vezi toate mașinile</Link>
          </Button>
        </section>

        {/* Ținta CTA-ului secundar din hero */}
        <section
          id="cum-functioneaza"
          className="scroll-mt-24 border-t border-border bg-secondary py-12 md:py-16"
        >
          <div className="mx-auto w-full max-w-6xl px-4">
            <h2 className="rule-accent text-2xl md:text-3xl">
              Cum funcționează procesul, pas cu pas
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
              Cinci pași, fără presiune și fără etape ascunse. Poți opri oricând, la
              orice pas.
            </p>
            <ol className="mt-8 grid gap-3 md:grid-cols-5">
              {processSteps.map((step, index) => (
                <li
                  key={step.title}
                  className="relative flex flex-col rounded-sm border-t-2 border-accent bg-card p-5 shadow-card"
                >
                  <span className="font-display text-3xl leading-none text-border">
                    0{index + 1}
                  </span>
                  <step.icon className="mt-4 size-5 text-accent" aria-hidden />
                  <h3 className="mt-3 text-base leading-snug">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-sm font-bold text-foreground">
              Prețul final, comunicat înainte să începem orice lucrare.
            </p>
          </div>
        </section>

        {/* După vânzare */}
        <section className="mx-auto w-full max-w-6xl px-4 py-12 md:py-16">
          <h2 className="rule-accent text-2xl md:text-3xl">Ce urmează după cumpărare</h2>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {afterSales.map((item) => (
              <Link
                key={item.title}
                to={item.to}
                className="group flex flex-col rounded-sm border border-border bg-primary p-6 text-primary-foreground shadow-card transition-all hover:-translate-y-0.5 hover:shadow-lift"
              >
                <item.icon className="size-6 text-trust" aria-hidden />
                <h3 className="mt-4 text-lg leading-snug">{item.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-primary-foreground/70">
                  {item.body}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold">
                  {item.cta}
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-1"
                    aria-hidden
                  />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="border-t border-border bg-secondary py-12 md:py-16">
          <div className="mx-auto w-full max-w-6xl px-4">
            <h2 className="rule-accent text-2xl md:text-3xl">Mărci reprezentate oficial</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {brandAuthorizations.map((brand) => (
                <div
                  key={brand.brand}
                  className="rounded-sm border-l-2 border-accent bg-card p-5 text-sm shadow-card"
                >
                  <p className="font-display text-xl">{brand.brand}</p>
                  <p className="mt-1 font-bold text-accent">
                    {brand.stockCount} mașini în stoc
                  </p>
                  <p className="mt-0.5 text-muted-foreground">
                    {brand.since
                      ? `Autorizat din ${brand.since}`
                      : "Reprezentanță autorizată"}
                  </p>
                  <p className="mt-1.5 text-muted-foreground">{brand.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Rețeaua de sucursale */}
        <section className="mx-auto w-full max-w-6xl px-4 py-12 md:py-16">
          <h2 className="rule-accent text-2xl md:text-3xl">
            {stockFacts.branchCount} sucursale, aceleași reguli
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
            Alegi sucursala la test drive sau la programarea de service. Prețurile și
            termenele sunt identice în toată rețeaua.
          </p>
          <div className="mt-6 grid gap-px overflow-hidden rounded-sm bg-border sm:grid-cols-2 lg:grid-cols-3">
            {branches.map((branch) => (
              <div key={branch.name} className="bg-card p-5">
                <div className="flex items-start gap-2">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                  <div>
                    <p className="text-base leading-snug">{branch.name}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{branch.address}</p>
                    {branch.hasService ? (
                      <p className="mt-1.5 text-xs font-bold uppercase tracking-[0.12em] text-trust">
                        Service autorizat
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Întrebări puse înainte de prima vizită */}
        <section className="border-t border-border bg-secondary py-12 md:py-16">
          <div className="mx-auto w-full max-w-4xl px-4">
            <h2 className="rule-accent text-2xl md:text-3xl">
              Întrebări puse înainte de prima vizită
            </h2>
            <dl className="mt-6 divide-y divide-border rounded-sm border border-border bg-card">
              {faq.map((item) => (
                <div key={item.q} className="p-5">
                  <dt className="text-base leading-snug">{item.q}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.a}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Închidere: alegerea de intenție, din nou */}
        <section className="bg-primary py-12 text-primary-foreground md:py-16">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-6 px-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl leading-tight md:text-3xl">
                Începe de la mașină sau de la o întrebare.
              </h2>
              <div className="ambient-line mt-4 w-40" aria-hidden />
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-primary-foreground/70 md:text-base">
                Răspundem în maximum 2 ore lucrătoare, cu nume și număr direct. Fără
                obligația de a cumpăra.
              </p>
            </div>
            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
              <Button asChild size="lg" variant="secondary" className="rounded-sm">
                <Link to="/autoturisme">Vezi stocul disponibil</Link>
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
