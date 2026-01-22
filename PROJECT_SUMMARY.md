# Breathing App - Ralph Autonomous Development Project Summary

## Executive Summary

A new Expo React Native breathing app is being developed using the Ralph autonomous development system. The app implements Huberman-style breathing protocols with session tracking, heart rate monitoring, and AsyncStorage persistence.

**Project Initiated**: 2026-01-22 00:34 UTC
**Current Status**: 🔄 Active Development
**Development System**: Ralph autonomous AI agent
**Background Process**: b6194d1

---

## Project Details

### Location
- **Ralph Project**: `/home/mgk/code/life-os/.ralph-projects/breathing-app/`
- **Expo Output**: Will be created in a subdirectory during Task 1

### Reference Implementation
Based on existing Next.js prototype:
- **Path**: `/home/mgk/code/life-os/life-os-nextjs/components/BreathingCard.tsx`
- **Features**: 3-round breathing cycles, heart rate tracking, session history

---

## What Ralph Is Building

### Core Features
1. **Huberman-Style Breathing Protocol**
   - 3 rounds per session
   - Hyperventilation: 30 deep breaths
   - Breath hold: 15 seconds (configurable)
   - Recovery: 5 second exhale
   - Deep breaths: 3-5 recovery breaths

2. **Session Tracking**
   - Real-time phase state machine
   - Timer management for each phase
   - Breath counting during hyperventilation
   - Round-by-round data collection

3. **Health Monitoring**
   - Heart rate input (before/after rounds)
   - O2 saturation tracking (optional)
   - Session statistics and averages

4. **Data Persistence**
   - AsyncStorage for session history
   - Session state restoration (recover from interruptions)
   - Last 10 sessions stored

5. **User Interface**
   - Main breathing screen with phase guidance
   - Animated breathing circle
   - Session history screen
   - Settings/config screen
   - Pause/resume/reset controls

### Technical Stack
- **Framework**: Expo SDK 50 with React Native
- **Language**: TypeScript
- **State Management**: React hooks (useState, useCallback, useRef)
- **Storage**: AsyncStorage
- **Animations**: React Native Reanimated
- **Graphics**: React Native SVG

---

## Ralph's Development Plan

### 36 Tasks in 5 Phases

#### Phase 1: Project Setup (Tasks 1-4)
- [ ] Run Expo boilerplate generator script
- [ ] Configure app name as "Breathing App"
- [ ] Verify project runs with `npm start` or `expo start`
- [ ] Install additional dependencies (AsyncStorage, Reanimated, SVG)

#### Phase 2: Core Components (Tasks 5-10)
- [ ] Create types/breathing.ts with TypeScript interfaces
- [ ] Create constants/config.ts with breathing configuration
- [ ] Implement hooks/useBreathingSession.ts with state management
- [ ] Implement hooks/useSessionStorage.ts with AsyncStorage
- [ ] Create utils/storage.ts for AsyncStorage operations
- [ ] Create utils/timers.ts for timer utilities

#### Phase 3: UI Components (Tasks 11-18)
- [ ] Create components/BreathingCircle.tsx with animation
- [ ] Create components/PhaseInstructions.tsx for phase guidance
- [ ] Create components/BreathingProtocol.tsx (main logic component)
- [ ] Create components/SessionCard.tsx for history display
- [ ] Build app/index.tsx main breathing screen
- [ ] Build app/history.tsx session history screen
- [ ] Build app/settings.tsx configuration screen
- [ ] Update app/_layout.tsx with navigation structure

#### Phase 4: Features (Tasks 19-25)
- [ ] Implement heart rate input modal
- [ ] Implement O2 saturation input modal
- [ ] Add pause/resume functionality
- [ ] Add reset session functionality
- [ ] Implement session persistence across app restarts
- [ ] Add session history list with details
- [ ] Add configurable settings (rounds, breath hold duration)

