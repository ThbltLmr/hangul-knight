import Phaser from "phaser";

export class EnemySpriteGenerator {
  static loadDragonSprites(scene: Phaser.Scene): void {
    scene.load.spritesheet("dragon-idle", "sprites/dragon-idle.png", {
      frameWidth: 169,
      frameHeight: 369,
    });
  }

  static createAnimations(scene: Phaser.Scene): void {
    scene.anims.create({
      key: "dragon-idle",
      frames: scene.anims.generateFrameNumbers("dragon-idle", {
        start: 0,
        end: 3,
      }),
      frameRate: 6,
      repeat: -1,
    });
  }
}
