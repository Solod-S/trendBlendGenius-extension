import axios from "axios";
import fetchAdapter from "konfig-axios-fetch-adapter";
const SERVER_URL = process.env.SERVER_URL;

export const instance = axios.create({
  baseURL: `${SERVER_URL}/api`,
  withCredentials: true,
  // adapter: fetchAdapter,
});

instance.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error);
  }
);

export const instanceToken = {
  set(token: string) {
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    instance.defaults.headers.common.Authorization = "";
  },
};
