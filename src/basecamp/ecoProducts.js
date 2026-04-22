/**
 * Eco-Friendly Building Products Database
 * Wilder Moms - Family-Friendly Outdoor/Nature Website
 * 
 * Categories: Paints & Finishes, Building Materials, Interiors, Kids & Baby, Furniture
 * Features: Use case tags, Health filters, DIY difficulty, Small brand flags
 * 
 * Verified eco-certifications: GREENGUARD, GREENGUARD Gold, FSC, FloorScore, 
 * USDA Certified Biobased, Asthma & Allergy Friendly, NSF, LEED, B-Corp, GOTS
 */

// ============================================
// CATEGORY: PAINTS & FINISHES
// ============================================

export const ecoProducts = [
  // --- PAINTS & FINISHES ---
  {
    id: 'afm-safecoat-zero-voc',
    name: 'Safecoat Zero VOC Paint',
    brand: 'AFM Safecoat',
    category: 'paints',
    description: 'One of the first zero-VOC, no HAPS paints on the market. Free of PFAS. Fully tintable with outstanding coverage.',
    ecoFeatures: [
      'Zero VOC - truly free of volatile organic compounds',
      'No hazardous air pollutants (HAPS-free)',
      'PFAS-free formulation',
      'Asthma & allergy friendly',
      'Made in USA'
    ],
    certifications: ['GREENGUARD Gold', 'Asthma & Allergy Friendly'],
    priceRange: '$$$',
    useCases: ['nursery', 'playroom', 'child-bedroom', 'bathroom'],
    healthFlags: ['asthma-safe', 'allergy-friendly', 'eczema-safe'],
    diyDifficulty: 2,
    diyNotes: 'Standard paint application. Low odor allows child-safe re-entry same day.',
    tags: ['nursery-safe', 'volatile-chemical-free'],
    smallBrand: false,
    womenOwned: false,
    links: {
      website: 'https://afmsafecoat.com/',
      purchase: 'https://www.greenbuildingsupply.com/All-Products/Paints-Coatings'
    }
  },
  {
    id: 'ecos-interior-paint',
    name: 'Interior Wall Paint',
    brand: 'ECOS Paints',
    category: 'paints',
    description: 'Award-winning zero-VOC paint trusted by institutions for 35+ years. Lullaby line specifically tested for nurseries.',
    ecoFeatures: [
      'Zero VOC verified',
      'Lullaby line tested for nurseries',
      'Allergy-safe formulation',
      'Made in USA',
      'GREENGUARD Gold certified'
    ],
    certifications: ['GREENGUARD Gold', 'USDA Certified Biobased'],
    priceRange: '$$',
    useCases: ['nursery', 'playroom', 'child-bedroom', 'mudroom'],
    healthFlags: ['asthma-safe', 'allergy-friendly', 'eczema-safe', 'fragrance-free'],
    diyDifficulty: 2,
    diyNotes: 'Easy application. Zero fumes means you can stay in the home while painting.',
    tags: ['nursery-safe', 'budget-friendly'],
    smallBrand: true,
    womenOwned: false,
    links: {
      website: 'https://ecospaints.net/',
      purchase: 'https://www.greenbuildingsupply.com/collections/ecos-paints'
    }
  },
  {
    id: 'benjamin-moore-eco-spec',
    name: 'Eco Spec Paint',
    brand: 'Benjamin Moore',
    category: 'paints',
    description: 'Low-VOC paint with Asthma & Allergy Friendly certification. Designed for environments where low chemical emissions matter.',
    ecoFeatures: [
      'Low VOC emissions',
      'Asthma & Allergy Friendly certified',
      'Suitable for sensitive individuals',
      'Zero harsh fumes'
    ],
    certifications: ['Asthma & Allergy Friendly'],
    priceRange: '$$',
    useCases: ['nursery', 'playroom', 'child-bedroom', 'basement'],
    healthFlags: ['asthma-safe', 'allergy-friendly'],
    diyDifficulty: 2,
    diyNotes: 'Professional-quality finish. Apply with standard brushes and rollers.',
    tags: [],
    smallBrand: false,
    womenOwned: false,
    links: {
      website: 'https://www.benjaminmoore.com/',
      purchase: 'https://www.benjaminmoore.com/en-us/interior-paint/eco-spec'
    }
  },
  {
    id: 'benjamin-moore-natura',
    name: 'Natura Premium Paint',
    brand: 'Benjamin Moore',
    category: 'paints',
    description: 'Premium zero-VOC paint with exceptional hide. Ideal for nurseries and bedrooms. Available in any Benjamin Moore color.',
    ecoFeatures: [
      'Zero VOC',
      'GREENGUARD Gold certified',
      'Asthma & Allergy Friendly certified',
      'APE-free formula',
      'Mildew resistant'
    ],
    certifications: ['GREENGUARD Gold', 'Asthma & Allergy Friendly'],
    priceRange: '$$$',
    useCases: ['nursery', 'child-bedroom', 'playroom'],
    healthFlags: ['asthma-safe', 'allergy-friendly', 'eczema-safe'],
    diyDifficulty: 2,
    diyNotes: 'Premium coverage means less coats needed. Great for nursery projects.',
    tags: ['nursery-safe', 'premium'],
    smallBrand: false,
    womenOwned: false,
    links: {
      website: 'https://www.benjaminmoore.com/',
      purchase: 'https://www.benjaminmoore.com/en-us/interior-paint/natura'
    }
  },
  {
    id: 'sherwin-williams-emerald',
    name: 'Emerald Interior Acrylic Latex',
    brand: 'Sherwin-Williams',
    category: 'paints',
    description: 'Premium low-VOC paint with exceptional washability. APE-free formula with stain release technology.',
    ecoFeatures: [
      'Low VOC (50 g/L or less)',
      'APE-free (no alkylphenol ethoxylates)',
      'GREENGUARD Gold certified',
      'Outstanding washability',
      'Stain release technology'
    ],
    certifications: ['GREENGUARD Gold'],
    priceRange: '$$$',
    useCases: ['playroom', 'mudroom', 'kitchen', 'high-traffic'],
    healthFlags: [],
    diyDifficulty: 2,
    diyNotes: 'Excellent for high-traffic family areas. Stain release technology handles messes.',
    tags: ['high-durability'],
    smallBrand: false,
    womenOwned: false,
    links: {
      website: 'https://www.sherwin-williams.com/',
      purchase: 'https://www.sherwin-williams.com/home-store/products/emerald-interior'
    }
  },
  {
    id: 'vermont-natural-coatings-floor-finish',
    name: 'PolyWhey Eco-Pro Wood Floor Finish',
    brand: 'Vermont Natural Coatings',
    category: 'paints',
    description: 'Award-winning sustainable wood finish using recycled whey protein. Safe enough for toys, durable enough for floors.',
    ecoFeatures: [
      'Uses recycled whey protein (byproduct of cheese making)',
      'Zero VOC',
      'Non-yellowing formula',
      'Quick drying',
      'Made in USA'
    ],
    certifications: ['LEED compliant'],
    priceRange: '$$',
    useCases: ['child-bedroom', 'playroom', 'nursery'],
    healthFlags: ['asthma-safe', 'eczema-safe'],
    diyDifficulty: 3,
    diyNotes: 'Requires proper ventilation during application. Fast dry time means 2-3 coats in one day.',
    tags: ['toy-safe', 'floor-finish'],
    smallBrand: true,
    womenOwned: false,
    links: {
      website: 'https://vermontnaturalcoatings.com/',
      purchase: 'https://vermontnaturalcoatings.com/products/polywhey%C2%AE-eco-pro-wood-floor-finish'
    }
  },

  // ============================================
  // CATEGORY: BUILDING MATERIALS
  // ============================================

  {
    id: 'rockwool-roxul-insulation',
    name: 'Comfortbatt Stone Wool Insulation',
    brand: 'ROCKWOOL (formerly Roxul)',
    category: 'buildingMaterials',
    description: 'Stone wool insulation from natural stone + up to 40% recycled content. Superior thermal and acoustic performance.',
    ecoFeatures: [
      'Up to 40% recycled content',
      'Natural stone-based material',
      'Superior fire resistance',
      'Excellent acoustic properties',
      'Moisture resistant'
    ],
    certifications: ['LEED compliant', 'UL Environment'],
    priceRange: '$$',
    useCases: ['walls', 'attic', 'basement', 'sound-room'],
    healthFlags: ['asthma-friendly-install'],
    diyDifficulty: 3,
    diyNotes: 'Cuts with a serrated knife. No itchy glass fibers like fiberglass. Wear gloves.',
    tags: ['fire-resistant', 'soundproofing'],
    smallBrand: false,
    womenOwned: false,
    links: {
      website: 'https://www.rockwool.com/north-america/',
      purchase: 'https://insulation4us.com/collections/roxul'
    }
  },
  {
    id: 'hempitecture-hempwool',
    name: 'HempWool Batt Insulation',
    brand: 'Hempitecture',
    category: 'buildingMaterials',
    description: 'Industrial hemp-based insulation with R-3.7 per inch. Non-toxic, breathable, and naturally mold-resistant.',
    ecoFeatures: [
      'Plant-based sustainable crop',
      'Non-toxic installation',
      'Breathable material',
      'Natural mold resistance',
      'Carbon negative potential'
    ],
    certifications: ['LEED compliant'],
    priceRange: '$$$',
    useCases: ['walls', 'attic', 'childrens-room'],
    healthFlags: ['asthma-safe', 'allergy-friendly', 'fragrance-free'],
    diyDifficulty: 3,
    diyNotes: 'Similar installation to fiberglass but no itch. Requires drywall or covering.',
    tags: ['innovative-material', 'carbon-negative', 'breathable'],
    smallBrand: true,
    womenOwned: false,
    links: {
      website: 'https://hempitecture.com/',
      purchase: 'https://hempitecture.com/hempwool/'
    }
  },
  {
    id: 'cotton-insulation',
    name: 'UltraTouch Natural Cotton Insulation',
    brand: 'Bonded Logic',
    category: 'buildingMaterials',
    description: 'Natural cotton insulation with 80% recycled denim content. No formaldehyde or acrylic binders.',
    ecoFeatures: [
      '80% recycled cotton denim',
      'No formaldehyde or acrylic binders',
      'Excellent acoustic performance',
      'No itchy installation',
      'Made in USA'
    ],
    certifications: ['GREENGUARD Gold', 'LEED compliant'],
    priceRange: '$$',
    useCases: ['walls', 'attic', 'sound-room'],
    healthFlags: ['asthma-safe', 'fragrance-free'],
    diyDifficulty: 3,
    diyNotes: 'Easiest insulation to handle - no gloves needed. R-13 in 2x6 walls.',
    tags: ['recycled-denim', 'quiet-home'],
    smallBrand: true,
    womenOwned: false,
    links: {
      website: 'https://www.bondedlogic.com/',
      purchase: 'https://www.bondedlogic.com/ultratouch/'
    }
  },
  {
    id: 'fsc-certified-lumber',
    name: 'FSC Certified Structural Lumber',
    brand: 'Advantage Lumber',
    category: 'buildingMaterials',
    description: 'Forest Stewardship Council certified lumber with verified chain of custody. Double LEED points for reclaimed.',
    ecoFeatures: [
      'FSC certified - responsibly managed forests',
      'Verified chain of custody',
      'Double LEED points for reclaimed',
      '4 USA factory locations',
      'Sustainably harvested'
    ],
    certifications: ['FSC'],
    priceRange: '$$$',
    useCases: ['framing', 'deck', 'outdoor-build', 'playset'],
    healthFlags: [],
    diyDifficulty: 4,
    diyNotes: 'Requires standard carpentry tools. Good for building playsets and outdoor structures.',
    tags: ['outdoor-build', 'playset-safe'],
    smallBrand: true,
    womenOwned: false,
    links: {
      website: 'https://www.advantagelumber.com/fsc/',
      purchase: 'https://www.advantagelumber.com/'
    }
  },
  {
    id: 'accoya-modified-wood',
    name: 'Accoya Modified Wood',
    brand: 'Accoya',
    category: 'buildingMaterials',
    description: 'Revolutionary sustainable wood using acetylation technology. Exceptional durability without toxic preservatives.',
    ecoFeatures: [
      'Sustainably sourced raw material',
      'Non-toxic acetylation process',
      '50 year warranty above ground',
      '20 year warranty in ground',
      'Naturally anti fungal'
    ],
    certifications: ['FSC', 'LEED compliant', 'Cradle to Cradle'],
    priceRange: '$$$',
    useCases: ['deck', 'outdoor-build', 'playset', 'siding', 'window-sill'],
    healthFlags: [],
    diyDifficulty: 3,
    diyNotes: 'Pre-drilling recommended for screws. Excellent for playground equipment near children.',
    tags: ['outdoor-build', 'playset-safe', 'long-warranty'],
    smallBrand: false,
    womenOwned: false,
    links: {
      website: 'https://www.accoya.com/',
      purchase: 'https://www.accoya.com/buy/'
    }
  },
  {
    id: 'reclaimed-barn-wood',
    name: 'Reclaimed Barn Wood Paneling',
    brand: 'Anthology Woods',
    category: 'buildingMaterials',
    description: '100% American-milled FSC certified and reclaimed wood. Authentic reclaimed character from historic structures.',
    ecoFeatures: [
      '100% American milled',
      'FSC certified options',
      'Reclaimed from historic structures',
      'Verified chain of custody',
      'Unique grain and patina'
    ],
    certifications: ['FSC'],
    priceRange: '$$',
    useCases: ['accent-wall', 'ceiling', 'child-bedroom', 'playroom'],
    healthFlags: [],
    diyDifficulty: 2,
    diyNotes: 'Straightforward installation. Adds incredible character to any room.',
    tags: ['accent-wall', 'rustic-charm'],
    smallBrand: true,
    womenOwned: false,
    links: {
      website: 'https://anthologywoods.com/',
      purchase: 'https://anthologywoods.com/'
    }
  },
  {
    id: 'paperstone-countertops',
    name: 'PaperStone Recycled Paper Countertops',
    brand: 'PaperStone',
    category: 'buildingMaterials',
    description: 'Countertop from 100% recycled paper + non-petroleum resin. GREENGUARD Gold certified.',
    ecoFeatures: [
      '100% recycled paper content',
      'Non-petroleum based resin binder',
      'GREENGUARD Gold certified',
      'Made in USA',
      'Carbon neutral manufacturing'
    ],
    certifications: ['GREENGUARD Gold', 'LEED compliant'],
    priceRange: '$$',
    useCases: ['craft-table', 'playroom', 'nursery'],
    healthFlags: ['asthma-safe'],
    diyDifficulty: 5,
    diyNotes: 'Professional installation recommended. Can be do-it-yourself with proper tools.',
    tags: ['countertops', 'craft-space'],
    smallBrand: true,
    womenOwned: false,
    links: {
      website: 'https://www.paperstone.com/',
      purchase: 'https://www.paperstone.com/where-to-buy/'
    }
  },

  // ============================================
  // CATEGORY: INTERIORS
  // ============================================

  {
    id: 'marmoleum-sheet-flooring',
    name: 'Marmoleum Sheet Flooring',
    brand: 'Forbo',
    category: 'interiors',
    description: 'Natural linoleum from linseed oil, wood flour, and limestone on jute backing. Naturally antibacterial.',
    ecoFeatures: [
      '95% natural raw materials',
      'Contains linseed oil (renewable)',
      'Naturally antibacterial',
      'No VOC emissions',
      'Fully recyclable'
    ],
    certifications: ['FloorScore', 'GREENGUARD Gold', 'LEED compliant'],
    priceRange: '$$',
    useCases: ['nursery', 'playroom', 'mudroom', 'bathroom', 'kitchen'],
    healthFlags: ['asthma-safe', 'allergy-friendly', 'antibacterial'],
    diyDifficulty: 4,
    diyNotes: 'Professional installation recommended for sheet goods. Click tiles are DIY-friendly.',
    tags: ['natural-linoleum', 'water-resistant'],
    smallBrand: false,
    womenOwned: false,
    links: {
      website: 'https://www.forbo.com/flooring/us-en/marmoleum',
      purchase: 'https://www.greenbuildingsupply.com/collections/flooring'
    }
  },
  {
    id: 'marmoleum-click-tiles',
    name: 'Marmoleum Click Tiles',
    brand: 'Forbo',
    category: 'interiors',
    description: 'DIY-friendly click-together Marmoleum tiles. Same eco credentials as sheet flooring with easier installation.',
    ecoFeatures: [
      '95% natural raw materials',
      'Click-together installation',
      'No adhesive required',
      'Naturally antibacterial',
      'Fully recyclable'
    ],
    certifications: ['FloorScore', 'GREENGUARD Gold', 'LEED compliant'],
    priceRange: '$$',
    useCases: ['nursery', 'playroom', 'child-bedroom', 'basement'],
    healthFlags: ['asthma-safe', 'allergy-friendly'],
    diyDifficulty: 2,
    diyNotes: 'Excellent DIY project. Click tiles float over existing floor. Kid-friendly installation.',
    tags: ['diy-friendly', 'no-glue'],
    smallBrand: false,
    womenOwned: false,
    links: {
      website: 'https://www.forbo.com/flooring/us-en/marmoleum',
      purchase: 'https://www.greenbuildingsupply.com/collections/flooring'
    }
  },
  {
    id: 'cork-flooring',
    name: 'Sustainable Cork Flooring',
    brand: 'EcoTimber',
    category: 'interiors',
    description: 'Cork harvested without harming trees. Naturally antimicrobial with excellent insulation.',
    ecoFeatures: [
      'Harvested without tree removal',
      'Naturally regenerative bark',
      'Naturally antimicrobial',
      'Excellent thermal insulation',
      'Outstanding sound absorption'
    ],
    certifications: ['FSC', 'FloorScore'],
    priceRange: '$$',
    useCases: ['nursery', 'playroom', 'child-bedroom', 'basement'],
    healthFlags: ['asthma-safe', 'soft-fall'],
    diyDifficulty: 2,
    diyNotes: 'Great for DIY. Soft surface reduces impact injuries for toddlers. Warm underfoot.',
    tags: ['soft-fall', 'warm-underfoot', 'soundproof'],
    smallBrand: true,
    womenOwned: false,
    links: {
      website: 'https://www.ecotimber.com/',
      purchase: 'https://www.ecotimber.com/cork-flooring/'
    }
  },
  {
    id: 'bamboo-flooring',
    name: 'Strand Woven Bamboo Flooring',
    brand: 'EcoTimber',
    category: 'interiors',
    description: 'Strand woven bamboo flooring. Twice as hard as red oak with sustainable production.',
    ecoFeatures: [
      'FSC certified bamboo',
      'Rapidly renewable resource',
      'Twice as hard as red oak',
      'Zero VOC emissions',
      'No added formaldehyde'
    ],
    certifications: ['FSC', 'FloorScore', 'GREENGUARD Gold'],
    priceRange: '$$',
    useCases: ['child-bedroom', 'playroom', 'hallway', 'kitchen'],
    healthFlags: ['asthma-safe'],
    diyDifficulty: 3,
    diyNotes: 'Click-lock or tongue-and-groove. More challenging than cork but very durable.',
    tags: ['hard-floor', 'high-durability'],
    smallBrand: true,
    womenOwned: false,
    links: {
      website: 'https://www.ecotimber.com/',
      purchase: 'https://www.ecotimber.com/bamboo-flooring/'
    }
  },
  {
    id: 'hempwood-flooring',
    name: 'Hempwood Solid Flooring',
    brand: 'Hempwood',
    category: 'interiors',
    description: 'Revolutionary flooring from compressed hemp with soy-based binder. Grows in 120 days vs 60+ years for oak.',
    ecoFeatures: [
      'Made from rapidly renewable hemp',
      'Grows in 120 days (vs 60+ years for oak)',
      'Soy-based binder',
      'Carbon storing material',
      'Made in USA (Tennessee)'
    ],
    certifications: ['FSC', 'GREENGUARD Gold'],
    priceRange: '$$',
    useCases: ['nursery', 'playroom', 'child-bedroom'],
    healthFlags: ['asthma-safe', 'fragrance-free'],
    diyDifficulty: 2,
    diyNotes: 'DIY-friendly tongue-and-groove installation. Softer than oak - more forgiving for falls.',
    tags: ['innovative', 'carbon-storing', 'soft-fall'],
    smallBrand: true,
    womenOwned: false,
    links: {
      website: 'https://www.hempwood.com/',
      purchase: 'https://www.hempwood.com/shop/'
    }
  },
  {
    id: 'icestone-countertops',
    name: 'Recycled Glass Countertops',
    brand: 'IceStone',
    category: 'interiors',
    description: 'Made in USA from recycled glass in cement binder. Beautiful, durable, sustainable.',
    ecoFeatures: [
      '100% recycled glass content',
      'Cement binder (no petroleum)',
      'Made in USA',
      'GREENGUARD Gold certified',
      'Seismic and LEED certified'
    ],
    certifications: ['GREENGUARD Gold', 'LEED certified', 'NSF'],
    priceRange: '$$$',
    useCases: ['craft-table', 'kitchen', 'playroom'],
    healthFlags: ['asthma-safe', 'food-safe'],
    diyDifficulty: 5,
    diyNotes: 'Professional fabrication and installation required.',
    tags: ['countertops', 'high-end'],
    smallBrand: true,
    womenOwned: false,
    links: {
      website: 'https://icestoneusa.com/',
      purchase: 'https://icestoneusa.com/where-to-buy/'
    }
  },
  {
    id: 'caesarstone-recycled-quartz',
    name: 'Recycled Material Quartz',
    brand: 'Caesarstone',
    category: 'interiors',
    description: 'Quartz surfaces with up to 50% recycled materials. ISO 14001 certified manufacturing.',
    ecoFeatures: [
      'Up to 50% recycled materials',
      'Recycled glass content',
      'ISO 14001 certified manufacturing',
      'Long lifespan reduces replacement',
      'No VOC emissions'
    ],
    certifications: ['GREENGUARD Gold', 'NSF', 'LEED compliant'],
    priceRange: '$$$',
    useCases: ['craft-table', 'kitchen', 'bathroom'],
    healthFlags: ['asthma-safe', 'food-safe', 'non-porous'],
    diyDifficulty: 5,
    diyNotes: 'Professional installation required. Extremely durable and non-porous.',
    tags: ['countertops', 'non-porous', 'low-maintenance'],
    smallBrand: false,
    womenOwned: false,
    links: {
      website: 'https://www.caesarstoneus.com/',
      purchase: 'https://www.caesarstoneus.com/recycled-material-quartz-countertops/'
    }
  },
  {
    id: 'dalsouple-recycled-rubber',
    name: 'd eco Rubber Flooring',
    brand: 'Dalsouple',
    category: 'interiors',
    description: 'Natural rubber flooring from recycled rubber tires. Exceptional durability for high-traffic areas.',
    ecoFeatures: [
      'Recycled rubber tire content',
      'Natural rubber (not synthetic)',
      'Antimicrobial properties',
      'Exceptional durability',
      'Fully recyclable'
    ],
    certifications: ['GREENGUARD Gold', 'FloorScore', 'LEED compliant'],
    priceRange: '$$$',
    useCases: ['playroom', 'mudroom', 'gym', 'outdoor-play'],
    healthFlags: ['soft-fall', 'non-slip'],
    diyDifficulty: 3,
    diyNotes: 'Comes in tiles or sheets. Adhesive or click installation. Great impact absorption.',
    tags: ['rubber-tiles', 'gym-flooring', 'playset-base'],
    smallBrand: false,
    womenOwned: false,
    links: {
      website: 'https://www.dalsouple.com/',
      purchase: 'https://www.dalsouple.com/where-to-buy/'
    }
  },
  {
    id: 'usg-led-lighting',
    name: 'Energy Wise LED Lighting',
    brand: 'USG Lighting',
    category: 'interiors',
    description: 'ENERGY STAR certified LED lighting. 75% less energy than incandescent, 25,000+ hour lifespan.',
    ecoFeatures: [
      'ENERGY STAR certified',
      '75% less energy than incandescent',
      'Long lifespan (25,000+ hours)',
      'Dimmable options',
      'Cool operating temperature'
    ],
    certifications: ['ENERGY STAR'],
    priceRange: '$',
    useCases: ['nursery', 'playroom', 'child-bedroom', 'all-rooms'],
    healthFlags: ['cool-operation', 'no-heat'],
    diyDifficulty: 1,
    diyNotes: 'Simplest DIY - just swap bulbs or install fixtures. No special tools needed.',
    tags: ['easy-upgrade', 'energy-savings'],
    smallBrand: false,
    womenOwned: false,
    links: {
      website: 'https://www.usglighting.com/',
      purchase: 'https://www.usglighting.com/led-lighting/'
    }
  },

  // ============================================
  // CATEGORY: KIDS & BABY
  // ============================================

  {
    id: 'green-toys-building-set',
    name: 'Make Believe Magic Sky Castle',
    brand: 'Green Toys',
    category: 'interiors',
    description: 'Made from 100% post-consumer recycled plastic (milk jugs). BPA-free, phthalate-free. Made in USA.',
    ecoFeatures: [
      '100% recycled plastic (milk jugs)',
      'BPA-free, phthalate-free',
      'No batteries needed',
      'Made in USA',
      'Dishwasher safe'
    ],
    certifications: ['ASTM', 'CPSC'],
    priceRange: '$',
    useCases: ['playroom', 'outdoor-play', 'travel'],
    healthFlags: ['non-toxic-plastic', 'bpa-free'],
    diyDifficulty: 0,
    diyNotes: 'No installation - toys ready to play. Great for gifts.',
    tags: ['toys', 'budget-friendly', 'outdoor-toy', 'recycled-plastic'],
    smallBrand: true,
    womenOwned: false,
    links: {
      website: 'https://www.greentoys.com/',
      purchase: 'https://www.greentoys.com/'
    }
  },
  {
    id: 'nature-kids-co-kit',
    name: 'Nature Explorer Kit Bundle',
    brand: 'Nature Kids Co.',
    category: 'interiors',
    description: 'Curated non-toxic kids products by parent founders. Organic and natural materials. Rigorous safety vetting.',
    ecoFeatures: [
      'Parent-founded company',
      'Rigorous safety vetting',
      'Organic and natural materials',
      'Free from harmful chemicals',
      'Durable for outdoor use'
    ],
    certifications: ['GOTS', 'OEKO-TEX'],
    priceRange: '$',
    useCases: ['outdoor-play', 'nature-activities', 'travel'],
    healthFlags: ['non-toxic', 'organic', 'fragrance-free'],
    diyDifficulty: 0,
    diyNotes: 'Ready to play. Great for outdoor adventures and nature exploration.',
    tags: ['outdoor-play', 'nature-activities', 'parent-founded'],
    smallBrand: true,
    womenOwned: true,
    links: {
      website: 'https://naturekidsco.com/',
      purchase: 'https://naturekidsco.com/'
    }
  },
  {
    id: 'avocado-green-crib-mattress',
    name: 'Organic Crib Mattress',
    brand: 'Avocado Green Brands',
    category: 'kids',
    description: 'GOTS certified organic cotton + natural latex. MADE SAFE certified. Non-toxic, Greenguard Gold certified.',
    ecoFeatures: [
      'GOTS certified organic cotton',
      'Natural latex (no synthetic)',
      'MADE SAFE certified',
      'Greenguard Gold certified',
      'Handcrafted in USA'
    ],
    certifications: ['GREENGUARD Gold', 'GOTS', 'MADE SAFE', 'OEKO-TEX'],
    priceRange: '$$$',
    useCases: ['nursery', 'crib'],
    healthFlags: ['asthma-safe', 'allergen-free', 'non-toxic-sleep'],
    diyDifficulty: 1,
    diyNotes: 'Simply unbox and place in crib. Allow 48 hours to expand.',
    tags: ['mattress', 'organic', 'nursery-essentials', 'premium'],
    smallBrand: true,
    womenOwned: true,
    links: {
      website: 'https://avocadogreenmattress.com/',
      purchase: 'https://avocadogreenmattress.com/nursery/'
    }
  },
  {
    id: 'columbia-jacket-kids',
    name: 'Min丫头 Midweight Jacket',
    brand: 'Columbia',
    category: 'interiors',
    description: 'Kids outdoor jacket with warm synthetic insulation. Good for active outdoor play in changing weather.',
    ecoFeatures: [
      'Recycled insulation (our in-house standard)',
      'Water-resistant shell',
      'Fleece-lined for warmth',
      'Omni-Tech waterproof-breathable',
      'Grows with her extendable cuffs'
    ],
    certifications: [],
    priceRange: '$$',
    useCases: ['outdoor-play', 'hiking', 'all-weather'],
    healthFlags: ['waterproof'],
    diyDifficulty: 0,
    diyNotes: 'Ready to wear. Machine washable. Long-lasting durability for active kids.',
    tags: ['clothing', 'outdoor-clothing', 'all-weather', 'grows-with-child'],
    smallBrand: false,
    womenOwned: false,
    links: {
      website: 'https://www.columbia.com/',
      purchase: 'https://www.columbia.com/kids/'
    }
  },
  {
    id: 'medley-furniture-sofa',
    name: 'Non-Toxic Performance Sofa',
    brand: 'Medley Home',
    category: 'furniture',
    description: 'Non-toxic, sustainable sofas without flame retardants or harmful chemicals. Handcrafted in USA with eco-certified foams and fabrics.',
    ecoFeatures: [
      'No flame retardant chemicals',
      'Non-toxic foams and fabrics',
      'Handcrafted in USA',
      'GOTS certified fabric options',
      'Carbon neutral shipping'
    ],
    certifications: ['GREENGUARD Gold', 'GOTS'],
    priceRange: '$$$$',
    useCases: ['living-room', 'family-room', 'playroom'],
    healthFlags: ['asthma-safe', 'no-off-gassing', 'fragrance-free'],
    diyDifficulty: 2,
    diyNotes: 'White-glove delivery includes placement. Non-toxic so you can have kids on it immediately.',
    tags: ['furniture', 'non-toxic-furniture', 'family-room', 'sofa'],
    smallBrand: true,
    womenOwned: false,
    links: {
      website: 'https://medleyhome.com/',
      purchase: 'https://medleyhome.com/'
    }
  },
  {
    id: 'sabi-furniture-outdoor',
    name: 'Cirque Outdoor Sofa',
    brand: 'Sabai',
    category: 'furniture',
    description: 'Sustainable outdoor furniture with performance fabrics from recycled materials. Made in USA. Circular design model.',
    ecoFeatures: [
      'Performance fabric from recycled materials',
      'Made in USA',
      'Circular design model (recyclable)',
      'Stain-resistant for families',
      '5-year warranty'
    ],
    certifications: ['B-Corp'],
    priceRange: '$$$$',
    useCases: ['outdoor-living', 'backyard', 'patio'],
    healthFlags: ['stain-resistant', 'family-friendly'],
    diyDifficulty: 1,
    diyNotes: 'Delivery and setup included. Withstands spills, kids, and weather.',
    tags: ['furniture', 'outdoor', 'sustainable', 'family-friendly'],
    smallBrand: true,
    womenOwned: true,
    links: {
      website: 'https://sabai.design/',
      purchase: 'https://sabai.design/collections'
    }
  },
  {
    id: 'vivaterra-outdoor-deck',
    name: 'Reclaimed Teak Outdoor Collection',
    brand: 'VivaTerra',
    category: 'furniture',
    description: 'FSC certified reclaimed teak outdoor furniture. Reclaimed materials from old buildings in India. Beautiful and durable.',
    ecoFeatures: [
      'FSC certified reclaimed teak',
      'Reclaimed from old buildings',
      'Handcrafted by artisans',
      'All-weather durable',
      'Unique reclaimed character'
    ],
    certifications: ['FSC'],
    priceRange: '$$$',
    useCases: ['outdoor-living', 'backyard', 'patio', 'play-area'],
    healthFlags: [],
    diyDifficulty: 1,
    diyNotes: 'Delivery and placement included. develops beautiful silver patina over time.',
    tags: ['furniture', 'outdoor', 'reclaimed-wood', 'artisan-made'],
    smallBrand: false,
    womenOwned: false,
    links: {
      website: 'https://www.vivaterra.com/',
      purchase: 'https://www.vivaterra.com/collections/outdoor'
    }
  },
  {
    id: 'growing-tree-bed',
    name: 'Harbor Low Loft Bed',
    brand: 'Plantation Home',
    category: 'furniture',
    description: 'Solid hardwood loft bed designed to grow with children. FSC certified wood. Converts from loft to standard bed.',
    ecoFeatures: [
      'FSC certified solid hardwood',
      'Converts as child grows',
      'No toxic finishes',
      'Handcrafted quality',
      'Made in USA'
    ],
    certifications: ['FSC'],
    priceRange: '$$$',
    useCases: ['child-bedroom', 'playroom'],
    healthFlags: ['non-toxic-finish'],
    diyDifficulty: 3,
    diyNotes: 'Requires 2 adults for assembly. Tools and instructions included. Converts as child grows.',
    tags: ['furniture', 'bed', 'grows-with-child', 'child-bedroom'],
    smallBrand: true,
    womenOwned: false,
    links: {
      website: 'https://www.plantantionhome.com/',
      purchase: 'https://www.plantantionhome.com/harbor-loft-bed'
    }
  },
  {
    id: 'keecker-pod-homehub',
    name: 'Keecker Pod Home Hub',
    brand: 'Keecker',
    category: 'interiors',
    description: 'Smart home projector and speaker in a spherical design. Projects movies, games, and educational content on any wall.',
    ecoFeatures: [
      'Energy efficient projection',
      'Minimal packaging',
      'Designed for repairability',
      'Long software support (5+ years)',
      'Made in France with quality control'
    ],
    certifications: ['CE', 'RoHS'],
    priceRange: '$$$',
    useCases: ['playroom', 'child-bedroom', 'family-room', 'education'],
    healthFlags: ['low-blue-light'],
    diyDifficulty: 1,
    diyNotes: 'Simple setup via smartphone app. Mounts to ceiling or sits on shelf.',
    tags: ['smart-home', 'education', 'entertainment', 'minimalist'],
    smallBrand: false,
    womenOwned: false,
    links: {
      website: 'https://keecker.com/',
      purchase: 'https://keecker.com/collections'
    }
  },
  {
    id: 'molekule-air-purifier',
    name: 'Molekule Air Mini+ Purifier',
    brand: 'Molekule',
    category: 'interiors',
    description: 'PECO technology destroys pollutants at molecular level. FDA-cleared. Allergist-recommended for families with allergies or asthma.',
    ecoFeatures: [
      'PECO technology (molecular destruction)',
      'Destroys allergens, mold, VOCs',
      'FDA-cleared medical device',
      'Allergist-recommended',
      'Whisper-quiet sleep mode'
    ],
    certifications: ['FDA Cleared'],
    priceRange: '$$$',
    useCases: ['nursery', 'child-bedroom', 'playroom', 'asthma-home'],
    healthFlags: ['asthma-safe', 'allergen-destroyer', 'air-quality'],
    diyDifficulty: 1,
    diyNotes: 'Simple plug-and-play setup. Filter replacement every 6 months.',
    tags: ['air-purifier', 'asthma', 'allergen', 'nursery-essentials'],
    smallBrand: true,
    womenOwned: false,
    links: {
      website: 'https://molekule.com/',
      purchase: 'https://molekule.com/collections'
    }
  },

  // ============================================
  // ADDITIONAL PRODUCTS
  // ============================================

  {
    id: 'afm-safecoat-wood-finish',
    name: 'Transterior Wood Finish',
    brand: 'AFM Safecoat',
    category: 'paints',
    description: 'Durable exterior wood finish - zero VOC, non-toxic. For decks, siding, outdoor furniture.',
    ecoFeatures: [
      'Zero VOC',
      'Non-toxic formulation',
      'Weather resistant',
      'Water-based',
      'No hazardous fumes'
    ],
    certifications: ['GREENGUARD Gold'],
    priceRange: '$$$',
    useCases: ['outdoor-build', 'playset', 'deck'],
    healthFlags: ['asthma-safe'],
    diyDifficulty: 2,
    diyNotes: 'Brush, roll, or spray application. Clean up with soap and water.',
    tags: ['deck-finish', 'outdoor-finish', 'playset-safe'],
    smallBrand: true,
    womenOwned: false,
    links: {
      website: 'https://afmsafecoat.com/',
      purchase: 'https://afmsafecoat.com/product/transterior-wood-finish/'
    }
  },
  {
    id: 'behr-premium-plus-ultra',
    name: 'Premium Plus Ultra Interior',
    brand: 'Behr',
    category: 'paints',
    description: 'Zero-VOC interior paint with primer and built-in stain blocker. Large color palette.',
    ecoFeatures: [
      'Zero VOC',
      'Primer + stain blocker built-in',
      'Low odor',
      'GREENGUARD Gold certified options',
      'Antimicrobial finish'
    ],
    certifications: ['GREENGUARD Gold'],
    priceRange: '$',
    useCases: ['playroom', 'mudroom', 'hallway', 'high-traffic'],
    healthFlags: [],
    diyDifficulty: 2,
    diyNotes: 'All-in-one paint and primer. Great for high-traffic family areas. Budget-friendly.',
    tags: ['budget-friendly', 'high-traffic', 'no-primer-needed'],
    smallBrand: false,
    womenOwned: false,
    links: {
      website: 'https://www.behr.com/',
      purchase: 'https://www.homedepot.com/p/Behr-Premium-Plus-Ultra'
    }
  },
  {
    id: 'vermont-natural-coatings-exterior-stain',
    name: 'Exterior Penetrating Wood Stain',
    brand: 'Vermont Natural Coatings',
    category: 'paints',
    description: 'One-step durable top coat, stain and finish using PolyWhey technology. Zero VOC.',
    ecoFeatures: [
      'Recycled whey protein base',
      'Zero VOC',
      'One-step application',
      'Water-based',
      'LEED compliant'
    ],
    certifications: ['LEED compliant'],
    priceRange: '$$',
    useCases: ['outdoor-build', 'deck', 'playset', 'fence'],
    healthFlags: ['asthma-safe'],
    diyDifficulty: 2,
    diyNotes: 'One-step means less time. Water cleanup. Great for playsets.',
    tags: ['one-step', 'outdoor-stain', 'playset-safe'],
    smallBrand: true,
    womenOwned: false,
    links: {
      website: 'https://vermontnaturalcoatings.com/',
      purchase: 'https://eco-buildingproducts.com/products/vermont-natural-exterior-wood-finish'
    }
  },
  {
    id: 'silestone-eco-line',
    name: 'Eco Line Recycled Quartz',
    brand: 'Silestone',
    category: 'interiors',
    description: 'Eco Line with 50% recycled material including recycled glass. HybriQ technology production.',
    ecoFeatures: [
      '50% recycled material content',
      'Recycled glass component',
      'HybriQ technology production',
      'Nitrogen-purged manufacturing',
      '15 year warranty'
    ],
    certifications: ['GREENGUARD Gold', 'NSF', 'LEED compliant'],
    priceRange: '$$$',
    useCases: ['craft-table', 'kitchen', 'bathroom'],
    healthFlags: ['non-porous', 'food-safe'],
    diyDifficulty: 5,
    diyNotes: 'Professional fabrication and installation required.',
    tags: ['countertops', 'recycled', 'low-maintenance'],
    smallBrand: false,
    womenOwned: false,
    links: {
      website: 'https://www.silestone.com/',
      purchase: 'https://www.silestone.com/where-to-buy/'
    }
  },
  {
    id: 'green-toys-bath-set',
    name: 'Bath Time Fun Set',
    brand: 'Green Toys',
    category: 'interiors',
    description: '100% recycled plastic bath toys. Mold and mildew resistant. No batteries, no plastic film packaging.',
    ecoFeatures: [
      '100% recycled plastic (milk jugs)',
      'Mold and mildew resistant',
      'No batteries or electronic parts',
      'BPA and phthalate free',
      'Dishwasher safe'
    ],
    certifications: ['ASTM', 'CPSC'],
    priceRange: '$',
    useCases: ['bathroom', 'bath-time', 'toddler'],
    healthFlags: ['non-toxic', 'mold-resistant'],
    diyDifficulty: 0,
    diyNotes: 'Ready to play. Squeeze toys drain water easily. Dishwasher safe for sanitation.',
    tags: ['bath-toys', 'budget-friendly', 'recycled-plastic', 'toddler'],
    smallBrand: true,
    womenOwned: false,
    links: {
      website: 'https://www.greentoys.com/',
      purchase: 'https://www.greentoys.com/collections/bath-toys'
    }
  },
  {
    id: 'avocado-green-mattress-twin',
    name: 'Youth Natural Mattress',
    brand: 'Avocado Green Brands',
    category: 'kids',
    description: 'GOTS certified organic twin mattress for kids. Natural latex + organic wool + cotton. MADE SAFE.',
    ecoFeatures: [
      'GOTS certified organic',
      'Natural latex and wool',
      'MADE SAFE certified',
      'No flame retardant chemicals',
      'Handcrafted in USA'
    ],
    certifications: ['GREENGUARD Gold', 'GOTS', 'MADE SAFE', 'OEKO-TEX'],
    priceRange: '$$$',
    useCases: ['child-bedroom', 'bunk-bed', 'twin-bed'],
    healthFlags: ['asthma-safe', 'allergen-free', 'non-toxic-sleep'],
    diyDifficulty: 1,
    diyNotes: 'Unbox and place. Allow 48 hours to expand. Natural wool is fire barrier - no chemical treatment.',
    tags: ['mattress', 'twin', 'organic', 'child-bedroom'],
    smallBrand: true,
    womenOwned: true,
    links: {
      website: 'https://avocadogreenmattress.com/',
      purchase: 'https://avocadogreenmattress.com/youth-mattress/'
    }
  }
];

