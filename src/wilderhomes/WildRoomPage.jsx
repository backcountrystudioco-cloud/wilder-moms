import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const rooms = [
  {
    id: 'mud',
    label: 'The Mud Room',
    tagline: 'Tactile - Loud - Messy',
    title: 'The Mud Room',
    subtitle: 'where hands learn to think',
    description: 'A dedicated space for mess, mixing, pouring, and sensory immersion. The noisiest room. The most important one.',
    principle: 'Mess needs a container. Not to limit it - to liberate it. When children know exactly where mess is permitted, they go deeper into it.',
    spaces: ['indoor', 'outdoor'],
    color: '#8C4A14',
    accentColor: '#F0D2B4',
    implementations: {
      indoor: [
        {
          name: 'Sensory Station',
          description: 'Low bins with sand, dried beans, rice, kinetic sand. Tools nearby: ladles, funnels, molds.',
          icon: 'pour'
        },
        {
          name: 'Textured Wall',
          description: 'Bark panels, smooth river stones, woven hessian, cork squares at varying heights for finger exploration.',
          icon: 'touch'
        },
        {
          name: 'Water Wall',
          description: 'Vertical gutters and pipes with funnels. Pour, splash, watch flow.',
          icon: 'water'
        },
        {
          name: 'Barefoot Path',
          description: 'Alternating textures: smooth stones, artificial turf, bubble wrap. Remove shoes, explore.',
          icon: 'walk'
        },
      ],
      outdoor: [
        {
          name: 'Mud Kitchen',
          description: 'Low counters, real bowls, wooden spoons. Mix dirt, water, leaves. The classic outdoor lab.',
          icon: 'kitchen'
        },
        {
          name: 'Texture Trail',
          description: 'Bark chips, pea gravel, smooth stones, grass. Walk barefoot and discover.',
          icon: 'trail'
        },
        {
          name: 'Tactile Garden Bed',
          description: 'Lamb\'s ear, moss, sage, ornamental grasses. Raised beds where everything is meant to touch.',
          icon: 'garden'
        },
        {
          name: 'Rain Station',
          description: 'Collecting rain, pouring, mixing. Waders optional, curiosity required.',
          icon: 'rain'
        },
      ],
      transition: 'The Threshold Zone: A sheltered spot between inside and out. Wipe stations, apron hooks, a place to get messy before entering the house.',
    },
    tips: [
      'Start with one sensory bin, expand from there',
      'Contain the mess to feel liberating, not overwhelming',
      'Rotate materials weekly to renew interest',
      'Let them get completely dirty - that is the point',
    ],
  },
  {
    id: 'grow',
    label: 'The Grow Room',
    tagline: 'Patient - Living - Seasonal',
    title: 'The Grow Room',
    subtitle: 'where children learn to wait',
    description: 'A space dedicated to growing things. Where the timeline is set by nature, not by a child. The slowest room. One of the most powerful ones.',
    principle: 'The timeline belongs to the plant, not the child. In a world of instant feedback, a garden is radical.',
    spaces: ['outdoor', 'indoor'],
    color: '#5A6428',
    accentColor: '#C8D890',
    implementations: {
      indoor: [
        {
          name: 'Windowsill Herbs',
          description: 'Basil, mint, chives. Kitchen-accessible. Snip and taste. Watch roots grow in water glasses.',
          icon: 'herb'
        },
        {
          name: 'Terrarium',
          description: 'Enclosed world in glass. Moss, ferns, tiny stones. Self-contained ecosystems to observe.',
          icon: 'terrarium'
        },
        {
          name: 'Sprouting Station',
          description: 'Mung beans in jars, wheatgrass on trays. Watch transformation happen in days, not weeks.',
          icon: 'sprout'
        },
        {
          name: 'Kitchen Scrap Garden',
          description: 'Green onions regrow in water. Carrot tops produce seeds. Potato eyes become vines.',
          icon: 'scrap'
        },
      ],
      outdoor: [
        {
          name: 'Raised Bed Plot',
          description: 'Their own square foot. Carrots, radishes, beans. First harvests are addictive.',
          icon: 'bed'
        },
        {
          name: 'Teepee Trellis',
          description: 'Climbing beans create a hideout. Eat while hiding. Secret garden logic.',
          icon: 'teepee'
        },
        {
          name: 'Pizza Garden',
          description: 'Tomatoes, basil, oregano in a semicircle. Harvest and assemble.',
          icon: 'pizza'
        },
        {
          name: 'Pollinator Patch',
          description: 'Flowers that attract butterflies and bees. Watch the ecosystem arrive.',
          icon: 'bee'
        },
      ],
      transition: 'The Waiting Window: An indoor spot with a clear sightline to the outdoor garden. Check on it daily. Notice changes. Practice patience.',
    },
    tips: [
      'Choose fast growers: radishes sprout in a week',
      'Let them water, even too much. Overwatering is learning.',
      'Harvest together and eat what you grow',
      'Keep a growth journal with dated photos',
    ],
  },
  {
    id: 'build',
    label: 'The Build Room',
    tagline: 'Structured - Purposeful - Physical',
    title: 'The Build Room',
    subtitle: 'where agency is born',
    description: 'A space with materials, tools, and a problem to solve. No instruction manual. The most empowering room in the house.',
    principle: 'Agency is not taught. It is built. Children who are given materials and a problem - and then left alone to solve it - develop a relationship with their own capability.',
    spaces: ['indoor', 'outdoor'],
    color: '#6B3A2A',
    accentColor: '#D4B4A4',
    implementations: {
      indoor: [
        {
          name: 'Loose Parts Shelf',
          description: 'Cardboard tubes, fabric scraps, cardboard boxes, wooden blocks. Real materials, not toys.',
          icon: 'shelf'
        },
        {
          name: 'Cardboard Construction Zone',
          description: 'Large boxes become forts, castles, cars. Tape, scissors, imagination.',
          icon: 'cardboard'
        },
        {
          name: 'Tool Corner',
          description: 'Wooden mallets, child-safe screwdrivers, large clips. Real tools, scaled for small hands.',
          icon: 'tools'
        },
        {
          name: 'Make-Do Cart',
          description: 'Mobile cart with weekly rotating materials. Bring the Build Room anywhere.',
          icon: 'cart'
        },
      ],
      outdoor: [
        {
          name: 'Log Construction Area',
          description: 'Short log rounds, long branches, stakes. Build structures that stay.',
          icon: 'logs'
        },
        {
          name: 'Stick Fort',
          description: 'Branch walls, fabric roofs. Changes with the seasons as sticks fall.',
          icon: 'fort'
        },
        {
          name: 'Mud Brick Station',
          description: 'Mix dirt and water, pack into forms. Build walls, ovens, villages.',
          icon: 'brick'
        },
        {
          name: 'Salvage Pile',
          description: 'Collected "junk": pallets, pipes, old tiles. Premium building materials. Free.',
          icon: 'pile'
        },
      ],
      transition: 'The Making Threshold: Materials roll between spaces on carts. Outdoor builds inform indoor projects. The distinction blurs.',
    },
    tips: [
      'Real tools, not toys - a small hammer and nails works best',
      'Loose parts accumulate naturally - start collecting',
      'The best builds have no right answer',
      'Document builds with photos - they become planning tools',
    ],
  },
  {
    id: 'still',
    label: 'The Still Room',
    tagline: 'Quiet - Observational - Slow',
    title: 'The Still Room',
    subtitle: 'where children learn to see',
    description: 'A quiet corner for watching, noticing, drawing, pressing. The antidote to overstimulation. The rarest and most needed room.',
    principle: 'Stillness is a skill. Design for it. We design houses full of stimulation and then wonder why children cannot be still.',
    spaces: ['indoor', 'outdoor'],
    color: '#464F5F',
    accentColor: '#C8D0D8',
    implementations: {
      indoor: [
        {
          name: 'Cozy Nook',
          description: 'Floor cushions, canopy, low light. A corner that invites sitting. Nothing else required.',
          icon: 'nook'
        },
        {
          name: 'Bird Window',
          description: 'Cushioned seat at a window with a view. Binoculars nearby. Aiming to see.',
          icon: 'bird'
        },
        {
          name: 'Nature Table',
          description: 'Low shelf with found objects. Rotate weekly. Let them arrange.',
          icon: 'table'
        },
        {
          name: 'Sound Corner',
          description: 'Headphones, nature sounds. An island of calm in a loud house.',
          icon: 'sound'
        },
      ],
      outdoor: [
        {
          name: 'Observation Hut',
          description: 'Small structure with viewing slots at child height. Hide, watch, notice.',
          icon: 'hut'
        },
        {
          name: 'Sitting Stones',
          description: 'Arranged stones in a garden. Come, sit, look. Return weekly to notice changes.',
          icon: 'stones'
        },
        {
          name: 'Tunnel Entrance',
          description: 'Short tunnel leading to a hidden circle. Privacy invites presence.',
          icon: 'tunnel'
        },
        {
          name: 'Seasonal Posts',
          description: 'Marked spots with painted stones. Return each week. Track the year.',
          icon: 'posts'
        },
      ],
      transition: 'The Notice Wall: A shared space to record observations. Drawings, photos, notes. What did you see?',
    },
    tips: [
      'A chair and a view is enough',
      'Keep materials minimal - empty space invites presence',
      'Return weekly to notice changes',
      'Model stillness yourself first',
    ],
  },
  {
    id: 'wonder',
    label: 'The Wonder Room',
    tagline: 'Magical - Seasonal - Storytelling',
    title: 'The Wonder Room',
    subtitle: 'where imagination takes root',
    description: 'The room that changes with the seasons. Where small magic lives - fairy doors, moon gardens, night walks, seasonal altars.',
    principle: 'Wonder is a design choice. Make it on purpose. Magic does not happen by accident - it is placed there deliberately.',
    spaces: ['outdoor', 'indoor'],
    color: '#7A5C14',
    accentColor: '#F0E4A0',
    implementations: {
      indoor: [
        {
          name: 'Seasonal Table',
          description: 'Low shelf with seasonal treasures. Pressed leaves, nuts, feathers, shells. Changes with the year.',
          icon: 'seasonal'
        },
        {
          name: 'Fairy Garden',
          description: 'Miniature world in a pot. Tiny furniture, moss, beads. Inhabit the small.',
          icon: 'fairy'
        },
        {
          name: 'Discovery Basket',
          description: 'Weekly finds: unusual seed pods, strange stones, bark with interesting patterns. Mystery in a box.',
          icon: 'basket'
        },
        {
          name: 'Story Corner',
          description: 'Soft fabric, pillows, puppets. The space invites becoming someone else.',
          icon: 'story'
        },
      ],
      outdoor: [
        {
          name: 'Fairy Door',
          description: 'A door in a tree. No bigger than a child\'s hand. Who lives there?',
          icon: 'door'
        },
        {
          name: 'Moon Garden',
          description: 'White flowers that open at night. Plant it, tend it, visit it after dark.',
          icon: 'moon'
        },
        {
          name: 'Night Walk Path',
          description: 'Lantern walk after dark. Follow the path. Discover what appears at night.',
          icon: 'night'
        },
        {
          name: 'Seasonal Altar',
          description: 'A place for offerings: autumn leaves, spring flowers, summer stones. Rotate with rituals.',
          icon: 'altar'
        },
      ],
      transition: 'The Mystery Box: A shared container of unexplained natural objects. Questions welcome. Answers not required.',
    },
    tips: [
      'Rotate weekly with seasonal finds',
      'Let children arrange - their curation tells you what matters',
      'Small, specific, surprising beats large and obvious',
      'Questions are more valuable than answers',
    ],
  },
]

