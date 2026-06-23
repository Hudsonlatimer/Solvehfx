import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Privacy Policy — SolveHFX',
  description:
    'Privacy Policy for SolveHFX, including what data we collect, how we use it, and how long we keep it.',
  alternates: { canonical: 'https://solvehfx.ca/privacy' },
  openGraph: {
    title: 'Privacy Policy — SolveHFX',
    description:
      'Learn what information SolveHFX collects, how reports are processed, and your privacy choices.',
    url: 'https://solvehfx.ca/privacy',
  },
};

const EFFECTIVE_DATE = 'June 22, 2026';

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
              Municipality. This Privacy Policy explains what information we
              collect, how we use it, and your choices.
            </p>
          </Reveal>

          <Reveal delay={40}>
            <div>
              <h2 className="text-[20px] text-text-primary tracking-tight mb-2">
                1. Information we collect
              </h2>
              <ul className="space-y-2">
                <li>Report details you submit (title, description, category, location, photo).</li>
                <li>Optional contact info you provide (name and email).</li>
                <li>Technical metadata needed for abuse prevention and service reliability.</li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div>
              <h2 className="text-[20px] text-text-primary tracking-tight mb-2">
                2. How we use information
              </h2>
              <ul className="space-y-2">
                <li>To generate, submit, and route civic reports to the right authority.</li>
                <li>To send reports to HRM 311, Nova Scotia Public Works, or Halifax Transit.</li>
                <li>To copy district councillors when relevant for constituent visibility.</li>
                <li>To prevent spam, duplicate abuse, and platform misuse.</li>
                <li>To improve product quality and reliability.</li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div>
              <h2 className="text-[20px] text-text-primary tracking-tight mb-2">
                3. Legal basis and consent
              </h2>
              <p>
                By using SolveHFX and submitting information, you consent to this
                processing for civic-report routing and platform operation.
              </p>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div>
              <h2 className="text-[20px] text-text-primary tracking-tight mb-2">
                4. Sharing of information
              </h2>
              <p>
                We share report details with the relevant public authority and, when
                available, district councillors. We also rely on service providers
                for hosting, data storage, mapping, AI analysis, and email delivery.
                We do not sell your personal information.
              </p>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div>
              <h2 className="text-[20px] text-text-primary tracking-tight mb-2">
                5. Public report visibility
              </h2>
              <p>
                Report content may appear on public pages for civic transparency.
                Do not include sensitive personal information in report text or
                images.
              </p>
            </div>
          </Reveal>

          <Reveal delay={240}>
            <div>
              <h2 className="text-[20px] text-text-primary tracking-tight mb-2">
                6. Data retention
              </h2>
              <p>
                We retain report records to support tracking, transparency, and
                civic accountability. Optional contact details are retained only as
                needed for report follow-up and operations.
              </p>
            </div>
          </Reveal>

          <Reveal delay={280}>
            <div>
              <h2 className="text-[20px] text-text-primary tracking-tight mb-2">
                7. Security
              </h2>
              <p>
                We use reasonable technical and organizational safeguards, but no
                system can guarantee absolute security.
              </p>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <div>
              <h2 className="text-[20px] text-text-primary tracking-tight mb-2">
                8. International processing
              </h2>
              <p>
                Your information may be processed by service providers in
                jurisdictions outside your home region, subject to applicable legal
                safeguards.
              </p>
            </div>
          </Reveal>

          <Reveal delay={360}>
            <div>
              <h2 className="text-[20px] text-text-primary tracking-tight mb-2">
                9. Your rights
              </h2>
              <p>
                You can request access, correction, or deletion of personal
                information you provided, subject to legal and operational
                constraints.
              </p>
            </div>
          </Reveal>

          <Reveal delay={400}>
            <div>
              <h2 className="text-[20px] text-text-primary tracking-tight mb-2">
                10. Children's privacy
              </h2>
              <p>
                SolveHFX is not directed to children under 13, and we do not
                knowingly collect personal information from children under 13.
              </p>
            </div>
          </Reveal>

          <Reveal delay={440}>
            <div>
              <h2 className="text-[20px] text-text-primary tracking-tight mb-2">
                11. Changes to this policy
              </h2>
              <p>
                We may update this policy from time to time. Updates will be posted
                on this page with a revised effective date.
              </p>
            </div>
          </Reveal>

          <Reveal delay={480}>
            <div className="rounded-2xl border border-rule bg-bg-elev p-5 sm:p-6">
              <h2 className="text-[18px] text-text-primary tracking-tight mb-2">
                Contact
              </h2>
              <p>
                Questions about this Privacy Policy can be sent to{' '}
                <a
                  className="text-primary hover:underline underline-offset-4"
                  href="mailto:support@solvehfx.ca"
                >
                  support@solvehfx.ca
                </a>
                .
              </p>
            </div>
          </Reveal>

          <Reveal delay={520}>
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
