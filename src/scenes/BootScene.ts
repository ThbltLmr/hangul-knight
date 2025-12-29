import Phaser from "phaser";
import { KnightSpriteGenerator } from "../utils/KnightSpriteGenerator";

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: "BootScene" });
  }

  preload(): void {
    // Generate knight sprite textures
    KnightSpriteGenerator.createKnightSprites(this);

    // Display loading text
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    const loadingText = this.add.text(width / 2, height / 2 - 100, "Hangul Knight", {
      fontSize: "32px",
      color: "#ffffff",
      fontFamily: "Arial, sans-serif",
    });
    loadingText.setOrigin(0.5, 0.5);

    const subtitleText = this.add.text(
      width / 2,
      height / 2 - 50,
      "Loading...",
      {
        fontSize: "18px",
        color: "#aaaaaa",
        fontFamily: "Arial, sans-serif",
      }
    );
    subtitleText.setOrigin(0.5, 0.5);
  }

  create(): void {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Create walking animation
    this.anims.create({
      key: "knight-walk",
      frames: [
        { key: "knight-walk-1" },
        { key: "knight-walk-2" },
        { key: "knight-walk-3" },
        { key: "knight-walk-4" },
      ],
      frameRate: 8,
      repeat: -1,
    });

    // Add animated knight sprite to the scene
    const knight = this.add.sprite(width / 2, height / 2 + 80, "knight-walk-1");
    knight.setScale(3); // Scale up the pixel art for better visibility
    knight.play("knight-walk");

    // Placeholder: transition to main game scene when ready
    console.log("BootScene loaded - game ready!");
  }
}
