# Hangul Knight

A mobile-first 2D platformer game for learning Korean Hangul characters.

## Gameplay

You play as a knight facing waves of enemies. When an enemy appears, a Korean word is displayed - draw the correct Hangul character on your touchscreen to defeat them.

## Tech Stack

- **Game Engine:** Phaser 3
- **Runtime/Bundler:** Bun
- **Language:** TypeScript
- **Deployment:** GitHub Pages

## Development

### Prerequisites

- [Bun](https://bun.sh/) installed

### Setup

```bash
bun install
```

### Run locally

```bash
bun run dev
```

Then open `index.html` in a browser (or use a local server).

### Build for production

```bash
bun run build
```

Output is in `dist/`.

### Preview production build

```bash
bun run preview
```

Opens at http://localhost:8080

### Run tests

```bash
bun run test
```

### Run tests with coverage

```bash
bun run test:coverage
```

The `logic/` folder requires 100% test coverage, enforced in CI.

## Deployment

The game automatically deploys to GitHub Pages when changes are pushed to the `main` branch.

## Project Structure

The codebase is organized for testability, with a clear separation between pure logic and framework-specific code:

```
hangul-knight/
├── src/
│   ├── main.ts                    # Game configuration and entry point
│   ├── game/                      # Phaser-specific code
│   │   ├── scenes/                # Thin scene wrappers
│   │   │   ├── GameScene.ts
│   │   │   └── BootScene.ts
│   │   └── config.ts              # Game configuration
│   ├── logic/                     # Pure, testable logic (100% coverage)
│   │   ├── hangul.ts              # Hangul recognition algorithms
│   │   ├── hangul.test.ts
│   │   ├── scoring.ts             # Scoring calculations
│   │   ├── scoring.test.ts
│   │   ├── enemy-spawner.ts       # Enemy spawn logic
│   │   └── enemy-spawner.test.ts
│   ├── controllers/               # Bridge between logic and Phaser
│   │   ├── PlayerController.ts
│   │   └── DrawingController.ts
│   └── data/                      # Static data
│       └── hangul.ts              # Korean vocabulary
├── public/                        # Static assets (sprites, audio)
├── dist/                          # Production build output
├── index.html                     # Entry HTML file
└── package.json
```

### Architecture Principles

- **Pure Logic**: All business logic lives in `logic/` as pure functions with 100% test coverage
- **Thin Wrappers**: Phaser scenes in `game/scenes/` are minimal, delegating to controllers
- **Controllers**: Bridge layer that connects pure logic with Phaser APIs
- **Data-Driven**: Static data separated from logic

## License

MIT
