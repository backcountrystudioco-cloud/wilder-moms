import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

// ============ SAMPLE DATA ============

const meetups = [
  {
    id: 1,
    title: "Spring Wildflower Hike",
    date: "2026-04-05",
    time: "9:00 AM",
    location: "Red Rock Canyon, CO",
    ageRange: "4-10",
    spotsTotal: 8,
    spotsTaken: 5,
    description: "Easy 2-mile loop perfect for little legs. We'll search for spring blooms and enjoy a picnic at the turnaround.",
    difficulty: "easy",
    hasPicnic: true
  },
  {
    id: 2,
    title: "Morning Stroller Trek",
    date: "2026-04-05",
    time: "8:30 AM",
    location: "Town Lake, Austin TX",
    ageRange: "0-3",
    spotsTotal: 10,
    spotsTaken: 7,
    description: "Flat, paved path ideal for strollers. Join us for coffee and conversation while the babies nap in the fresh air.",
    difficulty: "easy",
    hasPicnic: false
  },
  {
    id: 3,
    title: "Big Kids Mountain Adventure",
    date: "2026-04-06",
    time: "10:00 AM",
    location: "Mount Falcon, CO",
    ageRange: "7-12",
    spotsTotal: 6,
    spotsTaken: 3,
    description: "Moderate 3-mile hike with stunning views. Perfect for kids ready for a real challenge.",
    difficulty: "moderate",
    hasPicnic: true
  },
  {
    id: 4,
    title: "Weekday Wild Ones",
    date: "2026-04-08",
    time: "4:00 PM",
    location: "Commons Forest, WA",
    ageRange: "3-8",
    spotsTotal: 8,
    spotsTaken: 2,
    description: "After-school adventure! We'll explore the forest floor and look for signs of spring wildlife.",
    difficulty: "easy",
    hasPicnic: false
  },
  {
    id: 5,
    title: "Mama & Me Nature Craft",
    date: "2026-04-12",
    time: "2:00 PM",
    location: "Tryon Creek, OR",
    ageRange: "2-6",
    spotsTotal: 12,
    spotsTaken: 9,
    description: "Gentle walk followed by nature-themed crafts. All materials provided. Come get your hands dirty!",
    difficulty: "easy",
    hasPicnic: false
  }
]

const stories = [
  {
    id: 1,
    author: "Sarah Mitchell",
    authorInitials: "SM",
    title: "How I got my reluctant husband outside with the kids",
    excerpt: "Two years ago, my husband thought 'hiking' meant suffering. Here's how we flipped the script and now he plans our weekend adventures.",
    topic: "Family Adventures",
    date: "2026-03-28"
  },
  {
    id: 2,
    author: "Maria Chen",
    authorInitials: "MC",
    title: "The trail that saved my sanity during winter",
    excerpt: "When the dark months hit hard, one particular 1-mile loop became my weekly lifeline. It wasn't about the destination.",
    topic: "Mental Wellness",
    date: "2026-03-21"
  },
  {
    id: 3,
    author: "Jessica Torres",
    authorInitials: "JT",
    title: "Teaching kids to love rain",
    excerpt: "Instead of fighting the weather, we embraced it. Now my girls ask, 'Is it a puddle day?' every morning.",
    topic: "Hiking Tips",
    date: "2026-03-15"
  },
  {
    id: 4,
    author: "Amanda Price",
    authorInitials: "AP",
    title: "My toddler's first summit (and mine)",
    excerpt: "At 2.5 years old, my daughter hiked her first real mountain. It took us 4 hours and we cried at the top.",
    topic: "Toddler Tales",
    date: "2026-03-10"
  },
  {
    id: 5,
    author: "Rachel Green",
    authorInitials: "RG",
    title: "Nature crafts that actually keep them busy",
    excerpt: "Skip the screens, grab a Ziploc, and let me show you the 5 crafts we do on every hike that wear them out completely.",
    topic: "Nature Craft",
    date: "2026-03-05"
  }
]

// ============ HELPER FUNCTIONS ============

const getWeekendDates = () => {
  const today = new Date()
  const currentDay = today.getDay()
  const daysUntilSaturday = (6 - currentDay) % 7
  const daysUntilSunday = (0 - currentDay) % 7
  
  const thisSaturday = new Date(today)
  thisSaturday.setDate(today.getDate() + daysUntilSaturday)
  
  const thisSunday = new Date(today)
  thisSunday.setDate(today.getDate() + (daysUntilSaturday === 0 ? 0 : daysUntilSaturday + 1))
  
  const nextSaturday = new Date(thisSaturday)
  nextSaturday.setDate(thisSaturday.getDate() + 7)
  
  const nextSunday = new Date(thisSunday)
  nextSunday.setDate(thisSunday.getDate() + 7)
  
  const thisMonthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0)
  
  return {
    thisSaturday,
    thisSunday,
    nextSaturday,
    nextSunday,
    thisMonthEnd
  }
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric' 
  })
}

