import { Link } from "@tanstack/react-router";

import { FavoriteButton } from "@/components/vehicle/FavoriteButton";
import { formatKm, formatPrice, type Vehicle } from "@/data/vehicles";

/**
 * Card editorial: imaginea domină, apoi titlu, preț și trei date esențiale.
 * Restul metadatelor stau grupate pe o singură linie discretă, dar lizibilă.
 */
export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const essentials = [
    vehicle.km === null ? "0 km" : formatKm(vehicle.km),
    `${vehicle.powerHp} CP`,
    vehicle.hybrid ? `${vehicle.fuel} hibrid` : vehicle.fuel,
  ];

  return (
    <Link
      to="/autoturisme/$slug"
      params={{ slug: vehicle.slug }}
      className="group flex flex-col overflow-hidden rounded-sm border border-border bg-card transition-colors hover:border-foreground/25"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <img
          src={vehicle.image}
          alt={vehicle.title}
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
        <span className="absolute left-3 top-3 rounded-sm bg-card/95 px-2.5 py-1 text-xs font-bold text-foreground">
          {vehicle.condition === "nou" ? "Nou" : vehicle.reserved ? "Rezervat" : "Rulat verificat"}
        </span>
        <FavoriteButton slug={vehicle.slug} className="absolute right-3 top-3" />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <h3 className="text-lg leading-snug">{vehicle.title}</h3>

        <div className="mt-auto">
          <p className="font-display text-2xl leading-none">{formatPrice(vehicle.priceEur)} €</p>
          <p className="mt-2 text-xs text-muted-foreground">{essentials.join(" · ")}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {vehicle.vat === "deductibil" ? "TVA deductibil" : "TVA nedeductibil"} ·{" "}
            {vehicle.branch.replace("Autoklass ", "")}
          </p>
        </div>
      </div>
    </Link>
  );
}
