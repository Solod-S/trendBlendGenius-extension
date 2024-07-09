import { notyf } from "../chrome/content_script";

export const createArticle = async (domain: string, token: string) => {
  try {
    const response = await fetch(`${SERVER_URL}/api/articles/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ domain }),
    });

    if (!response.ok) {
      throw new Error("Failed to create article");
    }

    const result = await response.json();

    return result.data;
  } catch (error) {
    console.error("Error creating article:", error);
    throw error;
  }
};
const SERVER_URL = process.env.SERVER_URL;

export const getArticles = async (
  userId: string,
  page: number,
  perPage: number,
  token: string
) => {
  try {
    const response = await fetch(
      `${SERVER_URL}/api/articles?userId=${userId}&page=${page}&perPage=${perPage}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to get articles");
    }

    const result = await response.json();

    return result.data;
  } catch (error) {
    console.error("Error creating article:", error);
    throw error;
  }
};

export const getArticlesChart = async (userId: string, token: string) => {
  try {
    const response = await fetch(
      `${SERVER_URL}/api/articles/lastweek?userId=${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to get articles");
    }

    const result = await response.json();

    return result.data;
  } catch (error) {
    console.error("Error creating article:", error);
    throw error;
  }
};
export const getArticlesOverview = async (userId: string, token: string) => {
  try {
    const response = await fetch(
      `${SERVER_URL}/api/articles/articles-overview?userId=${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to get articles");
    }

    const result = await response.json();

    return result.data;
  } catch (error) {
    console.error("Error creating article:", error);
    throw error;
  }
};

export const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const notify = (
  type: string,
  msg: string,
  domain: string,
  notyfType?: string
) => {
  console.log(`domain`, domain);
  if (type === "error") {
    notyf?.error({
      duration: 900000,
      dismissible: true,
      message: msg,
      // className: `${TOAST_CLASSNAME} ${domain.replace(/([.]\w+)$/, "")}`,
      ripple: false,
    });
  } else {
    const options: any = {
      duration: 900000,
      dismissible: true,
      message: msg,
      // className: `${TOAST_CLASSNAME} ${domain.replace(/([.]\w+)$/, "")}`,
      ripple: false,
    };

    if (notyfType && notyfType.length > 0) {
      options.type = notyfType;
    }
    notyf?.success(options);
  }
};

export const closestSibling = (
  element: Element,
  query: string
): Element | null => {
  const parent = element.parentElement;
  if (parent === null) return null;
  const sibling = parent.querySelector(query);
  if (sibling !== null) return sibling;
  return closestSibling(parent, query);
};

export const handleArticleData = (data: any, config: any) => {
  let result =
    data.title +
    "\n\n" +
    data.content +
    "\n\n" +
    "image url: " +
    data.urlToImage +
    "\n\n";
  // console.log(`config["tbg-user-data"].`, config["tbg-user-data"].useLink);

  if (config["tbg-user-data"].useLink) result += "source: " + data.url;
  return result;
};
