import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const STORAGE_KEY = 'wilder_moms_blueprint_saved_trips'

export default function SaveCloneTrips({ currentList = [], tripName = '', onLoadTrip }) {
  const [savedTrips, setSavedTrips] = useState([])
  const [showSaveModal, setShowSaveModal] = useState(false)
  const [tripNameInput, setTripNameInput] = useState('')
  const [showLoadModal, setShowLoadModal] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        try {
          setSavedTrips(JSON.parse(saved))
        } catch {
          setSavedTrips([])
        }
      }
    }
  }, [])

  const saveTrip = () => {
    if (!tripNameInput.trim() || currentList.length === 0) return

    const newTrip = {
      id: Date.now(),
      name: tripNameInput.trim(),
      items: currentList,
      createdAt: new Date().toISOString(),
    }

    const updated = [newTrip, ...savedTrips].slice(0, 10) // Keep last 10
    setSavedTrips(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    setShowSaveModal(false)
    setTripNameInput('')
  }

  const deleteTrip = (id) => {
    const updated = savedTrips.filter((t) => t.id !== id)
    setSavedTrips(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  }

  const cloneTrip = (trip) => {
    if (onLoadTrip) {
      onLoadTrip([...trip.items])
    }
    setShowLoadModal(false)
  }

  const formatDate = (isoString) => {
    const date = new Date(isoString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <button
          onClick={() => setShowSaveModal(true)}
          disabled={currentList.length === 0}
          className={`flex-1 px-4 py-2.5 rounded-xl font-sans text-sm font-medium transition-all ${
            currentList.length === 0
              ? 'bg-parchment text-inkll cursor-not-allowed'
              : 'bg-olive text-white hover:bg-forest'
          }`}
        >
          Save This List
        </button>
        <button
          onClick={() => setShowLoadModal(true)}
          disabled={savedTrips.length === 0}
          className={`flex-1 px-4 py-2.5 rounded-xl font-sans text-sm font-medium transition-all ${
            savedTrips.length === 0
              ? 'bg-parchment text-inkll cursor-not-allowed'
              : 'bg-blush/50 text-inkl hover:bg-blush'
          }`}
        >
          Load Saved ({savedTrips.length})
        </button>
      </div>

      {/* Save Modal */}
      <AnimatePresence>
        {showSaveModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-ink/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowSaveModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 w-full max-w-md"
            >
              <h3 className="font-serif text-xl text-ink mb-4">Save Pack List</h3>
              <input
                type="text"
                value={tripNameInput}
                onChange={(e) => setTripNameInput(e.target.value)}
                placeholder="e.g., Summer Trip to Rockies"
                className="w-full px-4 py-3 bg-cream rounded-xl font-sans text-ink placeholder:text-inkll/50 focus:outline-none focus:ring-2 focus:ring-olive mb-4"
                autoFocus
              />
              <p className="text-xs text-inkl mb-4">{currentList.length} items will be saved</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowSaveModal(false)}
                  className="flex-1 px-4 py-2.5 bg-blush/50 text-inkl rounded-xl font-sans text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={saveTrip}
                  disabled={!tripNameInput.trim()}
                  className="flex-1 px-4 py-2.5 bg-ember text-white rounded-xl font-sans text-sm font-medium disabled:opacity-50"
                >
                  Save
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Load Modal */}
      <AnimatePresence>
        {showLoadModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-ink/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowLoadModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto"
            >
              <h3 className="font-serif text-xl text-ink mb-4">Load Saved List</h3>
              
              {savedTrips.length === 0 ? (
                <p className="text-sm text-inkl text-center py-8">No saved trips yet</p>
              ) : (
                <div className="space-y-3">
                  {savedTrips.map((trip) => (
                    <div
                      key={trip.id}
                      className="p-4 bg-cream rounded-xl flex items-center justify-between"
                    >
                      <div>
                        <p className="font-sans text-sm font-medium text-ink">{trip.name}</p>
                        <p className="text-xs text-inkl">{trip.items.length} items • {formatDate(trip.createdAt)}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => cloneTrip(trip)}
                          className="px-3 py-1.5 bg-olive text-white rounded-lg font-sans text-xs font-medium"
                        >
                          Use
                        </button>
                        <button
                          onClick={() => deleteTrip(trip.id)}
                          className="px-3 py-1.5 bg-ember/10 text-ember rounded-lg font-sans text-xs"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <button
                onClick={() => setShowLoadModal(false)}
                className="w-full mt-4 px-4 py-2.5 bg-blush/50 text-inkl rounded-xl font-sans text-sm font-medium"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
