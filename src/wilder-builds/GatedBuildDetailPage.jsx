import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useBuildsAccess } from '../hooks/useBuildsAccess'
import { getPremiumBuildBySlug } from './buildsLibrary'
import PaywallCard from '../components/PaywallCard'

const difficultyColors = {
  easy: 'bg-olive text-white',
  medium: 'bg-gold text-ink',
  hard: 'bg-ember text-white',
}

// GatedBuildDetailPage
// /wilder-builds/builds/:slug
// Renders the full premium build page. Members see a download button;
// non-members see the value-stacked PaywallCard in place of the download.

export default function GatedBuildDetailPage() {
  const { slug } = useParams()
  const build = getPremiumBuildBySlug(slug)
  const { hasAccess, loading, status } = useBuildsAccess()
  const [downloading, setDownloading] = useState(false)
  const [downloadError, setDownloadError] = useState(null)

  if (!build) {
    return (
      <div className="min-h-screen bg-cream pt-28 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-3xl text-ink mb-4">Build Not Found</h1>
          <p className="text-inkl mb-8">
            This build isn't in the Wilder Builds library. Try the free build guides.
          </p>
          <Link
            to="/wilder-builds"
            className="inline-flex items-center gap-2 bg-ember text-white px-6 py-3 rounded-full font-medium hover:bg-terra transition-colors"
          >
            ← Back to Builds
          </Link>
        </div>
      </div>
    )
  }

  const handleDownload = async () => {
    setDownloading(true)
    setDownloadError(null)
    try {
      const res = await fetch(`/api/builds-pdf?id=${encodeURIComponent(build.id)}`)
      const data = await res.json()
      if (!res.ok || !data?.url) {
        throw new Error(data?.error || 'Could not generate download link')
      }
      // Open in same tab so the file downloads via the signed URL
      window.location.href = data.url
    } catch (err) {
      setDownloadError(err.message || 'Something went wrong')
      setDownloading(false)
    }
  }

  return (
    <div className="min-h-screen bg-cream pt-20 pb-20">
      {/* Hero */}
      <div className={`relative h-80 md:h-96 overflow-hidden bg-gradient-to-br ${build.accent}`}>
        <div className="absolute inset-0 opacity-20 pointer-events-none flex items-center justify-center">
          <span className="text-[14rem] md:text-[18rem] leading-none">{build.heroEmoji}</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="max-w-4xl mx-auto">
            <Link
              to="/wilder-builds"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Wilder Builds Library
            </Link>
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <span className="bg-peach text-ink text-xs font-medium px-3 py-1 rounded-full uppercase tracking-wider">
                {build.category}
              </span>
              <span className="bg-white/15 text-white text-xs px-3 py-1 rounded-full backdrop-blur">
                {build.pages} pages · {build.season}
              </span>
              <span
                className={`text-xs font-medium px-3 py-1 rounded-full ${
                  difficultyColors[build.difficulty] || 'bg-blush text-ink'
                }`}
              >
                {build.difficulty}
              </span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white italic leading-tight mb-2">
              {build.title}
            </h1>
            <p className="text-white/85 text-lg md:text-xl max-w-2xl">{build.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-6 -mt-8 relative z-10">
        <div className="bg-white rounded-3xl shadow-xl shadow-ink/10 p-6 md:p-10">
          {/* Meta strip */}
          <div className="flex flex-wrap items-center gap-3 mb-8 pb-8 border-b border-inkll/15">
            <span className="bg-cream text-ink px-3 py-1.5 rounded-full text-sm">
              <span className="text-xs uppercase tracking-wider text-inkll mr-1">Time</span>
              <span className="font-medium">{build.timeEstimate}</span>
            </span>
            <span className="bg-cream text-ink px-3 py-1.5 rounded-full text-sm">
              <span className="text-xs uppercase tracking-wider text-inkll mr-1">Ages</span>
              <span className="font-medium">{build.ageRange}</span>
            </span>
            <span className="bg-cream text-ink px-3 py-1.5 rounded-full text-sm">
              <span className="text-xs uppercase tracking-wider text-inkll mr-1">Cost</span>
              <span className="font-medium">{build.cost}</span>
            </span>
            <span className="bg-cream text-ink px-3 py-1.5 rounded-full text-sm">
              <span className="text-xs uppercase tracking-wider text-inkll mr-1">Tools</span>
              <span className="font-medium">{build.tools?.length || 0}</span>
            </span>
          </div>

          {/* Magic fact callout */}
          <div className="mb-10 p-6 rounded-2xl bg-gradient-to-br from-parchment to-cream border border-gold/20 relative overflow-hidden">
            <div className="absolute -top-6 -right-6 text-7xl opacity-15 pointer-events-none">Sparkle</div>
            <p className="text-xs font-medium uppercase tracking-widest text-gold mb-2">
              The magic moment
            </p>
            <p className="font-serif text-xl md:text-2xl text-ink leading-snug italic max-w-2xl">
              {build.magicFact}
            </p>
          </div>

          {/* Description */}
          <p className="text-inkl leading-relaxed text-lg mb-10">{build.description}</p>

          {/* What's inside */}
          <section className="mb-12">
            <h2 className="font-serif text-2xl text-ink mb-5">What's inside the PDF</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {build.whatsInside.map((line, i) => (
                <div key={i} className="flex items-start gap-3 bg-cream/60 rounded-xl p-4">
                  <span className="w-6 h-6 rounded-full bg-olive/15 text-olive flex items-center justify-center flex-shrink-0 text-sm font-medium">
                    {i + 1}
                  </span>
                  <span className="text-inkl text-sm leading-relaxed">{line}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Table of contents */}
          <section className="mb-12">
            <h2 className="font-serif text-2xl text-ink mb-5">Table of contents</h2>
            <div className="border border-inkll/15 rounded-2xl overflow-hidden">
              {build.tableOfContents.map((ch, i) => (
                <div
                  key={ch.chapter}
                  className={`flex items-center gap-4 px-5 py-4 ${
                    i !== build.tableOfContents.length - 1 ? 'border-b border-inkll/10' : ''
                  } ${i % 2 === 0 ? 'bg-cream/30' : 'bg-white'}`}
                >
                  <span className="font-serif text-xl text-gold w-10">{ch.chapter}</span>
                  <span className="flex-1 text-ink">{ch.title}</span>
                  <span className="text-xs text-inkll uppercase tracking-wider">
                    p. {ch.pages}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Materials & Tools */}
          <section className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h2 className="font-serif text-2xl text-ink mb-4">Materials</h2>
              <ul className="space-y-3">
                {build.materials.map((m, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-ember mt-2 flex-shrink-0" />
                    <div className="flex-1">
                      <span className="text-ink font-medium">{m.name}</span>
                      <span className="text-inkl text-sm ml-2">({m.quantity})</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-serif text-2xl text-ink mb-4">Tools Needed</h2>
              <div className="flex flex-wrap gap-2">
                {build.tools.map((tool, i) => (
                  <span
                    key={i}
                    className="bg-blush text-ink px-3 py-1.5 rounded-full text-sm"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* CTA: paywall or download */}
          <section className="mt-12">
            {loading ? (
              <div className="bg-cream/60 rounded-2xl p-10 text-center">
                <div className="inline-block w-8 h-8 rounded-full border-2 border-ember/30 border-t-ember animate-spin mb-3" />
                <p className="text-inkl">Checking your library access…</p>
              </div>
            ) : hasAccess ? (
              <div className="bg-gradient-to-br from-[#2D5A3D] via-[#5A6428] to-[#96963C] rounded-3xl p-8 md:p-10 text-white text-center relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-gold/20 blur-3xl pointer-events-none" />
                <p className="text-xs font-medium uppercase tracking-widest text-gold mb-2 relative">
                  You have access
                </p>
                <h3 className="font-serif text-2xl md:text-3xl italic mb-2 relative">
                  Ready when you are.
                </h3>
                <p className="text-white/80 mb-6 max-w-md mx-auto relative">
                  Download the full PDF below. Re-download anytime from your library.
                </p>
                <button
                  onClick={handleDownload}
                  disabled={downloading}
                  className="inline-flex items-center gap-2 bg-white text-forest px-7 py-3.5 rounded-full font-sans font-semibold hover:bg-cream transition-colors disabled:opacity-60 relative"
                >
                  {downloading ? (
                    <>
                      <span className="w-4 h-4 rounded-full border-2 border-forest/30 border-t-forest animate-spin" />
                      Preparing your PDF…
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                      Download {build.title}.pdf
                    </>
                  )}
                </button>
                {downloadError && (
                  <p className="mt-3 text-sm text-peach relative">{downloadError}</p>
                )}
                <p className="mt-4 text-xs text-white/60 relative">
                  PDF is watermarked with your email. Please don't redistribute.
                </p>
              </div>
            ) : (
              <PaywallCard
                variant="inline"
                headline={`Get the ${build.title} PDF`}
                subhead={`Two premium builds, ${premiumPagesTotal()} pages total. New builds added every season.`}
              />
            )}

            {status === 'expired' && (
              <p className="mt-4 text-center text-sm text-inkl">
                Your subscription has lapsed. Renew to re-download.
              </p>
            )}
          </section>
        </div>

        {/* Back link */}
        <div className="mt-10 text-center">
          <Link
            to="/wilder-builds"
            className="text-ember font-medium text-sm hover:underline"
          >
            ← Back to all builds
          </Link>
        </div>
      </div>
    </div>
  )
}

function premiumPagesTotal() {
  return 38 + 32 // fairy apothecary + mycelium donuts
}
