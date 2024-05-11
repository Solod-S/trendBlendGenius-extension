import { RootState } from "../rootReducer";

export const getAuthIsLoading = (state: RootState) => state.auth.isLoading;
export const getAuthError = (state: RootState) => state.auth.error;
export const getAccessToken = (state: RootState) => state.auth.accessToken;
export const getUserData = (state: RootState) => state.auth.user;
