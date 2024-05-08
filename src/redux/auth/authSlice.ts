import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  email: string;
  roles: string[];
  updatedAt: Date;
  openAIkey: string;
  newsApiKey: string;
  newsCategory: string[];
  language: string[];
  country: string[];
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Добавьте здесь редукторы для управления состоянием авторизации
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;
