import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { trailCrafts } from '../data/craftExtensions';
import { getSeasonalForageItems } from './craftTrails';
import { getCurrentSeason } from '../data/seasonalPlants';

export default function WhatICollected({ collection = [], onCollectionChange }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const season = getCurrentSeason();
  
  // Get craft suggestions based on collection
  const craftSuggestions = useMemo(() => {
    if (collection.length === 0) return [];
    
    const forageIds = collection.map(c => c.id);
    const suggestions = [];
    
    // Find crafts that can be made from collected items
    trailCrafts.forEach(craft => {
      const canMake = craft.forages.some(f => forageIds.includes(f));
      if (canMake && craft.makeNowIndoor) {
        suggestions.push(craft);
      }
    });
    
    return suggestions.slice(0, 4);
  }, [collection]);
  
  const seasonalItems = useMemo(() => getSeasonalForageItems(season), [season]);
  
  const addItem = (item) => {
    const existing = collection.find(c => c.id === item.id);
    if (existing) {
      onCollectionChange(
        collection.map(c => 
          c.id === item.id ? { ...c, count: c.count + 1 } : c
        )
      );
    } else {
      onCollectionChange([...collection, { ...item, count: 1 }]);
    }
  };
  
  const removeItem = (itemId) => {
    const existing = collection.find(c => c.id === itemId);
    if (existing && existing.count > 1) {
      onCollectionChange(
        collection.map(c => 
          c.id === itemId ? { ...c, count: c.count - 1 } : c
        )
      );
    } else {
      onCollectionChange(collection.filter(c => c.id !== itemId));
    }
  };
  
  const totalItems = collection.reduce((sum, c) => sum + c.count, 0);
  
  if (collection.length === 0 && !isExpanded) {
    return (
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={() => setIsExpanded(true)}
        className="fixed bottom-6 right-6 z-40 bg-ember text-white rounded-full px-5 py-3 shadow-lg hover:bg-terra transition-colors flex items-center gap-2"
      >
        <span className="text-lg">Pack</span>
        <span className="font-sans text-sm font-medium">What I Found</span>
      </motion.button>
    );
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed bottom-6 right-6 z-40 w-80 bg-white rounded-2xl shadow-xl border border-inkll/20 overflow-hidden"
    >
      {/* Header */}
      <div 
        className="bg-ember p-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">Pack</span>
            <div>
              <p className="font-sans text-white font-medium">What I Found</p>
              <p className="font-sans text-white/70 text-xs">
                {totalItems > 0 ? `${totalItems} items collected` : 'Start collecting!'}
              </p>
            </div>
          </div>
          <button className="text-white/70 hover:text-white">
            <svg className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="overflow-hidden"
          >
            {/* Collected Items */}
            {collection.length > 0 && (
              <div className="p-4 border-b border-inkll/10">
                <p className="font-sans text-xs text-inkl uppercase tracking-wide mb-3">
                  Your collection
                </p>
                <div className="flex flex-wrap gap-2">
                  {collection.map(item => (
                    <div 
                      key={item.id}
                      className="flex items-center gap-1 bg-cream rounded-full px-3 py-1"
                    >
                      <span>{item.emoji}</span>
                      <span className="font-sans text-xs text-ink">{item.label}</span>
                      <span className="font-sans text-xs text-ember font-medium">×{item.count}</span>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="ml-1 text-inkl hover:text-ember"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                
                {/* Craft Suggestions */}
                {craftSuggestions.length > 0 && (
                  <div className="mt-4">
                    <button
                      onClick={() => setShowSuggestions(!showSuggestions)}
                      className="flex items-center gap-2 mb-2"
                    >
                      <span className="text-lg">Idea</span>
                      <p className="font-sans text-sm text-ember font-medium">
                        Make something!
                      </p>
                      <svg className={`w-4 h-4 text-ember transition-transform ${showSuggestions ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    <AnimatePresence>
                      {showSuggestions && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: 'auto' }}
                          className="space-y-2"
                        >
                          {craftSuggestions.map(craft => (
                            <div key={craft.id} className="bg-olive/10 rounded-lg p-3">
                              <p className="font-sans text-sm text-ink font-medium">{craft.title}</p>
                              <p className="font-sans text-xs text-inkl mt-1">
                                {craft.instructions.slice(0, 80)}...
                              </p>
                              <a 
                                href="/basecamp/activities"
                                className="inline-flex items-center gap-1 text-ember text-xs font-medium mt-2 hover:text-terra"
                              >
                                Full instructions →
                              </a>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            )}
            
            {/* Add Items */}
            <div className="p-4">
              <p className="font-sans text-xs text-inkl uppercase tracking-wide mb-3">
                Tap to add
              </p>
              <div className="flex flex-wrap gap-2">
                {seasonalItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => addItem(item)}
                    className="flex items-center gap-1 bg-cream/60 hover:bg-cream rounded-full px-3 py-1.5 text-sm transition-colors"
                  >
                    <span>{item.emoji}</span>
                    <span className="font-sans text-ink text-xs">{item.label}</span>
                    <span className="text-ember text-xs">+</span>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Footer */}
            {collection.length > 0 && (
              <div className="p-4 bg-cream/50 text-center">
                <a 
                  href="/basecamp/activities"
                  className="inline-flex items-center gap-2 text-ember font-medium text-sm hover:text-terra transition-colors"
                >
                  Browse all trail crafts
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
