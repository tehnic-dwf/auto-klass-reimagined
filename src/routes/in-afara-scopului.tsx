import { createFileRoute } from "@tanstack/react-router";

import { OutOfScope } from "@/components/OutOfScope";

export const Route = createFileRoute("/in-afara-scopului")({
  head: () => ({
    meta: [
      { title: "Secțiune documentată, în afara prototipului | Autoklass" },
      {
        name: "description",
        content:
          "Secțiune păstrată în navigație pentru arhitectura completă a site-ului, dar neconstruită în runda curentă de prototip.",
      },
      { property: "og:title", content: "Secțiune în afara prototipului" },
      {
        property: "og:description",
        content:
          "Navigația reflectă structura completă autoklass.ro; această secțiune nu face parte din ecranele prototipate.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <OutOfScope
      title="Secțiune păstrată în navigație, neconstruită încă"
      persona="Vizitator care explorează meniul complet, așa cum îl are site-ul actual: caută o categorie secundară (piese, finanțare, blog, despre noi). Nu vrea să lovească un link mort — vrea să înțeleagă că zona există în arhitectură și unde poate merge în schimb."
      notes={[
        "Structura de navigație rămâne cea reală: categoriile principale nu se simplifică, doar fluxurile-cheie sunt prototipate.",
        "Fiecare grup din meniu conține cel puțin un link către un ecran real, ca utilizatorul să nu ajungă în gol.",
        "La construcția completă, fiecare secțiune primește propriul ton: informativ pentru piese și finanțare, editorial pentru blog, factual pentru sucursale și cariere.",
        "Până atunci, micro-conversiile rămân disponibile permanent: telefon, WhatsApp, programare service.",
      ]}
    />
  ),
});
