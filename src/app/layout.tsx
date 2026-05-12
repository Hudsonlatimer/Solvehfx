import type { Metadata } from 'next';
import { DM_Sans, Fraunces } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import './globals.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  axes: ['opsz', 'SOFT'],
});

const BASE_URL = 'https://solvehfx.ca';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'SolveHFX — Fix Halifax. Together.',
    template: '%s | SolveHFX',
  },
  description:
    'Report potholes, graffiti, broken streetlights, and other civic issues in Halifax, Nova Scotia. AI-powered reports sent directly to HRM 311 and your district councillor in 60 seconds.',
  keywords: [
    'Halifax', 'HRM', 'civic reporting', 'pothole', 'report', '311',
    'councillor', 'Nova Scotia', 'graffiti', 'streetlight', 'sidewalk',
    'road damage', 'Halifax Regional Municipality', 'civic issues',
    'city report', 'fix Halifax', 'SolveHFX', 'municipal services',
    'community reporting', 'neighbourhood issues', 'Dartmouth',
    'Bedford', 'Sackville', 'Clayton Park', 'Halifax Transit',
  ],
  authors: [{ name: 'SolveHFX' }],
  creator: 'SolveHFX',
  publisher: 'SolveHFX',
  formatDetection: {
    email: false,
    telephone: false,
  },
  manifest: '/manifest.json',
  other: {
    'theme-color': '#003865',
    'mobile-web-app-capable': 'yes',
    'google-site-verification': '',
  },
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: BASE_URL,
    siteName: 'SolveHFX',
    title: 'SolveHFX — Fix Halifax. Together.',
    description:
      'Snap a photo of a civic issue. AI writes the report. We send it to HRM 311 and your district councillor. 60 seconds to make your neighbourhood better.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SolveHFX — Report civic issues in Halifax, Nova Scotia',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SolveHFX — Fix Halifax. Together.',
    description:
      'Snap a photo. AI writes the report. We send it to HRM 311 and your councillor. 60 seconds.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here when you have them
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  category: 'technology',
};

// JSON-LD structured data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'SolveHFX',
  url: BASE_URL,
  description:
    'AI-powered civic issue reporting for Halifax, Nova Scotia. Report potholes, graffiti, broken streetlights, and more — sent to HRM 311 and your district councillor.',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'CAD',
  },
  areaServed: {
    '@type': 'City',
    name: 'Halifax',
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'Nova Scotia',
      addressCountry: 'CA',
    },
  },
  creator: {
    '@type': 'Organization',
    name: 'SolveHFX',
    url: BASE_URL,
  },
};

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'SolveHFX',
  url: BASE_URL,
  description: 'Independent civic reporting platform for Halifax Regional Municipality residents.',
  areaServed: {
    '@type': 'AdministrativeArea',
    name: 'Halifax Regional Municipality',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Halifax',
      addressRegion: 'NS',
      addressCountry: 'CA',
    },
  },
  sameAs: [
    'https://x.com/SolveHFX',
    'https://instagram.com/SolveHFX',
    'https://facebook.com/SolveHFX',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${fraunces.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="SolveHFX" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-32.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link href="https://api.mapbox.com/mapbox-gl-js/v3.4.0/mapbox-gl.css" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-[family-name:var(--font-body)]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
