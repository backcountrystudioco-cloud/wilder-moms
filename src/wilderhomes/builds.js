export const buildCategories = [
  'All',
  'Mud Kitchens',
  'Garden Beds',
  'Nature Play',
  'Climbing Structures',
  'Water Play',
  'Cozy Hideouts',
  'Weekend Builds'
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
    imageUrl: '/builds/mud kitchen.png',
    imageUrl: '/builds/mud kitchen.png',
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
    imageUrl: '/builds/table top.png',
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
      { title: 'Prep the bin', description: 'Drill drainage holes in the bottom of the bin. Cut a v-shape notch in one rim for pouring.' },
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
    imageUrl: '/builds/strawberries.png',
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
    imageUrl: '/builds/tomato.png',
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
    imageUrl: '/builds/pea.png',
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
    imageUrl: '/builds/herb.png',
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
    imageUrl: '/builds/bee.png',
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
    imageUrl: '/builds/stones.png',
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
    imageUrl: '/builds/logs.png',
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
    imageUrl: '/builds/tires.png',
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
    imageUrl: '/builds/balance-beam.png',
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
    imageUrl: '/builds/logs.png',
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
    imageUrl: '/builds/tree swing.png',
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
    imageUrl: '/builds/bottle-bowl.png',
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
    imageUrl: '/builds/wiggle.png',
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
    imageUrl: '/builds/gutter-stream.png',
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
    imageUrl: '/builds/fort-sticks.png',
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
    imageUrl: '/builds/sheet-tunnel.png',
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
    imageUrl: '/builds/cardboard-castle.png',
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
    relatedBuilds: ['fort-sticks', 'sheet-tunnel']
  },

  {
    id: 'eco-mushroom-playhouse',
    title: 'Eco Mushroom Playhouse',
    category: 'Weekend Builds',
    difficulty: 'medium',
    timeEstimate: '2 days',
    ageRange: '3-8',
    cost: '$50-70',
    imageUrl: '/builds/mushroom.png',
    badge: 'Eco Build',
    description: 'A fully compostable playhouse with a flour-paste papier-mache cap. Every component breaks down naturally at end of life. Big enough for two kids, simple enough for one weekend.',
    tools: ['Drill', 'Saw', 'Scissors', 'Paint brushes', 'Large pot (for paste)'],
    materials: [
      { name: 'Wooden garden stakes (6ft)', quantity: '8-10 stakes', link: 'https://www.homedepot.com' },
      { name: 'Reclaimed pallets or cedar decking', quantity: '2-3', link: 'https://www.facebook.com/marketplace' },
      { name: 'Screen moulding strips or bamboo stakes', quantity: '4 strips', link: 'https://www.homedepot.com' },
      { name: 'Thick jute rope', quantity: '1 large reel', link: 'https://www.homedepot.com' },
      { name: 'Hessian sacking', quantity: '2-3 pieces', link: 'https://www.homedepot.com' },
      { name: 'Brown paper bags', quantity: 'Several bags', link: 'https://localstores' },
      { name: 'Plain flour', quantity: '4-5 cups', link: 'https://localgrocery' },
      { name: 'Raw linseed oil (16oz)', quantity: '1-2 bottles', link: 'https://www.homedepot.com' },
      { name: 'Red ochre pigment + white chalk paint', quantity: '1 quart each', link: 'https://www.homedepot.com' },
      { name: 'Strap hinges', quantity: '2 pairs', link: 'https://www.homedepot.com' }
    ],
    steps: [
      { title: 'Build the Floor', description: 'Break down pallets and lay boards side by side to form a ~4ft circle. Screw cross-battens underneath. Raise 2-3 inches off ground on flat stones for longevity.' },
      { title: 'Plant the Upright Stakes', description: 'Drill holes around floor perimeter and push 8-10 stakes (6ft tall) 8 inches in. Leave a 2ft gap on one side for the door. Screw through battens to anchor.' },
      { title: 'Lash the Top Ring', description: 'Bend a long thin branch or screen moulding into a circle at the top of stakes (~3.5ft from ground). Lash to each stake with jute twine.' },
      { title: 'Coil Jute Rope Around Stem', description: 'Starting at the base, wrap thick jute rope around all stakes like a coil pot. Dab wood glue between each coil. Leave door gap open as you go.' },
      { title: 'Make and Hang the Door', description: 'Cut door from reclaimed pallet boards in an arched shape. Screw a batten as door post and hang with two strap hinges. Add a jute rope loop as handle.' },
      { title: 'Build the Cap Hoop Frame', description: 'Soak screen moulding strips in warm water 20-30 min. Bend into two hoops ~3-3.5ft diameter. Cross at top, lash firmly. Push bottoms to ~5ft and lash to stem top ring.' },
      { title: 'Drape Hessian and Apply Papier-Mache', description: 'Drape hessian over dome, tie with jute. Kids dip brown paper in flour paste and layer all over cap - 2 full layers. Leave overnight between layers.' },
      { title: 'Make and Apply Spots', description: 'Scrunch brown paper into balls (golf ball to 4in). Cover in 2-3 layers flour-paste papier-mache. Glue spots onto cap with thick paste. Kids choose every spot position.' },
      { title: 'Paint and Seal', description: 'Mix red ochre into chalk paint for the cap. Paint cap and stem white. Once dry, brush linseed oil over everything to lock color and add water resistance.' },
      { title: 'Decorate', description: 'Paint the door, press dried flowers into last paste layer, add a name sign. Add a rug from old blanket and battery fairy lights. It is theirs now.' }
    ],
    tips: [
      'Make the cap as tall and steep as possible - at least 2ft above brim. Steep dome sheds rain instantly.',
      'Raise floor 2-3 inches on flat stones - this adds years to the structure.',
      'Lay linseed-soaked rags flat outdoors to dry - never pile them (fire risk).',
      'One linseed oil coat each spring keeps it going indefinitely.'
    ],
    ecoNote: 'Fully compostable at end of life - stakes, rope, hessian, paper, canvas, and wood all break down naturally. Keep and reuse only the strap hinges.',
    relatedBuilds: ['giant-nest', 'living-tunnel', 'giant-rainbow-arch']
  },
  {
    id: 'giant-rainbow-arch',
    title: 'Giant Rainbow Arch',
    category: 'Weekend Builds',
    difficulty: 'easy',
    timeEstimate: '4-5 hours',
    ageRange: '2-12',
    cost: '$40-55',
    imageUrl: '/builds/giant-rainbow-arch.png',
    badge: 'Eco Build',
    description: 'Six giant arches planted in a curve, each painted a different rainbow color. Kids run through them, wildflowers bloom at the base, and fairy lights make the whole yard glow. Visible from the end of the street.',
    tools: ['Rubber mallet', 'Paint brushes', 'Garden trowel'],
    materials: [
      { name: 'Screen moulding strips (1/4 x 3/4 x 8ft)', quantity: '12 strips (2 per arch)', link: 'https://www.homedepot.com' },
      { name: 'Jute twine', quantity: '1 large ball', link: 'https://www.homedepot.com' },
      { name: 'Chalk paint - 6 colors', quantity: 'Small sample pots', link: 'https://www.homedepot.com' },
      { name: 'Red ochre pigment', quantity: '1 small jar', link: 'https://www.homedepot.com' },
      { name: 'Raw linseed oil (16oz)', quantity: '1 bottle', link: 'https://www.homedepot.com' },
      { name: 'Wildflower seed mix', quantity: '1 packet', link: 'https://www.localnursery.com' },
      { name: 'Battery fairy lights', quantity: '6 sets', link: 'https://www.amazon.com' }
    ],
    steps: [
      { title: 'Mark the Rainbow Curve', description: 'Lay a garden hose in a gentle curve across the yard. Space 6 marks along it roughly 2.5ft apart - each is the center point between two arch feet.' },
      { title: 'Prepare Arch Material', description: 'Soak screen moulding strips in warm water 20-30 minutes before bending. Use two strips lashed side by side per arch leg for 2-3 season durability.' },
      { title: 'Plant All Six Arches', description: 'Push one end 12 inches into ground at marked spot. Walk strip over in curve and push other end 12 inches in about 5 feet away. Push a second stake alongside each leg for extra stability.' },
      { title: 'Kids Paint Each Arch', description: 'Assign one arch per child: red, orange, yellow, green, blue, violet. Mix red ochre into chalk paint for warm colors. Two coats each from ground up.' },
      { title: 'Seal with Linseed Oil', description: 'Once paint is dry, brush raw linseed oil over each arch. Locks color and waterproofs. Lay linseed-soaked rags flat to dry outdoors.' },
      { title: 'String Fairy Lights', description: 'Wrap battery fairy lights around each arch - spiral up to apex, back down. Tuck battery pack beside stake foot. Switch all six on at dusk for the magic moment.' },
      { title: 'Scatter Wildflower Seeds', description: 'Scratch soil lightly along base of all arches with trowel. Kids scatter wildflower mix generously - poppies, cornflowers, marigolds. Water well.' },
      { title: 'Decorate Between Arches', description: 'Place flat stepping stones between each arch pair for a path through the rainbow. Kids paint stones in matching colors. Add wind chimes or hessian bunting.' }
    ],
    tips: [
      'Double up arch strips for longevity - single lasts one summer, double lasts 2-3 seasons.',
      'Push feet in 12 inches minimum - shallow stakes pull out in wind.',
      'Wildflower seeds need scratched soil to germinate - scratch first, then scatter.',
      'Solar fairy lights mean zero effort all summer - charge by day, switch on at dusk.'
    ],
    ecoNote: 'Pull stakes at end of season, chop for compost. Jute twine composts completely. Wildflowers self-seed. Remove battery packs and reuse lights. Whole structure comes down in under 20 minutes.',
    relatedBuilds: ['eco-mushroom-playhouse', 'living-tunnel', 'giant-nest']
  },
  {
    id: 'giant-nest',
    title: 'Giant Nest',
    category: 'Weekend Builds',
    difficulty: 'easy',
    timeEstimate: '3-4 hours',
    ageRange: '2-12',
    cost: '$25-40',
    imageUrl: '/builds/new nest.png',
    badge: 'Eco Build',
    description: 'A 6ft wide woven birds nest built from foraged branches and rope - big enough for three kids to sit inside. Line with hessian and cushions, add a giant papier-mache egg. Most compostable build on the list.',
    tools: ['Rubber mallet', 'Scissors', 'Paint brushes', 'Large pot (for paste)'],
    materials: [
      { name: 'Wooden garden stakes (6ft)', quantity: '8 stakes', link: 'https://www.homedepot.com' },
      { name: 'Thick branches and sticks', quantity: 'Big pile - gathered free', link: 'https://localpark' },
      { name: 'Thick jute rope', quantity: '1 large reel', link: 'https://www.homedepot.com' },
      { name: 'Dried grass and small twigs', quantity: 'Gathered on walk', link: 'https://localarea' },
      { name: 'Hessian sacking', quantity: '1-2 pieces', link: 'https://www.homedepot.com' },
      { name: 'Old cushions or blanket', quantity: 'From home', link: 'https://reuse' },
      { name: 'Battery fairy lights', quantity: '1-2 sets', link: 'https://www.amazon.com' },
      { name: 'Large oval balloon', quantity: '1', link: 'https://localstore' },
      { name: 'Plain flour', quantity: '2 cups', link: 'https://localgrocery' },
      { name: 'White + brown chalk paint', quantity: 'Small pots', link: 'https://www.homedepot.com' }
    ],
    steps: [
      { title: 'Go on a Family Stick-Gathering Walk', description: 'Head to a park or woodland. Collect thick branches (thumb-width, 4-6ft) for main weave and thin flexible twigs for filling. Collect at least twice as much as you think needed.' },
      { title: 'Mark Circle and Plant Frame Stakes', description: 'Tie 3ft string to center stake, walk taut circle to mark 6ft diameter. Hammer 8 stakes evenly around circle at least 12in deep, slight outward angle for bowl shape.' },
      { title: 'Weave Base Layer', description: 'Weave longest flexible branches in and out between upright stakes around full circle - over one, behind next. Add rounds of thick jute rope between branch rows. Kids can do this after one demo.' },
      { title: 'Build Walls to 18-20 inches', description: 'Keep weaving until walls reach 18-20 inches - enough to feel enclosed while sitting but easy to climb. Top does not need to be level - real nests are never neat.' },
      { title: 'Pack in Twigs, Leaves, Small Sticks', description: 'Give kids entire pile of thin twigs and let them tuck into every gap - exactly as a real bird would. Fills holes, adds rigidity, looks phenomenal.' },
      { title: 'Line Inside and Add Lights', description: 'Lay hessian across inside floor. Add old cushions or folded blanket. String fairy lights around inside rim, tucked into top weave so they glow through sticks at night.' },
      { title: 'Make Giant Papier-Mache Egg', description: 'Blow up large oval balloon to ~20in long. Cook flour paste (1 cup flour to 3 cups water). Kids layer brown paper dipped in paste - 3 full layers. Leave overnight to dry fully.' },
      { title: 'Pop, Paint, and Place the Egg', description: 'Once fully dry, pop balloon. Paint white with chalk paint. Once dry, flick small brown speckles with toothbrush dipped in brown paint. Place in nest.' }
    ],
    tips: [
      'Gather far more sticks than seems needed - nest eats material. Go back for more rather than running short.',
      'Resist urge to tidy weave - messier looks more authentic. Pull a few sticks at odd angles if too neat.',
      'Angle frame stakes 10 degrees outward for natural bowl curvature - wider at top, narrower at base.',
      'Leave egg to dry fully before popping balloon - should sound hollow before popping.'
    ],
    ecoNote: 'Leave standing through autumn as wildlife habitat first. In late winter, pull stakes and compost. Every branch, twig, leaf, rope, and hessian piece composts completely. Papier-mache egg dissolves in rain.',
    relatedBuilds: ['eco-mushroom-playhouse', 'living-tunnel', 'giant-rainbow-arch']
  },
  {
    id: 'living-tunnel',
    title: 'Living Tunnel',
    category: 'Weekend Builds',
    difficulty: 'easy',
    timeEstimate: '2-3 hours to build',
    ageRange: '3-12',
    cost: '$25-35',
    imageUrl: '/builds/wiggle.png',
    badge: 'Eco Build',
    description: 'Two rows of arched stakes lashed together, seeded with climbing plants. Takes 2-3 hours to build. By midsummer it becomes a fully enclosed living green tunnel bursting with flowers - and runner beans to eat.',
    tools: ['Rubber mallet', 'Garden fork', 'Trowel'],
    materials: [
      { name: 'Wooden garden stakes (6ft)', quantity: '16 stakes (8 per side)', link: 'https://www.homedepot.com' },
      { name: 'Extra tall stakes (7-8ft)', quantity: '2 stakes', link: 'https://www.homedepot.com' },
      { name: 'Thick jute rope', quantity: '1 reel', link: 'https://www.homedepot.com' },
      { name: 'Jute twine', quantity: '2 large balls', link: 'https://www.homedepot.com' },
      { name: 'Wood chips, gravel, or flat stones', quantity: 'For floor path', link: 'https://www.localnursery.com' },
      { name: 'Runner bean seeds', quantity: '1 packet - one full side', link: 'https://www.localnursery.com' },
      { name: 'Sweet pea seeds', quantity: '1 packet', link: 'https://www.localnursery.com' },
      { name: 'Morning glory seeds', quantity: '1 packet', link: 'https://www.localnursery.com' },
      { name: 'Nasturtium seeds', quantity: '1 packet', link: 'https://www.localnursery.com' }
    ],
    steps: [
      { title: 'Mark the Two Rows', description: 'Stretch two lengths of string parallel, 3ft apart and 15ft long. Mark a stake position every 2ft along each row - 8 positions per side, 16 total.' },
      { title: 'Hammer All the Stakes', description: 'Hammer 6ft stake at every marked position, pushing each in at least 12in deep. Use two 7-8ft stakes for the entrance arch at one end.' },
      { title: 'Bend and Lash the Arches', description: 'Push top of left stake toward right stake until tips meet at center. Lash firmly with jute twine - at least 6 wraps. Repeat for all 8 pairs. Run rope along full top ridge tying each apex.' },
      { title: 'Tie Horizontal String Lines', description: 'Run lines of jute twine horizontally along both sides at 8in intervals from ground to arch. Kids tie lower lines (up to 3ft), adults do higher ones.' },
      { title: 'Frame the Entrance Arch', description: 'The entrance arch uses 7-8ft stakes for drama. Lash horizontal bar across top - old broomstick or thick branch. Hang a sign or wind chime.' },
      { title: 'Lay the Floor Path', description: 'Kids lay path along inside floor between stakes - wood chips, gravel, flat stones, or pressed fallen leaves. Kids choose material and design layout.' },
      { title: 'Prepare Soil and Plant Seeds', description: 'Dig shallow trench 4in deep along outside base of both rows. Mix in compost. Water trench before planting. Runner beans on one side, sweet peas/morning glories/nasturtiums on other.' },
      { title: 'Make the Weekly Growth Chart', description: 'Kids draw tunnel outline on large card, mark each planting spot with seed type and name. Each week measure tallest shoot. By week 8 the chart is remarkable.' }
    ],
    tips: [
      'Hammer every stake in at least 12 inches - shallow stakes pull out in wind.',
      'Water every day for first three weeks - seeds need consistent moisture to germinate.',
      'Start runner beans indoors 2 weeks early for head start - 3-4in seedlings plant out faster.',
      'Orient tunnel east-west so both sides get sun at different times of day.'
    ],
    ecoNote: 'Pull stakes at end of season, chop for compost. All plant material breaks down into rich compost over winter. Jute rope and twine compost completely. Collect seeds at end of summer - year two costs nothing.',
    relatedBuilds: ['giant-nest', 'giant-rainbow-arch', 'eco-mushroom-playhouse']
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
