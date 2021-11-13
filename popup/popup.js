
let enableCheckbox = document.getElementById("enableCheckbox");
const config = {};
  
chrome.storage.sync.get("ingSessionExtenderConfig", ({ ingSessionExtenderConfig }) => {
  Object.assign(config, ingSessionExtenderConfig);
  enableCheckbox.checked = config.isEnabled;
});

enableCheckbox.addEventListener("click", async () => {
  config.isEnabled = enableCheckbox.checked;
  chrome.storage.sync.set({ ingSessionExtenderConfig: config });

  setExtensionIcon(config.isEnabled);
});

function setExtensionIcon(isEnabled) {
	if (isEnabled) {
		chrome.action.setIcon({
      path: {
        16: '/images/extension_icon/on/icon_on_16.png',
        32: '/images/extension_icon/on/icon_on_32.png',
        48: '/images/extension_icon/on/icon_on_48.png',
        128: '/images/extension_icon/on/icon_on_128.png',
      }
		});
	} else {
		chrome.action.setIcon({
      path: {
        16: '/images/extension_icon/off/icon_off_16.png',
        32: '/images/extension_icon/off/icon_off_32.png',
        48: '/images/extension_icon/off/icon_off_48.png',
        128: '/images/extension_icon/off/icon_off_128.png',
      }
		});
	}
}
