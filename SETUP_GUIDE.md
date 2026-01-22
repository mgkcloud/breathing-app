# Breathing App - Ralph Autonomous Development Setup

## Overview

A new Expo project has been created using the Ralph autonomous development system. This app implements Huberman-style breathing protocols based on the existing Next.js BreathingCard prototype.

**Location**: `/home/mgk/code/life-os/.ralph-projects/breathing-app/`

## Ralph Status

**Current Status**: 🔄 Running in background (started at 2026-01-22 00:34)

**Background Process ID**: b6194d1

**Monitor Progress**:
```bash
# View live output
tail -f /tmp/claude/-home-mgk-code-life-os/tasks/b6194d1.output

# Check recent logs
tail -100 /tmp/claude/-home-mgk-code-life-os/tasks/b6194d1.output

# Check Ralph's status file
cat /home/mgk/code/life-os/.ralph-projects/breathing-app/status.json
```

## Project Configuration

### App Features
The breathing app will implement:
- **3-round breathing cycles**: Hyperventilation (30 breaths) → Breath hold (15s) → Recovery (5s)
- **Heart rate tracking**: Manual input before/after rounds
- **O2 saturation monitoring**: Optional manual input
- **Session history**: Persistent storage with AsyncStorage
- **Calming UI**: Smooth animations and transitions
- **Pause/Resume**: Full session control
- **Configurable settings**: Round count, breath hold duration

### Reference Implementation
Based on: `/home/mgk/code/life-os/life-os-nextjs/components/BreathingCard.tsx`

## Ralph Development Tasks

Ralph is working through 36 tasks organized in these phases:

### Phase 1: Project Setup (Tasks 1-4)
- Run Expo boilerplate generator
- Configure app name and dependencies
- Verify project runs successfully

### Phase 2: Core Components (Tasks 5-10)
- Create TypeScript types
- Implement configuration constants
- Build custom hooks for session management
- Create storage utilities

### Phase 3: UI Components (Tasks 11-18)
- Build breathing circle animation
- Create phase instruction components
- Implement main protocol component
- Build all app screens

### Phase 4: Features (Tasks 19-25)
- Heart rate and O2 input modals
- Pause/resume functionality
- Session persistence
- History and settings

### Phase 5: Polish & Testing (Tasks 26-32)
- Styling and animations
- End-to-end testing
- Documentation

## Monitor Ralph's Progress

### Check Status Updates
```bash
# View current status
cat /home/mgk/code/life-os/.ralph-projects/breathing-app/status.json

# View fix plan progress
cat /home/mgk/code/life-os/.ralph-projects/breathing-app/@fix_plan.md

# View Ralph logs
ls -lt /home/mgk/code/life-os/.ralph-projects/breathing-app/logs/ | head -5
tail -f /home/mgk/code/life-os/.ralph-projects/breathing-app/logs/ralph_*.log
```

### Expected Timeline
- **Estimated completion**: 2-3 hours
- **Total tasks**: 36
- **Current progress**: Check status.json for real-time updates

## When Ralph Completes

Ralph will automatically exit when all exit criteria are met:
1. ✅ Expo project created and runs successfully
2. ✅ BreathingProtocol component implemented
3. ✅ Session tracking with AsyncStorage working
4. ✅ UI screens built and functional
5. ✅ Heart rate and O2 inputs working
6. ✅ Session history displays correctly
7. ✅ No critical bugs or errors

## Next Steps After Completion

### 1. Review the Generated App
```bash
cd /home/mgk/code/life-os/.ralph-projects/breathing-app
# Or wherever Ralph created the Expo project
```

### 2. Start Development Server
```bash
npm start
# or
expo start
```

### 3. Test on Device/Simulator
```bash
# Press 'i' for iOS simulator
# Press 'a' for Android emulator
# Scan QR code for physical device
```

### 4. View Documentation
Ralph will create:
- `README.md` - Setup and run instructions
- `QUICKSTART.md` - Quick start guide
- `SESSION_SUMMARY.md` - Project overview
- `docs/generated/` - Generated documentation

## Manual Intervention Points

If Ralph gets stuck (same error for 5 loops), check:
1. **Log files**: `logs/ralph_*.log`
2. **Status**: `status.json`
3. **Exit signals**: Check why it stopped

To restart Ralph:
```bash
cd /home/mgk/code/life-os/.ralph-projects/breathing-app
ralph --timeout 30 --verbose
```

## Project Structure (After Creation)

```
breathing-app/
├── app/
│   ├── _layout.tsx          # App navigation layout
│   ├── index.tsx            # Main breathing screen
│   ├── history.tsx          # Session history
│   └── settings.tsx         # App settings
├── components/
│   ├── BreathingProtocol.tsx # Core breathing logic
│   ├── BreathingCircle.tsx   # Animated circle
│   ├── PhaseInstructions.tsx # Phase guidance
│   └── SessionCard.tsx       # History display
├── hooks/
│   ├── useBreathingSession.ts # Session state management
│   └── useSessionStorage.ts    # AsyncStorage hook
├── utils/
│   ├── storage.ts           # AsyncStorage utilities
│   └── timers.ts            # Timer utilities
├── types/
│   └── breathing.ts         # TypeScript types
└── constants/
    └── config.ts            # App configuration
```

## Key Technologies

- **Expo SDK 50** - React Native framework
- **TypeScript** - Type safety
- **AsyncStorage** - Persistent session storage
- **Reanimated** - Smooth animations
- **SVG** - Vector graphics and visualizations

## Breathing Protocol Details

### Session Flow
1. **Idle**: User starts session
2. **Hyperventilation**: 30 deep breaths (user taps each breath)
3. **Breath Hold**: Hold for 15 seconds (countdown timer)
4. **Exhale**: 5 second recovery breath
5. **Deep Breaths**: 3-5 recovery breaths
6. **Repeat**: Complete 2-3 rounds
7. **Complete**: Session summary and save to history

### State Management
- Phase-based state machine
- Timer management with intervals
- Session state persistence
- Round data tracking

### Data Stored
```typescript
interface BreathingSession {
  id: string;
  startTime: string;
  endTime?: string;
  rounds: Round[];  // Hyperventilation, breath-hold, deep-breaths
  averageHeartRate?: number;
  o2Start?: number;
  o2End?: number;
  totalDuration?: number;
}
```

## Troubleshooting

### Ralph Stops Unexpectedly
```bash
# Check for errors
tail -100 /tmp/claude/-home-mgk-code-life-os/tasks/b6194d1.output

# Check circuit breaker state
cat /home/mgk/code/life-os/.ralph-projects/breathing-app/.circuit_breaker_state

# Reset and restart
cd /home/mgk/code/life-os/.ralph-projects/breathing-app
ralph --reset-circuit
ralph --timeout 30 --verbose
```

### Expo Project Won't Run
```bash
# Clear cache
rm -rf node_modules
npm install

# Clear Expo cache
expo start --clear

# Check for dependency issues
npm doctor
```

## Contact & Support

For issues with Ralph:
- Check Ralph documentation in the expo-boiler-generator project
- Review logs in `logs/` directory
- Check status.json for current state

## Success Metrics

Ralph will consider the project complete when:
- ✅ All 36 tasks in @fix_plan.md are marked [x]
- ✅ App runs without crashes
- ✅ Complete breathing session works end-to-end
- ✅ Sessions persist across app restarts
- ✅ All UI screens are functional
- ✅ Documentation is complete

---

**Created**: 2026-01-22 00:34
**Ralph Loop**: Background process b6194d1
**Estimated Completion**: 2-3 hours from start

Generated with [Claude Code](https://claude.com/claude-code)
