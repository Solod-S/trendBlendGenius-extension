export const CHATGPT_BTN_ID = "trendBlendGenius-btn";
export const TOAST_CLASSNAME = "trendBlendGenius-toast";
interface Emojis {
  [key: string]: string;
}

export const emojis: Emojis = {
  Excited: "🎉",
  Happy: "😄",
  Gracious: "🤗",
  Supportive: "👏",
  Polite: "🙏",
  Respectful: "🤔",
  Provocative: "😈",
  Controversial: "🤯",
  Disappointed: "😔",
  Sad: "😢",
  Frustrated: "😤",
  Sarcastic: "😏",
  Angry: "😡",
  Nasty: "😠",
};

export const tones = [
  "Excited",
  "Happy",
  "Gracious",
  "Supportive",
  "Polite",
  "Respectful",
  "Provocative",
  "Controversial",
  "Disappointed",
  "Sad",
  "Frustrated",
  "Sarcastic",
  "Angry",
  "Nasty",
];

export const ERROR_MESSAGE =
  "Trend Blend Genius failed. Follow the instructions & try again.";

export enum Domains {
  LinkedIn = "linkedin.com",
  Facebook = "facebook.com",
  // Instagram = "instagram.com",
  // Twitter = "twitter.com",
}

export const ALLOWED_DOMAINS: Domains[] = [
  Domains.LinkedIn,
  Domains.Facebook,
  // Domains.Instagram,
  // Domains.Twitter,
];
