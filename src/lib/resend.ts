import { Resend } from 'resend';
import type { RoadAuthority, Report, District } from './types';
import { AUTHORITY_EMAILS } from './types';
import { getCategoryById } from './districts';

function getResend() {
  return new Resend(process.env.RESEND_API_KEY!);
}

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://solvehfx.ca';

interface DispatchParams {
  report: Report;
  district: District | null;
  authority: RoadAuthority;
}

function getPriority(category: string): string {
  if (category === 'snow_ice' || category === 'pothole') return 'P1 — High';
  return 'P2 — Standard';
}

export async function dispatchEmails({ report, district, authority }: DispatchParams) {
  const authorityInfo = AUTHORITY_EMAILS[authority];
  const category = getCategoryById(report.category);
  const categoryLabel = category?.label || report.category;
  const priority = getPriority(report.category);

  const authorityEmail = getResend().emails.send({
    from: 'SolveHFX Reports <reports@solvehfx.ca>',
    to: [authorityInfo.email],
    subject: `[SolveHFX] New Report: ${report.title} — ${report.address || 'Unknown location'} [Ref: ${report.reference_number}]`,
    text: `A resident has reported a civic issue via SolveHFX.

Reference Number: ${report.reference_number}
${report.contact_email ? `Contact Email: ${report.contact_email}` : '(No contact email provided)'}

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

${district?.councillor_name ? `This report was also sent to Councillor ${district.councillor_name}.` : ''}

---
SolveHFX — Civic reporting for Halifax
solvehfx.ca`,
  });

  const councillorEmail =
    district?.councillor_email
      ? getResend().emails.send({
          from: 'SolveHFX Reports <reports@solvehfx.ca>',
          to: [district.councillor_email],
          subject: `[SolveHFX] Constituent Report: ${report.title} — ${report.address || 'Unknown'}, ${district.name} [Ref: ${report.reference_number}]`,
          text: `A constituent in your district has submitted a civic issue report.

Reference Number: ${report.reference_number}
${report.contact_email ? `Constituent Email: ${report.contact_email}` : '(No contact email provided — constituent chose to remain anonymous)'}

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

  const results = await Promise.allSettled([authorityEmail, councillorEmail]);
  return {
    authoritySent: results[0].status === 'fulfilled',
    councillorSent: results[1].status === 'fulfilled',
  };
}
