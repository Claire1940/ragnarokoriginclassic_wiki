import type { Metadata } from 'next'
import { buildLanguageAlternates } from '@/lib/i18n-utils'
import { type Locale } from '@/i18n/routing'

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ragnarokoriginclassic.wiki'
  const siteName = 'Ragnarok Origin Classic Wiki'
  const path = '/terms-of-service'
  const title = `Terms of Service - ${siteName}`
  const description = `Terms of Service for ${siteName}. Review the rules for using our guides, database pages, and community resources.`

  return {
    title,
    description,
    keywords: [
      'terms of service',
      'Ragnarok Origin Classic Wiki terms',
      'website terms',
      'usage policy',
      'community guidelines',
    ],
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
    openGraph: {
      type: 'website',
      locale: locale,
      url: locale === 'en' ? `${siteUrl}${path}` : `${siteUrl}/${locale}${path}`,
      siteName,
      title,
      description,
      images: [
        {
          url: `${siteUrl}/images/hero.webp`,
          width: 1200,
          height: 630,
          alt: `${siteName} hero image`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${siteUrl}/images/hero.webp`],
    },
    alternates: buildLanguageAlternates(path, locale as Locale, siteUrl),
  }
}

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative py-20 px-4 border-b border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-slate-300 text-lg mb-2">
            Rules for using the site
          </p>
          <p className="text-slate-400 text-sm">
            Last Updated: March 26, 2026
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing Ragnarok Origin Classic Wiki, you agree to these Terms and to use the site in a lawful,
              respectful, and non-abusive manner.
            </p>

            <h2>2. Unofficial Fan Site</h2>
            <p>
              This site is an unofficial community resource. It is not affiliated with Gravity or any official
              Ragnarok Origin Classic partner.
            </p>

            <h2>3. Content Usage</h2>
            <p>
              You may read and share links to our pages for personal, informational, and community purposes. Do not
              copy our content in a misleading way or republish it as your own without attribution.
            </p>

            <h2>4. External Links</h2>
            <p>
              We may link to official and third-party sites. We are not responsible for the content, policies, or
              availability of external websites.
            </p>

            <h2>5. Changes to the Site</h2>
            <p>
              We may update, remove, or reorganize content at any time. We may also revise these Terms and will update
              the date on this page when we do.
            </p>

            <h2>6. Contact</h2>
            <p>
              For legal questions, email{' '}
              <a href="mailto:legal@ragnarokoriginclassic.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                legal@ragnarokoriginclassic.wiki
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
