import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  BadgeCheck,
  CalendarClock,
  Check,
  Fuel,
  Gauge,
  MapPin,
  Phone,
  Settings2,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { useState } from "react";

import detaliuGrila from "@/assets/detaliu-grila.jpg";
import heroGrila from "@/assets/hero-grila.jpg";
import { AmbientPalette } from "@/components/ambient/AmbientPalette";
import interiorAmbiental from "@/assets/interior-lumina-ambientala.jpg";
import { DemoNotice } from "@/components/DemoNotice";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { FavoriteButton } from "@/components/vehicle/FavoriteButton";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contact } from "@/data/company";
import {
  formatKm,
  formatPrice,
  gallerySize,
  getVehicle,
  vehicles,
  type Vehicle,
} from "@/data/vehicles";

export const Route = createFileRoute("/autoturisme/$slug")({
  loader: ({ params }) => {
    const vehicle = getVehicle(params.slug);
    if (!vehicle) throw notFound();
    return { vehicle };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Mașină indisponibilă — Autoklass" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { vehicle } = loaderData;
    const title = `${vehicle.title} — ${formatPrice(vehicle.priceEur)} € | Autoklass`;
    const description = `${vehicle.title}, ${vehicle.powerHp} CP, ${
      vehicle.km === null ? "nou" : formatKm(vehicle.km)
    }, disponibil la ${vehicle.branch}. Test drive sau discuție cu un consultant, răspuns în maximum 2 ore.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "product" },
        { property: "og:image", content: gallerySize(vehicle.image) },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: gallerySize(vehicle.image) },
      ],
    };
  },
  component: VehicleDetailPage,
});

type ActionMode = "test-drive" | "consultant";

/**
 * Galerie ordonată după impactul emoțional documentat: fața mașinii (grila) prima,
 * lumina ambientală imediat după — nu la finalul specificațiilor.
 */
function VehicleGallery({ vehicle }: { vehicle: Vehicle }) {
  const shots = [
    {
      src: heroGrila,
      alt: `${vehicle.title} văzut frontal, cu grila și farurile aprinse`,
      label: "Față",
      caption: "Grila și privirea farurilor — prima impresie, cea care rămâne.",
      ambient: false,
    },
    {
      src: interiorAmbiental,
      alt: `Interior ${vehicle.title} noaptea, cu lumina ambientală aprinsă`,
      label: "Lumină ambientală",
      caption: "Lumină care transformă fiecare drum de seară într-o experiență.",
      ambient: true,
    },
    {
      src: gallerySize(vehicle.image),
      alt: vehicle.title,
      label: "Exterior",
      caption: `${vehicle.title}, exact mașina din stocul de la ${vehicle.branch}.`,
      ambient: false,
    },
    {
      src: detaliuGrila,
      alt: "Detaliu grilă și stea Mercedes-Benz",
      label: "Detaliu",
      caption: "Cromul grilei și steaua, în lumină rece.",
      ambient: false,
    },
  ];

  const [active, setActive] = useState(0);
  const shot = shots[active]!;

  return (
    <div>
      <div className="relative isolate overflow-hidden rounded-sm border border-border bg-primary">
        <img src={shot.src} alt={shot.alt} className="aspect-[4/3] w-full object-cover" />
        {shot.ambient ? (
          <div
            className="ambient-bloom pointer-events-none absolute inset-0 mix-blend-screen"
            aria-hidden
          />
        ) : null}
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{shot.caption}</p>

      {shot.ambient ? (
        <div className="mt-3 rounded-sm bg-primary p-3 text-primary-foreground">
          <p className="eyebrow text-primary-foreground/60">
            Lumină ambientală — 64 de culori
          </p>
          <AmbientPalette compact className="mt-2" />
        </div>
      ) : null}

      <div className="mt-3 grid grid-cols-4 gap-2">
        {shots.map((item, index) => (
          <button
            key={item.label}
            type="button"
            onClick={() => setActive(index)}
            aria-current={index === active}
            className={`relative overflow-hidden rounded-sm border bg-primary text-left ${
              index === active ? "border-accent" : "border-border"
            }`}
          >
            <img
              src={item.src}
              alt=""
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
            />
            <span className="absolute inset-x-0 bottom-0 bg-primary/70 px-1.5 py-1 text-[0.6rem] uppercase tracking-[0.1em] text-primary-foreground">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function VehicleDetailPage() {
  const { vehicle } = Route.useLoaderData();
  const [mode, setMode] = useState<ActionMode | null>(null);
  const [sent, setSent] = useState<ActionMode | null>(null);

  const similar = vehicles
    .filter((item) => item.slug !== vehicle.slug && item.bodyType === vehicle.bodyType)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-0">
      <SiteHeader />

      <main className="mx-auto w-full max-w-6xl px-4 py-6">
        <Link
          to="/autoturisme"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Înapoi la stoc
        </Link>

        <div className="mt-4 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <VehicleGallery vehicle={vehicle} />


            <div className="mt-5">
              <div className="flex flex-wrap items-center gap-2">
                <Badge
                  variant={vehicle.condition === "nou" ? "default" : "secondary"}
                  className="rounded-sm"
                >
                  {vehicle.condition === "nou" ? "Mașină nouă" : "Rulat verificat"}
                </Badge>
                {vehicle.reserved ? (
                  <Badge variant="outline" className="rounded-sm">
                    Rezervat
                  </Badge>
                ) : null}
                {vehicle.hybrid ? (
                  <Badge variant="outline" className="rounded-sm">
                    Hibrid plug-in
                  </Badge>
                ) : null}
              </div>

              <h1 className="mt-3 text-2xl md:text-3xl">{vehicle.title}</h1>

              <p className="mt-3 font-display text-3xl">
                {formatPrice(vehicle.priceEur)} €
              </p>
              <p className="text-sm text-muted-foreground">
                {vehicle.vat === "deductibil" ? "TVA deductibil" : "TVA nedeductibil"}
                {vehicle.listPriceEur
                  ? ` · preț de listă ${formatPrice(vehicle.listPriceEur)} €`
                  : ""}
              </p>
              {vehicle.availability ? (
                <p className="mt-1 text-sm text-accent">{vehicle.availability}</p>
              ) : null}
            </div>

            <SpecTable vehicle={vehicle} />

            <div className="mt-6 rounded-sm border border-border bg-secondary p-4">
              <h2 className="flex items-center gap-2 text-base">
                <ShieldCheck className="size-4 text-trust" aria-hidden />
                Ce e verificat înainte să ajungă la tine
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {[
                  "Kilometraj verificat și confirmat în documente",
                  "Istoric de service în rețeaua autorizată",
                  "Verificare tehnică pe 100+ puncte de control",
                  "Garanție inclusă, fără costuri ascunse",
                ].map((item) => (
                  <li key={item} className="flex gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-trust" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                to="/verificare-masini-rulate"
                className="mt-3 inline-block text-sm font-bold text-accent underline underline-offset-4"
              >
                Vezi toată lista de verificări
              </Link>
            </div>

          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-sm border border-border bg-card p-5 shadow-card">
              <p className="flex items-center gap-2 text-sm">
                <MapPin className="size-4 text-accent" aria-hidden />
                Poți vedea mașina la <strong>{vehicle.branch}</strong>
              </p>

              <div className="mt-4 space-y-2">
                <Button
                  className="w-full rounded-sm"
                  size="lg"
                  onClick={() => {
                    setMode("test-drive");
                    setSent(null);
                  }}
                >
                  <CalendarClock className="mr-1 size-4" aria-hidden />
                  Programează test drive
                </Button>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_auto]">
                  <Button
                    variant="outline"
                    className="w-full rounded-sm"
                    size="lg"
                    onClick={() => {
                      setMode("consultant");
                      setSent(null);
                    }}
                  >
                    <UserRound className="mr-1 size-4" aria-hidden />
                    Vorbește cu un consultant
                  </Button>
                  <Button asChild variant="outline" size="lg" className="rounded-sm">
                    <a
                      href={contact.whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="mr-1 size-4 text-trust" aria-hidden />
                      WhatsApp
                    </a>
                  </Button>
                </div>
              </div>

              <p className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                <BadgeCheck className="size-4 shrink-0 text-trust" aria-hidden />
                Un consultant îți răspunde în maximum 2 ore lucrătoare, cu nume și număr
                direct.
              </p>

              <a
                href={contact.phoneHref}
                className="mt-4 flex items-center justify-center gap-2 rounded-sm border border-border py-2.5 text-sm font-bold"
              >
                <Phone className="size-4" aria-hidden />
                {contact.phone}
              </a>

              <FavoriteButton
                slug={vehicle.slug}
                withLabel
                className="mt-2 w-full justify-center"
              />
              <Link
                to="/comparatie"
                className="mt-2 block text-center text-xs text-muted-foreground underline underline-offset-4"
              >
                Vezi lista salvată și compară
              </Link>
            </div>


            {mode ? (
              <LeadForm
                mode={mode}
                sent={sent === mode}
                onSubmit={() => setSent(mode)}
                onClose={() => {
                  setMode(null);
                  setSent(null);
                }}
                branch={vehicle.branch}
              />
            ) : null}
          </aside>
        </div>

        {similar.length > 0 ? (
          <section className="mt-12">
            <h2 className="text-xl">Alternative similare din stoc</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((item) => (
                <Link
                  key={item.slug}
                  to="/autoturisme/$slug"
                  params={{ slug: item.slug }}
                  className="flex gap-3 rounded-sm border border-border bg-card p-3 shadow-card"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="size-20 shrink-0 rounded-sm object-cover"
                  />
                  <span className="text-sm">
                    <span className="block">{item.title}</span>
                    <span className="mt-1 block font-bold">
                      {formatPrice(item.priceEur)} €
                    </span>
                    <span className="block text-xs text-muted-foreground">
                      {item.km === null ? "nou" : formatKm(item.km)}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </main>

      <SiteFooter />

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 backdrop-blur md:hidden">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="font-display text-lg leading-none">
              {formatPrice(vehicle.priceEur)} €
            </p>
            <p className="text-xs text-muted-foreground">
              {vehicle.branch.replace("Autoklass ", "")}
            </p>
          </div>
          <Button
            className="rounded-sm"
            onClick={() => {
              setMode("test-drive");
              setSent(null);
            }}
          >
            Test drive
          </Button>
        </div>
      </div>
    </div>
  );
}

function SpecTable({ vehicle }: { vehicle: Vehicle }) {
  const specs = [
    { icon: Fuel, label: "Combustibil", value: vehicle.fuel },
    { icon: Settings2, label: "Putere", value: `${vehicle.powerHp} CP` },
    { icon: Settings2, label: "Cutie", value: vehicle.gearbox },
    { icon: Settings2, label: "Tracțiune", value: vehicle.drive },
    {
      icon: Gauge,
      label: "Kilometraj",
      value: vehicle.km === null ? "0 km (nou)" : formatKm(vehicle.km),
    },
    {
      icon: CalendarClock,
      label: "Prima înmatriculare",
      value: `${vehicle.registrationMonth} ${vehicle.year}`,
    },
    { icon: Settings2, label: "Capacitate", value: `${vehicle.engineCc} cm³` },
    { icon: MapPin, label: "Sucursală", value: vehicle.branch },
  ];

  return (
    <div className="mt-6">
      <h2 className="text-base">Date tehnice</h2>
      <dl className="mt-3 grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-3">
        {specs.map((spec) => (
          <div key={spec.label} className="border-b border-border pb-2">
            <dt className="text-xs text-muted-foreground">{spec.label}</dt>
            <dd className="mt-0.5">{spec.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function LeadForm({
  mode,
  sent,
  onSubmit,
  onClose,
  branch,
}: {
  mode: ActionMode;
  sent: boolean;
  onSubmit: () => void;
  onClose: () => void;
  branch: string;
}) {
  if (sent) {
    return (
      <div className="mt-4 rounded-sm border border-trust bg-trust/10 p-5">
        <h3 className="flex items-center gap-2 text-base">
          <Check className="size-4 text-trust" aria-hidden />
          Cererea a plecat
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Te contactează un consultant de la {branch} în maximum 2 ore lucrătoare. Dacă
          preferi acum, sună la{" "}
          <a href={contact.phoneHref} className="font-bold text-foreground">
            {contact.phone}
          </a>
          .
        </p>
        <DemoNotice className="mt-4 bg-card" />
        <Button variant="outline" className="mt-4 rounded-sm" onClick={onClose}>
          Închide
        </Button>
      </div>

    );
  }

  return (
    <form
      className="mt-4 rounded-sm border border-border bg-card p-5 shadow-card"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <h3 className="text-base">
        {mode === "test-drive" ? "Programare test drive" : "Discuție cu un consultant"}
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        {mode === "test-drive"
          ? "Spune-ne când poți veni. Pregătim mașina și actele înainte să ajungi."
          : "Îți răspundem la întrebări despre preț, finanțare sau istoricul mașinii."}
      </p>

      <div className="mt-4 space-y-3">
        <div>
          <Label htmlFor="lead-name">Nume</Label>
          <Input id="lead-name" required className="mt-1 rounded-sm" autoComplete="name" />
        </div>
        <div>
          <Label htmlFor="lead-phone">Telefon</Label>
          <Input
            id="lead-phone"
            type="tel"
            required
            className="mt-1 rounded-sm"
            autoComplete="tel"
            inputMode="tel"
          />
        </div>
        {mode === "test-drive" ? (
          <div>
            <Label htmlFor="lead-date">Când preferi</Label>
            <Input id="lead-date" type="date" required className="mt-1 rounded-sm" />
          </div>
        ) : (
          <div>
            <Label htmlFor="lead-message">Ce vrei să afli</Label>
            <Textarea id="lead-message" rows={3} className="mt-1 rounded-sm" />
          </div>
        )}
      </div>

      <Button type="submit" className="mt-4 w-full rounded-sm" size="lg">
        Trimite cererea
      </Button>
      <Button
        type="button"
        variant="ghost"
        className="mt-1 w-full rounded-sm"
        onClick={onClose}
      >
        Renunță
      </Button>
    </form>
  );
}
