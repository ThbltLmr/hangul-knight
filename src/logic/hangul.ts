export interface Point {
  x: number;
  y: number;
}

export enum StrokeDirection {
  Up = "up",
  Down = "down",
  Left = "left",
  Right = "right",
  UpRight = "up-right",
  UpLeft = "up-left",
  DownRight = "down-right",
  DownLeft = "down-left",
}

export interface StrokeTemplate {
  strokes: StrokeDirection[];
}

const STROKE_TEMPLATES: Record<string, StrokeTemplate> = {
  ㄱ: { strokes: [StrokeDirection.Right, StrokeDirection.Down] },
  ㄴ: { strokes: [StrokeDirection.Down, StrokeDirection.Right] },
  ㅁ: {
    strokes: [
      StrokeDirection.Right,
      StrokeDirection.Down,
      StrokeDirection.Left,
      StrokeDirection.Down,
    ],
  },
  ㅅ: { strokes: [StrokeDirection.DownRight, StrokeDirection.DownLeft] },
  ㅏ: { strokes: [StrokeDirection.Down, StrokeDirection.Right] },
  ㅓ: { strokes: [StrokeDirection.Left, StrokeDirection.Down] },
  ㅗ: { strokes: [StrokeDirection.Up, StrokeDirection.Right] },
  ㅜ: { strokes: [StrokeDirection.Right, StrokeDirection.Down] },
  ㅣ: { strokes: [StrokeDirection.Down] },
};

export function detectStrokeDirection(stroke: Point[]): StrokeDirection | null {
  if (stroke.length < 2) {
    return null;
  }

  const start = stroke[0]!;
  const end = stroke[stroke.length - 1]!;

  const dx = end.x - start.x;
  const dy = end.y - start.y;

  const angle = Math.atan2(dy, dx) * (180 / Math.PI);

  if (angle >= -22.5 && angle < 22.5) {
    return StrokeDirection.Right;
  } else if (angle >= 22.5 && angle < 67.5) {
    return StrokeDirection.DownRight;
  } else if (angle >= 67.5 && angle < 112.5) {
    return StrokeDirection.Down;
  } else if (angle >= 112.5 && angle < 157.5) {
    return StrokeDirection.DownLeft;
  } else if (angle >= 157.5 || angle < -157.5) {
    return StrokeDirection.Left;
  } else if (angle >= -157.5 && angle < -112.5) {
    return StrokeDirection.UpLeft;
  } else if (angle >= -112.5 && angle < -67.5) {
    return StrokeDirection.Up;
  }
  return StrokeDirection.UpRight;
}

export function getTemplate(character: string): StrokeTemplate | null {
  return STROKE_TEMPLATES[character] || null;
}

export function validateDrawing(
  strokes: Point[][],
  targetCharacter: string
): boolean {
  if (strokes.length === 0) {
    return false;
  }

  const template = getTemplate(targetCharacter);

  if (!template) {
    return strokes.length > 0 && strokes[0] && strokes[0].length > 15;
  }

  if (strokes.length !== template.strokes.length) {
    return false;
  }

  for (let i = 0; i < strokes.length; i++) {
    const stroke = strokes[i];
    const expectedDirection = template.strokes[i];

    if (!stroke || !expectedDirection) {
      return false;
    }

    const detectedDirection = detectStrokeDirection(stroke);

    if (detectedDirection !== expectedDirection) {
      return false;
    }
  }

  return true;
}
