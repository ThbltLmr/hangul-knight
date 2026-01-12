import { describe, it, expect } from "bun:test";
import {
  detectStrokeDirection,
  getTemplate,
  validateDrawing,
  StrokeDirection,
  type Point,
} from "./hangul";

describe("hangul-recognition", () => {
  describe("detectStrokeDirection", () => {
    it("should return null for empty stroke", () => {
      const result = detectStrokeDirection([]);
      expect(result).toBeNull();
    });

    it("should return null for single point stroke", () => {
      const result = detectStrokeDirection([{ x: 10, y: 10 }]);
      expect(result).toBeNull();
    });

    it("should detect right direction", () => {
      const stroke: Point[] = [
        { x: 0, y: 0 },
        { x: 100, y: 0 },
      ];
      expect(detectStrokeDirection(stroke)).toBe(StrokeDirection.Right);
    });

    it("should detect left direction", () => {
      const stroke: Point[] = [
        { x: 100, y: 0 },
        { x: 0, y: 0 },
      ];
      expect(detectStrokeDirection(stroke)).toBe(StrokeDirection.Left);
    });

    it("should detect down direction", () => {
      const stroke: Point[] = [
        { x: 0, y: 0 },
        { x: 0, y: 100 },
      ];
      expect(detectStrokeDirection(stroke)).toBe(StrokeDirection.Down);
    });

    it("should detect up direction", () => {
      const stroke: Point[] = [
        { x: 0, y: 100 },
        { x: 0, y: 0 },
      ];
      expect(detectStrokeDirection(stroke)).toBe(StrokeDirection.Up);
    });

    it("should detect down-right direction", () => {
      const stroke: Point[] = [
        { x: 0, y: 0 },
        { x: 100, y: 100 },
      ];
      expect(detectStrokeDirection(stroke)).toBe(StrokeDirection.DownRight);
    });

    it("should detect down-left direction", () => {
      const stroke: Point[] = [
        { x: 100, y: 0 },
        { x: 0, y: 100 },
      ];
      expect(detectStrokeDirection(stroke)).toBe(StrokeDirection.DownLeft);
    });

    it("should detect up-right direction", () => {
      const stroke: Point[] = [
        { x: 0, y: 100 },
        { x: 100, y: 0 },
      ];
      expect(detectStrokeDirection(stroke)).toBe(StrokeDirection.UpRight);
    });

    it("should detect up-left direction", () => {
      const stroke: Point[] = [
        { x: 100, y: 100 },
        { x: 0, y: 0 },
      ];
      expect(detectStrokeDirection(stroke)).toBe(StrokeDirection.UpLeft);
    });

    it("should use start and end points only, ignoring middle points", () => {
      const stroke: Point[] = [
        { x: 0, y: 0 },
        { x: 50, y: 200 },
        { x: 100, y: 0 },
      ];
      expect(detectStrokeDirection(stroke)).toBe(StrokeDirection.Right);
    });
  });

  describe("getTemplate", () => {
    it("should return template for ㄱ", () => {
      const template = getTemplate("ㄱ");
      expect(template).not.toBeNull();
      expect(template?.strokes).toEqual([
        StrokeDirection.Right,
        StrokeDirection.Down,
      ]);
    });

    it("should return template for ㄴ", () => {
      const template = getTemplate("ㄴ");
      expect(template).not.toBeNull();
      expect(template?.strokes).toEqual([
        StrokeDirection.Down,
        StrokeDirection.Right,
      ]);
    });

    it("should return template for ㅁ", () => {
      const template = getTemplate("ㅁ");
      expect(template).not.toBeNull();
      expect(template?.strokes).toEqual([
        StrokeDirection.Right,
        StrokeDirection.Down,
        StrokeDirection.Left,
        StrokeDirection.Down,
      ]);
    });

    it("should return template for ㅅ", () => {
      const template = getTemplate("ㅅ");
      expect(template).not.toBeNull();
      expect(template?.strokes).toEqual([
        StrokeDirection.DownRight,
        StrokeDirection.DownLeft,
      ]);
    });

    it("should return template for ㅏ", () => {
      const template = getTemplate("ㅏ");
      expect(template).not.toBeNull();
      expect(template?.strokes).toEqual([
        StrokeDirection.Down,
        StrokeDirection.Right,
      ]);
    });

    it("should return template for ㅓ", () => {
      const template = getTemplate("ㅓ");
      expect(template).not.toBeNull();
      expect(template?.strokes).toEqual([
        StrokeDirection.Left,
        StrokeDirection.Down,
      ]);
    });

    it("should return template for ㅗ", () => {
      const template = getTemplate("ㅗ");
      expect(template).not.toBeNull();
      expect(template?.strokes).toEqual([
        StrokeDirection.Up,
        StrokeDirection.Right,
      ]);
    });

    it("should return template for ㅜ", () => {
      const template = getTemplate("ㅜ");
      expect(template).not.toBeNull();
      expect(template?.strokes).toEqual([
        StrokeDirection.Right,
        StrokeDirection.Down,
      ]);
    });

    it("should return template for ㅣ", () => {
      const template = getTemplate("ㅣ");
      expect(template).not.toBeNull();
      expect(template?.strokes).toEqual([StrokeDirection.Down]);
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

    it("should return false when stroke count does not match", () => {
      const strokes: Point[][] = [
        [
          { x: 0, y: 0 },
          { x: 100, y: 0 },
        ],
      ];
      const result = validateDrawing(strokes, "ㄱ");
      expect(result).toBe(false);
    });

    it("should return false when stroke direction does not match", () => {
      const strokes: Point[][] = [
        [
          { x: 0, y: 0 },
          { x: 0, y: 100 },
        ],
        [
          { x: 0, y: 0 },
          { x: 100, y: 0 },
        ],
      ];
      const result = validateDrawing(strokes, "ㄱ");
      expect(result).toBe(false);
    });

    it("should return true for correct ㄱ drawing", () => {
      const strokes: Point[][] = [
        [
          { x: 0, y: 0 },
          { x: 100, y: 0 },
        ],
        [
          { x: 100, y: 0 },
          { x: 100, y: 100 },
        ],
      ];
      const result = validateDrawing(strokes, "ㄱ");
      expect(result).toBe(true);
    });

    it("should return true for correct ㄴ drawing", () => {
      const strokes: Point[][] = [
        [
          { x: 0, y: 0 },
          { x: 0, y: 100 },
        ],
        [
          { x: 0, y: 100 },
          { x: 100, y: 100 },
        ],
      ];
      const result = validateDrawing(strokes, "ㄴ");
      expect(result).toBe(true);
    });

    it("should return true for correct ㅁ drawing", () => {
      const strokes: Point[][] = [
        [
          { x: 0, y: 0 },
          { x: 100, y: 0 },
        ],
        [
          { x: 100, y: 0 },
          { x: 100, y: 100 },
        ],
        [
          { x: 100, y: 100 },
          { x: 0, y: 100 },
        ],
        [
          { x: 0, y: 0 },
          { x: 0, y: 100 },
        ],
      ];
      const result = validateDrawing(strokes, "ㅁ");
      expect(result).toBe(true);
    });

    it("should return true for correct ㅅ drawing", () => {
      const strokes: Point[][] = [
        [
          { x: 50, y: 0 },
          { x: 100, y: 100 },
        ],
        [
          { x: 50, y: 0 },
          { x: 0, y: 100 },
        ],
      ];
      const result = validateDrawing(strokes, "ㅅ");
      expect(result).toBe(true);
    });

    it("should return true for correct ㅏ drawing", () => {
      const strokes: Point[][] = [
        [
          { x: 0, y: 0 },
          { x: 0, y: 100 },
        ],
        [
          { x: 0, y: 50 },
          { x: 50, y: 50 },
        ],
      ];
      const result = validateDrawing(strokes, "ㅏ");
      expect(result).toBe(true);
    });

    it("should return true for correct ㅓ drawing", () => {
      const strokes: Point[][] = [
        [
          { x: 50, y: 50 },
          { x: 0, y: 50 },
        ],
        [
          { x: 50, y: 0 },
          { x: 50, y: 100 },
        ],
      ];
      const result = validateDrawing(strokes, "ㅓ");
      expect(result).toBe(true);
    });

    it("should return true for correct ㅗ drawing", () => {
      const strokes: Point[][] = [
        [
          { x: 50, y: 50 },
          { x: 50, y: 0 },
        ],
        [
          { x: 0, y: 50 },
          { x: 100, y: 50 },
        ],
      ];
      const result = validateDrawing(strokes, "ㅗ");
      expect(result).toBe(true);
    });

    it("should return true for correct ㅜ drawing", () => {
      const strokes: Point[][] = [
        [
          { x: 0, y: 0 },
          { x: 100, y: 0 },
        ],
        [
          { x: 50, y: 0 },
          { x: 50, y: 50 },
        ],
      ];
      const result = validateDrawing(strokes, "ㅜ");
      expect(result).toBe(true);
    });

    it("should return true for correct ㅣ drawing", () => {
      const strokes: Point[][] = [
        [
          { x: 50, y: 0 },
          { x: 50, y: 100 },
        ],
      ];
      const result = validateDrawing(strokes, "ㅣ");
      expect(result).toBe(true);
    });

    it("should return true for unknown character with enough points", () => {
      const strokes: Point[][] = [
        Array.from({ length: 20 }, (_, i) => ({ x: i * 10, y: 100 })),
      ];
      const result = validateDrawing(strokes, "unknown");
      expect(result).toBe(true);
    });

    it("should return false for unknown character with too few points", () => {
      const strokes: Point[][] = [
        Array.from({ length: 10 }, (_, i) => ({ x: i * 10, y: 100 })),
      ];
      const result = validateDrawing(strokes, "unknown");
      expect(result).toBe(false);
    });

    it("should return false when a stroke has less than 2 points", () => {
      const strokes: Point[][] = [
        [{ x: 0, y: 0 }],
        [
          { x: 100, y: 0 },
          { x: 100, y: 100 },
        ],
      ];
      const result = validateDrawing(strokes, "ㄱ");
      expect(result).toBe(false);
    });
  });
});
