import Phaser from "phaser";

export class KnightSpriteGenerator {
  static generateKnightSprites(scene: Phaser.Scene): void {
    this.generateIdleFrames(scene);
    this.generateSlashFrames(scene);
  }

  private static generateIdleFrames(scene: Phaser.Scene): void {
    const frameWidth = 48;
    const frameHeight = 48;
    const frames = 4;

    for (let i = 0; i < frames; i++) {
      const graphics = scene.make.graphics({ x: 0, y: 0 }, false);
      const offsetY = Math.sin((i / frames) * Math.PI * 2) * 1;

      this.drawKnight(graphics, 24, 24 + offsetY, false);

      graphics.generateTexture(`knight-idle-${i}`, frameWidth, frameHeight);
      graphics.destroy();
    }

    scene.anims.create({
      key: "knight-idle",
      frames: Array.from({ length: frames }, (_, i) => ({
        key: `knight-idle-${i}`,
      })),
      frameRate: 4,
      repeat: -1,
    });
  }

  private static generateSlashFrames(scene: Phaser.Scene): void {
    const frameWidth = 64;
    const frameHeight = 48;
    const frames = 6;

    for (let i = 0; i < frames; i++) {
      const graphics = scene.make.graphics({ x: 0, y: 0 }, false);
      const progress = i / (frames - 1);

      this.drawKnight(graphics, 24, 24, progress > 0.3 && progress < 0.8);

      if (progress >= 0.2) {
        this.drawSword(graphics, 24, 24, progress);
      }

      graphics.generateTexture(`knight-slash-${i}`, frameWidth, frameHeight);
      graphics.destroy();
    }

    scene.anims.create({
      key: "knight-slash",
      frames: Array.from({ length: frames }, (_, i) => ({
        key: `knight-slash-${i}`,
      })),
      frameRate: 12,
      repeat: 0,
    });
  }

  private static drawKnight(
    graphics: Phaser.GameObjects.Graphics,
    x: number,
    y: number,
    slashing: boolean
  ): void {
    graphics.fillStyle(0xa0a0a0);
    graphics.fillRect(x - 4, y - 2, 8, 10);

    graphics.fillStyle(0xc0c0c0);
    graphics.fillRect(x - 6, y - 8, 12, 6);

    graphics.fillStyle(0xffd700);
    graphics.fillRect(x - 5, y - 12, 10, 4);

    graphics.fillStyle(0x505050);
    graphics.fillRect(x - 3, y - 16, 6, 4);

    graphics.fillStyle(0x303030);
    graphics.fillRect(x - 2, y - 15, 4, 2);

    if (slashing) {
      graphics.fillStyle(0x909090);
      graphics.fillRect(x + 6, y - 6, 4, 8);
    } else {
      graphics.fillStyle(0x909090);
      graphics.fillRect(x + 4, y - 2, 4, 6);
    }

    graphics.fillStyle(0x808080);
    graphics.fillRect(x - 3, y + 8, 3, 6);
    graphics.fillRect(x + 1, y + 8, 3, 6);

    graphics.fillStyle(0x606060);
    graphics.fillRect(x - 2, y + 14, 2, 3);
    graphics.fillRect(x + 1, y + 14, 2, 3);
  }

  private static drawSword(
    graphics: Phaser.GameObjects.Graphics,
    x: number,
    y: number,
    progress: number
  ): void {
    const angle = -90 + progress * 180;
    const radians = Phaser.Math.DegToRad(angle);
    const swordLength = 16;
    const baseX = x + 8;
    const baseY = y - 4;

    const tipX = baseX + Math.cos(radians) * swordLength;
    const tipY = baseY + Math.sin(radians) * swordLength;
    const midX = baseX + Math.cos(radians) * (swordLength - 3);
    const midY = baseY + Math.sin(radians) * (swordLength - 3);

    graphics.lineStyle(3, 0xc0c0c0);
    graphics.beginPath();
    graphics.moveTo(baseX, baseY);
    graphics.lineTo(midX, midY);
    graphics.strokePath();

    graphics.lineStyle(2, 0xffffff);
    graphics.beginPath();
    graphics.moveTo(midX, midY);
    graphics.lineTo(tipX, tipY);
    graphics.strokePath();

    graphics.fillStyle(0x8b4513);
    graphics.fillRect(baseX - 2, baseY - 2, 4, 4);
  }
}
