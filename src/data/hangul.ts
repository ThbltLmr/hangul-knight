export enum Jamo {
  // Basic consonants (14)
  ㄱ = "ㄱ",
  ㄴ = "ㄴ",
  ㄷ = "ㄷ",
  ㄹ = "ㄹ",
  ㅁ = "ㅁ",
  ㅂ = "ㅂ",
  ㅅ = "ㅅ",
  ㅇ = "ㅇ",
  ㅈ = "ㅈ",
  ㅊ = "ㅊ",
  ㅋ = "ㅋ",
  ㅌ = "ㅌ",
  ㅍ = "ㅍ",
  ㅎ = "ㅎ",

  // Double consonants (5)
  ㄲ = "ㄲ",
  ㄸ = "ㄸ",
  ㅃ = "ㅃ",
  ㅆ = "ㅆ",
  ㅉ = "ㅉ",

  // Basic vowels (10)
  ㅏ = "ㅏ",
  ㅑ = "ㅑ",
  ㅓ = "ㅓ",
  ㅕ = "ㅕ",
  ㅗ = "ㅗ",
  ㅛ = "ㅛ",
  ㅜ = "ㅜ",
  ㅠ = "ㅠ",
  ㅡ = "ㅡ",
  ㅣ = "ㅣ",

  // Compound vowels (11)
  ㅐ = "ㅐ",
  ㅒ = "ㅒ",
  ㅔ = "ㅔ",
  ㅖ = "ㅖ",
  ㅘ = "ㅘ",
  ㅙ = "ㅙ",
  ㅚ = "ㅚ",
  ㅝ = "ㅝ",
  ㅞ = "ㅞ",
  ㅟ = "ㅟ",
  ㅢ = "ㅢ",
}

export interface Hangul {
  korean: string;
  romanization: string;
  english: string;
  jamo: Jamo[];
}
