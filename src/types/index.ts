export interface Beat {
  id: string;
  title: string;
  producer: string;
  genre: string;
  bpm: number;
  key: string;
  duration: string;
  price: {
    basic: number;
    premium: number;
    exclusive: number;
  };
  tags: string[];
  plays: number;
  likes: number;
  imageUrl: string;
  audioUrl?: string;
  isFeatured?: boolean;
  isNew?: boolean;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  price: string;
  imageUrl?: string;
  category: 'showcase' | 'workshop' | 'open-mic' | 'date-night' | 'other';
}

export interface BookingRoom {
  id: string;
  name: string;
  description: string;
  capacity: number;
  hourlyRate: number;
  features: string[];
  imageUrl?: string;
}

export interface LicenseType {
  name: string;
  price: number;
  features: string[];
  color: string;
}

export type RootStackParamList = {
  MainTabs: undefined;
  BeatDetail: { beat: Beat };
  BookRoom: { room?: BookingRoom };
  EventDetail: { event: Event };
};

export type TabParamList = {
  Home: undefined;
  BeatStore: undefined;
  Book: undefined;
  Events: undefined;
  More: undefined;
};
