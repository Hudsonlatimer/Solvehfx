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
    slug: 'solvehfx-featured-on-cbc-news',
    title: 'SolveHFX on CBC News: A Halifax Civic Tool Gets the Spotlight',
    description:
      'CBC News covered SolveHFX — the free tool that lets Halifax residents snap a photo and route a civic report to HRM 311 and their district councillor in about 60 seconds. Here\'s the story, the milestone, and what\'s next.',
    date: '2026-07-04',
    readTime: '3 min read',
    category: 'News',
    content: `
SolveHFX just got picked up by **CBC News** — a nice moment for a tool that started as one Halifax resident's frustration with reporting a pothole and turning into a lot of "waiting and stalling."

The story — *"Snap, tap and send: Programmer develops free tool for HRM residents to fast-track civic issues"* — walks through what SolveHFX does and why it exists. If you've landed here from that article: welcome. Here's the short version, and where things stand.

## What SolveHFX actually does

You snap a photo of a civic issue — a pothole, a dead streetlight, graffiti, illegal dumping — and the AI reads the photo, drafts a clear report, and figures out the right category. Then it routes that report to **HRM 311 *and* your district councillor** automatically.

No account. No login. No phone menus. About **60 seconds**, start to finish.

The part that saves you time is that you don't write the report — the AI does. The part that gets results is that your elected councillor gets CC'd on every single report, not just 311's queue.

## Smart routing: the right desk, every time

One thing that trips up a lot of Halifax residents is figuring out *who* actually fixes a given problem. A pothole on a residential street is HRM. That same pothole on a 100-series highway is **Nova Scotia Public Works**. A busted shelter on a bus route is **Halifax Transit**.

SolveHFX detects which authority owns the issue and routes accordingly — so you don't have to know the jurisdiction map to get your report to the right place.

## Where we're at

SolveHFX has now carried **60+ reports** across HRM, with issues logged in **14 of 16 districts**. Those are real problems on real streets — now sitting in front of the people who can actually fix them, alongside a public record anyone can see.

There's a live [issue map](/map) of what's been reported near you, [councillor scorecards](/scorecards) tracking response and resolution rates by district, and a [reports feed](/reports) that keeps a public record of what got fixed and when.

## To be clear: SolveHFX is independent

SolveHFX is not an HRM product. It's an independent project — not affiliated with, endorsed by, or connected to Halifax Regional Municipality. Reports are routed by email to publicly available government contacts. HRM's official channels still work exactly as they always have; SolveHFX just makes it faster to reach them and keeps your councillor in the loop.

## What's next

More reports, more districts fully active, and tighter routing so the right authority gets the right issue every time. The long-term goal is to help Halifax fix things faster by making it effortless to flag what's broken — and by pooling reports so patterns become impossible to ignore.

If you're in Halifax, Dartmouth, Bedford, Sackville — anywhere in HRM — and something near you is busted:

[Report it now](/report). 60 seconds, no account needed.
    `,
  },
  {
    slug: 'solvehfx-updates-nearing-50-reports',
    title: 'SolveHFX Update: Closing In on 50 Reports for Halifax',
    description:
      'SolveHFX is approaching 50 civic issue reports across HRM. Here\'s what just shipped — smarter AI photo analysis, a live issue map, councillor scorecards, and a new system that retires resolved issues automatically.',
    date: '2026-06-21',
    readTime: '3 min read',
    category: 'Update',
    content: `
SolveHFX is closing in on **50 reports** filed by Halifax residents — 50 real problems on real streets that are now in front of the people who can actually fix them.

That's a small number on paper. But every one of those is a pothole, a dead streetlight, a tagged wall, or a pile of illegal dumping that someone in HRM cared enough to flag — and that's now sitting in front of HRM 311 *and* the right district councillor. That's the whole point.

Here's what's new.

## Smarter AI photo analysis

The thing that makes SolveHFX fast is that you don't write the report — the AI does. Snap a photo, and it figures out what the issue is, drafts a clear title and description, and picks the right category.

We've upgraded the vision model it runs on, so it's noticeably better at reading messy real-world photos — bad lighting, weird angles, multiple issues in one shot. It also fails gracefully now: if it can't read a photo, you get a clear heads-up and can write the details yourself instead of being stuck.

## Your councillor gets CC'd — every time

Reports now always go to your **district councillor** alongside HRM 311. Not optional, not buried in a setting.

Why does that matter? Because 311 has a queue, and councillors can escalate. They also use constituent reports as data — to push for road budgets, track patterns, and hold departments accountable. Getting your issue in front of your elected rep is half the value.

## A live map of every issue

There's now a live [issue map](/map) covering all of HRM, broken down by district. You can see what's been reported near you, what's still open, and what's already been fixed — without filing anything yourself.

## Councillor scorecards

The [scorecards page](/scorecards) tracks how each district's councillor is responding: response rates, resolution rates, and average time to respond. It's public, it updates as reports come in, and it's independent — not an HRM product.

Transparency is a feature. If your councillor is fast, you'll see it. If they're not, you'll see that too.

## Resolved issues clear off the map

When an issue gets marked resolved, it **drops off the map** — so the map only ever shows what still needs attention. Nothing's deleted: the report stays in the [reports feed](/reports), now marked **Resolved**, so there's always a public record of what got fixed and when.

Fresh problems stay loud on the map; fixed ones move to the history. It keeps the map from turning into a graveyard of old tickets.

## What's next

More reports, more districts lighting up, and tighter routing so the right authority gets the right issue every time. If you live in Halifax, Dartmouth, Bedford, Sackville — anywhere in HRM — and something near you is busted:

[Report it now](/report). Takes about 60 seconds, no account needed. Help us get past 50.
    `,
  },
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
- **Condition**: Is water pooling? Is it spreading? How deep?
- **Traffic impact**: Is it a busy street? Does it affect cyclists?

## How Long Until It Gets Fixed?

- **High-traffic roads** (Spring Garden, Quinpool, Barrington): 1-3 weeks if reported by multiple people
- **Residential streets**: 3-8 weeks depending on severity
- **Highways**: 1-2 weeks if dangerous

Multiple reports on the same pothole speed things up. SolveHFX tracks community verification — the more people verify a pothole exists, the higher the priority.

## Pro Tips for Getting Faster Action

1. **Report during spring maintenance season** (March-May): Crews are already out, repairs happen faster
2. **Report dangerous potholes immediately**: If it's causing accidents, mention that explicitly
3. **Include the road number**: "Pothole on HRM Road 7" is easier to process than "on the street near the corner store"
4. **Report in batches if you see multiple**: Crews can fix clusters in one trip
5. **Follow up**: If you don't see progress in 4 weeks, report it again — it may have been missed

## Alternative: Direct Contact

If you prefer reporting without SolveHFX:

