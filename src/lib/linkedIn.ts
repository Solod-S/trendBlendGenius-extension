import TrendBlendGeniusIcon from "../components/TrendBlendGeniusIcon";

import { CHATGPT_BTN_ID, Domains, ERROR_MESSAGE } from "../utils/constants";
import getConfig from "../utils/config";
import {
  createArticle,
  delay,
  handleArticleData,
  notify,
} from "../utils/shared";

export const injector = () => {
  document
    .querySelectorAll(".share-creation-state__additional-toolbar")
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

      const inputEl = wrapper.querySelector(".ql-editor")!;
      inputEl.innerHTML = "";
      if (!inputEl) return;
      closePreview();

      inputEl.setAttribute(
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
        inputEl.innerHTML = preparedArticle;
        notify(
          "success",
          "The article was successfully created.",
          Domains.LinkedIn,
          "optionPageSuccess"
        );
      } else {
        inputEl.setAttribute("data-placeholder", ERROR_MESSAGE);
        await delay(3000);
        notify(
          "error",
          "An error was occurred during content generation.",
          Domains.LinkedIn
        );
      }

      inputEl.setAttribute("data-placeholder", "Add a comment..");
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

const closePreview = (): void => {
  const previewContainer = document.querySelector(
    ".share-creation-state__preview-container"
  ) as HTMLElement | null;

  if (previewContainer) {
    const button = previewContainer
      .querySelector(".artdeco-button__icon")
      ?.closest("button") as HTMLElement | null;

    if (button) {
      button.click();
    }
  }
};
