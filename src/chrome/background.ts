import { setStorageDefaultValues } from "../utils/chromeStorageOperations";

console.log(`background script runing`);

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.action === "save-to-storage") {
    const { user, accessToken } = message.data;

    chrome.storage.local.set({ "tbg-user-data": user }, () => {
      console.log("User data saved:", user);
    });

    chrome.storage.local.set({ "tbg-access-token": accessToken }, () => {
      console.log("Access token saved:", accessToken);
    });
  }
});

// Call the function when installing the extension
chrome.runtime.onInstalled.addListener(async () => {
  setStorageDefaultValues();
});

// chrome.storage.local.get(null, function (items) {
//   console.log(items);
// });

// chrome.storage.local.clear(function () {
//   console.log("The storage facility has been cleared.");
// });
