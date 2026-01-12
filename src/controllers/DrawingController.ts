import { validateDrawing, type Point } from "../logic/hangul";

export class DrawingController {
  private graphics: Phaser.GameObjects.Graphics;
  private isDrawing: boolean = false;
  private currentStroke: Point[] = [];
  private allStrokes: Point[][] = [];
  private bounds: { x: number; y: number; width: number; height: number };

  constructor(
    scene: Phaser.Scene,
    bounds: { x: number; y: number; width: number; height: number }
  ) {
    this.bounds = bounds;
    this.graphics = scene.add.graphics();
    this.graphics.lineStyle(4, 0xffffff, 1);

    scene.input.on("pointerdown", this.onPointerDown, this);
    scene.input.on("pointermove", this.onPointerMove, this);
    scene.input.on("pointerup", this.onPointerUp, this);
  }

  private isInBounds(x: number, y: number): boolean {
    return (
      x >= this.bounds.x &&
      x <= this.bounds.x + this.bounds.width &&
      y >= this.bounds.y &&
      y <= this.bounds.y + this.bounds.height
    );
  }

  private onPointerDown(pointer: Phaser.Input.Pointer): void {
    if (this.isInBounds(pointer.x, pointer.y)) {
      this.isDrawing = true;
      this.currentStroke = [{ x: pointer.x, y: pointer.y }];
    }
  }

  private onPointerMove(pointer: Phaser.Input.Pointer): void {
    if (this.isDrawing && this.isInBounds(pointer.x, pointer.y)) {
      const lastPoint = this.currentStroke[this.currentStroke.length - 1];
      if (!lastPoint) return;

      const newPoint = { x: pointer.x, y: pointer.y };
      this.currentStroke.push(newPoint);
      this.graphics.lineBetween(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
    }
  }

  private onPointerUp(): void {
    if (this.isDrawing && this.currentStroke.length > 0) {
      this.allStrokes.push([...this.currentStroke]);
      this.currentStroke = [];
      this.isDrawing = false;
    }
  }

  public validateDrawing(targetCharacter: string): boolean {
    return validateDrawing(this.allStrokes, targetCharacter);
  }

  public clear(): void {
    this.allStrokes = [];
    this.currentStroke = [];
    this.graphics.clear();
    this.graphics.lineStyle(4, 0xffffff, 1);
  }

  public destroy(): void {
    this.graphics.destroy();
  }
}
