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
  const path = '/about'
  const title = `About ${siteName}`
  const description = `Learn about ${siteName}, an unofficial fan-made resource for Ragnarok Origin Classic codes, classes, builds, and launch guides.`

  return {
    title,
    description,
    keywords: [
      'about Ragnarok Origin Classic Wiki',
      'ROOC community',
      'Ragnarok wiki',
      'game resource hub',
      'Ragnarok Origin Classic team',
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

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative py-20 px-4 border-b border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About Ragnarok Origin Classic Wiki
          </h1>
          <p className="text-slate-300 text-lg mb-2">
            A community resource for classes, builds, codes, and launch coverage
          </p>
          <p className="text-slate-400 text-sm">
            Last Updated: March 26, 2026
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>What We Cover</h2>
            <p>
              Ragnarok Origin Classic Wiki focuses on practical information players actually search for: gift codes,
              classes, builds, early progression, PvP basics, and launch-day updates.
            </p>

            <h2>Our Approach</h2>
            <ul>
              <li>Keep pages concise and easy to scan</li>
              <li>Prioritize official information and verified community discoveries</li>
              <li>Link to official resources when they are available</li>
              <li>Update dates whenever site content changes materially</li>
            </ul>

            <h2>Contact</h2>
            <p>
              For general questions, email{' '}
              <a href="mailto:contact@ragnarokoriginclassic.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                contact@ragnarokoriginclassic.wiki
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
