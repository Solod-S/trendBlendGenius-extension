export interface LoginFormType {
  email: string;
  password: string;
}

export interface User {
  // accessToken: string;
  id: string;
  email: string;
  updatedAt: Date;
  roles: string[];
  newsCategory: string[];
  query: string;
  language: string[];
  country: string[];
  tone: string;
  useEmojis: boolean;
  endWithQuestion: boolean;
  useLink: boolean;
  openAIkey: string;
  newsApiKey: string;
}

export interface UserResponseType {
  accessToken: string;
  user: User | null;
}

export interface UserState {
  accessToken: string;
  user: User | null;
  isLoading: boolean;
  error: string | null;
  notify: string | null;
}

export interface UpdateUserType {
  id: string;
  email: string;
  password: string;
  passwordRepet: string;
  newsCategory?: string[];
  query?: string;
  language?: string[];
  country?: string[];
  newsApiKey?: string;
  openAIkey?: string;
}
