import { ScoreState, createInitialScore, scoreCorrectAnswer, scoreIncorrectAnswer } from "../logic/scoring";

export class PlayerController {
  private score: ScoreState;

  constructor() {
    this.score = createInitialScore();
  }

  public recordCorrectAnswer(): void {
    this.score = scoreCorrectAnswer(this.score);
  }

  public recordIncorrectAnswer(): void {
    this.score = scoreIncorrectAnswer(this.score);
  }

  public getScore(): number {
    return this.score.score;
  }

  public getStreak(): number {
    return this.score.streak;
  }

  public getMaxStreak(): number {
    return this.score.maxStreak;
  }

  public getScoreState(): ScoreState {
    return { ...this.score };
  }
}
