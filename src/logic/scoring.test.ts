import { describe, test, expect } from "bun:test";
import {
  createInitialScore,
  scoreCorrectAnswer,
  scoreIncorrectAnswer,
  calculateStreakMultiplier,
} from "./scoring";

describe("scoring", () => {
  describe("createInitialScore", () => {
    test("creates initial score state", () => {
      const state = createInitialScore();

      expect(state.score).toBe(0);
      expect(state.streak).toBe(0);
      expect(state.maxStreak).toBe(0);
    });
  });

  describe("scoreCorrectAnswer", () => {
    test("adds base points for first correct answer", () => {
      const initial = createInitialScore();
      const result = scoreCorrectAnswer(initial);

      expect(result.score).toBe(110);
      expect(result.streak).toBe(1);
      expect(result.maxStreak).toBe(1);
    });

    test("increases streak and adds bonus points", () => {
      const state = { score: 110, streak: 1, maxStreak: 1 };
      const result = scoreCorrectAnswer(state);

      expect(result.score).toBe(230);
      expect(result.streak).toBe(2);
      expect(result.maxStreak).toBe(2);
    });

    test("tracks max streak correctly", () => {
      const state = { score: 500, streak: 5, maxStreak: 10 };
      const result = scoreCorrectAnswer(state);

      expect(result.maxStreak).toBe(10);
      expect(result.streak).toBe(6);
    });

    test("updates max streak when exceeded", () => {
      const state = { score: 500, streak: 10, maxStreak: 10 };
      const result = scoreCorrectAnswer(state);

      expect(result.maxStreak).toBe(11);
      expect(result.streak).toBe(11);
    });
  });

  describe("scoreIncorrectAnswer", () => {
    test("resets streak without changing score", () => {
      const state = { score: 330, streak: 5, maxStreak: 5 };
      const result = scoreIncorrectAnswer(state);

      expect(result.score).toBe(330);
      expect(result.streak).toBe(0);
      expect(result.maxStreak).toBe(5);
    });

    test("preserves max streak", () => {
      const state = { score: 1000, streak: 3, maxStreak: 10 };
      const result = scoreIncorrectAnswer(state);

      expect(result.maxStreak).toBe(10);
    });
  });

  describe("calculateStreakMultiplier", () => {
    test("returns 1.0 for streaks below 3", () => {
      expect(calculateStreakMultiplier(0)).toBe(1.0);
      expect(calculateStreakMultiplier(1)).toBe(1.0);
      expect(calculateStreakMultiplier(2)).toBe(1.0);
    });

    test("returns 1.5 for streaks 3-4", () => {
      expect(calculateStreakMultiplier(3)).toBe(1.5);
      expect(calculateStreakMultiplier(4)).toBe(1.5);
    });

    test("returns 2.0 for streaks 5-9", () => {
      expect(calculateStreakMultiplier(5)).toBe(2.0);
      expect(calculateStreakMultiplier(9)).toBe(2.0);
    });

    test("returns 2.5 for streaks 10+", () => {
      expect(calculateStreakMultiplier(10)).toBe(2.5);
      expect(calculateStreakMultiplier(100)).toBe(2.5);
    });
  });
});
