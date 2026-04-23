import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

// ============ SAMPLE STORY DATA ============

const storyCircles = {
  'hard-seasons': {
    name: 'The Hard Seasons',
    tagline: 'The weeks that broke you open',
    description: 'The hard stuff. The exhausting weeks. The moments you weren\'t sure you\'d make it through. We hold those stories here, with witness.',
    color: '#8C1E00',
    bgColor: '#FFF3EC',
    icon: ''
  },
  'trail-tales': {
    name: 'Trail Tales',
    tagline: 'The miles and the moments',
    description: 'The hike where everything went wrong and somehow became the best day. The discovery on a Tuesday afternoon. The trail magic you didn\'t expect.',
    color: '#5A6428',
    bgColor: '#F2F5E8',
    icon: ''
  },
  'quiet-wisdom': {
    name: 'The Quiet Wisdom',
    tagline: 'What the years have taught',
    description: 'The lessons that took years to learn. The things you know now that you wished you\'d known then. The wisdom you\'re still forming.',
    color: '#464F5F',
    bgColor: '#F0F2F5',
    icon: ''
  }
}

const stories = [
  {
    id: 1,
    circle: 'trail-tales',
    author: 'The Mountain Mother',
    authorInitials: 'MM',
    title: 'The Hike We Almost Quit (Three Times)',
    content: `It was supposed to be a simple 2-miler. Three miles of "flat" trail according to the app. We started at 7am because I thought morning meant cool and manageable.

By 8:30, my four-year-old was riding on my shoulders. By 9, the "flat" trail had become a boulder scramble and I was questioning every life decision that had led me to this point.

But here's what I remember most: at the turnaround, my daughter picked up a pinecone and called it her "trophy." She showed it to every single person we passed on the way back. Every single one.

The trail didn't matter. The distance didn't matter. What mattered was that she had done hard thing, and she knew it, and she was proud.

We've gone back to that trail six times since. Last weekend she asked to go "the hard way."

We're not the same people who started that hike.`,
    date: 'March 28, 2026',
    listenersCount: 24,
    notesCount: 3
  },
  {
    id: 2,
    circle: 'hard-seasons',
    author: 'The Dawn Walker',
    authorInitials: 'DW',
    title: 'The Winter I Stopped Pretending',
    content: `I used to post outdoor photos with hashtags like #outdoorfamily and #naturekids. The aesthetic was impeccable. The reality was that some weeks I couldn't get us out the door at all.

This winter, I stopped pretending.

I posted in our Village community: "Hey, I haven't taken my kids on a real hike in three weeks. We're just... surviving." And do you know what happened? Seventeen mothers wrote back.

Not advice. Not tips. Just: "Same." And then their stories.

We're not performing for each other here. We're telling the truth. And somehow that truth creates more space than any perfect Instagram grid ever could.

The outdoors will still be there when we're ready. The Village taught me that.`,
    date: 'March 21, 2026',
    listenersCount: 47,
    notesCount: 8
  },
  {
    id: 3,
    circle: 'quiet-wisdom',
    author: 'The Seasoned Scout',
    authorInitials: 'SS',
    title: 'What I Know Now That I Wish I Knew Then',
    content: `After seven years of hiking with kids, here's what I've learned:

The gear matters less than I thought. The timeline matters not at all. What matters is that you show up, again and again, even when it's raining, even when someone cried the whole way there.

The hikes where everything went wrong are the ones they'll remember. The one where we got lost for an hour? Still talked about at dinner three months later. The one where we had to turn back after ten minutes because someone had a meltdown? We tried again the next day.

I used to think I needed to plan everything, optimize everything, make every outing "worth it." Now I know: the only metric that matters is whether you went. Even if it was just the backyard. Even if it was just ten minutes.

Show up. The rest takes care of itself.`,
    date: 'March 15, 2026',
    listenersCount: 63,
    notesCount: 12
  },
  {
    id: 4,
    circle: 'trail-tales',
    author: 'The Wild One\'s Mother',
    authorInitials: 'WO',
    title: 'The Mud Was The Point',
    content: `My daughter is four. She spent an entire hike last week absolutely obsessed with finding the "muddest spot." Not the trail. Not the view. The muddiest spot.

We spent forty-five minutes investigating various muddy areas. I had to physically restrain myself from suggesting we "keep moving" or "see what's ahead."

At one point, she found a patch of clay-like mud and declared it "perfect for mud pies." We missed probably a mile of trail. We made three mud pies. We sat on a log and ate snacks and watched the light through the trees.

I don't remember the last time I sat that still in the woods. I don't remember the last time I remembered that the destination is almost never the point.

She taught me that this week. From a muddy patch in a local park.`,
    date: 'March 10, 2026',
    listenersCount: 38,
    notesCount: 5
  }
]

