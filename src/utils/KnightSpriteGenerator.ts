import Phaser from "phaser";

/**
 * Generates pixelated knight sprite textures programmatically
 */
export class KnightSpriteGenerator {
  private static readonly PIXEL_SIZE = 4;
  private static readonly SPRITE_WIDTH = 16;
  private static readonly SPRITE_HEIGHT = 16;

  // Color palette
  private static readonly COLORS = {
    armor: 0x8b9bb4,        // Light blue-gray armor
    armorDark: 0x5a6988,    // Dark armor shadow
    helmet: 0x6b7a99,       // Helmet
    visor: 0x2c3e50,        // Dark visor
    skin: 0xf4c9a0,         // Skin tone
    cape: 0xe74c3c,         // Red cape
    capeDark: 0xc0392b,     // Dark red cape shadow
    sword: 0xbdc3c7,        // Silver sword
  };

  /**
   * Create knight sprite textures with walking animation
   */
  static createKnightSprites(scene: Phaser.Scene): void {
    // Create 4 frames for walking animation
    this.createFrame(scene, "knight-walk-1", this.getWalkFrame1());
    this.createFrame(scene, "knight-walk-2", this.getWalkFrame2());
    this.createFrame(scene, "knight-walk-3", this.getWalkFrame3());
    this.createFrame(scene, "knight-walk-4", this.getWalkFrame4());
  }

  /**
   * Create a single frame from pixel data
   */
  private static createFrame(
    scene: Phaser.Scene,
    key: string,
    pixelData: number[][]
  ): void {
    const graphics = scene.add.graphics();
    const pixelSize = this.PIXEL_SIZE;

    // Draw each pixel
    for (let y = 0; y < pixelData.length; y++) {
      const row = pixelData[y];
      if (!row) continue;

      for (let x = 0; x < row.length; x++) {
        const colorValue = row[x];
        if (colorValue !== undefined && colorValue !== 0) {
          graphics.fillStyle(colorValue, 1);
          graphics.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
        }
      }
    }

    // Generate texture from graphics
    graphics.generateTexture(
      key,
      this.SPRITE_WIDTH * pixelSize,
      this.SPRITE_HEIGHT * pixelSize
    );
    graphics.destroy();
  }

  /**
   * Walking animation frame 1 - standing/neutral
   */
  private static getWalkFrame1(): number[][] {
    const { armor, armorDark, helmet, visor, skin, cape, capeDark, sword } = this.COLORS;

    return [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, helmet, helmet, helmet, helmet, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, helmet, helmet, visor, visor, helmet, helmet, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, helmet, visor, visor, visor, visor, helmet, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, cape, armor, helmet, helmet, helmet, helmet, armor, 0, 0, 0, 0, 0, 0],
      [0, 0, cape, cape, armor, armor, skin, skin, armor, armor, 0, 0, 0, 0, 0, 0],
      [0, 0, cape, capeDark, armor, armor, armor, armor, armor, armor, sword, sword, 0, 0, 0, 0],
      [0, 0, 0, cape, armorDark, armor, armor, armor, armor, armorDark, sword, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, armorDark, armor, armor, armor, armor, armorDark, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, armorDark, armor, armor, armorDark, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, armorDark, armorDark, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, armorDark, armorDark, armorDark, armorDark, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, armorDark, armorDark, 0, 0, armorDark, armorDark, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, armorDark, 0, 0, 0, 0, armorDark, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, armorDark, armorDark, 0, 0, 0, 0, armorDark, armorDark, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
  }

  /**
   * Walking animation frame 2 - left leg forward
   */
  private static getWalkFrame2(): number[][] {
    const { armor, armorDark, helmet, visor, skin, cape, capeDark, sword } = this.COLORS;

    return [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, helmet, helmet, helmet, helmet, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, helmet, helmet, visor, visor, helmet, helmet, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, helmet, visor, visor, visor, visor, helmet, 0, 0, 0, 0, 0, 0],
      [0, 0, cape, cape, armor, helmet, helmet, helmet, helmet, armor, 0, 0, 0, 0, 0, 0],
      [0, cape, cape, capeDark, armor, armor, skin, skin, armor, armor, 0, 0, 0, 0, 0, 0],
      [0, 0, cape, cape, armor, armor, armor, armor, armor, armor, sword, sword, 0, 0, 0, 0],
      [0, 0, 0, cape, armorDark, armor, armor, armor, armor, armorDark, sword, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, armorDark, armor, armor, armor, armor, armorDark, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, armorDark, armor, armor, armorDark, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, armorDark, armorDark, armorDark, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, armorDark, armorDark, 0, armorDark, armorDark, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, armorDark, armorDark, 0, 0, 0, armorDark, armorDark, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, armorDark, 0, 0, 0, 0, 0, armorDark, 0, 0, 0, 0, 0, 0],
      [0, 0, armorDark, armorDark, 0, 0, 0, 0, 0, armorDark, armorDark, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
  }

  /**
   * Walking animation frame 3 - neutral/transition
   */
  private static getWalkFrame3(): number[][] {
    const { armor, armorDark, helmet, visor, skin, cape, capeDark, sword } = this.COLORS;

    return [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, helmet, helmet, helmet, helmet, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, helmet, helmet, visor, visor, helmet, helmet, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, helmet, visor, visor, visor, visor, helmet, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, cape, armor, helmet, helmet, helmet, helmet, armor, 0, 0, 0, 0, 0, 0],
      [0, 0, cape, cape, armor, armor, skin, skin, armor, armor, 0, 0, 0, 0, 0, 0],
      [0, 0, cape, capeDark, armor, armor, armor, armor, armor, armor, sword, sword, 0, 0, 0, 0],
      [0, 0, 0, cape, armorDark, armor, armor, armor, armor, armorDark, sword, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, armorDark, armor, armor, armor, armor, armorDark, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, armorDark, armor, armor, armorDark, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, armorDark, armorDark, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, armorDark, armorDark, armorDark, armorDark, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, armorDark, armorDark, 0, 0, armorDark, armorDark, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, armorDark, 0, 0, 0, 0, armorDark, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, armorDark, armorDark, 0, 0, 0, 0, armorDark, armorDark, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
  }

  /**
   * Walking animation frame 4 - right leg forward
   */
  private static getWalkFrame4(): number[][] {
    const { armor, armorDark, helmet, visor, skin, cape, capeDark, sword } = this.COLORS;

    return [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, helmet, helmet, helmet, helmet, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, helmet, helmet, visor, visor, helmet, helmet, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, helmet, visor, visor, visor, visor, helmet, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, cape, armor, helmet, helmet, helmet, helmet, armor, 0, 0, 0, 0, 0, 0],
      [0, 0, cape, capeDark, armor, armor, skin, skin, armor, armor, 0, 0, 0, 0, 0, 0],
      [0, cape, cape, cape, armor, armor, armor, armor, armor, armor, sword, sword, 0, 0, 0, 0],
      [0, 0, 0, cape, armorDark, armor, armor, armor, armor, armorDark, sword, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, armorDark, armor, armor, armor, armor, armorDark, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, armorDark, armor, armor, armorDark, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, armorDark, armorDark, armorDark, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, armorDark, armorDark, 0, armorDark, armorDark, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, armorDark, armorDark, 0, 0, 0, armorDark, armorDark, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, armorDark, 0, 0, 0, 0, 0, armorDark, 0, 0, 0, 0, 0],
      [0, 0, 0, armorDark, armorDark, 0, 0, 0, 0, 0, armorDark, armorDark, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
  }
}
