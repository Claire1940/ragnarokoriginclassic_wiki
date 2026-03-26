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
  const path = '/privacy-policy'
  const title = `Privacy Policy - ${siteName}`
  const description = `Privacy Policy for ${siteName}. Learn how we collect, use, and protect data when you browse guides, codes, and class resources.`

  return {
    title,
    description,
    keywords: [
      'privacy policy',
      'Ragnarok Origin Classic Wiki privacy',
      'data protection',
      'user privacy',
      'GDPR compliance',
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

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative py-20 px-4 border-b border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-slate-300 text-lg mb-2">
            How we collect, use, and protect your information
          </p>
          <p className="text-slate-400 text-sm">
            Last Updated: March 26, 2026
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>1. Information We Collect</h2>
            <p>
              Ragnarok Origin Classic Wiki collects only the information needed to run the site and improve
              the experience for readers.
            </p>
            <ul>
              <li>Analytics data such as page views, device type, and browser information</li>
              <li>Language preference stored in local storage or cookies</li>
              <li>Standard server logs for security, debugging, and abuse prevention</li>
            </ul>

            <h2>2. How We Use Information</h2>
            <ul>
              <li>To deliver and maintain the website</li>
              <li>To understand which guides and pages are most useful</li>
              <li>To improve performance, navigation, and search features</li>
              <li>To prevent fraud, spam, and technical abuse</li>
            </ul>

            <h2>3. Cookies and Analytics</h2>
            <p>
              We may use cookies and analytics tools to measure traffic and improve content quality. If analytics
              is enabled, it is used only for aggregated site insights and not for selling personal data.
            </p>

            <h2>4. Third-Party Services</h2>
            <p>
              The site may link to official community channels such as Discord, Facebook, YouTube, Reddit, and the
              official Ragnarok Origin Classic website. Their privacy practices are governed by their own policies.
            </p>

            <h2>5. Data Retention and Security</h2>
            <p>
              We keep data only as long as needed for the purposes described above and apply reasonable safeguards
              to protect site systems. No internet service can guarantee perfect security.
            </p>

            <h2>6. Contact</h2>
            <p>
              For privacy questions, contact{' '}
              <a href="mailto:privacy@ragnarokoriginclassic.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                privacy@ragnarokoriginclassic.wiki
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