#### Phase 5: Polish & Testing (Tasks 26-36)
- [ ] Style UI with calming color scheme
- [ ] Add smooth animations and transitions
- [ ] Test complete breathing session end-to-end
- [ ] Verify AsyncStorage persistence works
- [ ] Test on Expo web (and iOS/Android if available)
- [ ] Update README with setup and run instructions
- [ ] Create QUICKSTART.md for easy onboarding
- [ ] Document component APIs and usage
- [ ] Add comments to complex breathing logic
- [ ] Update @AGENT.md with build/run instructions
- [ ] Create SESSION_SUMMARY.md with project overview

---

## Monitoring Ralph's Progress

### Real-Time Monitoring
```bash
# Live output from Ralph
tail -f /tmp/claude/-home-mgk-code-life-os/tasks/b6194d1.output

# Check current status
cat /home/mgk/code/life-os/.ralph-projects/breathing-app/status.json

# View task progress
cat /home/mgk/code/life-os/.ralph-projects/breathing-app/@fix_plan.md

# Check latest logs
ls -lt /home/mgk/code/life-os/.ralph-projects/breathing-app/logs/ | head -5
```

### Quick Progress Check
```bash
# Count completed tasks
grep -c "^\- \[x\]" /home/mgk/code/life-os/.ralph-projects/breathing-app/@fix_plan.md

# Check for errors
grep -i "error\|fail" /tmp/claude/-home-mgk-code-life-os/tasks/b6194d1.output

# Check Ralph status
cat /home/mgk/code/life-os/.ralph-projects/breathing-app/status.json | jq .
```

---

## Expected Timeline

### Time Estimates
- **Total Time**: 2-3 hours
- **Phase 1 (Setup)**: 30-45 minutes
- **Phase 2 (Core)**: 30-45 minutes
- **Phase 3 (UI)**: 45-60 minutes
- **Phase 4 (Features)**: 30-45 minutes
- **Phase 5 (Polish)**: 30-45 minutes

### Ralph Loop Performance
- **Estimated loops**: 10-20 total
- **Tasks per loop**: 2-4 average
- **Current loop**: #1 (started at 00:34)
- **Time per loop**: 5-15 minutes average

---

## Completion Criteria

Ralph will automatically exit when ALL conditions are met:

1. ✅ **Expo project created and runs successfully**
2. ✅ **BreathingProtocol component implemented with core logic**
3. ✅ **Session tracking works with AsyncStorage**
4. ✅ **UI screens built and functional**
5. ✅ **Heart rate and O2 inputs working**
6. ✅ **Session history displays correctly**
7. ✅ **No critical bugs or errors**
8. ✅ **Documentation complete**

---

## Post-Completion Actions

### 1. Locate and Review the App
```bash
cd /home/mgk/code/life-os/.ralph-projects/breathing-app

# Find the Expo project directory (Ralph will create it)
ls -la

# Enter the Expo app directory
cd <expo-project-name>
```

### 2. Install and Run
```bash
# Install dependencies
npm install

# Start development server
npm start
# or
expo start

# Choose platform:
# - Press 'i' for iOS simulator
# - Press 'a' for Android emulator
# - Press 'w' for web browser
# - Scan QR code for physical device
```

### 3. Test the App
- Complete a full breathing session (all rounds)
- Verify session history saves and loads
- Test pause/resume functionality
- Try heart rate and O2 inputs
- Change settings and verify they persist
- Test on multiple platforms if available

### 4. Review Documentation
Ralph will create comprehensive documentation:
- `README.md` - Setup and run instructions
- `QUICKSTART.md` - Quick start guide
- `SESSION_SUMMARY.md` - Project overview and architecture
- `docs/generated/` - Additional generated docs

---

## Troubleshooting

### Ralph Stops Unexpectedly

**Check for errors:**
```bash
tail -100 /tmp/claude/-home-mgk-code-life-os/tasks/b6194d1.output | grep -i error
```

**Check circuit breaker:**
```bash
cat /home/mgk/code/life-os/.ralph-projects/breathing-app/.circuit_breaker_state
```

**Restart Ralph:**
```bash
cd /home/mgk/code/life-os/.ralph-projects/breathing-app
ralph --timeout 30 --verbose
```

### Ralph Seems Stuck

**Check if still running:**
```bash
ps aux | grep ralph
```

