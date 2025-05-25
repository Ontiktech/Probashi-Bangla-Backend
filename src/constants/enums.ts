export enum AppUserVerificationStatus {
  VERIFIED = 'VERIFIED',
  UNVERIFIED = 'UNVERIFIED',
  BANNED = 'BANNED',
}

export const APP_USER_VERIFICATION_STATUSES = [
  AppUserVerificationStatus.VERIFIED,
  AppUserVerificationStatus.UNVERIFIED,
  AppUserVerificationStatus.BANNED,
] as const;

export enum Languages {
  ENGLISH = 'ENGLISH',
  SPANISH = 'SPANISH',
  FRENCH = 'FRENCH',
  GERMAN = 'GERMAN',
  ITALIAN = 'ITALIAN',
  PORTUGUESE = 'PORTUGUESE',
  RUSSIAN = 'RUSSIAN',
  MANDARIN = 'MANDARIN',
  JAPANESE = 'JAPANESE',
  KOREAN = 'KOREAN',
  ARABIC = 'ARABIC',
}

export const LANGUAGES = [
  Languages.ENGLISH,
  Languages.SPANISH,
  Languages.FRENCH,
  Languages.GERMAN,
  Languages.ITALIAN,
  Languages.PORTUGUESE,
  Languages.RUSSIAN,
  Languages.MANDARIN,
  Languages.JAPANESE,
  Languages.KOREAN,
  Languages.ARABIC,
] as const;

export enum Difficulty {
  BEGINNER = 'BEGINNER',
  ELEMENTARY = 'ELEMENTARY',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
}

export const DIFFICULTIES = [
  Difficulty.BEGINNER,
  Difficulty.ELEMENTARY,
  Difficulty.INTERMEDIATE,
  Difficulty.ADVANCED,
] as const;

export enum ProficiencyLevel {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
}

export const PROFICIENCY_LEVELS = [
  ProficiencyLevel.BEGINNER,
  ProficiencyLevel.INTERMEDIATE,
  ProficiencyLevel.ADVANCED,
] as const;