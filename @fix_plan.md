# Breathing App Development Plan

## Project Setup
- [ ] Task 1: Run Expo boilerplate generator script
- [ ] Task 2: Configure app name as "Breathing App"
- [ ] Task 3: Verify project runs with `npm start` or `expo start`
- [ ] Task 4: Install additional dependencies (AsyncStorage, Reanimated, SVG)

## Core Components
- [ ] Task 5: Create types/breathing.ts with TypeScript interfaces
- [ ] Task 6: Create constants/config.ts with breathing configuration
- [ ] Task 7: Implement hooks/useBreathingSession.ts with state management
- [ ] Task 8: Implement hooks/useSessionStorage.ts with AsyncStorage
- [ ] Task 9: Create utils/storage.ts for AsyncStorage operations
- [ ] Task 10: Create utils/timers.ts for timer utilities

## UI Components
- [ ] Task 11: Create components/BreathingCircle.tsx with animation
- [ ] Task 12: Create components/PhaseInstructions.tsx for phase guidance
- [ ] Task 13: Create components/BreathingProtocol.tsx (main logic component)
- [ ] Task 14: Create components/SessionCard.tsx for history display
- [ ] Task 15: Build app/index.tsx main breathing screen
- [ ] Task 16: Build app/history.tsx session history screen
- [ ] Task 17: Build app/settings.tsx configuration screen
- [ ] Task 18: Update app/_layout.tsx with navigation structure

## Features
- [ ] Task 19: Implement heart rate input modal
- [ ] Task 20: Implement O2 saturation input modal
- [ ] Task 21: Add pause/resume functionality
- [ ] Task 22: Add reset session functionality
- [ ] Task 23: Implement session persistence across app restarts
- [ ] Task 24: Add session history list with details
- [ ] Task 25: Add configurable settings (rounds, breath hold duration)

## Polish & Testing
- [ ] Task 26: Style UI with calming color scheme
- [ ] Task 27: Add smooth animations and transitions
- [ ] Task 28: Test complete breathing session end-to-end
- [ ] Task 29: Verify AsyncStorage persistence works
- [ ] Task 30: Test on Expo web (and iOS/Android if available)
- [ ] Task 31: Update README with setup and run instructions
- [ ] Task 32: Create QUICKSTART.md for easy onboarding

## Documentation
- [ ] Task 33: Document component APIs and usage
- [ ] Task 34: Add comments to complex breathing logic
- [ ] Task 35: Update @AGENT.md with build/run instructions
- [ ] Task 36: Create SESSION_SUMMARY.md with project overview

## Exit Criteria Checklist
All tasks marked with [x] when complete:
1. ✅ Expo project created and runs successfully
2. ✅ BreathingProtocol component implemented with core logic
3. ✅ Session tracking works with AsyncStorage
4. ✅ UI screens built and functional
5. ✅ Heart rate and O2 inputs working
6. ✅ Session history displays correctly
7. ✅ No critical bugs or errors
8. ✅ Documentation complete
