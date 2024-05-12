import { instance, instanceToken } from "../../axios/instance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  LoginFormType,
  User,
  UpdateUserType,
  UserResponseType,
} from "./userTypes";
import { RootState } from "../rootReducer";

export const login = createAsyncThunk<
  UserResponseType,
  LoginFormType,
  { state: RootState }
>("user/login", async (credentials, thunkAPI) => {
  try {
    const response = await instance.post("/auth/login", credentials);
    const result = {
      accessToken: response.data.accessToken,
      user: response.data.user,
    };
    instanceToken.set(response.data.accessToken);
    return result;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.message);
    // error.message
  }
});

export const logout = createAsyncThunk("user/logout", async (_, thunkAPI) => {
  try {
    const response = await instance.get("/auth/logout");
    instanceToken.unset();
    console.log(`logout response`, response);
    return true;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.message);
    // error.message
  }
});

export const create = createAsyncThunk<
  User,
  LoginFormType,
  { state: RootState }
>("user/register", async (credentials, thunkAPI) => {
  try {
    const response = await instance.post("/auth/register", {
      passwordRepet: credentials.password,
      ...credentials,
    });
    console.log(`response.data`, response.data);
    return response.data.user;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.message);
    // error.message
  }
});

export const update = createAsyncThunk<
  UserResponseType,
  Partial<UpdateUserType>,
  { state: RootState }
>("user/update", async (data, thunkAPI) => {
  try {
    const response = await instance.put(`/users/${data.id}`, data);
    const result = {
      accessToken: response.data.accessToken,
      user: response.data.user,
    };
    console.log(`update response`, result);

    return result;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