const filterMeetups = (meetups, filter) => {
  const { thisSaturday, thisSunday, nextSaturday, nextSunday, thisMonthEnd } = getWeekendDates()
  
  return meetups.filter(meetup => {
    const meetupDate = new Date(meetup.date)
    
    switch (filter) {
      case 'this-weekend':
        return meetupDate >= thisSaturday && meetupDate <= thisSunday
      case 'next-weekend':
        return meetupDate >= nextSaturday && meetupDate <= nextSunday
      case 'this-month':
        return meetupDate >= thisSaturday && meetupDate <= thisMonthEnd
      default:
        return true
    }
  })
}

// ============ COMPONENTS ============

const InitialsAvatar = ({ initials }) => {
  const colors = [
    'bg-ember',
    'bg-terra',
    'bg-gold',
    'bg-olive',
    'bg-ink'
  ]
  const colorIndex = initials.charCodeAt(0) % colors.length
  
  return (
    <div className={`w-10 h-10 rounded-full ${colors[colorIndex]} flex items-center justify-center flex-shrink-0`}>
      <span className="font-sans text-sm font-medium text-white">{initials}</span>
    </div>
  )
}

const MeetupCard = ({ meetup }) => {
  const spotsLeft = meetup.spotsTotal - meetup.spotsTaken
  const isAlmostFull = spotsLeft <= 2
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="bg-white rounded-2xl shadow-md overflow-hidden mb-4"
    >
      <div className="p-5">
        {/* Header Row */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="font-sans text-sm text-ember font-medium">
              {formatDate(meetup.date)} · {meetup.time}
            </p>
            <h3 className="font-serif text-xl text-ink leading-tight mt-1">
              {meetup.title}
            </h3>
          </div>
          <span className={`text-xs font-sans px-3 py-1.5 rounded-full ${
            meetup.difficulty === 'easy' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
          }`}>
            {meetup.difficulty}
          </span>
        </div>
        
        {/* Location & Age */}
        <div className="flex flex-wrap gap-3 mb-3">
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-inkll" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            <span className="font-sans text-sm text-inkl">{meetup.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-inkll" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span className="font-sans text-sm text-inkl">Ages {meetup.ageRange}</span>
          </div>
        </div>
        
        {/* Description */}
        <p className="font-sans text-sm text-inkl leading-relaxed mb-4">
          {meetup.description}
        </p>
        
        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-inkll/10">
          <div className="flex items-center gap-2">
            <span className={`font-sans text-sm font-medium ${isAlmostFull ? 'text-terra' : 'text-inkl'}`}>
              {spotsLeft} spots left
            </span>
            {meetup.hasPicnic && (
              <span className="text-xs font-sans px-2 py-1 rounded-full bg-peach/30 text-terra">
                🥪 Picnic
              </span>
            )}
          </div>
          <button className="px-4 py-2 rounded-full bg-ember text-white font-sans text-sm font-medium hover:bg-terra transition-colors">
            Join this hike
          </button>
        </div>
      </div>
    </motion.div>
  )
}

const StoryCard = ({ story }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="bg-white rounded-2xl shadow-md overflow-hidden mb-4"
    >
      <div className="p-5">
        {/* Author & Topic */}
        <div className="flex items-center gap-3 mb-3">
          <InitialsAvatar initials={story.authorInitials} />
          <div className="flex-1">
            <p className="font-sans text-sm text-ink font-medium">{story.author}</p>
            <p className="font-sans text-xs text-inkll">{formatDate(story.date)}</p>
          </div>
          <span className="text-xs font-sans px-3 py-1.5 rounded-full bg-peach/30 text-terra">
            {story.topic}
          </span>
        </div>
        
        {/* Title */}
        <h3 className="font-serif text-xl text-ink leading-tight mb-2">
          {story.title}
        </h3>
        
        {/* Excerpt */}
        <p className="font-sans text-sm text-inkl leading-relaxed mb-4">
          {story.excerpt}
        </p>
        
        {/* Read More */}
        <button className="font-sans text-sm text-ember font-medium hover:text-terra transition-colors flex items-center gap-1">
          Read more
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </motion.div>
  )
}

