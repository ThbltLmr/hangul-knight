import { Point } from "./DrawingSystem";

interface BoundingBox {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

export class HangulRecognitionSystem {
  private gridSize: number = 32;
  private recognitionThreshold: number = 0.6;

  public validateDrawing(strokes: Point[][], targetCharacter: string): boolean {
    if (strokes.length === 0) {
      return false;
    }

    const totalPoints = strokes.reduce((sum, stroke) => sum + stroke.length, 0);
    if (totalPoints < 10) {
      return false;
    }

    const bitmap = this.strokesToBitmap(strokes);
    const template = this.getTemplate(targetCharacter);

    if (!template) {
      return totalPoints > 20;
    }

    const similarity = this.calculateSimilarity(bitmap, template);
    return similarity >= this.recognitionThreshold;
  }

  private strokesToBitmap(strokes: Point[][]): boolean[][] {
    const bitmap: boolean[][] = Array(this.gridSize)
      .fill(null)
      .map(() => Array(this.gridSize).fill(false));

    const bounds = this.calculateBounds(strokes);
    const scale = this.calculateScale(bounds);

    for (const stroke of strokes) {
      for (const point of stroke) {
        const normalizedX = Math.floor(
          ((point.x - bounds.minX) * scale) % this.gridSize
        );
        const normalizedY = Math.floor(
          ((point.y - bounds.minY) * scale) % this.gridSize
        );

        if (
          normalizedX >= 0 &&
          normalizedX < this.gridSize &&
          normalizedY >= 0 &&
          normalizedY < this.gridSize
        ) {
          const row = bitmap[normalizedY];
          if (row) {
            row[normalizedX] = true;
          }
        }
      }
    }

    return bitmap;
  }

  private calculateBounds(strokes: Point[][]): BoundingBox {
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;

    for (const stroke of strokes) {
      for (const point of stroke) {
        minX = Math.min(minX, point.x);
        maxX = Math.max(maxX, point.x);
        minY = Math.min(minY, point.y);
        maxY = Math.max(maxY, point.y);
      }
    }

    return { minX, maxX, minY, maxY };
  }

  private calculateScale(bounds: BoundingBox): number {
    const width = bounds.maxX - bounds.minX;
    const height = bounds.maxY - bounds.minY;
    const maxDimension = Math.max(width, height);

    return maxDimension > 0 ? (this.gridSize - 1) / maxDimension : 1;
  }

  private calculateSimilarity(
    bitmap: boolean[][],
    template: boolean[][]
  ): number {
    let matches = 0;
    let total = 0;

    for (let y = 0; y < this.gridSize; y++) {
      const bitmapRow = bitmap[y];
      const templateRow = template[y];
      if (!bitmapRow || !templateRow) continue;

      for (let x = 0; x < this.gridSize; x++) {
        if (bitmapRow[x] || templateRow[x]) {
          total++;
          if (bitmapRow[x] === templateRow[x]) {
            matches++;
          }
        }
      }
    }

    return total > 0 ? matches / total : 0;
  }

  private getTemplate(character: string): boolean[][] | null {
    const templates: { [key: string]: boolean[][] } = {
      ㄱ: this.createGTemplate(),
      ㄴ: this.createNTemplate(),
      ㅁ: this.createMTemplate(),
      ㅅ: this.createSTemplate(),
      ㅏ: this.createATemplate(),
      ㅓ: this.createEoTemplate(),
      ㅗ: this.createOTemplate(),
      ㅜ: this.createUTemplate(),
      ㅣ: this.createITemplate(),
    };

    return templates[character] || null;
  }

  private createGTemplate(): boolean[][] {
    const template = this.createEmptyTemplate();
    for (let x = 0; x < 20; x++) {
      const row = template[8];
      if (row) row[x] = true;
    }
    for (let y = 8; y < 24; y++) {
      const row = template[y];
      if (row) row[20] = true;
    }
    return template;
  }

  private createNTemplate(): boolean[][] {
    const template = this.createEmptyTemplate();
    for (let y = 8; y < 24; y++) {
      const row = template[y];
      if (row) row[8] = true;
    }
    for (let x = 8; x < 24; x++) {
      const row = template[24];
      if (row) row[x] = true;
    }
    return template;
  }

  private createMTemplate(): boolean[][] {
    const template = this.createEmptyTemplate();
    for (let x = 8; x < 24; x++) {
      const row8 = template[8];
      const row24 = template[24];
      if (row8) row8[x] = true;
      if (row24) row24[x] = true;
    }
    for (let y = 8; y < 24; y++) {
      const row = template[y];
      if (row) {
        row[8] = true;
        row[24] = true;
      }
    }
    return template;
  }

  private createSTemplate(): boolean[][] {
    const template = this.createEmptyTemplate();
    for (let y = 8; y < 12; y++) {
      const row = template[y];
      if (row) {
        row[12] = true;
        row[20] = true;
      }
    }
    for (let y = 20; y < 24; y++) {
      const row = template[y];
      if (row) {
        row[12] = true;
        row[20] = true;
      }
    }
    return template;
  }

  private createATemplate(): boolean[][] {
    const template = this.createEmptyTemplate();
    for (let y = 8; y < 24; y++) {
      const row = template[y];
      if (row) row[12] = true;
    }
    for (let y = 12; y < 20; y++) {
      const row = template[y];
      if (row) row[20] = true;
    }
    return template;
  }

  private createEoTemplate(): boolean[][] {
    const template = this.createEmptyTemplate();
    for (let y = 8; y < 24; y++) {
      const row = template[y];
      if (row) row[20] = true;
    }
    for (let y = 12; y < 20; y++) {
      const row = template[y];
      if (row) row[12] = true;
    }
    return template;
  }

  private createOTemplate(): boolean[][] {
    const template = this.createEmptyTemplate();
    for (let x = 8; x < 24; x++) {
      const row = template[12];
      if (row) row[x] = true;
    }
    for (let y = 12; y < 24; y++) {
      const row = template[y];
      if (row) row[16] = true;
    }
    return template;
  }

  private createUTemplate(): boolean[][] {
    const template = this.createEmptyTemplate();
    for (let x = 8; x < 24; x++) {
      const row = template[20];
      if (row) row[x] = true;
    }
    for (let y = 8; y < 20; y++) {
      const row = template[y];
      if (row) row[16] = true;
    }
    return template;
  }

  private createITemplate(): boolean[][] {
    const template = this.createEmptyTemplate();
    for (let y = 8; y < 24; y++) {
      const row = template[y];
      if (row) row[16] = true;
    }
    return template;
  }

  private createEmptyTemplate(): boolean[][] {
    return Array(this.gridSize)
      .fill(null)
      .map(() => Array(this.gridSize).fill(false));
  }
}