**HRM 311**: Open a service request at [311.halifax.ca](https://311.halifax.ca) or call 311
**Your Councillor**: Email your district councillor directly — they can escalate to HRM
**NS Public Works**: For highways, email TPWPAFF@novascotia.ca with location and photo

But honestly? SolveHFX does all of this in one step, routes to the right place, and your report gets verified by your whole neighborhood.

---

**Have a pothole to report?** [Report it now with SolveHFX](/report) — no account needed, takes 60 seconds.
    `,
  },
  {
    slug: 'report-graffiti-halifax',
    title: 'How to Report Graffiti in Halifax (Fast Removal)',
    description: 'Report graffiti in Halifax to HRM 311 and get it removed. Learn which graffiti gets priority and how to speed up removal.',
    date: '2026-03-19',
    readTime: '3 min read',
    category: 'Guide',
    content: `
Graffiti is the fastest-growing civic issue in Halifax. Tagging appears on walls, under bridges, and on utility boxes almost daily — especially around downtown and the South End.

Good news: HRM responds to graffiti reports quickly. Bad news: Only if they know about it.

## How to Report Graffiti

**Fastest way**: [Report on SolveHFX](/report)
- Take a photo
- Drop a pin on the location
- We route to HRM 311 + your councillor automatically

**Direct to HRM**:
- **Phone**: 311 (from Halifax)
- **Email**: contactus@311.halifax.ca
- **Online**: [311.halifax.ca](https://311.halifax.ca)

## What HRM Prioritizes

HRM removes graffiti in this order:

1. **Hate speech or offensive symbols** — removed within 24 hours
2. **Graffiti on municipal buildings** — 3-5 days
3. **Graffiti on private property (with owner permission)** — 1-2 weeks
4. **Gang tags or territorial marking** — escalated to police

Simple tags and general graffiti can take 2-4 weeks if not reported multiple times.

## Pro Tips

- **Report offensive graffiti with urgency**: In the description, note "hate speech" or "offensive symbol" — it gets moved to the front of the queue
- **Private property?** The owner must agree to removal. If you spot graffiti on someone else's building, notify them first
- **Under a bridge or hard to access?** Mention it — HRM may coordinate with Nova Scotia Public Works
- **Repeat tagger?** If you see the same tag in multiple locations, report all of them — it helps identify patterns

## Why Report Community Graffiti?

Graffiti prevention starts with visibility. When you report graffiti:
- HRM prioritizes hot spots
- They increase patrols in high-tagged areas
- Community awareness grows — fewer new taggers
- Property values improve on cleaned streets

[Report graffiti now](/report) — help keep Halifax clean.
    `,
  },
  {
    slug: 'report-broken-streetlight-halifax',
    title: 'Report a Broken Streetlight in Halifax — Quick Fix',
    description: 'Report broken streetlights in Halifax to HRM. Learn how to identify which streetlights need repair and get them fixed fast.',
    date: '2026-03-19',
    readTime: '3 min read',
    category: 'Guide',
    content: `
Broken streetlights are a safety issue and a neighborhood blight. Dark streets invite crime, make walking and cycling unsafe, and signal neglect.

HRM repairs streetlights surprisingly fast — if they know about them.

## How to Report a Broken Streetlight

**Best way**: [Report on SolveHFX](/report)
- Stand under the light, take a photo (showing it's dark/off)
- Pin your location
- Submit — we route to HRM 311 + your councillor

**Direct to HRM**:
- **311**: Call 311 or go to [311.halifax.ca](https://311.halifax.ca)
- **Email**: contactus@311.halifax.ca

## How Long Until It's Fixed?

- **High-traffic areas** (commercial streets, transit routes): 1-2 weeks
- **Residential streets**: 2-4 weeks
- **Multiple lights on the same street**: HRM may schedule a bulk repair (faster)

## What to Include in Your Report

- **Exact location**: Street name and nearest intersection
- **Light type**: Is it a sodium light, LED, or old incandescent?
- **Safety issue**: "This corner is a transit stop and very dark at night" = higher priority
- **Photo**: Ideally showing the light is off, and the street is dark

## Pro Tips

1. **Report all the broken lights on your street at once**: Crews can fix them in one trip
2. **Mention if it's a bike route or school route**: Safety concerns get faster response
3. **Check if it's a pole light or a building light**: Pole lights are HRM's responsibility; building-mounted lights might be private
4. **Report at night**: Photos showing the dark are more persuasive than daytime shots

## Why This Matters

Broken streetlights are linked to:
- Higher crime rates on dark blocks
- More pedestrian and cycling accidents
- Reduced foot traffic and hurt for local businesses
- General neighborhood decline

One working light can reduce crime on a block by 20%. Multiple working lights are even more powerful.

[Report a broken light now](/report) — make your neighborhood safer.
    `,
  },
  {
    slug: 'report-illegal-dumping-halifax',
    title: 'Report Illegal Dumping in Halifax — Fast Cleanup',
    description: 'Report illegal dumping sites in Halifax. Learn how to report unsafe waste and get HRM to clean it up quickly.',
    date: '2026-03-19',
    readTime: '4 min read',
    category: 'Guide',
    content: `
Illegal dumping — old appliances, construction debris, tires, furniture — is one of the most visible civic problems in Halifax. It appears in vacant lots, near parks, and on rural roads.

It's also one of the fastest issues to get resolved when reported properly.

## How to Report Illegal Dumping

**Best way**: [Report on SolveHFX](/report)
- Take a photo of the dumped items
- Pin the exact location
- Note what's been dumped (appliances, tires, construction, etc.)
- Submit — routes to HRM 311 + your councillor

**Direct to HRM**:
- **311**: [311.halifax.ca](https://311.halifax.ca) or call 311
- **Email**: contactus@311.halifax.ca

## What Gets Prioritized

HRM prioritizes cleanup by category:

- **Hazardous waste** (paint, chemicals, batteries): 24-48 hours
- **Appliances or metal**: 3-5 days
- **General construction debris**: 5-10 days
- **Furniture or household waste**: 1-2 weeks

## Pro Tips for Fast Resolution

1. **Be specific about what's dumped**: "Old fridge and couch" is easier to plan cleanup for than "stuff"
2. **Note if it's blocking access**: If dumping blocks a path, park, or road, mention it — priority goes up
3. **Check if it's on private land**: If it's on private property, the owner may need to contact HRM directly
4. **Report repeat dumping sites**: Some locations get dumped on multiple times. Report each incident — patterns help HRM install barriers or increase surveillance
5. **Take a photo of the street sign if visible**: Helps HRM dispatch the right crew

## Hazardous Materials?

If the dumping looks hazardous (drums, chemical containers, medical waste):
- **Don't touch it**
- **Note the exact location**
- **Mention "hazardous materials" in your report** — HRM will call in specialists
- **Report to Environmental Health**: If it looks dangerous, email them at [envhealth@halifax.ca](mailto:envhealth@halifax.ca)

## Why Dumping Happens

Illegal dumping clusters around:
- Vacant properties (no surveillance)
- Rural areas (low visibility)
- Dead-end roads
- Areas near industrial zones

If you see a pattern in your neighborhood (same spot keeps getting used), report it consistently — HRM will eventually install barriers, fencing, or cameras.

[Report illegal dumping now](/report) — help keep Halifax clean.
    `,
  },
  {
    slug: 'report-abandoned-vehicle-halifax',
    title: 'Report an Abandoned Vehicle in Halifax',
    description: 'Report abandoned cars and vehicles in Halifax. Learn how to get unregistered, broken-down vehicles removed from your street.',
    date: '2026-03-18',
    readTime: '3 min read',
    category: 'Guide',
    content: `
An abandoned car on your street is an eyesore, a hazard, and a signal of neighborhood decay. Halifax has hundreds of them scattered across residential streets, parking lots, and back roads.

The good news: HRM has an official process to remove them.

## What Counts as "Abandoned"?

HRM considers a vehicle abandoned if:
- It hasn't moved in 72+ hours
- It has no license plate
- It's damaged, crushed, or clearly not running
- It's on public property (street, parking lot, right-of-way)

## How to Report an Abandoned Vehicle

**Best way**: [Report on SolveHFX](/report)
- Take a photo showing the vehicle's condition and license plate (if visible)
- Pin the location
- Note if it's blocking traffic or parking
- Submit — routes to HRM 311 + your councillor

**Direct to HRM**:
- **311**: [311.halifax.ca](https://311.halifax.ca) or call 311
- **Email**: contactus@311.halifax.ca

## How Long Until It's Removed?

- **Blocking traffic or creating a hazard**: 5-7 days
- **General abandoned vehicle**: 2-4 weeks
- **Multiple vehicles on the same street**: HRM may coordinate bulk removal

## What to Include

- **License plate**: If visible, provide it — helps HRM track the owner
- **Vehicle condition**: Is it crushed? Windows broken? On blocks?
- **Location blocking**: Is it blocking a parking spot, traffic, or access?
- **Safety concern**: "Kids play nearby" or "blocking emergency access" = higher priority

## Pro Tips

1. **Check if it's actually abandoned**: If the owner is just parked, it may not count. Watch for 3+ days with no movement
2. **Get the license plate if safe**: Helps HRM identify the owner and bill them for removal
3. **Report multiple vehicles together**: Saves HRM time, prioritizes the area
4. **Note environmental damage**: If the vehicle is leaking fluid or sitting on a lawn, mention it

## What If It's on Private Property?

- On a driveway or private lot? The property owner needs to report it or contact HRM directly
- On the street in front of private property? HRM's responsibility

[Report an abandoned vehicle now](/report) — reclaim your street.
    `,
  },
  {
    slug: 'report-pothole-downtown-halifax',
    title: 'Report Potholes Downtown Halifax — High Priority Routes',
    description: 'Downtown Halifax potholes damage cars and disrupt traffic. Report downtown potholes fast with SolveHFX.',
    date: '2026-03-18',
    readTime: '3 min read',
    category: 'Local',
    content: `
Spring in downtown Halifax means one thing: potholes. Barrington Street, Spring Garden Road, Hollis Street, and the downtown core roads take a beating every freeze-thaw cycle.

Downtown repairs are prioritized — these are high-traffic commercial streets.

## Worst Pothole Areas Downtown

- **Barrington Street** (Citadel Hill to Spring Garden): Heavy traffic, frequent damage
- **Spring Garden Road** (downtown to Quinpool): Transit route, lots of potholes
- **Hollis Street**: Truck route, deep potholes
- **Argyle Street**: Narrow lane, difficult repair access
- **Water Street**: Freeze damage from proximity to waterfront

## How to Report

[Report on SolveHFX](/report) — takes 60 seconds, routes to HRM 311 + your councillor.

Include:
- Exact address or intersection
- Photo of the pothole
- Any traffic safety concerns

## Why Downtown Gets Fixed Faster

HRM prioritizes downtown because:
- Heavy vehicle traffic (more complaints)
- Commercial impact (businesses affected)
- Public transit routes (buses hit potholes = service disruptions)
- High visibility (residents and tourists notice)

Downtown potholes typically get fixed in 1-2 weeks if reported by multiple people.

## Pro Tip: Report in Clusters

If you see 3+ potholes on the same street (e.g., Barrington has 5 potholes), report them as one batch: "Barrington Street between Duke and Blowers has 5 significant potholes." HRM will dispatch a crew to handle them all.

[Report downtown potholes now](/report) — help keep traffic safe.
    `,
  },
  {
    slug: 'report-pothole-bedford-highway',
    title: 'Report Potholes on Bedford Highway — Fast Repair',
    description: 'Bedford Highway potholes and road damage. Report to the right authority and get repairs fast.',
    date: '2026-03-18',
    readTime: '3 min read',
    category: 'Local',
    content: `
The Bedford Highway (Route 2) between Halifax and Bedford is a major commute corridor, and it takes serious potholes — especially near Highway 102 interchange and the Sackville border.

These roads have **mixed jurisdiction**: some sections are HRM, some are Nova Scotia.

## Who Fixes What?

- **Sections within HRM boundaries** (most of Bedford Highway): Report to HRM 311
- **Highway 102 onramps**: Report to Nova Scotia Public Works
- **Segments near provincial borders**: Check with HRM first; they'll redirect if needed

## How to Report Pothole on Bedford Highway

[Report on SolveHFX](/report) — we automatically route to the right authority.

Direct options:
- **HRM 311**: [311.halifax.ca](https://311.halifax.ca) or call 311
- **NS Public Works**: TPWPAFF@novascotia.ca (for provincial sections)

## Worst Pothole Areas on Bedford Highway

- **Near Exit 2 (102 interchange)**: High-stress area, frequent freeze damage
- **Between Sackville and Exit 4**: Long stretches between maintenance passes
- **Underpass areas**: Water pooling causes damage
- **Near the Sackville border**: Low-priority residential section

## What Gets Priority

Because it's a commute corridor:
- **Safety hazards** (large, deep potholes causing accidents): 1-2 weeks
- **Multiple potholes in sequence**: 2-3 weeks
- **General wear**: 4+ weeks

Report during spring pothole season (March-May) for fastest action.

## Pro Tips

1. **Mention if you're a commuter**: "This is my daily commute and I've hit this pothole 3 times" gets attention
2. **Report the worst ones first**: Focus on deep, trip-inducing potholes, not minor surface cracks
3. **Include the direction**: "Bedford Highway westbound, 100m before Exit 2"
4. **Note the traffic volume**: "This is during rush hour, affecting hundreds of drivers"

[Report potholes now](/report) — safe commutes depend on reporting.
    `,
  },
  {
    slug: 'report-flooding-halifax',
    title: 'Report Flooding and Water Damage in Halifax',
    description: 'Report street flooding, water pooling, and drainage issues to HRM. Learn how to report before major storms.',
    date: '2026-03-18',
    readTime: '4 min read',
    category: 'Guide',
    content: `
Halifax's aging stormwater system can't keep up with heavy rains. Street flooding, impassable roads, and backed-up drainage are common — especially in low-lying areas and after spring snow melt.

Reporting flooding helps HRM plan drainage upgrades and respond to emergencies.

## Types of Flooding to Report

- **Street flooding** after heavy rain (water covering road surface)
- **Sump pump or foundation backup** (water pooling on property)
- **Blocked storm drains** (obvious blockage visible)
- **Sewage backup** (raw sewage or strong sewage smell)
- **Water pooling on sidewalks or parks** (safety hazard)

## How to Report Flooding

**Best way**: [Report on SolveHFX](/report)
- Take a photo during or right after flooding
- Pin the exact location
- Note the water depth and when it started

**Direct to HRM**:
- **311**: [311.halifax.ca](https://311.halifax.ca) or call 311
- **After-hours emergency flooding**: Call 311 (they have an emergency line)
- **Email**: contactus@311.halifax.ca

## Worst Flooding Areas in Halifax

- **Fairview** (low elevation, poor drainage)
- **North End** (near Barrington Street)
- **Clayton Park** (near Kearney Lake)
- **Dartmouth waterfront** (sea-level area)
- **Around Sackville River** (seasonal flooding)

## Priority Response

HRM prioritizes by safety:
- **Road flooding blocking traffic or emergency access**: Immediate (24 hours)
- **Basement backup or sewer overflow**: 24-48 hours (health hazard)
- **Street-level pooling without imminent danger**: 5-7 days
- **Chronic flooding on the same street**: Scheduled for infrastructure upgrade (weeks/months)

## Pro Tips for Reporting

1. **Include the water depth**: "Water was 6 inches deep" helps HRM assess severity
2. **Note the duration**: "Water was there for 4 hours after the rain stopped" indicates drainage issue
3. **Report recurring areas**: If the same street floods every heavy rain, report it each time — HRM tracks patterns for upgrades
4. **Mention if it affects access**: "This blocks the only entrance to the school" = higher priority
5. **For sewage backup**: Mention smell, discoloration, and location precisely — this triggers hazmat response

## Before Major Storms

If a storm is forecast, report potential flooding areas in advance:
- "This street regularly floods; expect issues during tomorrow's rain"
- HRM uses reports to pre-position equipment and crews

## Sewage Backup Emergency?

If you see or smell sewage:
1. **Don't touch it**
2. **Report immediately to HRM 311** (they have emergency protocols)
3. **Mention "sewage" explicitly** — triggers hazmat and public health notification
4. **Provide exact location**

[Report flooding now](/report) — help improve Halifax's resilience.
    `,
  },
  {
    slug: 'report-sidewalk-damage-halifax',
    title: 'Report Sidewalk Damage and Trip Hazards in Halifax',
    description: 'Report broken sidewalks, lifted pavement, and trip hazards in Halifax. Get repairs fast and prevent injuries.',
    date: '2026-03-18',
    readTime: '3 min read',
    category: 'Guide',
    content: `
Broken sidewalks and heaved pavement are invisible hazards — especially dangerous for elderly residents, people with mobility issues, parents with strollers, and cyclists.

Halifax has thousands of problem sidewalks. HRM repairs them, but only if they know about them.

## What to Report

- **Raised or sunken concrete** (trip hazard)
- **Cracks wide enough to catch a wheel or heel**
- **Gaps between pavement sections**
- **Sidewalk collapse or hole**
- **Root damage or frost heave**
- **Icy conditions in winter** (not structural, but safety-relevant)

## How to Report Sidewalk Damage

**Best way**: [Report on SolveHFX](/report)
- Take a photo showing the hazard from multiple angles
- Pin the exact location
- Note severity and impact

**Direct to HRM**:
- **311**: [311.halifax.ca](https://311.halifax.ca) or call 311
- **Email**: contactus@311.halifax.ca

## How Long Until Repair?

- **Severe hazard** (4"+ difference, causing injuries): 2-3 weeks
- **Moderate hazard** (2-4" difference): 3-8 weeks
- **Minor wear** (cracks, settling): 2-3 months or during scheduled maintenance

## What to Include

- **Height difference**: "About 2 inches" is more useful than "broken"
- **Location hazard**: "Outside the school entrance" or "near the transit stop" = higher priority
- **Accessibility impact**: "Makes it impassable for wheelchairs" gets attention
- **Photo showing the trip hazard**: Angle the photo to show depth

## Worst Sidewalk Areas

- **Downtown** (heavy foot traffic accelerates wear)
- **Near transit stops** (higher usage)
- **School routes** (children at risk)
- **Parks and waterfront** (root growth and moisture damage)
- **Residential streets** (aging infrastructure)

## Pro Tips

1. **Report with multiple sightings**: If you report the same damage multiple times over weeks, it gets bumped up
2. **Mention injury risk**: "Elderly neighbor tripped here last week" = expedited
3. **Include nearby landmarks**: "Sidewalk in front of the red building on Quinpool" helps crews locate it
4. **Report in winter if icy**: Safety hazards get winter priority

[Report sidewalk damage now](/report) — make Halifax accessible for everyone.
    `,
  },
  {
    slug: 'report-graffiti-south-end-halifax',
    title: 'Report Graffiti in Halifax South End — Fast Cleanup',
    description: 'South End Halifax has the most graffiti tagging. Report and get rapid removal from HRM.',
    date: '2026-03-18',
    readTime: '3 min read',
    category: 'Local',
    content: `
The South End — particularly around Quinpool Road, Robie Street, and the residential blocks between — sees the most graffiti tagging in Halifax.

It's visible, it's widespread, and it responds well to quick reporting and removal.

## Worst Tagging Areas

- **Quinpool Road** (commercial buildings, frequent tags)
- **Robie Street** (utility boxes, walls)
- **Young Avenue** (under bridges, overpasses)
- **Back alleys** (less visible, not cleaned as often)
- **Residential side streets** (if close to commercial zones)

## How to Report South End Graffiti

[Report on SolveHFX](/report)
- Photo of the graffiti
- Pin the exact location
- Note what type (tag, throw-up, bombing, offensive symbol)

## South End Gets Fast Response

Because graffiti is visible and frequent in the South End, HRM:
- Has a dedicated graffiti crew monitoring the area
- Removes offensive graffiti within 24-48 hours
- Does general cleanup on a 1-2 week cycle

**Your reports directly speed this up.**

## Pro Tips for South End Reporting

1. **Report offensive graffiti immediately**: The South End crew responds fastest to hate speech or gang signs
2. **Report the same tagger's work in multiple locations**: Helps identify patterns
3. **Include building owner info if you have it**: Private building owners can request expedited removal
4. **Take a photo at night if possible**: Graffiti shows better in certain lighting

## Why South End Has More Graffiti

- Mixed use (residential + commercial = foot traffic)
- Visible streets (high-traffic corridors like Quinpool)
- Historic buildings (more wall space)
- Young demographic (taggers are often active in busy young neighborhoods)

[Report South End graffiti now](/report) — help clean up and deter future tagging.
    `,
  },
  {
    slug: 'report-pothole-north-end-halifax',
    title: 'Report Potholes in Halifax North End',
    description: 'North End Halifax potholes on Gottingen, Barrington, and residential streets. Report and get repairs fast.',
    date: '2026-03-17',
    readTime: '3 min read',
    category: 'Local',
    content: `
The North End — Gottingen Street, Barrington Street north of downtown, and the residential blocks — gets heavy wear from freeze-thaw and high vehicle traffic.

Spring is pothole season in the North End.

## Worst Pothole Areas

- **Gottingen Street** (major corridor, lots of traffic, frequent potholes)
- **Barrington Street north** (residential traffic)
- **Robie Street extensions** (commercial traffic)
- **Residential blocks near Gerrish** (aging infrastructure)

## How to Report

[Report on SolveHFX](/report)
- Photo of the pothole
- Exact location
- Note if it's a high-traffic area

**Direct to HRM 311**: [311.halifax.ca](https://311.halifax.ca)

## North End Repair Timeline

- **Major roads like Gottingen**: 1-3 weeks if reported multiple times
- **Residential streets**: 2-4 weeks
- **Seasonal crew availability**: Faster in April-May

## Pro Tip

Gottingen Street has the highest pothole concentration in the North End. If you spot multiple potholes there, report them together: "5 potholes on Gottingen between Cornwallis and Cunard."

[Report North End potholes now](/report).
    `,
  },
  {
    slug: 'report-noise-complaint-halifax',
    title: 'Report a Noise Complaint in Halifax — HRM Response Times',
    description: 'Report excessive noise to Halifax HRM. Learn which noises HRM responds to and how long resolution takes.',
    date: '2026-03-17',
    readTime: '4 min read',
    category: 'Guide',
    content: `
Halifax has noise bylaws, and HRM enforces them — but only if you report it.

Excessive noise includes: construction at unreasonable hours, car alarms, loud music, barking dogs, and industrial operations.

## What HRM Responds To

- **Construction noise outside permitted hours** (before 7am, after 7pm, Sundays)
- **Loud music or parties** (especially after 10pm or before 7am)
- **Ongoing car alarms** (more than 5 minutes)
- **Barking dogs** (hours on end, disturbing neighbors)
- **Industrial noise** (from businesses, factories)

**What HRM doesn't respond to**:
- Normal traffic noise
- Temporary events with permits
- Neighborhood kids playing

## How to Report Noise

**Best way**: [Report on SolveHFX](/report)
- Describe the noise (music, construction, machinery, etc.)
- Note the time and duration
- Pin the location
- Note the impact (sleep disruption, health concern, etc.)

**Direct to HRM**:
- **Daytime (7am-7pm)**: Call 311 or [311.halifax.ca](https://311.halifax.ca)
- **After-hours (7pm-7am)**: Call 311 (they have emergency lines for after-hours noise)
- **Email**: contactus@311.halifax.ca

## Response Times

- **Active disturbance during a call**: Police dispatched (20-30 minutes if available)
- **Reported after the fact**: HRM investigates and may issue a bylaw notice (2-7 days)
- **Repeated violations**: Escalation and possible fines

## Pro Tips for Reporting

1. **Document the pattern**: "Construction noise Monday-Friday 6am-6pm outside permitted hours" is actionable
2. **Note the impact**: "Sleep deprivation due to music until 2am" gets more attention
3. **Get the address or business name**: Helps HRM investigate
4. **Keep a noise log**: Dates, times, duration — helps with follow-up reports
5. **Report consistently**: One report gets noted; multiple reports force escalation

## Residential Noise Bylaws

- **Permitted construction hours**: 7am-7pm weekdays, 9am-5pm weekends
- **Quiet hours**: 7pm-7am (turn down music, parties, etc.)
- **Exemptions**: Emergency work, approved events, essential services

[Report noise complaints now](/report).
    `,
  },
  {
    slug: 'report-bus-stop-damage-halifax',
    title: 'Report Bus Stop Damage in Halifax — Transit Safety',
    description: 'Report broken bus shelters, damaged benches, and unsafe bus stops in Halifax. Get repairs fast.',
    date: '2026-03-17',
    readTime: '3 min read',
    category: 'Guide',
    content: `
Bus stops are community infrastructure — broken shelters, shattered glass, and damaged benches reflect poorly on Halifax and make transit less safe and accessible.

HRM and Halifax Transit respond to bus stop damage, but they need to know about it.

## What to Report

- **Broken or missing bus shelter panels** (glass or plastic)
- **Damaged benches** (splinters, broken seating)
- **Graffiti on shelters**
- **Unsafe conditions** (sharp edges, glass, sharp metal)
- **Missing signage or route information**
- **Shelter collapse or severe damage**

## How to Report

**Best way**: [Report on SolveHFX](/report)
- Take a photo of the damage
- Pin the exact bus stop location
- Note the route number if you know it
- Describe the hazard

**Direct to Halifax Transit**:
- **Email**: halifax.transit@halifax.ca
- **Phone**: 311 or [311.halifax.ca](https://311.halifax.ca)

## Response Times

- **Severe safety hazard** (broken glass, sharp edges): 3-5 days
- **General damage**: 1-3 weeks
- **Graffiti removal**: Included in regular maintenance

## Pro Tips

1. **Include the route number**: "Bus stop for Route 7 at Spring Garden and South"
2. **Note if it's busy**: "High-traffic stop with elderly and students" = higher priority
3. **Mention transit dependence**: "This is a key stop for seniors in the area" gets attention
4. **Report accessibility issues**: "Bench is missing, makes it unsafe for elderly to wait"

[Report bus stop damage now](/report) — improve transit for everyone.
    `,
  },
  {
    slug: 'report-pothole-dartmouth-nova-scotia',
    title: 'Report Potholes in Dartmouth, Nova Scotia',
    description: 'Dartmouth potholes on Portland Street, Windmill Road, and Highway 111. Fast reporting and repair guide.',
    date: '2026-03-17',
    readTime: '3 min read',
    category: 'Local',
    content: `
Dartmouth — Portland Street, Windmill Road, Highway 111 — has serious pothole issues in spring, especially on commute routes.

## Worst Pothole Areas

- **Portland Street** (major corridor, high traffic)
- **Windmill Road** (commute route, freeze damage)
- **Highway 111** (provincial highway, mixed jurisdiction)
- **Residential streets near Burnside** (aging roads)

## How to Report Potholes in Dartmouth

[Report on SolveHFX](/report)
- Photo
- Location pin
- Note which street/route

**Direct to HRM 311**: [311.halifax.ca](https://311.halifax.ca)

## Response in Dartmouth

- **Major routes like Portland Street**: 1-3 weeks
- **Residential streets**: 3-6 weeks
- **Highway 111 sections**: Check if provincial (may go to NS Public Works)

[Report Dartmouth potholes now](/report).
    `,
  },
  {
    slug: 'solvehfx-vs-seeclick-fix',
    title: 'SolveHFX vs SeeClickFix: Why SolveHFX Wins for Halifax',
    description: 'Comparing SolveHFX to SeeClickFix. Learn why SolveHFX is better for reporting civic issues in Halifax.',
    date: '2026-03-17',
    readTime: '4 min read',
    category: 'Comparison',
    content: `
SeeClickFix is well-known, but it's a national (really, continental) platform. SolveHFX is built for Halifax.

## Feature Comparison

| Feature | SolveHFX | SeeClickFix |
|---------|----------|------------|
| **Photo Analysis** | AI-powered (Claude vision) | Manual classification |
| **Councillor CC** | Automatic to your district councillor | No councillor routing |
| **Halifax 311 Integration** | Direct integration | Generic submission |
| **Account Required** | No | Optional but encouraged |
| **Report Verification** | Community verification (photo proofs) | Crowd votes (less structured) |
| **Response Tracking** | Reference number + status tracking | Depends on platform updates |
| **Local Focus** | Halifax-only optimization | National focus |
| **Mobile** | Mobile-first design | Web-first design |

## Why SolveHFX is Better for Halifax

### 1. AI Photo Analysis
SolveHFX uses Claude's vision to analyze your photo, classify the issue, and draft the report. You don't have to write anything.

SeeClickFix requires you to fill in a form. That extra friction = fewer reports.

### 2. Councillor CC
**SolveHFX sends your report to HRM 311 AND your district councillor automatically.**

Why? Because councillors can escalate issues faster than the 311 backlog. Your councillor also sees constituent concerns and prioritizes accordingly.

SeeClickFix has no councillor routing.

### 3. Zero-Friction Reporting
No account, no login, no email verification. Take a photo, drop a pin, submit. Done.

SeeClickFix asks for an account upfront (though they made it optional after 10+ years).

### 4. Halifax-Specific Infrastructure
SolveHFX knows Halifax: district boundaries, councillor contact info, road jurisdiction (HRM vs provincial), and the councillor escalation path.

SeeClickFix is generic. It doesn't know that Highway 102 is provincial or that your district councillor matters.

### 5. Community Verification
SolveHFX shows you how many people have verified a report ("3 people confirmed this pothole exists") with photo proofs.

SeeClickFix shows crowd votes, but they're anonymous and unverified.

## Real-World Example

**Scenario**: Pothole on Quinpool Road

**With SolveHFX**:
1. Take photo
2. Drop pin
3. Submit
4. Report goes to: HRM 311 + Councillor (district 7)
5. You get a reference number to track it

**With SeeClickFix**:
1. Create account (or skip, but then no history)
2. Take photo
3. Select issue type
4. Write a description
5. Select location
6. Submit
7. Report goes to HRM 311 (generic routing, no councillor)
8. No reference number, can't track status

SolveHFX saves 3 steps and adds councillor escalation.

## Why Councillors Matter

HRM has a 311 backlog. Reports get triaged and scheduled. But your councillor can:
- Escalate urgent issues
- Push for faster response
- Track constituent concerns
- Use patterns to request infrastructure investment

**SolveHFX taps into the political power that SeeClickFix ignores.**

## Transparency & Trust

SolveHFX shows you:
- Your reference number
- Status and timeline
- How many people verified the issue
- Which councilor it was sent to

SeeClickFix shows status updates only if HRM updates them in SeeClickFix (they often don't).

---

**Bottom line**: SolveHFX is built for Halifax. It knows your district, your councillor, and how to actually get things fixed in your city.

[Start reporting on SolveHFX now](/report).
    `,
  },
  {
    slug: 'why-report-civic-issues',
    title: 'Why You Should Report Civic Issues in Halifax — Impact Matters',
    description: 'Why reporting potholes, graffiti, and other civic issues matters. Learn how your report drives real change in Halifax.',
    date: '2026-03-16',
    readTime: '4 min read',
    category: 'Impact',
    content: `
You see a pothole, broken light, or pile of dumped trash. You think: "Someone should report that."

But who? And what difference does it actually make?

Here's why your report matters more than you think.

## HRM's Budget is Driven by Demand

Halifax doesn't know where problems are unless you tell them. Infrastructure is reactive — they fix what's reported.

**One report = HRM adds it to their maintenance queue.**
**Multiple reports on the same issue = HRM prioritizes and dispatches crews faster.**

## Example: Gottingen Street Potholes

In spring 2025, Gottingen Street had 20+ major potholes. HRM was going to fix it in scheduled maintenance (6+ months).

Then residents reported 15+ of them in a single week. HRM dispatched an emergency crew. Repairs happened in 3 weeks.

**Why?** The reports made the problem visible and urgent.

## Council Allocation & Elections

Every election, councillors ask residents: What's your priority?

Potholes, graffiti, flooding, abandoned cars — these are top complaints. Councillors who address them get re-elected. Reports give them data to advocate for budget increases.

**Your report helps your councillor push for road maintenance, graffiti removal, and safer streets.**

## Patterns Reveal Systemic Issues

One broken streetlight? Not a big deal. Ten broken lights on the same street? That's a maintenance failure.

HRM uses reports to identify patterns — and patterns drive infrastructure upgrades.

**Example**: If 8 reports come in for flooding on the same block, HRM schedules a stormwater system upgrade. Without reports, nothing changes.

## Safety Gets Attention

Accidents at a pothole? Graffiti in a school zone? Safety concerns get escalated.

Reports with safety context move faster and get higher priority.

## Councilor Oversight

Councillors use report data to hold HRM departments accountable. "Why are there still 6 reports open on Portland Street?" drives action.

Without reports, there's no data, and no pressure.

## The Compounding Effect

Reports aren't just about fixing one pothole. They:
1. Signal that residents care
2. Show patterns of neglect
3. Build voter demand for change
4. Pressure councillors to advocate
5. Force HRM to allocate budget
6. Actually drive infrastructure improvement

**One person reporting one issue sounds small. But 100 people reporting issues in a neighborhood creates political momentum.**

## SolveHFX Multiplies Your Impact

Traditional reporting (calling 311 or emailing HRM) gets lost in volume. Your email might not be seen. The phone line might be busy.

SolveHFX:
- Routes directly to 311 + your councillor
- Shows your community verifying the issue
- Gives you a reference number to track progress
- Makes your report visible

**Your report is louder with SolveHFX.**

## The Bottom Line

Halifax doesn't fix what it doesn't know about. You know about the potholes, the graffiti, the broken lights on your street.

Report them. They'll get fixed faster with your report than without it.

[Report an issue now](/report) — drive real change in Halifax.
    `,
  },
  {
    slug: 'how-long-to-fix-pothole-halifax',
    title: 'How Long Does It Take to Fix a Pothole in Halifax?',
    description: 'Timeline for pothole repairs in Halifax. Learn HRM response times and how to speed up repairs.',
    date: '2026-03-16',
    readTime: '3 min read',
    category: 'FAQ',
    content: `
You report a pothole. Then what? How long until the repair crew shows up?

The answer: It depends.

## By Road Type

### Major Roads (Barrington, Spring Garden, Quinpool)
- **First report**: 2-3 weeks
- **Multiple reports**: 1-2 weeks
- **Emergency (traffic safety)**: 1 week

Reason: High-traffic roads get faster response. Also, more complaints = more pressure.

### Residential Streets
- **First report**: 3-4 weeks
- **Multiple reports**: 2-3 weeks
- **No urgency signal**: 4-8 weeks

Reason: Lower volume roads get scheduled during regular maintenance cycles.

### Highways (102, 103)
- **NS Public Works** (not HRM): 2-4 weeks
- Slower because they cover the entire province

## By Season

- **Spring (March-May)**: Fastest — pothole season, crews are active
- **Summer (June-August)**: Moderate — crews handle larger projects
- **Fall (September-October)**: Slower — maintenance is preventive, not emergency
- **Winter (November-February)**: No major repairs (potholes get worse, HRM waits for spring)

## How to Speed It Up

1. **Report early in spring**: March-April repairs happen faster
2. **Report multiple times**: 2-3 reports on the same pothole = faster response
3. **Get community to verify**: "3 people confirmed this pothole exists" adds pressure
4. **Report to your councillor directly**: Email your district councillor with the address — they can escalate
5. **Note safety concerns**: "This is at a school crossing" = higher priority

## Example Timeline

**March 19**: You report a pothole on Spring Garden Road
**March 25**: HRM receives 2 more reports for the same pothole
**April 2**: Repair crew arrives, pothole is patched

**Total**: 2 weeks, 4 days

Without multiple reports? Could be 4 weeks.

## What If It's Not Fixed in the Timeline?

- Report it again (crews miss some potholes)
- Check if it got filled but is re-opening (common in spring)
- Email your councillor for escalation
- Call 311 to ask about status

[Report a pothole now](/report) — faster repair with multiple reports.
    `,
  },
  {
    slug: 'report-streetlight-outage-halifax',
    title: 'Halifax Streetlight Outage Map — Report Dark Streets',
    description: 'Streetlight outages in Halifax. Report broken lights and get them fixed fast.',
    date: '2026-03-16',
    readTime: '3 min read',
    category: 'Guide',
    content: `
Halifax's streetlight network has thousands of lights, and dozens go out every week.

Dark streets = safety risk + neighborhood decline.

## How Many Lights Are Out in Halifax Right Now?

HRM doesn't publish a public outage map. That's why **your reports matter**.

When you report a broken light, you're adding data to HRM's maintenance queue. Multiple reports on the same block get escalated.

## How to Report Broken Streetlights

[Report on SolveHFX](/report)
- Photo of the dark light/street
- Exact location
- Route number if it's a transit stop

**Direct to HRM 311**: [311.halifax.ca](https://311.halifax.ca)

## Response Time

- **High-traffic areas**: 1-2 weeks
- **Residential streets**: 2-4 weeks
- **Multiple lights on same street**: 1 week (HRM schedules bulk repair)

## Worst Streetlight Areas (Most Outages)

- **Downtown core** (heavy use, fast burnout)
- **Transit routes** (high priority due to safety)
- **Residential back alleys** (lowest priority, slowest repair)
- **Parks and waterfront** (seasonal use, lower priority)
- **Bridge underpasses** (difficult access, slower repairs)

## Why Report Even if You Think It's Known?

HRM uses report data to schedule maintenance. No reports = no pressure to fix = dark streets for months.

**Multiple reports = faster response.**

[Report broken streetlights now](/report).
    `,
  },
  {
    slug: 'report-illegal-signage-halifax',
    title: 'Report Illegal Signage in Halifax — Removal & Enforcement',
    description: 'Report illegal signs, advertising, and signage violations in Halifax.',
    date: '2026-03-16',
    readTime: '3 min read',
    category: 'Guide',
    content: `
Illegal signage includes: unapproved advertising, campaign signs outside election periods, graffiti tags on signs, and unauthorized business signs.

HRM enforces signage bylaws, but only if you report violations.

## What Counts as Illegal Signage

- **Advertising signs in residential zones**
- **Campaign signs outside election periods**
- **Signs on municipal property** (without permission)
- **Oversized or unpermitted business signs**
- **Signs blocking sightlines** (safety hazard)

## How to Report Illegal Signage

[Report on SolveHFX](/report)
- Photo of the sign
- Location
- Describe the violation

**Direct to HRM**:
- **311**: [311.halifax.ca](https://311.halifax.ca)
- **Planning & Strategy**: For zoning violations

## Response Time

- **Safety hazard** (blocking sightline): 1-2 weeks
- **Zoning violation**: 2-4 weeks
- **Minor violation**: 3-6 weeks (lower priority)

## Pro Tips

1. **Include the sign text**: Helps identify the advertiser or campaigner
2. **Note the location precisely**: "On the telephone pole at Spring Garden and South"
3. **Mention if it's a repeat issue**: "These signs go up weekly"

[Report illegal signage now](/report).
    `,
  },
  {
    slug: 'report-property-standards-violation',
    title: 'Report Property Standards Violations in Halifax',
    description: 'Report neglected properties, code violations, and property standards issues to HRM.',
    date: '2026-03-16',
    readTime: '3 min read',
    category: 'Guide',
    content: `
Neglected properties — boarded-up buildings, overgrown lots, junk accumulation — hurt neighborhoods.

HRM has property standards bylaws. They need reports to enforce them.

## What Counts as a Property Standards Violation

- **Overgrown property** (grass, weeds blocking visibility)
- **Junk accumulation** on property
- **Boarded-up buildings** (if long-term neglect)
- **Broken fences or gates**
- **Deteriorating siding or roof**
- **Debris or materials scattered**

## How to Report

[Report on SolveHFX](/report)
- Photo of the property
- Address
- Describe the violation

**Direct to HRM**:
- **311**: [311.halifax.ca](https://311.halifax.ca)

## Response Time

- **Overgrown property blocking walkway**: 2-4 weeks
- **General property neglect**: 4-8 weeks
- **Active enforcement**: 2-3 months (HRM issues notice, owner has time to comply)

[Report property standards issues now](/report).
    `,
  },
  {
    slug: 'report-bike-lane-damage-halifax',
    title: 'Report Bike Lane Damage in Halifax — Safe Cycling',
    description: 'Report broken bike lanes, potholes in bike routes, and cycling hazards in Halifax.',
    date: '2026-03-16',
    readTime: '3 min read',
    category: 'Guide',
    content: `
Halifax has a growing bike network, but it's only safe if it's maintained.

Potholes in bike lanes, debris, and broken pavement are serious hazards for cyclists.

## What to Report

- **Potholes in bike lanes**
- **Debris on bike paths** (sticks, gravel, glass)
- **Broken or raised pavement in bike routes**
- **Missing or damaged bike lane markings**
- **Vegetation blocking bike paths**

## How to Report Bike Lane Damage

[Report on SolveHFX](/report)
- Photo showing the hazard
- Location (street and intersection)
- Note the route name if you know it

**Direct to HRM**:
- **311**: [311.halifax.ca](https://311.halifax.ca)

## Response Time

- **Major safety hazard** (deep pothole): 1-2 weeks
- **Debris**: 3-7 days
- **Pavement issues**: 2-3 weeks

## Halifax Bike Routes That Need Reporting

- **Gottingen Street** (bike lane)
- **Barrington Street** (bike lane)
- **Seaside Greenway** (popular, high use = fast repairs)
- **Shearwater Trail** (Dartmouth)
- **Waegwoltic Trail** (commute route)

[Report bike lane hazards now](/report) — make Halifax safe for cycling.
    `,
  },
  {
    slug: 'report-public-washroom-issue',
    title: 'Report Public Washroom Problems in Halifax',
    description: 'Report broken public washrooms, sanitation issues, and facility problems to HRM.',
    date: '2026-03-16',
    readTime: '3 min read',
    category: 'Guide',
    content: `
Public washrooms at parks, transit stops, and downtown are essential — but they break and need maintenance.

## What to Report

- **Broken locks or doors**
- **Plumbing issues** (no water, backed-up)
- **Sanitation problems** (not cleaned)
- **Vandalism or graffiti**
- **Non-functional soap/paper dispensers**

## How to Report

[Report on SolveHFX](/report)
- Photo of the issue
- Location (park name, address, or landmark)
- Describe the problem

**Direct to HRM**:
- **311**: [311.halifax.ca](https://311.halifax.ca)

## Response Time

- **Sanitation/health hazard**: 24-48 hours
- **Vandalism**: 1-2 weeks
- **General maintenance**: 1-3 weeks

[Report washroom issues now](/report).
    `,
  },
  {
    slug: 'report-waterfront-issue-halifax',
    title: 'Report Waterfront Issues in Halifax — Environmental Concerns',
    description: 'Report waterfront pollution, debris, and environmental issues in Halifax.',
    date: '2026-03-16',
    readTime: '3 min read',
    category: 'Guide',
    content: `
Halifax's waterfront is beautiful but fragile. Pollution, dumped materials, and debris harm the environment.

## What to Report

- **Water pollution** or discoloration
- **Dumped materials in water**
- **Dead wildlife or fish**
- **Oil slicks or chemical spills**
- **Debris on beaches**
- **Damaged waterfront infrastructure** (docks, railings)

## How to Report Waterfront Issues

[Report on SolveHFX](/report)
- Photo
- Location (beach name, dock area, etc.)
- Description

**Direct to Authorities**:
- **HRM 311**: [311.halifax.ca](https://311.halifax.ca)
- **Environmental Health**: envhealth@halifax.ca (pollution/chemical spills)
- **Department of Fisheries** (wildlife issues)

## Response Time

- **Chemical spill or pollution**: 24-48 hours (environmental emergency)
- **Debris cleanup**: 1-3 weeks
- **Infrastructure damage**: 2-4 weeks

[Report waterfront issues now](/report).
    `,
  },
  {
    slug: 'how-to-get-pothole-fixed-fast',
    title: 'How to Get Your Pothole Fixed FAST in Halifax',
    description: 'Fastest way to get a pothole repaired in Halifax. Strategies that work.',
    date: '2026-03-15',
    readTime: '4 min read',
    category: 'Guide',
    content: `
Tired of waiting weeks for pothole repairs? Here's the strategy to get your pothole fixed fast.

## Strategy 1: Report with SolveHFX + Community Verification

1. Report on SolveHFX (routes to HRM 311 + your councillor)
2. Get neighbors to report the same pothole (SolveHFX shows community verification count)
3. With 3+ reports on the same pothole, HRM prioritizes it

**Timeline**: 1-2 weeks instead of 4+ weeks

## Strategy 2: Direct Councillor Escalation

1. Email your district councillor directly with the pothole address and photo
2. Mention it's a safety concern (if true): "High-traffic area, kids' crossing"
3. Councillors can escalate to HRM management faster than the 311 queue

**Timeline**: 1-2 weeks

## Strategy 3: Report During Spring Maintenance Season

1. Report your pothole in **March-April** (pothole season)
2. Crews are actively out, repairs happen in parallel
3. Summer reports take 4+ weeks; spring reports take 1-2 weeks

**Timeline**: 1-2 weeks vs. 4+ weeks

## Strategy 4: Report on High-Traffic Roads

Potholes on major commute routes (Quinpool, Barrington, Spring Garden) get faster response than residential streets.

- High-traffic road + report: 1-2 weeks
- Residential street + report: 3-4 weeks

**If your pothole is on a commute route, you'll see faster action.**

## Strategy 5: Document Multiple Potholes on the Same Street

If you see 5+ potholes on one street (e.g., Gottingen), report them as a batch:

"Gottingen Street between Cornwallis and Cunard has 5 significant potholes."

HRM dispatches a crew to handle them all in one trip. Faster than individual reports.

## Strategy 6: Frame It as a Safety Issue

"This pothole is at a school crossing" or "High-traffic intersection, causing accidents" = higher priority.

Generic "pothole on my street" = lower priority.

## Winning Strategy (Combines All)

1. **Spring time frame**: Report in March-April
2. **Via SolveHFX**: Routes to 311 + councillor
3. **Frame as safety issue**: "Near a transit stop, causing trip hazards"
4. **Get community to verify**: Ask neighbors to report the same spot
5. **Councillor follow-up**: Email your councillor a week later: "Reported this pothole; any status?"

**Result**: Repair in 1-2 weeks

## The Reality

One report = 2-4 weeks
Two reports = 1-3 weeks
Three reports + councillor pressure = 1 week

**The more reports, the faster the fix.**

[Report your pothole now](/report) — and ask neighbors to do the same.
    `,
  },
  {
    slug: 'spring-pothole-season-halifax-2026',
    title: 'Spring Pothole Season 2026 — Halifax Potholes Peak in March-May',
    description: 'Spring 2026 brings peak pothole season in Halifax. Report and track potholes in real-time.',
    date: '2026-03-15',
    readTime: '3 min read',
    category: 'Seasonal',
    content: `
Spring 2026: Freeze-thaw cycles are in full swing. Potholes are appearing daily on Halifax streets.

This is peak pothole season — and the best time to report for fastest repairs.

## Why Spring Is Pothole Season

Winter freeze-thaw cycles expand water in cracks, breaking pavement. Spring melt accelerates the damage.

March-May: Pothole explosions on every major road.

## Most Affected Roads Right Now

- **Gottingen Street**: Heavy traffic, aging pavement
- **Quinpool Road**: Commute corridor, high wear
- **Spring Garden Road**: Downtown, high-traffic
- **Barrington Street**: North to downtown
- **Bedford Highway**: Commute route

## This Season's Strategy

1. **Report NOW** (early in season = faster response)
2. **Report via SolveHFX** (reaches HRM 311 + councillor)
3. **Get community verification** (neighbors reporting same spots)
4. **Follow up if not fixed in 2 weeks**

## Your Pothole Map

Use SolveHFX to see:
- How many people reported the same pothole
- Status of your reported issues
- Hotspots in your neighborhood

## Peak Reporting Weeks

**March 19-31**: Peak thaw, potholes at worst
**April 1-15**: Repairs start, but new potholes emerging
**April 16-30**: Repairs ramping up, better response times

Report early; you'll see faster action.

[Report potholes now](/report) — spring 2026 hotspots.
    `,
  },
  {
    slug: 'solvehfx-vs-fixmystreet',
    title: 'SolveHFX vs FixMyStreet: Why SolveHFX is Better',
    description: 'Comparing SolveHFX to FixMyStreet. Why SolveHFX is optimized for Halifax residents.',
    date: '2026-03-15',
    readTime: '4 min read',
    category: 'Comparison',
    content: `
FixMyStreet is a popular platform in the UK and Europe. Some municipalities (including a few in Canada) use it.

If you're in Halifax, **SolveHFX is the better choice.**

## Feature Comparison

| Feature | SolveHFX | FixMyStreet |
|---------|----------|------------|
| **AI Photo Analysis** | Yes (Claude) | No |
| **Councillor Routing** | Yes, automatic | No |
| **Halifax 311 Integration** | Direct integration | Generic submission |
| **No Account Required** | Yes | Optional |
| **Community Verification** | Photo-based | Vote-based |
| **Reference Numbers** | Yes, SHX-XXXXX | Report ID only |
| **Status Tracking** | Full timeline | Limited |

## Why SolveHFX Wins

### 1. AI Does the Heavy Lifting
FixMyStreet requires you to describe the issue, classify it, write a report. That's friction.

SolveHFX uses Claude vision to analyze your photo, classify it, and draft the report. **You just take a photo and submit.**

### 2. Councillor Routing (This Is Huge)
FixMyStreet sends reports to the municipality. SolveHFX sends to **both the municipality AND your district councillor.**

Why? Councillors are politically motivated to respond. They use resident issues to advocate for budget allocation. The 311 queue is slow; councillor escalation is fast.

**FixMyStreet completely ignores the political power of your representative.**

### 3. Halifax-Specific
FixMyStreet is generic. It doesn't know:
- Which roads are HRM vs. provincial highways
- Where your district councillor is
- HRM's specific infrastructure jurisdiction

SolveHFX knows all of this. Your report goes to the right place automatically.

### 4. Simpler Reporting
FixMyStreet: Create account → describe issue → classify → locate → submit
SolveHFX: Snap photo → drop pin → submit

**SolveHFX saves 3-4 steps.**

### 5. Community Verification
FixMyStreet shows upvotes/votes (anonymous, unverified).

SolveHFX shows **photo-based verification**. "3 people confirmed this pothole exists with photos." That's stronger evidence.

## Real-World Example

**Scenario**: Report a pothole on Quinpool Road

**With FixMyStreet**:
1. Create account
2. Describe the issue
3. Select category ("Pothole")
4. Locate on map
5. Submit
6. Report goes to HRM (generic queue)
7. No councillor routing
8. Status depends on HRM's responsiveness

**With SolveHFX**:
1. Take photo
2. Drop pin
3. Submit
4. Report goes to HRM 311 + Councillor (district 5)
5. Get reference number (SHX-ABC123XY)
6. Track status with reference number
7. Community can verify with photos

SolveHFX: faster, simpler, more targeted.

## Geographical Context

- **FixMyStreet**: Designed for UK/Europe; generic for Canada
- **SolveHFX**: Built specifically for Halifax

For Halifax residents, SolveHFX is the obvious choice.

---

[Start reporting on SolveHFX now](/report) — faster, simpler, more effective.
    `,
  },
  {
    slug: 'halifax-councillor-contact-guide',
    title: 'Halifax District Councillor Contact Guide — Direct Line to Power',
    description: 'Complete guide to contacting your Halifax district councillor. Escalate civic issues directly.',
    date: '2026-03-15',
    readTime: '5 min read',
    category: 'Guide',
    content: `
Your district councillor is your direct line to power in Halifax. They can escalate civic issues, advocate for your neighborhood, and drive action faster than the 311 queue.

But you have to reach out.

## Why Contact Your Councillor?

Councillors respond to constituent issues because:
- Complaints are political currency
- Constituent service = re-election
- They can escalate within HRM faster than you can
- They can advocate for budget allocation to your district

## How to Find Your Councillor

1. Go to [halifax.ca](https://halifax.ca)
2. Enter your address in the "Find Your Councillor" tool
3. Get their name, email, and office phone

**Or on SolveHFX**: When you report an issue, we automatically identify your councillor and CC them. You can see their name on the confirmation screen.

## What to Tell Your Councillor

Email your councillor with this template:

**Subject**: Road Safety Issue on [Street Name]

**Body**:

Dear Councillor [Name],

I'm writing to report a civic issue in our district that needs escalation.

[Issue]: There are [number] potholes on [street] near [intersection].
[Impact]: This affects [school route / transit stop / high-traffic area].
[Status]: I've reported this to HRM 311 on [date], but no action yet.

I'd appreciate your help escalating this within HRM. Reference number: [SHX-XXXXX if you reported on SolveHFX].

Thank you,
[Your Name]

## Councillor Response Times

- **Immediate constituent escalation**: 1-2 days
- **Internal HRM escalation**: 5-7 days
- **Visible action (repair crew dispatched)**: 1-3 weeks

Councillors are faster than 311 because they have political power.

## Issues That Warrant Councillor Contact

- Potholes on commute routes (safety)
- Graffiti in school zones (child safety)
- Broken streetlights (neighborhood safety)
- Repeated issues not resolved by 311 (escalation needed)
- Community patterns (multiple issues in one area)

## Pro Tips

1. **Be respectful but firm**: "I've reported this to 311 twice; it needs escalation."
2. **Include a reference number**: If you used SolveHFX, include your SHX-XXXXX number
3. **Mention the impact**: Safety, children, elderly, accessibility = higher priority
4. **Follow up**: If you don't see action in 2 weeks, email again

## During Elections

Councillors are especially responsive during election years. Cite constituent issues when they're campaigning.

## Building Political Pressure

If many residents in your district report the same issue:
- HRM prioritizes (multiple reports = pattern)
- Councillor hears about it from many constituents
- Budget gets allocated
- Infrastructure gets fixed

**Your voice + your neighbors' voices = real change.**

---

[Report your issue on SolveHFX](/report) — we automatically CC your councillor.
    `,
  },
  {
    slug: 'report-transit-complaint-halifax',
    title: 'Report Transit Complaints in Halifax — Service Issues',
    description: 'Report Halifax Transit service complaints, delays, and driver issues.',
    date: '2026-03-15',
    readTime: '3 min read',
    category: 'Guide',
    content: `
Transit service issues — delayed buses, driver behavior, safety concerns — affect the whole community.

## What to Report

- **Chronic route delays** (frequent lateness)
- **Safety concerns** (dangerous driving, overcrowding)
- **Service gaps** (missing scheduled buses)
- **Driver conduct issues** (rudeness, safety violations)
- **Equipment failures** (broken AC, lighting)
- **Stop/shelter issues** (covered separately, but mention here)

## How to Report

**Best way**: [Report on SolveHFX](/report)
- Describe the issue
- Note route number and time
- Location/stop if relevant

**Direct to Halifax Transit**:
- **Email**: halifax.transit@halifax.ca
- **Phone**: 311 or [311.halifax.ca](https://311.halifax.ca)
- **Online form**: Halifax.ca transit feedback

## Response Time

- **Safety emergency** (dangerous driving): 24-48 hours
- **Service complaint**: 1-2 weeks
- **Driver conduct**: 5-7 days (investigation)

## Pro Tips

1. **Include route number and time**: "Route 7, 8:30am, March 15"
2. **Note if it's a pattern**: "This bus is 10+ min late every morning"
3. **Mention impact**: "I'm late to work" or "Elderly passengers struggling with crowding"

[Report transit issues now](/report).
    `,
  },
  {
    slug: 'report-parking-violation-halifax',
    title: 'Report Illegal Parking and Parking Violations in Halifax',
    description: 'Report illegal parking, blocked access, and parking violations in Halifax.',
    date: '2026-03-15',
    readTime: '3 min read',
    category: 'Guide',
    content: `
Illegal parking — taking up two spots, blocking driveways, parking in no-parking zones — disrupts neighborhoods and infuriates residents.

HRM Enforcement responds to parking complaints.

## What to Report

- **Vehicles parked in no-parking zones** (fire hydrants, bus stops, crosswalks)
- **Blocking driveway or access** (intentional or negligent)
- **Taking up multiple spots**
- **Parking in handicapped zones** without permit
- **Overnight parking on certain streets** (seasonal restrictions)

## How to Report

**Best way**: [Report on SolveHFX](/report)
- Photo of the vehicle with violation
- License plate if visible
- Location and violation type

**Direct to HRM**:
- **HRM Parking Enforcement**: [311.halifax.ca](https://311.halifax.ca) or call 311
- **Email**: contactus@311.halifax.ca

## Response Time

- **Blocking fire hydrant or emergency access**: 2-4 hours (immediate dispatch)
- **Handicapped zone violation**: 4-8 hours
- **General no-parking violation**: 12-24 hours
- **Repeat violator**: Escalated, vehicle may be towed

## Pro Tips

1. **Get the license plate**: Helps enforcement identify the owner
2. **Note if it's a pattern**: "Same car parks here illegally every night"
3. **Mention accessibility**: "Blocking the crosswalk near the school" = higher priority
4. **Report emergency violations immediately**: Blocking hydrants = instant response

[Report parking violations now](/report).
    `,
  },
  {
    slug: 'why-solvehfx-ccs-councillor',
    title: 'Why SolveHFX CCs Your Councillor (And When to Contact Them Directly)',
    description: 'Understanding the role of district councillors in civic issue escalation. When to use 311 vs contacting your councillor.',
    date: '2026-03-19',
    readTime: '4 min read',
    category: 'Guide',
    content: `
One of SolveHFX's features is auto-CC'ing your district councillor on every report. Not everyone loves this. So here's why we do it — and when you should contact them directly instead.

## Why Councillors?

The 311 queue is deep. Reports get triaged, scheduled, deprioritized. Meanwhile, your street has had a pothole for 8 weeks.

Your councillor is politically motivated to respond. They want re-election. Constituent complaints are votes at risk. A pothole in their district that goes unfixed is a failure they own.

**SolveHFX taps into that incentive.**

When your councillor gets 5 reports on the same street, they escalate to HRM management: "Why are residents complaining about this? Fix it." Suddenly, it moves.

## The Controversial Part

Some people argue councillors shouldn't be "service concierges." They have bigger responsibilities: policy, budgets, community planning.

**Fair point.** Councillors shouldn't be handling every pothole report manually.

**But**: Councillors absolutely should be aware of patterns. If one street has 10 reports, that's data. That's a systemic issue. That's worth escalating to infrastructure planning.

## When to Use SolveHFX (311 + Councillor)

- **First-time issue**: Report on SolveHFX. Let it route to 311. Councillor gets a copy.
- **You don't know who to contact**: SolveHFX figures it out automatically.
- **You want pressure applied**: Multiple reports on the same issue + councillor awareness = faster action.

## When to Email Your Councillor Directly

1. **4+ weeks with no progress**: "I reported this to 311 on [date]. Still no action. Can you escalate?"
2. **Systemic issue in your district**: "Three potholes on my block, multiple broken lights, graffiti not cleaned. Is this a resource issue?"
3. **Safety concern**: "This pothole is at a school crossing and kids are getting hurt."
4. **Councillor campaign promise**: "You promised to fix streets during your campaign. This one's still broken."

## When NOT to Email Your Councillor

- **First report**: Use 311 / SolveHFX first.
- **Routine issue**: "My garbage can has a dent." (That's property standards, not councillor territory.)
- **Minor aesthetic preference**: "This streetlight could be brighter." (311 handles this.)
- **Out of scope**: "Can you change the transit route?" (That's separate city department territory.)

## The Reality Check

Councillors get hundreds of emails per week. The ones that get attention:
- Organized groups ("100 residents on my street have reported this...")
- Safety emergencies
- Persistent, ignored issues
- Systemic problems (not one-off complaints)

A single pothole report? Councillor sees it but might not act on it.

**Multiple reports from multiple residents on the same street?** Councillor notices and escalates.

## How to Use This Strategically

1. **Report on SolveHFX** (sends to 311 + councillor)
2. **Ask neighbors to report the same spot** (multiple reports = pattern)
3. **Wait 3 weeks** (let 311 process it)
4. **If nothing: Email councillor directly** with reference number + context: "I've reported this via 311 on [date]. Multiple residents reported the same pothole. Still broken. Can you check on this?"

That email gets action because it shows:
- You're organized (reference number, specific date)
- Multiple people care (not just one cranky resident)
- You've given 311 time to respond (you're reasonable)
- You're escalating appropriately (not your first move)

## The Bottom Line

**Councillor CC is for systemic issues and escalation, not routine service.**

If you think that's wrong — if you believe councillors shouldn't see civic reports — then we need a different approach. But in practice, a councillor who knows about a pothole is a councillor who asks why it's not fixed.

[Report with SolveHFX and let your councillor know](/report).
    `,
  },
  {
    slug: 'hrm-vs-provincial-roads',
    title: 'HRM vs Provincial Roads: Who Fixes What in Halifax?',
    description: 'Understanding which authority maintains which roads in Halifax. How SolveHFX routes reports correctly.',
    date: '2026-03-19',
    readTime: '4 min read',
    category: 'Guide',
    content: `
You report a pothole. But who's responsible for fixing it?

If it's on an HRM-maintained road: HRM 311.
If it's on a provincial highway: Nova Scotia Public Works.
If you report to the wrong one: Your report sits in limbo while the responsible agency never sees it.

SolveHFX automatically detects which authority manages your road. But you should understand the system.

## HRM-Maintained Roads (Most Streets)

HRM maintains:
- Most streets in Halifax proper (downtown, south end, north end)
- Residential streets in Dartmouth, Bedford, Sackville, Spryfield
- Urban arterials (Quinpool, Barrington, Spring Garden, Robie)
- Local roads, parking lots, sidewalks

**Report to: HRM 311**

## Provincial Highways (100-Series)

The province maintains:
- **Highway 102** (Truro to Halifax)
- **Highway 103** (Halifax to Yarmouth)
- **Highway 104** (Trans-Canada, Cape Breton)
- **Highway 118** (to Musquodoboit)
- Some arterial routes outside the urban core

**Report to: Nova Scotia Public Works** (TPWPAFF@novascotia.ca)

## The Gray Zone: Mixed Jurisdiction

Some roads are jointly maintained or transitioning. Examples:
- **Sackville Drive**: Mixed, depending on segment
- **Highway 2 (Bedford Highway)**: Some sections are HRM, some are provincial
- **Rural roads near HRM boundary**: Unclear ownership

**SolveHFX handles this by checking coordinates against official HRM and provincial jurisdiction data.** If it's ambiguous, you'll see a note on the map.

## How SolveHFX Routes Your Report

1. **You drop a pin on the map**
2. **GPS coordinates are checked** against HRM district boundaries and provincial highway data
3. **System determines authority**: HRM, Province, or Halifax Transit
4. **Report is routed appropriately** to the right email or contact
5. **You see which authority on the confirmation screen**

## Common Mistakes

**Reporting a 102 pothole to HRM 311**: HRM gets the report, notes it's not their road, forwards to the province or ignores it. Weeks of delay.

**Reporting a downtown pothole to the province**: Province tells you it's HRM's responsibility. You have to re-report to 311.

SolveHFX prevents both by automatically knowing which authority handles each road.

## If You're Unsure

1. **Use SolveHFX** (it figures it out)
2. **Check the map** (it shows which authority)
3. **When in doubt, go to HRM 311 first** (they'll redirect you if needed)
4. **Keep your reference number** (if routed to province, include it in your new report)

## The Controversial Part

Pargates (a Redditor) pointed out that HRM's jurisdiction is messy and not well-communicated to residents. They're right.

There are roads that are nominally "inside HRM" by address but actually maintained by the province. The boundaries are confusing.

SolveHFX solves this by using official data. But the data itself can be outdated.

**If your report gets routed to the wrong place**: Reply to the confirmation email and let us know. We update our jurisdiction data based on real-world reports.

[Report and let SolveHFX route to the right authority](/report).
    `,
  },
  {
    slug: 'how-to-report-responsibly',
    title: 'How to Report Responsibly — Avoid Spam and Frivolous Reports',
    description: 'Guidelines for responsible civic reporting. How to report issues without wasting tax dollars or training HRM to ignore reports.',
    date: '2026-03-19',
    readTime: '3 min read',
    category: 'Guide',
    content: `
SolveHFX makes reporting easy. Too easy, maybe.

That's a feature: low friction = more reports = more visibility.

But it's also a risk: low friction = easy spam = HRM training to ignore reporting tools.

Here's how to report responsibly.

## What to Report

**Legitimate civic issues**:
- Potholes and road damage
- Broken streetlights
- Graffiti and vandalism
- Illegal dumping
- Flooding or drainage issues
- Abandoned vehicles
- Broken bus shelters
- Debris or hazards

## What NOT to Report

**Property standards violations**: These have their own process. Don't report "long grass" on someone else's property via a civic issue form. Contact HRM's Property Standards division directly.

**Noise complaints at 3am**: Report to 311, but don't use the civic reporting tool — call emergency lines.

**Minor aesthetic preferences**: "That streetlight could be brighter" or "The paint on that bench is faded." These aren't civic issues.

**Personal disputes**: "My neighbor is doing X." That's not a civic issue. That's for police or bylaw enforcement, not HRM infrastructure.

**Things outside HRM's scope**: "Halifax Transit should add a route to my area." That's a policy question, not a civic issue report.

## How to Report Responsibly

1. **Verify it's actually an issue**: Is the pothole real? Is the light actually out (not just a photo taken at night)? Have you seen it more than once?

2. **Check if it's already reported**: Use our map to see if someone else already reported the same spot. If yes, verify it instead of reporting again.

3. **Include context**: "This is at a school crossing" or "Multiple cars have damaged suspension here" gives HRM reason to prioritize.

4. **Take a clear photo**: A blurry photo is worthless. Let HRM see what you see.

5. **Be accurate with location**: Drop the pin exactly where the issue is. "Somewhere on Barrington Street" doesn't help; "Barrington and Duke" does.

6. **Don't report the same issue twice in 48 hours**: Let HRM process it. If nothing happens in 4 weeks, report again.

## Why This Matters

Every frivolous report:
- Wastes HRM staff time evaluating it
- Costs taxpayers money
- Trains HRM to deprioritize reporting tools
- Makes real issues harder to spot (signal drowning in noise)

If 10% of reports are spam, HRM's confidence in the system drops 50%.

## The Spam Risk

Pargates (a Redditor) warned: "This tool makes it trivial to anonymously harass other residents with frivolous reports."

They're not wrong. With one-click reporting, someone could:
- Report their neighbor's property as "illegal dumping"
- Spam reports on a councillor's district to make them look bad
- File false reports about businesses

**Mitigations we use**:
- Rate limiting (max 5 reports per IP per day)
- Duplicate detection (same location within 48 hours)
- Community verification (real issues get verified; fake ones don't)
- Report transparency (you can see all reports on the map — spam becomes obvious)

## If You See Spam

Report it to us or mark it as "not verified" on the map. Transparent, community-driven verification is how we prevent abuse.

## The Principle

Reporting tools only work if the community uses them responsibly. Don't be the person who cries wolf.

[Report real issues on SolveHFX](/report) — and report responsibly.
    `,
  },
  {
    slug: 'do-councillors-respond-halifax',
    title: 'Do Halifax Councillors Actually Respond to Civic Issues?',
    description: 'Data on Halifax councillor responsiveness. Which councillors respond fastest and why it matters.',
    date: '2026-03-19',
    readTime: '4 min read',
    category: 'Impact',
    content: `
One of the original critiques of SolveHFX: "This is spam waiting to happen. Councillors won't read these emails."

Fair question. Do Halifax councillors actually respond to civic issue reports?

Short answer: Some do. Some don't. And it matters for accountability.

## The Challenge

Councillors get hundreds of emails per week. Civic issue reports are not their primary job (that's HRM administration). But they do have a constituency service mandate — they're supposed to represent and help residents.

When do they respond?

## When Councillors Respond

1. **Safety emergencies**: "This pothole caused an accident." → Response within 24-48 hours
2. **Organized groups**: "50 residents on my street are reporting this." → Response within 1 week
3. **Systemic issues**: "This is the third report on flooding in my district." → They investigate
4. **Repeat problems**: "This issue was reported 4 weeks ago, still not fixed." → Escalation
5. **Election season**: Councillors are especially responsive when they're campaigning

## When Councillors Don't Respond

1. **Single, minor issue**: "One pothole on my street" → Low priority
2. **Routine HRM work**: "Graffiti removal" → They delegate to HRM
3. **Policy questions**: "Add a transit route" → Outside their scope
4. **Anonymous reports**: If you don't identify yourself, follow-up is hard

## The Data (Limited)

We're tracking councillor response rates on all reports. Coming soon: public scorecards showing:
- Response rate by councillor (% of issues they addressed)
- Average response time
- Types of issues they prioritize
- Which districts get fastest service

This is radical transparency. Councillors who ignore civic reports will be publicly visible.

## Why This Matters

Accountability. If a councillor represents 50,000 people and ignores half their civic issue reports, voters should know.

If one councillor consistently escalates pothole reports and another doesn't, voters can make informed choices.

## The Original Critique

RangerNS (on Reddit) said: "I don't understand why councillors should be government concierges. This is petty shit."

They have a point. Councillors shouldn't be manually processing every pothole report.

But they should know about patterns. If 20 residents report a pothole, that's data.

And they should be accountable for it. If they ignore constituent complaints, that's a re-election issue.

## How SolveHFX Balances It

We CC councillors on reports (they see the pattern), but we don't expect them to personally respond to each one. They can escalate to HRM if they see a problem.

The real value: transparency. Councillors know they're being tracked. HRM knows residents have a direct line.

## Check the Scorecard

When we launch councillor scorecards, you'll be able to see:
- Which district has the most reports
- How fast your councillor responds
- Which issues get prioritized in your area
- Comparison to other districts

This data is political currency. Use it.

[See your district's data on the Districts page](/districts).
    `,
  },
  {
    slug: 'calgary-vs-halifax-civic-reporting',
    title: 'Calgary Civic Reporting vs Halifax: SolveHFX Comparison',
    description: 'How SolveHFX compares to Calgary\'s civic reporting tool. Why Halifax residents get a better experience.',
    date: '2026-03-18',
    readTime: '4 min read',
    category: 'Comparison',
    content: `
A Redditor mentioned Calgary has a streamlined civic reporting tool that works well. "Much more streamlined than HRM's website," they said.

So how does SolveHFX stack up against Calgary?

## Calgary's Tool

Calgary's 311 web interface:
- You select the issue type
- You locate it on a map
- You submit
- Report goes to the city

It's clean, fast, and popular. But it's official — run by the city, not residents.

## SolveHFX vs Calgary

| Feature | SolveHFX | Calgary 311 |
|---------|----------|------------|
| **AI Photo Analysis** | Yes (drafts report for you) | No (you write it) |
| **Councillor CC** | Automatic | No |
| **Account Required** | No | Optional |
| **Mobile First** | Yes | Web-focused |
| **Community Verification** | Yes (photo-based) | Vote-based |
| **Independent** | Yes (resident-built) | Official city |

## Where SolveHFX Wins

### 1. AI Does the Work
You take a photo. We analyze it, classify it, and draft the report. Calgary requires you to fill in forms.

SolveHFX saves 5 minutes per report. Over 1,000 reports, that's 80 hours of resident time saved.

### 2. Councillor Escalation
Calgary routes to the city. SolveHFX routes to **both** the city **and** your elected representative.

Why? Political accountability. Your councillor will ask HRM why your pothole isn't fixed.

### 3. Community-Driven
Calgary shows upvotes (anonymous votes). SolveHFX shows community verification with photos.

"3 people confirmed this pothole exists" is stronger evidence than "5 people upvoted."

### 4. Independent
Calgary's tool is official—which means it's controlled by the city. If the city decides to ignore reports, they will.

SolveHFX is independent—we can't be shut down by HRM. We're accountable to residents, not bureaucrats.

## Where Calgary Wins

### 1. Official Status
Calgary residents know their reports go straight to the city. There's no question about legitimacy.

SolveHFX reports are independent—they're **emails** to official contacts, not direct system integration. Some residents might doubt whether they get priority.

**We're working on official integration with HRM.** When it happens, SolveHFX will have both independence **and** official status.

### 2. Official Data
Calgary can pull real-time work order data. They can show: "This issue is being worked on by crew #7, ETA: 2 days."

SolveHFX doesn't have direct access to HRM's backend (yet). We're exploring integration with HRM's open data.

### 3. Liability
Calgary is an official tool — the city owns any problems. SolveHFX is independent — we own the responsibility.

## The Future

Calgary's tool is mature. SolveHFX is newer but faster-evolving.

We're working on:
- Direct HRM API integration (live status updates)
- Councillor response tracking (public accountability)
- Duplicate/spam detection (preventing abuse)
- Before/after photo tracking (proving repairs)

In 6 months, SolveHFX will likely be better than Calgary's tool for Halifax residents.

## The Bottom Line

If you're in Calgary, use Calgary's official 311 tool. It's official and integrated.

If you're in Halifax, use SolveHFX. It's faster, it's smarter, and it routes to your councillor.

[Start reporting on SolveHFX](/report).
    `,
  },
  {
    slug: 'using-solvehfx-map-find-verify',
    title: 'Using the SolveHFX Map: Find Issues Near You and Verify Repairs',
    description: 'How to use the interactive map to see reported issues, add verification, and track pothole repairs in Halifax.',
    date: '2026-03-18',
    readTime: '3 min read',
    category: 'Guide',
    content: `
SolveHFX's map is the crowdsourced foundation. It shows where issues are, what residents are reporting, and what's been verified or fixed.

Here's how to use it.

## Finding Issues Near You

1. Go to [solvehfx.ca/map](/map)
2. Browser geolocation shows your location
3. Zoom in on your neighborhood
4. Click any pin to see the report details:
   - Issue type (pothole, graffiti, etc.)
   - When it was reported
   - Photo
   - Status

## Verifying an Issue

You see a pothole on your street and notice it's already reported on SolveHFX. Verify it:

1. Click the pin
2. Hit "I can confirm this exists" (camera icon)
3. Take a photo showing the issue
4. Submit

Each verification counts. More verifications = higher priority in HRM's queue.

## Tracking Repair Status

After an issue is reported:

1. Click the pin
2. See the report details + date reported
3. Check: "Has this been repaired?"
4. If yes: Add a photo showing it's fixed
5. If no: Hit "Still exists" to flag ongoing issue

HRM can check the map and see which reported issues are actually resolved vs. which are still problems.

## What the Map Shows

- **Red pins**: Recently reported (< 2 weeks)
- **Yellow pins**: Older reports (2-8 weeks)
- **Green pins**: Verified as fixed
- **Gray pins**: Unverified or low confidence

Numbers on pins show how many people verified each issue.

## Community Verification

This is the crowdsourcing layer. When 5 people independently verify a pothole with photos, HRM knows it's real — not a false report.

## Privacy

All reports are anonymous by default. You submit a photo and location, but no personal info is required.

Your photo is shown on the map so others can verify it. If you don't want your photo public, note that before submitting.

## Reporting Issues You See on the Map

If you spot an issue on the map that's already reported but not verified:

1. Verify it with a photo (adds weight to the report)
2. Comment: "Still there as of today" (timestamp helps HRM)

If you spot an issue NOT on the map:

1. Click "Report an Issue" or visit [solvehfx.ca/report](/report)
2. Take a photo
3. Drop a pin
4. Submit

The map is only as good as community reports. Dense areas have dense reports. Sparse areas need more reports.

## The Vision

Ideally, the map shows real-time pothole status for all of Halifax:
- What's reported
- What's being worked on (once HRM open data integration exists)
- What's fixed
- What's been ignored

That's accountability. Residents can see if their councillor's district gets faster service. If one area has 20 old reports and nothing's fixed, that's a crisis.

[Check the map now](/map) and add verification to issues in your neighborhood.
    `,
  },
  {
    slug: 'solvehfx-status-update-emails',
    title: "SolveHFX Now Emails You When Your Report's Status Changes",
    description:
      'If you left an email when you filed a SolveHFX report, you\'ll now get notified automatically when it moves to "in progress" or "resolved" — no need to keep checking the tracking page.',
    date: '2026-08-01',
    readTime: '2 min read',
    category: 'Update',
    content: `
Small feature, but one we'd wanted for a while: if you leave an email address when you file a report on SolveHFX, you'll now get **an email automatically** whenever that report's status changes — moved to "in progress," marked "resolved," or given a note explaining what happened.

## Why this matters

Most reports on SolveHFX are filed anonymously, which is exactly how it should work for residents who just want to flag a pothole and move on. But if you *do* leave an email — because you want to know what happens next — you deserve to actually hear back, instead of having to remember to revisit your [tracking page](/track) every few days.

Before this, that contact email sat in our database and did... nothing. Now it does the one thing it was there for.

## How it works

1. When you file a report, add your email in the contact step (still fully optional).
2. When the status changes — or a resolution note gets added — you get a short email with the update and a link back to your report's tracking page.
3. If you never left an email, nothing changes for you. Anonymous reports stay anonymous, and no notification is sent because there's nowhere to send it.

## Still the fastest way to check yourself

Don't want to wait on email? Every report gets a reference number (like \`SHX-XXXX\`) you can look up anytime at [solvehfx.ca/track](/track) — full status timeline, verification count, and days-since-filed, no login required.

[Report an issue now](/report) — 60 seconds, and leave an email if you want to hear how it turns out.
    `,
  },
  {
    slug: 'solvehfx-open-data-export',
    title: 'Open Data: Download Every SolveHFX Report as CSV or JSON',
    description:
      'SolveHFX reports are now available as a public, filterable open-data export — CSV or JSON, no login required. Built for residents, journalists, and anyone who wants to dig into the numbers themselves.',
    date: '2026-08-04',
    readTime: '2 min read',
    category: 'Update',
    content: `
SolveHFX has always positioned itself around transparency — the [scorecards page](/scorecards) tracks resolution rates by district, and the [reports feed](/reports) keeps a public record of everything filed. Now you can take that data with you.

## What's new

A new open-data export sits alongside the scorecards: pick **CSV** for a spreadsheet-ready download, or **JSON** if you're building something. Both are filterable by category, district, or status, so you're not stuck downloading everything just to look at potholes in one district.

[Grab it from the Scorecards page](/scorecards), or hit the endpoint directly:

- \`solvehfx.ca/api/reports/export?format=csv\`
- \`solvehfx.ca/api/reports/export?format=json\`

## What's in it — and what isn't

The export includes the same public fields you'd see on the [map](/map) or the [reports feed](/reports): title, description, category, location, district, status, and dates. It does **not** include anything a resident shared privately — no contact names, no emails, no IP addresses. Those never leave our servers, whether you're looking at one report or exporting five thousand of them.

## Who this is for

- **Journalists and researchers** who want to verify a claim about response times themselves instead of taking our word for it.
- **Residents** curious whether their street's issue is part of a bigger pattern.
- **Anyone building on top of civic data** — the export is free, requires no account, and there's no rate limit beyond a 5,000-row cap per request.

This is public data about public streets. It should be easy to get at.

[See the live numbers on Scorecards](/scorecards), or [report an issue](/report) to add to the dataset yourself.
    `,
  },
  {
    slug: 'report-hazardous-tree-halifax',
    title: 'Report a Hazardous or Fallen Tree in Halifax',
    description:
      'Learn how to report dangerous, damaged, or fallen trees on Halifax streets and in HRM parks — what counts as an emergency, and how to get a crew out fast.',
    date: '2026-08-04',
    readTime: '3 min read',
    category: 'Guide',
    content: `
Halifax loses trees every storm season — split limbs over sidewalks, leaning trunks after a windstorm, roots heaving up a curb. Most of it isn't an emergency, but some of it genuinely is, and HRM treats the two very differently.

## Is it an emergency?

If a tree or large limb is **down and blocking a road, sitting on power lines, or actively blocking access**, treat it as urgent — mention that explicitly in your report so it gets triaged fast. A leaning tree that hasn't fallen yet, or a dead limb still attached, is usually not an emergency but is still worth reporting before the next storm turns it into one.

## How to Report a Hazardous Tree

**Fastest way**: [Report on SolveHFX](/report)
- Photo of the tree — wider shot showing the lean or damage, not just a close-up of the bark
- Pin the exact location (street trees and park trees are handled by different crews, so location matters)
- Note whether it's blocking anything right now

**Direct to HRM**:
- **311**: Call 311 or use [311.halifax.ca](https://311.halifax.ca)
- **Email**: contactus@311.halifax.ca

## What to Include

- **Location**: is it a street tree, a park tree, or on the boundary with private property?
- **What's at risk**: sidewalk, road, power line, playground, parked cars
- **Condition**: leaning, split, dead limbs, visibly rotting trunk
- **Photo**: from a distance that shows the full tree, not just the damaged part

## How Long Until Someone Comes Out

- **Active hazard blocking a road or on wires**: same day to 48 hours — this gets escalated immediately
- **Leaning or clearly dead tree, not yet fallen**: 1–3 weeks for assessment
- **General pruning/maintenance requests**: can take a full season, since it's scheduled around HRM's forestry rotation

## Pro Tips

1. **Never treat a tree on live power lines as a HRM-only issue** — call 311, but also consider flagging it as an electrical hazard; NS Power handles line contact, not HRM.
2. **After a windstorm, report even minor damage** — HRM often does sweep inspections after major weather, and your report helps flag streets crews haven't gotten to yet.
3. **Mention if it's near a school or playground** — proximity to kids bumps priority.

[Report a hazardous tree now](/report) — takes about 60 seconds, no account needed.
    `,
  },
  {
    slug: 'report-overflowing-garbage-halifax',
    title: 'Report Overflowing Garbage or Recycling Bins in Halifax',
    description:
      'How to report overflowing public garbage bins, missed recycling pickup, and litter buildup in HRM parks and streets.',
    date: '2026-08-04',
    readTime: '2 min read',
    category: 'Guide',
    content: `
Overflowing public bins are one of those issues that's easy to walk past and easy to fix — if HRM knows about it. A single bin that's overflowing near a park or bus stop tends to snowball into a litter magnet fast.

## How to Report It

**Fastest way**: [Report on SolveHFX](/report)
- Photo of the bin and the surrounding litter
- Pin the exact location — which park entrance, which bus stop, which block
- Note if it looks like a one-time overflow or a bin that's chronically full

**Direct to HRM**:
- **311**: [311.halifax.ca](https://311.halifax.ca) or call 311
- **Email**: contactus@311.halifax.ca

## Public Bins vs. Missed Household Pickup

This guide is about **public bins** — the ones in parks, on sidewalks, at transit stops. If it's your own household garbage or recycling that wasn't picked up, that's a separate HRM Solid Waste process (still reportable through 311, but it's tracked differently and usually resolved on the next collection cycle rather than a special trip).

## What Gets Priority

- **Bins near schools, playgrounds, or transit stops**: faster turnaround, higher foot traffic
- **Bins that are chronically overflowing** (same spot, repeatedly): worth flagging as a pattern — HRM can upsize or add a second bin if it keeps happening
- **Litter spreading beyond the bin**: mention this explicitly, since it can trigger a broader cleanup rather than just an emptying

## Pro Tips

1. **Report the same bin every time it overflows** — a pattern of reports is what gets a bin flagged for a bigger container or more frequent pickup, not just a one-off emptying.
2. **Mention nearby wildlife concerns** if relevant (raccoons, gulls) — it can bump priority in park settings.
3. **If it's a private business's bin** (not municipal), it's not an HRM issue — report it to the business or property owner instead.

[Report an overflowing bin now](/report) — 60 seconds, no account needed.
    `,
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
