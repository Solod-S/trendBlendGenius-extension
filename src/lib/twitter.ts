import TrendBlendGeniusIcon from "../components/TrendBlendGeniusIcon";

import { CHATGPT_BTN_ID, Domains, ERROR_MESSAGE } from "../utils/constants";
import getConfig from "../utils/config";
import {
  delay,
  closestSibling,
  createArticle,
  handleArticleData,
  notify,
} from "../utils/shared";

import { notyf } from "../chrome/content_script";

export const injector = () => {
  // render btn in home page
  document
    .querySelector(`[aria-label="Home timeline"]`)
    ?.querySelectorAll(`[data-testid="toolBar"]`)
    .forEach(el => {
      const postSpan = Array.from(el.querySelectorAll("span")).find(
        span => span?.textContent?.trim() === "Post"
      );
      if (!postSpan) return;

      const nav = el.querySelector("nav");
      if (!nav) return;

      if (nav.getAttribute("hasTrendBlend") === "true") return;
      nav.setAttribute("hasTrendBlend", "true");
      const chatGPTBtn = document.createElement("div");
      chatGPTBtn.setAttribute("role", "button");
      chatGPTBtn.setAttribute("id", CHATGPT_BTN_ID);
      chatGPTBtn.setAttribute("class", "twitter");
      chatGPTBtn.innerHTML = TrendBlendGeniusIcon("#1D9BF0");
      nav.prepend(chatGPTBtn);
    });

  // render btn in modal window
  document
    .querySelector(`[aria-labelledby="modal-header"]`)
    ?.querySelectorAll(`[data-testid="toolBar"]`)
    .forEach(el => {
      const postSpan = Array.from(el.querySelectorAll("span")).find(
        span => span?.textContent?.trim() === "Post"
      );
      if (!postSpan) return;

      const nav = el.querySelector("nav");
      if (!nav) return;

      if (nav.getAttribute("hasTrendBlend") === "true") return;
      nav.setAttribute("hasTrendBlend", "true");
      const chatGPTBtn = document.createElement("div");
      chatGPTBtn.setAttribute("role", "button");
      chatGPTBtn.setAttribute("id", CHATGPT_BTN_ID);
      chatGPTBtn.setAttribute("class", "twitter");
      chatGPTBtn.innerHTML = TrendBlendGeniusIcon("#1D9BF0");
      nav.prepend(chatGPTBtn);
    });
};

export const handler = async () => {
  document.body.addEventListener("click", async e => {
    const target = e.target as Element;
    const btn = target?.closest(`#${CHATGPT_BTN_ID}`);
    try {
      if (!btn) return;

      notyf?.dismissAll();

      const commentInputWrapper = closestSibling(
        btn,
        `[class="DraftEditor-root"]`
      );
      if (!commentInputWrapper) return;
      btn.setAttribute("disabled", "true");
      btn.setAttribute("loading", "true");
      await setTweetText(commentInputWrapper, " ");
      const config = await getConfig();

      const rawArticleData = await createArticle(
        "x.com",
        config["tbg-access-token"]
      );

      if (rawArticleData) {
        const preparedArticle = handleArticleData(rawArticleData, config);
        await setTweetText(commentInputWrapper, preparedArticle);
        notify(
          "success",
          "The article was successfully created.",
          Domains.Twitter,
          "optionPageSuccess"
        );
      } else {
        await delay(1000);
        await setTweetText(commentInputWrapper, ERROR_MESSAGE);
        notify(
          "error",
          "An error was occurred during content generation.",
          Domains.Twitter
        );
      }
      btn.setAttribute("disabled", "false");
      btn.setAttribute("loading", "false");
    } catch (error) {
      console.log(`error`, error);
      notify(
        "error",
        "An error was occurred during content generation.",
        Domains.Twitter
      );
      btn?.setAttribute("disabled", "false");
      btn?.setAttribute("loading", "false");
    }
  });
};

const setTweetText = async (commentInputWrapper: Element, text: string) => {
  const editable = commentInputWrapper?.querySelector(`[contenteditable]`);
  editable?.addEventListener("selectAll", () => {
    document.execCommand("selectAll");
  });

  if (editable) {
    (editable as any)?.click();
    editable.dispatchEvent(new CustomEvent("selectAll"));
    await delay(500);
  }

  const data = new DataTransfer();
  data.setData("text/plain", text);
  editable?.dispatchEvent(
    new ClipboardEvent("paste", {
      bubbles: true,
      clipboardData: data,
      cancelable: true,
    })
  );
};
