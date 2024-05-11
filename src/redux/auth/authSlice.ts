import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../rootReducer";
import { AuthState, LoginFormType, LoginUserResponseType } from "./authTypes";

export const login = createAsyncThunk<
  LoginUserResponseType,
  LoginFormType,
  { state: RootState }
>("auth/login", async credentials => {
  try {
    const response = await fetch("https://localhost:1234/api/auth/login", {
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
    return data.user;
  } catch (error) {
    throw error;
  }
});

export const logout = createAsyncThunk<void, void, { state: RootState }>(
  "auth/logout",
  async (_, { dispatch }) => {
    try {
      await fetch("https://localhost:1234/api/auth/logout", {
        method: "GET",
        credentials: "include",
      });

      dispatch(setUser(null));
    } catch (error) {
      throw error;
    }
  }
);

const initialState: AuthState = {
  accessToken: "",
  user: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<LoginUserResponseType | null>) {
      console.log(`setUser`, action.payload);
      state.user = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        console.log(`login.pending`);
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log(`login.fulfilled`, action.payload);
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        console.log(`login.rejected`, action.error.message);
        state.isLoading = false;
        state.error = action.error.message ?? "Login failed";
      })
      .addCase(logout.pending, state => {
        console.log(`logout.pending`);
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, state => {
        console.log(`logout.fulfilled`);
        state.isLoading = false;
        state.user = null; // Устанавливаем пользователя в null после успешного логаута
      })
      .addCase(logout.rejected, (state, action) => {
        console.log(`logout.rejected`, action.error.message);
        state.isLoading = false;
        state.error = action.error.message ?? "Logout failed";
      });
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
