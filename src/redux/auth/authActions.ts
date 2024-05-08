// Ваш файл authActions.ts

import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../rootReducer"; // Путь к вашему root reducer

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

// Предположим, что ваша thunk для входа пользователя определена так:
export const login = createAsyncThunk<
  User,
  { email: string; password: string },
  { state: RootState }
>("auth/login", async credentials => {
  try {
    const response = await fetch("https://localhost:1234/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) {
      throw new Error("Login failed");
    }
    const data = await response.json();
    console.log(`data`, data);
    return data.user;
  } catch (error) {
    throw error;
  }
});
