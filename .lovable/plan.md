# Autoklass redesign — plan consolidat (audit + addendum + GitHub Pages)

Două întrebări, două secțiuni.

---

## 1. Ce se păstrează din planul meu inițial (fiindcă răspunde direct auditului)

### Se păstrează (obligatoriu, are acoperire în audit/addendum)

| Element | Cerința din audit/addendum pe care o acoperă |
|---|---|
| Mobile-first pe fluxul Service | Gap-ul de conversie 3.65% mobil vs 11.60% desktop — cel mai mare câștig |
| Home „De ce ai venit azi?” (mașină / service / daună) | Reducerea arborelui de navigație la 3 intenții reale |
| Stoc unificat Nou + Rulat în aceeași listă, cu filtre | Recomandarea de arhitectură din addendum |
| Zero preț „la cerere”, preț + TVA + sucursală mereu vizibile | Frica #1: prețul necunoscut |
| „Ce e verificat” (listă concretă, nu slogan) pe PDP | Frica #4/#5: garanție + transparență istoric |
| SLA scris (răspuns în max 2h, program menționat) | Frica #3: lipsa update-urilor |
| Test Drive vs. Consultant ca acțiuni distincte | Intenții diferite = formulare diferite, nu un „Contact” generic |
| Programare service în 3 pași + estimare cost orientativă + mașină de schimb | Frica #1 și #3 pe after-sales; ton „previzibil, controlat” |
| Dosar daună cu pași, durate, documente, asiguratori reali, FAQ | Reducerea fricii de birocrație; conținut preluat de pe site |
| Interdicție totală urgență falsă (fără „X persoane văd acum”, fără countdown) | Constrângere explicită din addendum (probleme de încredere în recenzii) |
| Ton diferențiat: premium/informativ Mercedes, direct pe segment de preț, predictibil pe after-sales | Addendum, capitolul de tonalitate |
| Design system germanic (grafit/argintiu, accent albastru, fonturi MBCorpo) + assets reale | Consistență de brand, credibilitate percepută |
| Bară fixă de conversie pe mobil (Sună / Programare / preț pe PDP) | Conversie mobilă |

### Se elimină din planul meu inițial (nu are suport în audit sau contrazice addendumul)

- Pagini separate Consultanți, Buy-back, Contact la primul run — în afara scopului celor 6 ecrane cerute de tine.
- Checkbox-uri GDPR / consimțământ în formularele de prototip — frecare inutilă în prototip.
- Orice element de scarcity/urgență, badge-uri „hot deal”, contoare de vizionări.
- Coș / checkout ecommerce real — site-ul e lead-gen cu vitrină de stoc, nu magazin.

### Ce lipsește încă față de audit (candidați pentru runul 2)

1. **Formular de daună cu upload foto** (poze avarie + talon) — cerut implicit în audit, imposibil fără backend pe GitHub Pages (vezi secțiunea 2).
2. **Comparator de mașini** și **salvare favorite** — reduc frica de decizie, pur client-side, deci compatibile Pages.
3. **Pagină „Cum verificăm o mașină rulată”** — landing dedicat pentru frica de istoric.
4. **Confirmare post-submit cu ce urmează, minut cu minut** (nu doar „mulțumim”) — direct pe frica #3.

---

## 2. Compatibilitate cu GitHub Pages

### Situația actuală
Proiectul rulează pe TanStack Start cu SSR (Cloudflare Worker). GitHub Pages servește **doar fișiere statice** — nu execută cod pe server. Vestea bună: prototipul actual **nu are nicio funcție de server** (toate datele sunt în `src/data/*.ts`, formularele sunt local state). Deci nu e nevoie de schimbare de framework, doar de mod de build.

### Tehnologia de integrat: prerender static (SSG) + workflow GitHub Actions

1. **Prerender toate rutele la build.** Se activează prerendering-ul TanStack Start cu urmărire de link-uri, plus lista explicită de slug-uri generată din `src/data/vehicles.ts`, ca fiecare mașină să aibă un HTML propriu. Rezultat: `dist/` cu HTML static per rută — indexabil, fără server.
2. **Fallback pentru deep-link-uri:** copiere `index.html` → `404.html` în output. GitHub Pages servește `404.html` pentru orice cale necunoscută, iar routerul preia navigarea în client. Fără asta, refresh pe `/autoturisme/clasa-c-200` dă 404.
3. **`base` path:** dacă site-ul stă la `user.github.io/autoklass`, se setează base-ul `/autoklass/` în config (altfel CSS/JS/imagini cad). Cu domeniu propriu sau repo `user.github.io`, base rămâne `/`.
4. **`.nojekyll`** în `public/` — altfel Jekyll ignoră folderele care încep cu `_` (Vite generează așa assets).
5. **Workflow `.github/workflows/deploy.yml`:** build la push pe `main` → publicare artifact pe Pages. Un singur fișier, zero configurare manuală după.
6. **Formulare fără backend:** pe Pages nu există endpoint. Trei opțiuni, alegi tu:
   - **A. Serviciu extern de formulare** (Formspree / Basin / Web3Forms): funcționează 100% static, primești lead-urile pe email. Recomandat pentru prototip.
   - **B. `mailto:` + WhatsApp/telefon** ca acțiune primară: zero dependințe, dar conversie mai slabă.
   - **C. Fără trimitere reală** (doar ecran de confirmare) — bun strict pentru demo de UX.
   - Upload de poze la dosarul de daună funcționează doar cu varianta A (și doar cu servicii care acceptă atașamente).

### Ce pierdem prin GitHub Pages
- Fără funcții de server → fără stoc dinamic din API/DB, fără trimitere proprie de email, fără log de lead-uri.
- Stocul rămâne conținut static (regenerat la fiecare build).
- Recomandare: **păstrăm ambele ținte** — Pages pentru demo/prezentare, iar Lovable (SSR + backend) pentru versiunea funcțională cu lead-uri reale. Codul e același; diferă doar build-ul.

---

## Ce fac la primul run pe build (după aprobare)

1. Activez prerender static + `404.html` + `.nojekyll` + workflow GitHub Actions.
2. Adaug varianta aleasă de formulare (implicit: A, cu cheia serviciului ca variabilă publică).
3. Livrez cele 4 completări din „ce lipsește” care sunt compatibile static: comparator, favorite, pagina de verificare mașini rulate, confirmare post-submit detaliată.

Confirmă: (a) unde stă site-ul pe Pages — repo dedicat, `user.github.io`, sau domeniu propriu; (b) varianta de formulare A/B/C.
