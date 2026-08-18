import { Link } from "@tanstack/react-router";
import { Fuel, Gauge, MapPin, Settings2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { FavoriteButton } from "@/components/vehicle/FavoriteButton";
import { formatKm, formatPrice, type Vehicle } from "@/data/vehicles";


export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const saving = vehicle.listPriceEur ? vehicle.listPriceEur - vehicle.priceEur : 0;

  return (
    <Link
      to="/autoturisme/$slug"
      params={{ slug: vehicle.slug }}
      className="group flex flex-col overflow-hidden rounded-sm border border-border bg-card shadow-card transition-shadow hover:shadow-panel"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        <img
          src={vehicle.image}
          alt={vehicle.title}
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute left-2 top-2 flex flex-wrap gap-1">
          <Badge
            variant={vehicle.condition === "nou" ? "default" : "secondary"}
            className="rounded-sm"
          >
            {vehicle.condition === "nou" ? "Nou" : "Rulat verificat"}
          </Badge>
          {vehicle.reserved ? (
            <Badge variant="outline" className="rounded-sm bg-background">
              Rezervat
            </Badge>
          ) : null}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-base leading-snug">{vehicle.title}</h3>

        <ul className="mt-3 grid grid-cols-2 gap-y-1.5 text-sm text-muted-foreground">
          <li className="flex items-center gap-1.5">
            <Fuel className="size-3.5" aria-hidden />
            {vehicle.fuel}
            {vehicle.hybrid ? " hibrid" : ""}
          </li>
          <li className="flex items-center gap-1.5">
            <Settings2 className="size-3.5" aria-hidden />
            {vehicle.powerHp} CP · {vehicle.drive}
          </li>
          <li className="flex items-center gap-1.5">
            <Gauge className="size-3.5" aria-hidden />
            {vehicle.km === null ? "0 km" : formatKm(vehicle.km)}
          </li>
          <li className="flex items-center gap-1.5">
            <MapPin className="size-3.5" aria-hidden />
            {vehicle.branch.replace("Autoklass ", "")}
          </li>
        </ul>

        <div className="mt-4 border-t border-border pt-3">
          <p className="font-display text-2xl">{formatPrice(vehicle.priceEur)} €</p>
          <p className="text-xs text-muted-foreground">
            {vehicle.vat === "deductibil" ? "TVA deductibil" : "TVA nedeductibil"} ·
            înmatriculat {vehicle.registrationMonth} {vehicle.year}
          </p>
          {saving > 0 ? (
            <p className="mt-1 text-xs font-bold text-trust">
              Sub prețul de listă cu {formatPrice(saving)} €
            </p>
          ) : null}
          {vehicle.availability ? (
            <p className="mt-1 text-xs text-accent">{vehicle.availability}</p>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
