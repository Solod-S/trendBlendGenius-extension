import {instance} from "../../axios/instance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginFormType, LoginUserResponseType } from "./authTypes";
import { RootState } from "../rootReducer";

export const login = createAsyncThunk<
  LoginUserResponseType,
  LoginFormType,
  { state: RootState }
>("auth/login", async (credentials, thunkAPI) => {
  try {
    const response = await instance.post("/auth/login", credentials);
    return response.data.user;
  } catch (error) {
    throw error;
  }
});

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const response = await instance.get("/auth/logout");
    console.log(`logoutresponse`, response);
    return true;
  } catch (error) {
    throw error;
  }
});
