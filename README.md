# LoudHouse Studios – Mobile App

A full-featured React Native (Expo) mobile app for **LoudHouse Studios**, Atlanta's premier recording studio. The app replicates and extends the studio's website with a native mobile experience, including a **BeatStars-style beat marketplace**.

---

## Features

### Studio Experience
- **Home Screen** – Cinematic hero banner, studio stats, services grid, photo gallery, and client showcase
- **Booking Screen** – Select rooms (Studio A, Studio B, Date Night), choose date/time/duration, see pricing, request bookings
- **Events Screen** – Browse upcoming Frequency Check showcases, workshops, and Date Night experiences; RSVP / buy tickets
- **More Screen** – Song submission, internship program, specials/deals, merch, contact info, and social links

### Beat Store (BeatStars-style)
- Browse beats in **grid** or **list** view
- **Search** by title, genre, or tags
- **Filter** by genre: Trap, R&B, Hip-Hop, Afrobeats, Trap/Soul, Drill
- **Sort** by: Popular, Newest, Price Low → High, Price High → Low
- Featured beat carousel with play counts and likes
- **Mini player** that floats above the tab bar while a beat is "playing"
- **Beat Detail Screen**:
  - Audio player UI with waveform visualization
  - Full stats (BPM, key, plays, likes)
  - **3-tier licensing**: Basic ($29.99), Premium ($69.99), Exclusive ($299.99)
  - License feature comparison (MP3/WAV/Stems, stream limits, rights)
  - Like / save beat
  - Add to cart or buy now

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| **Expo ~51** | Cross-platform React Native framework |
| **React Navigation v7** | Tab + Stack navigation |
| **expo-linear-gradient** | Gold gradient UI accents |
| **expo-blur** | Blur effects |
| **expo-av** | Audio playback (wired up for real beats) |
| **@expo/vector-icons** | Ionicons throughout |
| **react-native-safe-area-context** | Safe area handling |
| **react-native-reanimated** | Smooth animations |
| **TypeScript** | Full type safety |

---

## Design

- **Color Palette**: Deep black (`#0a0a0a`) + Gold (`#C9A84C`)  
- **Typography**: System bold/heavy with letter-spacing for studio aesthetic  
- **Dark-only UI** matching the LoudHouse brand

---

## Getting Started

### Prerequisites
- Node.js 18+
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (Mac) or Android Studio, or **Expo Go** app on your phone

### Install & Run

```bash
npm install
npx expo start
```

Then:
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan the QR code with **Expo Go** on your phone

---

## Project Structure

```
src/
├── navigation/
│   └── AppNavigator.tsx     # Root stack + bottom tab navigation
├── screens/
│   ├── HomeScreen.tsx        # Landing / studio overview
│   ├── BeatStoreScreen.tsx   # Beat marketplace (BeatStars-style)
│   ├── BeatDetailScreen.tsx  # Beat detail + licensing + player
│   ├── BookingScreen.tsx     # Studio room booking
│   ├── EventsScreen.tsx      # Events & Frequency Check showcase
│   └── MoreScreen.tsx        # Submission, internship, specials, contact
├── components/
│   ├── BeatCard.tsx          # Grid and list beat card
│   ├── MiniPlayer.tsx        # Floating mini player
│   └── Header.tsx            # Reusable screen header
├── constants/
│   ├── colors.ts             # Design tokens (black + gold palette)
│   └── data.ts               # Mock beats, events, rooms data
└── types/
    └── index.ts              # TypeScript types & navigation params
```

---

## Adding Real Beats

1. Upload beat audio files (MP3/WAV) to your storage (e.g., AWS S3, Supabase Storage, Cloudinary)
2. Add the `audioUrl` to each beat entry in `src/constants/data.ts`
3. The `expo-av` package is already installed — wire up `Audio.Sound` in `BeatDetailScreen.tsx`

---

## Payment Integration

The purchase flow is ready for a payment SDK. Recommended integrations:
- **Stripe** via `@stripe/stripe-react-native`
- **PayPal** via `react-native-paypal`
- The cart and purchase buttons are scaffolded in `BeatDetailScreen.tsx`

---

## Deploying

```bash
# Build for iOS App Store
npx eas build --platform ios

# Build for Google Play
npx eas build --platform android
```

Requires an [Expo EAS](https://expo.dev/eas) account.

---

## License

Built for LoudHouse Studios. All rights reserved.
