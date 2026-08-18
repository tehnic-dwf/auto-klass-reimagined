import { useAmbient } from "@/hooks/useAmbient";
import { ambientPalette, ambientPresets, warmColor } from "@/lib/ambient";

type Props = {
  /** varianta compactă: doar swatch-urile, fără scene numite */
  compact?: boolean;
  className?: string;
};

/**
 * Paleta de 64 de culori. Nu e o listă de specificații — apăsarea unei culori
 * schimbă imediat atmosfera întregii pagini (bloom, linii de lumină, margini).
 */
export function AmbientPalette({ compact = false, className }: Props) {
  const { index, select } = useAmbient();
  const activePreset = ambientPresets.find((preset) => preset.index === index);

  return (
    <div className={className}>
      {compact ? null : (
        <div className="flex flex-wrap gap-2">
          {ambientPresets.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => select(preset.index)}
              aria-pressed={preset.index === index}
              title={preset.description}
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold transition-[transform,border-color] duration-150 active:scale-[0.97] ${
                preset.index === index
                  ? "border-primary-foreground/70 text-primary-foreground"
                  : "border-primary-foreground/25 text-primary-foreground/70 hover:border-primary-foreground/50"
              }`}
            >
              <span
                className="size-2.5 rounded-full"
                style={{
                  backgroundColor: warmColor(
                    ambientPalette[preset.index]?.hue ?? 0,
                  ),
                  boxShadow: `0 0 10px ${warmColor(ambientPalette[preset.index]?.hue ?? 0)}`,
                }}
                aria-hidden
              />
              {preset.label}
            </button>
          ))}
        </div>
      )}

      <div
        className={`grid grid-cols-16 gap-1 ${compact ? "" : "mt-4"}`}
        role="group"
        aria-label="Alege una din cele 64 de culori ambientale"
      >
        {ambientPalette.map((scene) => (
          <button
            key={scene.index}
            type="button"
            onClick={() => select(scene.index)}
            aria-label={`Culoarea ambientală ${scene.index + 1} din 64`}
            aria-pressed={scene.index === index}
            className={`h-5 rounded-[2px] transition-transform duration-150 hover:scale-125 active:scale-95 ${
              scene.index === index ? "scale-125 ring-1 ring-primary-foreground" : ""
            }`}
            style={{
              backgroundColor: warmColor(scene.hue),
              boxShadow:
                scene.index === index
                  ? `0 0 16px ${warmColor(scene.hue)}`
                  : undefined,
            }}
          />
        ))}
      </div>

      {compact ? null : (
        <p className="mt-3 text-xs text-primary-foreground/60">
          Culoarea {index + 1} din 64
          {activePreset ? ` — ${activePreset.label}: ${activePreset.description}` : ""}.
          Rămâne aprinsă pe tot site-ul.
        </p>
      )}
    </div>
  );
}
