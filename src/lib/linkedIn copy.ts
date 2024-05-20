import TrendBlendGeniusIcon from "../components/TrendBlendGeniusIcon";

import { CHATGPT_BTN_ID, Domains, ERROR_MESSAGE } from "../utils/constants";
import getConfig from "../utils/config";
import { createArticle, notify } from "../utils/shared";

export const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

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
      ".share-creation-state__additional-toolbar.share-creation-state__additional-toolbar--no-padding"
    )
    .forEach(el => {
      if (el.getAttribute("hasTrendBlend") === "true") return;
      el.setAttribute("hasTrendBlend", "true");

      const chatGPTBtn = document.createElement("button");
      chatGPTBtn.style.width = "24px";
      chatGPTBtn.setAttribute("type", "button");
      chatGPTBtn.setAttribute("id", CHATGPT_BTN_ID);
      chatGPTBtn.setAttribute(
        "class",
        "artdeco-button--tertiary artdeco-button artdeco-button--circle artdeco-button--muted"
      );
      chatGPTBtn.innerHTML = TrendBlendGeniusIcon("#666666");
      el.prepend(chatGPTBtn);
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
        console.error("The article was successfully created");
        notify(
          "error",
          "An error occurred during content generation.",
          Domains.LinkedIn
        );
      }

      commentInputEl.setAttribute("data-placeholder", "Add a comment..");
      btn.removeAttribute("disabled");
      btn.removeAttribute("loading");
    } catch (error) {
      console.log(`Error: ${error}`);
      btn?.removeAttribute("disabled");
      btn?.removeAttribute("loading");
    }
  });
};
