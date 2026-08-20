import { Link, createFileRoute } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import { useState } from "react";

import detaliuGrila from "@/assets/detaliu-grila.jpg";
import heroGrila from "@/assets/hero-grila.jpg";
import { BrandMark } from "@/components/brands/BrandMark";
import { MobileStickyBar } from "@/components/layout/MobileStickyBar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { LiteYouTube } from "@/components/media/LiteYouTube";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { VehicleCard } from "@/components/vehicle/VehicleCard";
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
    title: "Îmi aleg următoarea mașină",
    body: "Modele noi și rulate verificate, cu prețul final afișat.",
    action: "Vezi stocul",
    to: "/autoturisme" as const,
  },
  {
    title: "Programez o vizită la service",
    body: "Aleg serviciul, sucursala și intervalul în 3 pași.",
    action: "Programează",
    to: "/service/programare" as const,
  },
  {
    title: "Rezolv un dosar de daună",
    body: "Constatare, reparație și mașină de schimb, într-un singur loc.",
    action: "Deschide dosarul",
    to: "/service/dosar-daune" as const,
  },
  {
    title: "Am nevoie de ajutor acum",
    body: "Pentru martori aprinși, zgomote sau probleme urgente.",
    action: "Sună service",
    to: "/service/urgent" as const,
  },
  {
    title: "Cer o ofertă pentru mașina mea",
    body: "Evaluare clară și ofertă scrisă, cu termen asumat.",
    action: "Cere evaluare",
    to: "/buy-back" as const,
  },
  {
    title: "Văd cum verificați mașinile rulate",
    body: "Peste 100 de puncte de control și raport înainte de decizie.",
    action: "Vezi verificările",
    to: "/verificare-masini-rulate" as const,
  },
];

const promises = [
  {
    title: "Răspuns în maximum 2 ore lucrătoare",
    body: "Orice cerere trimisă prin site primește răspuns de la un consultant, cu nume și număr direct.",
  },
  {
    title: "Prețul afișat este prețul discutat",
    body: "Fiecare mașină are prețul, regimul de TVA și sucursala. Fără „preț la cerere”.",
  },
  {
    title: "Istoric verificat pe mașinile rulate",
    body: "Kilometraj verificat, istoric de service în rețeaua autorizată și garanție inclusă.",
  },
];

