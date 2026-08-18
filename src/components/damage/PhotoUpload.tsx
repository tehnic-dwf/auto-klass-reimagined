import { ImagePlus, X } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * Upload foto pentru dosarul de daună — în prototip fișierele NU se încarcă
 * nicăieri: se generează doar previzualizări locale (object URL), ca fluxul
 * să poată fi testat pe un site static.
 */
type LocalPhoto = { id: string; name: string; url: string };

export function PhotoUpload() {
  const [photos, setPhotos] = useState<LocalPhoto[]>([]);

  useEffect(() => {
    return () => {
      photos.forEach((photo) => URL.revokeObjectURL(photo.url));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <label
        htmlFor="damage-photos"
        className="mt-2 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-sm border border-dashed border-border bg-secondary p-6 text-center"
      >
        <ImagePlus className="size-5 text-accent" aria-hidden />
        <span className="text-sm font-bold">Adaugă poze cu avaria</span>
        <span className="text-xs text-muted-foreground">
          3–6 poze: ansamblu, detaliu avarie, talon. Ne ajută să estimăm înainte de
          constatare.
        </span>
      </label>
      <input
        id="damage-photos"
        type="file"
        accept="image/*"
        multiple
        className="sr-only"
        onChange={(event) => {
          const files = Array.from(event.target.files ?? []);
          setPhotos((current) => [
            ...current,
            ...files.map((file) => ({
              id: `${file.name}-${file.size}-${current.length}`,
              name: file.name,
              url: URL.createObjectURL(file),
            })),
          ]);
          event.target.value = "";
        }}
      />

      {photos.length > 0 ? (
        <ul className="mt-3 grid grid-cols-3 gap-2">
          {photos.map((photo) => (
            <li key={photo.id} className="relative overflow-hidden rounded-sm border border-border">
              <img src={photo.url} alt={photo.name} className="aspect-square w-full object-cover" />
              <button
                type="button"
                aria-label={`Șterge ${photo.name}`}
                onClick={() =>
                  setPhotos((current) => {
                    URL.revokeObjectURL(photo.url);
                    return current.filter((item) => item.id !== photo.id);
                  })
                }
                className="absolute right-1 top-1 rounded-sm bg-background/90 p-1"
              >
                <X className="size-3" aria-hidden />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
