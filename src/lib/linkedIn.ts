import TrendBlendGeniusIcon from "../components/TrendBlendGeniusIcon";

import { CHATGPT_BTN_ID, Domains, ERROR_MESSAGE } from "../utils/constants";
import getConfig from "../utils/config";
import { createArticle } from "../utils/shared";

export const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

function sendMessageToBackground(message: any) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(message, response => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(response);
      }
    });
  });
}

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
    if (!btn) return;

    const wrapper = target?.closest(".share-creation-state");
    console.log(`wrapper`, wrapper);
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
    console.log(`config`, config);
    const article = await sendMessageToBackground({
      action: "createArticle",
      domain: "linkedin.com",
      token: config["tbg-access-token"],
    });
    // const article = await createArticle(
    //   "linkedin.com",
    //   config["tbg-access-token"]
    // );
    const comment = "Okay";
    if (comment.length) {
      commentInputEl.innerHTML = comment;
    } else {
      commentInputEl.setAttribute("data-placeholder", ERROR_MESSAGE);
      await delay(3000);
    }

    commentInputEl.setAttribute("data-placeholder", "Add a comment..");
    btn.removeAttribute("disabled");
    btn.removeAttribute("loading");
  });
};
