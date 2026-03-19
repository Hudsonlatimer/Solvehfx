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
  {
    slug: 'worst-roads-halifax-2026',
    title: 'The Worst Roads in Halifax (2026): Where Potholes Are Taking Over',
    description:
      'A look at the most pothole-ridden roads in Halifax Regional Municipality in 2026. From Barrington Street to the Bedford Highway, these roads need your reports.',
    date: '2026-03-19',
    readTime: '5 min read',
    category: 'Feature',
    content: `
Every spring, Halifax drivers play the same game: dodge the potholes or pay for new tires. After another brutal freeze-thaw season, here are the roads getting the most complaints in 2026.

## The Usual Suspects

### Barrington Street (Downtown Halifax)
Halifax's main artery is also its most battered. Between Spring Garden Road and the ferry terminal, Barrington is a minefield of crumbling asphalt. Heavy bus traffic and aging infrastructure make this a perennial problem.

### Quinpool Road
From the Rotary to Oxford Street, Quinpool takes a beating every winter. The mix of bus routes, delivery trucks, and high traffic volume turns small cracks into craters fast.

### Portland Street (Dartmouth)
Dartmouth's busiest commercial strip sees constant road damage, especially near the intersections with Alderney Drive and Pleasant Street.

### Herring Cove Road (Spryfield)
One of the longest roads in HRM, Herring Cove Road has stretches that feel like an obstacle course. The section between Purcell's Cove Road and the Spryfield roundabout is particularly rough.

### Bedford Highway
The commuter corridor between Bedford and Halifax proper is notorious for road damage, especially near the railway crossings and along the waterfront sections.

### Sackville Drive
Heavy suburban traffic and aging pavement make Sackville Drive a hotspot for road damage every spring.

### Larry Uteck Boulevard
Despite being relatively new, Larry Uteck sees heavy traffic from the growing Bedford West community and develops issues quickly.

### Gottingen Street (North End)
A vital North End corridor, Gottingen Street has sections with persistent road damage, particularly between Cunard and Young Street.

## Why Do Halifax Roads Get So Bad?

Halifax has a uniquely destructive combination:

- **Freeze-thaw cycles**: Halifax averages 80+ freeze-thaw days per year — water seeps into cracks, freezes, expands, and breaks the road apart
- **Salt damage**: Road salt is essential for safety but accelerates pavement breakdown
- **Heavy vehicle traffic**: Buses, delivery trucks, and construction vehicles pound already-weakened surfaces
- **Aging infrastructure**: Many HRM roads are past their intended lifespan

## What Can You Do?

Report every pothole you see. Seriously — HRM prioritizes repairs partly based on volume of complaints. One report might wait. Ten reports from different residents on the same road get attention.

### How to report:
1. Go to [solvehfx.ca/report](/report)
2. Drop a pin on the pothole
3. Snap a photo
4. Submit — it goes to HRM 311 AND your councillor

The more reports a road gets, the more likely it moves up the repair priority list.

## Track the Problem

Visit our [Issue Map](/map) to see where potholes are being reported across Halifax. You can filter by category and district to see hotspots in your area.

---

**Spotted a pothole?** [Report it now →](/report)
    `,
  },
  {
    slug: 'snow-clearing-complaints-halifax',
    title: 'How to Complain About Snow Clearing in Halifax',
    description:
      'Sidewalk buried? Street not plowed? Here\'s how to report snow clearing issues in Halifax to HRM 311 and your councillor — and actually get results.',
    date: '2026-03-19',
    readTime: '4 min read',
    category: 'Guide',
    content: `
Halifax gets an average of 180 cm of snow per year. When the plows can't keep up — or skip your street entirely — you need to know how to escalate.

## Who Handles Snow Clearing in HRM?

- **Municipal roads and sidewalks**: HRM Public Works
- **Provincial highways** (100-series): Nova Scotia Department of Public Works
- **Private property** (parking lots, driveways): Property owners
- **Bus stops and transit shelters**: Halifax Transit

## What to Report

### Streets
- Street not plowed within the priority timeline
- Plow left a massive windrow blocking your driveway
- Ice buildup not treated with salt/sand
- Dangerous conditions at intersections

### Sidewalks
- Sidewalk not cleared within 24 hours after snowfall ends
- Ice-covered sidewalks with no treatment
- Blocked wheelchair ramps and crosswalks
- Snow pushed from roads onto sidewalks

### Other
- Bus stops buried in snow
- Fire hydrants blocked by plowed snow
- Pedestrian signals hidden by snow banks

## HRM Snow Clearing Priorities

HRM clears roads in priority order:

- **Priority 1**: Major arterial roads, bus routes, hospital access, emergency routes — cleared first during and after storms
- **Priority 2**: Collector roads connecting neighbourhoods
- **Priority 3**: Residential streets — cleared last, can take 24-48 hours after storm ends

Sidewalks follow a similar priority system, with main pedestrian routes cleared first.

## How to Report Snow Issues

### Using SolveHFX
1. Go to [solvehfx.ca/report](/report)
2. Select "Snow / Ice" category (or let AI detect it from your photo)
3. Drop a pin on the problem location
4. Take a photo showing the conditions
5. Submit — goes to HRM 311 + your councillor

### Direct to HRM
- Email contactus@311.halifax.ca
- Call 311

## Why CC Your Councillor?

Snow clearing complaints are one of the top issues councillors hear about. When your councillor sees multiple snow complaints from their district, they can:

- Push for your street to be moved up in priority
- Advocate for more resources in your area
- Follow up directly with Public Works

SolveHFX automatically CCs your councillor on every report.

## Tips for Effective Snow Complaints

- **Be specific**: "200 block of Main Street" is better than "my street"
- **Note the timeline**: "It's been 48 hours since the storm ended and our street hasn't been touched"
- **Photo the conditions**: Show snow depth, ice coverage, blocked access
- **Mention safety hazards**: Blocked fire hydrants, wheelchair ramps, school zones

---

**Street not plowed?** [Report it now →](/report)
    `,
  },
  {
    slug: 'illegal-dumping-halifax-how-to-report',
    title: 'How to Report Illegal Dumping in Halifax',
    description:
      'Found trash, furniture, or construction waste illegally dumped in Halifax? Here\'s how to report it and get it cleaned up through HRM 311.',
    date: '2026-03-19',
    readTime: '3 min read',
    category: 'Guide',
    content: `
Illegal dumping is a growing problem in Halifax — from mattresses left on the sidewalk to construction waste dumped in wooded areas. Here's how to deal with it.

## Common Types of Illegal Dumping in Halifax

- **Furniture and appliances** left on sidewalks or in parks
- **Construction debris** (drywall, lumber, concrete) dumped in wooded areas
- **Bags of household garbage** left outside collection schedule
- **Tires** dumped on roadsides or in ditches
- **Yard waste** dumped in ravines or near waterways

## Where It Happens Most

- Back lanes in the North End and South End
- Wooded areas near new developments in Bedford and Sackville
- Rural roads in Musquodoboit, Porters Lake, and the Eastern Shore
- Near community recycling centres and donation bins
- Construction sites and vacant lots

## How to Report

### Using SolveHFX (fastest)
1. Go to [solvehfx.ca/report](/report)
2. Select "Illegal Dumping" or take a photo and let AI identify it
3. Pin the exact location
4. Submit — goes to HRM 311 + your councillor

### Direct to HRM
- Email contactus@311.halifax.ca with photos and location
- Call 311

### For hazardous materials
If you find **chemical drums, paint cans, asbestos, or other hazardous waste**, call HRM 311 immediately and mention it's hazardous. These get priority response.

## What to Include in Your Report

- **Photos**: Show the type and amount of waste
- **Location**: Be as specific as possible — address, nearest intersection, or landmark
- **Size**: "A few bags of garbage" vs "a truck-load of construction debris"
- **When you noticed it**: Helps HRM track repeat offenders
- **Any identifying information**: If you see company names on packaging or materials, include them (helps with enforcement)

## What Happens After You Report

HRM's Solid Waste department dispatches cleanup crews for public property. Response time varies:

- **Hazardous materials**: 1-2 business days (priority)
- **Large dumps on public land**: 3-7 business days
- **Smaller items on sidewalks**: 5-10 business days

For private property, HRM may issue a notice to the property owner to clean up.

## Prevention

HRM offers free large-item pickup several times a year — check the HRM website for your collection area's schedule. The Halifax Recycling Centre also accepts large items and construction waste.

---

**Found illegal dumping?** [Report it now →](/report)
    `,
  },
  {
    slug: 'halifax-sidewalk-repair-report',
    title: 'Cracked or Damaged Sidewalk in Halifax? How to Get It Fixed',
    description:
      'Broken, heaved, or crumbling sidewalks in Halifax are a safety hazard. Here\'s how to report sidewalk damage to HRM and get repairs scheduled.',
    date: '2026-03-19',
    readTime: '3 min read',
    category: 'Guide',
    content: `
A cracked or heaved sidewalk is more than an eyesore — it's a tripping hazard, especially for seniors, people with mobility issues, and parents with strollers. Here's how to get it fixed.

## Common Sidewalk Problems

- **Heaving**: Tree roots or frost push concrete slabs up, creating uneven surfaces and trip hazards
- **Cracking**: Freeze-thaw cycles split concrete into pieces
- **Crumbling edges**: Pavement deteriorates along the edges where it meets grass or road
- **Missing sections**: Gaps where sidewalk has been removed but not replaced
- **Pooling water**: Low spots collect water and freeze into ice patches in winter

## Who Fixes Sidewalks?

**HRM Public Works** handles all municipal sidewalk repairs. This includes:
- Residential neighbourhood sidewalks
- Downtown pedestrian areas
- Multi-use pathways (like the Halifax Harbour trail sections maintained by HRM)

## How to Report

1. Go to [solvehfx.ca/report](/report)
2. Select "Sidewalk Damage" category
3. Pin the exact location
4. Photograph the damage — include something for scale (a shoe, a coin)
5. Submit — goes to HRM 311 + your councillor

## What Makes a Good Report

- **Location precision**: "North side of Inglis Street, between Barrington and South Park" is much more useful than "Inglis Street"
- **Photo with scale**: Shows how severe the heaving or crack actually is
- **Accessibility impact**: Mention if the damage blocks wheelchair or stroller access — these get prioritized
- **Safety incidents**: If someone has tripped or fallen, mention it

## Priority Factors

HRM prioritizes sidewalk repairs based on:

- **Severity**: Large heaves and complete breaks rank higher
- **Pedestrian volume**: Downtown and school zones get priority
- **Accessibility**: Issues blocking wheelchair access are prioritized
- **Number of reports**: More reports = higher priority (this is why reporting matters!)

## Temporary Fixes

While waiting for permanent repairs, HRM sometimes applies:
- Asphalt patches to fill gaps
- Grinding to level minor heaves
- Spray paint markings to warn pedestrians

If you see temporary markings but the issue persists for months, report it again.

---

**Dangerous sidewalk?** [Report it now →](/report)
    `,
  },
  {
    slug: 'halifax-transit-complaints',
    title: 'How to Report Halifax Transit Issues (Bus Stops, Shelters, Service)',
    description:
      'Damaged bus stop, missing shelter, or transit service complaint in Halifax? Here\'s how to report Halifax Transit issues and who handles what.',
    date: '2026-03-19',
    readTime: '3 min read',
    category: 'Guide',
    content: `
Halifax Transit serves over 60,000 riders daily across buses, ferries, and Access-A-Bus. When something's broken or service falls short, here's how to report it.

## What You Can Report

### Infrastructure
- **Damaged bus shelters**: Broken glass, missing panels, graffiti
- **Bus stop sign issues**: Missing, broken, or incorrect signage
- **Bench damage**: Broken or missing benches at stops
- **Accessibility problems**: Broken ramps, blocked wheelchair areas, missing tactile strips
- **Lighting issues**: Dark bus stops that need illumination

### Service
- **Missed stops**: Bus drove past without stopping
- **Schedule issues**: Bus consistently early or late
- **Driver complaints**: Safety concerns, accessibility refusals
- **Route concerns**: Dangerous stop locations, missing connections
- **Overcrowding**: Routes consistently at capacity

## Who Handles What

- **Bus stop infrastructure** (shelters, signs, benches): Halifax Transit maintenance
- **Service complaints**: Halifax Transit customer service
- **Roads near bus stops** (potholes, drainage): HRM 311
- **Provincial bus routes**: Contact the province directly

## How to Report

### Using SolveHFX
1. Go to [solvehfx.ca/report](/report)
2. Select "Bus Stop Issue" or "Transit Complaint"
3. Pin the stop location
4. Take a photo if it's infrastructure damage
5. Submit — routed to Halifax Transit + your councillor

### Direct to Halifax Transit
- Email: halifax.transit@halifax.ca
- Phone: 311 (within HRM)
- Include the **route number** and **stop number** (found on the bus stop sign or Google Maps)

## Tips for Effective Transit Reports

- **Include the stop number**: Every Halifax Transit stop has a 4-digit number on the sign — this helps them locate it instantly
- **Note the route number**: For service complaints, include which bus route
- **Mention the time**: "Route 1, 8:15 AM departure from Mumford Terminal" helps them investigate
- **Photo the damage**: For infrastructure issues, a photo speeds up the repair ticket

## Transit Accessibility

Halifax Transit is required to maintain accessible stops and services. If you encounter an accessibility barrier:

- Broken wheelchair ramp on a bus
- Blocked accessible seating area
- Bus stop without a concrete pad
- Missing audible announcements

Report it — these issues get elevated priority.

---

**Transit issue?** [Report it now →](/report)
    `,
  },
  {
    slug: 'abandoned-vehicles-halifax',
    title: 'How to Report an Abandoned Vehicle in Halifax',
    description:
      'See a car that hasn\'t moved in weeks on your Halifax street? Here\'s how to report abandoned vehicles to HRM bylaw enforcement and what happens next.',
    date: '2026-03-19',
    readTime: '3 min read',
    category: 'Guide',
    content: `
An abandoned vehicle on your street is more than an eyesore — it takes up parking, can leak fluids, and attracts vandalism. Here's how to get it dealt with in Halifax.

## What Counts as Abandoned?

Under HRM bylaws, a vehicle may be considered abandoned if it:

- Has been parked in the same spot on a public street for an **extended period** (typically 72+ hours without moving)
- Appears **inoperable**: flat tires, broken windows, missing plates
- Has **no licence plates** or expired registration
- Is **clearly derelict**: rusted, damaged beyond repair, collecting debris

## How to Report

### Using SolveHFX
1. Go to [solvehfx.ca/report](/report)
2. Select "Abandoned Vehicle"
3. Pin the location on the map
4. Photo the vehicle (include the licence plate if visible)
5. Submit — goes to HRM 311 + your councillor

### Direct to HRM
- Email contactus@311.halifax.ca
- Call 311
- Include: location, vehicle description (make, model, colour), licence plate if visible, how long it's been there

## What Happens After You Report

1. **HRM Bylaw Enforcement** investigates the report
2. If confirmed abandoned, they **tag the vehicle** with a notice giving the owner a deadline to move it (usually 48-72 hours)
3. If not moved, HRM arranges for **towing and impoundment**
4. The owner has a set period to claim the vehicle and pay fees
5. Unclaimed vehicles are eventually auctioned or scrapped

## What NOT to Report

- A car legally parked that you just don't like
- Vehicles parked during snow bans (report these as snow ban violations instead)
- Cars on private property (HRM can only act on public streets and municipal property)

## On Private Property?

If an abandoned vehicle is on **private property** (apartment parking lot, commercial lot), HRM bylaw can't act directly. The property owner needs to arrange removal. You can still report it — HRM may contact the property owner.

## Timeline

Expect 1-2 weeks from report to resolution, depending on:
- How quickly bylaw officers can investigate
- Whether the owner responds to the notice
- Towing company availability

Multiple reports from different residents speed things up.

---

**Abandoned vehicle?** [Report it now →](/report)
    `,
  },
  {
    slug: 'halifax-noise-complaint-guide',
    title: 'How to File a Noise Complaint in Halifax',
    description:
      'Construction at 6 AM? Party at 2 AM? Here\'s how to file a noise complaint in Halifax and what HRM\'s noise bylaws actually say.',
    date: '2026-03-19',
    readTime: '4 min read',
    category: 'Guide',
    content: `
Living in a growing city means noise. But there are limits — and Halifax has bylaws to enforce them. Here's what you need to know.

## Halifax Noise Bylaws

HRM's Noise Bylaw (N-200) restricts excessive noise at certain times:

### Residential Areas
- **Quiet hours**: 11:00 PM to 7:00 AM (Sunday-Thursday), 11:00 PM to 8:00 AM (Friday-Saturday)
- During quiet hours, noise that can be heard from another dwelling is a violation

### Construction Noise
- **Permitted hours**: Monday-Friday 7:00 AM to 9:00 PM, Saturday 8:00 AM to 5:00 PM
- **No construction on Sundays or holidays** (with some exceptions for emergency work)
- Special permits can extend hours for specific projects

### Other Common Sources
- **Barking dogs**: Continuous or repeated barking is a bylaw violation anytime
- **Vehicle alarms**: Alarms sounding for more than 10 minutes
- **Amplified music**: Outdoor concerts and events need permits
- **Lawn equipment**: Restricted during quiet hours

## How to Report

### During quiet hours (urgent)
- Call **HRM Bylaw Enforcement**: 311 (non-emergency)
- For truly disruptive noise at night, you can call **Halifax Regional Police non-emergency**: 902-490-5020

### Non-urgent reports
1. Go to [solvehfx.ca/report](/report)
2. Select "Noise Complaint"
3. Pin the source location (approximate is fine)
4. Describe the noise type, duration, and frequency
5. Submit — goes to HRM 311 + your councillor

### Construction violations
If construction is happening outside permitted hours:
- Document the date and time
- Photograph the work if safely possible
- Report to 311 or through SolveHFX

## What to Include

- **Type of noise**: Music, construction, barking, machinery, etc.
- **Time and duration**: "Started at 6:30 AM, ongoing for 2 hours"
- **Frequency**: "Every Saturday morning" vs "one-time event"
- **Location**: Address or business name of the noise source
- **Impact**: "Can hear it through closed windows in my apartment"

## What Happens Next

- **First-time offences**: Usually a warning from bylaw enforcement
- **Repeat offences**: Fines ranging from $200 to $10,000 depending on severity
- **Construction violations**: Can result in stop-work orders
- **Chronic issues**: Councillor involvement can escalate enforcement

## Tips

- **Document a pattern**: Single incidents are hard to enforce. If it's recurring, log dates and times
- **Be specific**: "loud music" is vague — "bass from amplified music audible inside my unit with windows closed" is actionable
- **Multiple reports help**: If neighbours are also affected, encourage them to report separately. Volume of complaints gets attention

---

**Noise problem?** [Report it now →](/report)
    `,
  },
  {
    slug: 'report-park-issues-halifax',
    title: 'How to Report Park Issues in Halifax (Playgrounds, Trails, Damage)',
    description:
      'Broken playground equipment, damaged trails, or vandalism in a Halifax park? Report it to HRM and get it fixed. Covers all HRM parks and green spaces.',
    date: '2026-03-19',
    readTime: '3 min read',
    category: 'Guide',
    content: `
Halifax has over 850 parks and green spaces, from Point Pleasant Park to the Halifax Common to tiny neighbourhood playgrounds. When something's broken or damaged, here's how to report it.

## What to Report

### Playground Equipment
- Broken swings, slides, climbing structures
- Missing safety surfacing (rubber mulch or tiles)
- Damaged fencing around playgrounds
- Sharp edges or exposed hardware

### Trails and Paths
- Fallen trees blocking trails
- Washed-out or eroded sections
- Damaged boardwalks or bridges
- Missing or damaged trail markers

### Park Infrastructure
- Broken benches or picnic tables
- Damaged fencing or gates
- Overflowing garbage cans or missing bins
- Vandalism and graffiti on structures
- Broken or missing lighting

### Natural Hazards
- Dangerously leaning trees
- Flooding or standing water in play areas
- Invasive species overgrowth blocking paths
- Erosion threatening infrastructure

## How to Report

1. Go to [solvehfx.ca/report](/report)
2. Select "Parks Issue"
3. Drop a pin on the exact location within the park
4. Photo the damage
5. Submit — goes to HRM 311 + your councillor

## Priority Issues

Some park issues get urgent attention:

- **Broken playground equipment** (child safety) — report immediately
- **Fallen trees blocking roads or paths** — cleared within 24-48 hours
- **Flooding in play areas** — addressed before next use
- **Dangerous leaning trees** — assessed by arborist

## Popular Halifax Parks

These parks see the most use and therefore the most wear:

- **Point Pleasant Park**: Halifax's crown jewel — trails, beaches, monuments
- **Halifax Common**: Sports fields, playgrounds, the Oval
- **Shubie Park**: Dartmouth's largest park with the canal trail
- **Long Lake Provincial Park**: Hiking trails and swimming
- **Sullivan's Pond**: Dartmouth's iconic duck pond
- **Needham Community Park**: North End neighbourhood park

## Off-Leash Dog Parks

Halifax has designated off-leash areas. Common issues include:
- Damaged fencing allowing dogs to escape
- Overflowing waste bins
- Ground erosion from heavy use
- Missing or broken gates

Report these the same way — HRM maintains off-leash areas.

---

**Park issue?** [Report it now →](/report)
    `,
  },
  {
    slug: 'bike-lane-issues-halifax',
    title: 'How to Report Bike Lane Issues in Halifax',
    description:
      'Blocked bike lane, damaged cycling infrastructure, or unsafe conditions for cyclists in Halifax? Here\'s how to report bike lane issues to HRM.',
    date: '2026-03-19',
    readTime: '3 min read',
    category: 'Guide',
    content: `
Halifax has been expanding its cycling infrastructure, but problems still arise. Whether it's a blocked lane, damaged surface, or missing signage, here's how to get it fixed.

## Common Bike Lane Issues

- **Debris in bike lanes**: Glass, gravel, fallen branches, litter
- **Pavement damage**: Potholes, cracks, and uneven surfaces in cycling lanes
- **Blocked lanes**: Vehicles parked or stopped in bike lanes
- **Missing or damaged bollards**: Flex posts that separate bike lanes from traffic
- **Faded lane markings**: Paint worn away making lanes unclear
- **Drainage issues**: Water pooling in bike lanes
- **Snow clearing**: Bike lanes not cleared after snowfall
- **Signal issues**: Bike signals not functioning properly

## Key Halifax Cycling Routes

- **South Park Street / University Avenue**: Protected bike lane connecting downtown to the universities
- **Hollis Street**: Downtown cycling corridor
- **Agricola Street**: North End connection
- **Barrington Greenway**: Multi-use path through the south end
- **Macdonald Bridge bikeway**: Connects Halifax and Dartmouth
- **Dartmouth waterfront trail**: Multi-use path along the harbour

## How to Report

### Using SolveHFX
1. Go to [solvehfx.ca/report](/report)
2. Select "Bike Lane Issue"
3. Pin the exact location
4. Photo the problem
5. Submit — goes to HRM 311 + your councillor

### For immediate safety hazards
If there's a serious safety hazard (large pothole in a bike lane, missing manhole cover), call 311 directly for faster response.

## Why Report Bike Lane Issues?

Every report creates a record. HRM uses this data to:

- Prioritize maintenance on cycling routes
- Justify funding for cycling infrastructure improvements
- Identify problem areas that need redesign
- Track seasonal issues (snow clearing compliance)

The more reports cyclists submit, the stronger the case for better infrastructure.

## Cycling Advocacy in Halifax

Local cycling advocacy groups like the Halifax Cycling Coalition work to improve cycling infrastructure. Your SolveHFX reports create public data that supports their advocacy work.

---

**Bike lane issue?** [Report it now →](/report)
    `,
  },
  {
    slug: 'halifax-water-sewer-issues',
    title: 'How to Report Water and Sewer Issues in Halifax',
    description:
      'Water main break, sewer backup, flooding, or drainage problem in Halifax? Here\'s who to call and how to report water infrastructure issues in HRM.',
    date: '2026-03-19',
    readTime: '4 min read',
    category: 'Guide',
    content: `
Water and sewer issues can be urgent. Here's how to handle everything from a burst water main to a clogged storm drain in Halifax.

## Emergency vs Non-Emergency

### Emergencies (call immediately)
- **Water main break**: Water gushing from the ground or road — call Halifax Water at **902-420-9287** (24/7)
- **Sewer backup into your home**: Call Halifax Water emergency line
- **Flooding threatening property**: Call 311 or 911 if dangerous

### Non-Emergency (report through SolveHFX or 311)
- Storm drain blocked by leaves or debris
- Standing water on roads after rain
- Slow drainage in gutters
- Minor water leaks from infrastructure
- Catch basins not draining

## Who Handles What

- **Halifax Water**: Water mains, sewer mains, wastewater treatment, water quality
- **HRM Public Works**: Storm drains, ditches, road drainage, culverts
- **Property owner**: Private sewer laterals (the pipe from your house to the main)

## How to Report Non-Emergency Issues

1. Go to [solvehfx.ca/report](/report)
2. Select "Water / Flooding" or "Water / Sewer"
3. Pin the location
4. Photo the issue (standing water, blocked drain, visible leak)
5. Submit — goes to HRM 311 + your councillor

## Common Issues by Season

### Spring
- Flooding from snowmelt overwhelming storm drains
- Frost heave damaging water service connections
- Blocked catch basins from winter sand and debris

### Summer
- Low water pressure during high-demand periods
- Storm drains blocked by leaves and grass clippings
- Construction damaging water/sewer lines

### Fall
- Leaf buildup blocking storm drains (very common!)
- Increased sewer backups from root infiltration

### Winter
- Frozen water services
- Ice blocking storm drain outflows
- Water main breaks from frost penetration

## Preventing Sewer Backups

Halifax Water recommends:
- Never pour grease or cooking oil down the drain
- Don't flush wipes (even "flushable" ones)
- Install a backwater valve if you're in a low-lying area
- Clear leaves from the catch basin near your home

## Water Quality Concerns

If your water looks discoloured, smells unusual, or you suspect contamination:
- Call Halifax Water at 902-420-9287
- Don't drink the water until cleared
- Report through SolveHFX for documentation

---

**Water or sewer issue?** [Report it now →](/report)
    `,
  },
  {
    slug: 'property-standards-complaints-halifax',
    title: 'How to Report Property Standards Violations in Halifax',
    description:
      'Overgrown lot, derelict building, or unsafe property in Halifax? Here\'s how to file a property standards complaint with HRM bylaw enforcement.',
    date: '2026-03-19',
    readTime: '3 min read',
    category: 'Guide',
    content: `
Every neighbourhood has that one property — the overgrown yard, the collapsing fence, the derelict building. Halifax has bylaws for that, and you can report violations.

## What Are Property Standards?

HRM's Property Standards Bylaw requires property owners to maintain their properties to minimum standards. This includes:

- **Yards**: Grass must be kept below a certain height, no accumulation of junk or debris
- **Structures**: Buildings must be structurally sound, with no collapsing walls, roofs, or foundations
- **Fences**: Must be maintained and not pose a safety hazard
- **Drainage**: Property must not cause water to drain onto neighbouring properties
- **Pest control**: Properties cannot harbour conditions that attract vermin

## Common Violations

- **Overgrown grass and weeds** (over 20 cm / 8 inches in urban areas)
- **Accumulated junk, garbage, or debris** on the property
- **Derelict vehicles** on private property
- **Unsecured vacant buildings** (open doors, broken windows)
- **Collapsing fences, sheds, or structures**
- **Overflowing garbage** attracting pests

## How to Report

1. Go to [solvehfx.ca/report](/report)
2. Select "Property Standards"
3. Pin the property location
4. Photo the violation from the public sidewalk or road
5. Submit — goes to HRM 311 + your councillor

### Direct to HRM
- Email contactus@311.halifax.ca
- Call 311
- Include the property address and describe the issue

## What Happens After You Report

1. **Bylaw officer investigates**: They inspect the property and determine if there's a violation
2. **Notice issued**: If confirmed, the property owner receives a notice with a deadline to fix the issue
3. **Compliance or enforcement**: If the owner complies, case closed. If not, HRM can:
   - Issue fines (escalating for repeat offences)
   - Hire contractors to do the work and bill the owner
   - In extreme cases, take legal action

## Important Notes

- **You can report anonymously**: Your name is not shared with the property owner
- **Photos help**: But only photograph from public spaces (sidewalk, road)
- **Be patient**: Initial investigation can take 1-2 weeks; full resolution may take longer
- **Recurring issues**: If a property has been addressed before and the issue returns, mention the history in your report

## Seasonal Patterns

- **Spring/Summer**: Overgrown yards, accumulated winter debris
- **Fall**: Leaf accumulation, fence damage from storms
- **Winter**: Unshovelled sidewalks in front of properties (separate bylaw)
- **Year-round**: Junk accumulation, structural issues

---

**Property standards issue?** [Report it now →](/report)
    `,
  },
  {
    slug: 'dartmouth-civic-issues-report',
    title: 'Reporting Civic Issues in Dartmouth: A Complete Guide',
    description:
      'Live in Dartmouth? Here\'s how to report potholes, streetlights, graffiti, and other civic issues specific to Dartmouth\'s neighbourhoods and infrastructure.',
    date: '2026-03-19',
    readTime: '4 min read',
    category: 'Guide',
    content: `
Dartmouth is part of Halifax Regional Municipality, which means civic issues are handled by the same HRM systems. But Dartmouth has its own unique infrastructure challenges. Here's your guide.

## Dartmouth's HRM Districts

Dartmouth spans several HRM districts:

- **District 5**: Dartmouth Centre (downtown Dartmouth, Sullivan's Pond area)
- **District 6**: Harbourview-Burnside-Dartmouth East
- **District 7**: Portland-Woodside-Montebello
- **District 3**: Dartmouth South-Eastern Passage

Each district has its own councillor. When you report through [SolveHFX](/report), we automatically determine your district from GPS.

## Common Dartmouth Issues

### Roads
- **Portland Street**: Heavy traffic and persistent road damage
- **Windmill Road**: Industrial traffic causes accelerated wear
- **Main Street**: Downtown Dartmouth's aging pavement
- **Highway 111 on/off ramps**: Provincial responsibility

### Transit
- **Bridge Terminal area**: Bus shelter and stop maintenance
- **Dartmouth ferry terminals**: Alderney and Woodside
- **Route 1 (Spring Garden-Dartmouth)**: One of the busiest routes

### Parks and Trails
- **Shubie Park**: Trail maintenance, canal path conditions
- **Sullivan's Pond**: Water quality, pathway conditions, wildlife
- **Lake Banook**: Shoreline erosion, dock conditions
- **Dartmouth Common**: Sports fields, playground equipment

### Waterfront
- **Alderney Landing area**: Public space maintenance
- **Dartmouth Harbourwalk**: Trail surface, lighting, benches

## How to Report

Same as anywhere in HRM — use [SolveHFX](/report). The smart routing works across all of Dartmouth:

1. Drop a pin on the issue
2. Take a photo
3. AI drafts the report
4. Submitted to HRM 311 + your Dartmouth district councillor

## Dartmouth-Specific Tips

- **Bridge issues** (Macdonald and MacKay): Report to Halifax Harbour Bridges, not HRM — but SolveHFX can still document them
- **Burnside Industrial Park**: Road issues here get heavy truck traffic — mention this in your report for priority
- **Eastern Passage**: Some roads are provincial — SolveHFX detects this automatically
- **Lake Banook and Lake MicMac**: Shoreline issues may involve both HRM and the province

## Why Dartmouth Reports Matter

Dartmouth has historically received less infrastructure investment than Halifax Peninsula. The more issues residents report, the stronger the case for equitable funding. Every report through SolveHFX is data that councillors can use when advocating for their districts.

---

**Dartmouth resident?** [Report an issue now →](/report)
    `,
  },
  {
    slug: 'bedford-sackville-civic-reporting',
    title: 'Reporting Civic Issues in Bedford and Sackville',
    description:
      'Live in Bedford, Lower Sackville, or Middle Sackville? Here\'s your guide to reporting potholes, streetlights, parks, and other civic issues in the fastest-growing part of HRM.',
    date: '2026-03-19',
    readTime: '4 min read',
    category: 'Guide',
    content: `
Bedford and Sackville are among the fastest-growing areas in HRM, which means more construction, more traffic, and more infrastructure strain. Here's how to report civic issues in this part of the municipality.

## Your Districts

- **District 14**: Middle/Upper Sackville-Beaver Bank-Lucasville
- **District 15**: Lower Sackville-Bedford
- **District 16**: Bedford-Wentworth

## Hot Spots for Civic Issues

### Roads
- **Sackville Drive**: High traffic volume, aging pavement
- **Bedford Highway**: Potholes and narrow sections near the waterfront
- **Larry Uteck Boulevard**: Growing pains from rapid development
- **Hammonds Plains Road**: Increasingly congested with new subdivisions
- **Cobequid Road**: Major arterial connecting Sackville to Bedford

### Development-Related Issues
- **Construction damage**: New subdivisions damaging existing roads during heavy equipment use
- **Missing sidewalks**: New developments often lack pedestrian infrastructure initially
- **Drainage**: Increased impervious surfaces cause flooding in older neighbourhoods
- **Dust and debris**: Active construction sites not managing dust control

### Parks and Recreation
- **Sackville Lakes Provincial Park**: Trail conditions
- **Bedford Waterfront**: Public pathway and park maintenance
- **Springfield Lake area**: Green spaces serving new communities
- **DeWolf Park**: Bedford's waterfront gathering space

## Reporting Tips for Bedford/Sackville

- **New subdivisions**: If your street is brand new and has issues, it might still be under developer warranty — mention the subdivision name in your report
- **Provincial roads**: Highway 101, 102, and 118 are provincial. SolveHFX detects this automatically
- **Construction complaints**: If a construction site is causing issues (dust, noise outside hours, road damage), include the developer/contractor name if visible
- **Missing infrastructure**: "No sidewalk on [street]" is a valid report — councillors track these requests for budget planning

## How to Report

1. Go to [solvehfx.ca/report](/report)
2. Drop a pin on the issue location
3. Take a photo
4. Submit — automatically routed to the right authority + your district councillor

## Growth = More Reporting Needed

Bedford and Sackville's rapid growth means infrastructure is constantly playing catch-up. Your reports help HRM and your councillor understand where the gaps are. Don't assume someone else has reported it — report it yourself.

The districts with the most reports get the most attention at council budget time.

---

**Bedford or Sackville resident?** [Report an issue now →](/report)
    `,
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
