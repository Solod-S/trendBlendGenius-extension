export interface LoginFormType {
  email: string;
  password: string;
}

export interface LoginUserResponseType {
  accessToken: string;
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
}

export interface AuthState {
  accessToken: string;
  user: LoginUserResponseType | null;
  isLoading: boolean;
  error: string | null;
}
