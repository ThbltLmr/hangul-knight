# Claude Code Guidelines for Hangul Knight

## Project Overview

A mobile-first 2D platformer for learning Korean Hangul. Built with Phaser 3, TypeScript, and Bun.

## Commands

- `bun install` - Install dependencies
- `bun run dev` - Build with watch mode for development
- `bun run build` - Production build to `dist/`
- `bun run preview` - Preview production build
- `bun run test` - Run all tests
- `bun run test:coverage` - Run tests with coverage report

## Architecture

### Separation of Concerns

The codebase is structured for testability with clear separation:

1. **Pure Logic** (`src/logic/`):
   - Only pure functions, no side effects
   - No Phaser dependencies
   - 100% test coverage required
   - Examples: hangul recognition, scoring, enemy spawning logic

2. **Controllers** (`src/controllers/`):
   - Bridge between pure logic and Phaser
   - Minimal logic, mostly coordination
   - Calls pure functions from `logic/`

3. **Game/Scenes** (`src/game/`):
   - Thin Phaser wrappers
   - Delegates to controllers
   - Handles only Phaser-specific rendering and lifecycle

4. **Data** (`src/data/`):
   - Static data and type definitions
   - No logic, just data structures

### Game Configuration
- Resolution: 720x1280 (portrait, mobile-first)
- Scale mode: FIT with center alignment
- Physics: Arcade with gravity

### Key Design Decisions
- **Touch input:** Dedicated drawing zone at bottom of screen
- **Hangul recognition:** Template-based validation (trace shadowed patterns)
- **Testability:** Pure functions in `logic/` folder with 100% coverage

## Gameplay and display

### Display
- The display is divided horizontally in two: the scene with the player and enemy sprites in the top half, the drawing zone with the Hangul patterns at the bottom.
- There are no player movements outside of the drawing.

### Gameplay
- The scene does not change or move, and neither does the player sprite. The player sprite is on the left side of the screen, and enemies come into the scene from the right side. Once an enemy is defeated, the next enemy comes into the scene.
- The player sprite is a knight holding a sword
- Enemies are creatures such as dragons, orcs, wolves...

### Art style
- **2D, pixelated art style**, inspired from Pokemon

## Code Conventions

- Use TypeScript strict mode
- Minimal comments: comments should be used exceptionnally, only to explain why a piece of code was necessary.
- Pure functions in `src/logic/` must have corresponding `.test.ts` files
- All logic files must have 100% test coverage
- Phaser scenes use PascalCase (e.g., `GameScene.ts`)
- Controllers coordinate between logic and Phaser

## Testing

- **Test runner:** Bun's built-in test runner
- **Coverage requirement:** 100% for all files in `src/logic/`
- **CI enforcement:** Tests run on all PRs, coverage checked automatically
- Write tests alongside logic: `foo.ts` → `foo.test.ts`

## File Locations

| Purpose | Location |
|---------|----------|
| Entry point | `src/main.ts` |
| Pure logic | `src/logic/` |
| Controllers | `src/controllers/` |
| Phaser scenes | `src/game/scenes/` |
| Game config | `src/game/config.ts` |
| Static data | `src/data/` |
| Sprite assets | `public/sprites/` |
| Backgrounds | `public/backgrounds/` |
| Build output | `dist/` |

### Asset Naming Convention

Sprite assets follow the `{entity}-{action}.png` pattern:
- `knight-idle.png` - Knight idle animation (4 frames, 169x369px each)
- `knight-slash.png` - Knight slash animation (6 frames, 225x184px each)
- `dragon-idle.png` - Dragon idle animation (4 frames, 169x369px each)
