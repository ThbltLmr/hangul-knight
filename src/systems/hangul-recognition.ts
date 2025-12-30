export interface Point {
  x: number;
  y: number;
}

interface BoundingBox {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

export type Bitmap = boolean[][];

const GRID_SIZE = 32;
const RECOGNITION_THRESHOLD = 0.3;

export function calculateBounds(strokes: Point[][]): BoundingBox {
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

export function calculateScale(bounds: BoundingBox): number {
  const width = bounds.maxX - bounds.minX;
  const height = bounds.maxY - bounds.minY;
  const maxDimension = Math.max(width, height);

  return maxDimension > 0 ? (GRID_SIZE - 1) / maxDimension : 1;
}

export function strokesToBitmap(strokes: Point[][]): Bitmap {
  const bitmap: Bitmap = Array(GRID_SIZE)
    .fill(null)
    .map(() => Array(GRID_SIZE).fill(false));

  const bounds = calculateBounds(strokes);
  const scale = calculateScale(bounds);

  const drawingWidth = (bounds.maxX - bounds.minX) * scale;
  const drawingHeight = (bounds.maxY - bounds.minY) * scale;

  const offsetX = Math.floor((GRID_SIZE - drawingWidth) / 2);
  const offsetY = Math.floor((GRID_SIZE - drawingHeight) / 2);

  for (const stroke of strokes) {
    for (const point of stroke) {
      const normalizedX = Math.floor((point.x - bounds.minX) * scale) + offsetX;
      const normalizedY = Math.floor((point.y - bounds.minY) * scale) + offsetY;

      if (
        normalizedX >= 0 &&
        normalizedX < GRID_SIZE &&
        normalizedY >= 0 &&
        normalizedY < GRID_SIZE
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

function dilateBitmap(bitmap: Bitmap, radius: number = 1): Bitmap {
  const dilated = createEmptyTemplate();

  for (let y = 0; y < GRID_SIZE; y++) {
    const bitmapRow = bitmap[y];
    if (!bitmapRow) continue;

    for (let x = 0; x < GRID_SIZE; x++) {
      if (bitmapRow[x]) {
        for (let dy = -radius; dy <= radius; dy++) {
          for (let dx = -radius; dx <= radius; dx++) {
            const ny = y + dy;
            const nx = x + dx;
            if (ny >= 0 && ny < GRID_SIZE && nx >= 0 && nx < GRID_SIZE) {
              const row = dilated[ny];
              if (row) row[nx] = true;
            }
          }
        }
      }
    }
  }

  return dilated;
}

export function calculateSimilarity(bitmap: Bitmap, template: Bitmap): number {
  const dilatedBitmap = dilateBitmap(bitmap, 2);
  const dilatedTemplate = dilateBitmap(template, 2);

  let matches = 0;
  let total = 0;

  for (let y = 0; y < GRID_SIZE; y++) {
    const bitmapRow = dilatedBitmap[y];
    const templateRow = dilatedTemplate[y];
    if (!bitmapRow || !templateRow) continue;

    for (let x = 0; x < GRID_SIZE; x++) {
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

export function createEmptyTemplate(): Bitmap {
  return Array(GRID_SIZE)
    .fill(null)
    .map(() => Array(GRID_SIZE).fill(false));
}

export function createGTemplate(): Bitmap {
  const template = createEmptyTemplate();
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

export function createNTemplate(): Bitmap {
  const template = createEmptyTemplate();
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

export function createMTemplate(): Bitmap {
  const template = createEmptyTemplate();
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

export function createSTemplate(): Bitmap {
  const template = createEmptyTemplate();
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

export function createATemplate(): Bitmap {
  const template = createEmptyTemplate();
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

export function createEoTemplate(): Bitmap {
  const template = createEmptyTemplate();
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

export function createOTemplate(): Bitmap {
  const template = createEmptyTemplate();
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

export function createUTemplate(): Bitmap {
  const template = createEmptyTemplate();
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

export function createITemplate(): Bitmap {
  const template = createEmptyTemplate();
  for (let y = 8; y < 24; y++) {
    const row = template[y];
    if (row) row[16] = true;
  }
  return template;
}

export function getTemplate(character: string): Bitmap | null {
  const templates: { [key: string]: Bitmap } = {
    ㄱ: createGTemplate(),
    ㄴ: createNTemplate(),
    ㅁ: createMTemplate(),
    ㅅ: createSTemplate(),
    ㅏ: createATemplate(),
    ㅓ: createEoTemplate(),
    ㅗ: createOTemplate(),
    ㅜ: createUTemplate(),
    ㅣ: createITemplate(),
  };

  return templates[character] || null;
}

function visualizeBitmap(bitmap: Bitmap, label: string): void {
  console.log(`\n${label}:`);
  let hasAnyTrue = false;
  const rows: string[] = [];
  for (let y = 0; y < GRID_SIZE; y++) {
    const row = bitmap[y];
    if (!row) continue;
    let rowStr = '';
    for (let x = 0; x < GRID_SIZE; x++) {
      if (row[x]) {
        rowStr += '█';
        hasAnyTrue = true;
      } else {
        rowStr += '·';
      }
    }
    rows.push(rowStr);
  }
  if (hasAnyTrue) {
    console.log(rows.join('\n'));
  } else {
    console.log('(empty bitmap)');
  }
}

export function validateDrawing(
  strokes: Point[][],
  targetCharacter: string,
  debug: boolean = false
): boolean {
  if (strokes.length === 0) {
    return false;
  }

  const totalPoints = strokes.reduce((sum, stroke) => sum + stroke.length, 0);
  if (totalPoints < 5) {
    return false;
  }

  const bitmap = strokesToBitmap(strokes);
  const template = getTemplate(targetCharacter);

  if (!template) {
    return totalPoints > 15;
  }

  const similarity = calculateSimilarity(bitmap, template);

  if (debug) {
    console.log(`Character: ${targetCharacter}, Similarity: ${similarity.toFixed(3)}, Threshold: ${RECOGNITION_THRESHOLD}`);
    visualizeBitmap(bitmap, 'User Drawing (normalized)');
    visualizeBitmap(template, 'Template');
  }

  return similarity >= RECOGNITION_THRESHOLD;
}
