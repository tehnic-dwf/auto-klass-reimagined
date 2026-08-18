# Autoklass.ro — Prototip redesign (lead generation first)

Prototip mobile-first construit pe concluziile din raportul de analiză UX/CRO (5 capitole) și anexa de audit UI/UX mobil. Stoc de mașini pe date demo hardcodate. Zero elemente de urgency sau social proof inventat.

## Principii care guvernează tot prototipul

1. Mobile-first obligatoriu, cu prioritate absolută pe fluxul Service (gap 3,65% mobil vs 11,60% desktop).
2. Fiecare bloc de copy răspunde la una din cele 5 frici documentate: preț necunoscut, judecată socială, timp fără update, garanție neonorată, transparență pe rulate.
3. Interzis: „Vizualizat de X persoane”, „Ultimele 3 unități”, „test drive GRATUIT”, orice urgency care nu vine din stoc real.
4. Consultant nominal peste proces anonim: nume + foto + specializare, vizibil înainte de formular.
5. Fiecare CTA și modul primește `data-module`; fiecare formular emite `form_start` / `form_submit` (hook de tracking pregătit, fără GA4 conectat în prototip).
6. Ierarhie strictă de z-index: meniu mobil și modaluri deasupra widget-urilor terțe; widget-urile flotante se ascund când meniul e deschis.

## Structura de pagini (primul run)

```text
/                        Homepage
/stoc                    Listing unificat (nou + rulat = filtru, nu meniu)
/stoc/:slug              Pagina de detaliu vehicul (PDP)
/service                 Programare service + estimator cost
/service/urgenta         Intrare urgentă / nonprogramată
/test-drive              Formular test drive
/consultanti             Consultanți per sucursală și brand
/vinde-masina            Buy-back cu proces în 3 pași
/dosar-daune             Fine-tuning pe pagina existentă (bine construită)
/contact                 Sucursale + WhatsApp per sucursală
```

## Homepage

- Hero cu rotație de campanii + CTA principal de acțiune și un al doilea CTA discret pentru segmentul premium: „Cum funcționează procesul, pas cu pas”.
- Search bar restrâns pe mobil, dar cu preț de pornire („de la X €”) vizibil pe bara restrânsă.
- Logo-uri de brand cu context acționabil: „X mașini în stoc” + „Autorizat [brand] din [an]”.
- Bloc „Cum cumperi online” în 3 pași, mutat sus (nu după deals).
- Trei intrări rapide de flux: Test Drive / Programare Service / Îți cumpărăm mașina.
- Sticky bottom bar pe mobil, cu CTA dinamic în funcție de context (Test Drive pe pagini de achiziție, Programare Service pe after-sales) + apel direct.

## Listing /stoc

- O singură listă, cu `Nou / Rulat` ca filtru, nu ca secțiune separată de meniu; filtrare pe brand, model, preț, an, km, combustibil, sucursală.
- Card mașină: preț, rată estimativă „de la X €/lună”, sucursală fizică, badge „Verificare tehnică inclusă” cu link spre raport, buton WhatsApp per sucursală.
- Floating Compare Bar: „Adaugă la comparare (max. 3)” → drawer cu tabel de diferențe (km, an, motorizare, garanție, opțiuni cheie).
- Badge „Rezervat” doar pe date de stoc reale; în prototip apare marcat ca demo.
- Visual Search Overlay în header sticky: la tastare afișează 3 thumbnail-uri din stoc cu preț și sucursală.

## PDP /stoc/:slug

- Galerie, specificații, istoric și raport de verificare pentru rulate.
- Calculator interactiv de finanțare: slider avans 10–50%, perioadă 12–60 luni, rată lunară estimată + CTA „Discută finanțarea”.
- Lângă orice preț „de la”: „Prețul final, comunicat înainte să începem orice lucrare.”
- Consultantul care răspunde de mașină, cu nume, foto și specializare.
- Acțiuni: Test Drive pe acest vehicul, Verifică disponibilitatea (formular scurt, 3 câmpuri), WhatsApp cu consultant.

## Service (prioritate maximă)

- Estimator cost în 3 clicuri înainte de formular: Model → An → Intervenție → interval de preț și durată estimativă.
- Formular mobil optimizat, pași scurți, selector de sucursală tip dropdown/radio (nu zid de 8 fotografii), carusel compact de sucursale.
- SLA afișat lângă butonul de trimitere: „Te contactăm în maxim 2 ore, în program.”
- Servicii sezoniere pe tab-uri orizontale (Diagnoză, Anvelope, Revizie) + caruseluri swipeable, nu 15 carduri stivuite.
- `/service/urgenta`: secțiune separată, ton calm, răspunde explicit la „pot veni fără programare?” și „mi se explică înainte să aprob costul?”.

## Test Drive, buy-back, consultanți

- Test Drive: „Fără nicio obligație de cumpărare”, pas opțional de confirmare buget/disponibilitate înainte de alegerea datei, alegere de consultant specializat pe brand.
- Buy-back: bloc „Cum funcționează evaluarea” în 3 pași înainte de formular, aceeași structură ca la Daune.
- Pagina de consultanți: 2–3 consultanți per sucursală/brand, cu foto, nume, specializare și WhatsApp direct.

## Formulare — reguli comune

- Validare la blur/submit, nu la tastare; mesaj explicativ sub câmp („Introduceți codul din 17 caractere”), nu doar pictogramă roșie.
- Validare cu zod, limite de lungime, encodare corectă pe link-urile WhatsApp.
- CTA cu beneficiu, nu „Trimite”: „Programează service în 1 minut”.
- Footer minimalist pe paginile de conversie (doar copyright și link-uri legale).

## Detalii tehnice

- TanStack Start, rute pe fișiere în `src/routes`, fără backend în primul run.
- Stocul demo într-un modul TS tipat (`src/data/vehicles.ts`), plus consultanți, sucursale și tarife de service; ușor de înlocuit ulterior cu feed real sau Lovable Cloud.
- Design tokens semantice în `src/styles.css` (oklch), fără culori hardcodate; direcția vizuală și paleta se fixează după ce primesc logo-ul și pozele.
- Assets (logo, poze mașini) urcate prin Lovable Assets, referențiate prin pointeri `.asset.json`.
- `head()` per rută, cu titlu și descriere proprii; H1 unic pe pagină; alt text pe imagini; lazy loading pe galerii.

## Ce NU intră în primul run

- Backend, autentificare, plăți online, integrare CRM sau feed real de stoc.
- GA4 real conectat (doar atributele și hook-urile de tracking).
- Restructurarea SEO pe pilon marcă → model la nivel de site real (dependință de echipa SEO/dev).

## Rămâne de confirmat înainte de build

- Sursa pentru logo și pozele de mașini.
- Direcția vizuală: cât din brandingul actual păstrăm și ce ton vizual țintim.
