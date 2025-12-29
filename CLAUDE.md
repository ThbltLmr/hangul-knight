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
- **Touch input:** Dedicated drawing zone at bottom of screen (separate from movement controls)
- **Hangul recognition:** Template-based validation (trace shadowed patterns)

## Code Conventions

- Use TypeScript strict mode
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
