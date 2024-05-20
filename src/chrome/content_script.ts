import { ALLOWED_DOMAINS, Domains } from "../utils/constants";
import appendStyles from "../lib/styles";
import { Notyf } from "notyf";

import {
  injector as linkedInInjector,
  handler as linkedInHandler,
} from "../lib/linkedIn";

const service: Record<Domains, [() => void, () => Promise<void>]> = {
  [Domains.LinkedIn]: [linkedInInjector, linkedInHandler],
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
    /^(?:.*?\.)?([a-zA-Z0-9\-_]{3,}\.(?:\w{2,8}|\w{2,4}\.\w{2,4}))$/
  )?.[1] || "") as Domains;

  if (!ALLOWED_DOMAINS.includes(activeTabDomain)) return;

  const [injector, handler] = service[activeTabDomain];

  appendStyles();
  handler();
  setInterval(injector, 200);
})();
