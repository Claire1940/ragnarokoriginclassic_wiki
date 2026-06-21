'use client'

import { setRequestLocale } from 'next-intl/server'
import { useEffect, useState, Suspense, lazy } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  ArrowUpRight,
  BadgeDollarSign,
  BadgeInfo,
  Brain,
  BookMarked,
  BookOpen,
  Check,
  ChevronDown,
  ClipboardCheck,
  Copy,
  Clock3,
  Coins,
  Feather,
  Gem,
  Gift,
  HandCoins,
  FlaskConical,
  HeartHandshake,
  Layers3,
  MapPinned,
  Pickaxe,
  Orbit,
  Package,
  PawPrint,
  Sparkles,
  Shield,
  ShieldCheck,
  ShoppingBag,
  ScrollText,
  Sword,
  Swords,
  Store,
  Castle,
  Target,
  Trophy,
  Ticket,
  TrendingUp,
  Users,
  Users2,
  Wrench,
  CircleDollarSign,
} from 'lucide-react'
import { useLocale, useMessages } from 'next-intl'
import { VideoFeature } from '@/components/home/VideoFeature'
import { NativeBannerAd, AdBanner, SidebarAd } from '@/components/ads'
import { scrollToSection } from '@/lib/scrollToSection'
import { DynamicIcon } from '@/components/ui/DynamicIcon'
import enMessages from '@/locales/en.json'

// Lazy load heavy components
const HeroStats = lazy(() => import('@/components/home/HeroStats'))
const FAQSection = lazy(() => import('@/components/home/FAQSection'))
const CTASection = lazy(() => import('@/components/home/CTASection'))

// Loading placeholder
const LoadingPlaceholder = ({ height = 'h-64' }: { height?: string }) => (
  <div className={`${height} bg-white/5 border border-border rounded-xl animate-pulse flex items-center justify-center`}>
    <div className="text-muted-foreground">Loading...</div>
  </div>
)

