# Breathing App - React Native Expo

**GitHub Repository:** https://github.com/mgkcloud/breathing-app

A React Native breathing exercise app built with Expo, implementing Huberman-style breathing protocols.

## ✨ Current Status: ✅ Complete

**Status:** Fully functional and ready to use
**Built by:** Ralph Autonomous Development System
**Completed:** 2026-01-22 (27 iterations)

## Features

- **3-Round Breathing Protocol**: Hyperventilation → Breath Hold → Exhale → Recovery
- **Visual Breathing Guide**: Animated circle with phase-specific animations
- **Heart Rate Tracking**: Record heart rate before/after rounds
- **O2 Saturation Tracking**: Optional O2 monitoring
- **Session History**: View past sessions with AsyncStorage persistence
- **Configurable Settings**: Customize rounds, breath counts, and durations
- **Calming UI**: Designed for relaxation and focus

## Quick Start

### Install Dependencies

```bash
npm install
```

### Run the App

```bash
# Start Expo development server
npm start

# Press 'i' for iOS simulator
# Press 'a' for Android emulator
# Press 'w' for web browser
```

## How to Use

1. **Start Session**: Press "Start Session" on the home screen
2. **Hyperventilation Phase**: Take 30 deep, rapid breaths (app counts them)
3. **Breath Hold**: Hold your breath for the target duration (default: 15 seconds)
4. **Record Heart Rate**: Enter your heart rate after breath hold
5. **Exhale**: Slowly exhale for 5 seconds
6. **Recovery**: Take deep breaths to recover
7. **Repeat**: Complete all 3 rounds
8. **View History**: Check your session history anytime

## Technical Stack

- **Expo SDK 51**
- **React Native 0.74**
- **TypeScript**
- **Expo Router** (file-based navigation)
- **React Native Reanimated** (smooth animations)
- **React Native SVG** (breathing circle)
- **AsyncStorage** (session persistence)

## Project Structure

```
breathing-app/
├── app/                    # Expo Router screens
│   ├── _layout.tsx        # Root layout with navigation
│   ├── index.tsx          # Main breathing screen
│   ├── history.tsx        # Session history
│   └── settings.tsx       # Configuration
├── components/            # React components
│   ├── BreathingProtocol.tsx   # Main breathing logic
│   ├── BreathingCircle.tsx     # Animated circle
│   └── PhaseInstructions.tsx   # Phase text/guidance
├── hooks/                 # Custom React hooks
│   └── useBreathingSession.ts  # Session state management
├── utils/                 # Utility functions
│   └── storage.ts         # AsyncStorage operations
├── types/                 # TypeScript types
│   └── breathing.ts       # Session, Round, Phase types
└── constants/             # App constants
    └── config.ts          # Default config, colors, instructions
```

## Configuration

Default settings (configurable in Settings screen):

- **Total Rounds**: 3
- **Hyperventilation Breaths**: 30
- **Breath Hold Target**: 15 seconds
- **Exhale Duration**: 5 seconds
- **Deep Breaths Recovery**: 5 breaths

## Breathing Protocol

Based on Andrew Huberman's breathing recommendations:

1. **Hyperventilation**: 30 deep, rapid breaths to reduce CO2
2. **Breath Hold**: Hold until target duration (increases O2 retention)
3. **Exhale**: 5-second slow exhale
4. **Recovery**: 5 deep breaths to restore normal breathing

## Data Persistence

Sessions are stored locally using AsyncStorage:

- `breathing_sessions`: Array of completed sessions
- `active_session`: Current in-progress session state
- `breathing_config`: User configuration preferences

## Troubleshooting

### App won't start

```bash
# Clear cache and reinstall
rm -rf node_modules
npm install
npx expo start --clear
```

### AsyncStorage issues

The app uses AsyncStorage for data persistence. Data is stored locally on the device and persists across app restarts.

### Animation issues

Make sure React Native Reanimated is properly configured in `babel.config.js`.

## License

MIT

## Credits

Built by Ralph Autonomous Development System
