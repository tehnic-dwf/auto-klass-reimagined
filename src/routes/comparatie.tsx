import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Phone, Trash2 } from "lucide-react";

import { DemoNotice } from "@/components/DemoNotice";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Button } from "@/components/ui/button";
import { contact } from "@/data/company";
import { formatKm, formatPrice, vehicles, type Vehicle } from "@/data/vehicles";
import { useFavorites } from "@/lib/favorites";

export const Route = createFileRoute("/comparatie")({
  head: () => ({
    meta: [
      { title: "Compară mașinile salvate — Autoklass" },
      {
        name: "description",
        content:
          "Pune față în față mașinile salvate: preț final, regim TVA, kilometraj, motorizare și sucursală, fără presiune de decizie.",
      },
      { property: "og:title", content: "Compară mașinile salvate — Autoklass" },
      {
        property: "og:description",
        content:
          "Preț final, TVA, kilometraj și sucursală, unul lângă altul, pentru mașinile pe care le-ai salvat.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ComparePage,
});

const rows: { label: string; value: (vehicle: Vehicle) => string }[] = [
  { label: "Preț", value: (v) => `${formatPrice(v.priceEur)} €` },
  { label: "TVA", value: (v) => (v.vat === "deductibil" ? "Deductibil" : "Nedeductibil") },
  { label: "Stare", value: (v) => (v.condition === "nou" ? "Nouă" : "Rulată verificată") },
  { label: "Kilometraj", value: (v) => (v.km === null ? "0 km" : formatKm(v.km)) },
  { label: "An", value: (v) => `${v.registrationMonth} ${v.year}` },
  { label: "Combustibil", value: (v) => `${v.fuel}${v.hybrid ? " hibrid" : ""}` },
  { label: "Putere", value: (v) => `${v.powerHp} CP` },
  { label: "Cutie", value: (v) => v.gearbox },
  { label: "Tracțiune", value: (v) => v.drive },
  { label: "Carosare", value: (v) => v.bodyType },
  { label: "Sucursală", value: (v) => v.branch.replace("Autoklass ", "") },
  { label: "Disponibilitate", value: (v) => v.availability ?? "În stoc" },
];

function ComparePage() {
  const { slugs, ready, remove, clear } = useFavorites();
  const selected = slugs
    .map((slug) => vehicles.find((vehicle) => vehicle.slug === slug))
    .filter((vehicle): vehicle is Vehicle => Boolean(vehicle));

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="mx-auto w-full max-w-5xl px-4 py-8">
        <p className="eyebrow text-muted-foreground">Lista ta</p>
        <h1 className="mt-2 text-2xl md:text-3xl">Compară fără grabă</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Mașinile salvate rămân aici, în browserul tău. Nu îți cerem cont și nu îți
          trimitem notificări. Când vrei, ceri un consultant sau un test drive.
        </p>
        <DemoNotice className="mt-4" />

        {!ready ? null : selected.length === 0 ? (
          <div className="mt-8 rounded-sm border border-dashed border-border bg-secondary p-8 text-center">
            <Heart className="mx-auto size-6 text-muted-foreground" aria-hidden />
            <p className="mt-3 font-bold">Nu ai salvat nicio mașină încă</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Apasă inimioara de pe orice mașină din stoc și revino aici.
            </p>
            <Button asChild className="mt-5 rounded-sm">
              <Link to="/autoturisme">Vezi stocul</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-sm">
                <thead>
                  <tr>
                    <th className="w-36 border-b border-border p-2 text-left align-bottom text-xs font-bold uppercase tracking-wide text-muted-foreground">
                      Caracteristică
                    </th>
                    {selected.map((vehicle) => (
                      <th
                        key={vehicle.slug}
                        className="border-b border-border p-2 text-left align-bottom"
                      >
                        <Link
                          to="/autoturisme/$slug"
                          params={{ slug: vehicle.slug }}
                          className="block"
                        >
                          <img
                            src={vehicle.image}
                            alt={vehicle.title}
                            loading="lazy"
                            className="aspect-[4/3] w-full rounded-sm object-cover"
                          />
                          <span className="mt-2 block leading-snug">{vehicle.title}</span>
                        </Link>
                        <button
                          type="button"
                          onClick={() => remove(vehicle.slug)}
                          className="mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="size-3" aria-hidden />
                          Scoate
                        </button>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.label} className="even:bg-secondary/60">
                      <th className="border-b border-border p-2 text-left font-bold">
                        {row.label}
                      </th>
                      {selected.map((vehicle) => (
                        <td key={vehicle.slug} className="border-b border-border p-2">
                          {row.value(vehicle)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <Button asChild size="lg" className="rounded-sm">
                <a href={contact.phoneHref}>
                  <Phone className="mr-1 size-4" aria-hidden />
                  Discută cu un consultant
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-sm"
                onClick={() => clear()}
              >
                Golește lista
              </Button>
            </div>
          </>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
