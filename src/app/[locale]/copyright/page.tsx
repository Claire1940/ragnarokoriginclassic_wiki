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
  const path = '/copyright'
  const title = `Copyright Notice - ${siteName}`
  const description = `Copyright and attribution information for ${siteName}. Learn how we handle original content, fair use, and DMCA requests.`

  return {
    title,
    description,
    keywords: [
      'copyright notice',
      'Ragnarok Origin Classic Wiki copyright',
      'DMCA policy',
      'intellectual property',
      'content ownership',
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

export default function Copyright() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative py-20 px-4 border-b border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Copyright Notice
          </h1>
          <p className="text-slate-300 text-lg mb-2">
            Ownership, fair use, and takedown information
          </p>
          <p className="text-slate-400 text-sm">
            Last Updated: March 26, 2026
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>1. Original Content</h2>
            <p>
              Original guides, copy, and site design published on Ragnarok Origin Classic Wiki are owned by the site
              unless stated otherwise.
            </p>

            <h2>2. Game Assets</h2>
            <p>
              Ragnarok Origin Classic, Gravity, and related logos, artwork, and trademarks belong to their respective
              owners. We use game-related references only for informational and community purposes.
            </p>

            <h2>3. Fair Use</h2>
            <p>
              We rely on fair use and similar doctrines where appropriate when discussing game mechanics, screenshots,
              and other reference material for educational content.
            </p>

            <h2>4. DMCA Requests</h2>
            <p>
              If you need to report a copyright issue, email{' '}
              <a href="mailto:dmca@ragnarokoriginclassic.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                dmca@ragnarokoriginclassic.wiki
              </a>
              .
            </p>

            <h2>5. Attribution</h2>
            <p>
              When sharing our material, please credit Ragnarok Origin Classic Wiki and link back to the relevant
              page.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