// ============================================
// HELPER FUNCTIONS
// ============================================

export const categories = ['All', 'Paints & Finishes', 'Building Materials', 'Interiors', 'Kids & Baby', 'Furniture'];

export const healthFilters = [
  { id: 'asthma-safe', label: 'Asthma Safe', color: 'blue' },
  { id: 'allergy-friendly', label: 'Allergy Friendly', color: 'green' },
  { id: 'eczema-safe', label: 'Eczema Safe', color: 'purple' },
  { id: 'fragrance-free', label: 'Fragrance Free', color: 'pink' }
];

export const useCaseLabels = {
  'nursery': 'Nursery',
  'playroom': 'Playroom',
  'child-bedroom': "Child's Bedroom",
  'mudroom': 'Mudroom',
  'bathroom': 'Bathroom',
  'kitchen': 'Kitchen',
  'outdoor-build': 'Outdoor Build',
  'playset': 'Playset',
  'craft-table': 'Craft Table',
  'living-room': 'Living Room',
  'family-room': 'Family Room',
  'backyard': 'Backyard',
  'all-weather': 'All Weather',
  'toddler': 'Toddler Zone'
};

export const getProductsByUseCase = (useCase) => {
  return ecoProducts.filter(p => p.useCases && p.useCases.includes(useCase));
};

