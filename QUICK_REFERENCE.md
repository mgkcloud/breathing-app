# Breathing App - Quick Reference

## 🚀 Ralph is Running!

**Started**: 2026-01-22 00:34
**Status**: 🔄 Active development in progress
**Background Process**: b6194d1

## Monitor Progress

### Live Output
```bash
tail -f /tmp/claude/-home-mgk-code-life-os/tasks/b6194d1.output
```

### Quick Status Check
```bash
# Current status
cat /home/mgk/code/life-os/.ralph-projects/breathing-app/status.json

# Task progress
cat /home/mgk/code/life-os/.ralph-projects/breathing-app/@fix_plan.md | grep "^\- \[x\]" | wc -l
# Shows number of completed tasks

# Latest logs
ls -lt /home/mgk/code/life-os/.ralph-projects/breathing-app/logs/ | head -3
```

## Project Overview

### What's Being Built
- **Expo React Native app** for breathing exercises
- **Huberman-style protocols**: 3-round cycles (hyperventilation → breath hold → recovery)
- **Session tracking** with AsyncStorage persistence
- **Heart rate & O2 monitoring** (manual input)
- **Calming UI** with smooth animations

### Reference Implementation
Based on `/home/mgk/code/life-os/life-os-nextjs/components/BreathingCard.tsx`

## 36 Tasks Organized by Phase

### Phase 1: Project Setup (4 tasks)
- [ ] Task 1-4: Boilerplate generation, configuration, dependencies

### Phase 2: Core Components (6 tasks)
- [ ] Task 5-10: Types, constants, hooks, utilities

### Phase 3: UI Components (8 tasks)
- [ ] Task 11-18: Screens and components

### Phase 4: Features (7 tasks)
- [ ] Task 19-25: Inputs, persistence, history, settings

### Phase 5: Polish & Testing (11 tasks)
- [ ] Task 26-36: Styling, testing, documentation

## Expected Timeline

- **Estimated**: 2-3 hours
- **Current Loop**: #1 (of estimated 10-20 loops)
- **Tasks per loop**: 2-4 average

## When Complete

Ralph will exit automatically when:
- ✅ All 36 tasks complete
- ✅ App runs successfully
- ✅ No critical bugs
- ✅ Documentation done

## Post-Completion Steps

### 1. Locate the Expo Project
```bash
# Ralph will create it in a subdirectory
cd /home/mgk/code/life-os/.ralph-projects/breathing-app
# Look for the Expo app directory (e.g., "breathing-expo-app" or similar)
```

### 2. Start Development
```bash
cd <expo-project-directory>
npm install
npm start
# or
expo start
```

### 3. Test the App
- Press 'i' for iOS simulator
- Press 'a' for Android emulator
- Scan QR code for physical device
- Press 'w' for web browser

### 4. Review Documentation
Ralph creates:
- `README.md` - Full setup guide
- `QUICKSTART.md` - Quick start
- `SESSION_SUMMARY.md` - Project overview

## Troubleshooting

### Ralph Seems Stuck
```bash
# Check if still running
ps aux | grep ralph

# Check recent logs
tail -100 /tmp/claude/-home-mgk-code-life-os/tasks/b6194d1.output

# Look for errors
grep -i "error" /tmp/claude/-home-mgk-code-life-os/tasks/b6194d1.output
```

### Ralph Exits Early
```bash
# Check exit reason
cat /home/mgk/code/life-os/.ralph-projects/breathing-app/status.json

# Check circuit breaker
cat /home/mgk/code/life-os/.ralph-projects/breathing-app/.circuit_breaker_state

# Restart if needed
cd /home/mgk/code/life-os/.ralph-projects/breathing-app
ralph --timeout 30 --verbose
```

## Key Files

| File | Purpose |
|------|---------|
| `PROMPT.md` | Ralph's instructions |
| `@fix_plan.md` | Task checklist |
| `status.json` | Real-time status |
| `logs/ralph_*.log` | Execution logs |
| `SETUP_GUIDE.md` | This guide |

## Breathing Protocol

### Session Structure
```
Round 1:
  - Hyperventilation: 30 breaths
  - Breath Hold: 15 seconds
  - Exhale: 5 seconds
  - Deep Breaths: 3-5 breaths

Round 2:
  - Hyperventilation: 30 breaths
  - Breath Hold: 15 seconds
  - Exhale: 5 seconds
  - Deep Breaths: 3-5 breaths

Round 3 (optional):
  - Same pattern
```

### User Interactions
- Tap to count breaths during hyperventilation
- Hold breath during countdown
- Input heart rate before/after rounds
- Optional O2 saturation input
- Pause/resume anytime
- Reset session to start over

## Tech Stack

- **Expo SDK 50** - React Native framework
- **TypeScript** - Type safety
- **AsyncStorage** - Local persistence
- **Reanimated** - Animations
- **SVG** - Graphics

## Success Metrics

Ralph considers complete when:
- ✅ 36/36 tasks done
- ✅ App runs without crashes
- ✅ Full session flow works
- ✅ Data persists across restarts
- ✅ All screens functional
- ✅ Documentation complete

## For More Details

See `SETUP_GUIDE.md` for comprehensive documentation.

---

**Last Updated**: 2026-01-22 00:36
**Ralph Status**: 🔄 Active (Loop #1 in progress)