// ============ MAIN COMPONENT ============

export default function VillagePage() {
  const [activeTab, setActiveTab] = useState('meetups')
  const [meetupFilter, setMeetupFilter] = useState('this-weekend')

  const tabs = [
    { id: 'meetups', label: 'Weekend Meetups', icon: '🥾' },
    { id: 'stories', label: 'Village Stories', icon: '📖' }
  ]

  const filterOptions = [
    { id: 'this-weekend', label: 'This Weekend' },
    { id: 'next-weekend', label: 'Next Weekend' },
    { id: 'this-month', label: 'This Month' }
  ]

  const filteredMeetups = filterMeetups(meetups, meetupFilter)

  return (
    <div className="min-h-screen bg-cream pt-24 pb-24 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="font-serif text-4xl md:text-5xl text-ink mb-3">
            The Village
          </h1>
          <p className="font-sans text-inkl text-lg max-w-xl mx-auto">
            Connect with moms who get it. Hike together, share stories, grow together.
          </p>
        </header>

        {/* Tab Navigation */}
        <nav className="flex justify-center gap-2 mb-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                px-5 py-3 rounded-full font-sans text-sm font-medium transition-all flex items-center gap-2
                ${activeTab === tab.id
                  ? 'bg-ember text-white shadow-lg shadow-ember/20'
                  : 'bg-white text-inkl hover:bg-blush/50 border border-inkll/10'
                }
              `}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        {/* Filter Bar - Only for Meetups */}
        <AnimatePresence mode="wait">
          {activeTab === 'meetups' && (
            <motion.div
              key="filters"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex justify-center gap-2 mb-6"
            >
              {filterOptions.map(filter => (
                <button
                  key={filter.id}
                  onClick={() => setMeetupFilter(filter.id)}
                  className={`
                    px-4 py-2 rounded-full font-sans text-xs font-medium transition-all
                    ${meetupFilter === filter.id
                      ? 'bg-blush text-ember border border-ember/30'
                      : 'bg-white/50 text-inkl hover:bg-blush/30'
                    }
                  `}
                >
                  {filter.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'meetups' && (
            <motion.div
              key="meetups"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {/* Host CTA */}
              <div className="bg-parchment rounded-2xl p-4 mb-6 text-center">
                <p className="font-sans text-sm text-forest mb-2">
                  Want to lead an adventure?
                </p>
                <a 
                  href="#" 
                  className="inline-flex items-center gap-1 font-sans text-sm font-medium text-ember hover:text-terra transition-colors"
                >
                  Host a Meetup
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>

              {/* Meetup List */}
              {filteredMeetups.length > 0 ? (
                filteredMeetups.map(meetup => (
                  <MeetupCard key={meetup.id} meetup={meetup} />
                ))
              ) : (
                <div className="text-center py-12 bg-white rounded-2xl shadow-md">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blush flex items-center justify-center">
                    <span className="text-3xl">🥾</span>
                  </div>
                  <h3 className="font-serif text-xl text-ember mb-2">No meetups scheduled</h3>
                  <p className="font-sans text-inkl mb-4">
                    Nothing this {meetupFilter === 'this-weekend' ? 'weekend' : meetupFilter === 'next-weekend' ? 'next weekend' : 'month'}. Be the first to host one!
                  </p>
                  <a 
                    href="#" 
                    className="inline-flex items-center gap-1 px-6 py-3 rounded-full bg-ember text-white font-sans font-medium hover:bg-terra transition-colors"
                  >
                    Host a Meetup
                  </a>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'stories' && (
            <motion.div
              key="stories"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {/* Share CTA */}
              <div className="bg-parchment rounded-2xl p-4 mb-6 text-center">
                <p className="font-sans text-sm text-forest mb-2">
                  Have a story to share?
                </p>
                <a 
                  href="#" 
                  className="inline-flex items-center gap-1 font-sans text-sm font-medium text-ember hover:text-terra transition-colors"
                >
                  Share Your Story
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>

              {/* Stories List */}
              {stories.map(story => (
                <StoryCard key={story.id} story={story} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Join CTA */}
        <div className="mt-8 bg-parchment rounded-2xl p-6 text-center">
          <p className="font-sans text-forest mb-4">
            Ready to join the Village?
          </p>
          <Link
            to="/join"
            className="inline-flex items-center gap-2 px-6 py-3 bg-ember text-white rounded-full font-sans font-medium hover:bg-terra transition-colors"
          >
            Sign Up
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}
