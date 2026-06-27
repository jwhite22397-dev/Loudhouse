import { Room } from './types';

export const rooms: Room[] = [
  {
    id: 'mercury',
    name: 'Mercury',
    planet: '☿',
    tagline: 'The Quick Session Room',
    description:
      'Compact and fast. Perfect for vocal takes, podcasts, and quick demos when you need to get in and capture the heat.',
    pricePerHour: 45,
    color: '#8C8C9E',
    accent: '#C9C2A6',
    features: ['Vocal booth', 'Neumann TLM 103', 'Pro Tools rig', 'Engineer included'],
    available: true,
  },
  {
    id: 'venus',
    name: 'Venus',
    planet: '♀',
    tagline: 'The Warm Vocal Suite',
    description:
      'Golden acoustics tuned for silky vocals and R&B sessions. Soft lighting, warm preamps, and a vibe that pulls the best out of any artist.',
    pricePerHour: 65,
    color: '#E8C16B',
    accent: '#FFE9B0',
    features: ['Tube preamp chain', 'Mood lighting', 'Vintage compressors', 'Lounge area'],
    available: true,
  },
  {
    id: 'mars',
    name: 'Mars',
    planet: '♂',
    tagline: 'The Trap & Rap Lab',
    description:
      'Hard-hitting and loud. Built for rap, trap, and high-energy sessions with a sub that shakes the walls.',
    pricePerHour: 70,
    color: '#E0573D',
    accent: '#FF9E7A',
    features: ['808-ready monitoring', 'Auto-tune live', 'RGB stage lights', 'Camera-ready'],
    available: true,
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    planet: '♃',
    tagline: 'The Flagship Mix Room',
    description:
      'The biggest room in the house. Full band tracking, professional mixing, and mastering all under one roof.',
    pricePerHour: 110,
    color: '#D89B5A',
    accent: '#F2C98A',
    features: ['SSL console', 'Full band tracking', 'ATC monitors', 'Mastering suite'],
    available: true,
  },
  {
    id: 'saturn',
    name: 'Saturn',
    planet: '♄',
    tagline: 'The Production Lab',
    description:
      'A beatmaker’s playground. MPCs, synths, and a producer on deck to help you craft the next hit from scratch.',
    pricePerHour: 75,
    color: '#C9A24B',
    accent: '#F4D98A',
    features: ['MPC + Maschine', 'Analog synths', 'MIDI controllers', 'Producer on staff'],
    available: false,
  },
  {
    id: 'pluto',
    name: 'Pluto',
    planet: '♇',
    tagline: 'The Content & Visual Room',
    description:
      'Shoot music videos, podcasts, and social content with cyclorama walls, pro lighting, and 4K cameras.',
    pricePerHour: 90,
    color: '#5AA9E0',
    accent: '#A8D7FF',
    features: ['Cyclorama wall', '4K cameras', 'LED panels', 'Green screen'],
    available: true,
  },
];
