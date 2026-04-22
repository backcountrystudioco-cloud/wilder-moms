/**
 * Eco-Friendly Building Products Database
 * Wilder Moms - Family-Friendly Outdoor/Nature Website
 * 
 * Research sources:
 * - The Good Trade, theroundup.org, greenmatters.com (paint reviews 2025-2026)
 * - AFM Safecoat official site (afmsafecoat.com)
 * - ECOS Paints official site (ecospaints.net)
 * - Vermont Natural Coatings official site (vermontnaturalcoatings.com)
 * - FSC.org (Forest Stewardship Council)
 * - SCS Global Services (FloorScore certification)
 * - US EPA greener products identification guide
 * - greenbuildingsupply.com, eco-buildingproducts.com
 * 
 * Verified eco-certifications: GREENGUARD, GREENGUARD Gold, FSC, FloorScore, 
 * USDA Certified Biobased, Asthma & Allergy Friendly, NSF, LEED compliant
 */

// ============================================
//Category 1: PAINTS & FINISHES
// ============================================

export const ecoProducts = [
  // --- PAINTS & FINISHES (10 products) ---
  {
    id: 'afm-safecoat-zero-voc',
    name: 'Safecoat Zero VOC Paint',
    brand: 'AFM Safecoat',
    category: 'paints',
    description: 'One of the first zero-VOC, no HAPS (hazardous air pollutants) paints on the market. Free of PFAS, per- and polyfluoroalkyl substances. Fully tintable in any color with outstanding coverage.',
    ecoFeatures: [
      'Zero VOC - truly free of volatile organic compounds',
      'No hazardous air pollutants (HAPS-free)',
      'PFAS-free formulation',
      'Asthma & allergy friendly',
      'Made in USA'
    ],
    certifications: ['GREENGUARD Gold', 'Asthma & Allergy Friendly'],
    priceRange: '$$$',
    links: {
      website: 'https://afmsafecoat.com/',
      purchase: 'https://www.greenbuildingsupply.com/All-Products/Paints-Coatings-Paints-Prime.../AFM-Safecoat-Zero-VOC-Interior-Paint'
    }
  },
  {
    id: 'ecos-interior-paint',
    name: 'Interior Wall Paint',
    brand: 'ECOS Paints',
    category: 'paints',
    description: 'Award-winning zero-VOC paint trusted by homeowners and prestigious institutions for over 35 years. High-performance, non-toxic formula safe for everyone including those with chemical sensitivities.',
    ecoFeatures: [
      'Zero VOC verified',
      'Free of harsh fumes',
      'Allergy-safe formulation',
      'Made in USA with highest quality ingredients',
      ' GREENGUARD Gold certified'
    ],
    certifications: ['GREENGUARD Gold', 'USDA Certified Biobased'],
    priceRange: '$$',
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
    description: 'Next-generation low-VOC paint that earned Asthma & Allergy Friendly certification. Designed for项目中 environments where low chemical emissions matter.',
    ecoFeatures: [
      'Low VOC emissions',
      'Asthma & Allergy Friendly certified',
      'Suitable for people with asthma and allergies',
      'Zero harsh fumes'
    ],
    certifications: ['Asthma & Allergy Friendly'],
    priceRange: '$$',
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
    description: 'Premium zero-VOC paint with exceptional hide and durability. Available in any color in the Benjamin Moore fan deck. Ideal for nurseries and bedrooms.',
    ecoFeatures: [
      'Zero VOC',
      'GREENGUARD Gold certified',
      'Asthma & Allergy Friendly certified',
      'Ape-free formula',
      'Mildew resistant'
    ],
    certifications: ['GREENGUARD Gold', 'Asthma & Allergy Friendly'],
    priceRange: '$$$',
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
    description: 'Premium low-VOC paint with exceptional washability and hide. Emerald line is APE-free and designed for professionals seeking both performance and environmental responsibility.',
    ecoFeatures: [
      'Low VOC (50 g/L or less)',
      'APE-free (no alkylphenol ethoxylates)',
      'GREENGUARD Gold certified',
      'Outstanding washability',
      'Stain release technology'
    ],
    certifications: ['GREENGUARD Gold'],
    priceRange: '$$$',
    links: {
      website: 'https://www.sherwin-williams.com/',
      purchase: 'https://www.sherwin-williams.com/home-store/products/emerald-interior'
    }
  },
  {
    id: 'sherwin-williams-superpaint',
    name: 'SuperPaint with Air Barrier Technology',
    brand: 'Sherwin-Williams',
    category: 'paints',
    description: 'Low-VOC paint with air barrier technology that helps seal walls and reduce air leakage. Good for overall IAQ in homes.',
    ecoFeatures: [
      'Low VOC',
      'APE-free formula',
      'Air barrier technology',
      'GREENGUARD Gold certified'
    ],
    certifications: ['GREENGUARD Gold'],
    priceRange: '$$',
    links: {
      website: 'https://www.sherwin-williams.com/',
      purchase: 'https://www.sherwin-williams.com/home-store/products/superpaint-interior'
    }
  },
  {
    id: 'behr-premium-plus-ultra',
    name: 'Premium Plus Ultra Interior',
    brand: 'Behr',
    category: 'paints',
    description: 'Zero-VOC interior paint with primer and built-in stain blocker. Available in one of the largest color palettes in the industry.',
    ecoFeatures: [
      'Zero VOC',
      'Primer + stain blocker built-in',
      'Low odor',
      'GREENGUARD Gold certified options',
      'Antimicrobial finish'
    ],
    certifications: ['GREENGUARD Gold'],
    priceRange: '$',
    links: {
      website: 'https://www.behr.com/',
      purchase: 'https://www.homedepot.com/p/Behr-Premium-Plus-Ultra-Interior-Paint-and-Primer-in-One'
    }
  },
  {
    id: 'vermont-natural-coatings-floor-finish',
    name: 'PolyWhey Eco-Pro Wood Floor Finish',
    brand: 'Vermont Natural Coatings',
    category: 'paints',
    description: 'Award-winning sustainable wood finish using recycled whey protein technology. Durable enough for floors but safe enough for toys and furniture. Quick-drying, low odor.',
    ecoFeatures: [
      'Uses recycled whey protein (byproduct of cheese making)',
      'Zero VOC',
      'Non-yellowing formula',
      'Quick drying',
      'Made in USA'
    ],
    certifications: ['LEED compliant'],
    priceRange: '$$',
    links: {
      website: 'https://vermontnaturalcoatings.com/',
      purchase: 'https://vermontnaturalcoatings.com/products/polywhey%C2%AE-eco-pro-wood-floor-finish'
    }
  },
  {
    id: 'vermont-natural-coatings-exterior-stain',
    name: 'Exterior Penetrating Wood Stain',
    brand: 'Vermont Natural Coatings',
    category: 'paints',
    description: 'One-step high-performing durable top coat, stain and finish using patented PolyWhey technology. Superior environmental standards.',
    ecoFeatures: [
      'Recycled whey protein base',
      'Zero VOC',
      'One-step application',
      'Water-based',
      'LEED compliant'
    ],
    certifications: ['LEED compliant'],
    priceRange: '$$',
    links: {
      website: 'https://vermontnaturalcoatings.com/',
      purchase: 'https://eco-buildingproducts.com/products/vermont-natural-exterior-wood-finish'
    }
  },
  {
    id: 'afm-safecoat-wood-finish',
    name: 'Transterior Wood Finish',
    brand: 'AFM Safecoat',
    category: 'paints',
    description: 'Durable exterior wood finish that is zero VOC and non-toxic. Designed for decks, siding, and outdoor furniture without harsh chemicals.',
    ecoFeatures: [
      'Zero VOC',
      'Non-toxic formulation',
      'Weather resistant',
      'Water-based',
      'No hazardous fumes'
    ],
    certifications: ['GREENGUARD Gold'],
    priceRange: '$$$',
    links: {
      website: 'https://afmsafecoat.com/',
      purchase: 'https://afmsafecoat.com/product/transterior-wood-finish/'
    }
  },

  // ============================================
  // Category 2: BUILDING MATERIALS
  // ============================================

  {
    id: 'rockwool-roxul-insulation',
    name: 'Comfortbatt Stone Wool Insulation',
    brand: 'ROCKWOOL (formerly Roxul)',
    category: 'buildingMaterials',
    description: 'Stone wool insulation made from natural stone and up to 40% recycled content. Superior thermal and acoustic performance with excellent fire resistance.',
    ecoFeatures: [
      'Up to 40% recycled content',
      'Natural stone-based material',
      'Superior fire resistance',
      'Excellent acoustic properties',
      'Moisture resistant'
    ],
    certifications: ['LEED compliant', 'UL Environment'],
    priceRange: '$$',
    links: {
      website: 'https://www.rockwool.com/north-america/',
      purchase: 'https://insulation4us.com/collections/roxul'
    }
  },
  {
    id: 'fsc-certified-lumber',
    name: 'FSC Certified Structural Lumber',
    brand: 'Advantage Lumber',
    category: 'buildingMaterials',
    description: 'Forest Stewardship Council certified lumber with verified chain of custody. Double LEED points when using reclaimed wood. Available nationwide.',
    ecoFeatures: [
      'FSC certified - responsibly managed forests',
      'Verified chain of custody',
      'Double LEED points for reclaimed',
      '4 USA factory locations',
      'Sustainably harvested'
    ],
    certifications: ['FSC'],
    priceRange: '$$$',
    links: {
      website: 'https://www.advantagelumber.com/fsc/',
      purchase: 'https://www.advantagelumber.com/'
    }
  },
  {
    id: ' reclaimed-wood-flooring',
    name: 'Reclaimed Wood Paneling & Flooring',
    brand: 'Sawkill Lumber',
    category: 'buildingMaterials',
    description: 'Reclaimed and FSC-certified wood from NYC and beyond. Trusted by architects and designers for flooring and paneling projects.',
    ecoFeatures: [
      'Reclaimed from deconstruction',
      'FSC certified available',
      'Verified provenance',
      'Reduced landfill waste',
      'Unique character from original use'
    ],
    certifications: ['FSC'],
    priceRange: '$$$',
    links: {
      website: 'https://www.sawkill.nyc/',
      purchase: 'https://www.sawkill.nyc/'
    }
  },
  {
    id: ' reclaimed-wood-siding',
    name: 'Reclaimed Wood Shakes & Shingles',
    brand: 'AltruWood',
    category: 'buildingMaterials',
    description: 'FSC certified reclaimed lumber, shakes, shingles, decking and flooring. Manufacturer and distributor based in Portland, Oregon.',
    ecoFeatures: [
      'FSC certified',
      '100% reclaimed material',
      'Reduced demand for new timber',
      'LEED credits applicable',
      'Unique aesthetic from reclaimed sources'
    ],
    certifications: ['FSC'],
    priceRange: '$$$',
    links: {
      website: 'http://www.altruwood.com/',
      purchase: 'http://www.altruwood.com/'
    }
  },
  {
    id: 'thermocello-insulation',
    name: 'ThermaCello Insulation Panels',
    brand: 'ThermaCello',
    category: 'buildingMaterials',
    description: 'Plant-based insulation made from natural materials. Excellent thermal performance with lower embodied energy than conventional insulations.',
    ecoFeatures: [
      'Plant-based materials',
      'Low embodied energy',
      'Excellent R-value per inch',
      'Carbon storing material',
      'Biodegradable at end of life'
    ],
    certifications: ['LEED compliant'],
    priceRange: '$$',
    links: {
      website: 'https://thermtest.com/insulation/thermocello/',
      purchase: 'https://thermtest.com/'
    }
  },
  {
    id: 'cotton-insulation',
    name: 'UltraTouch Natural Cotton Insulation',
    brand: 'Bonded Logic',
    category: 'buildingMaterials',
    description: 'Natural cotton insulation with recycled denim content. No itchy installation like fiberglass. Excellent thermal and acoustic properties.',
    ecoFeatures: [
      '80% recycled cotton denim',
      'No formaldehyde or acrylic binders',
      'Excellent acoustic performance',
      'No itchy installation',
      ' Made in USA'
    ],
    certifications: ['GREENGUARD Gold', 'LEED compliant'],
    priceRange: '$$',
    links: {
      website: 'https://www.bondedlogic.com/',
      purchase: 'https://www.bondedlogic.com/ultratouch/'
    }
  },
  {
    id: 'fsc-certified-decking',
    name: 'FSC Certified Decking Boards',
    brand: 'Select Building Products',
    category: 'buildingMaterials',
    description: 'FSC-certified sustainable building materials provider promoting environmentally-sustainable lumber harvesting methods and green building practices.',
    ecoFeatures: [
      'FSC certified wood',
      'Sustainable harvesting methods',
      'Green building compliance',
      'Nationwide availability',
      'Multiple wood species available'
    ],
    certifications: ['FSC'],
    priceRange: '$$$',
    links: {
      website: 'https://selectbuildingproducts.com/fsc/',
      purchase: 'https://selectbuildingproducts.com/'
    }
  },
  {
    id: 'accoya-modified-wood',
    name: 'Accoya Modified Wood',
    brand: 'Accoya',
    category: 'buildingMaterials',
    description: 'Revolutionary sustainable wood product using acetylation technology. Provides exceptional durability and stability without toxic preservatives.',
    ecoFeatures: [
      'Sustainably sourced raw material',
      'Non-toxic acetylation process',
      '50 year warranty above ground',
      '20 year warranty in ground',
      'Naturally anti fungal'
    ],
    certifications: ['FSC', 'LEED compliant', 'Cradle to Cradle'],
    priceRange: '$$$',
    links: {
      website: 'https://www.accoya.com/',
      purchase: 'https://www.accoya.com/buy/'
    }
  },
  {
    id: 'reclaimed-barn-wood',
    name: 'Reclaimed Barn Wood',
    brand: 'Anthology Woods',
    category: 'buildingMaterials',
    description: 'American-milled FSC certified and reclaimed wood. Sourced and milled entirely within the United States. Authentic reclaimed character.',
    ecoFeatures: [
      '100% American milled',
      'FSC certified options',
      'Reclaimed from historic structures',
      'Verified chain of custody',
      'Unique grain and patina'
    ],
    certifications: ['FSC'],
    priceRange: '$$',
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
    description: 'Countertop material made from 100% recycled paper combined with non-petroleum based resin. Extremely durable and sustainable alternative to stone.',
    ecoFeatures: [
      '100% recycled paper content',
      'Non-petroleum based resin binder',
      'GREENGUARD Gold certified',
      'Made in USA',
      'Carbon neutral manufacturing'
    ],
    certifications: ['GREENGUARD Gold', 'LEED compliant'],
    priceRange: '$$',
    links: {
      website: 'https://www.paperstone.com/',
      purchase: 'https://www.paperstone.com/where-to-buy/'
    }
  },

  // ============================================
  // Category 3: INTERIORS
  // ============================================

  {
    id: 'marmoleum-sheet-flooring',
    name: 'Marmoleum Sheet Flooring',
    brand: 'Forbo',
    category: 'interiors',
    description: 'Natural linoleum flooring made from linseed oil, wood flour, and limestone on a jute backing. Naturally antibacterial and incredibly durable.',
    ecoFeatures: [
      '95% natural raw materials',
      'Contains linseed oil (renewable)',
      'Naturally antibacterial',
      'No VOC emissions',
      'Fully recyclable'
    ],
    certifications: ['FloorScore', 'GREENGUARD Gold', 'LEED compliant'],
    priceRange: '$$',
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
    description: 'Cork flooring harvested without harming trees. Naturally antimicrobial with excellent insulation properties for both temperature and sound.',
    ecoFeatures: [
      'Harvested without tree removal',
      'Naturally regenerative bark',
      'Naturally antimicrobial',
      'Excellent thermal insulation',
      'Outstanding sound absorption'
    ],
    certifications: ['FSC', 'FloorScore'],
    priceRange: '$$',
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
    description: 'Strand woven bamboo flooring with FSC certification. Twice as hard as red oak with a sustainable production process.',
    ecoFeatures: [
      'FSC certified bamboo',
      'Rapidly renewable resource',
      'Twice as hard as red oak',
      'Zero VOC emissions',
      'No added formaldehyde'
    ],
    certifications: ['FSC', 'FloorScore', 'GREENGUARD Gold'],
    priceRange: '$$',
    links: {
      website: 'https://www.ecotimber.com/',
      purchase: 'https://www.ecotimber.com/bamboo-flooring/'
    }
  },
  {
    id: 'icestone-countertops',
    name: 'Recycled Glass Countertops',
    brand: 'IceStone',
    category: 'interiors',
    description: 'Made in the USA from recycled glass in a cement binder. Beautiful, durable, and sustainable surfaces for kitchens and bathrooms.',
    ecoFeatures: [
      '100% recycled glass content',
      'Cement binder (no petroleum)',
      'Made in USA',
      'GREENGUARD Gold certified',
      'Seismic and LEED certified'
    ],
    certifications: ['GREENGUARD Gold', 'LEED certified', 'NSF'],
    priceRange: '$$$',
    links: {
      website: 'https://icestoneusa.com/',
      purchase: 'https://icestoneusa.com/where-to-buy/'
    }
  },
  {
    id: 'cambria-quartz',
    name: 'Sustainability Collection Quartz',
    brand: 'Cambria',
    category: 'interiors',
    description: 'American-made quartz countertops with industry-leading sustainability commitments. Many designs contain recycled materials.',
    ecoFeatures: [
      'Made in USA',
      'Many styles with recycled content',
      'NSF certified for food contact',
      'Member of USGBC',
      'Carbon neutral operations'
    ],
    certifications: ['NSF', 'LEED compliant', 'GREENGUARD Gold'],
    priceRange: '$$$',
    links: {
      website: 'https://www.cambriausa.com/',
      purchase: 'https://www.cambriausa.com/where-to-buy/'
    }
  },
  {
    id: 'caesarstone-recycled-quartz',
    name: 'Recycled Material Quartz',
    brand: 'Caesarstone',
    category: 'interiors',
    description: 'Quartz surfaces containing recycled glass and materials. Six colors available with recycled content ranging up to 50%.',
    ecoFeatures: [
      'Up to 50% recycled materials',
      'Recycled glass content',
      'ISO 14001 certified manufacturing',
      'Long lifespan reduces replacement',
      'No VOC emissions'
    ],
    certifications: ['GREENGUARD Gold', 'NSF', 'LEED compliant'],
    priceRange: '$$$',
    links: {
      website: 'https://www.caesarstoneus.com/',
      purchase: 'https://www.caesarstoneus.com/recycled-material-quartz-countertops/'
    }
  },
  {
    id: 'curava-recycled-glass',
    name: 'Recycled Glass Countertops',
    brand: 'Curava',
    category: 'interiors',
    description: 'Sustainable recycled glass countertops that elevate kitchens, bathrooms and bars with stunning eco-friendly style.',
    ecoFeatures: [
      'Recycled glass content',
      'Durable engineered surface',
      'Non-porous (hygienic)',
      'Heat and scratch resistant',
      'Made in USA'
    ],
    certifications: ['LEED compliant'],
    priceRange: '$$',
    links: {
      website: 'https://curava.com/',
      purchase: 'https://curava.com/where-to-buy/'
    }
  },
  {
    id: 'hempwood-flooring',
    name: 'Hempwood Solid Flooring',
    brand: 'Hempwood',
    category: 'interiors',
    description: 'Revolutionary flooring made from compressed hemp with soy-based binder. Hemp is a rapidly renewable crop that grows in 120 days.',
    ecoFeatures: [
      'Made from rapidly renewable hemp',
      'Grows in 120 days (vs 60+ years for oak)',
      'Soy-based binder',
      'Carbon storing material',
      'Made in USA (Tennessee)'
    ],
    certifications: ['FSC', 'GREENGUARD Gold'],
    priceRange: '$$',
    links: {
      website: 'https://www.hempwood.com/',
      purchase: 'https://www.hempwood.com/shop/'
    }
  },
  {
    id: 'dalsouple-recycled-rubber',
    name: 'd eco Rubber Flooring',
    brand: 'Dalsouple',
    category: 'interiors',
    description: 'Natural rubber flooring made from recycled rubber tires. Exceptional durability for high-traffic areas with natural antimicrobial properties.',
    ecoFeatures: [
      'Recycled rubber tire content',
      'Natural rubber (not synthetic)',
      'Antimicrobial properties',
      'Exceptional durability',
      'Fully recyclable'
    ],
    certifications: ['GREENGUARD Gold', 'FloorScore', 'LEED compliant'],
    priceRange: '$$$',
    links: {
      website: 'https://www.dalsouple.com/',
      purchase: 'https://www.dalsouple.com/where-to-buy/'
    }
  },
  {
    id: 'usg-lighting-led',
    name: 'Energy Wise LED Lighting',
    brand: 'USG Lighting',
    category: 'interiors',
    description: 'ENERGY STAR certified LED lighting fixtures with high efficiency and long lifespan. Reduces energy consumption by up to 75%.',
    ecoFeatures: [
      'ENERGY STAR certified',
      '75% less energy than incandescent',
      'Long lifespan (25,000+ hours)',
      'Dimmable options',
      'Cool operating temperature'
    ],
    certifications: ['ENERGY STAR'],
    priceRange: '$',
    links: {
      website: 'https://www.usglighting.com/',
      purchase: 'https://www.usglighting.com/led-lighting/'
    }
  },
  {
    id: 'green-buildings-supply-light fixtures',
    name: 'Eco-Friendly Lighting Fixtures',
    brand: 'Green Building Supply',
    category: 'interiors',
    description: 'Curated collection of sustainable lighting including LED fixtures, non-toxic materials, and energy efficient options for residential use.',
    ecoFeatures: [
      'ENERGY STAR certified options',
      'LED technology',
      'Non-toxic material focus',
      'Energy efficient designs',
      'Indoor air quality safe'
    ],
    certifications: ['ENERGY STAR', 'GREENGUARD Gold'],
    priceRange: '$$',
    links: {
      website: 'https://www.greenbuildingsupply.com/',
      purchase: 'https://www.greenbuildingsupply.com/All-Products/Lighting'
    }
  },
  {
    id: 'silestone-eco-line',
    name: 'Eco Line Recycled Quartz',
    brand: 'Silestone',
    category: 'interiors',
    description: 'Eco Line Color Series contains 50% recycled material including recycled glass. Beautiful quartz surfaces with sustainability credentials.',
    ecoFeatures: [
      '50% recycled material content',
      'Recycled glass component',
      'HybriQ technology production',
      'Nitrogen-purged manufacturing',
      '15 year warranty'
    ],
    certifications: ['GREENGUARD Gold', 'NSF', 'LEED compliant'],
    priceRange: '$$$',
    links: {
      website: 'https://www.silestone.com/',
      purchase: 'https://www.silestone.com/where-to-buy/'
    }
  }
];
