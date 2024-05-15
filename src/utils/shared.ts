import { instance } from "../axios/instance";

instance.interceptors.request.use(config => {
  console.log("Request parameters:", config);
  return config; // Обязательно возвращаем config, иначе запрос не будет выполнен
});

export const createArticle = async (domain: string) => {
  try {
    const response = await fetch("https://localhost:1234/api/articles/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": "your-api-key-here",
      },
      body: JSON.stringify({ domain }),
    });

    if (!response.ok) {
      throw new Error("Failed to create article");
    }

    const data = await response.json();
    console.log("Article created:", data);
    return { data };
  } catch (error) {
    console.error("Error creating article:", error);
    throw error;
  }
};

// export const createArticle = async (domain: string) => {
//   try {
//     const response = await instance.post(
//       "/articles/create",
//       {
//         domain: "linkedin.com",
//       },
//       {
//         adapter: "xhr",
//       }
//     );
//     console.log("Article created:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("Error creating article:", error);
//   }
// };
