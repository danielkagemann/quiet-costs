# quiet-costs

Track where your monthly/yearly payments go.

A React Native app built with **Expo**, **Expo Router**, **NativeWind** (Tailwind CSS), and **expo-sqlite** for on-device storage.

## Features

- 📋 Track subscriptions with name, amount, billing cycle (monthly/yearly), and category
- 💰 See your total monthly and yearly spend at a glance
- 💾 Data stored locally on device using SQLite (no account required)
- 🎨 Clean UI styled with Tailwind CSS via NativeWind

## Tech Stack

| Library | Purpose |
|---|---|
| [Expo](https://expo.dev) | React Native framework & build tooling |
| [Expo Router](https://docs.expo.dev/router/introduction/) | File-based routing |
| [NativeWind](https://www.nativewind.dev) | Tailwind CSS for React Native |
| [expo-sqlite](https://docs.expo.dev/versions/latest/sdk/sqlite/) | On-device SQLite database |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (`npm install -g expo-cli`)
- iOS Simulator (macOS) or Android Emulator, or the [Expo Go](https://expo.dev/go) app

### Install

```bash
npm install
```

### Run

```bash
# Start the development server
npm start

# Open on Android
npm run android

# Open on iOS (macOS only)
npm run ios

# Open in browser
npm run web
```

## Project Structure

```
quiet-costs/
├── app/
│   ├── _layout.tsx    # Root layout with SQLite provider & navigation
│   ├── index.tsx      # Home screen — subscription list & totals
│   └── add.tsx        # Add subscription screen
├── assets/            # App icons and splash screen
├── global.css         # Tailwind CSS entry point
├── tailwind.config.js # Tailwind configuration
├── metro.config.js    # Metro bundler with NativeWind
└── babel.config.js    # Babel with NativeWind preset
```