const processSteps = [
  {
    title: "Alegi mașina din stoc",
    body: "Nou și rulat în aceeași listă, cu prețul final și sucursala vizibile.",
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

function FaqList() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mt-8 border-t border-border">
      {faq.map((item, index) => {
        const expanded = open === index;
        return (
          <div key={item.q} className="border-b border-border">
            <h3>
              <button
                type="button"
                aria-expanded={expanded}
                aria-controls={`faq-panel-${index}`}
                id={`faq-trigger-${index}`}
                onClick={() => setOpen(expanded ? null : index)}
                className="flex min-h-14 w-full items-center justify-between gap-4 py-4 text-left text-lg"
              >
                {item.q}
                <span
                  aria-hidden
                  className="shrink-0 font-sans text-xl leading-none text-muted-foreground"
                >
                  {expanded ? "–" : "+"}
                </span>
              </button>
            </h3>
            <div
              className="nav-collapse"
              data-open={expanded ? "true" : "false"}
              id={`faq-panel-${index}`}
              role="region"
              aria-labelledby={`faq-trigger-${index}`}
            >
              <p className="overflow-hidden pb-5 text-sm text-muted-foreground">{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function HomePage() {
  const newCars = vehicles
    .filter((vehicle) => !vehicle.reserved && vehicle.condition === "nou")
    .slice(0, 3);
  const usedCars = vehicles
    .filter((vehicle) => !vehicle.reserved && vehicle.condition === "rulat")
    .slice(0, 3);
  const featured = [...newCars, ...usedCars];

  const heroStats = [
    { value: formatPrice(stockFacts.totalMercedes), label: "În stoc" },
    { value: String(stockFacts.branchCount), label: "Sucursale" },
    { value: "2h", label: "Timp de răspuns" },
  ];

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-0">
      <SiteHeader overlay />

      <main>
        {/* 1. Hero cinematic */}
        <section
          id="acasa-hero"
          className="relative isolate -mt-16 overflow-hidden bg-primary text-primary-foreground lg:-mt-20"
        >
          <img
            src={heroGrila}
            alt="Mercedes-Benz văzut frontal, cu grila și farurile aprinse"
            width={1920}
            height={1280}
            className="hero-media absolute inset-0 size-full object-cover object-[64%_36%] lg:object-[center_34%]"
          />
          <div className="hero-copy-scrim absolute inset-0" aria-hidden />

          <div className="relative mx-auto flex min-h-[92svh] w-full max-w-7xl flex-col justify-end px-5 pb-14 pt-28 md:px-6 md:pb-16 md:pt-32">
            <p
              className="eyebrow hero-rise text-primary-foreground/85"
              style={{ animationDelay: "80ms" }}
            >
              Dealer autorizat Mercedes-Benz din 2001
            </p>
            <h1
              className="hero-rise mt-5 text-balance font-display"
              style={{
                animationDelay: "180ms",
                fontSize: "clamp(3.25rem, 6.6vw, 7rem)",
                lineHeight: 0.96,
                maxWidth: "16ch",
              }}
            >
              Găsește-l. Condu-l. Apoi decide.
            </h1>
            <p
              className="hero-rise mt-6 text-pretty text-base text-primary-foreground/85"
              style={{ animationDelay: "270ms", maxWidth: "46ch" }}
            >
              Mercedes-Benz noi și rulate, cu prețul final și sucursala afișate de la început.
            </p>

            <div
              className="hero-rise mt-9 flex flex-col gap-3 sm:flex-row"
              style={{ animationDelay: "360ms" }}
            >
              <Button asChild size="lg" variant="secondary" className="press">
                <Link to="/autoturisme">Vezi mașinile disponibile</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="press border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <Link to="/service/programare">Programează service</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Rail de dovezi */}
        <section aria-label="Autoklass în cifre" className="border-b border-border bg-background">
          <dl className="mx-auto grid w-full max-w-7xl grid-cols-3 gap-x-6 px-5 py-7 md:px-6 md:py-8">
            {heroStats.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <dt className="order-2 mt-1 text-xs text-muted-foreground">{stat.label}</dt>
                <dd className="order-1 font-display text-2xl leading-none tabular-nums md:text-4xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* 2. Intenții */}
        <section className="mx-auto w-full max-w-7xl px-5 py-14 md:px-6 md:py-24">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Începe de aici</p>
            <h2 className="mt-3 text-3xl md:text-4xl">Cu ce vrei să începem?</h2>
          </Reveal>

          <div className="mt-8 border-t border-border md:mt-10">
            {intents.map((intent, index) => (
              <Reveal key={intent.title} delay={Math.min(index, 4) * 80}>
                <Link
                  to={intent.to}
                  className="group grid grid-cols-1 items-baseline gap-x-8 gap-y-2 border-b border-border py-6 transition-colors hover:bg-muted/60 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)_auto] md:py-7"
                >
                  <h3 className="text-xl leading-snug md:text-2xl">{intent.title}</h3>
                  <p className="text-pretty text-sm text-muted-foreground">{intent.body}</p>
                  <span className="text-sm font-bold text-accent md:text-right">
                    {intent.action}
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        {/* 3. Selecție din stoc */}
        <section className="border-y border-border bg-secondary py-14 md:py-24">
          <div className="mx-auto w-full max-w-7xl px-5 md:px-6">
            <Reveal className="max-w-3xl">
              <p className="eyebrow">Disponibile acum</p>
              <h2 className="mt-3 text-3xl md:text-4xl">
                Mașini pe care le poți vedea și conduce.
              </h2>
              <p className="mt-4 text-base text-muted-foreground">
                Modele noi și rulate verificate, cu prețul final, regimul TVA și sucursala afișate de
                la început.
              </p>
            </Reveal>

            {/* Mobil: rail nativ cu scroll-snap. Desktop: grilă pe 3 coloane. */}
            <div className="snap-rail -mx-5 mt-8 gap-4 px-5 pb-2 md:mx-0 md:mt-10 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 lg:grid-cols-3">
              {featured.map((vehicle) => (
                <div key={vehicle.slug} className="snap-card w-[86vw] max-w-sm md:w-auto md:max-w-none">
                  <VehicleCard vehicle={vehicle} />
                </div>
              ))}
            </div>

            <Button asChild variant="outline" className="press mt-8 w-full md:w-auto">
              <Link to="/autoturisme">Vezi toate mașinile disponibile</Link>
            </Button>
          </div>
        </section>

        {/* 4. Film de prezentare */}
        <section className="mx-auto w-full max-w-7xl px-5 py-14 md:px-6 md:py-24">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-16">
            <Reveal>
              <p className="eyebrow">Test drive</p>
              <h2 className="mt-3 text-3xl md:text-4xl">O mașină se alege la volan.</h2>
              <p className="mt-4 text-base text-muted-foreground">
                Vezi filmul, apoi alege modelul pe care vrei să-l conduci. Test drive-ul nu te
                obligă să cumperi.
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                Confirmare în maximum 2 ore lucrătoare.
              </p>
              <Button asChild size="lg" className="press mt-7 w-full sm:w-auto">
                <Link to="/autoturisme">Alege mașina pentru test drive</Link>
              </Button>
            </Reveal>

            <Reveal delay={80}>
              <LiteYouTube
                videoId="q3q-DQcUegk"
                title="Autoklass Sibiu - Centru Autorizat Mercedes-Benz si Honda"
                posterSrc={detaliuGrila}
                posterAlt="Imagine de prezentare: detaliu de grilă și stea Mercedes-Benz"
                caption="Autoklass Sibiu · 1:02"
                playLabel="Vezi reprezentanța Autoklass Sibiu"
              />
            </Reveal>
          </div>
        </section>

        {/* 5. Proces + promisiuni */}
        <section
          id="cum-functioneaza"
          className="border-t border-border bg-secondary py-14 md:py-24"
        >
          <div className="mx-auto w-full max-w-7xl scroll-mt-24 px-5 md:px-6">
            <Reveal className="max-w-2xl">
              <p className="eyebrow">Procesul</p>
              <h2 className="mt-3 text-3xl md:text-4xl">De la alegere la cheie, în 5 pași.</h2>
              <p className="mt-4 text-base text-muted-foreground">
                Poți opri oricând, la orice pas. Prețul final e comunicat înainte să începem orice
                lucrare.
              </p>
            </Reveal>

            <ol className="mt-8 border-t border-border md:mt-10">
              {processSteps.map((step, index) => (
                <Reveal key={step.title} as="li" delay={Math.min(index, 4) * 80}>
                  <div className="grid grid-cols-[2.5rem_minmax(0,1fr)] items-baseline gap-x-4 gap-y-1 border-b border-border py-5 md:grid-cols-[4rem_minmax(0,18rem)_minmax(0,1fr)] md:gap-x-8">
                    <p className="font-display text-xl leading-none tabular-nums text-muted-foreground md:text-2xl">
                      0{index + 1}
                    </p>
                    <h3 className="text-lg leading-snug md:text-xl">{step.title}</h3>
                    <p className="col-start-2 text-sm text-muted-foreground md:col-start-3">
                      {step.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ol>

            <div className="mt-12 grid gap-8 border-t border-border pt-10 md:grid-cols-3 md:gap-10">
              {promises.map((promise, index) => (
                <Reveal key={promise.title} delay={index * 80}>
                  <h3 className="text-lg leading-snug">{promise.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{promise.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Rețeaua */}
        <section
          id="sucursale"
          className="scroll-mt-24 border-t border-border bg-primary py-14 text-primary-foreground md:py-24"
        >
          <div className="mx-auto w-full max-w-7xl px-5 md:px-6">
            <Reveal className="max-w-2xl">
              <p className="eyebrow text-primary-foreground/65">Rețeaua</p>
              <h2 className="mt-3 text-3xl md:text-4xl">
                Găsește cea mai apropiată sucursală.
              </h2>
              <p className="mt-4 text-base text-primary-foreground/80">
                Alegi sucursala la test drive sau la programarea de service. Toate cele{" "}
                {stockFacts.branchCount} au service autorizat.
              </p>
            </Reveal>

            <ul className="snap-rail -mx-5 mt-8 gap-4 px-5 pb-2 md:mx-0 md:mt-10 md:grid md:grid-cols-2 md:gap-x-10 md:gap-y-6 md:overflow-visible md:px-0 lg:grid-cols-3">
              {branches.map((branch) => (
                <li
                  key={branch.name}
                  className="snap-card w-[76vw] max-w-xs border-t border-primary-foreground/20 pt-4 md:w-auto md:max-w-none"
                >
                  <p className="text-base leading-snug">{branch.name}</p>
                  <p className="mt-1 text-xs text-primary-foreground/70">
                    {branch.address}
                    {branch.hasService ? " · service autorizat" : ""}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-12 border-t border-primary-foreground/20 pt-8">
              <p className="eyebrow text-primary-foreground/65">Mărci reprezentate oficial</p>
              <ul className="mt-6 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
                {brandAuthorizations.map((brand) => (
                  <li key={brand.brand} className="flex items-center gap-4">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-sm bg-primary-foreground text-primary">
                      <BrandMark brand={brand.brand} className="h-7 w-auto" />
                    </span>
                    <div className="min-w-0">
                      <p className="font-display text-xl">{brand.brand}</p>
                      <p className="mt-0.5 text-xs text-primary-foreground/70">
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

        {/* 7. Întrebări + închidere */}
        <section className="mx-auto w-full max-w-7xl px-5 py-14 md:px-6 md:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <p className="eyebrow">Înainte de prima vizită</p>
              <h2 className="mt-3 text-3xl md:text-4xl">Întrebări frecvente</h2>
              <FaqList />
            </Reveal>

            <Reveal delay={80} className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-lg bg-secondary p-7 md:p-10">
                <h2 className="text-2xl md:text-3xl">Începe de la mașină sau de la o întrebare.</h2>
                <p className="mt-4 text-base text-muted-foreground">
                  Răspundem în maximum 2 ore lucrătoare, cu nume și număr direct. Fără obligația de a
                  cumpăra.
                </p>
                <Button asChild size="lg" className="press mt-7 w-full sm:w-auto">
                  <Link to="/autoturisme">Vezi mașinile disponibile</Link>
                </Button>
                <a
                  href={contact.phoneHref}
                  className="mt-4 flex min-h-11 items-center gap-2 text-sm font-bold text-foreground"
                >
                  <Phone className="size-5" strokeWidth={1.5} aria-hidden />
                  {contact.phone}
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter />

      <MobileStickyBar />
    </div>
  );
}
