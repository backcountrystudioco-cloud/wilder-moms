import { useState } from 'react'
import { motion } from 'framer-motion'
import { packLists } from './packLists'
import QuantityCalculator from './QuantityCalculator'
import SmartChecklist from './SmartChecklist'
import QuickTemplates from './QuickTemplates'
import AdventureProfileBuilder from './AdventureProfileBuilder'
import SmartOmissions from './SmartOmissions'
import TripDifficultySlider from './TripDifficultySlider'
import OftenForgotten from './OftenForgotten'
import PackLightChallenge from './PackLightChallenge'
import SeasonalWeather from './SeasonalWeather'
import GearYouMightBorrow from './GearYouMightBorrow'
import SaveCloneTrips from './SaveCloneTrips'
import BabyCarrierTypes from './BabyCarrierTypes'
import ItemPicker from './ItemPicker'

export default function BlueprintPage() {
  const [activeTab, setActiveTab] = useState('smart')
  const [expandedAge, setExpandedAge] = useState(null)
  const [myList, setMyList] = useState([])
  const [checkedItems, setCheckedItems] = useState([])
  const [tripType, setTripType] = useState('day')
  const [difficultyAdditions, setDifficultyAdditions] = useState([])
  const [quantitySettings, setQuantitySettings] = useState({ adults: 2, kids: 1 })

  const toggleAge = (index) => {
    setExpandedAge(expandedAge === index ? null : index)
  }

  const handleGenerateFromProfile = (items) => {
    setMyList(items)
    setCheckedItems([])
    setActiveTab('mylist')
  }

  const handleAddItems = (items) => {
    setMyList((prev) => [...new Set([...prev, ...items])])
  }

  const handleToggleItem = (index) => {
    setCheckedItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    )
  }

  const handleDifficultyChange = ({ additions }) => {
    setDifficultyAdditions(additions || [])
  }

  const handleLoadTrip = (items) => {
    setMyList(items)
    setCheckedItems([])
  }

  const computedMyList = [...myList, ...difficultyAdditions.filter(a => !myList.some(m => m.toLowerCase().includes(a.toLowerCase())))]

  return (
    <div className="min-h-screen bg-cream pt-32 pb-24 md:pt-24 md:pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header - matches HabitatPage style */}
        <header className="mb-6">
          <h1 className="font-serif text-4xl md:text-5xl text-ink mb-4">
            The Blueprint
          </h1>
          <p className="font-sans text-inkl text-lg max-w-2xl">
            Pack lists tailored to your family — organized by age group so everyone has what they need.
          </p>
        </header>

        {/* Main Tabs - horizontal scroll on mobile */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 -mx-4 px-4 md:overflow-visible md:flex-wrap md:gap-2 md:-mx-0 md:px-0">
          <button
            onClick={() => setActiveTab('smart')}
            className={`px-4 py-2.5 rounded-full font-sans text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${
              activeTab === 'smart'
                ? 'bg-ember text-white'
                : 'bg-blush/50 text-inkl hover:bg-blush'
            }`}
          >
            Smart Builder
          </button>
          <button
            onClick={() => setActiveTab('mylist')}
            className={`px-4 py-2.5 rounded-full font-sans text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${
              activeTab === 'mylist'
                ? 'bg-ember text-white'
                : 'bg-blush/50 text-inkl hover:bg-blush'
            }`}
          >
            My List {myList.length > 0 && `(${myList.length})`}
          </button>
          <button
            onClick={() => setActiveTab('hiking')}
            className={`px-4 py-2.5 rounded-full font-sans text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${
              activeTab === 'hiking'
                ? 'bg-ember text-white'
                : 'bg-blush/50 text-inkl hover:bg-blush'
            }`}
          >
            Hiking
          </button>
          <button
            onClick={() => setActiveTab('camping')}
            className={`px-4 py-2.5 rounded-full font-sans text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${
              activeTab === 'camping'
                ? 'bg-ember text-white'
                : 'bg-blush/50 text-inkl hover:bg-blush'
            }`}
          >
            Camping
          </button>
          <button
            onClick={() => setActiveTab('essentials')}
            className={`px-4 py-2.5 rounded-full font-sans text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${
              activeTab === 'essentials'
                ? 'bg-ember text-white'
                : 'bg-blush/50 text-inkl hover:bg-blush'
            }`}
          >
            Essentials
          </button>
          <button
            onClick={() => setActiveTab('carriers')}
            className={`px-4 py-2.5 rounded-full font-sans text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${
              activeTab === 'carriers'
                ? 'bg-ember text-white'
                : 'bg-blush/50 text-inkl hover:bg-blush'
            }`}
          >
            Carriers
          </button>
        </div>

        {/* Smart Builder Tab */}
        {activeTab === 'smart' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <AdventureProfileBuilder onGenerate={handleGenerateFromProfile} />

            <ItemPicker onAddItems={handleAddItems} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SeasonalWeather onAddItems={handleAddItems} />
              <GearYouMightBorrow />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TripDifficultySlider onDifficultyChange={handleDifficultyChange} />
              <QuantityCalculator 
                adults={quantitySettings.adults} 
                kids={quantitySettings.kids} 
                onChange={setQuantitySettings}
                onAddItems={handleAddItems}
              />
            </div>

            <QuickTemplates onAddItems={handleAddItems} availableItems={myList} />

            <BabyCarrierTypes />
          </motion.div>
        )}

        {/* My Pack List Tab */}
        {activeTab === 'mylist' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <SaveCloneTrips
              currentList={computedMyList}
              onLoadTrip={handleLoadTrip}
            />

            <PackLightChallenge
              totalItems={computedMyList.length}
              tripType={tripType}
            />

            <OftenForgotten
              checkedItems={checkedItems}
              allItems={computedMyList}
            />

            <SmartOmissions
              checkedItems={checkedItems}
              allItems={computedMyList}
            />

            <SmartChecklist
              items={computedMyList}
              checkedItems={checkedItems}
              onToggle={handleToggleItem}
              title="My Pack List"
              listType="mylist"
            />

            <div className="flex gap-3">
              <button
                onClick={() => setMyList([])}
                className="px-4 py-2 bg-ember/10 text-ember rounded-xl font-sans text-sm font-medium hover:bg-ember/20 transition-colors"
              >
                Clear List
              </button>
            </div>
          </motion.div>
        )}

        {/* Day Hike Essentials */}
        {activeTab === 'essentials' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-inkll/10"
          >
            <h2 className="font-serif text-2xl text-ink mb-6">Day Hike Essentials</h2>
            <p className="text-inkl mb-6">The must-haves for any family hike, regardless of age.</p>
            <ul className="space-y-3">
              {packLists.dayHikeEssentials.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-olive text-white flex items-center justify-center text-xs flex-shrink-0 mt-0.5">✓</span>
                  <span className="text-inkl">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Baby Carriers */}
        {activeTab === 'carriers' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <BabyCarrierTypes />
          </motion.div>
        )}

        {/* Hiking or Camping Lists by Age */}
        {(activeTab === 'hiking' || activeTab === 'camping') && (
          <div className="space-y-4">
            <div className="flex gap-3 mb-4">
              <select
                value={tripType}
                onChange={(e) => setTripType(e.target.value)}
                className="px-4 py-2 bg-white rounded-xl font-sans text-sm text-ink border border-inkll/30 focus:outline-none focus:ring-2 focus:ring-olive"
              >
                <option value="day">Day Hike</option>
                <option value="overnight">Overnight</option>
              </select>
            </div>

            {(activeTab === 'hiking' ? packLists.hiking : packLists.camping).map((group, index) => (
              <motion.div
                key={group.ageGroup}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-sm border border-inkll/10 overflow-hidden"
              >
                <button
                  onClick={() => toggleAge(index)}
                  className="w-full p-5 flex items-center justify-between text-left"
                >
                  <div>
                    <h3 className="font-serif text-xl text-ink">{group.ageGroup}</h3>
                    <p className="text-sm text-inkl mt-1">{group.items.length} items</p>
                  </div>
                  <motion.svg
                    animate={{ rotate: expandedAge === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-5 h-5 text-inkll"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </button>
                
                <motion.div
                  initial={false}
                  animate={{ height: expandedAge === index ? 'auto' : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 border-t border-inkll/10 pt-4">
                    <div className="flex justify-end mb-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleAddItems(group.items)
                          setActiveTab('mylist')
                        }}
                        className="px-3 py-1.5 bg-olive text-white rounded-lg font-sans text-xs font-medium hover:bg-forest transition-colors"
                      >
                        + Add All to My List
                      </button>
                    </div>
                    <ul className="space-y-2">
                      {group.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-ember mt-2 flex-shrink-0" />
                          <span className="text-inkl text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
