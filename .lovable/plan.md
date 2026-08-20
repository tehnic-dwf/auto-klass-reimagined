# Audit homepage (read-only) — commit 6ea05552

Nicio modificare de fișiere, niciun commit, nicio instalare, nicio publicare. Toate observațiile provin din inspecția preview-ului rulant cu Playwright + citirea codului.

Screenshot-uri (căi locale în sandbox):
- Hero: `/tmp/browser/hp-audit/shots/hero-320.png`, `hero-390.png`, `hero-768.png`, `hero-contrast-1440.png`
- Scroll complet: `/tmp/browser/hp-audit/shots/w320-00..11.png`, `w390-00..11.png`, `w768-00..07.png`, `w1440-00..06.png`

## 1. Spații goale excesive, per viewport

Înălțimi document: 320px → 11.930px; 390px → 10.293px; 768px → 7.990px; 1440px → 6.198px.
Padding vertical de secțiune constant: `py-20 md:py-28` = 80px mobil / 112px desktop, sus și jos, la 5 secțiuni consecutive.

Goluri măsurate (>=48px între frați direcți, nu doar padding):

| Loc | 320 | 390 | 768 | 1440 | Cauză |
|---|---|---|---|---|---|
| Sfârșit „De ce ai venit azi?” (după ancoră) + început „Selecție din stoc” | 80+80 = ~160px cumulat | ~160px | 224px | 224px | `py-20/md:py-28` pe ambele secțiuni, fără compensare la tranziție (vizibil în `w390-02.png`, `w1440-01.png`) |
| Proof rail → „De ce ai venit azi?” | ~80px | ~80px | 112px | 112px | padding-top secțiune 3, peste rail-ul deja aerisit (153px) |
| `#cum-functioneaza`: titlu → `ol` | 48px | 48px | 48px | 48px | `mt-12` pe `<ol>` |
| `#cum-functioneaza`: `ol` → blocul de promisiuni | 64px | 64px | 64px | 64px | `mt-16 ... pt-12` |
| `#sucursale`: titlu → listă sucursale | 48px | 48px | 48px | 48px | `mt-12` |
| `#sucursale`: listă → bloc mărci | 64px | 64px | 64px | 64px | `mt-16 pt-10` |
| FAQ: coloană stânga → card CTA (doar sub `lg`) | 64px | 64px | 64px | — | `gap-16` pe grid care colapsează la 1 coloană |
| Hero: sub CTA-uri până la marginea de jos | ~64px | ~64px | ~80px | ~128px | `pb-16 md:pb-20` + `justify-end` |
| Brand grid → secțiune FAQ (1440) | — | — | — | ~224px vizual în `w1440-05.png` | padding 112 + 112 pe fundaluri diferite (întunecat → ivory) |

Efect cumulat: la 320/390px se pierd ~1.5 ecrane doar pe padding între secțiuni; la 1440 tranziția `#sucursale` → FAQ arată ca o bandă goală de peste 200px.

## 2. Hero — măsurători

- H1 `Mașina potrivită pentru cine ai devenit.`: 48px/47.04px line-height la 320, 390 și **768** (clamp-ul nu crește pe tabletă), 74.88px/73.38px la 1440. Culoare `oklch(0.985 0.003 85)`.
- Wrapping observat: 3 linii la toate cele patru lățimi. La 1440 lățimea reală a H1 e doar 455px din 1232px disponibili (`maxWidth: 13ch`), deci ruperea „Mașina potrivită / pentru cine / ai devenit.” e artificial îngustă pentru desktop.
- Eyebrow „DEALER AUTORIZAT MERCEDES-BENZ DIN 2001”: 14px, 1 linie la 390/768/1440; **2 linii la 320px** (se rupe după „MERCEDES-BENZ”).
- Copy de suport: 17px, `max 42ch`; 1 linie la 1440, 2 linii la 320/390.
- Hero = exact 1 viewport (`100svh`): înălțime 900/844/1024/900 = înălțimea ferestrei, `belowFoldPeek = 0` la toate lățimile → **nu există „peek” al secțiunii următoare**; nimic nu semnalizează că pagina continuă (nici indiciu de scroll).
- Scrim: `hero-copy-scrim` = gradient stânga→dreapta 86%/62%/12%/transparent + gradient de jos 55%. Măsurat pe pixelii din zona H1 la 1440: luminanță de fundal medie 0.116 → contrast mediu ~6.1:1 față de textul ivory, dar există regiuni luminoase (farul dreapta / reflexia albastră) cu luminanță până la ~0.72–0.96 în zona de suport/eyebrow, unde contrastul local scade sub 2:1. La 1440 textul stă peste zona întunecată a grilei, deci lizibil; riscul e la lățimi între ~1024–1280 și la 768, unde `object-position: 50% 34%` aduce farul stâng mai aproape de coloana de text.
- `object-position`: `62% 38%` sub `md`, `50% 34%` de la `md`. La 320px cadrul taie capota și steaua aproape complet (vezi `hero-320.png`): steaua Mercedes apare doar ca detaliu mic sus-stânga, nu ca focal point.
- CTA-uri: „Vezi stocul disponibil” (48px înălțime, 233px) + „Programare service” (48px, 198px). Ambele apar **vizual deschise/umplute** în screenshot la 1440; în plus header-ul afișează al treilea buton „Programare service” cu fundal umplut deschis în starea de hero → în primul viewport sunt 3 butoane cu greutate similară și „Programare service” apare de două ori. Regula „exact un primary umplut per viewport” nu se citește vizual.

