export interface ScoreState {
  score: number;
  streak: number;
  maxStreak: number;
}

export function createInitialScore(): ScoreState {
  return {
    score: 0,
    streak: 0,
    maxStreak: 0,
  };
}

export function scoreCorrectAnswer(state: ScoreState): ScoreState {
  const newStreak = state.streak + 1;
  const basePoints = 100;
  const streakBonus = newStreak * 10;

  return {
    score: state.score + basePoints + streakBonus,
    streak: newStreak,
    maxStreak: Math.max(state.maxStreak, newStreak),
  };
}

export function scoreIncorrectAnswer(state: ScoreState): ScoreState {
  return {
    score: state.score,
    streak: 0,
    maxStreak: state.maxStreak,
  };
}

export function calculateStreakMultiplier(streak: number): number {
  if (streak < 3) return 1.0;
  if (streak < 5) return 1.5;
  if (streak < 10) return 2.0;
  return 2.5;
}