const weeklyPrompts = [
  {
    circle: 'hard-seasons',
    prompt: 'The week that broke you open',
    description: 'Tell us about a time when the outdoors — or the attempt to get there — brought you to your knees. What happened? What did you learn?',
    contributed: 12
  },
  {
    circle: 'trail-tales',
    prompt: 'The unexpected companion',
    description: 'Tell us about a plant, animal, or natural feature that your child became obsessed with on a hike. What was it? How long did the obsession last?',
    contributed: 8
  },
  {
    circle: 'quiet-wisdom',
    prompt: 'A gift you\'ve given yourself',
    description: 'What outdoor habit or practice have you developed that you\'d tell a new mom to start? The thing that, years later, you\'re still grateful for.',
    contributed: 15
  }
]

// ============ COMPONENTS ============

const CircleCard = ({ circle, isActive, onClick }) => {
  const data = storyCircles[circle]
  
  return (
    <button
      onClick={onClick}
      className={`
        text-left p-6 rounded-2xl border-2 transition-all w-full
        ${isActive 
          ? 'border-ember bg-white shadow-lg' 
          : 'border-transparent bg-cream/50 hover:bg-cream'
        }
      `}
    >
      <div className="flex items-center gap-3 mb-2">
        <span className="text-2xl">{data.icon}</span>
        <div>
          <h3 className="font-serif text-lg text-ink">{data.name}</h3>
          <p className="text-xs text-inkl">{data.tagline}</p>
        </div>
      </div>
      {!isActive && (
        <p className="text-sm text-inkl line-clamp-2">{data.description}</p>
      )}
    </button>
  )
}

const StoryCard = ({ story, circle, onRead }) => {
  const data = storyCircles[circle]
  
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl overflow-hidden shadow-md"
    >
      {/* Header */}
      <div className="p-5">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-cream flex items-center justify-center flex-shrink-0">
            <span className="font-sans text-sm font-medium text-ink">{story.authorInitials}</span>
          </div>
          <div className="flex-1">
            <p className="font-sans text-sm font-medium text-ink">{story.author}</p>
            <p className="font-sans text-xs text-inkl">{story.date}</p>
          </div>
          <span 
            className="text-xs px-2 py-1 rounded-full"
            style={{ backgroundColor: data.bgColor, color: data.color }}
          >
            {data.icon} {data.name}
          </span>
        </div>
        
        {/* Title */}
        <h3 className="font-serif text-xl text-ink mb-3 leading-snug">
          {story.title}
        </h3>
        
        {/* Preview */}
        <p className="font-sans text-sm text-inkl leading-relaxed line-clamp-3 mb-4">
          {story.content.substring(0, 200)}...
        </p>
        
        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-inkll/10">
          <div className="flex items-center gap-4 text-xs text-inkl">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              {story.listenersCount} witnessed
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              {story.notesCount} notes
            </span>
          </div>
          <button 
            onClick={onRead}
            className="text-sm font-medium text-ember hover:text-terra transition-colors"
          >
            Read →
          </button>
        </div>
      </div>
    </motion.article>
  )
}

