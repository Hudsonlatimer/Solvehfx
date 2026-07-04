import { Resend } from 'resend';
import type { RoadAuthority, Report, District } from './types';
import { AUTHORITY_EMAILS } from './types';
import { getCategoryById } from './districts';
import { sanitizeHeader } from './request';

function getResend() {
  return new Resend(process.env.RESEND_API_KEY!);
}

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://www.solvehfx.ca';

interface DispatchParams {
  report: Report;
  district: District | null;
  authority: RoadAuthority;
}

const OWNER_ALERT_EMAIL = process.env.OWNER_ALERT_EMAIL || 'hudsonlatimer4@gmail.com';

function getPriority(category: string): string {
  if (category === 'snow_ice' || category === 'pothole') return 'P1 — High';
  return 'P2 — Standard';
}

// Reports are anonymous unless the resident chose to share a name and/or email.
function contactLine(report: Report): string {
  const name = report.contact_name?.trim();
  const email = report.contact_email?.trim();
  if (name && email) return `Submitted by: ${name} <${email}>`;
  if (email) return `Contact email: ${email}`;
  if (name) return `Submitted by: ${name} (no email provided)`;
  return '(Submitted anonymously — no contact details provided)';
}

export async function dispatchEmails({ report, district, authority }: DispatchParams) {
  const authorityInfo = AUTHORITY_EMAILS[authority];
  const category = getCategoryById(report.category);
  const categoryLabel = category?.label || report.category;
  const priority = getPriority(report.category);

  // Subject lines must never carry raw newlines (email header injection) — strip
  // control chars from any resident-supplied text before interpolating.
  const safeTitle = sanitizeHeader(report.title);
  const safeAddress = report.address ? sanitizeHeader(report.address) : '';

  const authorityEmail = getResend().emails.send({
    from: 'SolveHFX Reports <reports@solvehfx.ca>',
    to: [authorityInfo.email],
    subject: `[SolveHFX] New Report: ${safeTitle} — ${safeAddress || 'Unknown location'} [Ref: ${report.reference_number}]`,
    text: `A resident has reported a civic issue via SolveHFX.

Reference Number: ${report.reference_number}
${contactLine(report)}

Issue Type: ${categoryLabel}
Location: ${report.address || 'Not specified'}
GPS: ${report.lat}, ${report.lng}
District: ${district?.name || 'Unknown'} (Councillor: ${district?.councillor_name || 'Unknown'})
Priority: ${priority}

Description:
${report.description}

${report.photo_url ? `Photo: ${report.photo_url}` : ''}

View full report: ${APP_URL}/reports/${report.id}
Track report status: ${APP_URL}/track/${report.reference_number}

---
SolveHFX — Civic reporting for Halifax
solvehfx.ca`,
  });

  // Per product spec: always CC the district councillor when we have their
  // address. The councillor is the resident's elected representative and should
  // see every report from their district alongside HRM 311.
  const councillorEmail =
    district?.councillor_email
      ? getResend().emails.send({
          from: 'SolveHFX Reports <reports@solvehfx.ca>',
          to: [district.councillor_email],
          subject: `[SolveHFX] Constituent Report: ${safeTitle} — ${safeAddress || 'Unknown'}, ${district.name} [Ref: ${report.reference_number}]`,
          text: `A constituent in your district has submitted a civic issue report.

Reference Number: ${report.reference_number}
${contactLine(report)}

Issue Type: ${categoryLabel}
Location: ${report.address || 'Not specified'}
District: ${district.name}

Description:
${report.description}

${report.photo_url ? `Photo: ${report.photo_url}` : ''}

View full report: ${APP_URL}/reports/${report.id}
Track report status: ${APP_URL}/track/${report.reference_number}

This report was also forwarded to ${authorityInfo.name} (${authorityInfo.email}).

---
SolveHFX — Civic reporting for Halifax
solvehfx.ca`,
        })
      : Promise.resolve(null);

  const ownerAlertEmail = getResend().emails.send({
    from: 'SolveHFX Alerts <reports@solvehfx.ca>',
    to: [OWNER_ALERT_EMAIL],
    subject: `[SolveHFX] New Submission ${report.reference_number} — ${categoryLabel}`,
    text: `A new report was submitted.

Reference: ${report.reference_number}
Issue: ${categoryLabel}
Title: ${safeTitle}
Location: ${report.address || 'Not specified'}
Authority: ${authorityInfo.name}
District: ${district?.name || 'Unknown'}
Priority: ${priority}

View report: ${APP_URL}/reports/${report.id}
Track report: ${APP_URL}/track/${report.reference_number}
`,
  });

  const results = await Promise.allSettled([authorityEmail, councillorEmail, ownerAlertEmail]);
  return {
    authoritySent: results[0].status === 'fulfilled',
    councillorSent: results[1].status === 'fulfilled',
    ownerAlertSent: results[2].status === 'fulfilled',
  };
}
