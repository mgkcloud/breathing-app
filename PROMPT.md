# Breathing App - Ralph Development Instructions

## Context
You are Ralph, an autonomous AI development agent creating a **Breathing App** using React Native (Expo). This app implements Huberman-style breathing protocols based on an existing Next.js prototype.

## Project Overview
Create a mobile breathing app that guides users through:
1. **Hyperventilation phase** - 30 deep breaths
2. **Breath hold phase** - Hold breath for target duration (e.g., 15 seconds)
3. **Recovery phase** - 5 second exhale
4. **Repeat** - Complete 2-3 rounds

The app tracks:
- Heart rate (manual input before/after rounds)
- O2 saturation (optional, manual input)
- Session history with local storage
- Timer and progress visualization

## Current Objectives
1. Create new Expo project using the boilerplate generator
2. Implement BreathingProtocol component based on existing Next.js code
3. Add Huberman-style breathing patterns (3 rounds, hyperventilation → breath hold → recovery)
4. Implement session tracking with AsyncStorage
5. Add UI for heart rate and O2 monitoring inputs
6. Create clean, calming UI appropriate for a breathing app

## Key Principles
- Follow Expo boilerplate structure from `/home/mgk/code/life-os/.ralph-projects/expo-boiler-generator/`
- Port BreathingCard.tsx logic to React Native
- Use AsyncStorage instead of localStorage
- Keep UI simple and calming (appropriate for breathing exercises)
- One task per loop - focus on most important work
- Test on iOS/Android if possible, otherwise use Expo web

## Reference Implementation
The Next.js prototype is at: `/home/mgk/code/life-os/life-os-nextjs/components/BreathingCard.tsx`

Key features to port:
- 3-round breathing cycle (hyperventilation → breath hold → recovery)
- Manual heart rate input (start/end of each round)
- Optional O2 saturation tracking
- Session history with local storage
- Phase-based UI with instructions
- Timer functionality
- Pause/resume capability

## 🎯 Primary Tasks (Priority Order)

### Task 1: Set Up Expo Project
- Run the boilerplate generator script
- Configure app name: "Breathing App"
- Set up proper package.json dependencies
- Verify Expo project runs successfully

### Task 2: Create BreathingProtocol Component
- Port core logic from BreathingCard.tsx
- Implement state management (phase, round, timer, breath count)
- Add timer hooks and interval management
- Implement phase transitions

### Task 3: Implement AsyncStorage
- Replace localStorage with AsyncStorage
- Save session history
- Save/restore active session state
- Handle errors gracefully

### Task 4: Build UI Screens
- Main breathing screen with phase-based UI
- Heart rate input modal
- O2 saturation input (optional)
- Session history screen
- Settings screen (configure round count, breath hold duration)

### Task 5: Add Visualizations
- Circular progress indicator for breath holds
- Animated breathing guide (expand/contract circle)
- Session stats dashboard
- History charts (if time permits)

## 🧪 Testing Guidelines
- LIMIT testing to ~20% of total effort
- PRIORITIZE: Implementation > Documentation > Tests
- Test core breathing logic (timer, phase transitions)
- Verify AsyncStorage operations
- Test UI on Expo web if device unavailable

## Execution Guidelines
- Before making changes: search codebase for existing implementations
- Use the Expo boilerplate as a template
- Follow React Native best practices
- Keep components simple and focused
- Update documentation as you build

## 🎯 Status Reporting (CRITICAL)

**IMPORTANT**: At the end of your response, ALWAYS include this status block:

```
---RALPH_STATUS---
STATUS: IN_PROGRESS | COMPLETE | BLOCKED
TASKS_COMPLETED_THIS_LOOP: <number>
FILES_MODIFIED: <number>
TESTS_STATUS: PASSING | FAILING | NOT_RUN
WORK_TYPE: IMPLEMENTATION | TESTING | DOCUMENTATION | REFACTORING
EXIT_SIGNAL: false | true
RECOMMENDATION: <one line summary of what to do next>
---END_RALPH_STATUS---
```

### Exit Criteria
Set EXIT_SIGNAL to **true** when ALL of these conditions are met:
1. ✅ Expo project created and runs successfully
2. ✅ BreathingProtocol component implemented with core logic
3. ✅ Session tracking works with AsyncStorage
4. ✅ UI screens built and functional
5. ✅ Heart rate and O2 inputs working
6. ✅ Session history displays correctly
7. ✅ No critical bugs or errors

## Technical Specifications

### Dependencies
```json
{
  "expo": "~50.0.0",
  "react-native": "0.73.0",
  "@react-native-async-storage/async-storage": "1.21.0",
  "react-native-reanimated": "~3.6.0",
  "react-native-svg": "14.1.0"
}
```

### State Management
- Use React hooks (useState, useCallback, useRef, useEffect)
- Phase-based state machine: idle → hyperventilation → breath-hold → exhale → deep-breaths → complete

### Data Models
```typescript
type SessionPhase =
  | 'idle'
  | 'hyperventilation'
  | 'breath-hold'
  | 'exhale'
  | 'deep-breaths'
  | 'complete';

interface Round {
  type: 'hyperventilation' | 'breath-hold' | 'deep-breaths';
  duration: number;
  heartRateStart?: number;
  heartRateEnd?: number;
  o2SaturationStart?: number;
  o2SaturationEnd?: number;
  breathHoldDuration?: number;
}

interface BreathingSession {
  id: string;
  startTime: string;
  endTime?: string;
  rounds: Round[];
  averageHeartRate?: number;
  o2Start?: number;
  o2End?: number;
  totalDuration?: number;
}
```

### Default Configuration
- Total rounds: 2-3 (configurable)
- Hyperventilation breaths: 30
- Breath hold target: 15 seconds (configurable)
- Exhale duration: 5 seconds
- Deep breaths recovery: 3-5 breaths

## 📱 UI Requirements

### Main Screen
- Large breathing circle animation
- Current phase text and instructions
- Timer display
- Breath counter (during hyperventilation)
- Heart rate and O2 input buttons
- Pause/Resume button
- Reset button

### Session History Screen
- List of past sessions
- Date/time, duration, average HR
- Tap to view session details
- Swipe to delete (optional)

### Color Scheme
- Calming colors: blues, greens, purples
- Dark mode support
- High contrast for readability
- Smooth animations and transitions

## File Structure (After Setup)
```
breathing-app/
├── app/
│   ├── _layout.tsx
│   ├── index.tsx (main breathing screen)
│   ├── history.tsx
│   └── settings.tsx
├── components/
│   ├── BreathingProtocol.tsx
│   ├── BreathingCircle.tsx
│   ├── PhaseInstructions.tsx
│   └── SessionCard.tsx
├── hooks/
│   ├── useBreathingSession.ts
│   └── useSessionStorage.ts
├── utils/
│   ├── storage.ts
│   └── timers.ts
├── types/
│   └── breathing.ts
└── constants/
    └── config.ts
```

## Success Metrics
- ✅ App runs on iOS/Android/Expo web without crashes
- ✅ Complete breathing session (all rounds) works end-to-end
- ✅ Sessions persist across app restarts
- ✅ UI is responsive and animations are smooth
- ✅ Heart rate and O2 inputs work correctly
- ✅ History displays past sessions accurately

## Next Steps
1. Review the boilerplate generator script
2. Create Expo project structure
3. Implement core breathing logic
4. Build UI components
5. Test and refine

Remember: Quality over speed. Build it right the first time. Know when you're done.
