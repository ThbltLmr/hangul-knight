import Phaser from "phaser";

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: "BootScene" });
  }

  preload(): void {
    // Display loading text
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
  }

  create(): void {
    // Placeholder: transition to main game scene when ready
    console.log("BootScene loaded - game ready!");
  }
}
