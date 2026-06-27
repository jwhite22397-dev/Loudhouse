export interface Room {
  id: string;
  name: string;
  planet: string;
  tagline: string;
  description: string;
  pricePerHour: number;
  color: string;
  accent: string;
  features: string[];
  available: boolean;
}

export type LicenseType = 'mp3' | 'wav' | 'trackout' | 'exclusive';

export interface BeatLicense {
  type: LicenseType;
  name: string;
  price: number;
  perks: string[];
}

export interface Beat {
  id: string;
  title: string;
  producer: string;
  artworkColor: string;
  artworkAccent: string;
  bpm: number;
  key: string;
  genre: string;
  tags: string[];
  audioUrl: string;
  plays: number;
  licenses: BeatLicense[];
  exclusive?: boolean;
}

export interface MerchItem {
  id: string;
  name: string;
  price: number;
  category: string;
  color: string;
  accent: string;
  badge?: string;
  sizes?: string[];
}

export interface StudioEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  color: string;
}

export interface StudioSection {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  cta: string;
  icon: string;
  gradient: readonly [string, string, ...string[]];
  bullets: string[];
}

export interface CartItem {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  qty: number;
  kind: 'beat' | 'merch' | 'room';
  color: string;
}
