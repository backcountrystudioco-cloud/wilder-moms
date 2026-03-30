export const buildCategories = [
  'All',
  'Mud Kitchens',
  'Garden Beds',
  'Nature Tables',
  'Bird Houses',
  'Outdoor Seating',
  'Water Play'
]

export const builds = [
  // MUD KITCHENS
  {
    id: 'mud-kitchen-basic',
    title: 'Basic Mud Kitchen',
    category: 'Mud Kitchens',
    difficulty: 'easy',
    timeEstimate: '2-3 hours',
    ageRange: '2-5',
    cost: '$20-40',
    description: 'A backyard mud kitchen is the single best investment in hours of independent, sensory-rich play. This basic version uses a wooden pallet and simple materials.',
    tools: ['Hammer', 'Saw', 'Drill', 'Screwdriver', 'Sandpaper', 'Measuring tape'],
    materials: [
      { name: 'Wooden pallet', quantity: '1', link: 'https://www.facebook.com/marketplace' },
      { name: 'Exterior screws', quantity: '1 box', link: 'https://www.homedepot.com' },
      { name: 'Metal basin or tub', quantity: '1', link: 'https://www.dollarstore.com' },
      { name: '2x4 lumber', quantity: '4 pieces', link: 'https://www.homedepot.com' },
      { name: 'Outdoor paint', quantity: '1 quart', link: 'https://www.michaels.com' }
    ],
    steps: [
      { title: 'Prepare the pallet', description: 'Sand any rough edges on the pallet to prevent splinters. Check for loose nails and secure or remove them.' },
      { title: 'Cut the lumber', description: 'Cut 2x4s to create leg supports - two 24" pieces and two 20" pieces for an A-frame design.' },
      { title: 'Assemble the frame', description: 'Attach the leg supports to the pallet using exterior screws. Ensure the structure is stable and level.' },
      { title: 'Add the basin', description: 'Secure the metal tub or basin to the pallet top using screws through the bottom. Make sure it cannot be pulled off.' },
      { title: 'Paint and finish', description: 'Apply outdoor paint in fun colors. Let dry completely before letting kids use it.' },
      { title: 'Stock the kitchen', description: 'Add old pots, pans, wooden spoons, mason jars, and kitchen tools. Real utensils beat plastic every time.' }
    ],
    tips: [
      'Use child-safe tools for assembly',
      'Seal wood to last longer outdoors',
      'Add a hose adapter for water play',
      'Let kids help paint it their favorite color'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1476673160081-cf065607f449?w=800',
    relatedBuilds: ['mud-kitchen-deluxe', 'mud-kitchen-portable']
  },
  {
    id: 'mud-kitchen-deluxe',
    title: 'Deluxe Mud Kitchen',
    category: 'Mud Kitchens',
    difficulty: 'medium',
    timeEstimate: '4-6 hours',
    ageRange: '2-8',
    cost: '$60-100',
    description: 'A larger, multi-station mud kitchen with running water, multiple basins, and plenty of counter space for young chefs.',
    tools: ['Hammer', 'Saw', 'Drill', 'Screwdriver', 'Sandpaper', 'PVC cutter', 'Adjustable wrench'],
    materials: [
      { name: 'Pressure-treated lumber', quantity: '8 pieces', link: 'https://www.homedepot.com' },
      { name: 'Stainless steel sinks', quantity: '2', link: 'https://www.habitat.org/restore' },
      { name: 'Garden hose fittings', quantity: '1 kit', link: 'https://www.homedepot.com' },
      { name: 'PVC pipe', quantity: '10 ft', link: 'https://www.homedepot.com' },
      { name: 'Exterior screws', quantity: '2 boxes', link: 'https://www.homedepot.com' },
      { name: 'Waterproof wood sealer', quantity: '1 can', link: 'https://www.homedepot.com' }
    ],
    steps: [
      { title: 'Design your layout', description: 'Sketch out a two-station layout with sinks on each end and counter space in between.' },
      { title: 'Build the base frame', description: 'Construct a sturdy 4x4 frame using pressure-treated lumber. Make it 30" tall for standing play.' },
      { title: 'Install the counters', description: 'Attach horizontal support beams, then place your counter surface on top.' },
      { title: 'Mount the sinks', description: 'Cut holes in the counter for each sink basin. Secure with silicone sealant and screws.' },
      { title: 'Plumb for water', description: 'Connect garden hose fittings to create a water flow system. Use PVC pipe for drainage.' },
      { title: 'Add finishing touches', description: 'Sand all surfaces, apply wood sealer, and add hooks for hanging utensils.' }
    ],
    tips: [
      'Install a shut-off valve for easy water control',
      'Use food-grade sealant around sinks',
      'Add a chalkboard panel for menu writing',
      'Consider adding a lower station for toddlers'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=800',
    relatedBuilds: ['mud-kitchen-basic', 'mud-kitchen-portable']
  },
  {
    id: 'mud-kitchen-portable',
    title: 'Portable Mud Kitchen',
    category: 'Mud Kitchens',
    difficulty: 'easy',
    timeEstimate: '1-2 hours',
    ageRange: '2-6',
    cost: '$15-25',
    description: 'A lightweight, movable mud kitchen that can go anywhere - perfect for apartments, small spaces, or taking to grandma\'s house.',
    tools: ['Drill', 'Screwdriver', 'Sandpaper', 'Jigsaw'],
    materials: [
      { name: 'Large plastic storage bin', quantity: '1', link: 'https://www.target.com' },
      { name: 'Wooden board', quantity: '1', link: 'https://www.homedepot.com' },
      { name: 'PVC pipe legs', quantity: '4', link: 'https://www.homedepot.com' },
      { name: 'Bungee cords', quantity: '4', link: 'https://www.amazon.com' },
      { name: 'Small plastic bins', quantity: '3-4', link: 'https://www.dollarstore.com' }
    ],
    steps: [
      { title: 'Prepare the tub', description: 'Clean out a large plastic storage bin. Drill drainage holes in the bottom.' },
      { title: 'Create the counter', description: 'Cut a wooden board to fit across the top of the bin as a prep surface.' },
      { title: 'Attach legs', description: 'Cut PVC pipes to desired height and attach them to the corners of the bin.' },
      { title: 'Add storage bins', description: 'Place smaller bins inside for sorting and organizing materials.' },
      { title: 'Secure everything', description: 'Use bungee cords to attach the counter to the tub so it cannot be pulled off.' }
    ],
    tips: [
      'Use food-safe plastic bins for playing',
      'Add wheels to make it even more portable',
      'Keep extra materials in the tub for easy transport',
      'Perfect for beach trips too!'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1518882605630-8eb700e01287?w=800',
    relatedBuilds: ['mud-kitchen-basic', 'mud-kitchen-deluxe']
  },

  // GARDEN BEDS
  {
    id: 'raised-garden-basic',
    title: 'Basic Raised Garden Bed',
    category: 'Garden Beds',
    difficulty: 'easy',
    timeEstimate: '2-3 hours',
    ageRange: '3-12',
    cost: '$15-35',
    description: 'A simple raised bed that gives kids ownership of growing their own food. Perfect for cherry tomatoes, strawberries, and more.',
    tools: ['Drill', 'Screwdriver', 'Level', 'Tape measure', 'Saw'],
    materials: [
      { name: 'Untreated 2x10 boards', quantity: '4', link: 'https://www.homedepot.com' },
      { name: '4x4 corner posts', quantity: '4', link: 'https://www.homedepot.com' },
      { name: 'Exterior screws', quantity: '1 box', link: 'https://www.homedepot.com' },
      { name: 'Landscape fabric', quantity: '1 roll', link: 'https://www.homedepot.com' },
      { name: 'Compost', quantity: '8 bags', link: 'https://www.localnursery.com' }
    ],
    steps: [
      { title: 'Pick your spot & size', description: 'Choose a spot with 6+ hours of sun. Keep beds 3-4 feet wide so kids can reach the center from either side.' },
      { title: 'Cut the lumber', description: 'Cut boards to desired length - 4x4 feet is a great starter size.' },
      { title: 'Build the frame', description: 'Attach boards to 4x4 corner posts. Use two screws per board end for strength.' },
      { title: 'Level and place', description: 'Ensure the frame sits level on the ground. Adjust as needed.' },
      { title: 'Add fabric and fill', description: 'Line the bottom with landscape fabric to prevent weeds. Fill with compost.' },
      { title: 'Plant together', description: 'Let kids choose what to plant - cherry tomatoes, sugar snap peas, and radishes grow fast!' }
    ],
    tips: [
      'Use untreated wood for growing food',
      'Add a bean teepee for vertical growing',
      'Make a little sign with their name on it',
      'Check moisture levels daily'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800',
    relatedBuilds: ['raised-garden-herb', 'raised-garden-elevated']
  },
  {
    id: 'raised-garden-herb',
    title: 'Herb Spiral Garden',
    category: 'Garden Beds',
    difficulty: 'medium',
    timeEstimate: '3-4 hours',
    ageRange: '4-12',
    cost: '$30-50',
    description: 'A beautiful spiral herb garden that creates multiple microclimates - perfect for teaching kids about different plant needs.',
    tools: ['Shovel', 'Level', 'Garden rake', 'Wheelbarrow'],
    materials: [
      { name: 'Stones or bricks', quantity: '50-75', link: 'https://www.homedepot.com' },
      { name: 'Gravel', quantity: '2 bags', link: 'https://www.homedepot.com' },
      { name: 'Topsoil', quantity: '6 bags', link: 'https://www.localnursery.com' },
      { name: 'Compost', quantity: '4 bags', link: 'https://www.localnursery.com' },
      { name: 'Herb plants', quantity: '8-10', link: 'https://www.localnursery.com' }
    ],
    steps: [
      { title: 'Plan your spiral', description: 'Mark out a 6-foot diameter circle. The spiral will rise about 3 feet at its highest point.' },
      { title: 'Create the base', description: 'Lay a foundation of gravel for drainage. Start placing stones in an inward-spiraling pattern.' },
      { title: 'Build up the walls', description: 'Stack stones as you spiral inward, building higher as you go. Each level should be slightly higher than the previous.' },
      { title: 'Fill with soil', description: 'Once walls are stable, fill the interior with a mix of topsoil and compost.' },
      { title: 'Plant strategically', description: 'Place herbs that need more water at the bottom, drought-tolerant herbs at the top.' }
    ],
    tips: [
      'Oregano, thyme, and rosemary do well at the top',
      'Mint, basil, and parsley prefer the bottom',
      'Talk about how microclimates work',
      'Let kids harvest for cooking'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800',
    relatedBuilds: ['raised-garden-basic', 'raised-garden-elevated']
  },
  {
    id: 'raised-garden-elevated',
    title: 'Elevated Garden Bed',
    category: 'Garden Beds',
    difficulty: 'medium',
    timeEstimate: '3-5 hours',
    ageRange: '3-10',
    cost: '$50-80',
    description: 'A waist-height garden bed perfect for kids who can\'t bend down or for wheelchair accessibility. Same great growing, easier access.',
    tools: ['Drill', 'Screwdriver', 'Saw', 'Level', 'Tape measure'],
    materials: [
      { name: 'Treated 2x6 boards', quantity: '8', link: 'https://www.homedepot.com' },
      { name: '4x4 posts', quantity: '4', link: 'https://www.homedepot.com' },
      { name: 'Exterior screws', quantity: '1 box', link: 'https://www.homedepot.com' },
      { name: 'Landscape fabric', quantity: '1 roll', link: 'https://www.homedepot.com' },
      { name: 'Elevated bed soil mix', quantity: '12 bags', link: 'https://www.localnursery.com' }
    ],
    steps: [
      { title: 'Cut all pieces', description: 'Cut 4x4 posts to 30" height. Cut boards to desired length (4x4 feet works well).' },
      { title: 'Assemble legs', description: 'Attach two posts at each corner using the boards as horizontal supports at top and bottom.' },
      { title: 'Build the bed walls', description: 'Screw boards around the perimeter, stacking 4-5 high for an 8-10 inch depth.' },
      { title: 'Add drainage', description: 'Drill several large holes in the bottom boards for water to escape.' },
      { title: 'Line and fill', description: 'Add landscape fabric to keep soil in. Fill with premium potting mix.' }
    ],
    tips: [
      'Perfect for kids with limited mobility',
      'Less bending means more gardening fun',
      'Great for lettuce, herbs, and strawberries',
      'Add casters for rolling!'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1592419044706-39796d40f98c?w=800',
    relatedBuilds: ['raised-garden-basic', 'raised-garden-herb']
  },

  // NATURE TABLES
  {
    id: 'nature-table-indoor',
    title: 'Indoor Nature Table',
    category: 'Nature Tables',
    difficulty: 'easy',
    timeEstimate: '1-2 hours',
    ageRange: '2-8',
    cost: '$20-40',
    description: 'A dedicated space for displaying and exploring nature treasures. Changes with the seasons and brings the outdoors in.',
    tools: ['Drill', 'Level', 'Screwdriver'],
    materials: [
      { name: 'Wooden display tray', quantity: '1', link: 'https://www.ikea.com' },
      { name: 'Small jars or dishes', quantity: '6-8', link: 'https://www.dollarstore.com' },
      { name: 'Magnifying glass', quantity: '1-2', link: 'https://www.educationaltoys.com' },
      { name: 'Nature field guide', quantity: '1', link: 'https://www.bookshop.org' },
      { name: 'Cork board backing', quantity: '1 sheet', link: 'https://www.homedepot.com' }
    ],
    steps: [
      { title: 'Choose the location', description: 'Find a low table or shelf at child height with good natural light.' },
      { title: 'Set up the display area', description: 'Place a large tray or shallow box to contain discoveries and make cleanup easy.' },
      { title: 'Add sorting dishes', description: 'Arrange small jars and dishes for sorting treasures by type - rocks, leaves, feathers, etc.' },
      { title: 'Include tools', description: 'Add magnifying glasses, tweezers, and a small brush for examining finds.' },
      { title: 'Make it seasonal', description: 'Change displays with the seasons - pinecones in winter, flowers in spring, shells in summer.' }
    ],
    tips: [
      'Rotate items weekly to keep interest',
      'Let kids lead the curation',
      'Add identification cards for common finds',
      'Include a sketchbook for nature journaling'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1518882605630-8eb700e01287?w=800',
    relatedBuilds: ['nature-table-outdoor', 'nature-table-mobile']
  },
  {
    id: 'nature-table-outdoor',
    title: 'Outdoor Discovery Table',
    category: 'Nature Tables',
    difficulty: 'medium',
    timeEstimate: '2-4 hours',
    ageRange: '2-10',
    cost: '$30-60',
    description: 'A weather-resistant exploration station for outdoor discoveries. Perfect for mud, water, leaves, and all things nature.',
    tools: ['Drill', 'Saw', 'Screwdriver', 'Sandpaper'],
    materials: [
      { name: 'Pressure-treated lumber', quantity: '6 pieces', link: 'https://www.homedepot.com' },
      { name: 'Galvanized metal tray', quantity: '1', link: 'https://www.farmandfleet.com' },
      { name: 'Exterior screws', quantity: '1 box', link: 'https://www.homedepot.com' },
      { name: 'Waterproof wood sealer', quantity: '1 can', link: 'https://www.homedepot.com' },
      { name: 'Rubber feet', quantity: '4', link: 'https://www.homedepot.com' }
    ],
    steps: [
      { title: 'Build the frame', description: 'Create a sturdy table frame using 2x4s - about 3 feet tall and 2 feet wide.' },
      { title: 'Add the top surface', description: 'Attach a solid top made of boards with small gaps for drainage.' },
      { title: 'Install the tray', description: 'Place the galvanized tray on top. It should sit flush or slightly below the table surface.' },
      { title: 'Seal everything', description: 'Apply multiple coats of waterproof sealer to all wood surfaces.' },
      { title: 'Add features', description: 'Attach hooks for tools, a small shelf for supplies, and rubber feet to prevent slipping.' }
    ],
    tips: [
      'Perfect for water play in summer',
      'Add sandbox sand or pea gravel to the tray',
      'Include sieves and scoops for sorting',
      'Shelf underneath can hold soil and supplies'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1476673160081-cf065607f449?w=800',
    relatedBuilds: ['nature-table-indoor', 'nature-table-mobile']
  },
  {
    id: 'nature-table-mobile',
    title: 'Mobile Nature Cart',
    category: 'Nature Tables',
    difficulty: 'easy',
    timeEstimate: '1-2 hours',
    ageRange: '2-8',
    cost: '$25-45',
    description: 'A rolling cart that goes wherever nature calls - from the backyard to the park to grandma\'s house.',
    tools: ['Drill', 'Screwdriver', 'Wrench'],
    materials: [
      { name: 'Rolling cart base', quantity: '1', link: 'https://www.ikea.com' },
      { name: 'Small plastic containers', quantity: '6-8', link: 'https://www.dollarstore.com' },
      { name: 'Caster wheels', quantity: '4', link: 'https://www.homedepot.com' },
      { name: 'Bungee cords', quantity: '2', link: 'https://www.amazon.com' },
      { name: 'Collapsible water container', quantity: '1', link: 'https://www.amazon.com' }
    ],
    steps: [
      { title: 'Prepare the cart', description: 'Use a basic utility cart or repurpose an old cart. Ensure it rolls smoothly.' },
      { title: 'Add container storage', description: 'Attach or place small containers for sorting and collecting.' },
      { title: 'Install tool holders', description: 'Add bungee cords or hooks to hold magnifying glasses, tweezers, and brushes.' },
      { title: 'Pack the essentials', description: 'Include collection bags, water container, field guides, and sketching supplies.' },
      { title: 'Make it portable', description: 'Ensure everything can be secured for transport. The cart should be easy to push.' }
    ],
    tips: [
      'Great for nature walks and hikes',
      'Collapsible water container saves space',
      'Include a small first aid kit',
      'Add a clipboard with blank paper for sketching'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1518882605630-8eb700e01287?w=800',
    relatedBuilds: ['nature-table-indoor', 'nature-table-outdoor']
  },

  // BIRD HOUSES
  {
    id: 'birdhouse-basic',
    title: 'Classic Birdhouse',
    category: 'Bird Houses',
    difficulty: 'easy',
    timeEstimate: '1-2 hours',
    ageRange: '3-12',
    cost: '$10-20',
    description: 'A simple wooden birdhouse that welcomes wrens, chickadees, and sparrows. A wonderful first building project.',
    tools: ['Hammer', 'Saw', 'Drill', 'Screwdriver', 'Sandpaper'],
    materials: [
      { name: 'Cedar or pine boards', quantity: '4', link: 'https://www.homedepot.com' },
      { name: 'Wooden dowel', quantity: '1', link: 'https://www.homedepot.com' },
      { name: 'Exterior screws', quantity: '1 box', link: 'https://www.homedepot.com' },
      { name: 'Non-toxic paint', quantity: '1 can', link: 'https://www.michaels.com' },
      { name: 'Jute twine', quantity: '1 spool', link: 'https://www.homedepot.com' }
    ],
    steps: [
      { title: 'Cut the pieces', description: 'Cut boards for: two side pieces (8"), front and back (9"), roof (7"), and floor (5").' },
      { title: 'Drill the entrance', description: 'On the front piece, drill a 1" hole centered about 6" from the bottom.' },
      { title: 'Sand all surfaces', description: 'Sand every piece smooth, especially around the entrance hole.' },
      { title: 'Assemble the walls', description: 'Attach sides to front and back using screws. Keep seams tight.' },
      { title: 'Add the floor and roof', description: 'Screw the floor in place. Attach roof at a slight angle for water runoff.' },
      { title: 'Add the perch and hang', description: 'Drill a small hole below the entrance for a twig perch. Add twine for hanging.' }
    ],
    tips: [
      'Leave a gap at the bottom for cleaning',
      'Use non-toxic paint in natural colors',
      'Hang at 5-6 feet high',
      'Face entrance away from prevailing wind'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=800',
    relatedBuilds: ['birdhouse-purple-martin', 'birdhouse-feeders']
  },
  {
    id: 'birdhouse-purple-martin',
    title: 'Purple Martin House',
    category: 'Bird Houses',
    difficulty: 'hard',
    timeEstimate: '6-8 hours',
    ageRange: '8-12',
    cost: '$50-80',
    description: 'A multi-unit apartment complex for purple martins. These colonial nesters will thank you with years of bug-free summers.',
    tools: ['Drill', 'Saw', 'Screwdriver', 'Level', 'Measuring tape', 'Ladder'],
    materials: [
      { name: '4x4 pressure-treated post', quantity: '1', link: 'https://www.homedepot.com' },
      { name: 'Exterior plywood', quantity: '2 sheets', link: 'https://www.homedepot.com' },
      { name: 'Wooden gutters or troughs', quantity: '4', link: 'https://www.homedepot.com' },
      { name: 'Galvanized hardware', quantity: '1 box', link: 'https://www.homedepot.com' },
      { name: 'Aluminum reflective tape', quantity: '1 roll', link: 'https://www.amazon.com' }
    ],
    steps: [
      { title: 'Set the post', description: 'Dig a 2-foot hole and set a 10-foot 4x4 post in concrete. Allow to cure fully.' },
      { title: 'Build the platform', description: 'Create a cross-shaped platform at the top of the post to support the gourds.' },
      { title: 'Prepare the gourds', description: 'Clean and dry gourds. Cut a 3" entrance hole 2" from the top.' },
      { title: 'Install entrance holes', description: 'Cut openings with predator guards - a slot with a perch below.' },
      { title: 'Mount and hang', description: 'Hang gourds from the platform using wire or rope. Space them 12" apart.' },
      { title: 'Add predator guards', description: 'Wrap the pole with a metal guard or reflective tape to prevent snake access.' }
    ],
    tips: [
      'Purple martins eat thousands of mosquitoes daily',
      'Set up before breeding season (early spring)',
      'They return to the same location yearly',
      'Keep entrance holes 2.5-3 inches for purple martins'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=800',
    relatedBuilds: ['birdhouse-basic', 'birdhouse-feeders']
  },
  {
    id: 'birdhouse-feeders',
    title: 'Bird Feeding Station',
    category: 'Bird Houses',
    difficulty: 'medium',
    timeEstimate: '2-3 hours',
    ageRange: '3-12',
    cost: '$25-40',
    description: 'A combination birdhouse and feeder that attracts a variety of birds. Includes seed cups and a suet cage.',
    tools: ['Drill', 'Saw', 'Screwdriver', 'Sandpaper'],
    materials: [
      { name: 'Cedar boards', quantity: '4', link: 'https://www.homedepot.com' },
      { name: 'Metal seed cups', quantity: '2', link: 'https://www.amazon.com' },
      { name: 'Suet cage', quantity: '1', link: 'https://www.amazon.com' },
      { name: 'Eyebolts and washers', quantity: '4', link: 'https://www.homedepot.com' },
      { name: 'Jute rope', quantity: '10 ft', link: 'https://www.homedepot.com' }
    ],
    steps: [
      { title: 'Build the basic house', description: 'Construct a simple birdhouse with slightly larger dimensions for multiple bird species.' },
      { title: 'Install seed cups', description: 'Mount two metal seed cups on opposite sides, below the roof overhang.' },
      { title: 'Add the suet cage', description: 'Attach a suet cage to the front or bottom of the house using screws.' },
      { title: 'Create hanging options', description: 'Add eyebolts at the top and sides for hanging and mounting on posts.' },
      { title: 'Sand and finish', description: 'Sand all surfaces smooth. Apply non-toxic wood stain or natural paint.' }
    ],
    tips: [
      'Clean seed cups weekly',
      'Offer different seeds to attract different species',
      'Place near trees for cover',
      'Sunflower seeds are a universal favorite'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=800',
    relatedBuilds: ['birdhouse-basic', 'birdhouse-purple-martin']
  },

  // OUTDOOR SEATING
  {
    id: 'seating-log-stumps',
    title: 'Natural Log Stumps',
    category: 'Outdoor Seating',
    difficulty: 'easy',
    timeEstimate: '1-2 hours',
    ageRange: '2-12',
    cost: '$0-15',
    description: 'Simple log stumps make charming, natural seating that blends into any garden or forest setting.',
    tools: ['Saw', 'Chainsaw (optional)', 'Sandpaper', 'Drill'],
    materials: [
      { name: 'Log sections', quantity: '3-5', link: 'https://www.localtreecare.com' },
      { name: 'Exterior wood sealer', quantity: '1 can', link: 'https://www.homedepot.com' },
      { name: 'Rubber feet', quantity: 'optional', link: 'https://www.homedepot.com' }
    ],
    steps: [
      { title: 'Source your logs', description: 'Ask a local tree service for free log sections, or find fallen wood on your property.' },
      { title: 'Choose sizes', description: 'Select a variety of heights - 8-12 inches for kids, 16-20 inches for adults.' },
      { title: 'Cut to height', description: 'Cut logs to desired length. Make cuts as level as possible.' },
      { title: 'Sand the tops', description: 'Sand the top surface smooth to prevent splinters, especially important for kids.' },
      { title: 'Seal and cure', description: 'Apply exterior wood sealer to all surfaces. Allow to cure for a week before use.' },
      { title: 'Add rubber feet', description: 'Attach rubber feet to the bottom to prevent sinking into soil.' }
    ],
    tips: [
      'Cedar and redwood naturally resist decay',
      'Different diameters create visual interest',
      'Leave the bark on for a rustic look',
      'Recut periodically as the wood seasons'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1527515637462-cff94edd56f1?w=800',
    relatedBuilds: ['seating-pallet-bench', 'seating-tire-coach']
  },
  {
    id: 'seating-pallet-bench',
    title: 'Pallet Bench',
    category: 'Outdoor Seating',
    difficulty: 'easy',
    timeEstimate: '2-3 hours',
    ageRange: '3-12',
    cost: '$10-20',
    description: 'A sturdy bench built from reclaimed pallets. Perfect for the edge of a garden or as extra seating anywhere.',
    tools: ['Hammer', 'Drill', 'Screwdriver', 'Saw', 'Pry bar', 'Sandpaper'],
    materials: [
      { name: 'Wooden pallets', quantity: '3', link: 'https://www.facebook.com/marketplace' },
      { name: 'Exterior screws', quantity: '1 box', link: 'https://www.homedepot.com' },
      { name: '2x4 lumber', quantity: '4 pieces', link: 'https://www.homedepot.com' },
      { name: 'Outdoor stain', quantity: '1 can', link: 'https://www.homedepot.com' },
      { name: 'Corner brackets', quantity: '8', link: 'https://www.homedepot.com' }
    ],
    steps: [
      { title: 'Inspect pallets', description: 'Check for safe pallets - HT stamp only (heat treated). Remove any loose nails.' },
      { title: 'Disassemble and prep', description: 'Carefully pry apart some pallets to get clean boards for the seat slats.' },
      { title: 'Build the frame', description: 'Use 2x4s to create two A-frame leg assemblies.' },
      { title: 'Attach the seat', description: 'Screw pallet boards across the top of the frame, leaving small gaps for drainage.' },
      { title: 'Reinforce with brackets', description: 'Attach corner brackets at all joints for extra stability.' },
      { title: 'Sand and stain', description: 'Sand all surfaces, especially edges. Apply outdoor stain in a natural color.' }
    ],
    tips: [
      'Always use heat-treated (HT) pallets only',
      'Look for pallet ratings of 2500+ lbs',
      'Stain both sides to prevent warping',
      'Great project to do with kids'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1527515637462-cff94edd56f1?w=800',
    relatedBuilds: ['seating-log-stumps', 'seating-tire-coach']
  },
  {
    id: 'seating-tire-coach',
    title: 'Tire Ottoman',
    category: 'Outdoor Seating',
    difficulty: 'easy',
    timeEstimate: '1-2 hours',
    ageRange: '2-8',
    cost: '$5-10',
    description: 'A clever ottoman made from an old tire - stackable, durable, and surprisingly stylish with a little rope and paint.',
    tools: ['Drill', 'Scissors', 'Paintbrush', 'Hot glue gun'],
    materials: [
      { name: 'Clean tires', quantity: '1-2', link: 'https://www.tirerack.com' },
      { name: 'Natural rope', quantity: '20-30 ft', link: 'https://www.homedepot.com' },
      { name: 'Outdoor acrylic paint', quantity: '1 can', link: 'https://www.michaels.com' },
      { name: 'E6000 glue', quantity: '1 tube', link: 'https://www.amazon.com' },
      { name: 'Foam padding', quantity: '1 piece', link: 'https://www.ikea.com' }
    ],
    steps: [
      { title: 'Clean the tire', description: 'Scrub the tire thoroughly with soap and water. Let dry completely.' },
      { title: 'Paint the tire', description: 'Apply outdoor acrylic paint to the outer surface. Let dry between coats.' },
      { title: 'Wrap with rope', description: 'Starting from the bottom, glue rope in a spiral pattern around the tire. Work your way up.' },
      { title: 'Add foam top', description: 'Cut foam to fit inside the tire opening. Cover with fabric or rope.' },
      { title: 'Secure the foam', description: 'Use E6000 glue to secure the foam padding. Cover with outdoor fabric.' },
      { title: 'Add a cushion', description: 'Top with a weather-resistant cushion tied to the tire.' }
    ],
    tips: [
      'Use natural rope for outdoor durability',
      'Paint designs or stripes for kids',
      'Stack two tires for a taller seat',
      'Perfect for reading corners'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1527515637462-cff94edd56f1?w=800',
    relatedBuilds: ['seating-log-stumps', 'seating-pallet-bench']
  },

  // WATER PLAY
  {
    id: 'water-table-simple',
    title: 'Simple Water Table',
    category: 'Water Play',
    difficulty: 'easy',
    timeEstimate: '1 hour',
    ageRange: '2-6',
    cost: '$10-20',
    description: 'A simple but engaging water play station using a basic table and bin. Endless summer fun for little ones.',
    tools: ['Drill', 'Saw'],
    materials: [
      { name: 'Plastic storage bin', quantity: '1', link: 'https://www.target.com' },
      { name: 'PVC pipe pieces', quantity: '4-6', link: 'https://www.homedepot.com' },
      { name: 'Plastic tubing', quantity: '3 ft', link: 'https://www.homedepot.com' },
      { name: 'Suction cups', quantity: '4-6', link: 'https://www.amazon.com' },
      { name: 'Water toys', quantity: 'various', link: 'https://www.dollarstore.com' }
    ],
    steps: [
      { title: 'Choose your table', description: 'Use a basic plastic or wooden table at kid height. A folding table works great.' },
      { title: 'Prepare the bin', description: 'Select a bin that fits on the table with room for spilling. Drill drainage holes in one corner.' },
      { title: 'Create funnels', description: 'Cut PVC pipes at angles and mount to the table edges using suction cups.' },
      { title: 'Add tubes', description: 'Attach plastic tubes at various angles for water to flow through.' },
      { title: 'Set up the play', description: 'Fill the bin with water and add cups, funnels, and toys for splashing.' }
    ],
    tips: [
      'Add food coloring for rainbow play',
      'Include measuring cups and spoons',
      'Add ice for hot summer days',
      'Perfect for learning volume and flow'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1476673160081-cf065607f449?w=800',
    relatedBuilds: ['water-table-rain-tower', 'water-sprinkler DIY']
  },
  {
    id: 'water-table-rain-tower',
    title: 'Rain Tower',
    category: 'Water Play',
    difficulty: 'medium',
    timeEstimate: '3-4 hours',
    ageRange: '2-10',
    cost: '$40-60',
    description: 'A tall, multi-level water play structure with cascading channels. Mesmerizing to watch and play with for hours.',
    tools: ['Drill', 'Saw', 'Screwdriver', 'Level', 'Measuring tape'],
    materials: [
      { name: 'Pressure-treated lumber', quantity: '6 pieces', link: 'https://www.homedepot.com' },
      { name: 'Plastic rain gutters', quantity: '4', link: 'https://www.homedepot.com' },
      { name: 'Large plastic bin', quantity: '1', link: 'https://www.target.com' },
      { name: 'PVC elbows and pipe', quantity: 'various', link: 'https://www.homedepot.com' },
      { name: 'Waterproof sealant', quantity: '1 tube', link: 'https://www.homedepot.com' }
    ],
    steps: [
      { title: 'Build the frame', description: 'Create a tall A-frame structure about 5 feet high using 2x4s.' },
      { title: 'Install levels', description: 'Attach horizontal support beams at 3-4 different heights.' },
      { title: 'Mount the gutters', description: 'Cut gutters to fit between posts and mount at slight angles to create cascades.' },
      { title: 'Add overflows', description: 'Position PVC elbows to direct water from one level to the next.' },
      { title: 'Create the base', description: 'Place the large bin at the bottom to catch water. Add a small pump for recirculation.' },
      { title: 'Seal and test', description: 'Apply waterproof sealant to all joints. Test the flow and adjust angles.' }
    ],
    tips: [
      'Add a small pump for continuous flow',
      'Perfect with food coloring experiments',
      'Kids can help paint and decorate',
      'Winterize by draining and covering'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1476673160081-cf065607f449?w=800',
    relatedBuilds: ['water-table-simple', 'water-sprinkler DIY']
  },
  {
    id: 'water-sprinkler DIY',
    title: 'DIY Sprinkler System',
    category: 'Water Play',
    difficulty: 'easy',
    timeEstimate: '30 min - 1 hour',
    ageRange: '2-12',
    cost: '$5-15',
    description: 'A simple sprinkler made from PVC pipes that kids can run through on hot days. Easy to store and use anywhere.',
    tools: ['Drill', 'PVC cutter or saw', 'Tape measure'],
    materials: [
      { name: 'PVC pipe (1/2 inch)', quantity: '10 ft', link: 'https://www.homedepot.com' },
      { name: 'PVC elbows', quantity: '4', link: 'https://www.homedepot.com' },
      { name: 'Garden hose adapter', quantity: '1', link: 'https://www.homedepot.com' },
      { name: 'Drill bits (1/16-1/8 inch)', quantity: '1 set', link: 'https://www.homedepot.com' },
      { name: 'PVC cement (optional)', quantity: '1 small can', link: 'https://www.homedepot.com' }
    ],
    steps: [
      { title: 'Cut the pipe', description: 'Cut PVC into: two 3-foot sections and two 2-foot sections.' },
      { title: 'Assemble the frame', description: 'Connect the pieces with elbows to form a rectangle or H-shape.' },
      { title: 'Add the hose connection', description: 'Attach the hose adapter to one end of the frame.' },
      { title: 'Drill the holes', description: 'Drill small holes all over the top and sides of the frame. Vary the sizes.' },
      { title: 'Connect and test', description: 'Attach to a garden hose and turn on. Adjust water pressure for best spray.' }
    ],
    tips: [
      'More holes = finer spray',
      'Larger holes at the top for rain effect',
      'Hang it from a tree for an arch',
      'Make two and connect them!'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1476673160081-cf065607f449?w=800',
    relatedBuilds: ['water-table-simple', 'water-table-rain-tower']
  }
]

export const getBuildById = (id) => builds.find(build => build.id === id)

export const getBuildsByCategory = (category) => {
  if (category === 'All') return builds
  return builds.filter(build => build.category === category)
}

export const getRelatedBuilds = (buildId) => {
  const build = getBuildById(buildId)
  if (!build) return []
  return build.relatedBuilds.map(id => getBuildById(id)).filter(Boolean)
}
