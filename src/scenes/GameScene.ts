import Phaser from "phaser";
import { KnightSpriteGenerator } from "../utils/KnightSpriteGenerator";
import { EnemySpriteGenerator } from "../utils/EnemySpriteGenerator";

export class GameScene extends Phaser.Scene {
  private knight?: Phaser.GameObjects.Sprite;
  private currentEnemy?: Phaser.GameObjects.Sprite;
  private gameAreaHeight: number = 640;
  private drawingZoneHeight: number = 640;
  private isEnemyActive: boolean = false;

  constructor() {
    super({ key: "GameScene" });
  }

  preload(): void {
    KnightSpriteGenerator.generateKnightSprites(this);
    EnemySpriteGenerator.generateDragonSprites(this);
  }

  create(): void {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    this.gameAreaHeight = height / 2;
    this.drawingZoneHeight = height / 2;

    this.createBackground();
    this.createDivider();
    this.createDrawingZone();
    this.createKnight();

    this.spawnEnemy();
  }

  private createBackground(): void {
    const width = this.cameras.main.width;

    const bgKey = "forest-background";
    const canvas = this.textures.createCanvas(bgKey, width, this.gameAreaHeight);
    if (!canvas) return;

    const ctx = canvas.context;

    const gradient = ctx.createLinearGradient(0, 0, 0, this.gameAreaHeight);
    gradient.addColorStop(0, "#0a0e1a");
    gradient.addColorStop(1, "#1a2332");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, this.gameAreaHeight);

    ctx.fillStyle = "#0d1821";
    for (let i = 0; i < 8; i++) {
      const x = (i * width) / 8 + (width / 16);
      const treeHeight = 200 + Math.random() * 100;
      const treeWidth = 40 + Math.random() * 20;

      ctx.fillRect(x - treeWidth / 2, this.gameAreaHeight - treeHeight, treeWidth, treeHeight);

      ctx.beginPath();
      ctx.moveTo(x, this.gameAreaHeight - treeHeight - 80);
      ctx.lineTo(x - treeWidth, this.gameAreaHeight - treeHeight);
      ctx.lineTo(x + treeWidth, this.gameAreaHeight - treeHeight);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(x, this.gameAreaHeight - treeHeight - 40);
      ctx.lineTo(x - treeWidth * 0.8, this.gameAreaHeight - treeHeight - 20);
      ctx.lineTo(x + treeWidth * 0.8, this.gameAreaHeight - treeHeight - 20);
      ctx.closePath();
      ctx.fill();
    }

    ctx.fillStyle = "#162028";
    ctx.fillRect(0, this.gameAreaHeight - 60, width, 60);

    for (let i = 0; i < 30; i++) {
      const x = Math.random() * width;
      const y = Math.random() * (this.gameAreaHeight - 60);
      const size = Math.random() * 2 + 1;
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1})`;
      ctx.fillRect(x, y, size, size);
    }

    canvas.refresh();

    this.add.image(width / 2, this.gameAreaHeight / 2, bgKey);
  }

  private createDivider(): void {
    const width = this.cameras.main.width;
    const graphics = this.add.graphics();
    graphics.fillStyle(0x8b4513, 1);
    graphics.fillRect(0, this.gameAreaHeight - 5, width, 10);
  }

  private createDrawingZone(): void {
    const width = this.cameras.main.width;
    const graphics = this.add.graphics();
    graphics.fillStyle(0x2a2a2a, 1);
    graphics.fillRect(0, this.gameAreaHeight, width, this.drawingZoneHeight);

    const text = this.add.text(
      width / 2,
      this.gameAreaHeight + this.drawingZoneHeight / 2,
      "Drawing Zone\n(Coming Soon)",
      {
        fontSize: "24px",
        color: "#666666",
        fontFamily: "Arial, sans-serif",
        align: "center",
      }
    );
    text.setOrigin(0.5, 0.5);
  }

  private createKnight(): void {
    const knightX = 150;
    const knightY = this.gameAreaHeight - 120;

    this.knight = this.add.sprite(knightX, knightY, "knight-idle-0");
    this.knight.setScale(4);
    this.knight.play("knight-idle");
  }

  private spawnEnemy(): void {
    if (this.isEnemyActive) return;

    const width = this.cameras.main.width;
    const enemyX = width + 50;
    const enemyY = this.gameAreaHeight - 120;

    this.currentEnemy = this.add.sprite(enemyX, enemyY, "dragon-idle-0");
    this.currentEnemy.setScale(4);
    this.currentEnemy.setFlipX(true);
    this.currentEnemy.play("dragon-idle");

    this.isEnemyActive = true;

    this.tweens.add({
      targets: this.currentEnemy,
      x: width - 200,
      duration: 2000,
      ease: "Power2",
      onComplete: () => {
        this.time.delayedCall(1000, () => {
          this.attackEnemy();
        });
      },
    });
  }

  private attackEnemy(): void {
    if (!this.knight || !this.currentEnemy) return;

    this.knight.play("knight-slash");

    this.knight.once("animationcomplete", () => {
      this.knight?.play("knight-idle");
      this.defeatEnemy();
    });
  }

  private defeatEnemy(): void {
    if (!this.currentEnemy) return;

    this.currentEnemy.play("dragon-death");

    this.currentEnemy.once("animationcomplete", () => {
      this.currentEnemy?.destroy();
      this.currentEnemy = undefined;
      this.isEnemyActive = false;

      this.time.delayedCall(1500, () => {
        this.spawnEnemy();
      });
    });
  }
}
