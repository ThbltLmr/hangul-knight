import { validateDrawing, type Point } from "./hangul-recognition";

export class HangulRecognitionSystem {
  public validateDrawing(strokes: Point[][], targetCharacter: string, debug: boolean = false): boolean {
    return validateDrawing(strokes, targetCharacter, debug);
  }
}
