import TrendBlendGeniusIcon from "../components/TrendBlendGeniusIcon";

import { CHATGPT_BTN_ID, Domains, ERROR_MESSAGE } from "../utils/constants";
import getConfig from "../utils/config";
import {
  createArticle,
  delay,
  handleArticleData,
  notify,
} from "../utils/shared";

export const handleInput = async (content: string, wrapper: Element) => {
  const inputElement = wrapper.querySelector("p");

  if (inputElement) {
    // Function for highlighting text
    function selectTargetText(target: Element) {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(target);
      selection?.removeAllRanges();
      selection?.addRange(range);
    }

    selectTargetText(inputElement);

    // Wait for the selection to complete before inserting new text
    await new Promise(resolve => setTimeout(resolve, 0));

    const dataTransfer = new DataTransfer();
    dataTransfer.setData("text/plain", content);

    // "beforeinput" event to replace current content
    inputElement.dispatchEvent(
      new InputEvent("beforeinput", {
        inputType: "insertText",
        data: content,
        bubbles: true,
        cancelable: true,
      })
    );
  } else {
    console.log("Input element not found");
  }
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
      const wrapper = target?.closest(`[role="presentation"]`);

      if (!wrapper) return;

      const inputEl = wrapper.querySelector(`[role="textbox"]`)!;

      if (!inputEl) return;

      btn.setAttribute("disabled", "true");
      btn.setAttribute("loading", "true");

      const config = await getConfig();

      const rawArticleData = await createArticle(
        "facebook.com",
        config["tbg-access-token"]
      );

      if (rawArticleData) {
        const preparedArticle = handleArticleData(rawArticleData, config);

        handleInput(preparedArticle, inputEl);
        notify(
          "success",
          "The article was successfully created.",
          Domains.LinkedIn,
          "optionPageSuccess"
        );
      } else {
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
