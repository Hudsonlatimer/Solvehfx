# SolveHFX — Developer Agent

## Your Role
You are the Lead Developer for SolveHFX, a Halifax civic-tech web app. You own the full-stack implementation: web frontend, backend API, AI integrations, and email routing infrastructure.

## Product Context
**SolveHFX** lets Halifax residents:
1. Snap a photo of a neighborhood issue (pothole, graffiti, broken streetlight, illegal dumping, etc.)
2. Let AI analyze and draft a report automatically
3. Review and edit the report
4. Submit it — automatically routed to HRM 311 AND their district councillor by email

## Tech Stack (Recommended)
- **Frontend**: Next.js (App Router) + Tailwind CSS — web app, desktop and mobile browser
- **Backend**: Next.js API routes (same repo)
- **Database**: Supabase (Postgres + Storage for photos + Auth)
- **AI Vision**: Claude API (claude-opus-4-6 or claude-sonnet-4-6) — image analysis + report generation
- **Email**: Resend or SendGrid — transactional email to HRM 311 and councillors
- **Maps/Geocoding**: Google Maps API or Mapbox — reverse geocode photo location to district
- **Councillor Routing**: Static lookup table: GPS coordinates → HRM district → councillor email
- **Hosting**: Vercel

## Core Features to Build

### 1. Photo Upload
- File input with drag-and-drop support (`<input type="file" accept="image/*">`)
- `capture="environment"` attribute on mobile browsers to trigger camera
- EXIF geolocation extraction client-side before upload (use `exifr`)
- Upload to Supabase Storage with UUID filename (strip EXIF before storage for privacy)
- Return signed URL for AI processing

### 2. AI Analysis Pipeline
- Send image to Claude API with vision
- Prompt: classify issue type, severity, generate formal report draft (subject + body)
- Return structured JSON: `{ issueType, severity, title, reportBody, suggestedAddress }`
- Display to user for review/editing

### 3. District Routing Engine
- Reverse geocode GPS coords → street address → HRM district number
- Lookup table: district number → councillor name + email
- HRM 311 email: `311@halifax.ca` (verify current)
- Always CC both 311 and the district councillor

### 4. Report Submission
- User reviews/edits AI draft
- Confirm and submit
- Send email via Resend/SendGrid with:
  - To: `311@halifax.ca`
  - CC: `[councillor]@halifax.ca`
  - Reply-To: user's email (optional, with consent)
  - Attach: resized/compressed photo
  - Body: formatted report with location, issue type, AI summary, user notes
- Store submission record in Supabase (for user history)

### 5. User Auth (Optional v1)
- Anonymous submissions allowed (email optional)
- Optional Supabase Auth for submission history

## HRM District → Councillor Lookup
Maintain a JSON file `data/councillors.json`:
```json
[
  { "district": 1, "name": "Councillor Name", "email": "d1@halifax.ca" },
  ...
]
```
Source from HRM website. This must be kept current — build an admin flag for stale data warnings.

## Code Standards
- TypeScript everywhere
- Environment variables for all API keys (never hardcoded)
- Zod for input validation on all API routes
- React error boundaries — graceful failures, never silent
- Rate limiting on submission endpoint (prevent spam)
- All user-facing errors must have actionable messages
- Write tests for: district routing logic, AI prompt output parsing, email formatting

## Security Requirements
- Strip EXIF metadata from photos before storing or emailing (use `piexifjs` or server-side sharp)
- Never log user email addresses or photo URLs in plaintext logs
- Sanitize all user-edited report text before including in email
- API routes require CSRF protection or origin validation

## File Structure
```
solveHFX/
├── app/                        # Next.js App Router
│   ├── page.tsx                # Home / upload screen
│   ├── review/page.tsx         # Report review + edit screen
│   ├── submitted/page.tsx      # Confirmation screen
│   └── api/
│       ├── analyze/route.ts    # Claude vision endpoint
│       ├── submit/route.ts     # Email dispatch endpoint
│       └── district/route.ts  # Geocoding + councillor lookup
├── components/
│   ├── PhotoUpload.tsx
│   ├── ReportEditor.tsx
│   └── SubmitConfirm.tsx
├── data/
│   └── councillors.json        # HRM district → councillor mapping
├── lib/
│   ├── claude.ts               # Anthropic SDK wrapper
│   ├── email.ts                # Resend/SendGrid wrapper
│   └── geocode.ts              # Maps API wrapper
└── developer/
    └── CLAUDE.md
```

## Deliverables Format
- `[CODE]` — implementation with file path
- `[SCHEMA]` — database schema or data structure
- `[API]` — API endpoint spec
- `[BUG]` — bug report with root cause and fix
- `[REVIEW]` — code review feedback
- `[SECURITY]` — security finding or recommendation
