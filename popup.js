
const defaultConfig = {
  isActivated: true,
  refreshInterval: 60,
  refreshBtnCssClass: "ing-sn-session-button__timer"
};

let configForm = document.getElementById("configForm");
const config = {};
  
chrome.storage.sync.get("ingSessionExtenderConfig", ({ ingSessionExtenderConfig }) => {
  Object.assign(config, ingSessionExtenderConfig);
  console.log("#3 ingSessionExtenderActivated:", config.isActivated);
  configForm.useExtenderCheckbox.checked = config.isActivated;
  configForm.intervalInput.value = config.refreshInterval;
  configForm.cssClassInput.value = config.refreshBtnCssClass;
});

configForm.saveButton.addEventListener("click", async () => {
  config.isActivated = configForm.useExtenderCheckbox.checked;
  config.refreshInterval = configForm.intervalInput.value;
  config.refreshBtnCssClass = configForm.cssClassInput.value;
  chrome.storage.sync.set({ ingSessionExtenderConfig: config });
  setBadgeText();
});

configForm.resetButton.addEventListener("click", async () => {
  configForm.useExtenderCheckbox.checked = defaultConfig.isActivated;
  configForm.intervalInput.value = defaultConfig.refreshInterval;
  configForm.cssClassInput.value = defaultConfig.refreshBtnCssClass;
  chrome.storage.sync.set({ ingSessionExtenderConfig: defaultConfig });
  setBadgeText();
});

function setBadgeText() {
  if (configForm.useExtenderCheckbox.checked === true) {
    chrome.action.setBadgeText({text: 'ON'});
  } else {
    chrome.action.setBadgeText({text: 'OFF'});
  }
}
