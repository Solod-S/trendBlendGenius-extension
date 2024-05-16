import fetchAdapter from "konfig-axios-fetch-adapter";
import { instance } from "../axios/instance";

instance.interceptors.request.use(config => {
  console.log("Request parameters:", config);
  return config; // Обязательно возвращаем config, иначе запрос не будет выполнен
});

// export const createArticle = async (domain: string) => {
//   try {
//     const response = await fetch("https://localhost:1234/api/articles/create", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "X-API-KEY": "your-api-key-here",
//       },
//       body: JSON.stringify({ domain }),
//     });

//     if (!response.ok) {
//       throw new Error("Failed to create article");
//     }

//     const data = await response.json();
//     console.log("Article created:", data);
//     return { data };
//   } catch (error) {
//     console.error("Error creating article:", error);
//     throw error;
//   }
// };

export const createArticle = async (domain: string, token: string) => {
  try {
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
    const headers = instance.defaults.headers;
    console.log(`headers`, headers);
    // Check if the headers contain a Cookie header
    if (headers && headers.Cookie) {
      // Print out the Cookie header value
      console.log("Cookies attached to Axios instance:", headers.Cookie);
    } else {
      console.log("No cookies attached to Axios instance.");
    }

    // Вывод текущего access токена в консоль
    console.log(
      "Access Token:",
      instance.defaults.headers.common.Authorization
    );
    const response = await instance.post(
      "/articles/create",
      {
        domain: "linkedin.com",
      }
      // {
      //   adapter: fetchAdapter,
      // }
    );
    console.log("Article created:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating article:", error);
  }
};