const WeeklyPrompt = ({ prompt }) => {
  const data = storyCircles[prompt.circle]
  
  return (
    <div 
      className="rounded-xl p-5 mb-6"
      style={{ backgroundColor: data.bgColor }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">{data.icon}</span>
        <span className="text-xs font-medium uppercase tracking-wider" style={{ color: data.color }}>
          This Week in {data.name}
        </span>
      </div>
      <h4 className="font-serif text-lg text-ink mb-2 italic">
        "{prompt.prompt}"
      </h4>
      <p className="text-sm text-inkl mb-4">
        {prompt.description}
      </p>
      <Link to="/join" className="text-sm font-medium px-4 py-2 rounded-full bg-white hover:bg-cream transition-colors inline-block" style={{ color: data.color }}>
        Share Your Story ({prompt.contributed} so far)
      </Link>
    </div>
  )
}

const StoryReader = ({ story, circle, onClose }) => {
  const data = storyCircles[circle]
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-ink/80 backdrop-blur-sm overflow-y-auto"
    >
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-inkll/10">
            <button 
              onClick={onClose}
              className="text-sm text-inkl hover:text-ink mb-4 flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to stories
            </button>
            
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-cream flex items-center justify-center">
                <span className="font-sans text-lg font-medium text-ink">{story.authorInitials}</span>
              </div>
              <div>
                <p className="font-sans font-medium text-ink">{story.author}</p>
                <p className="font-sans text-sm text-inkl">{story.date}</p>
              </div>
            </div>
            
            <span 
              className="inline-block text-xs px-3 py-1 rounded-full mb-4"
              style={{ backgroundColor: data.bgColor, color: data.color }}
            >
              {data.icon} {data.name}
            </span>
            
            <h2 className="font-serif text-2xl md:text-3xl text-ink leading-tight">
              {story.title}
            </h2>
          </div>
          
          {/* Content */}
          <div className="p-6">
            <div className="prose prose-lg max-w-none">
              {story.content.split('\n\n').map((paragraph, i) => (
                <p key={i} className="font-sans text-inkl leading-relaxed mb-4 whitespace-pre-wrap">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          
          {/* Witness */}
          <div className="p-6 border-t border-inkll/10 bg-cream/50">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-inkl">
                {story.listenersCount} mothers have witnessed this story
              </p>
              <p className="text-sm text-inkl">
                {story.notesCount} notes written
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-4 mb-4">
              <p className="text-xs font-medium text-inkl uppercase tracking-wider mb-2">
                Leave a private note
              </p>
              <p className="text-xs text-inkl mb-3">
                Notes are private between you and the author. Share a similar story, offer witness, or simply acknowledge what you read.
              </p>
              <textarea
                placeholder="Your note..."
                rows={3}
                className="w-full px-3 py-2 rounded-lg border border-inkll/20 bg-cream text-ink placeholder:text-inkll/50 focus:outline-none focus:ring-2 focus:ring-ember/30 focus:border-ember text-sm"
              />
              <button className="mt-2 px-4 py-2 rounded-full bg-ember text-white text-sm font-medium hover:bg-terra transition-colors">
                Send Note
              </button>
            </div>
            
            <button 
              onClick={onClose}
              className="w-full py-3 text-center text-sm text-inkl hover:text-ink transition-colors"
            >
              Back to the circle
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ============ MAIN COMPONENT ============

export default function VillagePage() {
  const [activeCircle, setActiveCircle] = useState('trail-tales')
  const [readingStory, setReadingStory] = useState(null)
  const [showAllCircles, setShowAllCircles] = useState(false)

  const filteredStories = stories.filter(s => s.circle === activeCircle)
  const activeCircleData = storyCircles[activeCircle]
  const currentPrompt = weeklyPrompts.find(p => p.circle === activeCircle)

  return (
    <div className="min-h-screen bg-cream pt-20 pb-12">
      <AnimatePresence mode="wait">
        {readingStory ? (
          <StoryReader 
            key="reader"
            story={readingStory} 
            circle={readingStory.circle}
            onClose={() => setReadingStory(null)} 
          />
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Header */}
            <div className="max-w-2xl mx-auto px-4 pt-8 pb-6 text-center">
              <h1 className="font-serif text-4xl md:text-5xl text-ink mb-4 italic">
                The Village
              </h1>
              <p className="font-sans text-inkl text-lg max-w-lg mx-auto leading-relaxed">
                Pull up a chair. Stay as long as you need. This is where we gather around the fire and tell each other the truth.
              </p>
            </div>

            {/* Weekly Prompts */}
            <div className="max-w-2xl mx-auto px-4 mb-8">
              <div className="text-center mb-4">
                <p className="text-xs font-medium text-inkl uppercase tracking-widest mb-1">
                  The fire is lit
                </p>
                <p className="text-sm text-inkl">
                  This week's prompts — Sunday evenings, new stories begin
                </p>
              </div>
              <div className="grid gap-3">
                {weeklyPrompts.map((prompt) => (
                  <WeeklyPrompt key={prompt.circle} prompt={prompt} />
                ))}
              </div>
            </div>

            {/* Story Circles */}
            <div className="max-w-2xl mx-auto px-4">
              <div className="text-center mb-6">
                <h2 className="font-serif text-2xl text-ink italic mb-2">
                  Three circles around the fire
                </h2>
                <p className="text-sm text-inkl">
                  Choose a circle. Read. Respond with your own story.
                </p>
              </div>

              {/* Circle Selection */}
              <div className="grid md:grid-cols-3 gap-3 mb-8">
                {Object.keys(storyCircles).map((circle) => (
                  <CircleCard
                    key={circle}
                    circle={circle}
                    isActive={activeCircle === circle}
                    onClick={() => setActiveCircle(circle)}
                  />
                ))}
              </div>

              {/* Active Circle Description */}
              <div 
                className="rounded-xl p-5 mb-6 text-center"
                style={{ backgroundColor: activeCircleData.bgColor }}
              >
                <p className="font-serif text-lg text-ink italic mb-2">
                  "{activeCircleData.description}"
                </p>
                <p className="text-xs text-inkl">
                  {filteredStories.length} stories in this circle
                </p>
              </div>

              {/* Stories */}
              <div className="space-y-4">
                <AnimatePresence mode="wait">
                  {filteredStories.map((story) => (
                    <StoryCard 
                      key={story.id} 
                      story={story} 
                      circle={story.circle}
                      onRead={() => setReadingStory(story)}
                    />
                  ))}
                </AnimatePresence>
              </div>

              {/* Add Your Story CTA */}
              <div className="mt-8 text-center">
                <Link 
                  to="/join"
                  className="px-8 py-4 rounded-full border-2 border-ember text-ember font-medium hover:bg-ember hover:text-white transition-colors inline-block"
                >
                  Join the Village to Share Your Story
                </Link>
                <p className="text-xs text-inkl mt-3">
                  Your story lives here, witnessed by mothers who understand.
                </p>
              </div>

              {/* What is The Village */}
              <div className="mt-12 pt-8 border-t border-inkll/20">
                <div className="bg-parchment rounded-2xl p-6 text-center">
                  <h3 className="font-serif text-xl text-ink italic mb-3">
                    About The Village
                  </h3>
                  <p className="text-inkl text-sm leading-relaxed mb-4">
                    The Village is not a social network. There are no likes, no shares, no algorithms deciding what matters. 
                    There is only the fire, and the stories that gather around it.
                  </p>
                  <p className="text-inkl text-sm leading-relaxed">
                    We witness each other's lives. We share the hard weeks and the beautiful moments. 
                    We tell the truth about what it means to raise children who love the outdoors.
                  </p>
                  <p className="text-inkl text-sm leading-relaxed mt-4 italic">
                    Pull up a chair. The fire is always here.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
