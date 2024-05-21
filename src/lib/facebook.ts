import TrendBlendGeniusIcon from "../components/TrendBlendGeniusIcon";

import { CHATGPT_BTN_ID, Domains, ERROR_MESSAGE } from "../utils/constants";
import getConfig from "../utils/config";
import { createArticle, delay, notify } from "../utils/shared";

const handleArticleData = (data: any, config: any) => {
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
export const injector = () => {
  document
    .querySelectorAll(
      '[role="dialog"] form[method="POST"] div[role="presentation"]'
    )
    .forEach(parentElement => {
      const children = parentElement.children;
      if (children.length >= 3) {
        const thirdChild = children[2];

        if (thirdChild.getAttribute("hasTrendBlend") === "true") return;
        thirdChild.setAttribute("hasTrendBlend", "true");

        const chatGPTBtn = document.createElement("button");
        chatGPTBtn.style.border = "none";
        chatGPTBtn.style.padding = "0px";
        chatGPTBtn.style.backgroundColor = "transparent";
        chatGPTBtn.setAttribute("type", "button");
        chatGPTBtn.setAttribute("id", CHATGPT_BTN_ID);
        chatGPTBtn.setAttribute(
          "class",
          "artdeco-button--tertiary artdeco-button artdeco-button--circle artdeco-button--muted"
        );
        chatGPTBtn.innerHTML = TrendBlendGeniusIcon("#666666");
        thirdChild.prepend(chatGPTBtn);
      }
    });
};

export const handler = async () => {
  document.body.addEventListener("click", async e => {
    const target = e.target as Element;
    const btn = target?.closest(`#${CHATGPT_BTN_ID}`);
    try {
      if (!btn) return;

      const wrapper = target?.closest(".share-creation-state");

      if (!wrapper) return;

      const commentInputEl = wrapper.querySelector(".ql-editor")!;
      commentInputEl.innerHTML = "";

      commentInputEl.setAttribute(
        "data-placeholder",
        "Trend Blend Genius is thinking..."
      );

      btn.setAttribute("disabled", "true");
      btn.setAttribute("loading", "true");

      const config = await getConfig();

      const rawArticleData = await createArticle(
        "linkedin.com",
        config["tbg-access-token"]
      );

      if (rawArticleData) {
        const preparedArticle = handleArticleData(rawArticleData, config);
        commentInputEl.innerHTML = preparedArticle;
        notify(
          "success",
          "The article was successfully created.",
          Domains.LinkedIn,
          "optionPageSuccess"
        );
      } else {
        commentInputEl.setAttribute("data-placeholder", ERROR_MESSAGE);
        await delay(3000);
        notify(
          "error",
          "An error was occurred during content generation.",
          Domains.LinkedIn
        );
      }

      commentInputEl.setAttribute("data-placeholder", "Add a comment..");
      btn.removeAttribute("disabled");
      btn.removeAttribute("loading");
    } catch (error) {
      notify(
        "error",
        "An error was occurred during content generation.",
        Domains.LinkedIn
      );

      console.log(`Error: ${error}`);
      btn?.removeAttribute("disabled");
      btn?.removeAttribute("loading");
    }
  });
};