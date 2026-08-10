import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';
import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Privacy Policy — SolveHFX',
  description:
    'Privacy Policy for SolveHFX, including what data we collect, how we use it, and how long we keep it.',
  alternates: { canonical: 'https://www.solvehfx.ca/privacy' },
  openGraph: {
    title: 'Privacy Policy — SolveHFX',
    description:
      'Learn what information SolveHFX collects, how reports are processed, and your privacy choices.',
    url: 'https://www.solvehfx.ca/privacy',
  },
};

const EFFECTIVE_DATE = 'August 10, 2026';

function Mail() {
  return (
    <a
      className="text-primary hover:underline underline-offset-4"
      href="mailto:support@solvehfx.ca"
    >
      support@solvehfx.ca
    </a>
  );
}

const SECTIONS: { title: string; body: ReactNode }[] = [
  {
    title: 'Reporting anonymously',
    body: (
      <p>
        You do not need an account, a name, or an email address to file a report.
        Most reports on SolveHFX are anonymous. Sharing your name or email is
        entirely optional, and you should only do it if you want the city or your
        councillor to be able to follow up, or you want status updates by email.
      </p>
    ),
  },
  {
    title: 'Information we collect',
    body: (
      <ul className="space-y-2">
        <li>
          <span className="text-text-primary">Report content.</span> The title,
          description, category, photo, and the location you select.
        </li>
        <li>
          <span className="text-text-primary">Optional contact details.</span> Your
          name and email, only if you choose to enter them.
        </li>
        <li>
          <span className="text-text-primary">Location data.</span> The coordinates
          of the point you place on the map, or your device location if you use the
          &ldquo;use my location&rdquo; button and grant permission.
        </li>
        <li>
          <span className="text-text-primary">IP address.</span> Recorded with each
          submission to enforce rate limits and prevent spam and abuse.
        </li>
        <li>
          <span className="text-text-primary">Consent record.</span> The time you
          accepted the terms and public visibility notice, and which version of that
          wording you saw.
        </li>
        <li>
          <span className="text-text-primary">Account data.</span> If you create an
          optional account, your email address and authentication data.
        </li>
        <li>
          <span className="text-text-primary">Usage data.</span> Basic, aggregated
          page analytics and performance metrics.
        </li>
      </ul>
    ),
  },
  {
    title: 'Photo metadata',
    body: (
      <p>
        Photos are resized and re-encoded in your browser before they are uploaded.
        That process strips embedded EXIF metadata, including any GPS coordinates
        your camera recorded. The only location associated with your report is the
        one shown on the map when you submit it.
      </p>
    ),
  },
  {
    title: 'How we use information',
    body: (
      <ul className="space-y-2">
        <li>To generate a draft report from your photo and route it to the right authority.</li>
        <li>To email reports to HRM 311, Nova Scotia Public Works, or Halifax Transit.</li>
        <li>To copy your district councillor so your elected representative can see it.</li>
        <li>To send you status updates, if you provided an email address.</li>
        <li>To display reports publicly on the map, reports feed, and scorecards.</li>
        <li>To prevent spam, duplicates, and platform abuse.</li>
        <li>To understand overall usage and keep the service reliable.</li>
      </ul>
    ),
  },
  {
    title: 'AI processing of your photo',
    body: (
      <p>
        When you upload a photo, it is sent to Anthropic&apos;s Claude API, a
        third-party AI service, which analyses the image and produces a draft
        title, category, and description. Your name, email, and IP address are not
        sent with it. Anthropic processes the image to return that result and, per
        their commercial terms, does not use API inputs to train their models. If
        you would rather not have a photo processed this way, you can skip the
        photo step and write your report manually.
      </p>
    ),
  },
  {
    title: 'Consent, and withdrawing it',
    body: (
      <p>
        We rely on your consent, given when you submit a report, to process this
        information. You can withdraw consent at any time by emailing <Mail /> and
        asking us to remove your report or your contact details. Withdrawal does
        not affect processing already carried out, and cannot recall an email
        already delivered to a public body.
      </p>
    ),
  },
  {
    title: 'Who we share information with',
    body: (
      <>
        <p>
          <span className="text-text-primary">Public bodies.</span> Report content
          is emailed to the relevant authority and, where applicable, your district
          councillor. If you provided a name or email, it is included so they can
          follow up with you. Once delivered, that email is under their control and
          is subject to their own retention and access-to-information rules.
        </p>
        <p className="mt-3">
          <span className="text-text-primary">Service providers.</span> We use
          Vercel (hosting and analytics), Supabase (database, file storage, and
          authentication), Anthropic (AI photo analysis), Resend (email delivery),
          and Mapbox (maps and geocoding). These providers process data on our
          behalf and may store it on servers outside Canada, including in the
          United States, where local authorities may be able to compel access under
          their own laws.
        </p>
        <p className="mt-3">
          We do not sell your personal information, and we do not use it for
          advertising or share it with data brokers.
        </p>
      </>
    ),
  },
  {
    title: 'Public report visibility',
    body: (
      <>
        <p>
          Report content may appear on public pages for civic transparency. Do not
          include sensitive personal information in report text or images.
        </p>
        <p className="mt-3">
          Report content — the photo, description, issue category, and general
          location — may also be shared publicly beyond this website, including on
          SolveHFX social media accounts or with news media, to raise awareness of
          civic issues in Halifax.
        </p>
        <p className="mt-3">
          Your personal details are never part of that. Names, email addresses, and
          IP addresses are never published on this site, posted to social media,
          shared with media, or included in public data exports. If you want a
          report you submitted removed from public display, email <Mail />.
        </p>
      </>
    ),
  },
  {
    title: 'Cookies and analytics',
    body: (
      <p>
        SolveHFX does not use advertising or cross-site tracking cookies. We use
        Vercel Analytics and Speed Insights, which collect aggregated, anonymized
        page and performance data without cookie-based tracking of individuals. If
        you sign in to an optional account, Supabase sets a cookie needed to keep
        you logged in.
      </p>
    ),
  },
  {
    title: 'How long we keep information',
    body: (
      <ul className="space-y-2">
        <li>
          <span className="text-text-primary">Reports.</span> Kept indefinitely as a
          public record of what was reported and whether it was fixed, which is
          central to the transparency purpose of the service.
        </li>
        <li>
          <span className="text-text-primary">Contact details.</span> Kept with the
          report so follow-up remains possible. Removed on request.
        </li>
        <li>
          <span className="text-text-primary">IP addresses.</span> Retained for
          abuse prevention and rate limiting.
        </li>
        <li>
          <span className="text-text-primary">Account data.</span> Kept until you
          ask us to delete the account.
        </li>
      </ul>
    ),
  },
  {
    title: 'Security',
    body: (
      <p>
        We use reasonable technical and organizational safeguards, including
        access controls that keep contact details and IP addresses off public pages
        and out of public data exports. No system can guarantee absolute security.
        If a breach occurs that creates a real risk of significant harm, we will
        notify affected people and the Office of the Privacy Commissioner of Canada
        as required by law.
      </p>
    ),
  },
  {
    title: 'Your rights',
    body: (
      <p>
        You can ask what personal information we hold about you, ask us to correct
        it, ask us to delete it, withdraw consent, or ask that a report be removed
        from public display. Email <Mail /> and we will respond within a reasonable
        time, normally 30 days. There is no charge. We may need to keep limited
        information where required by law or to resolve disputes.
      </p>
    ),
  },
  {
    title: "Children's privacy",
    body: (
      <p>
        SolveHFX is not directed to children under 13, and we do not knowingly
        collect personal information from them. If you believe a child has provided
        us personal information, email <Mail /> and we will delete it.
      </p>
    ),
  },
  {
    title: 'Accountability and complaints',
    body: (
      <p>
        SolveHFX is operated by an individual in Halifax, Nova Scotia, who is
        responsible for privacy questions and can be reached at <Mail />. If you
        are not satisfied with our response, you may contact the Office of the
        Privacy Commissioner of Canada at priv.gc.ca.
      </p>
    ),
  },
  {
    title: 'Changes to this policy',
    body: (
      <p>
        We may update this policy from time to time. Updates are posted on this
        page with a revised effective date. Material changes affecting how we use
        information already collected will be described clearly.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <div>
      <section className="border-b border-rule bg-bg-elev">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 pt-10 sm:pt-14 pb-10">
          <Breadcrumbs
            items={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]}
          />
          <Reveal className="mt-5">
            <p className="text-[11.5px] font-semibold tracking-[0.16em] uppercase text-primary/70">
              Legal
            </p>
            <h1 className="mt-3 text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-tight text-balance">
              Privacy Policy
            </h1>
            <p className="mt-4 text-[15px] text-text-secondary">
              Effective date: {EFFECTIVE_DATE}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <article className="mx-auto max-w-3xl space-y-8 text-[15px] leading-[1.75] text-text-secondary">
          <Reveal>
            <p>
              SolveHFX is an independent civic reporting tool for Halifax Regional
              Municipality. This policy explains what we collect, why, who we share
              it with, and how to get it removed. The short version: you can report
              anonymously, your photo is analysed by an AI service, and your name
              and email are never made public.
            </p>
          </Reveal>

          {SECTIONS.map((section, i) => (
            <Reveal key={section.title} delay={Math.min(40 + i * 30, 400)}>
              <div>
                <h2 className="text-[20px] text-text-primary tracking-tight mb-2">
                  {i + 1}. {section.title}
                </h2>
                {section.body}
              </div>
            </Reveal>
          ))}

          <Reveal delay={420}>
            <div className="rounded-2xl border border-rule bg-bg-elev p-5 sm:p-6">
              <h2 className="text-[18px] text-text-primary tracking-tight mb-2">
                Contact
              </h2>
              <p>
                Questions about this Privacy Policy can be sent to <Mail />.
              </p>
            </div>
          </Reveal>

          <Reveal delay={460}>
            <div className="text-center pt-2">
              <Link href="/terms">
                <Button variant="outline">View Terms of Use</Button>
              </Link>
            </div>
          </Reveal>
        </article>
      </section>
    </div>
  );
}
