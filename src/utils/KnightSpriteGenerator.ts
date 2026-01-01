import Phaser from "phaser";

export class KnightSpriteGenerator {
  static loadKnightSprites(scene: Phaser.Scene): void {
    scene.load.spritesheet("knight-idle", "sprites/knight-idle.png", {
      frameWidth: 169,
      frameHeight: 369,
    });

    scene.load.spritesheet("knight-slash", "sprites/knight-slash.png", {
      frameWidth: 225,
      frameHeight: 184,
    });
  }

  static createAnimations(scene: Phaser.Scene): void {
    scene.anims.create({
      key: "knight-idle",
      frames: scene.anims.generateFrameNumbers("knight-idle", {
        start: 0,
        end: 3,
      }),
      frameRate: 4,
      repeat: -1,
    });

    scene.anims.create({
      key: "knight-slash",
      frames: scene.anims.generateFrameNumbers("knight-slash", {
        start: 0,
        end: 5,
      }),
      frameRate: 12,
      repeat: 0,
    });
  }
}
