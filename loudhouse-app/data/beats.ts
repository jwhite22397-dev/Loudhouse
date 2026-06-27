export type BeatGenre =
  | 'Trap'
  | 'R&B'
  | 'Hip-Hop'
  | 'Drill'
  | 'Afrobeat'
  | 'Pop'
  | 'Soul';

export type LicenseType = 'basic' | 'premium' | 'exclusive';

export interface BeatLicense {
  type: LicenseType;
  label: string;
  price: number;
  description: string;
  includes: string[];
}

export interface Beat {
  id: string;
  title: string;
  producer: string;
  genre: BeatGenre;
  bpm: number;
  key: string;
  tags: string[];
  coverArt: string;
  previewUrl: string;
  plays: number;
  likes: number;
  licenses: BeatLicense[];
  createdAt: string;
}

const defaultLicenses = (basic: number, premium: number, exclusive: number): BeatLicense[] => [
  {
    type: 'basic',
    label: 'Basic Lease',
    price: basic,
    description: 'MP3 + WAV, up to 50K streams',
    includes: ['MP3 File', 'WAV File', '50K Stream Limit', 'Credit Required'],
  },
  {
    type: 'premium',
    label: 'Premium Lease',
    price: premium,
    description: 'Stems + unlimited streams',
    includes: ['MP3 + WAV', 'Track Stems', 'Unlimited Streams', 'Music Video Rights'],
  },
  {
    type: 'exclusive',
    label: 'Exclusive Rights',
    price: exclusive,
    description: 'Full ownership, beat removed from store',
    includes: ['Full Ownership', 'All Stems', 'Unlimited Use', 'Beat Removed From Store'],
  },
];

export const beats: Beat[] = [
  {
    id: '1',
    title: 'Midnight in Atlanta',
    producer: 'LoudHouse Juice',
    genre: 'Trap',
    bpm: 140,
    key: 'F# Minor',
    tags: ['dark', 'hard', '808'],
    coverArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
    previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    plays: 12450,
    likes: 892,
    licenses: defaultLicenses(29.99, 79.99, 299.99),
    createdAt: '2026-06-15',
  },
  {
    id: '2',
    title: 'Velvet Dreams',
    producer: 'Ced G',
    genre: 'R&B',
    bpm: 92,
    key: 'A Major',
    tags: ['smooth', 'soulful', 'vibes'],
    coverArt: 'https://images.unsplash.com/photo-1511379938541-c1f69419868d?w=400&h=400&fit=crop',
    previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    plays: 8930,
    likes: 654,
    licenses: defaultLicenses(24.99, 69.99, 249.99),
    createdAt: '2026-06-12',
  },
  {
    id: '3',
    title: 'Pressure',
    producer: 'Stodgy',
    genre: 'Drill',
    bpm: 145,
    key: 'C Minor',
    tags: ['drill', 'aggressive', 'uk'],
    coverArt: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400&h=400&fit=crop',
    previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    plays: 15600,
    likes: 1102,
    licenses: defaultLicenses(34.99, 89.99, 349.99),
    createdAt: '2026-06-10',
  },
  {
    id: '4',
    title: 'Sunset Blvd',
    producer: 'AdrianMares',
    genre: 'Hip-Hop',
    bpm: 88,
    key: 'D Major',
    tags: ['chill', 'west coast', 'groovy'],
    coverArt: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop',
    previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    plays: 6780,
    likes: 445,
    licenses: defaultLicenses(19.99, 59.99, 199.99),
    createdAt: '2026-06-08',
  },
  {
    id: '5',
    title: 'Lagos Nights',
    producer: 'LoudHouse Juice',
    genre: 'Afrobeat',
    bpm: 105,
    key: 'G Major',
    tags: ['afrobeat', 'dance', 'vibes'],
    coverArt: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop',
    previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    plays: 9340,
    likes: 723,
    licenses: defaultLicenses(29.99, 74.99, 279.99),
    createdAt: '2026-06-05',
  },
  {
    id: '6',
    title: 'Heartbreak Hotel',
    producer: 'Ced G',
    genre: 'Soul',
    bpm: 75,
    key: 'E Minor',
    tags: ['emotional', 'soul', 'ballad'],
    coverArt: 'https://images.unsplash.com/photo-1459749411175-04bf52929827?w=400&h=400&fit=crop',
    previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    plays: 5120,
    likes: 389,
    licenses: defaultLicenses(24.99, 64.99, 229.99),
    createdAt: '2026-06-01',
  },
  {
    id: '7',
    title: 'No Cap',
    producer: 'Stodgy',
    genre: 'Trap',
    bpm: 150,
    key: 'B Minor',
    tags: ['bouncy', 'melodic', 'fire'],
    coverArt: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=400&fit=crop',
    previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
    plays: 18900,
    likes: 1456,
    licenses: defaultLicenses(39.99, 99.99, 399.99),
    createdAt: '2026-05-28',
  },
  {
    id: '8',
    title: 'Glow Up',
    producer: 'AdrianMares',
    genre: 'Pop',
    bpm: 120,
    key: 'C Major',
    tags: ['pop', 'upbeat', 'radio'],
    coverArt: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&h=400&fit=crop',
    previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    plays: 7450,
    likes: 567,
    licenses: defaultLicenses(29.99, 79.99, 299.99),
    createdAt: '2026-05-25',
  },
];

export const genres: BeatGenre[] = ['Trap', 'R&B', 'Hip-Hop', 'Drill', 'Afrobeat', 'Pop', 'Soul'];
