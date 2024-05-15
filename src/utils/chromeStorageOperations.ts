import { User, UserResponseType } from "../redux/user/userTypes";
import { DEFAULT_CONFIG, OPTIONS } from "./config";

export const setStorageDefaultValues = () => {
  chrome.storage.local.get(OPTIONS, result => {
    console.log(`result`, result);
    OPTIONS.forEach(option => {
      console.log(`option`, option);
      // If the key is not found in the results, set the default value
      if (!(option in result)) {
        chrome.storage.local.set({ [option]: DEFAULT_CONFIG[option] });
      }
    });
  });
};

export const setStorageValues = (data: UserResponseType) => {
  chrome.runtime.sendMessage({
    action: "save-to-storage",
    data: { user: data.user || null, accessToken: data.accessToken || "" },
  });
};

export const geStorageValues = () => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(OPTIONS, result => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(result);
      }
    });
  });
};
