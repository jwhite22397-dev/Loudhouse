# LoudHouse Studios Mobile App

A mobile app for [LoudHouse Studios](https://www.loudhousestudios.com/) — Atlanta's premier recording studio. This app mirrors the studio website and adds a BeatStars-style beat marketplace for selling beats to artists.

## Features

### Studio
- **Home** — Hero banner, programs, studio rooms, featured beats, quick links
- **Studio Rooms** — Six planet-themed rooms (Mercury, Venus, Mars, Jupiter, Saturn, Pluto) with booking
- **Programs** — Showcase (Frequency Check), Song Submission, Date Night, Internship, Specials
- **Shop** — Official LoudHouse merch (T-Shirt, Hoodie)
- **About** — Studio story, vision, and team

### Beat Marketplace (BeatStars-style)
- Browse beats by genre (Trap, R&B, Hip-Hop, Drill, Afrobeat, Pop, Soul)
- Search by title, producer, or tags
- In-app audio preview with persistent player bar
- Three license tiers per beat: Basic Lease, Premium Lease, Exclusive Rights
- Beat detail pages with BPM, key, tags, play counts, and purchase flow

## Tech Stack

- **Expo SDK 56** with React Native
- **Expo Router** for file-based navigation
- **expo-av** for beat preview playback
- **TypeScript** throughout

## Getting Started

```bash
cd loudhouse-app
npm install
npm start
```

Then scan the QR code with Expo Go on your phone, or press `w` for web, `a` for Android emulator, `i` for iOS simulator.

## Project Structure

```
loudhouse-app/
├── app/                    # Screens (Expo Router)
│   ├── (tabs)/            # Tab navigation
│   │   ├── index.tsx      # Home
│   │   ├── beats.tsx      # Beat marketplace
│   │   ├── studio.tsx     # Studio rooms
│   │   ├── shop.tsx       # Merch shop
│   │   └── more.tsx       # About, team, links
│   ├── beat/[id].tsx      # Beat detail + purchase
│   ├── program/[id].tsx   # Program details
│   ├── about.tsx          # About page
│   └── booking.tsx        # Room booking
├── components/            # Reusable UI components
├── context/               # Audio player context
├── data/                  # Static content (beats, rooms, merch, team)
└── constants/             # Theme and colors
```

## Next Steps for Production

1. **Payment integration** — Connect Stripe or similar for beat purchases and merch
2. **Backend API** — Replace static beat data with a CMS or database
3. **Real audio files** — Upload actual beat previews to cloud storage
4. **Push notifications** — New beats, booking reminders, event alerts
5. **User accounts** — Artist profiles, purchase history, favorites
6. **App Store deployment** — Build with EAS and submit to iOS/Android stores

## Booking

Studio booking links to PocketSuite: https://pocketsuite.io/book/340loudhouse/items

## License

Private — LoudHouse Studios
