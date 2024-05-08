const OPTIONS = [
  "tbg-search-query",
  "tbg-tone",
  "tbg-use-emojis",
  "tbg-use-link",
  "tbg-end-with-question",
] as const;

export type StorageKeys = (typeof OPTIONS)[number];
