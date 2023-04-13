import { setExtensionIcon } from "../background.js";

let enableCheckbox = document.getElementById('enableCheckbox');
const config = {};

chrome.storage.sync.get('ingSessionExtenderConfig', ({ ingSessionExtenderConfig }) => {
  Object.assign(config, ingSessionExtenderConfig);
  enableCheckbox.checked = config.isEnabled;
});

enableCheckbox.addEventListener('click', async () => {
  config.isEnabled = enableCheckbox.checked;
  chrome.storage.sync.set({ ingSessionExtenderConfig: config });

  setExtensionIcon(config.isEnabled);
});