**Check current loop:**
```bash
cat /home/mgk/code/life-os/.ralph-projects/breathing-app/status.json | jq '.loop_count'
```

**Review logs:**
```bash
tail -50 /home/mgk/code/life-os/.ralph-projects/breathing-app/logs/ralph_*.log
```

### Expo Project Won't Run

**Clear and reinstall:**
```bash
cd <expo-project-directory>
rm -rf node_modules
npm install

# Clear Expo cache
expo start --clear

# Check Node version
node --version  # Should be 18.x or 20.x
```

---

## Project Structure (After Creation)

```
breathing-app/
├── app/
│   ├── _layout.tsx              # Navigation layout
│   ├── index.tsx                # Main breathing screen
│   ├── history.tsx              # Session history
│   └── settings.tsx             # Settings
├── components/
│   ├── BreathingProtocol.tsx    # Core breathing logic
│   ├── BreathingCircle.tsx      # Animated circle
│   ├── PhaseInstructions.tsx    # Phase guidance
│   └── SessionCard.tsx          # History display
├── hooks/
│   ├── useBreathingSession.ts   # Session state
│   └── useSessionStorage.ts     # AsyncStorage hook
├── utils/
│   ├── storage.ts               # Storage utilities
│   └── timers.ts                # Timer utilities
├── types/
│   └── breathing.ts             # TypeScript types
├── constants/
│   └── config.ts                # App configuration
├── package.json
├── app.json
├── tsconfig.json
└── README.md
```

---

## Key Technologies & Patterns

### State Management
- React hooks for local state
- Phase-based state machine
- Refs for timer management
- Callbacks for event handlers

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

### AsyncStorage Keys
- `breathing-sessions` - Session history array
- `breathing-session-state` - Active session state
- `breathing-settings` - User preferences

---

## Documentation Files

| File | Purpose |
|------|---------|
| `SETUP_GUIDE.md` | Comprehensive setup and monitoring guide |
| `QUICK_REFERENCE.md` | Quick reference for common commands |
| `PROJECT_SUMMARY.md` | This file - complete project overview |
| `PROMPT.md` | Ralph's development instructions |
| `@fix_plan.md` | Ralph's task checklist |
| `@AGENT.md` | Build and run instructions |

---

## Next Steps

### Immediate (While Ralph Runs)
1. ✅ Ralph is already running in background
2. Monitor progress with: `tail -f /tmp/claude/-home-mgk-code-life-os/tasks/b6194d1.output`
3. Check status periodically: `cat /home/mgk/code/life-os/.ralph-projects/breathing-app/status.json`

### After Ralph Completes
1. Review generated Expo project
2. Test app on simulator or device
3. Complete a full breathing session
4. Verify all features work
5. Customize styling if needed
6. Deploy to app stores (future)

---

## Contact & Resources

### Ralph Documentation
- Boilerplate generator: `/home/mgk/code/life-os/.ralph-projects/expo-boiler-generator/`
- Ralph scripts: `/home/mgk/.ralph/`
- Example projects: `/home/mgk/code/life-os/.ralph-projects/`

### Reference Implementation
- Next.js BreathingCard: `/home/mgk/code/life-os/life-os-nextjs/components/BreathingCard.tsx`
- Huberman Lab protocols: https://www.hubermanlab.com/

---

## Success Metrics

Ralph will consider this project complete when:

- ✅ **All 36 tasks** in @fix_plan.md are marked [x]
- ✅ **Expo app runs** without crashes on iOS/Android/Web
- ✅ **Full breathing session** completes successfully (all rounds)
- ✅ **Session data persists** across app restarts via AsyncStorage
- ✅ **All UI screens** are functional and responsive
- ✅ **Heart rate and O2 inputs** work correctly
- ✅ **Session history** displays past sessions accurately
- ✅ **Documentation is complete** and accurate
- ✅ **No critical bugs** or errors in execution logs

---

**Project Created**: 2026-01-22 00:34 UTC
**Ralph Process**: b6194d1
**Estimated Completion**: 02:30 - 03:30 UTC (2-3 hours from start)
**Status**: 🔄 Active Development

Generated with [Claude Code](https://claude.com/claude-code)
