# Breathing App - Mac Setup Guide

Complete guide to set up and run the Breathing App on a new Mac machine.

## Prerequisites

### 1. Install Homebrew
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### 2. Install Node.js
```bash
brew install node
node --version  # Should be v18+
npm --version
```

### 3. Install Git
```bash
brew install git
git --version
```

## Project Setup

### Option A: Clone from GitHub (if pushed to repo)
```bash
git clone <your-repo-url>
cd breathing-app
```

### Option B: Copy from Existing Location
```bash
# If you have the project from Ralph's output
cp -r /path/to/breathing-app ~/code/breathing-app
cd ~/code/breathing-app
```

### Option C: Initialize Fresh Project
```bash
mkdir -p ~/code/breathing-app
cd ~/code/breathing-app
npm init -y
```

## Install Dependencies

```bash
cd breathing-app

# Install npm packages
npm install

# If you encounter permission issues
sudo chown -R $USER ~/.npm
npm install
```

## Install Expo CLI

```bash
npm install -g expo-cli
npm install -g eas-cli
```

## iOS Setup (Required for iOS Simulator)

### Install Xcode
```bash
# Install from App Store or
# Install Xcode Command Line Tools
xcode-select --install
```

### Install iOS Simulator
Xcode includes iOS Simulator by default. No additional installation needed.

### Install CocoaPods (for iOS dependencies)
```bash
sudo gem install cocoapods
```

## Android Setup (Optional - for Android emulator)

### Install Android Studio
1. Download from https://developer.android.com/studio
2. Install and open Android Studio
3. Install Android SDK (API level 33+)
4. Create an AVD (Virtual Device)

### Configure Environment Variables
Add to `~/.zshrc` or `~/.bash_profile`:
```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

Then reload:
```bash
source ~/.zshrc
```

## Running the App

### Start Development Server
```bash
cd ~/code/breathing-app
npm start
# or
expo start
```

### Run on iOS Simulator
1. Start the dev server: `npm start`
2. Press `i` in the terminal
3. iOS Simulator will launch automatically

### Run on Android Emulator
1. Start Android emulator first:
   ```bash
   # List available emulators
   emulator -list-avds

   # Start emulator
   emulator -avd <emulator-name>
   ```
2. Start the dev server: `npm start`
3. Press `a` in the terminal

### Run on Physical Device
1. Install Expo Go app on your phone:
   - iOS: App Store
   - Android: Google Play Store
2. Start dev server: `npm start`
3. Scan QR code with Expo Go app

## Troubleshooting

### "Command not found: expo"
```bash
npm install -g expo-cli
# Restart terminal
```

### "Module not found" errors
```bash
rm -rf node_modules
rm package-lock.json
npm install
```

### Metro bundler issues
```bash
npm start -- --clear
```

### iOS build errors
```bash
cd ios
pod install
cd ..
expo start --clear
```

### Permission issues
```bash
sudo chown -R $USER ~/.npm
sudo chown -R $USER ~/code/breathing-app
```

### Port already in use
```bash
# Kill process on port 8081
lsof -ti:8081 | xargs kill -9

# Or use different port
expo start --port 8082
```

## Development Workflow

### View Logs
```bash
# View console output
npm start

# Check for errors
npm test
```

### Run Linter
```bash
npm run lint
```

### Build for Production

#### iOS Build
```bash
eas build --platform ios
```

#### Android Build
```bash
eas build --platform android
```

## App Features

Once running, the app includes:
- **3-Round Breathing Protocol**: Huberman-style breathing
- **Visual Guide**: Animated breathing circle
- **Heart Rate Tracking**: Record before/after each round
- **O2 Monitoring**: Optional oxygen saturation tracking
- **Session History**: View past sessions
- **Settings**: Customize rounds and durations
- **Pause/Resume**: Full session control

## Quick Test

1. Start the app: `npm start`
2. Press `i` for iOS simulator
3. Tap "Start Session"
4. Follow breathing instructions:
   - 30 deep breaths (tap for each breath)
   - Hold breath for 15 seconds
   - Enter heart rate
   - Complete 3 rounds
5. View session history

## Project Structure

```
breathing-app/
├── app/                    # Expo Router screens
│   ├── _layout.tsx
│   ├── index.tsx          # Main breathing screen
│   ├── history.tsx        # Session history
│   └── settings.tsx       # Settings
├── components/
│   ├── BreathingProtocol.tsx
│   ├── BreathingCircle.tsx
│   └── PhaseInstructions.tsx
├── hooks/
│   └── useBreathingSession.ts
├── utils/
│   └── storage.ts
├── types/
│   └── breathing.ts
├── constants/
│   └── config.ts
├── package.json
└── app.json
```

## Stack

- **Expo SDK 51**
- **React Native 0.74**
- **TypeScript**
- **Expo Router**
- **React Native Reanimated**
- **AsyncStorage**

## Support

For issues or questions:
- Check README.md for detailed documentation
- Review SESSION_SUMMARY.md for implementation details
- Check SETUP_GUIDE.md for Ralph's development notes

Generated with [Claude Code](https://claude.ai/code)
via [Happy](https://happy.engineering)

Co-Authored-By: Claude <noreply@anthropic.com>
Co-Authored-By: Happy <yesreply@happy.engineering>
