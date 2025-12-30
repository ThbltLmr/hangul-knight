import { validateDrawing, type Point } from "./hangul-recognition";

export class HangulRecognitionSystem {
  public validateDrawing(strokes: Point[][], targetCharacter: string): boolean {
    return validateDrawing(strokes, targetCharacter);
  }
}
