import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  BadgeCheck,
  CalendarClock,
  Check,
  Fuel,
  Gauge,
  MapPin,
  MessageCircle,
  Phone,
  Settings2,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { useState } from "react";

import detaliuGrila from "@/assets/detaliu-grila.jpg";
import heroGrila from "@/assets/hero-grila.jpg";
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
 * Galerie sobră: fața mașinii prima, apoi interiorul, exemplarul din stoc și un detaliu.
 */
function VehicleGallery({ vehicle }: { vehicle: Vehicle }) {
  const shots = [
    {
      src: heroGrila,
      alt: `${vehicle.title} văzut frontal, cu grila și farurile aprinse`,
      label: "Față",
      caption: "Grila și privirea farurilor — prima impresie, cea care rămâne.",
    },
    {
      src: interiorAmbiental,
      alt: `Interior ${vehicle.title}, seara`,
      label: "Interior",
      caption: "Habitaclul, așa cum îl vezi la volan după apus.",
    },
    {
      src: gallerySize(vehicle.image),
      alt: vehicle.title,
      label: "Exterior",
      caption: `${vehicle.title}, exact mașina din stocul de la ${vehicle.branch}.`,
    },
    {
      src: detaliuGrila,
      alt: "Detaliu grilă și stea Mercedes-Benz",
      label: "Detaliu",
      caption: "Cromul grilei și steaua, în lumină rece.",
    },
  ];

  const [active, setActive] = useState(0);
  const shot = shots[active]!;

  return (
    <div>
      <div className="overflow-hidden rounded-sm border border-border bg-muted">
        <img src={shot.src} alt={shot.alt} className="aspect-[16/10] w-full object-cover" />
      </div>
      <p className="mt-3 text-xs text-muted-foreground">{shot.caption}</p>

      <div className="mt-4 grid grid-cols-4 gap-3">
        {shots.map((item, index) => (
          <button
            key={item.label}
            type="button"
            onClick={() => setActive(index)}
            aria-current={index === active}
            aria-label={item.label}
            className={`overflow-hidden rounded-sm border-2 bg-muted text-left transition-colors ${
              index === active ? "border-foreground" : "border-transparent"
            }`}
          >
            <img
              src={item.src}
              alt=""
              loading="lazy"
              className="aspect-[16/10] w-full object-cover"
            />
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
    <div className="min-h-screen bg-background pb-28 md:pb-0">
      <SiteHeader />

      <main className="mx-auto w-full max-w-7xl px-5 py-8 md:px-6 md:py-12">
        <Link
          to="/autoturisme"
          className="inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Înapoi la stoc
        </Link>

        <div className="mt-4 grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <div>
            <VehicleGallery vehicle={vehicle} />

            <div className="mt-8">
              <Badge variant={vehicle.condition === "nou" ? "default" : "secondary"}>
                {vehicle.condition === "nou" ? "Mașină nouă" : "Rulat verificat"}
              </Badge>

              <h1 className="mt-5 text-3xl md:text-4xl">{vehicle.title}</h1>

              <p className="mt-6 font-display text-4xl">{formatPrice(vehicle.priceEur)} €</p>
              <p className="mt-2 text-xs text-muted-foreground">
                {vehicle.vat === "deductibil" ? "TVA deductibil" : "TVA nedeductibil"}
                {vehicle.listPriceEur
                  ? ` · preț de listă ${formatPrice(vehicle.listPriceEur)} €`
                  : ""}
                {vehicle.hybrid ? " · hibrid plug-in" : ""}
                {vehicle.reserved ? " · rezervat" : ""}
              </p>
              {vehicle.availability ? (
                <p className="mt-1 text-xs text-accent">{vehicle.availability}</p>
              ) : null}
            </div>

            <SpecTable vehicle={vehicle} />

            <div className="mt-12 border-t border-border pt-8">
              <h2 className="flex items-center gap-2 text-lg">
                <ShieldCheck className="size-5 text-trust" aria-hidden />
                Ce e verificat înainte să ajungă la tine
              </h2>
              <ul className="mt-5 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
                {[
                  "Kilometraj verificat și confirmat în documente",
                  "Istoric de service în rețeaua autorizată",
                  "Verificare tehnică pe 100+ puncte de control",
                  "Garanție inclusă, fără costuri ascunse",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <Check className="mt-1 size-4 shrink-0 text-trust" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                to="/verificare-masini-rulate"
                className="mt-6 inline-flex min-h-11 items-center text-sm font-bold text-accent"
              >
                Vezi toată lista de verificări
              </Link>
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-sm border border-border bg-card p-6">
              <p className="flex items-start gap-3 text-sm">
                <MapPin className="mt-0.5 size-5 shrink-0 text-muted-foreground" aria-hidden />
                <span>
                  Poți vedea mașina la <strong>{vehicle.branch}</strong>
                </span>
              </p>

              <div className="mt-6 space-y-3">
                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => {
                    setMode("test-drive");
                    setSent(null);
                  }}
                >
                  <CalendarClock className="size-4" aria-hidden />
                  Programează test drive
                </Button>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setMode("consultant");
                      setSent(null);
                    }}
                  >
                    <UserRound className="size-4" aria-hidden />
                    Consultant
                  </Button>
                  <Button asChild variant="outline">
                    <a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="size-4" aria-hidden />
                      WhatsApp
                    </a>
                  </Button>
                </div>
              </div>

              <p className="mt-5 flex items-start gap-3 text-xs text-muted-foreground">
                <BadgeCheck className="mt-0.5 size-4 shrink-0 text-trust" aria-hidden />
                Un consultant îți răspunde în maximum 2 ore lucrătoare, cu nume și număr direct.
              </p>

              <div className="mt-6 space-y-3 border-t border-border pt-6">
                <a
                  href={contact.phoneHref}
                  className="flex min-h-12 items-center justify-center gap-2 rounded-sm border border-border text-sm font-bold"
                >
                  <Phone className="size-4" aria-hidden />
                  {contact.phone}
                </a>

                <FavoriteButton slug={vehicle.slug} withLabel className="w-full" />
                <Link
                  to="/comparatie"
                  className="flex min-h-11 items-center justify-center text-xs text-muted-foreground"
                >
                  Vezi lista salvată și compară
                </Link>
              </div>
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
          <section className="mt-20 border-t border-border pt-12">
            <h2 className="text-2xl">Alternative similare din stoc</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((item) => (
                <Link
                  key={item.slug}
                  to="/autoturisme/$slug"
                  params={{ slug: item.slug }}
                  className="flex gap-4 rounded-sm border border-border bg-card p-4 transition-colors hover:border-foreground/25"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="size-24 shrink-0 rounded-sm object-cover"
                  />
                  <span className="min-w-0 text-sm">
                    <span className="block">{item.title}</span>
                    <span className="mt-2 block font-display text-xl">
                      {formatPrice(item.priceEur)} €
                    </span>
                    <span className="mt-1 block text-xs text-muted-foreground">
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

      <div className="pb-safe fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 px-3 pt-3 backdrop-blur md:hidden">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="font-display text-xl leading-none">{formatPrice(vehicle.priceEur)} €</p>
            <p className="mt-1 truncate text-xs text-muted-foreground">
              {vehicle.branch.replace("Autoklass ", "")}
            </p>
          </div>
          <Button
            className="shrink-0"
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
    <div className="mt-12 border-t border-border pt-8">
      <h2 className="text-lg">Date tehnice</h2>
      <dl className="mt-6 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3">
        {specs.map((spec) => (
          <div key={spec.label} className="min-w-0">
            <dt className="text-xs text-muted-foreground">{spec.label}</dt>
            <dd className="mt-1 text-sm">{spec.value}</dd>
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
          Te contactează un consultant de la {branch} în maximum 2 ore lucrătoare. Dacă preferi
          acum, sună la{" "}
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
      <Button type="button" variant="ghost" className="mt-1 w-full rounded-sm" onClick={onClose}>
        Renunță
      </Button>
    </form>
  );
}
