# Claude Code Guidelines for Hangul Knight

## Project Overview

A mobile-first 2D platformer for learning Korean Hangul. Built with Phaser 3, TypeScript, and Bun.

## Commands

- `bun install` - Install dependencies
- `bun run dev` - Build with watch mode for development
- `bun run build` - Production build to `dist/`
- `bun run preview` - Preview production build

## Architecture

### Game Configuration
- Resolution: 720x1280 (portrait, mobile-first)
- Scale mode: FIT with center alignment
- Physics: Arcade with gravity

### Scene Structure
Scenes are in `src/scenes/`. Each scene extends `Phaser.Scene`.

### Key Design Decisions
- **Touch input:** Dedicated drawing zone at bottom of screen
- **Hangul recognition:** Template-based validation (trace shadowed patterns)

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
- Phaser scenes use PascalCase (e.g., `GameScene.ts`)
- Game entities in `src/entities/`
- Systems/utilities in `src/systems/`
- Static data (vocabulary) in `src/data/`

## File Locations

| Purpose | Location |
|---------|----------|
| Entry point | `src/main.ts` |
| Scenes | `src/scenes/` |
| Static assets | `public/` |
| Build output | `dist/` |