## 3. Secțiuni de conținut

„De ce ai venit azi?” (`main > section:nth-of-type(3)`, index.tsx 227–259)
- 6 carduri egale, 409×181px la 1440, fără ierarhie: „Vreau o mașină” (intenția comercială principală) are exact aceeași greutate ca „Vreau să știu ce verificați”.
- Titlurile cardurilor sunt 18px, aceeași familie/greutate ca titlurile din alte secțiuni; singurul accent e ArrowRight albastru 16px aliniat jos-stânga, care arată ca decor, nu ca acțiune.
- Cardurile sunt `Link`-uri întregi, dar nu au stare de focus vizibil diferențiată de hover; hover = doar schimbare de fundal (`oklch(1 0 0)` → `oklch(0.958 0.004 85)`), fără mișcare/afordanță pe titlu.
- La 390px cardurile devin o coloană cu ~1000px de listă; ancora ajunge la ~2289px de la top.

Ancora „Cum funcționează procesul, pas cu pas” (index.tsx 251–258)
- 16px, culoare accent `oklch(0.5251 0.1619 254.62)`, `text-decoration: none`, `inline-flex`, 304×48px (target OK).
- Poziționată după 6 carduri, izolată pe fundal gol, cu ~80px de spațiu gol dedesubt înainte de secțiunea următoare → citită ca link orfan, nu ca pas următor. Este un link intern de tip salt (`#cum-functioneaza`), dar arată identic cu CTA-urile de navigare reală („Toate mașinile”), deci utilizatorul nu poate distinge saltul in-page de o navigare.

„Selecție din stoc / Noi și rulate, în aceeași listă” (index.tsx 262–288)
- Titlul secțiunii 44px la 1440, 1 linie; la 320px se rupe pe 2 linii („Noi și rulate, / în aceeași listă”).
- Link „Toate mașinile” (128×44px) e ascuns sub `md` și înlocuit de un buton outline full-width la finalul listei → două tratamente diferite pentru aceeași destinație.
- Carduri vehicul: 395×414px la 1440, 348×384px la 768. Titlul e 18px, prețul 24px `font-display`; la 320px titlul „Mercedes-Benz GLC 220 d 4MATIC Coupé” trece pe 2 linii, iar cardurile vecine rămân la 1 linie → prețurile nu se aliniază pe grilă între carduri (nu există înălțime minimă pentru titlu).
- Copy-ul secțiunii nu spune nimic despre criteriul selecției (de ce aceste 6), iar badge-urile („Nou” / „Rulat verificat”) sunt singurul semnal de mix nou/rulat; ordinea e 3 noi apoi 3 rulate, dar nimic nu etichetează cele două grupuri.
- Hover pe card: `border` declarat `hover:border-foreground/25` — la măsurare border-color și transformul imaginii au rămas neschimbate (`none`) după `hover()` în Chromium headless, deci efectul `group-hover:scale-[1.02]` nu s-a putut confirma pe această rulare.

## 4. Test drive pe homepage

Nu există nicio secțiune și niciun CTA dedicat test drive-ului pe homepage. Test drive-ul apare doar ca **mențiune de text**, în 3 locuri:
- `src/routes/index.tsx:102` — pasul 3 din proces: „Test drive când îți convine”
- `src/routes/index.tsx:122` — răspuns FAQ: „Test drive-ul și discuția cu un consultant nu implică nicio obligație”
- `src/routes/index.tsx:339` — copy secțiune sucursale: „Alegi sucursala la test drive sau la programarea de service”

Nicio intenție din grila „De ce ai venit azi?” nu vizează test drive-ul, și nici hero-ul, nici blocul de închidere FAQ nu oferă o acțiune de programare test drive.

## 5. Mișcare / hover / reduced motion

