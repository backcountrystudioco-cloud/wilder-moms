import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const borrowableGear = [
  { 
    id: 'tent', 
    name: 'Tent', 
    note: 'Family tents available',
    villageLink: true,
    icon: 'tent',
    priceRange: '$100-400',
  },
  { 
    id: 'sleeping-bags', 
    name: 'Sleeping Bags', 
    note: 'Kids & adult sizes',
    villageLink: true,
    icon: 'sleep',
    priceRange: '$50-200',
  },
  { 
    id: 'sleeping-pads', 
    name: 'Sleeping Pads', 
    note: 'Insulated pads essential',
    villageLink: true,
    icon: 'pad',
    priceRange: '$30-150',
  },
  { 
    id: 'carrier', 
    name: 'Hiking Carrier', 
    note: 'Osprey, Deuter, Ergo',
    villageLink: true,
    icon: 'pack',
    priceRange: '$80-280',
  },
  { 
    id: 'trekking-poles', 
    name: 'Trekking Poles', 
    note: 'Great for knees',
    villageLink: true,
    icon: 'poles',
    priceRange: '$30-120',
  },
  { 
    id: 'headlamps', 
    name: 'Headlamps', 
    note: 'USB rechargeable',
    villageLink: true,
    icon: 'light',
    priceRange: '$15-50',
  },
  { 
    id: 'water-filter', 
    name: 'Water Filter', 
    note: 'For backcountry',
    villageLink: true,
    icon: 'water',
    priceRange: '$25-80',
  },
  { 
    id: 'camp-chairs', 
    name: 'Camp Chairs', 
    note: 'Kids sizes too',
    villageLink: true,
    icon: 'chair',
    priceRange: '$20-100',
  },
]

export default function GearYouMightBorrow({ onVillageClick }) {
  const [hovered, setHovered] = useState(null)

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-inkll/10">
      <div className="flex items-center gap-2 mb-2">
        <h3 className="font-serif text-xl text-ink">Gear to Borrow</h3>
        <span className="text-xs px-2 py-1 bg-olive/10 text-olive rounded-full font-sans">Village</span>
      </div>
      <p className="text-sm text-inkl mb-6">Before you buy, check if yourVillage has these items to share</p>

      <div className="grid grid-cols-2 gap-3">
        {borrowableGear.map((gear) => (
          <motion.div
            key={gear.id}
            whileHover={{ scale: 1.02 }}
            className="p-3 bg-cream rounded-xl cursor-pointer hover:bg-blush/30 transition-colors"
            onMouseEnter={() => setHovered(gear.id)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => onVillageClick && onVillageClick(gear)}
          >
            <div className="flex items-start gap-3">
              <span className="text-xs font-bold text-inkll uppercase">{gear.icon}</span>
              <div className="flex-1">
                <p className="font-sans text-sm font-medium text-ink">{gear.name}</p>
                <p className="text-xs text-inkl">{gear.note}</p>
                <AnimatePresence>
                  {hovered === gear.id && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-xs text-ember mt-1"
                    >
                      {gear.priceRange} new
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-blush/20 rounded-lg">
        <p className="text-xs text-inkl text-center">
          The Village is our gear-sharing community. <span className="text-ember font-medium cursor-pointer">Find gear near you →</span>
        </p>
      </div>
    </div>
  )
}
