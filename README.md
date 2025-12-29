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

## Deployment

The game automatically deploys to GitHub Pages when changes are pushed to the `main` branch.

## Project Structure

```
hangul-knight/
├── src/
│   ├── main.ts           # Game configuration and entry point
│   └── scenes/           # Phaser scenes
│       └── BootScene.ts  # Initial loading scene
├── public/               # Static assets (sprites, audio)
├── dist/                 # Production build output
├── index.html            # Entry HTML file
└── package.json
```

## License

MIT
