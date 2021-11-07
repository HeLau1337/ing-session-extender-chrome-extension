
let enableCheckbox = document.getElementById("enableCheckbox");
const config = {};
  
chrome.storage.sync.get("ingSessionExtenderConfig", ({ ingSessionExtenderConfig }) => {
  Object.assign(config, ingSessionExtenderConfig);
  console.log("#3 ingSessionExtenderActivated:", config.isActivated);
  enableCheckbox.checked = config.isActivated;
});

enableCheckbox.addEventListener("click", async () => {
  config.isActivated = enableCheckbox.checked;
  chrome.storage.sync.set({ ingSessionExtenderConfig: config });

  if (enableCheckbox.checked === true) {
    chrome.action.setBadgeText({text: 'ON'});
  } else {
    chrome.action.setBadgeText({text: 'OFF'});
  }
});
