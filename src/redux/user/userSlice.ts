import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { UserState, LoginFormType, User, UserResponseType } from "./userTypes";
import * as UserOperations from "./userActions";

const initialState: UserState = {
  accessToken: "",
  user: null,
  isLoading: false,
  error: null,
  notify: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserResponseType | null>) {
      state.user = action.payload?.user || null;
      state.accessToken = action.payload?.accessToken || "";
    },
    clearError(state) {
      state.error = null;
    },
    clearNotify(state) {
      state.notify = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(UserOperations.login.pending, state => {
        console.log(`login.pending`);
        state.isLoading = true;
        state.error = null;
      })
      .addCase(UserOperations.login.fulfilled, (state, action) => {
        console.log(`login.fulfilled`, action.payload);
        state.isLoading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(UserOperations.login.rejected, (state, action) => {
        console.log(`login.rejected`, action.error.message);
        state.isLoading = false;
        state.error =
          (action.payload as string) ||
          (action.error?.message as string) ||
          "Login failed";
        // state.error = action.error.message ?? "Login failed";
      })
      .addCase(UserOperations.create.pending, state => {
        console.log(`create.pending`);
        state.isLoading = true;
        state.error = null;
      })
      .addCase(UserOperations.create.fulfilled, (state, action) => {
        console.log(`create.fulfilled`);
        state.isLoading = false;
        state.notify = `${action.payload.email} has been successfully created.`;
      })
      .addCase(UserOperations.create.rejected, (state, action) => {
        console.log(`create.rejected`);
        state.isLoading = false;
        state.error =
          (action.payload as string) ||
          (action.error?.message as string) ||
          "Registration failed";
      })
      .addCase(UserOperations.logout.pending, state => {
        console.log(`logout.pending`);
        state.isLoading = true;
        state.error = null;
      })
      .addCase(UserOperations.logout.fulfilled, state => {
        console.log(`logout.fulfilled`);
        state.isLoading = false;
        state.user = null;
        state.accessToken = "";
      })
      .addCase(UserOperations.logout.rejected, (state, action) => {
        console.log(`logout.rejected`, action.error.message);
        state.isLoading = false;
        state.user = null;
        state.accessToken = "";
        state.error = action.error.message ?? "Logout failed";
      })
      .addCase(UserOperations.update.pending, state => {
        console.log(`update.pending`);
        state.isLoading = true;
        state.error = null;
      })
      .addCase(UserOperations.update.fulfilled, (state, action) => {
        console.log(`update.fulfilled`);
        state.isLoading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(UserOperations.update.rejected, (state, action) => {
        console.log(`update.rejected`, action.error.message);
        state.isLoading = false;
        state.error = action.error.message ?? "Update failed";
      });
  },
});

export const { setUser, clearError, clearNotify } = userSlice.actions;

export default userSlice.reducer;
