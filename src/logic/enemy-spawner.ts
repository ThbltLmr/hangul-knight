export interface EnemySpawnConfig {
  screenWidth: number;
  gameAreaHeight: number;
}

export interface EnemyPosition {
  x: number;
  y: number;
}

export function calculateEnemySpawnPosition(config: EnemySpawnConfig): EnemyPosition {
  return {
    x: config.screenWidth + 50,
    y: config.gameAreaHeight - 120,
  };
}

export function calculateEnemyTargetPosition(config: EnemySpawnConfig): EnemyPosition {
  return {
    x: config.screenWidth - 200,
    y: config.gameAreaHeight - 120,
  };
}
