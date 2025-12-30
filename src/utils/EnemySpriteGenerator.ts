import Phaser from "phaser";

export class EnemySpriteGenerator {
  static generateDragonSprites(scene: Phaser.Scene): void {
    const dragonIdleFrames: string[] = [];
    const dragonDeathFrames: string[] = [];

    for (let i = 0; i < 4; i++) {
      const idleKey = `dragon-idle-${i}`;
      dragonIdleFrames.push(idleKey);
      this.createDragonIdleFrame(scene, idleKey, i);
    }

    for (let i = 0; i < 6; i++) {
      const deathKey = `dragon-death-${i}`;
      dragonDeathFrames.push(deathKey);
      this.createDragonDeathFrame(scene, deathKey, i);
    }

    scene.anims.create({
      key: "dragon-idle",
      frames: dragonIdleFrames.map((key) => ({ key })),
      frameRate: 6,
      repeat: -1,
    });

    scene.anims.create({
      key: "dragon-death",
      frames: dragonDeathFrames.map((key) => ({ key })),
      frameRate: 10,
      repeat: 0,
    });
  }

  private static createDragonIdleFrame(
    scene: Phaser.Scene,
    key: string,
    frame: number
  ): void {
    const size = 64;
    const canvas = scene.textures.createCanvas(key, size, size);
    if (!canvas) return;

    const ctx = canvas.context;
    const offset = Math.sin(frame * 0.5) * 2;

    ctx.fillStyle = "#2d5016";
    ctx.fillRect(30, 20 + offset, 20, 15);

    ctx.fillStyle = "#3d6b1f";
    ctx.beginPath();
    ctx.arc(32, 15 + offset, 12, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#4d7b2f";
    ctx.fillRect(20, 25 + offset, 24, 20);

    ctx.fillStyle = "#ff4444";
    ctx.fillRect(12, 30 + offset, 3, 3);

    ctx.fillStyle = "#ffff00";
    ctx.fillRect(35, 18 + offset, 2, 2);

    ctx.fillStyle = "#3d6b1f";
    ctx.fillRect(35, 40 + offset, 4, 8);
    ctx.fillRect(25, 40 + offset, 4, 8);

    ctx.fillStyle = "#2d5016";
    for (let i = 0; i < 3; i++) {
      ctx.fillRect(43 - i * 3, 22 + i * 3 + offset, 4, 4);
    }

    canvas.refresh();
  }

  private static createDragonDeathFrame(
    scene: Phaser.Scene,
    key: string,
    frame: number
  ): void {
    const size = 64;
    const canvas = scene.textures.createCanvas(key, size, size);
    if (!canvas) return;

    const ctx = canvas.context;
    const fadeAmount = frame / 6;
    const fallOffset = frame * 3;

    ctx.globalAlpha = 1 - fadeAmount * 0.7;

    ctx.fillStyle = "#2d5016";
    ctx.fillRect(30, 20 + fallOffset, 20, 15);

    ctx.fillStyle = "#3d6b1f";
    ctx.beginPath();
    ctx.arc(32, 15 + fallOffset, 12, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#4d7b2f";
    ctx.fillRect(20, 25 + fallOffset, 24, 20);

    if (frame < 3) {
      ctx.fillStyle = "#ff4444";
      ctx.fillRect(12, 30 + fallOffset, 3, 3);
    }

    ctx.fillStyle = "#3d6b1f";
    ctx.fillRect(35, 40 + fallOffset, 4, 8);
    ctx.fillRect(25, 40 + fallOffset, 4, 8);

    ctx.fillStyle = "#2d5016";
    for (let i = 0; i < 3; i++) {
      ctx.fillRect(43 - i * 3, 22 + i * 3 + fallOffset, 4, 4);
    }

    ctx.globalAlpha = 1;
    canvas.refresh();
  }
}
