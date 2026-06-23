import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Terms of Use — SolveHFX',
  description:
    'Terms of Use for SolveHFX, including acceptable use, disclaimers, and service limitations.',
  alternates: { canonical: 'https://solvehfx.ca/terms' },
  openGraph: {
    title: 'Terms of Use — SolveHFX',
    description:
      'Read the terms and conditions for using SolveHFX civic reporting tools.',
    url: 'https://solvehfx.ca/terms',
  },
};

const EFFECTIVE_DATE = 'June 22, 2026';

export default function TermsPage() {
  return (
    <div>
      <section className="border-b border-rule bg-bg-elev">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 pt-10 sm:pt-14 pb-10">
          <Breadcrumbs
            items={[{ label: 'Home', href: '/' }, { label: 'Terms of Use' }]}
          />
          <Reveal className="mt-5">
            <p className="text-[11.5px] font-semibold tracking-[0.16em] uppercase text-primary/70">
              Legal
            </p>
            <h1 className="mt-3 text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-tight text-balance">
              Terms of Use
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
              These Terms of Use govern your use of SolveHFX. By using the
              service, you agree to these terms.
            </p>
          </Reveal>

          <Reveal delay={40}>
            <div>
              <h2 className="text-[20px] text-text-primary tracking-tight mb-2">
                1. Service description
              </h2>
              <p>
                SolveHFX helps residents submit civic issue reports by drafting
                and routing reports to public authorities and district councillors.
              </p>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div>
              <h2 className="text-[20px] text-text-primary tracking-tight mb-2">
                2. Independent service
              </h2>
              <p>
                SolveHFX is independent and is not affiliated with, endorsed by,
                or operated by Halifax Regional Municipality or other government
                agencies.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div>
              <h2 className="text-[20px] text-text-primary tracking-tight mb-2">
                3. Acceptable use
              </h2>
              <ul className="space-y-2">
                <li>Submit only truthful, good-faith reports about civic issues.</li>
                <li>Do not submit spam, harassment, threats, or illegal content.</li>
                <li>Do not attempt to abuse, disrupt, or bypass platform protections.</li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div>
              <h2 className="text-[20px] text-text-primary tracking-tight mb-2">
                4. User responsibility
              </h2>
              <p>
                You are responsible for the accuracy and legality of information
                you submit. You must have the right to upload any image or content
                provided.
              </p>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div>
              <h2 className="text-[20px] text-text-primary tracking-tight mb-2">
                5. Prohibited conduct
              </h2>
              <ul className="space-y-2">
                <li>No false, misleading, defamatory, or intentionally abusive reports.</li>
                <li>No personal attacks, hate speech, threats, or unlawful material.</li>
                <li>No malware, scraping abuse, or attempts to compromise the platform.</li>
                <li>No impersonation of public officials, residents, or organizations.</li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={240}>
            <div>
              <h2 className="text-[20px] text-text-primary tracking-tight mb-2">
                6. Moderation and enforcement
              </h2>
              <p>
                We may review, limit, reject, remove, or suspend content and access
                at our discretion to protect users, public agencies, and platform
                integrity.
              </p>
            </div>
          </Reveal>

          <Reveal delay={280}>
            <div>
              <h2 className="text-[20px] text-text-primary tracking-tight mb-2">
                7. No guarantee of resolution
              </h2>
              <p>
                SolveHFX cannot guarantee that any authority will respond to or
                resolve a report within a specific timeline.
              </p>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <div>
              <h2 className="text-[20px] text-text-primary tracking-tight mb-2">
                8. Availability and changes
              </h2>
              <p>
                We may modify, suspend, or discontinue parts of the service at any
                time. We may also update these Terms by publishing revised versions
                on this page.
              </p>
            </div>
          </Reveal>

          <Reveal delay={360}>
            <div>
              <h2 className="text-[20px] text-text-primary tracking-tight mb-2">
                9. Disclaimer of warranties
              </h2>
              <p>
                SolveHFX is provided on an as-is and as-available basis. To the
                fullest extent permitted by law, we disclaim all warranties,
                express or implied, including merchantability, fitness for a
                particular purpose, and non-infringement.
              </p>
            </div>
          </Reveal>

          <Reveal delay={400}>
            <div>
              <h2 className="text-[20px] text-text-primary tracking-tight mb-2">
                10. Limitation of liability
              </h2>
              <p>
                To the fullest extent permitted by law, SolveHFX is provided on an
                as-is basis and we are not liable for indirect, incidental,
                special, consequential, exemplary, or punitive damages, or for
                lost data, profits, revenue, reputation, or goodwill arising from
                use of the service.
              </p>
            </div>
          </Reveal>

          <Reveal delay={440}>
            <div>
              <h2 className="text-[20px] text-text-primary tracking-tight mb-2">
                11. Indemnification
              </h2>
              <p>
                You agree to defend, indemnify, and hold harmless SolveHFX and its
                operator from claims, damages, liabilities, losses, and expenses
                arising from your use of the service, your content, or your breach
                of these Terms.
              </p>
            </div>
          </Reveal>

          <Reveal delay={480}>
            <div>
              <h2 className="text-[20px] text-text-primary tracking-tight mb-2">
                12. Governing law
              </h2>
              <p>
                These Terms are governed by the laws of Nova Scotia and applicable
                federal laws of Canada, without regard to conflict-of-law
                principles.
              </p>
            </div>
          </Reveal>

          <Reveal delay={520}>
            <div>
              <h2 className="text-[20px] text-text-primary tracking-tight mb-2">
                13. Severability
              </h2>
              <p>
                If any provision of these Terms is found unenforceable, the
                remaining provisions remain in full force and effect.
              </p>
            </div>
          </Reveal>

          <Reveal delay={560}>
            <div>
              <h2 className="text-[20px] text-text-primary tracking-tight mb-2">
                14. Contact
              </h2>
              <p>
                Questions about these Terms can be sent to{' '}
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

          <Reveal delay={600}>
            <div className="text-center pt-2">
              <Link href="/privacy">
                <Button variant="outline">View Privacy Policy</Button>
              </Link>
            </div>
          </Reveal>
        </article>
      </section>
    </div>
  );
}