- Hero: `.hero-rise` = `opacity 0→1` + `translateY(10px→0)`, 620ms, stagger 0/100/200/300ms pe eyebrow, H1, copy, grup CTA. Definit doar în `@media (prefers-reduced-motion: no-preference)` (styles.css 252–267).
- Cu emulare `reduced_motion: reduce` la 1440: H1 raportează `animation-name: none`, `animation-duration: 1e-05s`, `opacity: 1`, `transform: none` → conținutul e complet vizibil, fără flash. Regula globală de kill-switch există (styles.css 269–277) și acoperă și `transition-duration` și `scroll-behavior`.
- Carduri intenție: tranziție de culoare fundal (confirmată: `oklch(1 0 0)` → `oklch(0.958 0.004 85)`).
- Carduri vehicul: `transition-transform duration-500 group-hover:scale-[1.02]` pe imagine + `hover:border-foreground/25` — neconfirmate la măsurare în headless (vezi 3).
- Ancora proces: `group-hover:translate-x-1` pe ArrowRight în cardurile de intenție; ancora `#cum-functioneaza-cta` nu are niciun feedback de hover (nici underline, nici deplasare).
- Header overlay: tranziție transparent → graphite la scroll >24px, confirmată vizual (`w1440-01.png` vs `hero-contrast-1440.png`).
- MobileStickyBar apare după hero la 320/390 (`w320-03.png`), 3 acțiuni, fără suprapunere pe conținut.

## 6. Propunere de amplasare pentru embed YouTube lite (video `q3q-DQcUegk`) — neimplementată

Amplasare recomandată: **secțiune nouă imediat după proof rail-ul de statistici și înaintea „De ce ai venit azi?”** (adică între `section` index 1 și 2, index.tsx ~224–227). Motiv: umple exact banda goală de 80/112px semnalată la punctul 1, oferă „peek” sub hero care acum lipsește (`belowFoldPeek = 0`), și nu se interpune între intenții și stoc, deci fluxul de conversie hero → intenții → stoc rămâne neatins. Alternativa secundară: în interiorul `#cum-functioneaza`, ca ilustrație a procesului, sub cei 5 pași — dar acolo întârzie prea mult prima dovadă emoțională.

Dimensiuni și comportament propuse:
- Container: `max-w-7xl`, aceleași `px-5 md:px-6`; player pe 2/3 din lățime la `lg` (max ~880px), full-width sub `md`.
- Rație fixă 16/9 (`aspect-[16/9]`), radius 8px ca restul suprafețelor, o singură umbră discretă; înălțimi rezultate: ~157px la 320, ~196px la 390, ~405px la 768, ~495px la 1440 (880px lățime).
- Poster: cadru static din imaginile existente în repo (ex. `hero-grila.jpg` sau imaginea de interior deja folosită la Programare service) — fără descărcarea thumbnail-ului de pe YouTube, ca să nu se introducă asset extern.
- Buton play centrat, minim 56×56px, nume accesibil explicit („Pornește filmul de prezentare Autoklass”), Lucide `Play` 24px strokeWidth 1.5, neutru pe suprafață semi-opacă; niciun autoplay.
- La activare (click/Enter/Space) se înlocuiește posterul cu `iframe` `https://www.youtube-nocookie.com/embed/q3q-DQcUegk?autoplay=1&rel=0&modestbranding=1`, `title` setat, `allow="accelerometer; encrypted-media; picture-in-picture"`, `allowfullscreen`, `loading="lazy"`. Zero request către Google înainte de activare.
- CTA: nu se adaugă buton umplut în această secțiune (hero păstrează unicul primary din primul viewport); dacă e nevoie de continuitate, un singur link text spre `/autoturisme` sub player.
- Reduced motion: fără tranziție de scală la activare; doar schimbul poster → iframe.

## 7. Locații DOM/cod relevante

- `src/routes/index.tsx:155–210` hero (`100svh`, `hero-copy-scrim`, `hero-rise`, `object-[62%_38%] md:object-[center_34%]`)
- `src/routes/index.tsx:172–182` H1 cu `fontSize: clamp(3rem, 5.2vw, 5.75rem)`, `lineHeight: 0.98`, `maxWidth: 13ch`
- `src/routes/index.tsx:213–224` proof rail (`dt` order-2 / `dd` order-1, `tabular-nums`)
- `src/routes/index.tsx:227–259` „De ce ai venit azi?” + ancora `#cum-functioneaza-cta`
- `src/routes/index.tsx:262–288` „Selecție din stoc”
- `src/routes/index.tsx:291–325` `#cum-functioneaza` (5 pași + 3 promisiuni)
- `src/routes/index.tsx:328–382` `#sucursale` + mărci
- `src/routes/index.tsx:385–419` FAQ + card de închidere
- `src/components/vehicle/VehicleCard.tsx:17–48` card (fără min-height pe titlu; `group-hover:scale-[1.02]`)
- `src/styles.css:215–232` `hero-copy-scrim`; `:234–250` `header-overlay-scrim`; `:252–277` `hero-rise` + kill-switch reduced motion

Wrapping exact observat: H1 pe 3 linii la 320/390/768/1440; eyebrow pe 2 linii doar la 320; copy de suport 2 linii la 320/390, 1 linie la 768/1440; titlu „Noi și rulate, în aceeași listă” 2 linii la 320, 1 linie de la 390 în sus; titlurile lungi de card vehicul 2 linii la 320/390. Overflow orizontal: **0** la toate cele patru lățimi (`scrollWidth == innerWidth`).
