import { createFileRoute } from "@tanstack/react-router";

import { OutOfScope } from "@/components/OutOfScope";

export const Route = createFileRoute("/service/urgent")({
  head: () => ({
    meta: [
      { title: "Service auto urgent — flux documentat | Autoklass" },
      {
        name: "description",
        content:
          "Flux pentru reparații neprogramate: contact telefonic imediat, diagnoză rapidă și estimare de cost înainte de orice lucrare.",
      },
      { property: "og:title", content: "Service auto urgent — flux documentat" },
      {
        property: "og:description",
        content:
          "Persona stresată, fără cunoștințe tehnice: prioritate pe telefon, nu pe formular.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <OutOfScope
      title="Service auto urgent (reparație neprogramată)"
      persona="Cineva cu o problemă neașteptată — bec aprins în bord, zgomot suspect —, stresat și fără cunoștințe tehnice, care se teme să nu fie tratat ca „țintă ușoară”. Vrea contact imediat prin telefon, nu completare de formular. Tonul diferă de Programare Service: calm, direct, fără jargon."
      notes={[
        "Număr de telefon proeminent, apelabil, sus pe ecran — înaintea oricărui formular.",
        "Trei întrebări de triaj („pot conduce mașina?”, „ce vezi în bord?”, „de când?”) cu răspuns imediat despre ce se întâmplă mai departe.",
        "Promisiune explicită: diagnoză și estimare de cost comunicate înainte de orice intervenție.",
        "Opțiune de tractare / pick-up și disponibilitatea mașinii de schimb, cu termen clar.",
        "Fără urgentare artificială și fără taxe surpriză: costul diagnozei afișat de la început.",
      ]}
    />
  ),
});
