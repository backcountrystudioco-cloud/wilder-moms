export const buildCategories = [
  'All',
  'Mud Kitchens',
  'Garden Beds',
  'Nature Play',
  'Climbing Structures',
  'Water Play',
  'Cozy Hideouts'
]

export const builds = [
  // MUD KITCHENS
  {
    id: 'mud-kitchen-one-board',
    title: 'The One-Board Mud Kitchen',
    category: 'Mud Kitchens',
    difficulty: 'easy',
    timeEstimate: '30 minutes',
    ageRange: '2-6',
    cost: '$5-10',
    description: 'One board, two cinder blocks, and imagination. This is the mud kitchen stripped to its essence — and it works beautifully.',
    tools: ['Drill', 'Sandpaper'],
    materials: [
      { name: 'Cinder blocks', quantity: '2', link: 'https://www.homedepot.com' },
      { name: 'Plank or old door', quantity: '1', link: 'https://www.facebook.com/marketplace' },
      { name: 'Large metal pan', quantity: '1', link: 'https://www.dollarstore.com' },
      { name: 'Screws', quantity: '4', link: 'https://www.homedepot.com' }
    ],
    steps: [
      { title: 'Set the cinder blocks', description: 'Place two cinder blocks 18 inches apart. The holes should face sideways so kids can peek through.' },
      { title: 'Sand the plank', description: 'Sand any rough spots on your plank. Round the corners so they aren\'t sharp.' },
      { title: 'Set the counter', description: 'Rest the plank across the cinder blocks. That\'s it — no screws needed if the fit is snug.' },
      { title: 'Add the pan', description: 'Screw the pan lightly to the plank so it won\'t tip. Leave room to work around it.' },
      { title: 'Let them play', description: 'Add old cups, pitchers, and spoons. Hook up a hose nearby and let the mud flow.' }
    ],
    tips: [
      'Cinder blocks come in different widths — find the right plank length',
      'Kids can help gather the "ingredients"',
      'The holes in cinder blocks are perfect for sticking sticks and spoons',
      'Doubles as a lemonade stand'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1476673160081-cf065607f449?w=800',
    relatedBuilds: ['mud-kitchen-table']
  },
  {
    id: 'mud-kitchen-table',
    title: 'Table-Top Mud Kitchen',
    category: 'Mud Kitchens',
    difficulty: 'easy',
    timeEstimate: '1 hour',
    ageRange: '2-8',
    cost: '$15-25',
    description: 'Turn any outdoor table into a mud kitchen with this simple add-on. Features a basin, utensil holder, and mixing station.',
    tools: ['Drill', 'Jigsaw', 'Sandpaper'],
    materials: [
      { name: 'Plastic storage bin', quantity: '1', link: 'https://www.target.com' },
      { name: 'Bungee cords', quantity: '2', link: 'https://www.amazon.com' },
      { name: 'PVC pipe (2 inch)', quantity: '1 piece', link: 'https://www.homedepot.com' },
      { name: 'Small buckets', quantity: '3', link: 'https://www.dollarstore.com' },
      { name: 'Command hooks', quantity: '6', link: 'https://www.amazon.com' }
    ],
    steps: [
      { title: 'Prep the bin', description: 'Drill排水孔 in the bottom of the bin. Cut a v-shape notch in one rim for pouring.' },
      { title: 'Create the pipe utensil holder', description: 'Cut PVC pipe into 6-inch sections. Mount horizontally under the table edge.' },
      { title: 'Attach the bin', description: 'Use bungee cords to secure the bin to the table. It should be stable but removable for cleaning.' },
      { title: 'Add hooks', description: 'Screw command hooks along the table edge for hanging spoons, ladles, and funnels.' },
      { title: 'Stock it up', description: 'Fill with old kitchenware — real is better than plastic.' }
    ],
    tips: [
      'Take it apart and hose it down in minutes',
      'Use food-grade plastic bins only',
      'Store in a shed when not in use',
      'Add a tray underneath for catching spills'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1518882605630-8eb700e01287?w=800',
    relatedBuilds: ['mud-kitchen-one-board']
  },

  // GARDEN BEDS
  {
    id: 'pocket-garden',
    title: 'Strawberry Pocket Garden',
    category: 'Garden Beds',
    difficulty: 'easy',
    timeEstimate: '45 minutes',
    ageRange: '3-10',
    cost: '$20-30',
    description: 'A vertical pallet garden that grows 15+ strawberry plants in the space of one square foot. Perfect for small yards and apartment balconies.',
    tools: ['Drill', 'Hammer', 'Staple gun', 'Sandpaper'],
    materials: [
      { name: 'Wooden pallet (heat treated)', quantity: '1', link: 'https://www.facebook.com/marketplace' },
      { name: 'Landscape fabric', quantity: '2 sq ft', link: 'https://www.homedepot.com' },
      { name: 'Staples', quantity: '1 box', link: 'https://www.homedepot.com' },
      { name: 'Potting soil', quantity: '2 bags', link: 'https://www.localnursery.com' },
      { name: 'Strawberry plants', quantity: '6-8', link: 'https://www.localnursery.com' }
    ],
    steps: [
      { title: 'Inspect the pallet', description: 'Look for the HT stamp (heat treated). Sand any rough slats.' },
      { title: 'Line the back and sides', description: 'Staple landscape fabric to the back of the pallet, creating pockets between each slat.' },
      { title: 'Add the bottom', description: 'Fold the fabric at the bottom to close the pocket. Staple securely.' },
      { title: 'Fill with soil', description: 'Pack potting soil into each pocket, pressing firmly.' },
      { title: 'Plant and water', description: 'Tuck strawberry plants into each pocket. Hang on a wall or fence.' }
    ],
    tips: [
      'Lay the pallet flat for 2 weeks after planting so roots establish',
      'Hang it at eye level so kids can watch strawberries grow',
      'Pinch off runners to get more fruit',
      'Replace plants every 2-3 years'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800',
    relatedBuilds: ['tower-garden', 'window-box']
  },
  {
    id: 'tower-garden',
    title: 'Tomato Tower',
    category: 'Garden Beds',
    difficulty: 'easy',
    timeEstimate: '30 minutes',
    ageRange: '3-12',
    cost: '$10-15',
    description: 'A five-gallon bucket, some twine, and a sunny spot. This tower makes growing tomatoes easy enough for a four-year-old to manage alone.',
    tools: ['Drill', 'Scissors'],
    materials: [
      { name: '5-gallon bucket', quantity: '1', link: 'https://www.homedepot.com' },
      { name: 'Tomato cage', quantity: '1', link: 'https://www.homedepot.com' },
      { name: 'Potting mix', quantity: '1 bag', link: 'https://www.localnursery.com' },
      { name: 'Tomato seedling', quantity: '1', link: 'https://www.localnursery.com' },
      { name: 'Twine', quantity: '10 ft', link: 'https://www.homedepot.com' }
    ],
    steps: [
      { title: 'Drill drainage', description: 'Drill 4-5 large holes in the bottom of the bucket.' },
      { title: 'Add the cage', description: 'Turn the cage upside down and insert the bottom ring into the empty bucket. It should wedge in snugly.' },
      { title: 'Fill it up', description: 'Pour potting mix into the bucket, filling to about 2 inches from the top.' },
      { title: 'Plant the tomato', description: 'Dig a small hole in the center and plant the seedling deep — bury half the stem.' },
      { title: 'Set and stake', description: 'Place in full sun. Tie the cage to a stake if it\'s windy.' }
    ],
    tips: [
      'Water every day in hot weather',
      'Feed weekly once flowers appear',
      'Cherry tomatoes are easiest for kids to grow',
      'Bring inside before first frost'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800',
    relatedBuilds: ['pocket-garden', 'pea-pod']
  },
  {
    id: 'pea-pod',
    title: 'Pea Pod Frame',
    category: 'Garden Beds',
    difficulty: 'easy',
    timeEstimate: '1 hour',
    ageRange: '3-10',
    cost: '$5-10',
    description: 'A simple bamboo frame in the shape of a pea pod. Kids love crawling inside, and the peas grow up and over for easy picking.',
    tools: ['Scissors', 'Garden twine'],
    materials: [
      { name: 'Bamboo stakes (6 ft)', quantity: '6', link: 'https://www.homedepot.com' },
      { name: 'Garden twine', quantity: '1 spool', link: 'https://www.homedepot.com' },
      { name: 'Pea seeds', quantity: '1 packet', link: 'https://www.localnursery.com' },
      { name: 'Chicken wire (optional)', quantity: '2 ft', link: 'https://www.homedepot.com' }
    ],
    steps: [
      { title: 'Push in the stakes', description: 'Push three stakes into the ground about 2 feet apart, curving them to meet at the top like an A-frame.' },
      { title: 'Tie the top', description: 'Bind the three tops together with twine, forming a tunnel entrance.' },
      { title: 'Add horizontal supports', description: 'Tie twine horizontally every 8 inches for peas to climb on.' },
      { title: 'Plant the peas', description: 'Plant seeds on both sides of the tunnel, 2 inches deep and 3 inches apart.' },
      { title: 'Wait and watch', description: 'Peas sprout in 7-14 days. Kids can watch them climb and form pods.' }
    ],
    tips: [
      'Plant in early spring — peas love cool weather',
      'Sugar snap peas are best for kids (eat the whole pod)',
      'Kids love hiding inside while it grows',
      'Harvest often to get more peas'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1592419044706-39796d40f98c?w=800',
    relatedBuilds: ['tower-garden', 'window-box']
  },
  {
    id: 'window-box',
    title: 'Herbs on the Porch',
    category: 'Garden Beds',
    difficulty: 'easy',
    timeEstimate: '45 minutes',
    ageRange: '2-12',
    cost: '$15-25',
    description: 'A window box herb garden that turns cooking into an adventure. Kids pick the basil, mint, and chives while you make dinner.',
    tools: ['Drill', 'Screwdriver'],
    materials: [
      { name: 'Window box', quantity: '1', link: 'https://ikea.com' },
      { name: 'Potting mix', quantity: '1 bag', link: 'https://www.localnursery.com' },
      { name: 'Herb seedlings', quantity: '3-4', link: 'https://www.localnursery.com' },
      { name: 'L-brackets', quantity: '2 pairs', link: 'https://www.homedepot.com' },
      { name: 'Slow-release fertilizer', quantity: '1 box', link: 'https://www.homedepot.com' }
    ],
    steps: [
      { title: 'Choose your spot', description: 'Pick a spot that gets 6+ hours of sun. Mount brackets level.' },
      { title: 'Drill drainage holes', description: 'Drill 3-4 holes in the bottom of the window box if there aren\'t any.' },
      { title: 'Add soil and plants', description: 'Fill halfway with potting mix. Arrange plants and fill around them.' },
      { title: 'Mount securely', description: 'Lift the box into the brackets. It should be level and not wobble.' },
      { title: 'Show them how', description: 'Let kids pinch off leaves when you cook. New growth will replace them.' }
    ],
    tips: [
      'Basil, mint, and chives are nearly impossible to kill',
      'Mint likes to take over — keep it in its own pot inside the box',
      'Pinch flowers off to keep leaves growing',
      'Water when the soil feels dry'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800',
    relatedBuilds: ['pocket-garden', 'tower-garden']
  },

  // NATURE PLAY
  {
    id: 'bug-hotel',
    title: 'Mason Bee Hotel',
    category: 'Nature Play',
    difficulty: 'easy',
    timeEstimate: '30 minutes',
    ageRange: '3-10',
    cost: '$5-10',
    description: 'Mason bees are gentle, amazing pollinators — and they\'ll move into this simple hotel you can build from a log and some bamboo. No tools required.',
    tools: ['Drill', 'Saw'],
    materials: [
      { name: 'Short log section (6-8 inches)', quantity: '1', link: 'https://www.localtreecare.com' },
      { name: 'Bamboo stalks', quantity: '5-8', link: 'https://www.amazon.com' },
      { name: 'Drill bits (3/16, 5/16 inch)', quantity: '2', link: 'https://www.homedepot.com' },
      { name: 'Twine', quantity: '1 spool', link: 'https://www.homedepot.com' },
      { name: 'Rake', quantity: '1 bundle', link: 'https://www.homedepot.com' }
    ],
    steps: [
      { title: 'Drill holes in the log', description: 'Drill holes of different sizes (3/16 to 5/16 inch) about 3 inches deep. Leave 1 inch between holes.' },
      { title: 'Cut the bamboo', description: 'Cut bamboo into 6-8 inch sections. Cut just above a node so the bottom is closed.' },
      { title: 'Bundle the bamboo', description: 'Tie bamboo pieces together with twine. Leave long tails for hanging.' },
      { title: 'Mount it up', description: 'Hang the log and bundle together on a south-facing wall 6-7 feet high.' },
      { title: 'Add a mud source', description: 'Place a small dish of mud nearby. Mason bees need mud to seal their nests.' }
    ],
    tips: [
      'Hole size matters: 3/16" for small bees, 5/16" for mason bees',
      'Hang facing south — bees like morning sun',
      'Don\'t drill all the way through the log',
      'Clean holes every fall with a pipe cleaner'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=800',
    relatedBuilds: ['rock-cairn', 'stick-sculpture']
  },
  {
    id: 'rock-cairn',
    title: 'Balance Rock Tower',
    category: 'Nature Play',
    difficulty: 'easy',
    timeEstimate: '30 minutes',
    ageRange: '2-12',
    cost: '$0',
    description: 'River rocks stacked into meditative towers. There\'s something deeply calming about finding the exact balance point — for kids and adults alike.',
    tools: ['None'],
    materials: [
      { name: 'Smooth river rocks', quantity: '10-20', link: 'https://www.riverstones.com' },
      { name: 'Wooden board', quantity: '1', link: 'https://www.homedepot.com' }
    ],
    steps: [
      { title: 'Gather rocks', description: 'Collect smooth, flat rocks from a river or garden center. Different sizes make it more interesting.' },
      { title: 'Set up your base', description: 'Place a wide, flat board or stump as your base. Make sure it\'s stable.' },
      { title: 'Start stacking', description: 'Find the balance point of each rock. Go slow — the magic is in the focus.' },
      { title: 'Go higher', description: 'Use smaller rocks on top. Stack as high as you can without toppling.' },
      { title: 'Take turns', description: 'This is a zen activity — no competition, just peaceful stacking.' }
    ],
    tips: [
      'Flat rocks with a center ridge are easiest to balance',
      'Smooth river rocks from a garden center are inexpensive',
      'Sea glass and shells work too',
      'Display finished towers in the garden'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1527515637462-cff94edd56f1?w=800',
    relatedBuilds: ['stick-sculpture', 'fort-sticks']
  },
  {
    id: 'stick-sculpture',
    title: 'Stick & Twig Art',
    category: 'Nature Play',
    difficulty: 'easy',
    timeEstimate: '1 hour',
    ageRange: '4-12',
    cost: '$0',
    description: 'A living art frame where kids weave sticks, vines, and branches into living sculptures. As things grow, the art changes with the seasons.',
    tools: ['Pruning shears', 'Gloves'],
    materials: [
      { name: '4 wooden posts (8 ft)', quantity: '4', link: 'https://www.homedepot.com' },
      { name: 'Flexible vines or willow branches', quantity: '10-15', link: 'https://www.localnursery.com' },
      { name: 'Twine', quantity: '1 spool', link: 'https://www.homedepot.com' },
      { name: 'Found sticks and twigs', quantity: 'various', link: 'Your backyard' }
    ],
    steps: [
      { title: 'Set the frame', description: 'Pound four posts into the ground to form a square or triangle. Go 2 feet deep.' },
      { title: 'Weave the base', description: 'Starting at the bottom, weave horizontal lines of twine between posts.' },
      { title: 'Add structure', description: 'Weave thicker branches horizontally every 6 inches for structure.' },
      { title: 'Fill with found materials', description: 'Kids add sticks, twigs, pinecones — whatever they find. Weave them in.' },
      { title: 'Let it grow', description: 'Plant climbing vines at the base. In a season, green will cover the structure.' }
    ],
    tips: [
      'Morning glory and sweet peas grow fast and cover well',
      'Let kids lead the design — it\'s their sculpture',
      'Add strings for beans to climb',
      'Perfect for hiding behind'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1518882605630-8eb700e01287?w=800',
    relatedBuilds: ['bug-hotel', 'fort-sticks']
  },

  // CLIMBING STRUCTURES
  {
    id: 'tire-climb',
    title: 'Tire Climb Stack',
    category: 'Climbing Structures',
    difficulty: 'easy',
    timeEstimate: '2 hours',
    ageRange: '3-10',
    cost: '$0-10',
    description: 'Old tires stacked and bolted together. Free, endlessly fun, and great for burning energy. This is the jungle gym you can build in an afternoon.',
    tools: ['Drill', 'Wrench', 'Socket set'],
    materials: [
      { name: 'Car tires (same size)', quantity: '4-6', link: 'https://www.tirerack.com' },
      { name: 'Long bolts with nuts', quantity: '8', link: 'https://www.homedepot.com' },
      { name: 'Landscape fabric', quantity: '1 roll', link: 'https://www.homedepot.com' },
      { name: 'Rubber mats', quantity: 'optional', link: 'https://www.amazon.com' }
    ],
    steps: [
      { title: 'Source tires', description: 'Ask at auto shops — they often pay to dispose of old tires. Get 4-6 matching ones.' },
      { title: 'Clean them', description: 'Scrub tires with soap and water. Let dry completely.' },
      { title: 'Mark and drill', description: 'Mark four points evenly around the tire edge. Drill holes through both flanges where tires will touch.' },
      { title: 'Stack and bolt', description: 'Stack tires and insert bolts through holes. Secure with nuts on the inside.' },
      { title: 'Prepare the ground', description: 'Place landscape fabric under and around the structure. Add rubber mats for safety.' }
    ],
    tips: [
      'Lay tires flat for easier climbing',
      'Leave the sidewalls on for better handholds',
      'Fill center with sand to prevent water pooling',
      'Paint bright colors with outdoor paint'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1527515637462-cff94edd56f1?w=800',
    relatedBuilds: ['balance-beam', 'rope-swing']
  },
  {
    id: 'balance-beam',
    title: 'Backyard Balance Beam',
    category: 'Climbing Structures',
    difficulty: 'easy',
    timeEstimate: '1 hour',
    ageRange: '3-12',
    cost: '$10-15',
    description: 'Three posts, one beam, infinite walks. This balance beam builds core strength and confidence — and it\'s adjustable as kids grow.',
    tools: ['Drill', 'Level', 'Shovel'],
    materials: [
      { name: '4x4 post (8 ft)', quantity: '2', link: 'https://www.homedepot.com' },
      { name: '2x6 board (10 ft)', quantity: '1', link: 'https://www.homedepot.com' },
      { name: 'Carriage bolts', quantity: '4', link: 'https://www.homedepot.com' },
      { name: 'Concrete mix', quantity: '2 bags', link: 'https://www.homedepot.com' },
      { name: 'Non-toxic wood sealer', quantity: '1 can', link: 'https://www.homedepot.com' }
    ],
    steps: [
      { title: 'Cut the pieces', description: 'Cut 4x4s to 30 inches. Leave the beam at 10 feet or cut to fit your space.' },
      { title: 'Seal the wood', description: 'Apply wood sealer to all surfaces. Let dry for 48 hours.' },
      { title: 'Dig holes', description: 'Dig two holes 2 feet deep where you want the beam ends to sit.' },
      { title: 'Set the posts', description: 'Put posts in holes and fill with concrete. Use a level to make sure posts are plumb.' },
      { title: 'Attach the beam', description: 'Once concrete sets, center the beam on top of posts. Drill through and bolt securely.' }
    ],
    tips: [
      'Adjust height as kids grow — raise the beam',
      'For beginners, lay the beam on the ground first',
      'Add two beams side-by-side for relay races',
      'Perfect for imaginary tightrope acts'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800',
    relatedBuilds: ['tire-climb', 'stump-steps']
  },
  {
    id: 'stump-steps',
    title: 'Log Stepping Stones',
    category: 'Climbing Structures',
    difficulty: 'easy',
    timeEstimate: '2 hours',
    ageRange: '2-8',
    cost: '$0-10',
    description: 'Tree rounds at different heights create a balance course. Kids hop from stump to stump — building balance, coordination, and confidence.',
    tools: ['Saw', 'Chainsaw', 'Sandpaper', 'Drill'],
    materials: [
      { name: 'Tree rounds (varying heights)', quantity: '6-8', link: 'https://www.localtreecare.com' },
      { name: 'Exterior wood sealer', quantity: '1 can', link: 'https://www.homedepot.com' },
      { name: 'Rubber feet', quantity: 'optional', link: 'https://www.homedepot.com' },
      { name: 'Pea gravel', quantity: '2-3 bags', link: 'https://www.homedepot.com' }
    ],
    steps: [
      { title: 'Get logs cut', description: 'Ask a tree service to cut rounds from cedar or redwood logs. Various diameters (8-16 inches) look best.' },
      { title: 'Cut to height', description: 'Cut rounds to varying heights — 4, 6, 8, 10, and 12 inches. Make cuts level.' },
      { title: 'Sand the tops', description: 'Sand the top surface of each round until smooth. This is where feet will land.' },
      { title: 'Seal everything', description: 'Apply exterior sealer to all surfaces. Let cure for a week before use.' },
      { title: 'Lay out the path', description: 'Place rounds in a winding pattern, spaced for easy hopping. Bury slightly for stability.' }
    ],
    tips: [
      'Lay out before you bury — watch kids try it first',
      'Cedar and redwood resist rot for years',
      'Space closer together for toddlers, farther apart for older kids',
      'Add a "finish line" stump'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1527515637462-cff94edd56f1?w=800',
    relatedBuilds: ['balance-beam', 'tire-climb']
  },
  {
    id: 'rope-swing',
    title: 'Tree Swing',
    category: 'Climbing Structures',
    difficulty: 'medium',
    timeEstimate: '2 hours',
    ageRange: '2-12',
    cost: '$15-25',
    description: 'A proper tree swing with a wooden seat that will last for years. The kind of swing you remember from childhood.',
    tools: ['Drill', 'Saw', 'Wrench', 'Ladder'],
    materials: [
      { name: 'Climbing rope (1/2 inch)', quantity: '25 ft', link: 'https://www.rei.com' },
      { name: 'Hardwood board (2x6)', quantity: '1 piece', link: 'https://www.homedepot.com' },
      { name: 'Tree strap', quantity: '2', link: 'https://www.rei.com' },
      { name: 'Saddle clamp', quantity: '2', link: 'https://www.homedepot.com' },
      { name: 'Lag screw (5/16 inch)', quantity: '2', link: 'https://www.homedepot.com' }
    ],
    steps: [
      { title: 'Find a branch', description: 'Look for a healthy branch at least 8 inches thick, 10-15 feet off the ground, and at least 6 feet from the trunk.' },
      { title: 'Install straps', description: 'Wrap tree straps around the branch. Leave 2 feet of clearance on each side.' },
      { title: 'Cut and drill the seat', description: 'Cut the board to 18 inches. Drill two holes 2 inches from each end for rope threading.' },
      { title: 'Thread the rope', description: 'Cut rope in half. Thread through seat holes and tie secure knots underneath.' },
      { title: 'Attach to straps', description: 'Secure ropes to tree straps with clamps. Test by giving it a good swing.' }
    ],
    tips: [
      'Check the branch every spring — it grows!',
      'Use softwood seat if you want it to weather naturally',
      'Seat should be 2-3 feet off the ground for kids',
      'Tire swings need more clearance'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1476673160081-cf065607f449?w=800',
    relatedBuilds: ['tire-climb', 'fort-sticks']
  },

  // WATER PLAY
  {
    id: 'bottle-bowl',
    title: 'Plastic Bottle Water Wall',
    category: 'Water Play',
    difficulty: 'easy',
    timeEstimate: '1 hour',
    ageRange: '2-8',
    cost: '$5',
    description: 'Empty bottles mounted on a board at different angles. Water poured at the top flows down through channels and spouts — endlessly fascinating.',
    tools: ['Drill', 'Scissors', 'Nail (for punching)', 'String'],
    materials: [
      { name: 'Large plastic bottles', quantity: '6-8', link: 'https://www.dollarstore.com' },
      { name: 'Wooden board or fence section', quantity: '1', link: 'https://www.homedepot.com' },
      { name: 'Cable ties', quantity: '1 bag', link: 'https://www.amazon.com' },
      { name: 'Garden hose adapter', quantity: '1', link: 'https://www.homedepot.com' },
      { name: 'Funnel', quantity: '1', link: 'https://www.dollarstore.com' }
    ],
    steps: [
      { title: 'Prep the bottles', description: 'Cut bottles in half. Remove tops and save the necked section for spouts.' },
      { title: 'Mount the board', description: 'Attach the board to a fence or wall at a slight lean. Or prop it up with posts.' },
      { title: 'Arrange the bottles', description: 'Play with placement — some upside down, some sideways, some with spouts facing different directions.' },
      { title: 'Attach with ties', description: 'Use cable ties through holes in the board to secure bottles. Leave space between them.' },
      { title: 'Add water', description: 'Hook up a garden hose with a slow flow to the top. Or use a watering can.' }
    ],
    tips: [
      'Different angles create different splash patterns',
      'Add food coloring to trace the water path',
      'Kids love adding soap — outside only!',
      'Drainage at the bottom catches water for relaunch'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1476673160081-cf065607f449?w=800',
    relatedBuilds: ['sprinkler-wiggle', 'gutter-stream']
  },
  {
    id: 'sprinkler-wiggle',
    title: 'The Wiggle Sprinkler',
    category: 'Water Play',
    difficulty: 'easy',
    timeEstimate: '30 minutes',
    ageRange: '2-12',
    cost: '$3',
    description: 'A garden hose, a few zip ties, and suddenly you have a sprinkler that wiggles and dances. Kids run through the chaos of water.',
    tools: ['Drill', 'Scissors'],
    materials: [
      { name: 'Garden hose', quantity: '1', link: 'https://www.homedepot.com' },
      { name: 'PVC elbow (1/2 inch)', quantity: '2', link: 'https://www.homedepot.com' },
      { name: 'Zip ties', quantity: '6', link: 'https://www.amazon.com' },
      { name: 'Rubber mallet or stake', quantity: '1', link: 'https://www.homedepot.com' }
    ],
    steps: [
      { title: 'Create the base', description: 'Cut a 2-foot piece of hose. Attach elbows to both ends at 45-degree angles pointing opposite ways.' },
      { title: 'Add the main line', description: 'Attach the base to your regular garden hose. It should look like a T with bent arms.' },
      { title: 'Stab into ground', description: 'Push the assembly into the ground so only the elbows poke out.' },
      { title: 'Turn on the water', description: 'Water pressure will make the elbows wiggle and spray in spinning patterns.' }
    ],
    tips: [
      'More water pressure = more wiggle',
      'Lay on the ground for a different spray pattern',
      'Hang it from a tree for an arch',
      'Add a timer — they\'ll play for hours'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1476673160081-cf065607f449?w=800',
    relatedBuilds: ['bottle-bowl', 'gutter-stream']
  },
  {
    id: 'gutter-stream',
    title: 'Gutter Water Run',
    category: 'Water Play',
    difficulty: 'easy',
    timeEstimate: '2 hours',
    ageRange: '3-10',
    cost: '$15-20',
    description: 'Old rain gutters become a water racing system. Kids pour water at the top and watch it flow — learning physics without realizing it.',
    tools: ['Drill', 'Saw', 'Level'],
    materials: [
      { name: 'Rain gutters (10 ft)', quantity: '2', link: 'https://www.homedepot.com' },
      { name: 'Gutter end caps', quantity: '4', link: 'https://www.homedepot.com' },
      { name: 'PVC pipe (2 inch)', quantity: '4 pieces', link: 'https://www.homedepot.com' },
      { name: 'L-brackets', quantity: '6', link: 'https://www.homedepot.com' },
      { name: 'Wooden posts', quantity: '2', link: 'https://www.homedepot.com' }
    ],
    steps: [
      { title: 'Cut gutters to length', description: 'Cut each gutter into two 5-foot sections. Add end caps to all four open ends.' },
      { title: 'Set up posts', description: 'Dig two holes 5 feet apart. Set posts at different heights — one 4 feet, one 2 feet.' },
      { title: 'Mount gutters', description: 'Attach gutters to posts using L-brackets. Angle them so water flows from high to low.' },
      { title: 'Add PVC spillways', description: 'Cut PVC pipes and mount under each gutter end so water spills into the next gutter.' },
      { title: 'Test and adjust', description: 'Run water through the system. Adjust angles until the flow goes where you want.' }
    ],
    tips: [
      'Add boats or leaves to race',
      'Measure the flow — who gets there fastest?',
      'Disconnect gutters in winter',
      'Kids can redesign the layout anytime'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1476673160081-cf065607f449?w=800',
    relatedBuilds: ['bottle-bowl', 'sprinkler-wiggle']
  },

  // COZY HIDEOUTS
  {
    id: 'fort-sticks',
    title: 'Stick Fort',
    category: 'Cozy Hideouts',
    difficulty: 'easy',
    timeEstimate: '1 hour',
    ageRange: '3-12',
    cost: '$0',
    description: 'A lean-to of branches and sticks that takes 20 minutes to build and provides endless hideaway magic. The best forts are mostly built by kids.',
    tools: ['Pruning shears', 'Gloves'],
    materials: [
      { name: 'Strong branches (6-8 ft)', quantity: '6-8', link: 'Your backyard' },
      { name: 'Smaller sticks', quantity: 'Many', link: 'Your backyard' },
      { name: 'Twine or rope', quantity: '1 spool', link: 'https://www.homedepot.com' },
      { name: 'Old sheet or tarp', quantity: '1', link: 'https://www.dollarstore.com' },
      { name: 'Pine straw or leaves', quantity: 'Many bags', link: 'Your backyard' }
    ],
    steps: [
      { title: 'Find two fork branches', description: 'Look for Y-shaped branches about arm-thickness. These are your main supports.' },
      { title: 'Set the ridgepole', description: 'Set forked branches in the ground about 5 feet apart. Rest a long pole across the forks.' },
      { title: 'Add ribs', description: 'Lean smaller branches against the ridgepole at angles, like ribs of an umbrella.' },
      { title: 'Weave in walls', description: 'Fill gaps with smaller sticks woven horizontally. Denser at the bottom.' },
      { title: 'Add the roof', description: 'Drape old sheets or tarps over the top. Weigh down with rocks.' },
      { title: 'Line the floor', description: 'Pile pine straw, leaves, or blankets inside for a cozy floor.' }
    ],
    tips: [
      'Build in late summer when sticks are dry and flexible',
      'Kids should do most of the building — resist helping',
      'This fort lasts one season — that\'s the magic',
      'Add a flag so they can find their fort'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1518882605630-8eb700e01287?w=800',
    relatedBuilds: ['sheet-tunnel', 'cardboard-castle']
  },
  {
    id: 'sheet-tunnel',
    title: 'Sheet Tunnel',
    category: 'Cozy Hideouts',
    difficulty: 'easy',
    timeEstimate: '15 minutes',
    ageRange: '2-8',
    cost: '$0',
    description: 'Two chairs, a sheet, and imagination. A tunnel connects two worlds — and you can walk through it 100 times without getting bored.',
    tools: ['None'],
    materials: [
      { name: 'Two chairs or stools', quantity: '2', link: 'Use what you have' },
      { name: 'Large sheet or blanket', quantity: '1', link: 'Use what you have' },
      { name: 'Books or rocks', quantity: '4', link: 'Use what you have' },
      { name: 'String lights (optional)', quantity: '1 strand', link: 'https://www.amazon.com' }
    ],
    steps: [
      { title: 'Set up chairs', description: 'Place two chairs facing away from each other, about 3 feet apart.' },
      { title: 'Drape the sheet', description: 'Throw a large sheet over the chairs so it droops in the middle, forming a tunnel.' },
      { title: 'Weigh it down', description: 'Put books or rocks on the chair seats to keep the sheet from flying away.' },
      { title: 'Add magic', description: 'Hang string lights inside. Put on nature sounds. The tunnel is now a portal.' },
      { title: 'Play', description: 'Crawl through 50 times. Hide toys inside. Have snacks in the tunnel.' }
    ],
    tips: [
      'A lightweight sheet works better than heavy blankets',
      'Try different sheet positions — roof only, enclosed, one side open',
      'Add pillows at both ends for comfortable entries',
      'Works inside too on a rainy day'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1476673160081-cf065607f449?w=800',
    relatedBuilds: ['fort-sticks', 'cardboard-castle']
  },
  {
    id: 'cardboard-castle',
    title: 'Cardboard Playhouse',
    category: 'Cozy Hideouts',
    difficulty: 'easy',
    timeEstimate: '2 hours',
    ageRange: '3-10',
    cost: '$0-5',
    description: 'A refrigerator box becomes a castle, a spaceship, or a taco stand — depending on the day. This playhouse transforms with imagination.',
    tools: ['Box cutter', 'Scissors', 'Tape', 'Markers'],
    materials: [
      { name: 'Large cardboard box', quantity: '1', link: 'https://www.facebook.com/marketplace' },
      { name: 'Packing tape', quantity: '2 rolls', link: 'https://www.amazon.com' },
      { name: 'Acrylic paints', quantity: '1 set', link: 'https://www.michaels.com' },
      { name: 'Paper towel tubes', quantity: '4', link: 'Use what you have' },
      { name: 'Old fabric scraps', quantity: 'Various', link: 'Use what you have' }
    ],
    steps: [
      { title: 'Cut the doorway', description: 'Cut a doorway large enough for kids to crawl through. Leave the flaps for a door.' },
      { title: 'Cut windows', description: 'Cut out window shapes. Fold the cardboard back to create sills.' },
      { title: 'Add a second room', description: 'Tape cardboard walls inside to create separate rooms or a hallway.' },
      { title: 'Paint the outside', description: 'Let kids paint the outside. No rules — castles, dragons, and tacos all welcome.' },
      { title: 'Add details', description: 'Tape paper towel tubes as turrets. Tape fabric as flags. This is their masterpiece.' }
    ],
    tips: [
      'Fridge boxes are perfect — ask at appliance stores',
      'Paint outside to avoid mess',
      'The playhouse lasts longer with a coat of clear spray sealer',
      'When done, recycle it properly'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1518882605630-8eb700e01287?w=800',
    relatedBuilds: ['fort-sticks', 'sheet-tunnel']
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
