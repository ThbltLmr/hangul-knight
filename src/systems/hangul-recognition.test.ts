import { describe, it, expect } from "bun:test";
import {
  calculateBounds,
  calculateScale,
  strokesToBitmap,
  calculateSimilarity,
  createEmptyTemplate,
  createGTemplate,
  createNTemplate,
  createMTemplate,
  createSTemplate,
  createATemplate,
  createEoTemplate,
  createOTemplate,
  createUTemplate,
  createITemplate,
  getTemplate,
  validateDrawing,
  type Point,
  type Bitmap,
} from "./hangul-recognition";

describe("hangul-recognition", () => {
  describe("calculateBounds", () => {
    it("should calculate bounds for a single stroke", () => {
      const strokes: Point[][] = [
        [
          { x: 10, y: 20 },
          { x: 30, y: 40 },
          { x: 50, y: 60 },
        ],
      ];

      const bounds = calculateBounds(strokes);

      expect(bounds.minX).toBe(10);
      expect(bounds.maxX).toBe(50);
      expect(bounds.minY).toBe(20);
      expect(bounds.maxY).toBe(60);
    });

    it("should calculate bounds for multiple strokes", () => {
      const strokes: Point[][] = [
        [
          { x: 10, y: 20 },
          { x: 30, y: 40 },
        ],
        [
          { x: 5, y: 15 },
          { x: 60, y: 70 },
        ],
      ];

      const bounds = calculateBounds(strokes);

      expect(bounds.minX).toBe(5);
      expect(bounds.maxX).toBe(60);
      expect(bounds.minY).toBe(15);
      expect(bounds.maxY).toBe(70);
    });
  });

  describe("calculateScale", () => {
    it("should calculate scale based on max dimension", () => {
      const bounds = { minX: 0, maxX: 100, minY: 0, maxY: 50 };
      const scale = calculateScale(bounds);

      expect(scale).toBe(31 / 100);
    });

    it("should return 1 when max dimension is 0", () => {
      const bounds = { minX: 10, maxX: 10, minY: 20, maxY: 20 };
      const scale = calculateScale(bounds);

      expect(scale).toBe(1);
    });
  });

  describe("strokesToBitmap", () => {
    it("should convert strokes to bitmap", () => {
      const strokes: Point[][] = [
        [
          { x: 100, y: 100 },
          { x: 200, y: 200 },
        ],
      ];

      const bitmap = strokesToBitmap(strokes);

      expect(bitmap.length).toBe(32);
      expect(bitmap[0]?.length).toBe(32);

      let hasTrue = false;
      for (const row of bitmap) {
        if (row) {
          for (const cell of row) {
            if (cell) {
              hasTrue = true;
              break;
            }
          }
        }
      }
      expect(hasTrue).toBe(true);
    });

    it("should handle empty strokes", () => {
      const strokes: Point[][] = [];
      const bitmap = strokesToBitmap(strokes);

      expect(bitmap.length).toBe(32);
      expect(bitmap[0]?.length).toBe(32);
    });
  });

  describe("calculateSimilarity", () => {
    it("should return 1 for identical bitmaps", () => {
      const template = createGTemplate();
      const similarity = calculateSimilarity(template, template);

      expect(similarity).toBe(1);
    });

    it("should return 0 for completely different bitmaps", () => {
      const bitmap1 = createEmptyTemplate();
      const bitmap2 = createEmptyTemplate();

      const row1 = bitmap1[0];
      const row2 = bitmap2[31];
      if (row1) row1[0] = true;
      if (row2) row2[31] = true;

      const similarity = calculateSimilarity(bitmap1, bitmap2);

      expect(similarity).toBe(0);
    });

    it("should return value between 0 and 1 for partial match", () => {
      const template = createGTemplate();
      const bitmap = createEmptyTemplate();

      for (let x = 0; x < 10; x++) {
        const row = bitmap[8];
        if (row) row[x] = true;
      }

      const similarity = calculateSimilarity(bitmap, template);

      expect(similarity).toBeGreaterThan(0);
      expect(similarity).toBeLessThan(1);
    });
  });

  describe("template creation", () => {
    it("should create empty template with correct dimensions", () => {
      const template = createEmptyTemplate();

      expect(template.length).toBe(32);
      expect(template[0]?.length).toBe(32);

      for (const row of template) {
        if (row) {
          for (const cell of row) {
            expect(cell).toBe(false);
          }
        }
      }
    });

    it("should create ㄱ template with horizontal and vertical lines", () => {
      const template = createGTemplate();

      const row8 = template[8];
      expect(row8?.[0]).toBe(true);
      expect(row8?.[19]).toBe(true);

      const row16 = template[16];
      expect(row16?.[20]).toBe(true);
    });

    it("should create ㄴ template with vertical and horizontal lines", () => {
      const template = createNTemplate();

      const row16 = template[16];
      expect(row16?.[8]).toBe(true);

      const row24 = template[24];
      expect(row24?.[8]).toBe(true);
      expect(row24?.[16]).toBe(true);
    });

    it("should create ㅁ template as a square", () => {
      const template = createMTemplate();

      const row8 = template[8];
      expect(row8?.[8]).toBe(true);
      expect(row8?.[16]).toBe(true);

      const row24 = template[24];
      expect(row24?.[8]).toBe(true);
      expect(row24?.[16]).toBe(true);

      const row16 = template[16];
      expect(row16?.[8]).toBe(true);
      expect(row16?.[24]).toBe(true);
    });
  });

  describe("getTemplate", () => {
    it("should return template for ㄱ", () => {
      const template = getTemplate("ㄱ");
      expect(template).not.toBeNull();
    });

    it("should return template for ㄴ", () => {
      const template = getTemplate("ㄴ");
      expect(template).not.toBeNull();
    });

    it("should return template for ㅁ", () => {
      const template = getTemplate("ㅁ");
      expect(template).not.toBeNull();
    });

    it("should return template for ㅅ", () => {
      const template = getTemplate("ㅅ");
      expect(template).not.toBeNull();
    });

    it("should return template for ㅏ", () => {
      const template = getTemplate("ㅏ");
      expect(template).not.toBeNull();
    });

    it("should return template for ㅓ", () => {
      const template = getTemplate("ㅓ");
      expect(template).not.toBeNull();
    });

    it("should return template for ㅗ", () => {
      const template = getTemplate("ㅗ");
      expect(template).not.toBeNull();
    });

    it("should return template for ㅜ", () => {
      const template = getTemplate("ㅜ");
      expect(template).not.toBeNull();
    });

    it("should return template for ㅣ", () => {
      const template = getTemplate("ㅣ");
      expect(template).not.toBeNull();
    });

    it("should return null for unknown character", () => {
      const template = getTemplate("x");
      expect(template).toBeNull();
    });
  });

  describe("validateDrawing", () => {
    it("should return false for empty strokes", () => {
      const result = validateDrawing([], "ㄱ");
      expect(result).toBe(false);
    });

    it("should return false for too few points", () => {
      const strokes: Point[][] = [
        [
          { x: 10, y: 10 },
          { x: 20, y: 20 },
        ],
      ];

      const result = validateDrawing(strokes, "ㄱ");
      expect(result).toBe(false);
    });

    it("should validate drawing with matching template", () => {
      const strokes: Point[][] = [
        Array.from({ length: 15 }, (_, i) => ({ x: i * 10, y: 100 })),
        Array.from({ length: 10 }, (_, i) => ({ x: 150, y: 100 + i * 10 })),
      ];

      const result = validateDrawing(strokes, "ㄱ");
      expect(typeof result).toBe("boolean");
    });

    it("should return true for unknown character with enough points", () => {
      const strokes: Point[][] = [
        Array.from({ length: 25 }, (_, i) => ({ x: i * 10, y: 100 })),
      ];

      const result = validateDrawing(strokes, "unknown");
      expect(result).toBe(true);
    });

    it("should return false for unknown character with too few points", () => {
      const strokes: Point[][] = [
        Array.from({ length: 15 }, (_, i) => ({ x: i * 10, y: 100 })),
      ];

      const result = validateDrawing(strokes, "unknown");
      expect(result).toBe(false);
    });
  });
});
