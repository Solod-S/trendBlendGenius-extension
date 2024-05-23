import { notyf } from "../chrome/content_script";

export const createArticle = async (domain: string, token: string) => {
  try {
    const response = await fetch("https://localhost:1234/api/articles/create", {
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