export default function HomePage() {
  const locale = useLocale()
  const translatedMessages = useMessages() as any
  const t = locale === 'en' ? translatedMessages : (enMessages as any)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ragnarokoriginclassic.wiki'
  const siteName = 'Ragnarok Origin Classic Wiki'
  const officialSite = 'https://roocasia.com/'

  // Structured data
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: siteName,
        description: 'ROOC wiki hub covering beginner routes, daily routine, skill builds, class builds, guild play, codes, and pets.',
        image: {
          '@type': 'ImageObject',
          url: `${siteUrl}/images/hero.webp`,
          width: 1200,
          height: 630,
          caption: 'Ragnarok Origin Classic Wiki hero image',
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: `${siteUrl}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: siteName,
        alternateName: 'ROOC Wiki',
        url: siteUrl,
        description: 'ROOC wiki resource hub for beginner guides, daily routine, skill builds, class builds, guild play, codes, and pets.',
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/android-chrome-512x512.png`,
          width: 512,
          height: 512,
        },
        image: {
          '@type': 'ImageObject',
          url: `${siteUrl}/images/hero.webp`,
          width: 1200,
          height: 630,
          caption: 'Ragnarok Origin Classic Wiki hero image',
        },
        sameAs: [
          officialSite,
          'https://discord.gg/EnbRyjURZz',
          'https://www.facebook.com/RagnarokOriginClassicEN/',
          'https://www.youtube.com/@RagnarokOriginClassic',
          'https://www.reddit.com/r/RagnarokOrigin/',
        ],
      },
      {
        '@type': 'VideoGame',
        name: 'Ragnarok Origin Classic',
        alternateName: 'ROOC',
        url: officialSite,
        image: `${siteUrl}/images/hero.webp`,
        description: 'Classic Ragnarok MMORPG with cross-platform play on Android, iOS, and Windows.',
        gamePlatform: ['Android', 'iOS', 'Windows'],
        applicationCategory: 'Game',
        genre: ['MMORPG', 'Fantasy', 'RPG'],
      },
    ],
  }

  // Copy state
  const [copiedPath, setCopiedPath] = useState<string | null>(null)
  const [expandedBuild, setExpandedBuild] = useState<string>('Sniper-ADL / Falcon Route')
  const [expandedWoeSection, setExpandedWoeSection] = useState<string>('Mode Overview')
  const [expandedPvpTier, setExpandedPvpTier] = useState<string>('S-3v3 Arena')

  const dailyRoutineIcons = [
    Gift,
    BookMarked,
    ClipboardCheck,
    Clock3,
    Sparkles,
    Trophy,
    Users,
    BookOpen,
  ]

  const skillBuildIcons = [
    Feather,
    Target,
    Swords,
    Orbit,
    Shield,
    Brain,
    FlaskConical,
    HeartHandshake,
  ]

  const classBuildIcons = [
    Feather,
    Target,
    Swords,
    Sparkles,
    Shield,
    Brain,
    FlaskConical,
    HeartHandshake,
  ]

  const gearProgressIcons = [
    Wrench,
    Package,
    ArrowUpRight,
    TrendingUp,
    Feather,
    Layers3,
    PawPrint,
    BadgeDollarSign,
    Store,
  ]

  const zenyFarmingIcons = [
    Coins,
    Pickaxe,
    ShoppingBag,
    BadgeInfo,
    CircleDollarSign,
    HandCoins,
  ]

  const f2pGuideIcons = [
    ShieldCheck,
    MapPinned,
    ScrollText,
    Ticket,
    Gem,
    Users2,
    Castle,
  ]

  const mvpGuideIcons = [
    Trophy,
    Sword,
    Swords,
    Target,
    Clock3,
    Ticket,
  ]

  const woeGuideIcons = [
    Castle,
    ShieldCheck,
    Swords,
    ScrollText,
    Ticket,
    MapPinned,
  ]

  const pvpGuideIcons = [
    Swords,
    Shield,
    Target,
    Trophy,
    Clock3,
    Ticket,
  ]

  const guildGuideIcons = [
    BookMarked,
    ClipboardCheck,
    ShoppingBag,
    Clock3,
    Sparkles,
    Castle,
  ]

  const codeGuideIcons = [
    Gift,
    Coins,
    BadgeDollarSign,
    CircleDollarSign,
    HandCoins,
    ScrollText,
    Ticket,
  ]

  const petGuideIcons = [
    PawPrint,
    Shield,
    Users2,
    Gem,
    Layers3,
  ]

  const sourceLabel = (url: string) => {
    try {
      return new URL(url).hostname.replace(/^www\./, '')
    } catch {
      return url
    }
  }

  const fallbackModules = (enMessages as any).modules
  const zenyModule = Array.isArray(t.modules?.universeMode?.items) ? t.modules.universeMode : fallbackModules.universeMode
  const f2pModule = Array.isArray(t.modules?.communityCreations?.items) ? t.modules.communityCreations : fallbackModules.communityCreations
  const mvpModule = Array.isArray(t.modules?.theIsland?.items) ? t.modules.theIsland : fallbackModules.theIsland
  const pvpModule = Array.isArray(t.modules?.pvpGuide?.items) ? t.modules.pvpGuide : fallbackModules.pvpGuide
  const guildModule = Array.isArray(t.modules?.guildGuide?.items) ? t.modules.guildGuide : fallbackModules.guildGuide
  const codesModule = Array.isArray(t.modules?.codes?.items) ? t.modules.codes : fallbackModules.codes
  const petsModule = Array.isArray(t.modules?.petsGuide?.items) ? t.modules.petsGuide : fallbackModules.petsGuide
  const woeModule = Array.isArray(t.modules?.myfaction?.items) ? t.modules.myfaction : fallbackModules.myfaction
  const codeRedeemSteps = [
    'Open the game',
    'Tap Rewards',
    'Open Redeem',
    'Enter the code and confirm',
  ]

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedPath(text)
      setTimeout(() => setCopiedPath(null), 2000)
    } catch (err) {
      console.error('Copy failed:', err)
    }
  }

  // Scroll reveal animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-reveal-visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('.scroll-reveal').forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* 广告位 1: 顶部横幅（Sticky）- 全平台显示 */}
      <div className="sticky top-20 z-20 border-b border-border py-2 bg-background/95 backdrop-blur-sm">
        <AdBanner
          type="banner-320x50"
          adKey={process.env.NEXT_PUBLIC_AD_MOBILE_320X50}
        />
      </div>

      {/* 左侧边栏 Sticky 广告 - 桌面端 */}
      <div className="hidden lg:block fixed left-4 top-24 z-10">
        <SidebarAd
          type="sidebar-160x600"
          adKey={process.env.NEXT_PUBLIC_AD_SIDEBAR_160X600}
        />
      </div>

      {/* 右侧边栏 Sticky 广告 - 桌面端 */}
      <div className="hidden lg:block fixed right-4 top-24 z-10">
        <SidebarAd
          type="sidebar-160x300"
          adKey={process.env.NEXT_PUBLIC_AD_SIDEBAR_160X300}
        />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Background Grid Effect */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-8 scroll-reveal">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                            bg-[hsl(var(--nav-theme)/0.1)]
                            border-2 border-[hsl(var(--gold)/0.5)] mb-6 glow-gold">
              <Sparkles className="w-4 h-4 text-[hsl(var(--gold))]" />
              <span className="text-sm font-semibold">{t.hero.badge}</span>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-bebas mb-6 leading-tight
                           bg-gradient-to-r from-foreground via-[hsl(var(--nav-theme))] to-foreground
                           bg-clip-text text-transparent
                           drop-shadow-[0_2px_8px_hsl(var(--nav-theme)/0.3)]">
              {t.hero.title}
            </h1>

            {/* Description */}
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto">
              {t.hero.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button
                onClick={() => scrollToSection('codes')}
                className="group inline-flex items-center justify-center gap-2 px-8 py-4
                           bg-[hsl(var(--nav-theme))] hover:bg-[hsl(var(--nav-theme)/0.9)]
                           text-white rounded-lg font-semibold text-lg
                           transition-all duration-300
                           hover:shadow-[0_8px_24px_hsl(var(--nav-theme)/0.4)]
                           hover:-translate-y-1"
              >
                <Gift className="w-5 h-5 transition-transform group-hover:scale-110" />
                {t.hero.getFreeCodesCTA}
              </button>
              <a
                href={officialSite}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4
                           border-2 border-[hsl(var(--gold)/0.5)] hover:bg-[hsl(var(--gold)/0.1)]
                           rounded-lg font-semibold text-lg
                           transition-all duration-300
                           hover:shadow-[0_8px_24px_rgba(251,191,36,0.3)]
                           hover:-translate-y-1"
              >
                {t.hero.playOnRobloxCTA}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Stats */}
          <Suspense fallback={<LoadingPlaceholder height="h-32" />}>
            <HeroStats stats={Object.values(t.hero.stats)} />
          </Suspense>
        </div>
      </section>

      {/* 广告位 2: 原生横幅 - Hero 区域下方 */}
      <NativeBannerAd adKey={process.env.NEXT_PUBLIC_AD_NATIVE_BANNER || ''} />

      {/* Video Section */}
      <section className="px-4 py-12">
        <div className="scroll-reveal container mx-auto">
          <div className="relative rounded-2xl overflow-hidden">
              <VideoFeature
                videoId="ltKiwPIe4TI"
                title="Ragnarok Origin Classic丨Official Launch Trailer丨03/26"
                posterImage="/images/hero.webp"
              />
          </div>
        </div>
      </section>

      {/* 广告位 3: 标准横幅 728×90 - 视频区域下方 */}
      <AdBanner
        type="banner-728x90"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90}
      />

      {/* Tools Grid - 16 Navigation Cards */}
      <section className="px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bebas mb-4">
              {t.tools.title}{' '}
              <span className="text-gold-gradient">
                {t.tools.titleHighlight}
              </span>
            </h2>
            <p className="text-muted-foreground text-lg">
              {t.tools.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {t.tools.cards.map((card: any, index: number) => {
              // 映射卡片索引到 section ID
              const sectionIds = [
                'release-editions', 'roster', 'ratings', 'controls',
                'daily-routine', 'skill-builds', 'class-builds', 'gear-progression',
                'universe-mode', 'community-creations', 'the-island', 'myfaction',
                'pvp-guide', 'guild-guide', 'codes', 'pets-guide'
              ]
              const sectionId = sectionIds[index]

              return (
                <button
                  key={index}
                  onClick={() => scrollToSection(sectionId)}
                  className="scroll-reveal group p-6 rounded-xl border-2 border-border
                             bg-card hover:border-[hsl(var(--gold)/0.6)]
                             transition-all duration-300 cursor-pointer text-left
                             hover:shadow-[0_12px_32px_rgba(251,191,36,0.2)]
                             hover:-translate-y-2 relative overflow-hidden"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Diagonal Decoration */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-[hsl(var(--gold)/0.1)] to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="w-12 h-12 rounded-lg mb-4
                                  bg-gradient-to-br from-[hsl(var(--nav-theme)/0.1)] to-[hsl(var(--gold)/0.1)]
                                  border-2 border-[hsl(var(--gold)/0.3)]
                                  flex items-center justify-center
                                  group-hover:border-[hsl(var(--gold))]
                                  transition-all duration-300 relative z-10">
                    <DynamicIcon
                      name={card.icon}
                      className="w-6 h-6 text-[hsl(var(--nav-theme-light))] group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <h3 className="font-bebas text-lg mb-2">{card.title}</h3>
                  <p className="text-sm text-muted-foreground">{card.description}</p>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* 广告位 4: 方形广告 300×250 - 导航卡片下方 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
      />

      {/* Module 1: Release & Editions */}
      <section id="release-editions" className="scroll-mt-24 px-4 py-20 scroll-reveal">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bebas mb-4 relative inline-block">
              {t.modules.releaseEditions.title}
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[hsl(var(--gold))] to-transparent" />
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mt-6">{t.modules.releaseEditions.subtitle}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {t.modules.releaseEditions.quickFacts.map((fact: any, i: number) => (
              <div key={i} className="p-4 rounded-lg bg-card border-2 border-[hsl(var(--gold)/0.3)] text-center hover:border-[hsl(var(--gold))] transition-all duration-300">
                <div className="text-2xl font-bebas text-gold-gradient">{fact.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{fact.label}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.modules.releaseEditions.editions.map((edition: any, i: number) => (
              <div key={i} className="p-6 rounded-xl border-2 border-border bg-card hover:border-[hsl(var(--nav-theme))] transition-all duration-300 hover:shadow-[0_8px_24px_hsl(var(--nav-theme)/0.2)] hover:-translate-y-1">
                <h3 className="text-xl font-bebas mb-2">{edition.name}</h3>
                <div className="text-3xl font-bebas text-gold-gradient mb-4">{edition.price}</div>
                <div className="text-sm text-muted-foreground mb-4">{edition.releaseDate}</div>
                <ul className="space-y-2">
                  {edition.includes.map((item: string, j: number) => (
                    <li key={j} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-[hsl(var(--nav-theme))] mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 广告位 5: 中型横幅 468×60 - 第1个模块下方 */}
      <AdBanner
        type="banner-468x60"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_468X60}
      />

      {/* Module 2: Roster */}
      <section id="roster" className="scroll-mt-24 px-4 py-20 bg-muted/30 scroll-reveal">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.modules.roster.title}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t.modules.roster.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {t.modules.roster.stats.map((stat: any, i: number) => (
              <div key={i} className="p-6 rounded-xl bg-card border border-border text-center">
                <div className="text-4xl font-bold text-[hsl(var(--nav-theme))] mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.modules.roster.categories.map((category: any, i: number) => (
              <div key={i} className="p-6 rounded-xl bg-card border border-border hover:border-[hsl(var(--nav-theme))] transition-all duration-300">
                <h3 className="text-lg font-bold mb-4 text-[hsl(var(--nav-theme))]">{category.name}</h3>
                <ul className="space-y-2">
                  {category.superstars.map((name: string, j: number) => (
                    <li key={j} className="text-sm flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--nav-theme))]" />
                      {name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 广告位 6: 移动端横幅 320×50 - 第2个模块下方 */}
      <AdBanner
        type="banner-320x50"
        adKey={process.env.NEXT_PUBLIC_AD_MOBILE_320X50}
      />

      {/* Module 3: Ratings */}
      <section id="ratings" className="scroll-mt-24 px-4 py-20 scroll-reveal">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bebas mb-4 relative inline-block">
              {t.modules.ratings.title}
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[hsl(var(--gold))] to-transparent" />
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mt-6">{t.modules.ratings.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-6 rounded-xl bg-card border-2 border-border hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300">
              <h3 className="text-2xl font-bebas mb-6 text-[hsl(var(--nav-theme))]">{t.modules.ratings.leftTitle}</h3>
              <div className="space-y-3">
                {t.modules.ratings.menTopRated.map((superstar: any, i: number) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors group">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[hsl(var(--gold))] to-[hsl(var(--gold-dark))] flex items-center justify-center font-bebas text-white">{i + 1}</div>
                      <span className="font-medium">{superstar.name}</span>
                    </div>
                    <div className="text-2xl font-bebas text-gold-gradient">{superstar.rating}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6 rounded-xl bg-card border-2 border-border hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300">
              <h3 className="text-2xl font-bebas mb-6 text-[hsl(var(--nav-theme))]">{t.modules.ratings.rightTitle}</h3>
              <div className="space-y-3">
                {t.modules.ratings.womenTopRated.map((superstar: any, i: number) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors group">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[hsl(var(--gold))] to-[hsl(var(--gold-dark))] flex items-center justify-center font-bebas text-white">{i + 1}</div>
                      <span className="font-medium">{superstar.name}</span>
                    </div>
                    <div className="text-2xl font-bebas text-gold-gradient">{superstar.rating}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Module 4: Controls */}
      <section id="controls" className="scroll-mt-24 px-4 py-20 bg-muted/30 scroll-reveal">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.modules.controls.title}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t.modules.controls.subtitle}</p>
          </div>
          <div className="space-y-6">
            {t.modules.controls.platforms.map((platform: any, i: number) => (
              <div key={i} className="p-6 rounded-xl bg-card border border-border">
                <h3 className="text-xl font-bold mb-4 text-[hsl(var(--nav-theme))]">{platform.name}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {platform.controls.map((control: any, j: number) => (
                    <div key={j} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <span className="text-sm font-medium">{control.action}</span>
                      <span className="px-3 py-1 rounded bg-[hsl(var(--nav-theme)/0.1)] text-[hsl(var(--nav-theme))] font-mono text-xs">{control.input}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 广告位 5: 方形广告 300×250 - Module 4-5 之间 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="my-8"
      />

      {/* Module 5: Daily Routine */}
      <section id="daily-routine" className="scroll-mt-24 px-4 py-20 scroll-reveal">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bebas mb-4 relative inline-block">
              {t.modules.dailyRoutine.title}
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[hsl(var(--gold))] to-transparent" />
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mt-6">
              {t.modules.dailyRoutine.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[1.05fr_0.95fr] gap-8 mb-10">
            <div className="rounded-3xl border border-[hsl(var(--nav-theme)/0.18)] bg-gradient-to-br from-card to-muted/20 p-8 shadow-[0_24px_80px_hsl(var(--nav-theme)/0.08)]">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[hsl(var(--nav-theme)/0.12)] text-[hsl(var(--nav-theme-light))]">
                  <Clock3 className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bebas text-[hsl(var(--nav-theme))]">Priority flow</h3>
                  <p className="text-sm text-muted-foreground">Ragnarok Origin Classic daily rhythm</p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {t.modules.dailyRoutine.intro}
              </p>
              <div className="mt-6 space-y-3">
                {t.modules.dailyRoutine.highlights.map((highlight: string, index: number) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-2xl border border-[hsl(var(--nav-theme)/0.14)] bg-background/60 p-4"
                  >
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[hsl(var(--nav-theme))]" />
                    <p className="text-sm text-foreground">{highlight}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-[hsl(var(--gold)/0.35)] bg-gradient-to-br from-[hsl(var(--gold)/0.08)] to-card p-8 shadow-[0_24px_80px_rgba(251,191,36,0.12)]">
              <h3 className="text-2xl font-bebas text-gold-gradient mb-5">First four priorities</h3>
              <div className="space-y-4">
                {t.modules.dailyRoutine.items.slice(0, 4).map((item: any, index: number) => (
                  <div
                    key={item.name}
                    className="flex items-center gap-4 rounded-2xl bg-background/70 p-4"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(var(--nav-theme))] text-sm font-bebas text-white">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-semibold">{item.name}</div>
                      <div className="text-xs text-muted-foreground">{item.frequency}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.modules.dailyRoutine.items.map((item: any, i: number) => {
              const DailyIcon = dailyRoutineIcons[i]

              return (
                <div
                  key={item.name}
                  className="group rounded-3xl border-2 border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[hsl(var(--nav-theme)/0.5)] hover:shadow-[0_16px_36px_hsl(var(--nav-theme)/0.12)]"
                >
                  <div className="mb-4 flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[hsl(var(--nav-theme)/0.1)] text-[hsl(var(--nav-theme-light))] transition-transform duration-300 group-hover:scale-105">
                      <DailyIcon className="h-6 w-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex flex-wrap gap-2">
                        <span className="rounded-full bg-[hsl(var(--nav-theme)/0.12)] px-3 py-1 text-xs font-semibold text-[hsl(var(--nav-theme-light))]">
                          {item.priority}
                        </span>
                        <span className="rounded-full border border-[hsl(var(--gold)/0.35)] px-3 py-1 text-xs font-semibold text-[hsl(var(--gold))]">
                          {item.frequency}
                        </span>
                      </div>
                      <h3 className="text-xl font-bebas text-foreground">{item.name}</h3>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.details}</p>
                  <div className="mt-5 rounded-2xl border border-[hsl(var(--nav-theme)/0.12)] bg-muted/40 p-4">
                    <p className="mb-2 text-xs uppercase tracking-[0.22em] text-[hsl(var(--nav-theme-light))]">
                      Why it matters
                    </p>
                    <p className="text-sm leading-relaxed">{item.why_it_matters}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Module 6: Skill Builds */}
      <section id="skill-builds" className="scroll-mt-24 px-4 py-20 bg-muted/30 scroll-reveal">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bebas mb-4 relative inline-block">
              {t.modules.skillBuilds.title}
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[hsl(var(--gold))] to-transparent" />
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mt-6">
              {t.modules.skillBuilds.subtitle}
            </p>
          </div>

          <div className="mx-auto mb-8 max-w-5xl rounded-3xl border border-[hsl(var(--nav-theme)/0.14)] bg-card/90 p-8 shadow-[0_20px_60px_hsl(var(--nav-theme)/0.08)]">
            <p className="text-muted-foreground leading-relaxed">
              {t.modules.skillBuilds.intro}
            </p>
          </div>

          <div className="space-y-4">
            {t.modules.skillBuilds.items.map((build: any, i: number) => {
              const BuildIcon = skillBuildIcons[i]
              const buildKey = `${build.job}-${build.build_name}`
              const isOpen = expandedBuild === buildKey

              return (
                <button
                  key={buildKey}
                  type="button"
                  onClick={() => setExpandedBuild(isOpen ? '' : buildKey)}
                  className="group w-full rounded-3xl border-2 border-border bg-card p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-[hsl(var(--nav-theme)/0.5)] hover:shadow-[0_16px_36px_hsl(var(--nav-theme)/0.12)]"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[hsl(var(--nav-theme)/0.1)] text-[hsl(var(--nav-theme-light))] transition-transform duration-300 group-hover:scale-105">
                      <BuildIcon className="h-6 w-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex flex-wrap items-center gap-3">
                        <h3 className="text-2xl font-bebas text-foreground">{build.job}</h3>
                        <span className="rounded-full bg-[hsl(var(--gold)/0.12)] px-3 py-1 text-xs font-semibold text-[hsl(var(--gold))]">
                          {build.build_name}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed text-muted-foreground">{build.best_for}</p>
                    </div>
                    <ChevronDown
                      className={`mt-1 h-5 w-5 flex-shrink-0 text-muted-foreground transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </div>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? 'mt-6 max-h-[420px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="rounded-2xl bg-muted/50 p-5">
                        <p className="mb-3 text-xs uppercase tracking-[0.22em] text-[hsl(var(--nav-theme-light))]">
                          Core skills
                        </p>
                        <ul className="space-y-2">
                          {build.core_skills.map((skill: string, skillIndex: number) => (
                            <li key={skillIndex} className="flex items-start gap-2 text-sm text-foreground">
                              <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[hsl(var(--nav-theme))]" />
                              <span>{skill}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="rounded-2xl bg-muted/50 p-5">
                        <p className="mb-3 text-xs uppercase tracking-[0.22em] text-[hsl(var(--nav-theme-light))]">
                          Build note
                        </p>
                        <p className="text-sm leading-relaxed text-muted-foreground">{build.notes}</p>
                      </div>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Module 7: Class Builds */}
      <section id="class-builds" className="scroll-mt-24 px-4 py-20 scroll-reveal">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bebas mb-4 relative inline-block">
              {t.modules.classBuilds.title}
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[hsl(var(--gold))] to-transparent" />
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mt-6">
              {t.modules.classBuilds.subtitle}
            </p>
          </div>

          <div className="mx-auto mb-10 max-w-5xl rounded-3xl border border-[hsl(var(--nav-theme)/0.14)] bg-card/90 p-8 shadow-[0_20px_60px_hsl(var(--nav-theme)/0.08)]">
            <p className="text-muted-foreground leading-relaxed">
              {t.modules.classBuilds.intro}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.modules.classBuilds.items.map((build: any, i: number) => {
              const ClassIcon = classBuildIcons[i]

              return (
                <div
                  key={`${build.class_name}-${build.archetype}`}
                  className="group rounded-3xl border-2 border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[hsl(var(--nav-theme)/0.5)] hover:shadow-[0_16px_36px_hsl(var(--nav-theme)/0.12)]"
                >
                  <div className="mb-5 flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[hsl(var(--nav-theme)/0.1)] text-[hsl(var(--nav-theme-light))] transition-transform duration-300 group-hover:scale-105">
                      <ClassIcon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bebas text-foreground">{build.class_name}</h3>
                      <p className="text-sm text-[hsl(var(--nav-theme-light))]">{build.archetype}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="mb-2 text-xs uppercase tracking-[0.22em] text-[hsl(var(--nav-theme-light))]">
                        Role
                      </p>
                      <p className="text-sm text-foreground">{build.role}</p>
                    </div>
                    <div>
                      <p className="mb-2 text-xs uppercase tracking-[0.22em] text-[hsl(var(--nav-theme-light))]">
                        Focus
                      </p>
                      <p className="text-sm leading-relaxed text-muted-foreground">{build.focus}</p>
                    </div>
                    <div className="rounded-2xl bg-muted/50 p-4">
                      <p className="mb-3 text-xs uppercase tracking-[0.22em] text-[hsl(var(--nav-theme-light))]">
                        Best for
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {build.best_for.map((tag: string, tagIndex: number) => (
                          <span
                            key={tagIndex}
                            className="rounded-full border border-[hsl(var(--nav-theme)/0.14)] bg-background/70 px-3 py-1 text-xs text-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-2xl border border-[hsl(var(--nav-theme)/0.12)] p-4">
                      <p className="mb-3 text-xs uppercase tracking-[0.22em] text-[hsl(var(--nav-theme-light))]">
                        Strengths
                      </p>
                      <ul className="space-y-2">
                        {build.strengths.map((strength: string, strengthIndex: number) => (
                          <li key={strengthIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[hsl(var(--nav-theme))]" />
                            <span>{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 广告位 6: 标准横幅 728×90 - Module 7-8 之间 */}
      <AdBanner
        type="banner-728x90"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90}
        className="my-8"
      />

      {/* Module 8: Gear Progression */}
      <section id="gear-progression" className="scroll-mt-24 px-4 py-20 bg-muted/30 scroll-reveal">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bebas mb-4 relative inline-block">
              {t.modules.gearProgression.title}
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[hsl(var(--gold))] to-transparent" />
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mt-6">
              {t.modules.gearProgression.subtitle}
            </p>
          </div>

          <div className="mx-auto mb-10 max-w-5xl rounded-3xl border border-[hsl(var(--nav-theme)/0.14)] bg-card/90 p-8 shadow-[0_20px_60px_hsl(var(--nav-theme)/0.08)]">
            <p className="text-muted-foreground leading-relaxed">
              {t.modules.gearProgression.intro}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {t.modules.gearProgression.items.map((stage: any, i: number) => {
              const GearIcon = gearProgressIcons[i]

              return (
                <div
                  key={stage.stage}
                  className="group rounded-3xl border-2 border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[hsl(var(--nav-theme)/0.5)] hover:shadow-[0_16px_36px_hsl(var(--nav-theme)/0.12)]"
                >
                  <div className="mb-4 flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[hsl(var(--nav-theme)/0.1)] text-[hsl(var(--nav-theme-light))] transition-transform duration-300 group-hover:scale-105">
                      <GearIcon className="h-6 w-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex flex-wrap items-center gap-3">
                        <span className="rounded-full bg-[hsl(var(--gold)/0.12)] px-3 py-1 text-xs font-semibold text-[hsl(var(--gold))]">
                          Step {i + 1}
                        </span>
                        <h3 className="text-xl font-bebas text-foreground">{stage.stage}</h3>
                      </div>
                      <p className="text-sm leading-relaxed text-[hsl(var(--nav-theme-light))]">{stage.focus}</p>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">{stage.details}</p>
                  <div className="mt-5 rounded-2xl border border-[hsl(var(--nav-theme)/0.12)] bg-muted/40 p-4">
                    <p className="mb-2 text-xs uppercase tracking-[0.22em] text-[hsl(var(--nav-theme-light))]">
                      Why now
                    </p>
                    <p className="text-sm leading-relaxed text-foreground">{stage.why_now}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Module 9: Zeny Farming */}
      <section id="universe-mode" className="scroll-mt-24 px-4 py-20 scroll-reveal">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-[hsl(var(--nav-theme-light))]">
              {zenyModule.eyebrow}
            </p>
            <h2 className="text-4xl md:text-5xl font-bebas mb-4 relative inline-block">
              {zenyModule.title}
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[hsl(var(--gold))] to-transparent" />
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mt-6">
              {zenyModule.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[0.9fr_1.1fr] gap-8 mb-10">
            <aside className="rounded-3xl border border-[hsl(var(--nav-theme)/0.14)] bg-gradient-to-br from-card to-muted/20 p-8 shadow-[0_24px_80px_hsl(var(--nav-theme)/0.08)]">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[hsl(var(--nav-theme)/0.12)] text-[hsl(var(--nav-theme-light))]">
                  <Coins className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bebas text-[hsl(var(--nav-theme))]">Currency route blueprint</h3>
                  <p className="text-sm text-muted-foreground">Ragnarok Origin Classic economy loop</p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {zenyModule.intro}
              </p>
              <div className="mt-6 space-y-3">
                {zenyModule.highlights.map((highlight: string, index: number) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-2xl border border-[hsl(var(--nav-theme)/0.14)] bg-background/60 p-4"
                  >
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[hsl(var(--nav-theme))]" />
                    <p className="text-sm text-foreground">{highlight}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl border border-[hsl(var(--gold)/0.2)] bg-[hsl(var(--gold)/0.06)] p-4">
                <p className="mb-3 text-xs uppercase tracking-[0.22em] text-[hsl(var(--nav-theme-light))]">
                  Source links
                </p>
                <div className="flex flex-wrap gap-2">
                  {zenyModule.source_urls.map((url: string) => (
                    <a
                      key={url}
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-[hsl(var(--nav-theme)/0.16)] bg-background/80 px-3 py-1 text-xs text-[hsl(var(--nav-theme-light))] transition-colors hover:border-[hsl(var(--nav-theme)/0.4)] hover:text-foreground"
                    >
                      {sourceLabel(url)}
                    </a>
                  ))}
                </div>
              </div>
              <div className="mt-6">
                <Link
                  href={zenyModule.cta.href}
                  className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--nav-theme))] px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[hsl(var(--nav-theme)/0.9)] hover:shadow-[0_10px_28px_hsl(var(--nav-theme)/0.28)]"
                >
                  {zenyModule.cta.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </aside>

            <div className="rounded-3xl border border-border bg-card shadow-[0_24px_80px_hsl(var(--nav-theme)/0.06)]">
              <div className="max-h-[820px] overflow-auto">
                <table className="hidden lg:table min-w-[1180px] w-full border-collapse">
                  <thead className="sticky top-0 z-10 bg-background/95 backdrop-blur">
                    <tr className="border-b border-border text-left text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      <th className="px-5 py-4">Method</th>
                      <th className="px-5 py-4">Category</th>
                      <th className="px-5 py-4">How to do it</th>
                      <th className="px-5 py-4">Best for</th>
                      <th className="px-5 py-4">Why it works</th>
                      <th className="px-5 py-4">Watch out for</th>
                    </tr>
                  </thead>
                  <tbody>
                    {zenyModule.items.map((item: any, i: number) => {
                      const ZenyIcon = zenyFarmingIcons[i]

                      return (
                        <tr
                          key={item.method}
                          className="border-b border-border/70 transition-colors hover:bg-muted/40"
                        >
                          <td className="px-5 py-5 align-top">
                            <div className="flex items-start gap-3">
                              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[hsl(var(--nav-theme)/0.1)] text-[hsl(var(--nav-theme-light))]">
                                <ZenyIcon className="h-5 w-5" />
                              </div>
                              <div>
                                <div className="text-base font-semibold text-foreground">{item.method}</div>
                                <div className="mt-1 text-xs uppercase tracking-[0.18em] text-[hsl(var(--nav-theme-light))]">
                                  {item.best_for}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-5 align-top">
                            <span className="inline-flex rounded-full bg-[hsl(var(--gold)/0.12)] px-3 py-1 text-xs font-semibold text-[hsl(var(--gold))]">
                              {item.category}
                            </span>
                          </td>
                          <td className="px-5 py-5 align-top text-sm leading-relaxed text-muted-foreground">
                            {item.how_to_do_it}
                          </td>
                          <td className="px-5 py-5 align-top text-sm leading-relaxed text-foreground">
                            {item.best_for}
                          </td>
                          <td className="px-5 py-5 align-top text-sm leading-relaxed text-muted-foreground">
                            {item.why_it_works}
                          </td>
                          <td className="px-5 py-5 align-top text-sm leading-relaxed text-foreground">
                            {item.watch_out_for}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>

                <div className="space-y-4 p-4 lg:hidden">
                  {zenyModule.items.map((item: any, i: number) => {
                    const ZenyIcon = zenyFarmingIcons[i]

                    return (
                      <article
                        key={item.method}
                        className="rounded-3xl border-2 border-border bg-card p-5 shadow-[0_14px_36px_hsl(var(--nav-theme)/0.08)]"
                      >
                        <div className="mb-4 flex items-start gap-3">
                          <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[hsl(var(--nav-theme)/0.1)] text-[hsl(var(--nav-theme-light))]">
                            <ZenyIcon className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bebas text-foreground">{item.method}</h3>
                            <span className="inline-flex rounded-full bg-[hsl(var(--gold)/0.12)] px-3 py-1 text-xs font-semibold text-[hsl(var(--gold))]">
                              {item.category}
                            </span>
                          </div>
                        </div>
                        <div className="grid gap-3">
                          <div className="rounded-2xl bg-muted/50 p-4">
                            <p className="mb-2 text-xs uppercase tracking-[0.18em] text-[hsl(var(--nav-theme-light))]">
                              How to do it
                            </p>
                            <p className="text-sm leading-relaxed text-foreground">{item.how_to_do_it}</p>
                          </div>
                          <div className="rounded-2xl bg-muted/50 p-4">
                            <p className="mb-2 text-xs uppercase tracking-[0.18em] text-[hsl(var(--nav-theme-light))]">
                              Best for
                            </p>
                            <p className="text-sm leading-relaxed text-foreground">{item.best_for}</p>
                          </div>
                          <div className="rounded-2xl bg-muted/50 p-4">
                            <p className="mb-2 text-xs uppercase tracking-[0.18em] text-[hsl(var(--nav-theme-light))]">
                              Why it works
                            </p>
                            <p className="text-sm leading-relaxed text-foreground">{item.why_it_works}</p>
                          </div>
                          <div className="rounded-2xl border border-[hsl(var(--gold)/0.2)] bg-[hsl(var(--gold)/0.06)] p-4">
                            <p className="mb-2 text-xs uppercase tracking-[0.18em] text-[hsl(var(--nav-theme-light))]">
                              Watch out for
                            </p>
                            <p className="text-sm leading-relaxed text-foreground">{item.watch_out_for}</p>
                          </div>
                        </div>
                      </article>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Module 10: F2P Guide */}
      <section id="community-creations" className="scroll-mt-24 px-4 py-20 bg-muted/30 scroll-reveal">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-[hsl(var(--nav-theme-light))]">
              {f2pModule.eyebrow}
            </p>
            <h2 className="text-4xl md:text-5xl font-bebas mb-4 relative inline-block">
              {f2pModule.title}
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[hsl(var(--gold))] to-transparent" />
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mt-6">
              {f2pModule.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[0.92fr_1.08fr] gap-8 mb-10">
            <aside className="rounded-3xl border border-[hsl(var(--nav-theme)/0.14)] bg-card p-8 shadow-[0_24px_80px_hsl(var(--nav-theme)/0.08)]">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[hsl(var(--nav-theme)/0.12)] text-[hsl(var(--nav-theme-light))]">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bebas text-[hsl(var(--nav-theme))]">Safe start plan</h3>
                  <p className="text-sm text-muted-foreground">Free and low-spend route</p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {f2pModule.intro}
              </p>
              <div className="mt-6 space-y-3">
                {f2pModule.highlights.map((highlight: string, index: number) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-2xl border border-[hsl(var(--nav-theme)/0.12)] bg-muted/40 p-4"
                  >
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[hsl(var(--nav-theme))]" />
                    <p className="text-sm text-foreground">{highlight}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl border border-[hsl(var(--gold)/0.2)] bg-[hsl(var(--gold)/0.06)] p-4">
                <p className="mb-3 text-xs uppercase tracking-[0.22em] text-[hsl(var(--nav-theme-light))]">
                  Source links
                </p>
                <div className="flex flex-wrap gap-2">
                  {f2pModule.source_urls.map((url: string) => (
                    <a
                      key={url}
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-[hsl(var(--nav-theme)/0.16)] bg-background/80 px-3 py-1 text-xs text-[hsl(var(--nav-theme-light))] transition-colors hover:border-[hsl(var(--nav-theme)/0.4)] hover:text-foreground"
                    >
                      {sourceLabel(url)}
                    </a>
                  ))}
                </div>
              </div>
              <div className="mt-6">
                <Link
                  href={f2pModule.cta.href}
                  className="inline-flex items-center gap-2 rounded-full border-2 border-[hsl(var(--nav-theme))] px-5 py-3 text-sm font-semibold text-[hsl(var(--nav-theme))] transition-all duration-300 hover:bg-[hsl(var(--nav-theme))] hover:text-white"
                >
                  {f2pModule.cta.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </aside>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {f2pModule.items.map((step: any, index: number) => {
                  const StepIcon = f2pGuideIcons[index]

                  return (
                    <div
                      key={step.label}
                      className="rounded-3xl border border-border bg-card p-5 shadow-[0_14px_36px_hsl(var(--nav-theme)/0.06)]"
                    >
                      <div className="mb-4 flex items-center justify-between">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[hsl(var(--nav-theme)/0.1)] text-[hsl(var(--nav-theme-light))]">
                          <StepIcon className="h-5 w-5" />
                        </div>
                        <div className="rounded-full border border-[hsl(var(--gold)/0.22)] px-3 py-1 text-xs font-semibold text-[hsl(var(--gold))]">
                          Step {step.step}
                        </div>
                      </div>
                      <h3 className="text-lg font-bebas text-foreground">{step.label}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.details}</p>
                    </div>
                  )
                })}
              </div>

              <div className="rounded-3xl border border-border bg-card p-6 shadow-[0_20px_60px_hsl(var(--nav-theme)/0.06)]">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[hsl(var(--nav-theme)/0.1)] text-[hsl(var(--nav-theme-light))]">
                    <Users2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bebas text-foreground">Efficient F2P checkpoints</h3>
                    <p className="text-sm text-muted-foreground">Keep progress smooth without wasting materials</p>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {f2pModule.highlights.map((highlight: string, index: number) => {
                    const HighlightIcon = f2pGuideIcons[index + 3]

                    return (
                      <div
                        key={highlight}
                        className="rounded-2xl border border-[hsl(var(--nav-theme)/0.12)] bg-muted/40 p-4"
                      >
                        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[hsl(var(--gold)/0.12)] text-[hsl(var(--gold))]">
                          <HighlightIcon className="h-5 w-5" />
                        </div>
                        <p className="text-sm leading-relaxed text-foreground">{highlight}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 广告位 7: 中型横幅 468×60 - Module 10-11 之间 */}
      <AdBanner
        type="banner-468x60"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_468X60}
        className="my-8"
      />

      {/* Module 11: MVP Guide */}
      <section id="the-island" className="scroll-mt-24 px-4 py-20 scroll-reveal">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-[hsl(var(--nav-theme-light))]">
              {mvpModule.eyebrow}
            </p>
            <h2 className="text-4xl md:text-5xl font-bebas mb-4 relative inline-block">
              {mvpModule.title}
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[hsl(var(--gold))] to-transparent" />
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mt-6">
              {mvpModule.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[0.92fr_1.08fr] gap-8 mb-10">
            <aside className="rounded-3xl border border-[hsl(var(--nav-theme)/0.14)] bg-gradient-to-br from-card to-muted/20 p-8 shadow-[0_24px_80px_hsl(var(--nav-theme)/0.08)]">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[hsl(var(--nav-theme)/0.12)] text-[hsl(var(--nav-theme-light))]">
                  <Trophy className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bebas text-[hsl(var(--nav-theme))]">Boss hunt priorities</h3>
                  <p className="text-sm text-muted-foreground">What matters before you enter a run</p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {mvpModule.intro}
              </p>
              <div className="mt-6 space-y-3">
                {mvpModule.highlights.map((highlight: string, index: number) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-2xl border border-[hsl(var(--nav-theme)/0.14)] bg-background/60 p-4"
                  >
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[hsl(var(--nav-theme))]" />
                    <p className="text-sm text-foreground">{highlight}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl border border-[hsl(var(--gold)/0.2)] bg-[hsl(var(--gold)/0.06)] p-4">
                <p className="mb-3 text-xs uppercase tracking-[0.22em] text-[hsl(var(--nav-theme-light))]">
                  Source links
                </p>
                <div className="flex flex-wrap gap-2">
                  {mvpModule.source_urls.map((url: string) => (
                    <a
                      key={url}
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-[hsl(var(--nav-theme)/0.16)] bg-background/80 px-3 py-1 text-xs text-[hsl(var(--nav-theme-light))] transition-colors hover:border-[hsl(var(--nav-theme)/0.4)] hover:text-foreground"
                    >
                      {sourceLabel(url)}
                    </a>
                  ))}
                </div>
              </div>
              <div className="mt-6">
                <Link
                  href={mvpModule.cta.href}
                  className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--nav-theme))] px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[hsl(var(--nav-theme)/0.9)]"
                >
                  {mvpModule.cta.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </aside>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {mvpModule.highlights.map((highlight: string, index: number) => {
                  const HighlightIcon = mvpGuideIcons[index + 3]

                  return (
                    <div
                      key={highlight}
                      className="rounded-3xl border border-border bg-card p-5 shadow-[0_14px_36px_hsl(var(--nav-theme)/0.06)]"
                    >
                      <div className="mb-4 flex items-center justify-between">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[hsl(var(--nav-theme)/0.1)] text-[hsl(var(--nav-theme-light))]">
                          <HighlightIcon className="h-5 w-5" />
                        </div>
                        <div className="rounded-full border border-[hsl(var(--gold)/0.22)] px-3 py-1 text-xs font-semibold text-[hsl(var(--gold))]">
                          Note {index + 1}
                        </div>
                      </div>
                      <p className="text-sm leading-relaxed text-foreground">{highlight}</p>
                    </div>
                  )
                })}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {mvpModule.items.map((item: any, i: number) => {
                  const BossIcon = mvpGuideIcons[i]

                  return (
                    <article
                      key={item.title}
                      className="group rounded-3xl border-2 border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[hsl(var(--nav-theme)/0.5)] hover:shadow-[0_16px_36px_hsl(var(--nav-theme)/0.12)]"
                    >
                      <div className="mb-4 flex items-start gap-4">
                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[hsl(var(--nav-theme)/0.1)] text-[hsl(var(--nav-theme-light))] transition-transform duration-300 group-hover:scale-105">
                          <BossIcon className="h-6 w-6" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-xl font-bebas text-foreground">{item.title}</h3>
                          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.summary}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {item.highlights.map((highlight: string, highlightIndex: number) => (
                          <div
                            key={highlightIndex}
                            className="flex items-start gap-3 rounded-2xl bg-muted/40 p-3"
                          >
                            <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[hsl(var(--nav-theme))]" />
                            <p className="text-sm leading-relaxed text-foreground">{highlight}</p>
                          </div>
                        ))}
                      </div>
                    </article>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Module 12: War of Emperium Guide */}
      <section id="myfaction" className="scroll-mt-24 px-4 py-20 bg-muted/30 scroll-reveal">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-[hsl(var(--nav-theme-light))]">
              {woeModule.eyebrow}
            </p>
            <h2 className="text-4xl md:text-5xl font-bebas mb-4 relative inline-block">
              {woeModule.title}
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[hsl(var(--gold))] to-transparent" />
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mt-6">
              {woeModule.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[0.92fr_1.08fr] gap-8">
            <aside className="rounded-3xl border border-[hsl(var(--nav-theme)/0.14)] bg-card p-8 shadow-[0_24px_80px_hsl(var(--nav-theme)/0.08)]">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[hsl(var(--nav-theme)/0.12)] text-[hsl(var(--nav-theme-light))]">
                  <Castle className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bebas text-[hsl(var(--nav-theme))]">Guild siege prep</h3>
                  <p className="text-sm text-muted-foreground">Roles, timing, and castle value</p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {woeModule.intro}
              </p>
              <div className="mt-6 space-y-3">
                {woeModule.highlights.map((highlight: string, index: number) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-2xl border border-[hsl(var(--nav-theme)/0.14)] bg-background/60 p-4"
                  >
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[hsl(var(--nav-theme))]" />
                    <p className="text-sm text-foreground">{highlight}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl border border-[hsl(var(--gold)/0.2)] bg-[hsl(var(--gold)/0.06)] p-4">
                <p className="mb-3 text-xs uppercase tracking-[0.22em] text-[hsl(var(--nav-theme-light))]">
                  Source links
                </p>
                <div className="flex flex-wrap gap-2">
                  {woeModule.source_urls.map((url: string) => (
                    <a
                      key={url}
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-[hsl(var(--nav-theme)/0.16)] bg-background/80 px-3 py-1 text-xs text-[hsl(var(--nav-theme-light))] transition-colors hover:border-[hsl(var(--nav-theme)/0.4)] hover:text-foreground"
                    >
                      {sourceLabel(url)}
                    </a>
                  ))}
                </div>
              </div>
              <div className="mt-6">
                <Link
                  href={woeModule.cta.href}
                  className="inline-flex items-center gap-2 rounded-full border-2 border-[hsl(var(--nav-theme))] px-5 py-3 text-sm font-semibold text-[hsl(var(--nav-theme))] transition-all duration-300 hover:bg-[hsl(var(--nav-theme))] hover:text-white"
                >
                  {woeModule.cta.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </aside>

            <div className="rounded-3xl border border-border bg-card p-4 shadow-[0_24px_80px_hsl(var(--nav-theme)/0.06)]">
              <div className="space-y-4">
                {woeModule.items.map((section: any, i: number) => {
                  const WoeIcon = woeGuideIcons[i]
                  const isOpen = expandedWoeSection === section.section

                  return (
                    <div
                      key={section.section}
                      className="overflow-hidden rounded-3xl border border-[hsl(var(--nav-theme)/0.14)] bg-background/70 transition-all duration-300"
                    >
                      <button
                        type="button"
                        onClick={() => setExpandedWoeSection(isOpen ? '' : section.section)}
                        className="flex w-full items-center gap-4 p-5 text-left transition-colors hover:bg-muted/50"
                        aria-expanded={isOpen}
                      >
                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[hsl(var(--nav-theme)/0.1)] text-[hsl(var(--nav-theme-light))]">
                          <WoeIcon className="h-6 w-6" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-xl font-bebas text-foreground">{section.section}</h3>
                          <p className="text-sm text-muted-foreground">{section.content[0]}</p>
                        </div>
                        <ChevronDown
                          className={`h-5 w-5 flex-shrink-0 text-muted-foreground transition-transform duration-300 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      <div
                        className={`grid transition-all duration-300 ease-in-out ${
                          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                        }`}
                      >
                        <div className="overflow-hidden">
                          <div className="space-y-3 border-t border-[hsl(var(--nav-theme)/0.12)] bg-muted/30 p-5">
                            {section.content.map((line: string, lineIndex: number) => (
                              <div
                                key={lineIndex}
                                className="flex items-start gap-3 rounded-2xl border border-[hsl(var(--nav-theme)/0.12)] bg-background/70 p-4"
                              >
                                <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[hsl(var(--nav-theme))]" />
                                <p className="text-sm leading-relaxed text-foreground">{line}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Module 13: PvP Guide */}
      <section id="pvp-guide" className="scroll-mt-24 px-4 py-20 scroll-reveal">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-[hsl(var(--nav-theme-light))]">
              {pvpModule.eyebrow}
            </p>
            <h2 className="text-4xl md:text-5xl font-bebas mb-4 relative inline-block">
              {pvpModule.title}
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[hsl(var(--gold))] to-transparent" />
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mt-6">
              {pvpModule.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[0.9fr_1.1fr] gap-8 mb-10">
            <aside className="rounded-3xl border border-[hsl(var(--nav-theme)/0.14)] bg-gradient-to-br from-card to-muted/20 p-8 shadow-[0_24px_80px_hsl(var(--nav-theme)/0.08)]">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[hsl(var(--nav-theme)/0.12)] text-[hsl(var(--nav-theme-light))]">
                  <Swords className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bebas text-[hsl(var(--nav-theme))]">Arena matchup snapshot</h3>
                  <p className="text-sm text-muted-foreground">Burst, control, and coordinated pressure</p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {pvpModule.intro}
              </p>
              <div className="mt-6 space-y-3">
                {[
                  '3v3 Arena rewards quick target swaps and short burst windows.',
                  'Guild battles reward healing, frontline control, and safe spacing.',
                  'Team utility matters as much as raw damage when the fight slows down.',
                ].map((summary, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-2xl border border-[hsl(var(--nav-theme)/0.14)] bg-background/60 p-4"
                  >
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[hsl(var(--nav-theme))]" />
                    <p className="text-sm text-foreground">{summary}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl border border-[hsl(var(--gold)/0.2)] bg-[hsl(var(--gold)/0.06)] p-4">
                <p className="mb-3 text-xs uppercase tracking-[0.22em] text-[hsl(var(--nav-theme-light))]">
                  Source links
                </p>
                <div className="flex flex-wrap gap-2">
                  {pvpModule.source_urls.map((url: string) => (
                    <a
                      key={url}
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-[hsl(var(--nav-theme)/0.16)] bg-background/80 px-3 py-1 text-xs text-[hsl(var(--nav-theme-light))] transition-colors hover:border-[hsl(var(--nav-theme)/0.4)] hover:text-foreground"
                    >
                      {sourceLabel(url)}
                    </a>
                  ))}
                </div>
              </div>
              <div className="mt-6">
                <Link
                  href={pvpModule.cta.href}
                  className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--nav-theme))] px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[hsl(var(--nav-theme)/0.9)] hover:shadow-[0_10px_28px_hsl(var(--nav-theme)/0.28)]"
                >
                  {pvpModule.cta.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </aside>

            <div className="space-y-4">
              {pvpModule.items.map((tier: any, i: number) => {
                const TierIcon = pvpGuideIcons[i]
                const tierKey = `${tier.tier}-${tier.mode}`
                const isOpen = expandedPvpTier === tierKey

                return (
                  <article
                    key={tierKey}
                    className="group overflow-hidden rounded-3xl border-2 border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-[hsl(var(--nav-theme)/0.5)] hover:shadow-[0_16px_36px_hsl(var(--nav-theme)/0.12)]"
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedPvpTier(isOpen ? '' : tierKey)}
                      className="flex w-full items-start gap-4 p-6 text-left md:pointer-events-none"
                      aria-expanded={isOpen}
                    >
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[hsl(var(--nav-theme)/0.1)] text-[hsl(var(--nav-theme-light))] transition-transform duration-300 group-hover:scale-105">
                        <TierIcon className="h-6 w-6" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="mb-2 flex flex-wrap items-center gap-3">
                          <span className="rounded-full bg-[hsl(var(--nav-theme)/0.12)] px-3 py-1 text-xs font-semibold text-[hsl(var(--nav-theme-light))]">
                            Tier {tier.tier}
                          </span>
                          <span className="rounded-full border border-[hsl(var(--gold)/0.22)] px-3 py-1 text-xs font-semibold text-[hsl(var(--gold))]">
                            {tier.mode}
                          </span>
                        </div>
                        <h3 className="text-2xl font-bebas text-foreground">{tier.mode}</h3>
                        <p className="text-sm text-muted-foreground">Class matchup notes for {tier.tier} tier picks</p>
                      </div>
                      <ChevronDown
                        className={`mt-1 h-5 w-5 flex-shrink-0 text-muted-foreground transition-transform duration-300 md:hidden ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    <div
                      className={`grid gap-4 border-t border-[hsl(var(--nav-theme)/0.12)] p-5 md:grid-cols-2 ${
                        isOpen ? 'grid' : 'hidden md:grid'
                      }`}
                    >
                      {tier.entries.map((entry: any, entryIndex: number) => (
                        <div
                          key={`${entry.class}-${entryIndex}`}
                          className="rounded-2xl border border-[hsl(var(--nav-theme)/0.12)] bg-muted/30 p-4"
                        >
                          <div className="mb-3 flex items-start justify-between gap-3">
                            <div>
                              <h4 className="text-lg font-semibold text-foreground">{entry.class}</h4>
                              <p className="text-xs uppercase tracking-[0.18em] text-[hsl(var(--nav-theme-light))]">
                                {entry.role}
                              </p>
                            </div>
                            <span className="rounded-full bg-[hsl(var(--gold)/0.12)] px-3 py-1 text-xs font-semibold text-[hsl(var(--gold))]">
                              Row {entryIndex + 1}
                            </span>
                          </div>
                          <ul className="space-y-2">
                            {entry.strengths.map((strength: string, strengthIndex: number) => (
                              <li key={strengthIndex} className="flex items-start gap-2 text-sm text-foreground">
                                <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[hsl(var(--nav-theme))]" />
                                <span>{strength}</span>
                              </li>
                            ))}
                          </ul>
                          <div className="mt-4 rounded-2xl border border-[hsl(var(--nav-theme)/0.12)] bg-background/80 p-3">
                            <p className="mb-1 text-xs uppercase tracking-[0.18em] text-[hsl(var(--nav-theme-light))]">
                              Matchup note
                            </p>
                            <p className="text-sm leading-relaxed text-muted-foreground">{entry.notes}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 广告位 8: 方形广告 300×250 - Module 13 下方 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="my-8"
      />

      {/* Module 14: Guild Guide */}
      <section id="guild-guide" className="scroll-mt-24 px-4 py-20 bg-muted/30 scroll-reveal">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-[hsl(var(--nav-theme-light))]">
              {guildModule.eyebrow}
            </p>
            <h2 className="text-4xl md:text-5xl font-bebas mb-4 relative inline-block">
              {guildModule.title}
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[hsl(var(--gold))] to-transparent" />
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mt-6">
              {guildModule.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[0.92fr_1.08fr] gap-8 mb-10">
            <aside className="rounded-3xl border border-[hsl(var(--nav-theme)/0.14)] bg-card p-8 shadow-[0_24px_80px_hsl(var(--nav-theme)/0.08)]">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[hsl(var(--nav-theme)/0.12)] text-[hsl(var(--nav-theme-light))]">
                  <Castle className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bebas text-[hsl(var(--nav-theme))]">Guild value snapshot</h3>
                  <p className="text-sm text-muted-foreground">Weekly progress, timed events, and long-term bonuses</p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {guildModule.intro}
              </p>
              <div className="mt-6 space-y-3">
                {[
                  'Weekly quests keep contribution moving every reset.',
                  'Timed events turn guild play into a scheduled reward loop.',
                  'Guild benefits compound across stats, shop access, and event value.',
                ].map((summary, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-2xl border border-[hsl(var(--nav-theme)/0.12)] bg-muted/40 p-4"
                  >
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[hsl(var(--nav-theme))]" />
                    <p className="text-sm text-foreground">{summary}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl border border-[hsl(var(--gold)/0.2)] bg-[hsl(var(--gold)/0.06)] p-4">
                <p className="mb-3 text-xs uppercase tracking-[0.22em] text-[hsl(var(--nav-theme-light))]">
                  Source links
                </p>
                <div className="flex flex-wrap gap-2">
                  {guildModule.source_urls.map((url: string) => (
                    <a
                      key={url}
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-[hsl(var(--nav-theme)/0.16)] bg-background/80 px-3 py-1 text-xs text-[hsl(var(--nav-theme-light))] transition-colors hover:border-[hsl(var(--nav-theme)/0.4)] hover:text-foreground"
                    >
                      {sourceLabel(url)}
                    </a>
                  ))}
                </div>
              </div>
              <div className="mt-6">
                <Link
                  href={guildModule.cta.href}
                  className="inline-flex items-center gap-2 rounded-full border-2 border-[hsl(var(--nav-theme))] px-5 py-3 text-sm font-semibold text-[hsl(var(--nav-theme))] transition-all duration-300 hover:bg-[hsl(var(--nav-theme))] hover:text-white"
                >
                  {guildModule.cta.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </aside>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {guildModule.items.map((item: any, i: number) => {
                const GuildIcon = guildGuideIcons[i]

                return (
                  <article
                    key={item.card_title}
                    className="group rounded-3xl border-2 border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[hsl(var(--nav-theme)/0.5)] hover:shadow-[0_16px_36px_hsl(var(--nav-theme)/0.12)]"
                  >
                    <div className="mb-4 flex items-start gap-4">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[hsl(var(--nav-theme)/0.1)] text-[hsl(var(--nav-theme-light))] transition-transform duration-300 group-hover:scale-105">
                        <GuildIcon className="h-6 w-6" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="mb-2 flex flex-wrap items-center gap-3">
                          <span className="rounded-full bg-[hsl(var(--nav-theme)/0.12)] px-3 py-1 text-xs font-semibold text-[hsl(var(--nav-theme-light))]">
                            {item.tag}
                          </span>
                        </div>
                        <h3 className="text-xl font-bebas text-foreground">{item.card_title}</h3>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                    <div className="mt-5 rounded-2xl border border-[hsl(var(--nav-theme)/0.12)] bg-muted/40 p-4">
                      <p className="mb-3 text-xs uppercase tracking-[0.22em] text-[hsl(var(--nav-theme-light))]">
                        Key points
                      </p>
                      <ul className="space-y-2">
                        {item.highlights.map((highlight: string, highlightIndex: number) => (
                          <li key={highlightIndex} className="flex items-start gap-2 text-sm text-foreground">
                            <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[hsl(var(--nav-theme))]" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Module 15: Codes */}
      <section id="codes" className="scroll-mt-24 px-4 py-20 scroll-reveal">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-[hsl(var(--nav-theme-light))]">
              {codesModule.eyebrow}
            </p>
            <h2 className="text-4xl md:text-5xl font-bebas mb-4 relative inline-block">
              {codesModule.title}
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[hsl(var(--gold))] to-transparent" />
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mt-6">
              {codesModule.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[0.9fr_1.1fr] gap-8 mb-10">
            <aside className="rounded-3xl border border-[hsl(var(--nav-theme)/0.14)] bg-gradient-to-br from-card to-muted/20 p-8 shadow-[0_24px_80px_hsl(var(--nav-theme)/0.08)]">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[hsl(var(--nav-theme)/0.12)] text-[hsl(var(--nav-theme-light))]">
                  <Gift className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bebas text-[hsl(var(--nav-theme))]">Fast redeem checklist</h3>
                  <p className="text-sm text-muted-foreground">Copy a code, redeem it, and confirm the claim</p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {codesModule.intro}
              </p>
              <div className="mt-6 space-y-3">
                {codeRedeemSteps.map((step, index) => (
                  <div
                    key={step}
                    className="flex items-start gap-3 rounded-2xl border border-[hsl(var(--nav-theme)/0.14)] bg-background/60 p-4"
                  >
                    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[hsl(var(--nav-theme))] text-xs font-semibold text-white">
                      {index + 1}
                    </div>
                    <p className="text-sm text-foreground">{step}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl border border-[hsl(var(--gold)/0.2)] bg-[hsl(var(--gold)/0.06)] p-4">
                <p className="mb-3 text-xs uppercase tracking-[0.22em] text-[hsl(var(--nav-theme-light))]">
                  Source links
                </p>
                <div className="flex flex-wrap gap-2">
                  {codesModule.source_urls.map((url: string) => (
                    <a
                      key={url}
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-[hsl(var(--nav-theme)/0.16)] bg-background/80 px-3 py-1 text-xs text-[hsl(var(--nav-theme-light))] transition-colors hover:border-[hsl(var(--nav-theme)/0.4)] hover:text-foreground"
                    >
                      {sourceLabel(url)}
                    </a>
                  ))}
                </div>
              </div>
              <div className="mt-6">
                <Link
                  href={codesModule.cta.href}
                  className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--nav-theme))] px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[hsl(var(--nav-theme)/0.9)] hover:shadow-[0_10px_28px_hsl(var(--nav-theme)/0.28)]"
                >
                  {codesModule.cta.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </aside>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {codesModule.items.map((codeItem: any, i: number) => {
                  const CodeIcon = codeGuideIcons[i]
                  const isActive = codeItem.status === 'active'
                  const copied = copiedPath === codeItem.code
                  const statusLabel =
                    codeItem.status === 'active'
                      ? 'Active'
                      : codeItem.status === 'guide'
                        ? 'Redeem Path'
                        : 'None listed'

                  return (
                    <article
                      key={`${codeItem.code}-${i}`}
                      className="group rounded-3xl border-2 border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[hsl(var(--gold)/0.6)] hover:shadow-[0_16px_36px_hsl(var(--nav-theme)/0.12)]"
                    >
                      <div className="mb-4 flex items-start gap-4">
                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[hsl(var(--nav-theme)/0.1)] text-[hsl(var(--nav-theme-light))] transition-transform duration-300 group-hover:scale-105">
                          <CodeIcon className="h-6 w-6" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="mb-2 flex flex-wrap items-center gap-2">
                            <h3 className="font-mono text-lg font-semibold text-foreground">{codeItem.code}</h3>
                            <span
                              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                codeItem.status === 'active'
                                  ? 'bg-[hsl(var(--nav-theme)/0.12)] text-[hsl(var(--nav-theme-light))]'
                                  : codeItem.status === 'guide'
                                    ? 'bg-[hsl(var(--gold)/0.12)] text-[hsl(var(--gold))]'
                                    : 'bg-muted text-muted-foreground'
                              }`}
                            >
                              {statusLabel}
                            </span>
                          </div>
                          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                            Last checked {codeItem.last_checked}
                          </p>
                        </div>
                      </div>

                      <p className="text-sm leading-relaxed text-muted-foreground">{codeItem.reward}</p>

                      {isActive ? (
                        <button
                          type="button"
                          onClick={() => copyToClipboard(codeItem.code)}
                          className="mt-4 inline-flex items-center gap-2 rounded-full bg-[hsl(var(--nav-theme))] px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-[hsl(var(--nav-theme)/0.9)] hover:shadow-[0_8px_20px_hsl(var(--nav-theme)/0.24)]"
                        >
                          <Copy className="h-4 w-4" />
                          {copied ? 'Copied' : 'Copy code'}
                        </button>
                      ) : codeItem.status === 'guide' ? (
                        <div className="mt-4 rounded-2xl border border-[hsl(var(--gold)/0.2)] bg-[hsl(var(--gold)/0.06)] p-4">
                          <p className="mb-2 text-xs uppercase tracking-[0.18em] text-[hsl(var(--nav-theme-light))]">
                            Redeem path
                          </p>
                          <p className="text-sm leading-relaxed text-foreground">{codeItem.reward}</p>
                        </div>
                      ) : (
                        <div className="mt-4 rounded-2xl border border-border bg-muted/40 p-4">
                          <p className="text-sm text-muted-foreground">{codeItem.reward}</p>
                        </div>
                      )}
                    </article>
                  )
                })}
              </div>

              <div className="rounded-3xl border border-[hsl(var(--gold)/0.2)] bg-[hsl(var(--gold)/0.06)] p-6">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[hsl(var(--nav-theme)/0.1)] text-[hsl(var(--nav-theme-light))]">
                    <Ticket className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bebas text-[hsl(var(--nav-theme))]">Redeem steps</h3>
                    <p className="text-sm text-muted-foreground">Use the in-game path after you copy a code</p>
                  </div>
                </div>
                <ol className="grid gap-3 md:grid-cols-2">
                  {codeRedeemSteps.map((step, index) => (
                    <li key={step} className="flex items-start gap-3 rounded-2xl border border-[hsl(var(--nav-theme)/0.12)] bg-background/70 p-4">
                      <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[hsl(var(--nav-theme))] text-xs font-semibold text-white">
                        {index + 1}
                      </div>
                      <span className="text-sm leading-relaxed text-foreground">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Module 16: Pets Guide */}
      <section id="pets-guide" className="scroll-mt-24 px-4 py-20 bg-muted/30 scroll-reveal">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-[hsl(var(--nav-theme-light))]">
              {petsModule.eyebrow}
            </p>
            <h2 className="text-4xl md:text-5xl font-bebas mb-4 relative inline-block">
              {petsModule.title}
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[hsl(var(--gold))] to-transparent" />
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mt-6">
              {petsModule.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[0.92fr_1.08fr] gap-8">
            <aside className="rounded-3xl border border-[hsl(var(--nav-theme)/0.14)] bg-card p-8 shadow-[0_24px_80px_hsl(var(--nav-theme)/0.08)]">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[hsl(var(--nav-theme)/0.12)] text-[hsl(var(--nav-theme-light))]">
                  <PawPrint className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bebas text-[hsl(var(--nav-theme))]">Pet growth snapshot</h3>
                  <p className="text-sm text-muted-foreground">Unlocks, assist slots, and rarity planning</p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {petsModule.intro}
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
                {[
                  'Unlocks at Base Level 22',
                  'Up to four active pets',
                  'Assist slot opens at Base Level 55',
                ].map((point, index) => (
                  <div
                    key={point}
                    className="flex items-start gap-3 rounded-2xl border border-[hsl(var(--nav-theme)/0.12)] bg-muted/40 p-4"
                  >
                    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[hsl(var(--nav-theme))] text-xs font-semibold text-white">
                      {index + 1}
                    </div>
                    <p className="text-sm text-foreground">{point}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl border border-[hsl(var(--gold)/0.2)] bg-[hsl(var(--gold)/0.06)] p-4">
                <p className="mb-3 text-xs uppercase tracking-[0.22em] text-[hsl(var(--nav-theme-light))]">
                  Source links
                </p>
                <div className="flex flex-wrap gap-2">
                  {petsModule.source_urls.map((url: string) => (
                    <a
                      key={url}
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-[hsl(var(--nav-theme)/0.16)] bg-background/80 px-3 py-1 text-xs text-[hsl(var(--nav-theme-light))] transition-colors hover:border-[hsl(var(--nav-theme)/0.4)] hover:text-foreground"
                    >
                      {sourceLabel(url)}
                    </a>
                  ))}
                </div>
              </div>
              <div className="mt-6">
                <Link
                  href={petsModule.cta.href}
                  className="inline-flex items-center gap-2 rounded-full border-2 border-[hsl(var(--nav-theme))] px-5 py-3 text-sm font-semibold text-[hsl(var(--nav-theme))] transition-all duration-300 hover:bg-[hsl(var(--nav-theme))] hover:text-white"
                >
                  {petsModule.cta.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </aside>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {petsModule.items.map((item: any, i: number) => {
                const PetIcon = petGuideIcons[i]

                return (
                  <article
                    key={item.card_title}
                    className="group rounded-3xl border-2 border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[hsl(var(--nav-theme)/0.5)] hover:shadow-[0_16px_36px_hsl(var(--nav-theme)/0.12)]"
                  >
                    <div className="mb-4 flex items-start gap-4">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[hsl(var(--nav-theme)/0.1)] text-[hsl(var(--nav-theme-light))] transition-transform duration-300 group-hover:scale-105">
                        <PetIcon className="h-6 w-6" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="mb-2 flex flex-wrap items-center gap-3">
                          <span className="rounded-full bg-[hsl(var(--nav-theme)/0.12)] px-3 py-1 text-xs font-semibold text-[hsl(var(--nav-theme-light))]">
                            {item.tag}
                          </span>
                        </div>
                        <h3 className="text-xl font-bebas text-foreground">{item.card_title}</h3>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                    <div className="mt-5 rounded-2xl border border-[hsl(var(--nav-theme)/0.12)] bg-muted/40 p-4">
                      <p className="mb-3 text-xs uppercase tracking-[0.22em] text-[hsl(var(--nav-theme-light))]">
                        Key points
                      </p>
                      <ul className="space-y-2">
                        {item.highlights.map((highlight: string, highlightIndex: number) => (
                          <li key={highlightIndex} className="flex items-start gap-2 text-sm text-foreground">
                            <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[hsl(var(--nav-theme))]" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <FAQSection
          title={t.faq.title}
          titleHighlight={t.faq.titleHighlight}
          subtitle={t.faq.subtitle}
          questions={t.faq.questions}
        />
      </Suspense>

      {/* CTA Section */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <CTASection
          title={t.cta.title}
          description={t.cta.description}
          joinCommunity={t.cta.joinCommunity}
          joinGame={t.cta.joinGame}
        />
      </Suspense>

      {/* Footer */}
      <footer className="bg-white/[0.02] border-t border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-[hsl(var(--nav-theme-light))]">
                {t.footer.title}
              </h3>
              <p className="text-sm text-muted-foreground">{t.footer.description}</p>
            </div>

            {/* Community - External Links Only */}
            <div>
              <h4 className="font-semibold mb-4">{t.footer.community}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://discord.gg/EnbRyjURZz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.discord}
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.facebook.com/RagnarokOriginClassicEN/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.twitter}
                  </a>
                </li>
                <li>
                  <Link
                    href="https://www.reddit.com/r/RagnarokOrigin/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 hover:text-[hsl(var(--nav-theme-light))] transition-colors"
                  >
                    {t.footer.reddit}
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.youtube.com/@RagnarokOriginClassic"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 hover:text-[hsl(var(--nav-theme-light))] transition-colors"
                  >
                    {t.footer.youtube}
                  </Link>
                </li>
                <li>
                  <Link
                    href={officialSite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 hover:text-[hsl(var(--nav-theme-light))] transition-colors"
                  >
                    {t.footer.instagram}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal - Internal Routes Only */}
            <div>
              <h4 className="font-semibold mb-4">{t.footer.legal}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/about"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.about}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.privacy}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-of-service"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.terms}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/copyright"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.copyrightNotice}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Copyright */}
            <div>
              <p className="text-sm text-muted-foreground mb-2">{t.footer.copyright}</p>
              <p className="text-xs text-muted-foreground">{t.footer.disclaimer}</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
