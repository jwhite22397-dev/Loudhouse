# LoudHouse Studios — Mobile App

A cross-platform (iOS + Android) mobile app for **LoudHouse Studios**, a professional recording
studio in Atlanta, GA. It mirrors the studio's website ([loudhousestudios.com](https://www.loudhousestudios.com/))
and adds a built-in **beat marketplace** where producers can sell beats to artists — BeatStars style.

Built with **Expo + React Native + TypeScript**.

## Features

### Studio (website clone)
- **Space-themed home** with hero, quick links, and featured content
- **Book a Room** — the studio's six rooms, each named after a planet (Mercury, Venus, Mars,
  Jupiter, Saturn, Pluto), with availability, features, session-length & start-time selection, and
  add-to-cart booking
- **Programs** — Frequency Check showcase, LoudHouse Music Group (song submission), Date Night,
  Internship, and Specials
- **Shop / Merch** — t-shirts, hoodies, and accessories with size selection
- **Events** — Frequency Check, workshops, and open mics
- **Contact & location** with tap-to-call/email and social links

### Beat Marketplace (BeatStars-style)
- Browse & **search** beats by title, producer, or mood
- **Filter by genre** (Trap, R&B, Drill, Pop, Hyperpop, Lofi)
- **Audio streaming** with a global persistent **mini-player** (play/pause, scrub, progress)
- Beat detail page with **waveform scrubbing**, BPM / key / genre specs, and tags
- **Tiered licensing** — MP3 Lease, WAV Lease, Trackout (stems), and Exclusive Rights
- **Cart & checkout** flow shared across beats, merch, and bookings

## Tech stack

| Concern | Library |
| --- | --- |
| Framework | Expo (SDK 56) + React Native |
| Language | TypeScript |
| Navigation | React Navigation (bottom tabs + native stack) |
| Audio | `expo-audio` |
| Gradients | `expo-linear-gradient` |
| Icons | `@expo/vector-icons` (Ionicons) |
| State | React Context (cart + player) |

## Project structure

```
src/
  components/   Reusable UI (header, mini-player, beat row, buttons, starfield)
  context/      CartContext, PlayerContext (global audio)
  data/         Types + mock data (rooms, beats, merch, sections, events)
  navigation/   Root stack + bottom tabs
  screens/      Home, Book, Beats, Shop, More, detail & checkout screens
  theme/        Colors, gradients, spacing, typography
```

## Running the app

```bash
npm install
npx expo start
```

Then:
- Press `i` for the iOS simulator, `a` for an Android emulator, or
- Scan the QR code with the **Expo Go** app on your phone.

## Notes

- The beat audio uses royalty-free demo tracks (SoundHelix) so playback works out of the box.
  Swap the `audioUrl` fields in `src/data/beats.ts` with your own beat previews.
- Checkout is a front-end demo — no real payments are processed. Wire it up to Stripe (or
  BeatStars/your distributor) to go live.
- Studio info (phone, email, beats, merch, rooms) lives in `src/data/` for easy editing.
```
