import Phaser from "phaser";
import { KnightSpriteGenerator } from "../utils/KnightSpriteGenerator";
import { EnemySpriteGenerator } from "../utils/EnemySpriteGenerator";
import { DrawingSystem } from "../systems/DrawingSystem";
import { HangulRecognitionSystem } from "../systems/HangulRecognitionSystem";
import { BASIC_JAMO_LESSONS, Hangul } from "../data/hangul";

export class GameScene extends Phaser.Scene {
  private knight?: Phaser.GameObjects.Sprite;
  private currentEnemy: Phaser.GameObjects.Sprite | null = null;
  private gameAreaHeight: number = 640;
  private drawingZoneHeight: number = 640;
  private isEnemyActive: boolean = false;
  private drawingSystem?: DrawingSystem;
  private recognitionSystem: HangulRecognitionSystem = new HangulRecognitionSystem();
  private currentLessonIndex: number = 0;
  private lessons: Hangul[] = BASIC_JAMO_LESSONS;
  private targetText?: Phaser.GameObjects.Text;
  private instructionText?: Phaser.GameObjects.Text;
  private feedbackText?: Phaser.GameObjects.Text;

  constructor() {
    super({ key: "GameScene" });
  }

  preload(): void {
    KnightSpriteGenerator.generateKnightSprites(this);
    EnemySpriteGenerator.generateDragonSprites(this);
  }

  create(): void {
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

    const currentLesson = this.lessons[this.currentLessonIndex];
    if (!currentLesson) return;

    this.targetText = this.add.text(
      width / 2,
      this.gameAreaHeight + 60,
      currentLesson.korean,
      {
        fontSize: "120px",
        color: "#666666",
        fontFamily: "Arial, sans-serif",
      }
    );
    this.targetText.setOrigin(0.5, 0.5);

    this.instructionText = this.add.text(
      width / 2,
      this.gameAreaHeight + 160,
      `${currentLesson.romanization} - ${currentLesson.english}`,
      {
        fontSize: "18px",
        color: "#aaaaaa",
        fontFamily: "Arial, sans-serif",
      }
    );
    this.instructionText.setOrigin(0.5, 0.5);

    const drawAreaY = this.gameAreaHeight + 220;
    const drawAreaHeight = 280;

    const drawAreaGraphics = this.add.graphics();
    drawAreaGraphics.lineStyle(2, 0x555555, 1);
    drawAreaGraphics.strokeRect(40, drawAreaY, width - 80, drawAreaHeight);

    this.drawingSystem = new DrawingSystem(
      this,
      40,
      drawAreaY,
      width - 80,
      drawAreaHeight
    );

    const buttonY = this.gameAreaHeight + 550;

    this.createButton(150, buttonY, "Clear", () => {
      this.clearDrawing();
    });

    this.createButton(width - 150, buttonY, "Submit", () => {
      this.submitDrawing();
    });

    this.feedbackText = this.add.text(width / 2, this.gameAreaHeight + 600, "", {
      fontSize: "20px",
      color: "#ffff00",
      fontFamily: "Arial, sans-serif",
      align: "center",
    });
    this.feedbackText.setOrigin(0.5, 0.5);
  }

  private createButton(
    x: number,
    y: number,
    text: string,
    callback: () => void
  ): Phaser.GameObjects.Container {
    const buttonWidth = 120;
    const buttonHeight = 50;

    const bg = this.add.graphics();
    bg.fillStyle(0x4a4a4a, 1);
    bg.fillRoundedRect(-buttonWidth / 2, -buttonHeight / 2, buttonWidth, buttonHeight, 10);

    const label = this.add.text(0, 0, text, {
      fontSize: "20px",
      color: "#ffffff",
      fontFamily: "Arial, sans-serif",
    });
    label.setOrigin(0.5, 0.5);

    const container = this.add.container(x, y, [bg, label]);
    container.setSize(buttonWidth, buttonHeight);
    container.setInteractive();

    container.on("pointerdown", callback);

    container.on("pointerover", () => {
      bg.clear();
      bg.fillStyle(0x6a6a6a, 1);
      bg.fillRoundedRect(-buttonWidth / 2, -buttonHeight / 2, buttonWidth, buttonHeight, 10);
    });

    container.on("pointerout", () => {
      bg.clear();
      bg.fillStyle(0x4a4a4a, 1);
      bg.fillRoundedRect(-buttonWidth / 2, -buttonHeight / 2, buttonWidth, buttonHeight, 10);
    });

    return container;
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
      this.currentEnemy = null;
      this.isEnemyActive = false;

      this.time.delayedCall(1500, () => {
        this.nextLesson();
      });
    });
  }

  private clearDrawing(): void {
    this.drawingSystem?.clear();
    if (this.feedbackText) {
      this.feedbackText.setText("");
    }
  }

  private submitDrawing(): void {
    if (!this.drawingSystem) return;

    const strokes = this.drawingSystem.getStrokes();
    const currentLesson = this.lessons[this.currentLessonIndex];
    if (!currentLesson) return;

    console.log("=== SUBMIT DEBUG ===");
    console.log("Number of strokes:", strokes.length);
    console.log("Total points:", strokes.reduce((sum, stroke) => sum + stroke.length, 0));
    console.log("Target character:", currentLesson.korean);
    if (strokes.length > 0) {
      console.log("First stroke sample:", strokes[0]?.slice(0, 3));
    }

    const isCorrect = this.recognitionSystem.validateDrawing(
      strokes,
      currentLesson.korean,
      true
    );

    if (isCorrect) {
      if (this.feedbackText) {
        this.feedbackText.setText("Correct!");
        this.feedbackText.setColor("#00ff00");
      }

      this.time.delayedCall(500, () => {
        this.attackEnemy();
        this.clearDrawing();
      });
    } else {
      if (this.feedbackText) {
        this.feedbackText.setText("Try again!");
        this.feedbackText.setColor("#ff0000");
      }

      this.time.delayedCall(1000, () => {
        this.clearDrawing();
      });
    }
  }

  private nextLesson(): void {
    this.currentLessonIndex = (this.currentLessonIndex + 1) % this.lessons.length;
    this.updateDrawingZone();
    this.spawnEnemy();
  }

  private updateDrawingZone(): void {
    const currentLesson = this.lessons[this.currentLessonIndex];
    if (!currentLesson) return;

    if (this.targetText) {
      this.targetText.setText(currentLesson.korean);
    }

    if (this.instructionText) {
      this.instructionText.setText(
        `${currentLesson.romanization} - ${currentLesson.english}`
      );
    }

    this.clearDrawing();
  }
}
