# LoudHouse Studios Mobile App

An Expo React Native app that turns the LoudHouse Studios website into a mobile-first experience.

## Features

- LoudHouse-branded home screen with booking and beats shortcuts
- Planet-themed room browsing for Mercury, Venus, Saturn, Pluto, Mars, and Jupiter
- Event, showcase, song submission, internship, specials, and merch entry points
- BeatStars-style beat marketplace prototype with previews, license tiers, cart totals, and order handoff by email
- Contact actions for calling, emailing, and opening live LoudHouse web pages

## Run locally

```bash
npm install
npm start
```

Then open the Expo app on iOS, Android, or web.

## Notes

The beat store currently uses in-app sample catalog data and an email checkout handoff. It is structured so a future backend, Stripe checkout, audio preview storage, or beat delivery service can replace the mock data without redesigning the UI.
