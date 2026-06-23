# Google Business Profile — SolveHFX Setup & Optimization Playbook

A step-by-step guide to getting SolveHFX a Google Business Profile (GBP) and a
strong Google presence. I can't create the profile for you (it needs your Google
account and a verification step only you can complete), so this is the playbook.

---

## 0. Eligibility — read this first

GBP is built for businesses that **serve customers in person** (a storefront, or
a service-area business that travels to customers). SolveHFX is a free online
civic tool, so a standard GBP listing may get **suspended or rejected** because
there's no in-person service.

You have two honest paths:

1. **Service-Area Business (SAB) listing** — frame SolveHFX as a free service for
   **Halifax Regional Municipality residents**, with **no storefront address**
   shown. This is the most defensible way to list it. Risk: Google may still
   flag a purely-informational site. Worth trying.
2. **Brand presence without a GBP** — instead of (or alongside) a listing, earn
   a **knowledge panel** through Organization structured data (already on the
   site), consistent citations, and Wikidata. Lower risk, slower payoff.

Recommendation: **attempt the SAB listing** (Step 1–4 below). If it's suspended,
fall back to the brand-presence track (Step 8). Don't fake a physical address —
a suspension is harder to recover from than never listing.

---

## 1. Create the profile

1. Go to **google.com/business** and sign in with the Google account you want to
   own this (use a dedicated one, e.g. `hello@solvehfx.ca` or your Huddy account —
   not a throwaway).
2. **Business name:** `SolveHFX` (exactly — no keyword stuffing like
   "SolveHFX Halifax Pothole Reporting". Google penalizes that.)
3. When asked "Do you want to add a location customers can visit?" → **No**.
4. **Service area:** add `Halifax, Nova Scotia` plus `Dartmouth`, `Bedford`,
   `Sackville` (and any HRM communities you want to surface for).

## 2. Category

- **Primary category:** the closest fit is limited — try **"Government office"**
  is *not* appropriate (you're not government). Better options to test:
  - `Software company` (most accurate — you built a web app), or
  - `Non-profit organization` (if you position it that way), or
  - `Reporting service` / `Consultant` if those appear.
- **Don't** claim a government/municipal category — that invites suspension and
  misrepresents the tool (you already disclaim "not affiliated with HRM").
- Add 1–2 **secondary categories** if relevant (e.g. `Website designer` ties to
  Huddy Digital if you co-brand).

## 3. Contact + links

- **Website:** `https://www.solvehfx.ca`
- **Phone:** a real number you'll answer (Google may verify via it).
- **Appointment/booking link:** point to `https://www.solvehfx.ca/report` so the
  primary CTA is "report an issue."

## 4. Verification

- Google will offer verification by **phone, email, video, or postcard**. For a
  service-area business with no address, expect **video verification** (a short
  recording proving you operate the business). Have ready: the live site on a
  screen, your phone/laptop, and be able to show the `/report` flow.
- This is the step that decides approval. If it's rejected, go to Step 8.

---

## 5. Fill the profile out completely (this is the ranking work)

Completeness + freshness is ~80% of local ranking. Do all of it:

- **Description (750 chars):** lead with what it does and who it's for. Draft:
  > SolveHFX is a free tool for Halifax residents to report civic issues —
  > potholes, broken streetlights, graffiti, illegal dumping, and more. Snap a
  > photo and our AI drafts a formal report, then sends it straight to HRM 311
  > and your district councillor in about 60 seconds. No account needed. Built by
  > Halifax residents, for Halifax. Independent — not affiliated with HRM.
- **Logo + cover photo:** use the SolveHFX pin logo (`public/` assets) and the
  Halifax waterfront hero shot.
- **Photos:** add 5–10 — screenshots of the report flow, the issue map, a couple
  of resolved-issue examples. Listings with photos get materially more clicks.
- **Services:** add each as a service with a short blurb — "Report a pothole,"
  "Report graffiti," "Report a broken streetlight," "Track a report," "Issue
  map." (These map nicely to your existing categories.)
- **Attributes:** "Online appointments," "Identifies as…" if applicable,
  "Free."
- **Opening hours:** if it's a 24/7 online tool, set **Open 24 hours**.
- **Q&A:** seed 3–5 questions yourself (you can ask and answer your own):
  - "Is SolveHFX free?" → Yes, completely free, no account needed.
  - "Who gets my report?" → HRM 311 and your district councillor.
  - "Is it anonymous?" → Yes, anonymous by default; sharing your name/email is
    optional.

## 6. Google Posts (ongoing — weekly)

Post weekly; it keeps the profile "active" and shows in the panel:
- **Milestones:** "SolveHFX just passed 50 reports for Halifax."
- **Tips:** "How to report a pothole on the Bedford Highway."
- **Seasonal:** "Spring pothole season — report yours in 60 seconds."
- Always end with a **"Report an issue" button** linking to `/report`.

Reuse your blog posts (`/blog`) — each one is a ready-made Google Post.

## 7. Reviews

- You can't really collect "customer" reviews for a free civic tool, and don't
  fabricate them. If genuine users want to leave feedback, great — but don't make
  reviews the strategy here. Focus on Posts, photos, and completeness.

---

## 8. Fallback / parallel track — brand presence without a GBP

Do these regardless; they help even if the GBP is approved:

1. **Organization structured data** — already shipped in the site
   (`src/app/layout.tsx` has `Organization` + `WebApplication` JSON-LD). Keep
   `sameAs` pointing at your real social profiles.
2. **Consistent NAP/citations** — list SolveHFX the same way everywhere (name,
   site URL, Halifax). Add it to relevant Halifax/Nova Scotia civic and startup
   directories.
3. **Wikidata entry** — create a Wikidata item for SolveHFX (notability
   permitting) to feed Google's Knowledge Graph.
4. **Social profiles** — claim `x.com/SolveHFX`, `instagram.com/SolveHFX`,
   `facebook.com/SolveHFX` (already referenced in the footer) and keep them
   active so the `sameAs` links resolve.
5. **Press** — the CBC piece (if it runs) is a strong authoritative citation;
   make sure it links to `www.solvehfx.ca`.

---

## Quick checklist

- [ ] Decide: SAB listing attempt vs brand-presence-only
- [ ] Create profile at google.com/business as `SolveHFX`
- [ ] Service area = HRM (Halifax, Dartmouth, Bedford, Sackville), no address
- [ ] Pick a truthful category (Software company / Non-profit) — never "government"
- [ ] Website → `www.solvehfx.ca`, CTA link → `/report`
- [ ] Complete verification (likely video)
- [ ] Description, logo, cover, 5–10 photos, services, 24h hours, seeded Q&A
- [ ] Weekly Google Posts (recycle blog content)
- [ ] Claim social handles so footer `sameAs` links resolve
- [ ] Keep Organization JSON-LD accurate

> Reality check: a purely-online civic tool is a borderline GBP case. If it gets
> suspended, that's expected — pivot to the brand-presence track rather than
> fighting it with a fake address.
