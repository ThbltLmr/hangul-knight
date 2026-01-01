import Phaser from "phaser";
import { KnightSpriteGenerator } from "../../utils/KnightSpriteGenerator";

export class BootScene extends Phaser.Scene {
  private knight?: Phaser.GameObjects.Sprite;

  constructor() {
    super({ key: "BootScene" });
  }

  preload(): void {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    const loadingText = this.add.text(width / 2, height / 2, "Hangul Knight", {
      fontSize: "32px",
      color: "#ffffff",
      fontFamily: "Arial, sans-serif",
    });
    loadingText.setOrigin(0.5, 0.5);

    const subtitleText = this.add.text(
      width / 2,
      height / 2 + 50,
      "Loading...",
      {
        fontSize: "18px",
        color: "#aaaaaa",
        fontFamily: "Arial, sans-serif",
      }
    );
    subtitleText.setOrigin(0.5, 0.5);

    KnightSpriteGenerator.loadKnightSprites(this);
  }

  create(): void {
    console.log("BootScene loaded - game ready!");

    KnightSpriteGenerator.createAnimations(this);

    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    this.knight = this.add.sprite(width / 2, height / 2 - 100, "knight-idle");
    this.knight.setScale(3);
    this.knight.play("knight-idle");

    this.time.addEvent({
      delay: 3000,
      callback: this.performSlash,
      callbackScope: this,
      loop: true,
    });
  }

  private performSlash(): void {
    if (!this.knight) return;

    this.knight.play("knight-slash");

    this.knight.once("animationcomplete", () => {
      this.knight?.play("knight-idle");
    });
  }
}