const spaceTypes = [
  { id: 'all', label: 'All Spaces' },
  { id: 'indoor', label: 'Indoors' },
  { id: 'outdoor', label: 'Outdoors' },
]

const iconSvgs = {
  pour: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />,
  touch: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />,
  water: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v18m0 0a10 10 0 01-10-10 10 10 0 0110 10m0 0a10 10 0 0010 10 10 10 0 01-10 10" />,
  walk: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />,
  kitchen: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />,
  trail: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />,
  garden: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />,
  rain: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />,
  herb: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />,
  terrarium: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />,
  sprout: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />,
  scrap: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />,
  bed: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />,
  teepee: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />,
  pizza: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />,
  bee: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />,
  shelf: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 10h16M4 14h16M4 18h16" />,
  cardboard: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />,
  tools: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />,
  cart: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />,
  logs: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />,
  fort: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />,
  brick: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />,
  pile: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />,
  nook: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />,
  bird: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
  table: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />,
  sound: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />,
  hut: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />,
  stones: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />,
  tunnel: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />,
  posts: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />,
  seasonal: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />,
  fairy: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />,
  basket: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />,
  story: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />,
  door: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />,
  moon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />,
  night: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />,
  altar: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />,
}

