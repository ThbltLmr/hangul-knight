import Phaser from "phaser";
import { EnemyKnightSpriteGenerator } from "../utils/EnemyKnightSpriteGenerator";

export class GameScene extends Phaser.Scene {
  private player!: Phaser.GameObjects.Sprite;
  private enemy!: Phaser.GameObjects.Sprite;
  private ground!: Phaser.GameObjects.Rectangle;
  private movementArea!: Phaser.GameObjects.Rectangle;
  private drawingArea!: Phaser.GameObjects.Rectangle;
  private wordText!: Phaser.GameObjects.Text;

  constructor() {
    super({ key: "GameScene" });
  }

  preload(): void {
    // Generate enemy knight sprites
    EnemyKnightSpriteGenerator.createEnemyKnightSprites(this);
  }

  create(): void {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Create sky background
    this.cameras.main.setBackgroundColor("#87CEEB");

    // Create ground (green field)
    const groundHeight = 200;
    this.ground = this.add.rectangle(
      width / 2,
      height - groundHeight / 2,
      width,
      groundHeight,
      0x3a9d23
    );
    this.physics.add.existing(this.ground, true); // static body

    // Create player knight on the left
    this.player = this.add.sprite(150, height - groundHeight - 50, "knight-walk-1");
    this.player.setScale(4);
    this.player.play("knight-walk");
    this.physics.add.existing(this.player);
    const playerBody = this.player.body as Phaser.Physics.Arcade.Body;
    playerBody.setCollideWorldBounds(true);

    // Create enemy knight animation (different color)
    this.anims.create({
      key: "enemy-knight-walk",
      frames: [
        { key: "enemy-knight-walk-1" },
        { key: "enemy-knight-walk-2" },
        { key: "enemy-knight-walk-3" },
        { key: "enemy-knight-walk-4" },
      ],
      frameRate: 8,
      repeat: -1,
    });

    // Create enemy knight on the right (starts off screen)
    this.enemy = this.add.sprite(width + 100, height - groundHeight - 50, "enemy-knight-walk-1");
    this.enemy.setScale(4);
    this.enemy.setFlipX(true); // Face left
    this.enemy.play("enemy-knight-walk");
    this.physics.add.existing(this.enemy);
    const enemyBody = this.enemy.body as Phaser.Physics.Arcade.Body;
    enemyBody.setVelocityX(-100); // Move left towards player

    // Add collisions
    this.physics.add.collider(this.player, this.ground);
    this.physics.add.collider(this.enemy, this.ground);

    // Create UI areas at the bottom
    const uiAreaHeight = 300;
    const uiY = height - uiAreaHeight / 2;

    // Movement area (left side)
    const movementWidth = width / 2 - 20;
    this.movementArea = this.add.rectangle(
      movementWidth / 2 + 10,
      uiY,
      movementWidth,
      uiAreaHeight - 20,
      0x4a5568,
      0.3
    );
    this.movementArea.setStrokeStyle(2, 0xffffff, 0.5);

    const movementLabel = this.add.text(
      this.movementArea.x,
      this.movementArea.y - this.movementArea.height / 2 + 20,
      "MOVEMENT",
      {
        fontSize: "18px",
        color: "#ffffff",
        fontFamily: "Arial, sans-serif",
      }
    );
    movementLabel.setOrigin(0.5, 0.5);

    // Drawing area (right side)
    const drawingWidth = width / 2 - 20;
    this.drawingArea = this.add.rectangle(
      width / 2 + drawingWidth / 2 + 10,
      uiY,
      drawingWidth,
      uiAreaHeight - 20,
      0x4a5568,
      0.3
    );
    this.drawingArea.setStrokeStyle(2, 0xffffff, 0.5);

    const drawingLabel = this.add.text(
      this.drawingArea.x,
      this.drawingArea.y - this.drawingArea.height / 2 + 20,
      "DRAW HANGUL",
      {
        fontSize: "18px",
        color: "#ffffff",
        fontFamily: "Arial, sans-serif",
      }
    );
    drawingLabel.setOrigin(0.5, 0.5);

    // Display the Korean word above the enemy
    this.wordText = this.add.text(width - 150, 100, "있다", {
      fontSize: "48px",
      color: "#ffffff",
      fontFamily: "Arial, sans-serif",
      stroke: "#000000",
      strokeThickness: 4,
    });
    this.wordText.setOrigin(0.5, 0.5);

    // Stop enemy when it reaches a certain position
    this.time.addEvent({
      delay: 100,
      callback: () => {
        if (this.enemy.x <= width - 200) {
          const body = this.enemy.body as Phaser.Physics.Arcade.Body;
          body.setVelocityX(0);
        }
      },
      loop: true,
    });
  }

  update(): void {
    // Game update logic will go here
  }
}
