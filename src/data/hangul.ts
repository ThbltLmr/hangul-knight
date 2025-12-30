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

export const BASIC_JAMO_LESSONS: Hangul[] = [
  {
    korean: "ㄱ",
    romanization: "g/k",
    english: "consonant g/k",
    jamo: [Jamo.ㄱ],
  },
  {
    korean: "ㄴ",
    romanization: "n",
    english: "consonant n",
    jamo: [Jamo.ㄴ],
  },
  {
    korean: "ㅁ",
    romanization: "m",
    english: "consonant m",
    jamo: [Jamo.ㅁ],
  },
  {
    korean: "ㅅ",
    romanization: "s",
    english: "consonant s",
    jamo: [Jamo.ㅅ],
  },
  {
    korean: "ㅏ",
    romanization: "a",
    english: "vowel a",
    jamo: [Jamo.ㅏ],
  },
  {
    korean: "ㅓ",
    romanization: "eo",
    english: "vowel eo",
    jamo: [Jamo.ㅓ],
  },
  {
    korean: "ㅗ",
    romanization: "o",
    english: "vowel o",
    jamo: [Jamo.ㅗ],
  },
  {
    korean: "ㅜ",
    romanization: "u",
    english: "vowel u",
    jamo: [Jamo.ㅜ],
  },
  {
    korean: "ㅣ",
    romanization: "i",
    english: "vowel i",
    jamo: [Jamo.ㅣ],
  },
];
