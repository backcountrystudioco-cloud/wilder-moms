import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const archiveGuides = [
  {
    id: 'cob-kids',
    title: 'Cob for Kids',
    description: 'Earth building made accessible. Shape cob benches, mushroom seats, sculptural forms that children can climb on — using clay, sand, and straw from your own yard.',
    pages: '45 pages',
    time: '3 hrs',
    popular: true,
    price: '$29'
  },
  {
    id: 'timber-framing',
    title: 'Timber Framing Basics',
    description: 'Build a playhouse, reading nook, or sturdy raised bed using traditional timber joinery. No nails, no power tools required — just logs, patience, and kid-sized hands.',
    pages: '32 pages',
    time: '4 hrs',
    popular: false,
    price: '$39'
  },
  {
    id: 'stone-stacking',
    title: 'Stone Stacking',
    description: 'The art of the rock wall, the garden bed, and the fairy house foundation. Learn to read stone, build stable structures, and create something that outlasts you.',
    pages: '28 pages',
    time: '2 hrs',
    popular: false,
    price: '$29'
  }
]

export default function ArchivePage() {
  return (
    <div className="min-h-screen bg-cream pt-20 pb-12">
      <div className="max-w-5xl mx-auto px-4">
        <Link to="/wilder-homes/environment" className="text-ember text-sm font-medium mb-4 inline-flex items-center gap-1 hover:underline">
          ← Back to Environment
        </Link>

        {/* Hero Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 p-8 md:p-12 bg-gradient-to-br from-[#5A3C00] via-[#8C4A14] to-[#D2961E] rounded-3xl text-center relative overflow-hidden"
        >
          <div className="relative z-10">
            <p className="text-white/80 text-xs font-medium uppercase tracking-widest mb-3">
              The Wilder Archive
            </p>
            <h1 className="font-serif text-3xl md:text-5xl text-white italic mb-4 leading-tight">
              The outdoor skills your<br />grandparents knew by heart.
            </h1>
            <p className="text-white/70 max-w-xl mx-auto text-sm md:text-base leading-relaxed mb-8">
              Cob, timber framing, stone stacking — techniques passed down through generations, 
              now adapted for modern family gardens. These aren't just builds. They're heirlooms.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-white/80 text-xs">
              <div className="flex items-center gap-1">
                <span>4.9 rating from 200+ families</span>
              </div>
              <div className="w-px h-4 bg-white/30" />
              <div>Instant PDF download</div>
              <div className="w-px h-4 bg-white/30" />
              <div>Lifetime access</div>
            </div>
          </div>
        </motion.div>

        {/* Why Ancient Techniques Matter */}
        <div className="mb-12 grid md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-6 border border-inkll/10 text-center"
          >
            <div className="w-12 h-12 bg-olive/10 rounded-full mx-auto mb-3 flex items-center justify-center">
              <svg className="w-6 h-6 text-olive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064" />
              </svg>
            </div>
            <h4 className="font-serif text-lg text-ink mb-2">Zero Waste</h4>
            <p className="text-inkl text-sm">Built with materials from your own yard. No carbon footprint, no hardware store run.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white rounded-2xl p-6 border border-inkll/10 text-center"
          >
            <div className="w-12 h-12 bg-ember/10 rounded-full mx-auto mb-3 flex items-center justify-center">
              <svg className="w-6 h-6 text-ember" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="font-serif text-lg text-ink mb-2">Kid-Safe</h4>
            <p className="text-inkl text-sm">Every technique adapted for little hands. Sensory-rich, developmentally appropriate.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 border border-inkll/10 text-center"
          >
            <div className="w-12 h-12 bg-gold/10 rounded-full mx-auto mb-3 flex items-center justify-center">
              <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h4 className="font-serif text-lg text-ink mb-2">Lasts Generations</h4>
            <p className="text-inkl text-sm">Stone and earth don't rot. These are the builds your grandchildren will play on.</p>
          </motion.div>
        </div>

        {/* Archive Guides */}
        <div className="mb-12">
          <h2 className="font-serif text-2xl text-ink italic mb-6">Premium Downloads</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {archiveGuides.map((guide, index) => (
              <motion.div
                key={guide.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg border border-inkll/10 group"
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-[#8C4A14] to-[#D2961E] flex items-center justify-center relative overflow-hidden">
                  <span className="text-4xl text-white/30">{guide.title.charAt(0)}</span>
                  {guide.popular && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                      <span className="text-white text-xs font-medium uppercase tracking-wider">Most Popular</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-ember/10 text-ember text-xs font-medium rounded-full">PDF Guide</span>
                    <span className="text-inkll text-xs">{guide.pages} · {guide.time}</span>
                  </div>
                  <h3 className="font-serif text-xl text-ink mb-2">{guide.title}</h3>
                  <p className="text-inkl text-sm leading-relaxed mb-4">
                    {guide.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-2xl text-ember">{guide.price}</span>
                    <button className="px-4 py-2 bg-ember text-white text-sm font-medium rounded-full hover:bg-terra transition-colors">
                      Get Guide
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
