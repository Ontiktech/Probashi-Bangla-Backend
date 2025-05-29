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

export enum FilterLanguage {
  EMPTY = '',
  ALL = 'ALL',
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

export const FILTER_LANGUAGE = [
  FilterLanguage.EMPTY,
  FilterLanguage.ALL,
  FilterLanguage.ENGLISH,
  FilterLanguage.SPANISH,
  FilterLanguage.FRENCH,
  FilterLanguage.GERMAN,
  FilterLanguage.ITALIAN,
  FilterLanguage.PORTUGUESE,
  FilterLanguage.RUSSIAN,
  FilterLanguage.MANDARIN,
  FilterLanguage.JAPANESE,
  FilterLanguage.KOREAN,
  FilterLanguage.ARABIC,
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

export enum Familiarity {
  KNOWIT = 'KNOWIT',
  FAMILIAR = 'FAMILIAR',
  DONTKNOW = 'DONTKNOW',
}

export const FAMILIARITY = [
  Familiarity.KNOWIT,
  Familiarity.FAMILIAR,
  Familiarity.DONTKNOW,
] as const