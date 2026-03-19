export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
  content: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'how-to-report-pothole-halifax',
    title: 'How to Report a Pothole in Halifax (2026 Guide)',
    description:
      'Step-by-step guide to reporting potholes in Halifax Regional Municipality. Learn the fastest way to get potholes fixed on your street — whether it\'s an HRM road or a provincial highway.',
    date: '2026-03-19',
    readTime: '4 min read',
    category: 'Guide',
    content: `
Potholes are Halifax's unofficial mascot. Every spring, freeze-thaw cycles tear up roads across HRM — from Barrington Street to the Bedford Highway to rural Musquodoboit Harbour.

Here's how to actually get them fixed.

## Who Fixes Potholes in Halifax?

It depends on the road:

- **Municipal roads** (most streets in Halifax, Dartmouth, Bedford, Sackville): Report to **HRM 311** at contactus@311.halifax.ca
- **100-series highways** (102, 103, 104, 118): Report to **Nova Scotia Public Works** at TPWPAFF@novascotia.ca
- **Bus routes with damage**: Also report to **Halifax Transit** at halifax.transit@halifax.ca

Not sure which authority handles your road? That's exactly why we built SolveHFX — it figures it out automatically.

## The Fastest Way: Use SolveHFX

1. Open [solvehfx.ca/report](/report)
2. Drop a pin on the pothole location
3. Take a photo
4. Our AI identifies the issue and drafts a report
5. Hit submit — we send it to the right authority AND your district councillor

The whole process takes about 60 seconds. No account required.

## What to Include in Your Report

Whether you use SolveHFX or report directly to 311, include:

- **Exact location**: Street name, nearest intersection, or GPS coordinates
- **Photo**: Shows size and severity — a photo is worth a thousand words to a road crew
- **Size estimate**: Is it a minor crack or a tire-swallowing crater?
- **Lane position**: Is it in a driving lane, bike lane, or shoulder?
- **How long it's been there**: "Been here since January" gets more attention than "noticed today"

## Why CC Your Councillor?

HRM has 16 district councillors. When your councillor sees pothole reports from their district, it becomes a priority. Councillors have direct influence over road maintenance budgets and scheduling.

SolveHFX automatically CCs your district councillor on every report. It's accountability built into the process.

## Halifax Pothole Hotspots

Based on reports, these areas see the most pothole activity:

- **Barrington Street** (Downtown Halifax)
- **Quinpool Road** (West End)
- **Portland Street** (Dartmouth)
- **Herring Cove Road** (Spryfield)
- **Bedford Highway**
- **Sackville Drive**

## Track Your Report

After submitting through SolveHFX, your report appears on our [public map](/map). Other residents can verify they've seen the same pothole, adding community weight to the report.

---

**Ready to report a pothole?** [Submit a report now →](/report)
    `,
  },
  {
    slug: 'halifax-311-vs-solvehfx',
    title: 'Halifax 311 vs SolveHFX: What\'s the Difference?',
    description:
      'HRM 311 is the official municipal service line. SolveHFX is an independent civic tool that routes reports faster. Here\'s how they compare and why you might use both.',
    date: '2026-03-19',
    readTime: '3 min read',
    category: 'Explainer',
    content: `
Halifax residents have always had HRM 311 for reporting civic issues. So why did we build SolveHFX?

## What is HRM 311?

HRM 311 is Halifax Regional Municipality's official service request system. You can:

- **Call** 311 (within HRM)
- **Email** contactus@311.halifax.ca
- **Visit** the HRM website and fill out a form

311 handles everything from potholes to garbage collection to noise complaints. It's the official channel and it works.

## What is SolveHFX?

SolveHFX is an independent tool built by Halifax residents. It doesn't replace 311 — it makes reporting faster and adds councillor accountability.

## Key Differences

| Feature | HRM 311 | SolveHFX |
|---------|---------|----------|
| Official government service | Yes | No |
| AI photo analysis | No | Yes |
| Auto-detect issue type | No | Yes |
| CC district councillor | No | Yes |
| Smart routing (HRM/Province/Transit) | Manual | Automatic |
| Account required | Depends | No |
| Time to submit | 5-10 min | ~60 seconds |
| Community verification | No | Yes |
| Public issue map | No | Yes |

## Why Use SolveHFX?

**Speed**: Snap a photo, confirm the AI draft, submit. 60 seconds.

**Smart routing**: Don't know if your pothole is on a municipal road or a provincial highway? SolveHFX figures it out using GPS and sends the report to the right authority.

**Councillor accountability**: Every SolveHFX report goes to 311 AND your district councillor. When councillors see issues from their constituents, things move faster.

**Community power**: Reports appear on a public map. Other residents can verify issues exist or mark them as fixed. This creates a transparent record of civic issues across Halifax.

## Do They Work Together?

Yes. SolveHFX sends reports *to* 311 via email. Your report enters the same HRM system — but it also goes to your councillor, which 311 alone doesn't do.

Think of SolveHFX as a faster front door to the same system, with added transparency and accountability.

---

**Try it yourself.** [Report an issue →](/report)
    `,
  },
  {
    slug: 'find-your-halifax-district-councillor',
    title: 'Find Your Halifax District Councillor (All 16 HRM Districts)',
    description:
      'Complete guide to Halifax Regional Municipality\'s 16 districts. Find which district you live in, who your councillor is, and how to contact them about civic issues.',
    date: '2026-03-19',
    readTime: '5 min read',
    category: 'Guide',
    content: `
Halifax Regional Municipality is divided into 16 districts, each represented by a councillor on Halifax Regional Council. Your councillor is your voice at City Hall — and they should know about the issues in your neighbourhood.

## How to Find Your District

The easiest way: go to [solvehfx.ca/report](/report), drop a pin on your address, and SolveHFX will tell you your district and councillor automatically.

You can also browse all 16 districts on our [Districts page](/districts).

## Why Contact Your Councillor?

Councillors have direct influence over:

- **Road maintenance** scheduling and budgets
- **Park and recreation** improvements
- **Snow clearing** priorities
- **Development** approvals in your area
- **Community safety** initiatives

When you report an issue through SolveHFX, your councillor gets a copy. It's one of the most effective ways to get civic issues addressed — because councillors are accountable to the residents who elect them.

## All 16 HRM Districts

Visit our [Districts page](/districts) for the full list with councillor names and active report counts.

## Halifax Regional Council

The council is led by **Mayor Andy Fillmore** and consists of 16 district councillors. They meet regularly at City Hall to make decisions about municipal services, budgets, and bylaws.

## How SolveHFX Uses District Data

When you drop a pin on the map in SolveHFX, we use official HRM boundary data (from the 2024 Polling District map) to determine your exact district. This means:

1. Your report goes to the correct councillor — not a general inbox
2. The councillor sees the issue is in their jurisdiction
3. You don't need to know your district number — GPS handles it

---

**Find your councillor.** [Browse all districts →](/districts) or [report an issue →](/report)
    `,
  },
  {
    slug: 'report-graffiti-halifax',
    title: 'How to Report Graffiti in Halifax',
    description:
      'See graffiti on public or private property in Halifax? Here\'s how to report it to HRM and get it removed. Includes what to photograph and who handles removal.',
    date: '2026-03-19',
    readTime: '3 min read',
    category: 'Guide',
    content: `
Graffiti on public infrastructure, buildings, and transit stops is a common issue across Halifax. Here's how to report it and get it cleaned up.

## Who Handles Graffiti Removal?

- **Public property** (bridges, overpasses, utility boxes, park structures): **HRM 311**
- **Transit shelters and bus stops**: **Halifax Transit**
- **Private property**: The property owner is responsible, but reporting still helps

## How to Report Graffiti

### The fast way: SolveHFX
1. Go to [solvehfx.ca/report](/report)
2. Pin the location
3. Photograph the graffiti
4. AI classifies it and drafts a report
5. Submit — goes to HRM 311 + your councillor

### Direct to 311
- Email contactus@311.halifax.ca with a photo and location
- Call 311 during business hours

## What to Include

- **Clear photo** of the graffiti
- **Exact location**: Building address, street name, or landmark
- **Surface type**: Wall, fence, utility box, transit shelter
- **Offensive content**: Note if the graffiti contains hate speech or explicit imagery — these get priority removal

## Graffiti vs Street Art

Halifax has a growing street art scene, with sanctioned murals in areas like the North End and Quinpool Road. Report only **unsanctioned** graffiti — tags, vandalism, and offensive content.

If it's a clearly professional mural on a business wall, it's likely permitted.

## Response Time

HRM typically addresses graffiti reports within 5-10 business days, depending on severity and location. Offensive or hate-related graffiti is prioritized for faster removal.

---

**See graffiti?** [Report it now →](/report)
    `,
  },
  {
    slug: 'broken-streetlight-halifax',
    title: 'How to Report a Broken Streetlight in Halifax',
    description:
      'Dark street in your neighbourhood? Here\'s how to report broken or flickering streetlights in Halifax to get them fixed by HRM or Nova Scotia Power.',
    date: '2026-03-19',
    readTime: '3 min read',
    category: 'Guide',
    content: `
A broken streetlight isn't just annoying — it's a safety issue. Dark streets increase the risk of falls, collisions, and crime. Here's how to get it fixed.

## Who Fixes Streetlights?

In Halifax, streetlight ownership is split:

- **HRM-owned lights**: Report to HRM 311 (most residential streets)
- **Nova Scotia Power lights**: Report to NSP (some arterial roads and highways)

Not sure who owns the light? SolveHFX routes your report to HRM 311, which can redirect to NSP if needed.

## How to Report

### Using SolveHFX (60 seconds)
1. Go to [solvehfx.ca/report](/report)
2. Pin the streetlight location
3. Take a photo (even in the dark — showing the unlit area helps)
4. Submit — routed to HRM 311 + your councillor

### Direct to HRM
- Email contactus@311.halifax.ca
- Include the pole number if visible (usually on a metal tag on the pole)

## What to Note

- **Pole number**: Look for a metal tag or sticker on the pole — this speeds up the repair
- **Type of problem**: Completely dark, flickering, buzzing, or damaged fixture
- **How many**: Is it one light or several in a row? Multiple outages might indicate a circuit issue
- **Location**: Nearest address or intersection

## Why It Matters

Well-lit streets reduce:
- Pedestrian accidents
- Vehicle collisions at intersections
- Property crime

Your report directly improves safety for everyone in your neighbourhood.

---

**Dark street?** [Report it now →](/report)
    `,
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
