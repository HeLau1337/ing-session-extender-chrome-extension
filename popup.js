
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
});
