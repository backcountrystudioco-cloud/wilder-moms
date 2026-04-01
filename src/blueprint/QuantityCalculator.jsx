import { useState } from 'react'

export default function QuantityCalculator({ adults, kids, onChange, onAddItems }) {
  const [addedToList, setAddedToList] = useState(false)

  const handleAdultsChange = (delta) => {
    const newValue = Math.max(0, adults + delta)
    onChange({ adults: newValue, kids })
    setAddedToList(false)
  }

  const handleKidsChange = (delta) => {
    const newValue = Math.max(0, kids + delta)
    onChange({ adults, kids: newValue })
    setAddedToList(false)
  }

  // Calculate quantities
  const totalPeople = adults + kids
  const water = kids * 8 + adults * 16 // oz per hour
  const snacks = (adults + kids) * 3 // items
  const firstAidKits = 1 // per trip

  const quantities = [
    { label: 'Water', value: `${water} oz`, note: 'per hour' },
    { label: 'Snacks', value: snacks, note: 'items' },
    { label: 'First Aid Kits', value: firstAidKits, note: 'per trip' },
  ]

  // Items to add to list
  const itemsToAdd = [
    `${water} oz water per person`,
    `${snacks} trail snacks`,
    'First aid kit',
  ]

  const handleAddToList = () => {
    if (onAddItems) {
      onAddItems(itemsToAdd)
    }
    setAddedToList(true)
    setTimeout(() => setAddedToList(false), 2000)
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-inkll/10">
      <h3 className="font-serif text-xl text-ink mb-6">Quantity Calculator</h3>

      {/* Input Controls */}
      <div className="flex gap-6 mb-8">
        {/* Adults */}
        <div className="flex flex-col items-center">
          <span className="text-sm text-inkl mb-2">Adults</span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleAdultsChange(-1)}
              className="w-10 h-10 rounded-full bg-blush/50 text-ember font-bold text-lg hover:bg-blush transition-colors flex items-center justify-center"
            >
              −
            </button>
            <span className="w-8 text-center font-sans text-xl text-ink">{adults}</span>
            <button
              onClick={() => handleAdultsChange(1)}
              className="w-10 h-10 rounded-full bg-ember text-white font-bold text-lg hover:bg-terra transition-colors flex items-center justify-center"
            >
              +
            </button>
          </div>
        </div>

        {/* Kids */}
        <div className="flex flex-col items-center">
          <span className="text-sm text-inkl mb-2">Kids</span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleKidsChange(-1)}
              className="w-10 h-10 rounded-full bg-blush/50 text-ember font-bold text-lg hover:bg-blush transition-colors flex items-center justify-center"
            >
              −
            </button>
            <span className="w-8 text-center font-sans text-xl text-ink">{kids}</span>
            <button
              onClick={() => handleKidsChange(1)}
              className="w-10 h-10 rounded-full bg-ember text-white font-bold text-lg hover:bg-terra transition-colors flex items-center justify-center"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Calculated Quantities Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        {quantities.map((item) => (
          <div
            key={item.label}
            className="bg-cream rounded-xl p-4 text-center"
          >
            <div className="font-sans text-2xl text-ember font-semibold">{item.value}</div>
            <div className="text-sm text-ink mt-1">{item.label}</div>
            <div className="text-xs text-inkl">{item.note}</div>
          </div>
        ))}
      </div>

      {/* Add Button */}
      <button
        onClick={handleAddToList}
        className={`w-full py-3 rounded-xl font-sans font-medium transition-colors ${
          addedToList
            ? 'bg-olive text-white'
            : 'bg-olive/10 text-olive hover:bg-olive/20'
        }`}
      >
        {addedToList ? '✓ Added to My List' : '+ Add Quantities to My List'}
      </button>
    </div>
  )
}