export const getProductsByHealthFlag = (flag) => {
  return ecoProducts.filter(p => p.healthFlags && p.healthFlags.includes(flag));
};

export const getProductsByTag = (tag) => {
  return ecoProducts.filter(p => p.tags && p.tags.includes(tag));
};

export const getSmallBrandProducts = () => {
  return ecoProducts.filter(p => p.smallBrand === true);
};

export const getWomenOwnedProducts = () => {
  return ecoProducts.filter(p => p.womenOwned === true);
};

export const getBudgetProducts = (maxPrice = '$') => {
  const priceOrder = ['$', '$$', '$$$', '$$$$'];
  const maxIndex = priceOrder.indexOf(maxPrice);
  return ecoProducts.filter(p => priceOrder.indexOf(p.priceRange) <= maxIndex);
};

export const getDIYFriendly = (maxDifficulty = 2) => {
  return ecoProducts.filter(p => p.diyDifficulty <= maxDifficulty);
};

export const getCompleteNurseryBundle = () => {
  return {
    paint: ecoProducts.find(p => p.id === 'ecos-interior-paint'),
    floor: ecoProducts.find(p => p.id === 'marmoleum-click-tiles'),
    mattress: ecoProducts.find(p => p.id === 'avocado-green-crib-mattress'),
    purifier: ecoProducts.find(p => p.id === 'molekule-air-purifier'),
    lighting: ecoProducts.find(p => p.id === 'usg-led-lighting'),
    toys: ecoProducts.find(p => p.id === 'green-toys-bath-set')
  };
};

export const getCompletePlayroomBundle = () => {
  return {
    paint: ecoProducts.find(p => p.id === 'sherwin-williams-emerald'),
    floor: ecoProducts.find(p => p.id === 'cork-flooring'),
    furniture: ecoProducts.find(p => p.id === 'medley-furniture-sofa'),
    lighting: ecoProducts.find(p => p.id === 'usg-led-lighting'),
    toys: ecoProducts.find(p => p.id === 'nature-kids-co-kit')
  };
};

export const getCompletePlaysetBundle = () => {
  return {
    lumber: ecoProducts.find(p => p.id === 'accoya-modified-wood'),
    finish: ecoProducts.find(p => p.id === 'vermont-natural-coatings-exterior-stain'),
    flooring: ecoProducts.find(p => p.id === 'dalsouple-recycled-rubber')
  };
};
