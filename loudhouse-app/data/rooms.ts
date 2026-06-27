export interface StudioRoom {
  id: string;
  name: string;
  planet: string;
  description: string;
  features: string[];
  hourlyRate: number;
  image: string;
}

export const rooms: StudioRoom[] = [
  {
    id: 'mercury',
    name: 'Mercury Room',
    planet: 'mercury',
    description: 'Our intimate vocal booth — perfect for focused recording sessions and vocal tracking.',
    features: ['Vocal Booth', 'Neumann U87', 'Pro Tools HDX', 'Acoustic Treatment'],
    hourlyRate: 75,
    image: 'https://static.wixstatic.com/media/1efb99_0304330fa6104037917ce8dbce63c64a~mv2.jpg/v1/fill/w_800,h_600,al_c,q_85/1efb99_0304330fa6104037917ce8dbce63c64a~mv2.jpg',
  },
  {
    id: 'venus',
    name: 'Venus Room',
    planet: 'venus',
    description: 'A versatile mid-size room ideal for solo artists and small group sessions.',
    features: ['Mid-Size Live Room', 'SSL Console', 'Multiple Mic Options', 'Lounge Area'],
    hourlyRate: 100,
    image: 'https://static.wixstatic.com/media/1efb99_0304330fa6104037917ce8dbce63c64a~mv2.jpg/v1/fill/w_800,h_600,al_c,q_85/1efb99_0304330fa6104037917ce8dbce63c64a~mv2.jpg',
  },
  {
    id: 'mars',
    name: 'Mars Room',
    planet: 'mars',
    description: 'High-energy production suite built for beat-making and full production sessions.',
    features: ['Production Setup', 'MIDI Controllers', 'Monitor Speakers', 'Sample Library'],
    hourlyRate: 125,
    image: 'https://static.wixstatic.com/media/1efb99_0304330fa6104037917ce8dbce63c64a~mv2.jpg/v1/fill/w_800,h_600,al_c,q_85/1efb99_0304330fa6104037917ce8dbce63c64a~mv2.jpg',
  },
  {
    id: 'jupiter',
    name: 'Jupiter Room',
    planet: 'jupiter',
    description: 'Our flagship room — the largest space for full band recordings and major projects.',
    features: ['Full Band Setup', 'Live Room + ISO Booths', 'Premium Outboard Gear', 'Client Lounge'],
    hourlyRate: 175,
    image: 'https://static.wixstatic.com/media/1efb99_0304330fa6104037917ce8dbce63c64a~mv2.jpg/v1/fill/w_800,h_600,al_c,q_85/1efb99_0304330fa6104037917ce8dbce63c64a~mv2.jpg',
  },
  {
    id: 'saturn',
    name: 'Saturn Room',
    planet: 'saturn',
    description: 'Mixing and mastering suite with treated acoustics for critical listening.',
    features: ['Mixing Console', 'Mastering Chain', 'Reference Monitors', 'Surround Sound'],
    hourlyRate: 150,
    image: 'https://static.wixstatic.com/media/1efb99_0304330fa6104037917ce8dbce63c64a~mv2.jpg/v1/fill/w_800,h_600,al_c,q_85/1efb99_0304330fa6104037917ce8dbce63c64a~mv2.jpg',
  },
  {
    id: 'pluto',
    name: 'Pluto Room',
    planet: 'pluto',
    description: 'Creative content room for podcasts, voiceovers, and content creation.',
    features: ['Podcast Setup', 'Video Recording', 'Streaming Ready', 'Green Screen'],
    hourlyRate: 85,
    image: 'https://static.wixstatic.com/media/1efb99_0304330fa6104037917ce8dbce63c64a~mv2.jpg/v1/fill/w_800,h_600,al_c,q_85/1efb99_0304330fa6104037917ce8dbce63c64a~mv2.jpg',
  },
];

export const BOOKING_URL = 'https://pocketsuite.io/book/340loudhouse/items';