export default function WildRoomPage() {
  const [activeSpace, setActiveSpace] = useState('all')
  const [savedRooms, setSavedRooms] = useState([])
  const [expandedRoom, setExpandedRoom] = useState(null)
  const [showPlanner, setShowPlanner] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('wilder_wild_room_plan')
    if (saved) {
      try {
        setSavedRooms(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to parse saved rooms')
      }
    }
  }, [])

  const saveRooms = (roomsToSave) => {
    localStorage.setItem('wilder_wild_room_plan', JSON.stringify(roomsToSave))
    setSavedRooms(roomsToSave)
  }

  const toggleRoom = (roomId) => {
    const newRooms = savedRooms.includes(roomId)
      ? savedRooms.filter(id => id !== roomId)
      : [...savedRooms, roomId]
    saveRooms(newRooms)
  }

  const toggleExpand = (roomId, e) => {
    e.stopPropagation()
    setExpandedRoom(expandedRoom === roomId ? null : roomId)
  }

  const filteredRooms = activeSpace === 'all' 
    ? rooms 
    : rooms.filter(r => r.spaces?.includes(activeSpace))

  const getSpaceLabel = (room) => {
    if (!room.spaces || room.spaces.length === 2) return 'Indoor and Outdoor'
    return room.spaces[0] === 'indoor' ? 'Indoor only' : 'Outdoor only'
  }

  const getIcon = (iconName) => {
    return (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {iconSvgs[iconName] || iconSvgs.nook}
      </svg>
    )
  }

  return (
    <div className="min-h-screen bg-cream pt-20 pb-12">
      <div className="max-w-2xl mx-auto px-4">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <a 
            href="/wilder-homes/environment" 
            className="text-ember text-sm font-medium mb-4 inline-flex items-center gap-1 hover:underline"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Environment
          </a>
          <h1 className="font-serif text-4xl md:text-5xl text-ink mb-3">The Wild Room</h1>
          <p className="text-inkl text-lg max-w-xl mx-auto">
            Every home needs a Wild Room. Not a room - a design intention. 
            Plan your spaces and bring nature home.
          </p>
        </motion.header>

        {/* Saved Rooms Banner */}
        {savedRooms.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <button
              onClick={() => setShowPlanner(!showPlanner)}
              className="w-full p-4 rounded-2xl border-2 border-ember transition-all flex items-center justify-between"
              style={{ backgroundColor: showPlanner ? '#8C1E00' : 'white' }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: showPlanner ? 'rgba(255,255,255,0.2)' : '#8C1E00' }}>
                  <svg className="w-5 h-5" fill="none" stroke={showPlanner ? 'white' : '#8C1E00'} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="font-serif text-lg" style={{ color: showPlanner ? 'white' : '#3C1E00' }}>
                    Your Wild Room Plan
                  </p>
                  <p className="text-sm" style={{ color: showPlanner ? 'rgba(255,255,255,0.7)' : '#783C1E' }}>
                    {savedRooms.length} {savedRooms.length === 1 ? 'room' : 'rooms'} selected
                  </p>
                </div>
              </div>
              <span className="text-sm font-medium" style={{ color: showPlanner ? 'white' : '#8C1E00' }}>
                {showPlanner ? 'Hide' : 'View'}
              </span>
            </button>

            {showPlanner && (
              <div className="p-4 bg-white rounded-b-2xl border-2 border-t-0 border-ember">
                <div className="flex flex-wrap gap-2 mb-4">
                  {savedRooms.map(roomId => {
                    const room = rooms.find(r => r.id === roomId)
                    return (
                      <div
                        key={roomId}
                        className="flex items-center gap-2 px-3 py-2 rounded-full text-white text-sm"
                        style={{ backgroundColor: room.color }}
                      >
                        <span className="font-serif italic">{room.label}</span>
                        <button
                          onClick={() => toggleRoom(roomId)}
                          className="ml-1 opacity-70 hover:opacity-100"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    )
                  })}
                </div>
                <button
                  onClick={() => {
                    localStorage.removeItem('wilder_wild_room_plan')
                    setSavedRooms([])
                    setShowPlanner(false)
                  }}
                  className="px-4 py-2 text-sm text-inkl hover:text-ember"
                >
                  Clear All
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* Space Filter */}
        <div className="flex gap-2 mb-8">
          {spaceTypes.map(space => (
            <button
              key={space.id}
              onClick={() => setActiveSpace(space.id)}
              className="flex-1 px-4 py-3 rounded-xl border-2 transition-all"
              style={{
                borderColor: activeSpace === space.id ? '#8C1E00' : '#D2B496',
                backgroundColor: activeSpace === space.id ? '#8C1E00' : 'white',
                color: activeSpace === space.id ? 'white' : '#783C1E',
              }}
            >
              <span className="text-sm font-medium">{space.label}</span>
            </button>
          ))}
        </div>

        {/* Room Cards */}
        <div className="space-y-4">
          {filteredRooms.map(room => {
            const isSaved = savedRooms.includes(room.id)
            const isExpanded = expandedRoom === room.id
            
            return (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl overflow-hidden"
                style={{ 
                  border: isSaved ? '3px solid ' + room.color : '2px solid #D2B496',
                }}
              >
                {/* Header - Clickable */}
                <button
                  onClick={(e) => toggleExpand(room.id, e)}
                  className="w-full p-6 text-left"
                  style={{ backgroundColor: room.color }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-medium uppercase tracking-wider opacity-70">{room.tagline}</span>
                      </div>
                      <h2 className="font-serif text-2xl text-white mb-1">
                        {room.title}
                      </h2>
                      <p className="text-base text-white/80 italic">"{room.subtitle}"</p>
                      <p className="text-sm text-white/70 mt-2">{room.description}</p>
                    </div>
                    <div className="flex flex-col items-end gap-3">
                      <svg 
                        className={`w-6 h-6 text-white transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Space indicator */}
                  <div className="mt-4 flex items-center gap-3">
                    <span className="text-xs px-3 py-1 rounded-full bg-white/20 text-white">
                      {getSpaceLabel(room)}
                    </span>
                    {isSaved && (
                      <span className="text-xs px-3 py-1 rounded-full bg-white text-sm flex items-center gap-1" style={{ color: room.color }}>
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                        In your plan
                      </span>
                    )}
                  </div>
                </button>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="bg-white">
                    <div className="p-6 border-t border-inkll/10">
                      {/* Architect's Principle */}
                      <div className="p-4 rounded-xl mb-6" style={{ backgroundColor: '#F0F0D2' }}>
                        <p className="text-xs font-medium uppercase tracking-wider mb-2" style={{ color: '#5A6428' }}>
                          Architect's Principle
                        </p>
                        <p className="text-base italic leading-relaxed" style={{ color: '#3C3800' }}>
                          "{room.principle}"
                        </p>
                      </div>

                      {/* Transition Zone */}
                      {room.implementations.transition && (
                        <div className="mb-6 p-4 rounded-xl border-2 border-dashed" style={{ borderColor: room.accentColor }}>
                          <div className="flex items-start gap-3">
                            <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke={room.color} viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                            </svg>
                            <div>
                              <p className="text-xs font-medium uppercase tracking-wider mb-1" style={{ color: room.color }}>
                                The Bridge
                              </p>
                              <p className="text-sm text-inkl italic">{room.implementations.transition}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Indoor Implementations */}
                      {room.implementations.indoor && (
                        <div className="mb-6">
                          <h3 className="font-serif text-lg text-ink mb-4 flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Indoors
                          </h3>
                          <div className="grid md:grid-cols-2 gap-3">
                            {room.implementations.indoor.map((impl, i) => (
                              <div key={i} className="p-4 rounded-xl" style={{ backgroundColor: '#FAF6EE' }}>
                                <div className="flex items-center gap-2 mb-2">
                                  <span style={{ color: room.color }}>{getIcon(impl.icon)}</span>
                                  <h4 className="text-sm font-medium text-ink">{impl.name}</h4>
                                </div>
                                <p className="text-xs text-inkl leading-relaxed">{impl.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Outdoor Implementations */}
                      {room.implementations.outdoor && (
                        <div className="mb-6">
                          <h3 className="font-serif text-lg text-ink mb-4 flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>
                            Outdoors
                          </h3>
                          <div className="grid md:grid-cols-2 gap-3">
                            {room.implementations.outdoor.map((impl, i) => (
                              <div key={i} className="p-4 rounded-xl" style={{ backgroundColor: '#FAF6EE' }}>
                                <div className="flex items-center gap-2 mb-2">
                                  <span style={{ color: room.color }}>{getIcon(impl.icon)}</span>
                                  <h4 className="text-sm font-medium text-ink">{impl.name}</h4>
                                </div>
                                <p className="text-xs text-inkl leading-relaxed">{impl.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Tips */}
                      <div className="mb-6">
                        <h3 className="font-serif text-lg text-ink mb-3">Where to start</h3>
                        <ul className="space-y-2">
                          {room.tips.map((tip, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-inkl">
                              <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: room.accentColor }}>
                                <span className="text-xs font-medium" style={{ color: room.color }}>{i + 1}</span>
                              </span>
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Action */}
                      <div className="pt-4 border-t border-inkll/10">
                        <button
                          onClick={() => toggleRoom(room.id)}
                          className="w-full py-3 px-4 rounded-full font-medium text-sm transition-all"
                          style={{
                            backgroundColor: isSaved ? 'transparent' : room.color,
                            color: isSaved ? room.color : 'white',
                            border: `2px solid ${room.color}`,
                          }}
                        >
                          {isSaved ? 'Remove from Plan' : 'Add to Plan'}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>

        {filteredRooms.length === 0 && (
          <div className="text-center py-12">
            <p className="text-inkl">No rooms match this filter. Try "All Spaces".</p>
          </div>
        )}
      </div>
    </div>
  )
}
