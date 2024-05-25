import { ALLOWED_DOMAINS, Domains } from "../utils/constants";
import appendStyles from "../lib/styles";
import { Notyf } from "notyf";

import {
  injector as linkedInInjector,
  handler as linkedInHandler,
} from "../lib/linkedIn";

import {
  injector as facebookInInjector,
  handler as facebookInHandler,
} from "../lib/facebook";

import {
  injector as twitterInInjector,
  handler as twitterInHandler,
} from "../lib/twitter";

const service: Record<Domains, [() => void, () => Promise<void>]> = {
  [Domains.LinkedIn]: [linkedInInjector, linkedInHandler],
  [Domains.Facebook]: [facebookInInjector, facebookInHandler],
  [Domains.Twitter]: [twitterInInjector, twitterInHandler],
};

export let notyf = new Notyf({
  types: [
    {
      type: "optionPageSuccess",
      background: "#225FBE",
      icon: false,
      className: "custom-notyf",
    },
    {
      type: "optionPageWarning",
      background: "#FBBC05",
      icon: false,
      className: "custom-notyf",
    },
  ],
});

(() => {
  const hostname = window.location.hostname;
  const activeTabDomain = (hostname?.match(
    /^(?:.*?\.)?([a-zA-Z0-9\-_]{1,}\.(?:\w{2,8}|\w{2,4}\.\w{2,4}))$/
  )?.[1] || "") as Domains;

  if (!ALLOWED_DOMAINS.includes(activeTabDomain)) return;

  const [injector, handler] = service[activeTabDomain];

  appendStyles();
  handler();
  setInterval(injector, 200);
})();
