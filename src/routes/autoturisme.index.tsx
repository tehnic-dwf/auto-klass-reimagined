import { createFileRoute } from "@tanstack/react-router";
import { Filter, ShieldCheck, X } from "lucide-react";
import { useMemo, useState } from "react";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { VehicleCard } from "@/components/vehicle/VehicleCard";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { branches } from "@/data/company";
import { formatPrice, vehicles } from "@/data/vehicles";

export const Route = createFileRoute("/autoturisme/")({
  head: () => ({
    meta: [
      { title: "Autoturisme Mercedes-Benz noi și rulate — stoc Autoklass" },
      {
        name: "description",
        content:
          "Stoc unificat: mașini noi și rulate verificate, cu preț final, regim TVA și sucursala afișate. Filtrează pe buget, combustibil și locație.",
      },
      {
        property: "og:title",
        content: "Autoturisme Mercedes-Benz noi și rulate — stoc Autoklass",
      },
      {
        property: "og:description",
        content:
          "Noi și rulate în aceeași listă, cu preț final vizibil și consultant care răspunde în 2 ore.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ListingPage,
});

type ConditionFilter = "toate" | "nou" | "rulat";

const maxPrice = 130000;

function ListingPage() {
  const [condition, setCondition] = useState<ConditionFilter>("toate");
  const [fuels, setFuels] = useState<string[]>([]);
  const [bodies, setBodies] = useState<string[]>([]);
  const [branch, setBranch] = useState<string>("toate");
  const [budget, setBudget] = useState<number>(maxPrice);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(
    () =>
      vehicles.filter((vehicle) => {
        if (condition !== "toate" && vehicle.condition !== condition) return false;
        if (fuels.length > 0 && !fuels.includes(vehicle.fuel)) return false;
        if (bodies.length > 0 && !bodies.includes(vehicle.bodyType)) return false;
        if (branch !== "toate" && vehicle.branch !== branch) return false;
        if (vehicle.priceEur > budget) return false;
        return true;
      }),
    [condition, fuels, bodies, branch, budget],
  );

  const activeCount =
    (condition !== "toate" ? 1 : 0) +
    fuels.length +
    bodies.length +
    (branch !== "toate" ? 1 : 0) +
    (budget < maxPrice ? 1 : 0);

  const resetAll = () => {
    setCondition("toate");
    setFuels([]);
    setBodies([]);
    setBranch("toate");
    setBudget(maxPrice);
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="mx-auto w-full max-w-7xl px-5 py-12 md:px-6 md:py-16">
        <p className="eyebrow">Stoc unificat</p>
        <h1 className="mt-4 text-3xl md:text-5xl">Autoturisme noi și rulate</h1>
        <p className="mt-5 max-w-2xl text-base text-muted-foreground">
          Aceeași listă pentru mașini noi și rulate, ca să le compari direct. Prețul
          afișat este prețul de vânzare, cu regimul de TVA precizat pe fiecare mașină.
        </p>

        <p className="mt-6 flex max-w-2xl items-start gap-3 text-sm text-muted-foreground">
          <ShieldCheck className="mt-0.5 size-5 shrink-0 text-trust" aria-hidden />
          Mașinile rulate au kilometraj verificat și istoric de service în rețeaua
          autorizată.
        </p>

        {/* Selector principal: nou / rulat / toate — vizibil fără a deschide filtrele */}
        <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-border pt-8">
          <ToggleGroup
            type="single"
            value={condition}
            onValueChange={(value) => value && setCondition(value as ConditionFilter)}
            className="gap-2"
          >
            <ToggleGroupItem value="toate" variant="outline">
              Toate ({vehicles.length})
            </ToggleGroupItem>
            <ToggleGroupItem value="nou" variant="outline">
              Noi ({vehicles.filter((v) => v.condition === "nou").length})
            </ToggleGroupItem>
            <ToggleGroupItem value="rulat" variant="outline">
              Rulate ({vehicles.filter((v) => v.condition === "rulat").length})
            </ToggleGroupItem>
          </ToggleGroup>

          <Button
            variant="outline"
            onClick={() => setFiltersOpen((value) => !value)}
            aria-expanded={filtersOpen}
          >
            <Filter className="size-4" aria-hidden />
            Filtre{activeCount > 0 ? ` (${activeCount})` : ""}
          </Button>

          {activeCount > 0 ? (
            <Button variant="ghost" onClick={resetAll}>
              <X className="size-4" aria-hidden />
              Șterge filtrele
            </Button>
          ) : null}
        </div>


        {filtersOpen ? (
          <div className="mt-4 grid gap-6 rounded-sm border border-border bg-card p-4 md:grid-cols-3">
            <div>
              <Label className="text-sm font-bold">Buget maxim</Label>
              <p className="mt-1 text-sm text-muted-foreground">până la {formatPrice(budget)} €</p>
              <Slider
                className="mt-3"
                min={20000}
                max={maxPrice}
                step={1000}
                value={[budget]}
                onValueChange={([value]) => setBudget(value ?? maxPrice)}
              />
            </div>

            <div>
              <Label className="text-sm font-bold">Combustibil</Label>
              <ToggleGroup
                type="multiple"
                value={fuels}
                onValueChange={setFuels}
                className="mt-3 flex-wrap justify-start gap-2"
              >
                {["Benzină", "Diesel"].map((fuel) => (
                  <ToggleGroupItem
                    key={fuel}
                    value={fuel}
                    className="rounded-sm border border-border px-3"
                  >
                    {fuel}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>

              <Label className="mt-4 block text-sm font-bold">Carosier</Label>
              <ToggleGroup
                type="multiple"
                value={bodies}
                onValueChange={setBodies}
                className="mt-3 flex-wrap justify-start gap-2"
              >
                {["Limuzină", "Sedan", "SUV", "Coupe"].map((body) => (
                  <ToggleGroupItem
                    key={body}
                    value={body}
                    className="rounded-sm border border-border px-3"
                  >
                    {body}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>

            <div>
              <Label className="text-sm font-bold">Sucursală</Label>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button
                  variant={branch === "toate" ? "default" : "outline"}
                  size="sm"
                  className="rounded-sm"
                  onClick={() => setBranch("toate")}
                >
                  Toate
                </Button>
                {branches.map((item) => (
                  <Button
                    key={item.name}
                    variant={branch === item.name ? "default" : "outline"}
                    size="sm"
                    className="rounded-sm"
                    onClick={() => setBranch(item.name)}
                  >
                    {item.name.replace("Autoklass ", "")}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        <p className="mt-6 text-sm text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? "mașină" : "mașini"} afișate din{" "}
          {vehicles.length} în acest prototip
        </p>

        {filtered.length === 0 ? (
          <div className="mt-6 rounded-sm border border-border bg-secondary p-8 text-center">
            <p className="text-base font-bold">Nicio mașină pentru aceste filtre</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Lărgește bugetul sau alege altă sucursală. Îți putem aduce mașina din altă locație.
            </p>
            <Button className="mt-4 rounded-sm" onClick={resetAll}>
              Șterge filtrele
            </Button>
          </div>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((vehicle) => (
              <VehicleCard key={vehicle.slug} vehicle={vehicle} />
            ))}
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
