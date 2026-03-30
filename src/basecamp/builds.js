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
    relatedBuilds: ['fort-sticks', 'sheet-tunnel']
  },

  // WEEKEND BUILDS
  {
    id: 'fairy-door-treehouse',
    title: 'The Fairy Door Treehouse',
    category: 'Weekend Builds',
    difficulty: 'hard',
    timeEstimate: '5-7 hours',
    ageRange: '3-12',
    cost: '$100-180',
    description: 'A whimsical small treehouse with a spiral staircase, window boxes with tiny flowers, and a fairy-sized door. The magical details make every visit feel like discovering a secret world.',
    tools: ['Circular saw', 'Drill', 'Level', 'Ladder', 'Hammer', 'Measuring tape', 'Safety goggles'],
    materials: [
      { name: 'Cedar planks (1x6)', quantity: '12 boards', link: 'https://www.homedepot.com' },
      { name: 'Plywood sheets (1/2 inch)', quantity: '2 sheets', link: 'https://www.homedepot.com' },
      { name: 'Wooden dowels (1 inch)', quantity: '8 feet', link: 'https://www.homedepot.com' },
      { name: 'Hinges (small, brass)', quantity: '2 pairs', link: 'https://www.homedepot.com' },
      { name: 'Exterior wood screws', quantity: '1 box', link: 'https://www.homedepot.com' },
      { name: 'Waterproof wood glue', quantity: '1 bottle', link: 'https://www.homedepot.com' },
      { name: 'Child-safe wood stain', quantity: '1 quart', link: 'https://www.homedepot.com' }
    ],
    steps: [
      { title: 'Choose the Perfect Tree', description: 'Select a healthy tree with a sturdy trunk at least 8 inches in diameter. Mark two strong horizontal branches for platform support, ideally 5-7 feet off the ground.' },
      { title: 'Build the Platform Frame', description: 'Cut four cedar planks to create a 4x4 foot square frame. Use metal brackets at each corner. Attach horizontal support beams to tree trunk using heavy-duty bolts.' },
      { title: 'Install the Floor', description: 'Cut plywood to fit snugly inside the frame. Leave a 2-inch gap around the tree trunk for growth. Secure with screws every 8 inches.' },
      { title: 'Create the Spiral Staircase', description: 'Cut triangular step pieces from cedar, spacing them 8 inches apart vertically. Attach each step to a central wooden dowel, alternating sides.' },
      { title: 'Build the Walls and Roof', description: 'Construct three walls using cedar planks with gaps for ventilation. Create a peaked roof using plywood covered with shingles.' },
      { title: 'Install the Fairy Door', description: 'Cut a 12x20 inch arched door opening. Hang a miniature wooden door on brass hinges. Add two windows with shutters.' },
      { title: 'Add Magical Details', description: 'Apply wood stain in warm honey tones. Install tiny lanterns with battery-operated candles. Add a sign at the entrance.' }
    ],
    tips: [
      'Always use pressure-treated wood for any contact with tree sap',
      'Sand all edges thoroughly - little hands touch everything',
      'Build during dry weather',
      'Add a pulley system for raising snacks without climbing'
    ],
    relatedBuilds: ['ninja-course-platform', 'tire-swing-frame', 'reading-hut']
  },
  {
    id: 'ninja-course-platform',
    title: 'Ninja Course Platform',
    category: 'Weekend Builds',
    difficulty: 'hard',
    timeEstimate: '6-8 hours',
    ageRange: '5-12',
    cost: '$150-250',
    description: 'An action-packed A-frame with slackline, climbing rope, cargo net, and rings. Kids burn energy mastering each obstacle while building real strength and coordination.',
    tools: ['Power drill', 'Socket wrench set', 'Level', 'Shovel', 'Post hole digger', 'Measuring tape'],
    materials: [
      { name: 'Pressure-treated 4x4 posts', quantity: '6 posts (10ft)', link: 'https://www.homedepot.com' },
      { name: 'Pressure-treated 2x6 planks', quantity: '4 planks (12ft)', link: 'https://www.homedepot.com' },
      { name: 'Heavy-duty eye bolts', quantity: '8', link: 'https://www.homedepot.com' },
      { name: 'Dacron slackline (50ft)', quantity: '1', link: 'https://www.rei.com' },
      { name: 'Climbing rope (100ft)', quantity: '1', link: 'https://www.rei.com' },
      { name: 'Cargo net (6x8ft)', quantity: '1', link: 'https://www.amazon.com' },
      { name: 'Olympic rings set', quantity: '1 pair', link: 'https://www.amazon.com' },
      { name: 'Concrete mix', quantity: '4 bags', link: 'https://www.homedepot.com' }
    ],
    steps: [
      { title: 'Dig Support Holes', description: 'Mark six hole locations in an A-frame pattern, spaced 8 feet apart at the base. Dig holes 2 feet deep.' },
      { title: 'Set the Main Frame', description: 'Stand two 4x4 posts vertically in holes, creating two A-frames. Cross-pairs at 6 feet height using 2x6 beams. Fill holes with concrete and allow 48 hours to cure.' },
      { title: 'Add Cross-Beams', description: 'Connect the two A-frames with horizontal 2x6 beams at multiple heights (3ft, 5ft, 7ft).' },
      { title: 'Install the Slackline', description: 'Attach ratchet straps to trees or posts at 3 feet height. Thread the slackline through and tension until there is 1-2 inches of sag.' },
      { title: 'Hang the Climbing Rope', description: 'Thread rope through an eye bolt at 8 feet height. Tie knots 12 inches apart starting from the bottom.' },
      { title: 'Mount the Cargo Net', description: 'Attach cargo net to the upper portion of one A-frame using heavy zip ties. Angle it at 75 degrees.' },
      { title: 'Install the Rings', description: 'Hang Olympic rings from a crossbeam at 6 feet height using chains. Position them 18 inches apart.' }
    ],
    tips: [
      'Install foam padding on all sharp corners',
      'Check slackline tension weekly',
      'Add a wooden handrail for beginners',
      'Keep landing zones clear and add rubber mulch'
    ],
    relatedBuilds: ['climbing-boulder-wall', 'tire-swing-frame', 'fairy-door-treehouse']
  },
  {
    id: 'sandbox-with-cover',
    title: 'Sandbox With Cover',
    category: 'Weekend Builds',
    difficulty: 'hard',
    timeEstimate: '5-7 hours',
    ageRange: '3-10',
    cost: '$120-200',
    description: 'A large sandbox with built-in bench seating that transforms into a performance stage. The folding wooden cover raises on gas struts to reveal sand or create a stage.',
    tools: ['Circular saw', 'Drill', 'Level', 'Clamps', 'Corner braces', 'Wood screws', 'Sandpaper'],
    materials: [
      { name: 'Cedar 2x12 boards', quantity: '8 boards (8ft)', link: 'https://www.homedepot.com' },
      { name: 'Cedar 2x6 boards', quantity: '6 boards (8ft)', link: 'https://www.homedepot.com' },
      { name: '2x4 pressure-treated framing', quantity: '10 boards', link: 'https://www.homedepot.com' },
      { name: 'Landscape fabric', quantity: '10x10 feet', link: 'https://www.homedepot.com' },
      { name: 'Play sand', quantity: '500 lbs', link: 'https://www.localnursery.com' },
      { name: 'Gas struts (20 inch)', quantity: '4', link: 'https://www.amazon.com' },
      { name: 'Hinges (heavy duty)', quantity: '4 pairs', link: 'https://www.homedepot.com' },
      { name: 'Exterior wood stain', quantity: '1 gallon', link: 'https://www.homedepot.com' }
    ],
    steps: [
      { title: 'Build the Base Frame', description: 'Cut 2x4 pressure-treated lumber to create a 6x8 foot rectangular frame. Install corner braces at each joint.' },
      { title: 'Line the Interior', description: 'Cut landscape fabric to cover the interior bottom and sides up to 4 inches high.' },
      { title: 'Create Bench Seating', description: 'Build bench frames using 2x12 cedar attached to the inside of the base frame. Make them 12 inches wide and 10 inches high.' },
      { title: 'Add the Sandbox Floor', description: 'Cut pressure-treated plywood to cover the bottom. Drill drainage holes across the surface.' },
      { title: 'Build the Folding Cover', description: 'Create two hinged sections using 2x6 cedar planks. Each section should be 4 feet wide. Add piano hinges along the center seam.' },
      { title: 'Install Gas Struts', description: 'Attach gas struts between the bench frame and cover underside. When fully open at 90 degrees, the cover should stay open.' },
      { title: 'Fill and Finish', description: 'Fill with 500 pounds of play sand. Stain all exposed cedar.' }
    ],
    tips: [
      'Place sandbox in partial shade - full sun makes sand too hot',
      'Include a cover with screen mesh to keep cats out',
      'Add buried plastic dinosaurs for discovery during play',
      'Consider adding wheels to the bench legs'
    ],
    relatedBuilds: ['mud-kitchen-deluxe', 'fairy-door-treehouse', 'reading-hut']
  },
  {
    id: 'zip-line-station',
    title: 'Zip Line Station',
    category: 'Weekend Builds',
    difficulty: 'hard',
    timeEstimate: '5-6 hours',
    ageRange: '5-12',
    cost: '$80-150',
    description: 'An exhilarating zipline between two trees with a hand-grip handle and brake system that kids can control. Delivers that amazing flying sensation safely.',
    tools: ['Drill', 'Socket wrench', 'Pulleys', 'Cable tensioner', 'Measuring tape', 'Ladder', 'Cable cutters'],
    materials: [
      { name: 'Galvanized steel cable (100ft)', quantity: '1 roll', link: 'https://www.homedepot.com' },
      { name: 'Zipline trolley with bearings', quantity: '1', link: 'https://www.amazon.com' },
      { name: 'Tree-safe cable straps', quantity: '8', link: 'https://www.amazon.com' },
      { name: 'Cable turnbuckle tensioner', quantity: '2', link: 'https://www.homedepot.com' },
      { name: 'Tree protection pads', quantity: '4', link: 'https://www.amazon.com' },
      { name: 'Tarp swing seat with harness', quantity: '1', link: 'https://www.amazon.com' },
      { name: 'Wooden handle grips', quantity: '2 pairs', link: 'https://www.amazon.com' },
      { name: 'Rubber brake pads', quantity: '2', link: 'https://www.homedepot.com' }
    ],
    steps: [
      { title: 'Assess Tree and Route', description: 'Identify two trees at least 40 feet apart with trunks minimum 12 inches diameter. The starting tree should be 3-5 feet higher.' },
      { title: 'Install Tree Protection', description: 'Wrap tree pads around both anchor points where cable will touch bark.' },
      { title: 'Run the Cable', description: 'Feed cable through tree-safe straps at both anchor points. Pull taut and secure with cable clamps. Cable should be minimum 7 feet high.' },
      { title: 'Calculate Proper Sag', description: 'The cable should have a 6-8% sag in the middle. Too tight strains trees, too loose and rider drags.' },
      { title: 'Install the Trolley', description: 'Thread cable through the trolleys bearing mechanism. Test that it rolls freely along the entire length.' },
      { title: 'Attach the Seat', description: 'Connect harness seat to trolley. Leave 18-24 inches of slack so seat can be pulled upright for riding.' },
      { title: 'Install Brake Zone', description: 'Mount rubber brake pads at the end where rider naturally slows. Position so rider grabs them to slow before reaching anchor.' }
    ],
    tips: [
      'Never install near power lines - maintain 30 feet minimum clearance',
      'Add a landing platform at the end for safe dismount',
      'Teach kids to brake BEFORE grabbing seat handles',
      'Apply lubricant to bearings every few months'
    ],
    relatedBuilds: ['tire-swing-frame', 'ninja-course-platform', 'climbing-boulder-wall']
  },
  {
    id: 'climbing-boulder-wall',
    title: 'Climbing Boulder Wall',
    category: 'Weekend Builds',
    difficulty: 'hard',
    timeEstimate: '6-8 hours',
    ageRange: '4-12',
    cost: '$100-180',
    description: 'A free-standing climbing wall with slab sections for beginners, steep face for intermediates, and a crack for advanced climbers. All holds can be repositioned.',
    tools: ['Drill', 'Level', 'Measuring tape', 'Wood screws', 'Carriage bolts', 'Socket set', 'Safety glasses'],
    materials: [
      { name: 'Pressure-treated 4x4 posts', quantity: '4 posts (8ft)', link: 'https://www.homedepot.com' },
      { name: 'Plywood sheets (3/4 inch)', quantity: '3 sheets (4x8)', link: 'https://www.homedepot.com' },
      { name: 'Climbing holds (mixed pack)', quantity: '50 holds', link: 'https://www.amazon.com' },
      { name: 'T-nuts', quantity: '50', link: 'https://www.amazon.com' },
      { name: '2x6 horizontal beams', quantity: '6 boards', link: 'https://www.homedepot.com' },
      { name: 'Foam padding tiles', quantity: '24 tiles', link: 'https://www.amazon.com' },
      { name: 'Rubber mulch', quantity: '6 bags', link: 'https://www.homedepot.com' },
      { name: 'Wood stain', quantity: '1 gallon', link: 'https://www.homedepot.com' }
    ],
    steps: [
      { title: 'Build the Frame Structure', description: 'Create an A-frame using 4x4 posts. The front face should angle back slightly at the top (5 degrees) for slab climbing.' },
      { title: 'Sheathe the Climbing Face', description: 'Cut and attach 3/4 inch plywood sheets to the frame. The face should be 8 feet wide and 6 feet tall.' },
      { title: 'Install T-Nuts', description: 'Drill holes every 6-8 inches across the face in a grid. Drill 3/8 inch holes and tap in T-nuts from the back.' },
      { title: 'Plan the Route', description: 'Sketch three routes: easy slab with large holds, intermediate vertical, advanced overhang.' },
      { title: 'Mount the Holds', description: 'Thread 3/8 inch bolt through hold, then through T-nut, and secure with washer and nut from back.' },
      { title: 'Create the Crack Section', description: 'Position two parallel 2x4 boards at a slight angle to create a crack. Add smaller holds on one side.' },
      { title: 'Build Landing Zone', description: 'Cover ground with foam padding tiles and surround with rubber mulch. Extend 3 feet beyond wall base.' }
    ],
    tips: [
      'Start holds low and close together, move higher as kids grow',
      'Angle some holds outward at 15-30 degrees for realistic climbing',
      'Rotate holds every few weeks',
      'Add a slackline next to wall for warm-up'
    ],
    relatedBuilds: ['ninja-course-platform', 'fairy-door-treehouse', 'zip-line-station']
  },
  {
    id: 'reading-hut',
    title: 'The Reading Hut',
    category: 'Weekend Builds',
    difficulty: 'hard',
    timeEstimate: '5-6 hours',
    ageRange: '3-10',
    cost: '$80-150',
    description: 'An octagonal sanctuary crafted from bamboo poles with soft cushions for story time. Peek-through windows let light in while maintaining enclosure. A hanging lantern casts warm light for evening reading.',
    tools: ['Pruning shears', 'Drill', 'Rope (natural hemp)', 'Ground stakes', 'Level', 'Measuring tape', 'Safety gloves'],
    materials: [
      { name: 'Bamboo poles (8ft, 1 inch)', quantity: '24 poles', link: 'https://www.amazon.com' },
      { name: 'Bamboo poles (6ft, 1/2 inch)', quantity: '16 poles', link: 'https://www.amazon.com' },
      { name: 'Hemp rope', quantity: '100 feet', link: 'https://www.homedepot.com' },
      { name: 'Canvas drop cloth', quantity: '2 large', link: 'https://www.amazon.com' },
      { name: 'Floor cushions (set of 6)', quantity: '1 set', link: 'https://www.amazon.com' },
      { name: 'Paper lantern (large)', quantity: '1', link: 'https://www.amazon.com' },
      { name: 'LED candle (set)', quantity: '1 set', link: 'https://www.amazon.com' },
      { name: 'Ground anchor stakes', quantity: '12', link: 'https://www.homedepot.com' }
    ],
    steps: [
      { title: 'Mark the Octagon Foundation', description: 'Use string and stakes to mark an octagon 8 feet across. Mark each of the 8 corner points.' },
      { title: 'Plant the Vertical Poles', description: 'Dig holes 6 inches deep at each corner. Place 8-foot bamboo poles and fill with soil, tamping firmly.' },
      { title: 'Weave the Lower Wall', description: 'Take 6-foot horizontal poles and lash to verticals at 6 inches and 3 feet using hemp rope. Weave thin bamboo between them.' },
      { title: 'Create Peek-Through Windows', description: 'Cut irregular window shapes at varying heights using pruning shears. Add small shutters hinged at top.' },
      { title: 'Build the Cone Roof', description: 'Bring all 8 vertical poles together at the top and bind tightly with rope. Weave thin bamboo across for thatched appearance.' },
      { title: 'Line the Floor', description: 'Cover ground with landscape fabric then foam padding. Arrange floor cushions in the center.' },
      { title: 'Hang the Lantern', description: 'Create a pulley system using hemp rope through roof peak. Hang paper lantern from pulley.' }
    ],
    tips: [
      'Treat bamboo ends with linseed oil to prevent cracking',
      'The structure is flexible - do not overtighten lashings',
      'Add a small speaker for story time ambiance',
      'Consider a step stool for younger children'
    ],
    relatedBuilds: ['fairy-door-treehouse', 'sandbox-with-cover', 'sunset-pergola']
  },
  {
    id: 'water-ball-launch-station',
    title: 'Water Ball Launch Station',
    category: 'Weekend Builds',
    difficulty: 'hard',
    timeEstimate: '4-5 hours',
    ageRange: '4-12',
    cost: '$60-100',
    description: 'A backyard water battle headquarters with a pump-powered balloon launcher that sends water balloons soaring up to 50 feet. Includes a target board with splash zones.',
    tools: ['PVC pipe cutter', 'Drill', 'Saw', 'Wrench set', 'Measuring tape', 'Safety goggles'],
    materials: [
      { name: 'PVC pipe (2 inch, Schedule 40)', quantity: '30 feet', link: 'https://www.homedepot.com' },
      { name: 'PVC elbows and T-joints', quantity: '12 assorted', link: 'https://www.homedepot.com' },
      { name: 'Water balloon pump (large)', quantity: '1', link: 'https://www.amazon.com' },
      { name: 'Water balloons (500 count)', quantity: '2 bags', link: 'https://www.amazon.com' },
      { name: 'PVC cement and primer', quantity: '1 kit', link: 'https://www.homedepot.com' },
      { name: 'Stakes and bungee cords', quantity: '1 set', link: 'https://www.amazon.com' },
      { name: 'Rubberized tarp (splash zone)', quantity: '1 (10x10)', link: 'https://www.amazon.com' },
      { name: 'Plywood for target stand', quantity: '1 sheet', link: 'https://www.homedepot.com' }
    ],
    steps: [
      { title: 'Design the Launcher Frame', description: 'Cut PVC to create an A-frame base 3 feet wide and 4 feet tall. Add a horizontal arm at the top that pivots.' },
      { title: 'Build the Pumping Chamber', description: 'Create a T-junction near the base of the arm with a chamber. Install a hand pump to this chamber.' },
      { title: 'Create the Launch Cup', description: 'Cut the end of the launch arm into a cup shape using flexible 2-inch PVC bent into a U.' },
      { title: 'Install the Firing Mechanism', description: 'Add a sprinkler valve handle to the pumping chamber for easy on/off control.' },
      { title: 'Build the Target Board', description: 'Construct a 4x6 foot target using plywood. Cut 3 concentric circles for scoring zones.' },
      { title: 'Prepare the Splash Zone', description: 'Lay rubberized tarp beneath and around target. Create raised edges to contain splash.' },
      { title: 'Safety Setup', description: 'Install ground stakes with rope around launch zone to keep runners clear during firing.' }
    ],
    tips: [
      'Practice with empty balloons first to find the perfect launch angle',
      'Store balloons in a bucket of water to keep them pre-filled',
      'Add food coloring to water for visible splash marks',
      'Keep spare pumps on hand'
    ],
    relatedBuilds: ['mud-kitchen-deluxe', 'tire-swing-frame', 'sunset-pergola']
  },
  {
    id: 'tire-swing-frame',
    title: 'Tire Swing Frame',
    category: 'Weekend Builds',
    difficulty: 'hard',
    timeEstimate: '6-8 hours',
    ageRange: '3-12',
    cost: '$100-180',
    description: 'A custom A-frame with three swinging options: a classic tire swing, a wriggling snake swing, and a trapeze bar. The heavy-duty frame handles multiple swinging styles simultaneously.',
    tools: ['Post hole digger', 'Drill', 'Socket wrench', 'Level', 'Measuring tape', 'Shovel', 'Concrete mix'],
    materials: [
      { name: 'Pressure-treated 6x6 posts', quantity: '4 posts (12ft)', link: 'https://www.homedepot.com' },
      { name: 'Heavy-duty swing hangers', quantity: '6', link: 'https://www.homedepot.com' },
      { name: 'Tire swing chain (48 inch)', quantity: '1 set', link: 'https://www.amazon.com' },
      { name: 'Rubber tractor tire', quantity: '1', link: 'https://www.localtiredealer.com' },
      { name: 'Snake swing (rubber coated)', quantity: '1', link: 'https://www.amazon.com' },
      { name: 'Trapeze bar (14 inch)', quantity: '1', link: 'https://www.amazon.com' },
      { name: 'Swing seats (belt style)', quantity: '2', link: 'https://www.amazon.com' },
      { name: 'Concrete mix', quantity: '8 bags', link: 'https://www.homedepot.com' }
    ],
    steps: [
      { title: 'Dig the Post Holes', description: 'Mark four holes in a rectangle 10 feet long and 4 feet wide at the base. Each hole should be 3 feet deep.' },
      { title: 'Set the Main Frame', description: 'Stand two pairs of 6x6 posts in their holes, angled outward to form an A-frame. Cross-connect each pair at 7 feet height with a horizontal beam.' },
      { title: 'Install the Top Beam', description: 'Connect the two A-frames at the top with a horizontal 6x6 beam, 10 feet long. Secure with four 1/2 inch bolts through each joint.' },
      { title: 'Pour the Concrete', description: 'Mix and pour concrete into all four holes. Allow 72 hours minimum before any swinging.' },
      { title: 'Mount the Tire Swing', description: 'Hang the tire from a single point using a 48-inch chain connected to a swivel hanger. Mount at the center of the top beam.' },
      { title: 'Install Snake Swing and Trapeze', description: 'Hang snake swing and trapeze bar 24 inches apart on either side of the tire swing.' },
      { title: 'Safety Check and Ground Prep', description: 'Ensure all hardware is torqued properly. Add rubber mulch beneath swing zone to a depth of 12 inches.' }
    ],
    tips: [
      'Use chains instead of ropes for tire swings - ropes twist and wear out',
      'Paint the frame with child-safe wood stain',
      'The tractor tire should be hollow-side up to prevent water',
      'Consider adding a disc bottom tire swing for toddlers'
    ],
    relatedBuilds: ['ninja-course-platform', 'zip-line-station', 'fairy-door-treehouse']
  },
  {
    id: 'mud-kitchen-deluxe',
    title: 'Mud Kitchen Deluxe',
    category: 'Weekend Builds',
    difficulty: 'hard',
    timeEstimate: '5-7 hours',
    ageRange: '3-12',
    cost: '$100-180',
    description: 'A multi-station outdoor cooking laboratory with running water via hand pump, chalkboard for menu planning, pegboard for utensil storage, and multiple mixing stations at different heights.',
    tools: ['Drill', 'Saw', 'Level', 'Measuring tape', 'Wrench set', 'Sandpaper', 'Staple gun'],
    materials: [
      { name: 'Cedar 2x6 boards', quantity: '12 boards (8ft)', link: 'https://www.homedepot.com' },
      { name: 'Cedar 4x4 posts', quantity: '4 posts (4ft)', link: 'https://www.homedepot.com' },
      { name: 'Exterior plywood (3/4 inch)', quantity: '2 sheets', link: 'https://www.homedepot.com' },
      { name: 'Hand water pump', quantity: '1', link: 'https://www.amazon.com' },
      { name: 'Copper pipe and fittings', quantity: '10 feet', link: 'https://www.homedepot.com' },
      { name: 'Chalkboard sheets', quantity: '2', link: 'https://www.amazon.com' },
      { name: 'Pegboard sheets', quantity: '2', link: 'https://www.homedepot.com' },
      { name: 'Stainless steel bowls', quantity: '6', link: 'https://www.amazon.com' }
    ],
    steps: [
      { title: 'Build the Base Frame', description: 'Create an L-shaped frame using 4x4 cedar posts and 2x6 horizontal supports. Main counter at 3 feet high, lower 24-inch station for toddlers.' },
      { title: 'Install Countertops', description: 'Cut exterior plywood for main counters. Center station gets stainless steel basin. Other stations have solid plywood.' },
      { title: 'Mount the Water System', description: 'Install hand pump drawing from a 5-gallon water jug stored below. Connect copper pipe to spray nozzle.' },
      { title: 'Add the Chalkboard', description: 'Frame chalkboard plywood and mount on side at child height. Add shelf below for chalk storage.' },
      { title: 'Install the Pegboard', description: 'Mount pegboard on back wall above main counter. Add hooks for utensils.' },
      { title: 'Create Storage Solutions', description: 'Build open shelves below each station using cedar planks. Store buckets for mud ingredients: dirt, sand, water, leaves.' },
      { title: 'Seal and Weatherproof', description: 'Apply multiple coats of child-safe waterproof sealant to all surfaces.' }
    ],
    tips: [
      'Place near a garden area where mud overflow creates no problems',
      'Collect ingredients in labeled buckets for independent play',
      'Add a drain underneath the basin using landscape fabric and gravel',
      'Include magnifying glasses for nature exploration'
    ],
    relatedBuilds: ['sandbox-with-cover', 'water-ball-launch-station', 'reading-hut']
  },
  {
    id: 'sunset-pergola',
    title: 'Sunset Pergola',
    category: 'Weekend Builds',
    difficulty: 'hard',
    timeEstimate: '6-8 hours',
    ageRange: '3-12',
    cost: '$150-250',
    description: 'An open-sided shade structure with a swing bench, climbing roses that will cover the lattice, and a climbing rope. Golden hour light through the vines creates pure magic.',
    tools: ['Post hole digger', 'Drill', 'Level', 'Wrench set', 'Measuring tape', 'Saw', 'Concrete mix'],
    materials: [
      { name: 'Pressure-treated 6x6 posts', quantity: '6 posts (10ft)', link: 'https://www.homedepot.com' },
      { name: '2x8 cedar rafters', quantity: '8 boards (10ft)', link: 'https://www.homedepot.com' },
      { name: 'Lattice panels (cedar)', quantity: '4 panels', link: 'https://www.homedepot.com' },
      { name: 'Corrugated roof panels', quantity: '4 sheets', link: 'https://www.homedepot.com' },
      { name: 'Swing hangers and chains', quantity: '2 sets', link: 'https://www.amazon.com' },
      { name: 'Porch swing (6ft)', quantity: '1', link: 'https://www.amazon.com' },
      { name: 'Climbing rose bushes', quantity: '4', link: 'https://www.localnursery.com' },
      { name: 'Concrete mix', quantity: '10 bags', link: 'https://www.homedepot.com' }
    ],
    steps: [
      { title: 'Mark the Layout', description: 'Create a 12x10 foot rectangular structure. Mark six post locations - one at each corner and two in the middle.' },
      { title: 'Dig and Set Posts', description: 'Dig holes 3 feet deep. Set 6x6 posts ensuring they are perfectly vertical. Posts should extend 7 feet above ground.' },
      { title: 'Pour Concrete Footings', description: 'Mix and pour concrete into all six holes. Allow 72 hours to cure before building the roof.' },
      { title: 'Install the Beams', description: 'Attach two 2x8 beams across the top of posts at 7 feet height, running the 12-foot length.' },
      { title: 'Add Rafters and Lattice', description: 'Place eight 2x8 rafters perpendicular to beams, spaced 18 inches apart. Between rafters, install cedar lattice panels.' },
      { title: 'Build the Swing Bench', description: 'Install two heavy-duty swing hangers on interior beams, 4 feet apart. Hang 6-foot porch swing with 36-inch chains.' },
      { title: 'Add Climbing Rose Supports', description: 'Attach lattice or wire guides along posts and beams. Plant climbing roses at each post base.' }
    ],
    tips: [
      'Choose thornless climbing roses: "Blaze" or "Lady in Red" varieties',
      'Corrugated roof panels filter sunlight while blocking rain',
      'Add a removable bug screen panel for summer evenings',
      'Train rose canes horizontally along beams for maximum bloom'
    ],
    relatedBuilds: ['reading-hut', 'tire-swing-frame', 'fairy-door-treehouse']
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
