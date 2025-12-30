import { describe, test, expect } from "bun:test";
import { calculateEnemySpawnPosition, calculateEnemyTargetPosition } from "./enemy-spawner";

describe("enemy-spawner", () => {
  describe("calculateEnemySpawnPosition", () => {
    test("spawns enemy off-screen to the right", () => {
      const position = calculateEnemySpawnPosition({
        screenWidth: 720,
        gameAreaHeight: 640,
      });

      expect(position.x).toBe(770);
      expect(position.y).toBe(520);
    });

    test("adjusts spawn position based on screen dimensions", () => {
      const position = calculateEnemySpawnPosition({
        screenWidth: 1000,
        gameAreaHeight: 800,
      });

      expect(position.x).toBe(1050);
      expect(position.y).toBe(680);
    });
  });

  describe("calculateEnemyTargetPosition", () => {
    test("calculates target position on screen", () => {
      const position = calculateEnemyTargetPosition({
        screenWidth: 720,
        gameAreaHeight: 640,
      });

      expect(position.x).toBe(520);
      expect(position.y).toBe(520);
    });

    test("adjusts target position based on screen dimensions", () => {
      const position = calculateEnemyTargetPosition({
        screenWidth: 1000,
        gameAreaHeight: 800,
      });

      expect(position.x).toBe(800);
      expect(position.y).toBe(680);
    });
  });
});
