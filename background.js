export const defaultConfig = {
	isEnabled: true,
	refreshInterval: 60,
	refreshBtnCssClass: 'session-button__refresh-button'
};

export function setExtensionIcon(isEnabled) {
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

chrome.runtime.onInstalled.addListener(() => {
	chrome.storage.sync.set({ ingSessionExtenderConfig: defaultConfig });
	setExtensionIcon(defaultConfig.isEnabled);
});
